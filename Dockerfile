# For production

FROM node:16.20.2-slim as base

ARG PORT=3000
ENV NODE_ENV=production

WORKDIR /src

# Builder
FROM base as build

COPY --link package.json yarn.lock ./
RUN yarn install --production=false
COPY --link . .
RUN yarn build

# Runner
FROM base
ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
CMD [ "node", ".output/server/index.mjs" ]
