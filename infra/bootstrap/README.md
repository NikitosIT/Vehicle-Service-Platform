# Terraform backend bootstrap

This stack creates the shared Terraform backend resources for the main AWS deployment:

- S3 bucket for remote Terraform state
- DynamoDB table for Terraform state locking

## Usage

```bash
cd infra/bootstrap
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform apply
```

Useful outputs:

- `terraform_state_bucket`
- `terraform_lock_table`
- `terraform_state_key`
- `backend_tf_snippet`

After `terraform apply`, create `infra/terraform/backend.tf` from the `backend_tf_snippet` output, then migrate the existing main infrastructure state:

```bash
cd ../terraform
terraform init -migrate-state
```
