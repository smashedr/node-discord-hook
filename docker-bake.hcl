group "default" {
  targets = ["node-discord-hook"]
  platforms = ["linux/amd64", "linux/arm64"]
}

target "node-discord-hook" {
  compose = ["docker-compose-swarm.yaml"]
  tags = [
    "ghcr.io/smashedr/node-discord-hook-nginx:latest",
    "ghcr.io/smashedr/node-discord-hook-app:latest"
  ]
}
