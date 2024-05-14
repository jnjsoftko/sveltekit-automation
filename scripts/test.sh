#!/bin/bash

# Load the .env file
if [ -f ../.env ]; then
    export $(cat ../.env | xargs)
fi

# Now use the SETTING_DIR variable
echo "VITE_APP_ROOT_DIR is set to: $VITE_APP_ROOT_DIR"
# echo pocketbase serve --dir="$VITE_POCKETBASE_DIR" --http="127.0.0.1:8090"
# chmod +x test.sh