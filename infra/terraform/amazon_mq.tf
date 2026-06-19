resource "aws_mq_broker" "rabbitmq" {
  broker_name = "${local.name_prefix}-rabbitmq"

  engine_type        = "RabbitMQ"
  engine_version     = "3.13"
  host_instance_type = var.mq_instance_type
  deployment_mode    = "SINGLE_INSTANCE"

  publicly_accessible = false
  subnet_ids          = [aws_subnet.private[0].id]
  security_groups     = [aws_security_group.mq.id]

  user {
    username = "vsp"
    password = random_password.mq.result
  }

  logs {
    general = true
  }

  maintenance_window_start_time {
    day_of_week = "SUNDAY"
    time_of_day = "03:00"
    time_zone   = "UTC"
  }
}
