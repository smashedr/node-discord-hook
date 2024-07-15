FROM node:lts-alpine

LABEL org.opencontainers.image.source="https://github.com/smashedr/node-discord-hook"
LABEL org.opencontainers.image.description="NodeJS Discord Webhook"
LABEL org.opencontainers.image.authors="smashedr"

ENV TZ=UTC

ENV NODE_ENV production

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci &&\
    apk add --no-cache curl

WORKDIR /app
COPY --chown=node:node . .
USER node
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
