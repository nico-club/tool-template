# NICO Studio エリア2 — 標準 Dockerfile（Node）
# 別の言語で作りたい場合は、この Dockerfile を書き換えてください。
# レール側は「リポジトリ直下の Dockerfile をビルドする」だけなので、
# 中身が Node でも Python でも Go でも、同じ仕組みで公開されます。

FROM node:20-slim
WORKDIR /app

# 依存だけ先に入れる（キャッシュが効いてビルドが速い）
COPY package*.json ./
RUN npm install --omit=dev

# アプリ本体
COPY . .

ENV NODE_ENV=production

# Cloud Run は PORT を環境変数で渡す。server.js が process.env.PORT を見る想定。
CMD ["node", "server.js"]
