resource "aws_ecr_repository" "frontend" {
  name                 = "${local.name_prefix}/frontend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "user_service" {
  name                 = "${local.name_prefix}/user-service"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "vehicle_service" {
  name                 = "${local.name_prefix}/vehicle-service"
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_lifecycle_policy" "frontend" {
  repository = aws_ecr_repository.frontend.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

resource "aws_ecr_lifecycle_policy" "user_service" {
  repository = aws_ecr_repository.user_service.name

  policy = aws_ecr_lifecycle_policy.frontend.policy
}

resource "aws_ecr_lifecycle_policy" "vehicle_service" {
  repository = aws_ecr_repository.vehicle_service.name

  policy = aws_ecr_lifecycle_policy.frontend.policy
}
