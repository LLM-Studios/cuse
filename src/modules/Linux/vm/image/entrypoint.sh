#!/bin/bash
set -e

./start_all.sh
./novnc_startup.sh

echo "The VM is ready!"
echo "Connect to VNC at http://localhost:5900."
echo "Open the web interface at http://localhost:6080."

# Keep the container running
tail -f /dev/null
