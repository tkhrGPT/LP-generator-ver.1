# LP ジェネレーター — 使い方ガイド

非エンジニアでも使える、toC 向けランディングページの自動生成ツールです。
2つのファイルに情報を入力して Claude Code に指示するだけで、HTML 形式のLPが生成されます。

---

## はじめての方へ — まず3ステップで動かす

**ステップ 1｜`input/brand-vars.json` を開いて書き換える**

テキストエディタで開き、`"値"` の部分だけを自分の商材に合わせて書き換えてください。
最低限、以下の5項目を書き換えれば動きます。

```json
"brand_name":    "あなたのブランド名",
"product_name":  "商品名",
"category":      "cosmetics",   ← 商材に合うものを選ぶ
"main_color":    "#F3E7E2",      ← ブランドカラー（16進数）
"cta_label":     "今すぐ購入する"
```

**ステップ 2｜`input/content-input.md` を開いて埋める**

`#` の見出しはそのままにして、その下のテキストだけ書き換えてください。
`# 【記入例】` の行はヒントです。上書きして自分の内容にしてください。

**ステップ 3｜Claude Code に生成を依頼する**

Claude Code を起動し、以下をそのままコピーして送信してください。

```
prompt/PROMPT.md の指示に従って作業してください。
必要なファイルを読み込み、output/index.html を生成してください。
```

`output/index.html` をブラウザで開けば完成です。

---

## このツールでできること

- 商材情報・世界観をフォームに入力するだけで LP の HTML が自動生成される
- 商材が変わっても、入力ファイルを書き換えるだけで再利用できる
- cosmetics / supplement / apparel / course / app / food など複数カテゴリに対応
- 生成された HTML をブラウザで開けばすぐに確認できる

---

## ファイル構成

```
lp-generator/
├── input/
│   ├── brand-vars.json     ← ★ あなたが触るファイル①（デザイン・設定）
│   └── content-input.md    ← ★ あなたが触るファイル②（テキスト素材）
│
├── knowledge/              ← 開発者管理の内部パターンライブラリ（触らない）
│   ├── copy-hooks.md           フック型パターン
│   ├── cta-patterns.md         CTAパターン
│   ├── section-patterns.md     セクション設計パターン
│   ├── tone-patterns.md        トーン・文体パターン
│   └── category-playbooks.md   カテゴリ別訴求戦略
│
├── prompt/
│   └── PROMPT.md           ← 開発者管理の指示書（触らない）
│
├── output/
│   └── index.html          ← 自動生成されるLP（触らない）
│
├── ui/
│   └── server.js           ← フォームUI用サーバー（Node.js）
│
├── generator-spec.md       ← 設計仕様書（開発者向け）
└── README.md               ← このファイル
```

### あなたが触るのは2ファイルだけ

| 目的 | 触るファイル |
|---|---|
| 新しい商材でLPを作る | `input/brand-vars.json` と `input/content-input.md` |

> **`knowledge/` フォルダは触らないでください。**
> Claude がLP生成時に参照するパターンライブラリです。
> 開発者が管理するもので、エンドユーザーが編集する必要はありません。
> 生成されるLPの品質改善は、`input/` の2ファイルを調整することで行います。

---

## フォームUIで入力する（推奨）

JSONやMarkdownを直接編集しなくても、ブラウザのフォームから設定できます。

```bash
# lp-generator フォルダで実行
node ui/server.js
```

起動後、ブラウザで `http://localhost:3000` を開いてください。
フォームに入力して「保存する」を押すと `input/brand-vars.json` と `input/content-input.md` が自動更新されます。

> **前提**: Node.js がインストールされていること。`npm install` は不要です。

---

## ファイルを直接編集する場合

### 1. 入力ファイルを編集する

**① `input/brand-vars.json` を開く**

テキストエディタ（メモ帳・VS Code など）で開き、各項目の `"値"` の部分だけ書き換えてください。

```json
{
  "brand_name": "ここにブランド名を入れる",
  "product_name": "ここに商品名を入れる",
  "category": "cosmetics",  ← 下の選択肢から選ぶ
  ...
}
```

`_comment` から始まる行は説明文なので変更不要です。

**② `input/content-input.md` を開く**

`#` で始まる見出しはそのままにして、その下の文章・箇条書きを書き換えてください。

