#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TERRAFORM_DIR="${ROOT_DIR}/infra/terraform"
IMAGE_TAG="${IMAGE_TAG:-latest}"
AWS_REGION="${AWS_REGION:-eu-central-1}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_command docker
require_command aws
require_command terraform

cd "${TERRAFORM_DIR}"

if [[ ! -f terraform.tfvars ]]; then
  cp terraform.tfvars.example terraform.tfvars
  echo "Created infra/terraform/terraform.tfvars from example."
fi

AWS_ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

aws ecr get-login-password --region "${AWS_REGION}" \
  | docker login --username AWS --password-stdin "${ECR_REGISTRY}"

FRONTEND_REPO="$(terraform output -json ecr_repositories | python3 -c "import json,sys; print(json.load(sys.stdin)['frontend'])")"
USER_REPO="$(terraform output -json ecr_repositories | python3 -c "import json,sys; print(json.load(sys.stdin)['user_service'])")"
VEHICLE_REPO="$(terraform output -json ecr_repositories | python3 -c "import json,sys; print(json.load(sys.stdin)['vehicle_service'])")"

echo "Building and pushing frontend:${IMAGE_TAG}"
docker build -f "${ROOT_DIR}/apps/frontend/Dockerfile" -t "${FRONTEND_REPO}:${IMAGE_TAG}" "${ROOT_DIR}"
docker push "${FRONTEND_REPO}:${IMAGE_TAG}"

echo "Building and pushing user-service:${IMAGE_TAG}"
docker build -f "${ROOT_DIR}/apps/user-service/Dockerfile" -t "${USER_REPO}:${IMAGE_TAG}" "${ROOT_DIR}"
docker push "${USER_REPO}:${IMAGE_TAG}"

echo "Building and pushing vehicle-service:${IMAGE_TAG}"
docker build -f "${ROOT_DIR}/apps/vehicle-service/Dockerfile" -t "${VEHICLE_REPO}:${IMAGE_TAG}" "${ROOT_DIR}"
docker push "${VEHICLE_REPO}:${IMAGE_TAG}"

echo "Images pushed with tag ${IMAGE_TAG}"
