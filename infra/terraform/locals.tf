locals {
  name_prefix = "${var.project_name}-${var.environment}"

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }

  azs = slice(data.aws_availability_zones.available.names, 0, 2)

  public_subnet_cidrs = [
    cidrsubnet(var.vpc_cidr, 4, 0),
    cidrsubnet(var.vpc_cidr, 4, 1),
  ]

  private_subnet_cidrs = [
    cidrsubnet(var.vpc_cidr, 4, 8),
    cidrsubnet(var.vpc_cidr, 4, 9),
  ]

  database_subnet_cidrs = [
    cidrsubnet(var.vpc_cidr, 4, 12),
    cidrsubnet(var.vpc_cidr, 4, 13),
  ]

  user_service_database_url = "postgresql://${aws_db_instance.user_service.username}:${random_password.db_master.result}@${aws_db_instance.user_service.address}:${aws_db_instance.user_service.port}/user_service?sslmode=require"
  vehicle_service_database_url = "postgresql://${aws_db_instance.vehicle_service.username}:${random_password.db_master.result}@${aws_db_instance.vehicle_service.address}:${aws_db_instance.vehicle_service.port}/vehicle_service?sslmode=require"

  session_secret = random_password.session_secret.result

  allowed_origin = var.frontend_url != "" ? var.frontend_url : "http://localhost:3000"

  user_service_endpoint = var.deploy_application_services ? try(
    one([
      for path in aws_ecs_express_gateway_service.user_service[0].ingress_paths :
      path.endpoint
    ]),
    null,
  ) : null

  vehicle_service_endpoint = var.deploy_application_services ? try(
    one([
      for path in aws_ecs_express_gateway_service.vehicle_service[0].ingress_paths :
      path.endpoint
    ]),
    null,
  ) : null

  frontend_endpoint = var.deploy_application_services ? try(
    one([
      for path in aws_ecs_express_gateway_service.frontend[0].ingress_paths :
      path.endpoint
    ]),
    null,
  ) : null

  redis_url = "rediss://:${random_password.redis_auth.result}@${aws_elasticache_replication_group.redis.primary_endpoint_address}:${aws_elasticache_replication_group.redis.port}"

  mq_host = trimprefix(aws_mq_broker.rabbitmq.instances[0].endpoints[0], "amqps://")
  rabbitmq_url = "amqps://vsp:${random_password.mq.result}@${local.mq_host}"
}
