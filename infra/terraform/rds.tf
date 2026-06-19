resource "aws_db_instance" "user_service" {
  identifier = "${local.name_prefix}-user-db"

  engine         = "postgres"
  engine_version = "17.4"
  instance_class = var.db_instance_class

  allocated_storage = 20
  storage_type      = "gp3"
  storage_encrypted = true

  db_name  = "user_service"
  username = "vsp_admin"
  password = random_password.db_master.result

  db_subnet_group_name   = aws_db_subnet_group.postgres.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  multi_az               = false

  backup_retention_period   = var.db_backup_retention_days
  deletion_protection       = var.db_deletion_protection
  skip_final_snapshot       = false
  final_snapshot_identifier = "${local.name_prefix}-user-db-final"
  auto_minor_version_upgrade = true
}

resource "aws_db_instance" "vehicle_service" {
  identifier = "${local.name_prefix}-vehicle-db"

  engine         = "postgres"
  engine_version = "17.4"
  instance_class = var.db_instance_class

  allocated_storage = 20
  storage_type      = "gp3"
  storage_encrypted = true

  db_name  = "vehicle_service"
  username = "vsp_admin"
  password = random_password.db_master.result

  db_subnet_group_name   = aws_db_subnet_group.postgres.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  multi_az               = false

  backup_retention_period   = var.db_backup_retention_days
  deletion_protection       = var.db_deletion_protection
  skip_final_snapshot       = false
  final_snapshot_identifier = "${local.name_prefix}-vehicle-db-final"
  auto_minor_version_upgrade = true
}
