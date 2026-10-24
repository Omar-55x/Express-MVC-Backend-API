FROM node:24.14.0-alpine3.23

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci --only=production

RUN mkdir -p /usr/src/app/logs && \
    chown node:node /usr/src/app/logs

USER node

COPY --chown=node:node . .

EXPOSE 3500

CMD [ "node", "server.js" ]