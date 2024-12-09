docker stop computer_use_container >/dev/null 2>&1 || true

docker rm computer_use_container >/dev/null 2>&1 || true

docker run -d -it \
    --name computer_use_container \
    -p 5900:5900 \
    -p 6080:6080 \
    -p 8000:8000 \
    -v $(pwd):/root/computer_use \
    computer_use_image