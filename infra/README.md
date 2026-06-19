# AWS deployment (ECS Express Mode + Terraform)

Production deployment for the Vehicle Service Platform using:

- **ECS Express Mode** for `frontend`, `user-service`, and `vehicle-service`
- **RDS PostgreSQL** (separate instances for each backend database)
- **ElastiCache Redis** (shared sessions)
- **Amazon MQ RabbitMQ**
- **ECR** for container images
- **Secrets Manager** for runtime secrets

## Prerequisites

- AWS account with permissions for ECS, ECR, RDS, ElastiCache, Amazon MQ, VPC, IAM, Secrets Manager, CloudWatch
- AWS CLI configured (`aws sts get-caller-identity`)
- Terraform `>= 1.5`
- Docker
- Node.js is **not** required on the deploy machine

Terraform AWS provider `>= 6.23.0` is required for `aws_ecs_express_gateway_service`.

## Quick deploy

From the repository root:

```bash
chmod +x infra/scripts/*.sh
./infra/scripts/deploy.sh
```

The script performs four steps:

1. Provisions VPC, databases, Redis, RabbitMQ, ECR, IAM, secrets
2. Builds and pushes Docker images to ECR
3. Creates ECS Express services
4. Runs Prisma migrations as one-off ECS tasks

## Manual deploy

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
terraform init

# 1. Base infrastructure
terraform apply -var="deploy_application_services=false"

# 2. Images
cd ../..
IMAGE_TAG=latest ./infra/scripts/build-and-push.sh

# 3. Application services
cd infra/terraform
terraform apply -var="deploy_application_services=true" -var="image_tag=latest"

# 4. Migrations
cd ../..
./infra/scripts/run-migrations.sh all
```

## After the first deploy

1. Copy `frontend_url` from Terraform output
2. Set `frontend_url` in `infra/terraform/terraform.tfvars`
3. Run `terraform apply` again so backend CORS uses the real frontend origin

## Architecture

```text
Internet
   │
   ▼
frontend (ECS Express, public HTTPS)
   │  SSR + /api/auth proxy
   ├──► user-service (ECS Express, private subnets)
   └──► vehicle-service (ECS Express, private subnets)
            │
            ├── RDS user_service
            ├── RDS vehicle_service
            ├── ElastiCache Redis (shared sessions)
            └── Amazon MQ RabbitMQ
```

Browser traffic only hits the frontend. Next.js forwards cookies to backend services during SSR and auth proxy requests.

## Configuration

| File | Purpose |
|------|---------|
| `terraform.tfvars` | Region, sizing, image tag, frontend URL |
| `terraform.tfvars.example` | Committed template |

Common variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `aws_region` | `eu-central-1` | AWS region |
| `image_tag` | `latest` | Docker tag pushed to ECR |
| `deploy_application_services` | `true` | Skip ECS Express on bootstrap apply |
| `frontend_url` | `""` | CORS origin for backend services |
| `ecs_cpu` / `ecs_memory` | `512` / `1024` | Task size for each service |

## Updating an existing deployment

```bash
IMAGE_TAG=v1.2.3 ./infra/scripts/build-and-push.sh

cd infra/terraform
terraform apply \
  -var="deploy_application_services=true" \
  -var="image_tag=v1.2.3"
```

Run migrations when Prisma schema changed:

```bash
./infra/scripts/run-migrations.sh all
```

## Terraform outputs

| Output | Description |
|--------|-------------|
| `frontend_url` | Public app URL |
| `user_service_url` | Internal/user-service Express URL |
| `vehicle_service_url` | Internal/vehicle-service Express URL |
| `ecr_repositories` | ECR URLs for CI/CD |
| `ecs_cluster_ops` | Cluster used for migration tasks |

## Cost notes

This stack is suitable for staging or small production workloads. Main cost drivers:

- NAT Gateway
- 2x RDS `db.t4g.micro`
- Amazon MQ `mq.t3.micro`
- 3x ECS Express services with ALB/autoscaling

For a cheaper sandbox, consider disabling NAT and using public subnets only (not included by default).

## Destroy

```bash
cd infra/terraform
terraform destroy
```

Express Mode deletes ALBs, target groups, and related resources with the service.
