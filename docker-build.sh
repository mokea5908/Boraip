#!/bin/bash
set -e

IMAGE_NAME="bora-web"
IMAGE_TAG="latest"
OUTPUT_FILE="${IMAGE_NAME}-${IMAGE_TAG}.tar.gz"

echo "=== Docker 이미지 빌드 중... ==="
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

echo "=== tar.gz로 내보내는 중... ==="
docker save ${IMAGE_NAME}:${IMAGE_TAG} | gzip > ${OUTPUT_FILE}

echo ""
echo "=== 완료! ==="
echo "파일: ${OUTPUT_FILE}"
echo "크기: $(du -h ${OUTPUT_FILE} | cut -f1)"
echo ""
echo "=== 다른 서버에서 설치 방법 ==="
echo "  docker load < ${OUTPUT_FILE}"
echo "  docker run -d -p 80:80 ${IMAGE_NAME}:${IMAGE_TAG}"
