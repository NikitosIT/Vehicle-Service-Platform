output "aws_region" {
  description = "AWS region used for deployment."
  value       = var.aws_region
}

output "ecr_repositories" {
  description = "ECR repository URLs for application images."
  value = {
    frontend        = aws_ecr_repository.frontend.repository_url
    user_service    = aws_ecr_repository.user_service.repository_url
    vehicle_service = aws_ecr_repository.vehicle_service.repository_url
  }
}

output "image_tags" {
  description = "Effective Docker image tags currently configured for application services."
  value = {
    frontend        = local.frontend_image_tag
    user_service    = local.user_service_image_tag
    vehicle_service = local.vehicle_service_image_tag
  }
}

output "frontend_url" {
  description = "Public HTTPS URL for the frontend Express service."
  value       = local.frontend_endpoint
}

output "user_service_url" {
  description = "HTTPS URL for the user-service Express service."
  value       = local.user_service_endpoint
}

output "vehicle_service_url" {
  description = "HTTPS URL for the vehicle-service Express service."
  value       = local.vehicle_service_endpoint
}

output "ecs_cluster_ops" {
  description = "ECS cluster name used for one-off migration tasks."
  value       = aws_ecs_cluster.ops.name
}

output "migration_task_definitions" {
  description = "Task definition families for database migrations."
  value = {
    user_service    = aws_ecs_task_definition.user_migrate.family
    vehicle_service = aws_ecs_task_definition.vehicle_migrate.family
  }
}

output "private_subnet_ids" {
  description = "Private subnet IDs used by ECS tasks."
  value       = aws_subnet.private[*].id
}

output "ecs_tasks_security_group_id" {
  description = "Security group ID attached to ECS tasks."
  value       = aws_security_group.ecs_tasks.id
}

output "deploy_next_steps" {
  description = "Follow-up actions after the first successful apply."
  value       = <<-EOT
    1. Open frontend_url in the browser.
    2. Set frontend_url in terraform.tfvars to that URL.
    3. Run terraform apply again so backend CORS uses the real frontend origin.
  EOT
}
