docker rm -f localstack

docker run \
  --name localstack \
  -d \
  -e DATA_DIR=/tmp/localstack/data \
  -e DOCKER_HOST=unix:///var/run/docker.sock \
  -e SERVICES="s3:4569" \
  -p 4567-4583:4567-4583 \
  -p 8080:8080 \
  -v localstackdata:/tmp/localstack \
  -v /var/run/docker.sock:/var/run/docker.sock \
  localstack/localstack
