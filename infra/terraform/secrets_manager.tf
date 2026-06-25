resource "aws_secretsmanager_secret" "app" {
  name = "${local.name_prefix}/app"
}

resource "aws_secretsmanager_secret_version" "app" {
  secret_id = aws_secretsmanager_secret.app.id

  secret_string = jsonencode({
    DATABASE_URL_USER     = local.user_service_database_url
    DATABASE_URL_VEHICLE  = local.vehicle_service_database_url
    REDIS_URL             = local.redis_url
    RABBITMQ_URL          = local.rabbitmq_url
    SESSION_SECRET        = local.session_secret
    SESSION_COOKIE_NAME   = "vsp.sid"
    SESSION_TTL_SECONDS   = "604800"
  })

  depends_on = [
    aws_db_instance.user_service,
    aws_db_instance.vehicle_service,
    aws_elasticache_replication_group.redis,
    aws_mq_broker.rabbitmq,
  ]
}
