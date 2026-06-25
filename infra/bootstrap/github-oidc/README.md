# GitHub Actions OIDC bootstrap

This stack creates the IAM role and optional OIDC provider used by GitHub Actions to deploy the Vehicle Service Platform.

## What it creates

- GitHub Actions OIDC provider in AWS IAM, unless you point it to an existing one
- IAM role for GitHub Actions
- Deploy policy with access to:
  - Terraform backend `S3` bucket and `DynamoDB` lock table
  - `ECR`, `ECS`, `CloudWatch`, `IAM`, `EC2`, `RDS`, `ElastiCache`, `Amazon MQ`, `Secrets Manager`, `EventBridge`, and `Service Discovery`

## Usage

```bash
cd infra/bootstrap/github-oidc
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform apply
```

Fill these values before running:

- `terraform_state_bucket`
- `terraform_state_key`
- `terraform_lock_table`

If your AWS account already has the GitHub OIDC provider for `token.actions.githubusercontent.com`, set:

```hcl
create_github_oidc_provider = false
github_oidc_provider_arn    = "arn:aws:iam::<account-id>:oidc-provider/token.actions.githubusercontent.com"
```

## Outputs

- `github_actions_role_arn` -> set this as the GitHub repository variable `AWS_ROLE_TO_ASSUME`
- `allowed_github_subject` -> useful when checking the trust policy scope
