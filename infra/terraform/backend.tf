terraform {
  backend "s3" {
    bucket         = "vsp-prod-terraform-state-c3518c57"
    key            = "vsp/prod/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "vsp-prod-terraform-locks"
    encrypt        = true
  }
}