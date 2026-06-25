variable "aws_region" {
  description = "AWS region for the Terraform backend resources."
  type        = string
  default     = "eu-central-1"
}

variable "project_name" {
  description = "Short project prefix used in backend resource names."
  type        = string
  default     = "vsp"
}

variable "environment" {
  description = "Deployment environment label."
  type        = string
  default     = "prod"
}
