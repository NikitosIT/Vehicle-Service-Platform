resource "aws_ecs_express_gateway_service" "user_service" {
  count = var.deploy_application_services ? 1 : 0

  service_name            = "${local.name_prefix}-user-service"
  execution_role_arn      = aws_iam_role.ecs_execution.arn
  infrastructure_role_arn = aws_iam_role.ecs_infrastructure.arn
  task_role_arn           = aws_iam_role.ecs_task.arn
  cpu                     = var.ecs_cpu
  memory                  = var.ecs_memory
  health_check_path       = "/health/live"

  primary_container {
    image          = "${aws_ecr_repository.user_service.repository_url}:${var.image_tag}"
    container_port = 4200

    aws_logs_configuration {
      log_group = aws_cloudwatch_log_group.user_service.name
    }

    environment {
      name  = "NODE_ENV"
      value = "production"
    }

    environment {
      name  = "PORT"
      value = "4200"
    }

    environment {
      name  = "LOG_LEVEL"
      value = "info"
    }

    environment {
      name  = "ALLOWED_ORIGIN"
      value = local.allowed_origin
    }

    environment {
      name  = "SESSION_COOKIE_NAME"
      value = "vsp.sid"
    }

    environment {
      name  = "SESSION_TTL_SECONDS"
      value = "604800"
    }

    secret {
      name       = "DATABASE_URL"
      value_from = "${aws_secretsmanager_secret.app.arn}:DATABASE_URL_USER::"
    }

    secret {
      name       = "REDIS_URL"
      value_from = "${aws_secretsmanager_secret.app.arn}:REDIS_URL::"
    }

    secret {
      name       = "RABBITMQ_URL"
      value_from = "${aws_secretsmanager_secret.app.arn}:RABBITMQ_URL::"
    }

    secret {
      name       = "SESSION_SECRET"
      value_from = "${aws_secretsmanager_secret.app.arn}:SESSION_SECRET::"
    }
  }

  network_configuration {
    subnets         = aws_subnet.private[*].id
    security_groups = [aws_security_group.ecs_tasks.id]
  }

  scaling_target {
    min_task_count = var.ecs_min_tasks
    max_task_count = var.ecs_max_tasks
  }

  wait_for_steady_state = true

  depends_on = [
    aws_secretsmanager_secret_version.app,
    aws_iam_role_policy.ecs_execution_secrets,
  ]
}

resource "aws_ecs_express_gateway_service" "vehicle_service" {
  count = var.deploy_application_services ? 1 : 0

  service_name            = "${local.name_prefix}-vehicle-service"
  execution_role_arn      = aws_iam_role.ecs_execution.arn
  infrastructure_role_arn = aws_iam_role.ecs_infrastructure.arn
  task_role_arn           = aws_iam_role.ecs_task.arn
  cpu                     = var.ecs_cpu
  memory                  = var.ecs_memory
  health_check_path       = "/health/live"

  primary_container {
    image          = "${aws_ecr_repository.vehicle_service.repository_url}:${var.image_tag}"
    container_port = 4203

    aws_logs_configuration {
      log_group = aws_cloudwatch_log_group.vehicle_service.name
    }

    environment {
      name  = "NODE_ENV"
      value = "production"
    }

    environment {
      name  = "PORT"
      value = "4203"
    }

    environment {
      name  = "LOG_LEVEL"
      value = "info"
    }

    environment {
      name  = "ALLOWED_ORIGIN"
      value = local.allowed_origin
    }

    environment {
      name  = "SESSION_COOKIE_NAME"
      value = "vsp.sid"
    }

    environment {
      name  = "SESSION_TTL_SECONDS"
      value = "604800"
    }

    secret {
      name       = "DATABASE_URL"
      value_from = "${aws_secretsmanager_secret.app.arn}:DATABASE_URL_VEHICLE::"
    }

    secret {
      name       = "REDIS_URL"
      value_from = "${aws_secretsmanager_secret.app.arn}:REDIS_URL::"
    }

    secret {
      name       = "RABBITMQ_URL"
      value_from = "${aws_secretsmanager_secret.app.arn}:RABBITMQ_URL::"
    }

    secret {
      name       = "SESSION_SECRET"
      value_from = "${aws_secretsmanager_secret.app.arn}:SESSION_SECRET::"
    }
  }

  network_configuration {
    subnets         = aws_subnet.private[*].id
    security_groups = [aws_security_group.ecs_tasks.id]
  }

  scaling_target {
    min_task_count = var.ecs_min_tasks
    max_task_count = var.ecs_max_tasks
  }

  wait_for_steady_state = true

  depends_on = [
    aws_secretsmanager_secret_version.app,
    aws_iam_role_policy.ecs_execution_secrets,
  ]
}

resource "aws_ecs_express_gateway_service" "frontend" {
  count = var.deploy_application_services ? 1 : 0

  service_name            = "${local.name_prefix}-frontend"
  execution_role_arn      = aws_iam_role.ecs_execution.arn
  infrastructure_role_arn = aws_iam_role.ecs_infrastructure.arn
  cpu                     = var.ecs_cpu
  memory                  = var.ecs_memory
  health_check_path       = "/"

  primary_container {
    image          = "${aws_ecr_repository.frontend.repository_url}:${var.image_tag}"
    container_port = 3000

    aws_logs_configuration {
      log_group = aws_cloudwatch_log_group.frontend.name
    }

    environment {
      name  = "NODE_ENV"
      value = "production"
    }

    environment {
      name  = "PORT"
      value = "3000"
    }

    environment {
      name  = "USER_SERVICE_URL"
      value = coalesce(local.user_service_endpoint, "https://placeholder.invalid")
    }

    environment {
      name  = "VEHICLE_SERVICE_URL"
      value = coalesce(local.vehicle_service_endpoint, "https://placeholder.invalid")
    }
  }

  network_configuration {
    subnets         = aws_subnet.private[*].id
    security_groups = [aws_security_group.ecs_tasks.id]
  }

  scaling_target {
    min_task_count = var.ecs_min_tasks
    max_task_count = var.ecs_max_tasks
  }

  wait_for_steady_state = true

  depends_on = [
    aws_ecs_express_gateway_service.user_service,
    aws_ecs_express_gateway_service.vehicle_service,
    aws_secretsmanager_secret_version.app,
    aws_iam_role_policy.ecs_execution_secrets,
  ]
}