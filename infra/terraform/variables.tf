variable "aws_region" {
  description = "AWS region for all resources."
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

variable "image_tag" {
  description = "Docker image tag pushed to ECR for all application services."
  type        = string
  default     = "latest"
}

variable "frontend_url" {
  description = "Public frontend URL used for backend CORS. Leave empty on the first apply, then set to terraform output frontend_url and re-apply."
  type        = string
  default     = ""
}

variable "vpc_cidr" {
  description = "VPC CIDR block."
  type        = string
  default     = "10.20.0.0/16"
}

variable "db_instance_class" {
  description = "RDS instance class."
  type        = string
  default     = "db.t4g.micro"
}

variable "redis_node_type" {
  description = "ElastiCache Redis node type."
  type        = string
  default     = "cache.t4g.micro"
}

variable "mq_instance_type" {
  description = "Amazon MQ broker instance type."
  type        = string
  default     = "mq.t3.small"
}

variable "ecs_cpu" {
  description = "CPU units for ECS Express services."
  type        = string
  default     = "512"
}

variable "ecs_memory" {
  description = "Memory (MiB) for ECS Express services."
  type        = string
  default     = "1024"
}

variable "ecs_min_tasks" {
  description = "Minimum task count per ECS Express service."
  type        = number
  default     = 1
}

variable "ecs_max_tasks" {
  description = "Maximum task count per ECS Express service."
  type        = number
  default     = 4
}

variable "db_backup_retention_days" {
  description = "RDS backup retention in days."
  type        = number
  default     = 7
}

variable "db_deletion_protection" {
  description = "Protect RDS instance from accidental deletion."
  type        = bool
  default     = true
}

variable "enable_nat_gateway" {
  description = "Create a NAT gateway for private subnet egress."
  type        = bool
  default     = true
}

variable "deploy_application_services" {
  description = "Create ECS Express services. Set to false on the first apply before images are pushed to ECR."
  type        = bool
  default     = true
}
