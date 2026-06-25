output "aws_region" {
  description = "AWS region for the Terraform backend."
  value       = var.aws_region
}

output "terraform_state_bucket" {
  description = "S3 bucket name for Terraform remote state."
  value       = aws_s3_bucket.terraform_state.bucket
}

output "terraform_lock_table" {
  description = "DynamoDB table name for Terraform state locking."
  value       = aws_dynamodb_table.terraform_lock.name
}

output "terraform_state_key" {
  description = "Recommended S3 object key for the main infrastructure state."
  value       = local.state_key
}

output "backend_tf_snippet" {
  description = "Copy this into infra/terraform/backend.tf."
  value       = <<-EOT
    terraform {
      backend "s3" {
        bucket         = "${aws_s3_bucket.terraform_state.bucket}"
        key            = "${local.state_key}"
        region         = "${var.aws_region}"
        dynamodb_table = "${aws_dynamodb_table.terraform_lock.name}"
        encrypt        = true
      }
    }
  EOT
}
