name := 'sui-explorer'
version := 'latest'
tag := name + ':' + version
port := '8080'
sui_rpc_url := 'https://fullnode.testnet.sui.io'


@_default:
    just --list

alias build := docker-build
# Build the explorer image
docker-build:
    docker build -t {{tag}} .

alias start := docker-start
# Run the explorer image
docker-start:
    docker run --name {{name}} --rm -d -p {{port}}:80 -e SUI_RPC_URL={{sui_rpc_url}} {{tag}}

alias stop := docker-stop
# Stop the explorer container
docker-stop:
    #!/usr/bin/env bash
    docker kill {{name}} || true
    docker rm {{name}} || true

alias restart := docker-restart
# Restart the explorer container
docker-restart:
    #!/usr/bin/env bash
    just docker-stop || true
    just docker-start

# Run a shell using the explorer image
docker-image-shell:
    docker run -it --rm --name {{name}}-shell {{name}}:latest sh

alias shell := docker-container-shell
# Run (exec) a shell in the explorer container
docker-container-shell:
    docker exec -it {{name}} sh

alias env-config := docker-container-env-config
# Show env-config.js in the explorer container
docker-container-env-config:
    docker exec -it {{name}} cat /usr/share/nginx/html/env-config.js


alias open := browser-open
# Open the explorer in the default browser
browser-open:
    #!/usr/bin/env bash
    if command -v xdg-open &> /dev/null
    then
        xdg-open http://localhost:{{port}}/
    elif command -v open &> /dev/null
    then
        open http://localhost:{{port}}/
    else
        echo "No suitable browser found to open the URL."
        exit 1
    fi

