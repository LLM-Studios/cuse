docker rm -f computer_use_container || true

docker build -t computer_use_image $(dirname "$0")