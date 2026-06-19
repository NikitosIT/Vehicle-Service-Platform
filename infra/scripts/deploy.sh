#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TERRAFORM_DIR="${ROOT_DIR}/infra/terraform"
IMAGE_TAG="${IMAGE_TAG:-latest}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_command terraform
require_command aws
require_command docker

cd "${TERRAFORM_DIR}"

if [[ ! -f terraform.tfvars ]]; then
  cp terraform.tfvars.example terraform.tfvars
  echo "Created infra/terraform/terraform.tfvars from example."
fi

terraform init -upgrade

echo "Step 1/4: provisioning base infrastructure (without ECS Express services)"
terraform apply \
  -var="deploy_application_services=false" \
  -var="image_tag=${IMAGE_TAG}" \
  -auto-approve

echo "Step 2/4: building and pushing container images"
"${ROOT_DIR}/infra/scripts/build-and-push.sh"

echo "Step 3/4: deploying ECS Express services"
terraform apply \
  -var="deploy_application_services=true" \
  -var="image_tag=${IMAGE_TAG}" \
  -auto-approve

echo "Step 4/4: running database migrations"
"${ROOT_DIR}/infra/scripts/run-migrations.sh" all

FRONTEND_URL="$(terraform output -raw frontend_url 2>/dev/null || true)"

cat <<EOF

Deployment finished.

Frontend URL:
  ${FRONTEND_URL:-not available yet}

Next steps:
  1. Open the frontend URL in your browser.
  2. Set frontend_url in infra/terraform/terraform.tfvars to that URL.
  3. Run: terraform apply -var="deploy_application_services=true" -var="image_tag=${IMAGE_TAG}"

Useful commands:
  IMAGE_TAG=${IMAGE_TAG} ./infra/scripts/build-and-push.sh
  IMAGE_TAG=${IMAGE_TAG} terraform apply -var="deploy_application_services=true" -var="image_tag=${IMAGE_TAG}"
  ./infra/scripts/run-migrations.sh all
EOF
