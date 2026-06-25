output "github_actions_role_arn" {
  description = "Use this value for the GitHub Actions AWS_ROLE_TO_ASSUME variable."
  value       = aws_iam_role.github_actions_deploy.arn
}

output "github_actions_role_name" {
  description = "IAM role name for GitHub Actions deployments."
  value       = aws_iam_role.github_actions_deploy.name
}

output "github_oidc_provider_arn" {
  description = "OIDC provider ARN used by the GitHub Actions role."
  value       = local.github_oidc_provider_arn
}

output "allowed_github_subject" {
  description = "Only this GitHub subject is allowed to assume the deploy role."
  value       = local.github_subject
}
