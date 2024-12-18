#!/bin/bash
set -e

./start_all.sh
./novnc_startup.sh

echo "The VM is ready!"
echo "Connect to VNC at http://localhost:5900."
echo "Open the web interface at http://localhost:6080."

# Run the API server
python -m uvicorn main:app --host 0.0.0.0 --port 8000
echo "API server is running on http://localhost:8000"

# Keep the container running
tail -f /dev/null
