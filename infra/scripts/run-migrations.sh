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
  local stream_prefix="$3"

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
    local task_id stopped_reason container_reason
    task_id="${TASK_ARN##*/}"
    stopped_reason="$(
      aws ecs describe-tasks \
        --cluster "${CLUSTER}" \
        --tasks "${TASK_ARN}" \
        --query 'tasks[0].stoppedReason' \
        --output text \
        --region "${AWS_REGION}"
    )"
    container_reason="$(
      aws ecs describe-tasks \
        --cluster "${CLUSTER}" \
        --tasks "${TASK_ARN}" \
        --query 'tasks[0].containers[0].reason' \
        --output text \
        --region "${AWS_REGION}"
    )"

    echo "${label} migration failed with exit code ${EXIT_CODE}" >&2
    echo "Stopped reason: ${stopped_reason}" >&2
    echo "Container reason: ${container_reason}" >&2
    echo "Recent CloudWatch logs:" >&2
    MSYS_NO_PATHCONV=1 aws logs tail "${MIGRATIONS_LOG_GROUP}" \
      --since 15m \
      --region "${AWS_REGION}" \
      --log-stream-name-prefix "${stream_prefix}/migrate/${task_id}" \
      2>&1 || true
    exit 1
  fi

  echo "${label} migration completed successfully"
}

cd "${TERRAFORM_DIR}"

CLUSTER="$(terraform output -raw ecs_cluster_ops)"
SECURITY_GROUP="$(terraform output -raw ecs_tasks_security_group_id)"
SUBNETS="$(terraform output -json private_subnet_ids | node -e "const fs=require('fs'); const value=JSON.parse(fs.readFileSync(0, 'utf8')); console.log(value.join(','));")"

TASKS="$(terraform output -json migration_task_definitions)"
USER_TASK="$(node -e "const fs=require('fs'); const value=JSON.parse(fs.readFileSync(0, 'utf8')); console.log(value.user_service);" <<<"${TASKS}")"
VEHICLE_TASK="$(node -e "const fs=require('fs'); const value=JSON.parse(fs.readFileSync(0, 'utf8')); console.log(value.vehicle_service);" <<<"${TASKS}")"
MIGRATIONS_LOG_GROUP="/ecs/vsp-prod/migrations"

case "${SERVICE}" in
  user)
    run_task "${USER_TASK}" "user-service" "user-service"
    ;;
  vehicle)
    run_task "${VEHICLE_TASK}" "vehicle-service" "vehicle-service"
    ;;
  all)
    run_task "${USER_TASK}" "user-service" "user-service"
    run_task "${VEHICLE_TASK}" "vehicle-service" "vehicle-service"
    ;;
  *)
    echo "Usage: $0 [all|user|vehicle]" >&2
    exit 1
    ;;
esac
