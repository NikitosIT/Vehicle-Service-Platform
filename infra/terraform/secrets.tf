resource "random_password" "db_master" {
  length  = 32
  special = false
}

resource "random_password" "mq" {
  length  = 32
  special = false
}

resource "random_password" "session_secret" {
  length  = 64
  special = false
}

resource "random_password" "redis_auth" {
  length  = 32
  special = false
}
