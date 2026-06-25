resource "aws_elasticache_replication_group" "redis" {
  replication_group_id = "${local.name_prefix}-redis"
  description          = "Shared Redis for VSP sessions"
  engine               = "redis"
  engine_version       = "7.1"
  node_type            = var.redis_node_type
  port                 = 6379
  parameter_group_name = "default.redis7"
  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.redis.id]

  num_cache_clusters         = 1
  automatic_failover_enabled = false
  transit_encryption_enabled   = true
  at_rest_encryption_enabled  = true
  auth_token                   = random_password.redis_auth.result
}
