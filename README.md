# LP ジェネレーター — 使い方ガイド

非エンジニアでも使える、toC 向けランディングページの自動生成ツールです。  
フォームUIまたは入力ファイルを使って商材情報を入れるだけで、HTML 形式のLPをローカルで生成できます。

---

## はじめての方へ — まず3ステップで動かす

### ステップ 1｜ターミナルでUIを起動する

ターミナルを開いて、以下をそのままコピーして実行してください。

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null
cd ~/LP-generator-ver.1-main
node ui/server.js
```

起動に成功すると、以下のように表示されます。

```
✓ LP Generator UI が起動しました
→ ブラウザで開く: http://localhost:3000
```

停止するには Ctrl+C を押してください

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
├── assets/
│   ├── uploads/            ← ★ あなたが触るフォルダ③（LP用画像を入れる）
│   │   └── README.txt          画像の入れ方ガイド
│   └── image-manifest.md   ← 自動生成される画像配置レポート（触らない）
│
├── knowledge/              ← 開発者管理の内部ライブラリ（触らない）
│   ├── raw/                    素材置き場（管理者が雑に追加する）
│   │   ├── copy-collection.md      コピー・フレーズの羅列
│   │   ├── lp-screenshot-notes.md  LP観察メモ
│   │   └── screenshots/            スクショ画像置き場
│   └── patterns/               選定ライブラリ（Claude がLP生成時に参照）
│       ├── copy-hooks.md           フック型パターン
│       ├── cta-patterns.md         CTAパターン
│       ├── section-patterns.md     セクション設計パターン
│       ├── tone-patterns.md        トーン・文体パターン
│       └── category-playbooks.md   カテゴリ別訴求戦略
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

### あなたが触るのは3か所だけ

| 目的 | 触る場所 |
|---|---|
| 新しい商材でLPを作る | `input/brand-vars.json` と `input/content-input.md` |
| LP に画像を使いたい | `assets/uploads/` フォルダに画像を入れる |

> **`knowledge/` フォルダは触らないでください。**
> `knowledge/patterns/` は Claude がLP生成時に参照する整理済みパターンライブラリです。
> `knowledge/raw/` は開発者がコピー素材・LP観察メモを蓄積する場所です。
> どちらもエンドユーザーが編集する必要はありません。
> 生成されるLPの品質改善は、`input/` の2ファイルを調整することで行います。

---

## LP に画像を使う

`assets/uploads/` フォルダに画像ファイルを入れるだけで、LP に自動的に配置されます。

### 手順

1. `assets/uploads/` フォルダを開く
2. 使いたい画像ファイルをコピーして入れる
3. Claude Code に LP 生成を依頼する（通常通り）

Claude が画像の内容を見て役割を判断し、適切なセクションに配置します。

### ファイル名ヒント（任意）

ファイル名の先頭に以下のプレフィックスを付けると、より正確に判定されます。
付けなくても Claude が視覚的に判断しますが、ヒントがあると確実です。

| プレフィックス | 役割 | LP内配置 |
|---|---|---|
| `hero-` | ヒーロー背景 | ヒーローセクションの背景全体 |
| `product-` | 商品・人物 | 商品ビジュアル / コーチ写真 |
| `lifestyle-` | 使用シーン | フィーチャーセクション差し込み |
| `sns-` | SNS 投稿風（正方形） | SNS グリッドタイル（最大6枚） |
| `logo-` | ロゴ・バッジ | trust 要素行 |
| `bg-` | テクスチャ・背景 | セクション背景 |

**例:**
```
assets/uploads/
├── hero-outdoor.jpg       ← ヒーロー背景に使われる
├── product-main.png       ← 商品ビジュアルに使われる
├── sns-review1.jpg        ← SNS グリッド1枚目
├── sns-review2.jpg        ← SNS グリッド2枚目
└── sns-review3.jpg        ← SNS グリッド3枚目
```

### 画像がなくても動きます

画像を入れなければ、CSS のグラデーション・カラーブロックで自動的に代替表示されます。
一部だけ画像を入れれば、その部分だけ実画像・残りはフォールバックになります。

### どこに何が使われたか確認する

LP 生成後に `assets/image-manifest.md` を開くと、どの画像がどこに使われたかを確認できます。

---

## フォームUIで入力する（推奨）

JSONやMarkdownを直接編集しなくても、ブラウザのフォームから設定できます。

```bash
# lp-generator フォルダで実行
node ui/server.js
```

起動後、ブラウザで `http://localhost:3000` を開いてください。

### フォームUIの使い方（4タブ）

**① ブランド情報タブ**

ブランド名・商品名・カテゴリ・価格・CTAボタンを入力します。
「詳細設定」「デザイン設定」は折りたたまれています。スキップしても動きます。

**② コンテンツタブ**

商品概要・お客様の声（最大3件）・FAQを入力します。

- 「**FAQを自動補完**」ボタンを押すと、カテゴリに合ったFAQの例が自動入力されます（後から編集できます）
- コンテンツが少なくても生成できます。多いほどLPの質が上がります

**③ 画像タブ（任意）**

使いたい画像をドラッグ＆ドロップするか、クリックして選択するだけでアップロードできます。
画像がなくても LP は生成されます。

**④ LP生成タブ**

「設定を保存してLP生成の準備をする」ボタンを押すと、保存が完了します。
その後、表示される指示文をコピーして、ターミナルの生成ツールに貼り付けてください。

`output/index.html` をブラウザで開けば完成です。

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

### Q. 画像を入れたのに反映されない
→ ファイルが `assets/uploads/` の直下にあるか確認してください（サブフォルダは対象外）。
→ 拡張子が `.jpg` `.jpeg` `.png` `.webp` のいずれかか確認してください。
→ `assets/image-manifest.md` を開き、画像が「検出されたファイル」に載っているか確認してください。

### Q. ヒーロー画像が暗すぎる / 見えにくい
→ `output/index.html` の `.hero::after` の CSS（オーバーレイの透明度）を直接調整してください。
→ またはより明るい画像に差し替えてください。

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
