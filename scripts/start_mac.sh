#!/bin/bash

# Define the path to the .env file
ENV_PATH="../.env"

# Check if the .env file exists and load it
if [ -f "$ENV_PATH" ]; then
    while IFS='=' read -r key value
    do
        # Remove any unwanted carriage returns or spaces
        key=$(echo $key | tr -d '[:space:]')
        value=$(echo $value | tr -d '[:space:]' | sed 's/\"//g')  # Remove any embedded double quotes
        export $key="$value"
    done < "$ENV_PATH"
fi

# Add a leading slash if missing and ensure no extra quotes
VITE_POCKETBASE_SERVE_DIR=$(echo $VITE_POCKETBASE_SERVE_DIR | sed 's/^\"//; s/\"$//') # Strip leading and trailing quotes
if [[ "$VITE_POCKETBASE_SERVE_DIR" != /* ]]; then
    VITE_POCKETBASE_SERVE_DIR="/$VITE_POCKETBASE_SERVE_DIR"
fi


# Build the command explicitly
COMMAND="pocketbase serve --dir=\"$VITE_POCKETBASE_SERVE_DIR\" --http=\"$VITE_POCKETBASE_SERVE_HTTP\""

# # Print the final command to check it before execution
# echo "Final command to execute: $COMMAND"

# Execute the command
eval $COMMAND


# pocketbase serve --dir="/Users/youchan/Dev/Jnj-soft/_Templates/pocketbase/auth/sqlite" --http="127.0.0.1:8090"
