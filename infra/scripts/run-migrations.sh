#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TERRAFORM_DIR="${ROOT_DIR}/infra/terraform"
AWS_REGION="${AWS_REGION:-eu-central-1}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
SERVICE="${1:-all}"

run_task() {
  local task_definition="$1"
  local label="$2"

  echo "Running ${label} migration task (${task_definition})"

  TASK_ARN="$(
    aws ecs run-task \
      --cluster "${CLUSTER}" \
      --launch-type FARGATE \
      --task-definition "${task_definition}" \
      --network-configuration "awsvpcConfiguration={subnets=[${SUBNETS}],securityGroups=[${SECURITY_GROUP}],assignPublicIp=DISABLED}" \
      --query 'tasks[0].taskArn' \
      --output text \
      --region "${AWS_REGION}"
  )"

  aws ecs wait tasks-stopped \
    --cluster "${CLUSTER}" \
    --tasks "${TASK_ARN}" \
    --region "${AWS_REGION}"

  EXIT_CODE="$(
    aws ecs describe-tasks \
      --cluster "${CLUSTER}" \
      --tasks "${TASK_ARN}" \
      --query 'tasks[0].containers[0].exitCode' \
      --output text \
      --region "${AWS_REGION}"
  )"

  if [[ "${EXIT_CODE}" != "0" ]]; then
    echo "${label} migration failed with exit code ${EXIT_CODE}" >&2
    exit 1
  fi

  echo "${label} migration completed successfully"
}

cd "${TERRAFORM_DIR}"

CLUSTER="$(terraform output -raw ecs_cluster_ops)"
SECURITY_GROUP="$(terraform output -raw ecs_tasks_security_group_id)"
SUBNETS="$(terraform output -json private_subnet_ids | python3 -c "import json,sys; print(','.join(json.load(sys.stdin)))")"

TASKS="$(terraform output -json migration_task_definitions)"
USER_TASK="$(python3 -c "import json,sys; print(json.load(sys.stdin)['user_service'])" <<<"${TASKS}")"
VEHICLE_TASK="$(python3 -c "import json,sys; print(json.load(sys.stdin)['vehicle_service'])" <<<"${TASKS}")"

case "${SERVICE}" in
  user)
    run_task "${USER_TASK}" "user-service"
    ;;
  vehicle)
    run_task "${VEHICLE_TASK}" "vehicle-service"
    ;;
  all)
    run_task "${USER_TASK}" "user-service"
    run_task "${VEHICLE_TASK}" "vehicle-service"
    ;;
  *)
    echo "Usage: $0 [all|user|vehicle]" >&2
    exit 1
    ;;
esac