### 2. Claude Code を起動して実行する

プロジェクトのルート（`lp-generator/` フォルダ）で Claude Code を起動し、以下のように伝えてください。

```
prompt/PROMPT.md の指示に従って作業してください。
必要なファイルを読み込み、output/index.html を生成してください。
```

### 3. 出力を確認する

`output/index.html` をブラウザで開いてください。

```
lp-generator/
└── output/
    └── index.html  ← これをブラウザにドラッグ＆ドロップ
```

---

## 商材を変えるときの手順

1. `input/brand-vars.json` を新しい商材の設定に書き換える
2. `input/content-input.md` を新しい商材のコンテンツに書き換える
3. Claude Code に「`prompt/PROMPT.md` の指示に従って `output/index.html` を生成してください」と伝える
4. `output/index.html` を確認する

---

## brand-vars.json の主要設定一覧

### category（商材カテゴリ）

| 値 | 向いている商材 |
|---|---|
| `cosmetics` | 化粧品・美容液・スキンケア |
| `supplement` | サプリメント・健康食品 |
| `apparel` | 衣類・ファッション小物 |
| `course` | オンライン講座・教材・書籍 |
| `app` | アプリ・デジタルサービス・SaaS |
| `food` | 食品・飲料 |
| `other` | その他 |

### structure_template（LP の構成テンプレート）

| 値 | 構成の流れ | 向いているケース |
|---|---|---|
| `story` | 共感 → 出会い → 特徴 → 信頼 → FAQ → CTA | 感情訴求・共感重視の商材 |
| `trust` | 課題 → 根拠 → 特徴 → レビュー → FAQ → CTA | 効果・信頼性を重視したい商材 |
| `offer` | オファー → メリット → 根拠 → CTA | 割引・キャンペーン訴求が強い場合 |

### brand_tone（デザインのトーン）

カンマ区切りで複数指定できます。

| 値 | 印象 |
|---|---|
| `clean` | 清潔感・シンプル・ノイズなし |
| `premium` | 上質・余白広め・高級感 |
| `energetic` | 活気・コントラスト強め |
| `playful` | 楽しい・丸み・明るい |
| `bold` | 力強い・インパクト重視 |
| `warm` | 温かい・やわらかい |
| `reassuring` | 安心・信頼・親しみやすい |

### cta_style（CTAボタンのトーン）

| 値 | 印象・向いているケース |
|---|---|
| `soft` | やわらかく自然。押しつけない |
| `bold` | 行動を強く促す。低単価・衝動買いしやすい商材向き |
| `urgent` | 限定感・緊急性。セール・期間限定キャンペーン向き |

---

## よくあるつまずき

### Q. `output/index.html` が生成されない
→ Claude Code が `input/brand-vars.json` または `input/content-input.md` を読めていない可能性があります。ファイル名に誤りがないか確認してください。

### Q. デザインが期待と違う
→ `brand-vars.json` の `brand_tone` `category` `structure_template` を確認してください。これらがデザインに大きく影響します。

### Q. 色が反映されていない
→ `main_color` `accent_color` `base_bg_color` が正しい16進数カラーコード（例: `#FF5733`）で入力されているか確認してください。

### Q. CTAボタンの文字を変えたい
→ `brand-vars.json` の `cta_label`（メインボタン）と `cta_sub_label`（サブボタン）を変更して再生成してください。

### Q. フォームの項目を増やしたい
→ `brand-vars.json` の `form_fields` に追加してください（最大6項目推奨）。

### Q. レビューを増やしたい
→ `content-input.md` の「お客様の声・レビュー」セクションに追記して再生成してください。

### Q. 法律的な注意書きを追加したい
→ `brand-vars.json` の `legal_notes` に追記するか、`content-input.md` の「注意事項・免責」に記載してください。

---

## 改善サイクルの回し方

1. LP を確認してフィードバックをメモする
2. `brand-vars.json` または `content-input.md` を修正する
3. Claude Code に再生成を依頼する
4. 繰り返す

細かい調整が必要な場合は、Claude Code に「〇〇のセクションだけ修正してください」と伝えることもできます。

---

## ライセンス・免責

このツールで生成されたHTMLは自由に使用・改変できます。
生成されたコンテンツの内容・表現については、公開前に必ずご自身でご確認ください。
