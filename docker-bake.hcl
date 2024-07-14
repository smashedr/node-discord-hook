group "default" {
  targets = ["node-discord-hook"]
}

target "node-discord-hook" {
  context = "."
  dockerfile = "Dockerfile"
  compose = ["docker-compose-swarm.yaml"]
  platforms = ["linux/amd64", "linux/arm64"]
}
