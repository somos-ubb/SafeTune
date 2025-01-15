FROM node:18 AS builder
COPY package*.json ./
RUN npm install
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18
COPY --from=builder build build/
COPY --from=builder node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]