variable "aws_region" {
  description = "AWS region for IAM resources and the Terraform state backend."
  type        = string
  default     = "eu-central-1"
}

variable "project_name" {
  description = "Short project prefix used in resource names."
  type        = string
  default     = "vsp"
}

variable "environment" {
  description = "Deployment environment label."
  type        = string
  default     = "prod"
}

variable "github_owner" {
  description = "GitHub organization or user that owns the repository."
  type        = string
  default     = "Nikitos-org"
}

variable "github_repository" {
  description = "GitHub repository name."
  type        = string
  default     = "Vehicle-Service-Platform"
}

variable "github_ref" {
  description = "Git ref allowed to assume the deploy role."
  type        = string
  default     = "refs/heads/main"
}

variable "role_name" {
  description = "IAM role name assumed by GitHub Actions."
  type        = string
  default     = "github-actions-infra-deploy-role"
}

variable "terraform_state_bucket" {
  description = "S3 bucket name used by the main Terraform backend."
  type        = string
}

variable "terraform_state_key" {
  description = "S3 object key used by the main Terraform backend state."
  type        = string
}

variable "terraform_lock_table" {
  description = "DynamoDB table name used for Terraform state locking."
  type        = string
}

variable "create_github_oidc_provider" {
  description = "Create the GitHub Actions OIDC provider in AWS."
  type        = bool
  default     = true
}

variable "github_oidc_provider_arn" {
  description = "Existing GitHub Actions OIDC provider ARN. Required when create_github_oidc_provider is false."
  type        = string
  default     = null

  validation {
    condition     = var.create_github_oidc_provider || var.github_oidc_provider_arn != null
    error_message = "Set github_oidc_provider_arn when create_github_oidc_provider is false."
  }
}
