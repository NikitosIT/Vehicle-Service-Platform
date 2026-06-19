resource "aws_ecs_cluster" "ops" {
  name = "${local.name_prefix}-ops"
}

resource "aws_ecs_task_definition" "user_migrate" {
  family                   = "${local.name_prefix}-user-migrate"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "migrate"
      image     = "${aws_ecr_repository.user_service.repository_url}:${var.image_tag}"
      essential = true
      command   = ["./node_modules/.bin/prisma", "migrate", "deploy"]
      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        }
      ]
      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = "${aws_secretsmanager_secret.app.arn}:DATABASE_URL_USER::"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.migrations.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "user-service"
        }
      }
    }
  ])
}

resource "aws_ecs_task_definition" "vehicle_migrate" {
  family                   = "${local.name_prefix}-vehicle-migrate"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "migrate"
      image     = "${aws_ecr_repository.vehicle_service.repository_url}:${var.image_tag}"
      essential = true
      command   = ["./node_modules/.bin/prisma", "migrate", "deploy"]
      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        }
      ]
      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = "${aws_secretsmanager_secret.app.arn}:DATABASE_URL_VEHICLE::"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.migrations.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "vehicle-service"
        }
      }
    }
  ])
}
