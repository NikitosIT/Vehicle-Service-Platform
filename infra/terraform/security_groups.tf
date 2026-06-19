resource "aws_security_group" "ecs_tasks" {
  name        = "${local.name_prefix}-ecs-tasks"
  description = "ECS task network access"
  vpc_id      = aws_vpc.main.id
}

resource "aws_security_group" "rds" {
  name        = "${local.name_prefix}-rds"
  description = "PostgreSQL access from ECS tasks"
  vpc_id      = aws_vpc.main.id
}

resource "aws_security_group" "redis" {
  name        = "${local.name_prefix}-redis"
  description = "Redis access from ECS tasks"
  vpc_id      = aws_vpc.main.id
}

resource "aws_security_group" "mq" {
  name        = "${local.name_prefix}-mq"
  description = "RabbitMQ access from ECS tasks"
  vpc_id      = aws_vpc.main.id
}

resource "aws_vpc_security_group_ingress_rule" "ecs_tasks_self" {
  security_group_id            = aws_security_group.ecs_tasks.id
  referenced_security_group_id = aws_security_group.ecs_tasks.id
  ip_protocol                  = "-1"
  description                  = "Allow service-to-service traffic inside the ECS task security group"
}

resource "aws_vpc_security_group_egress_rule" "ecs_tasks_all" {
  security_group_id = aws_security_group.ecs_tasks.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
  description       = "Allow outbound traffic for package installs and AWS APIs"
}

resource "aws_vpc_security_group_ingress_rule" "rds_from_ecs" {
  security_group_id            = aws_security_group.rds.id
  referenced_security_group_id = aws_security_group.ecs_tasks.id
  from_port                    = 5432
  to_port                      = 5432
  ip_protocol                  = "tcp"
  description                  = "PostgreSQL from ECS tasks"
}

resource "aws_vpc_security_group_egress_rule" "rds_all" {
  security_group_id = aws_security_group.rds.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_ingress_rule" "redis_from_ecs" {
  security_group_id            = aws_security_group.redis.id
  referenced_security_group_id = aws_security_group.ecs_tasks.id
  from_port                    = 6379
  to_port                      = 6379
  ip_protocol                  = "tcp"
  description                  = "Redis from ECS tasks"
}

resource "aws_vpc_security_group_egress_rule" "redis_all" {
  security_group_id = aws_security_group.redis.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_ingress_rule" "mq_from_ecs" {
  security_group_id            = aws_security_group.mq.id
  referenced_security_group_id = aws_security_group.ecs_tasks.id
  from_port                    = 5671
  to_port                      = 5671
  ip_protocol                  = "tcp"
  description                  = "RabbitMQ AMQPS from ECS tasks"
}

resource "aws_vpc_security_group_egress_rule" "mq_all" {
  security_group_id = aws_security_group.mq.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_ingress_rule" "vpc_endpoints_https" {
  security_group_id            = aws_security_group.vpc_endpoints.id
  referenced_security_group_id = aws_security_group.ecs_tasks.id
  from_port                    = 443
  to_port                      = 443
  ip_protocol                  = "tcp"
  description                  = "HTTPS from ECS tasks to VPC endpoints"
}

resource "aws_vpc_security_group_egress_rule" "vpc_endpoints_all" {
  security_group_id = aws_security_group.vpc_endpoints.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
