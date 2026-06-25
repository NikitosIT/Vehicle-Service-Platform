locals {
  name_prefix          = "${var.project_name}-${var.environment}"
  oidc_provider_url    = "https://token.actions.githubusercontent.com"
  github_subject       = "repo:${var.github_owner}/${var.github_repository}:ref:${var.github_ref}"
  backend_bucket_arn   = "arn:aws:s3:::${var.terraform_state_bucket}"
  backend_object_arn   = "arn:aws:s3:::${var.terraform_state_bucket}/${var.terraform_state_key}"
  backend_object_glob  = "arn:aws:s3:::${var.terraform_state_bucket}/${var.terraform_state_key}*"
  lock_table_arn       = "arn:aws:dynamodb:${var.aws_region}:*:table/${var.terraform_lock_table}"
}

data "tls_certificate" "github_actions" {
  count = var.create_github_oidc_provider ? 1 : 0
  url   = local.oidc_provider_url
}

resource "aws_iam_openid_connect_provider" "github_actions" {
  count = var.create_github_oidc_provider ? 1 : 0

  url = local.oidc_provider_url

  client_id_list = [
    "sts.amazonaws.com",
  ]

  thumbprint_list = [
    data.tls_certificate.github_actions[0].certificates[length(data.tls_certificate.github_actions[0].certificates) - 1].sha1_fingerprint,
  ]
}

locals {
  github_oidc_provider_arn = var.create_github_oidc_provider ? aws_iam_openid_connect_provider.github_actions[0].arn : var.github_oidc_provider_arn
}

data "aws_iam_policy_document" "github_actions_trust" {
  statement {
    sid    = "AllowGitHubActionsOIDC"
    effect = "Allow"

    actions = [
      "sts:AssumeRoleWithWebIdentity",
    ]

    principals {
      type        = "Federated"
      identifiers = [local.github_oidc_provider_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = [local.github_subject]
    }
  }
}

resource "aws_iam_role" "github_actions_deploy" {
  name               = var.role_name
  assume_role_policy = data.aws_iam_policy_document.github_actions_trust.json
  description        = "GitHub Actions deployment role for Terraform and service releases."
}

data "aws_iam_policy_document" "github_actions_permissions" {
  statement {
    sid    = "TerraformBackendState"
    effect = "Allow"

    actions = [
      "s3:GetBucketLocation",
      "s3:GetBucketVersioning",
      "s3:ListBucket",
    ]

    resources = [
      local.backend_bucket_arn,
    ]
  }

  statement {
    sid    = "TerraformBackendObjects"
    effect = "Allow"

    actions = [
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:PutObject",
    ]

    resources = [
      local.backend_object_arn,
      local.backend_object_glob,
    ]
  }

  statement {
    sid    = "TerraformBackendLocks"
    effect = "Allow"

    actions = [
      "dynamodb:DeleteItem",
      "dynamodb:DescribeTable",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
    ]

    resources = [
      local.lock_table_arn,
    ]
  }

  statement {
    sid    = "DeployInfrastructureAndServices"
    effect = "Allow"

    actions = [
      "application-autoscaling:*",
      "cloudwatch:*",
      "ec2:*",
      "ecr:*",
      "ecs:*",
      "elasticache:*",
      "elasticloadbalancing:*",
      "events:*",
      "iam:*",
      "logs:*",
      "mq:*",
      "rds:*",
      "secretsmanager:*",
      "servicediscovery:*",
    ]

    resources = ["*"]
  }
}

resource "aws_iam_policy" "github_actions_deploy" {
  name        = "${local.name_prefix}-github-actions-deploy"
  description = "Permissions for GitHub Actions to manage the Vehicle Service Platform deployment."
  policy      = data.aws_iam_policy_document.github_actions_permissions.json
}

resource "aws_iam_role_policy_attachment" "github_actions_deploy" {
  role       = aws_iam_role.github_actions_deploy.name
  policy_arn = aws_iam_policy.github_actions_deploy.arn
}
