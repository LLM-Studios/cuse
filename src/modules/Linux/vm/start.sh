# Remove any existing container named 'computer_use'
# The '|| true' ensures the script continues even if no container exists
docker rm -f computer_use || true

# Build a new Docker image named 'computer_use' using the Dockerfile in the correct path
# Changed from . to specify the full path
docker build -t computer_use $(dirname "$0")

# Check if ports are in use and kill processes if necessary
lsof -ti:5900 | xargs kill -9 2>/dev/null || true
lsof -ti:6080 | xargs kill -9 2>/dev/null || true

# Run a new container in detached mode (-d) with interactive TTY (-it)
docker run -d -it \
    -p 5900:5900 \
    -p 6080:6080 \
    -v $(pwd):/root/computer_use \
    computer_use