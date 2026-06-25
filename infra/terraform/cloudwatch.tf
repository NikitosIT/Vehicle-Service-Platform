resource "aws_cloudwatch_log_group" "frontend" {
  name              = "/ecs/${local.name_prefix}/frontend"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "user_service" {
  name              = "/ecs/${local.name_prefix}/user-service"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "vehicle_service" {
  name              = "/ecs/${local.name_prefix}/vehicle-service"
  retention_in_days = 14
}

resource "aws_cloudwatch_log_group" "migrations" {
  name              = "/ecs/${local.name_prefix}/migrations"
  retention_in_days = 7
}
