// NICO Studio エリア2 テンプレート
// これを書き換えて自分のツールにする。main に push すると自動で本番に反映される。
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

// ヘルスチェック（Cloud Run 用・消さない）
app.get("/health", (_req, res) => res.json({ ok: true }));

// ここが「入力 → 処理 → 出力」の本体。まずはエコーを返すだけ。
app.post("/api/run", (req, res) => {
  const input = req.body.input ?? "";
  const output = `受け取りました: ${input}`;
  res.json({ output });
});

// Cloud Run は PORT 環境変数でポートを渡してくる（固定値にしない）
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on ${port}`));
