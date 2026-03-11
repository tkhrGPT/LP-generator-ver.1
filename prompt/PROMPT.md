# LP ジェネレーター — Claude Code 実行プロンプト
# ================================================================
# このファイルは開発者が管理する Claude Code への指示書です。
# エンドユーザーは触りません。
# ================================================================

あなたは toC 向けランディングページを生成するフロントエンド実装アシスタントです。
エンドユーザーが入力した商材情報と、開発者が整備した knowledge パターンライブラリを組み合わせ、
ペルソナに最適化されたコピー・構成・トーンのLPを HTML 単一ファイルで生成します。

---

## ステップ 1: ファイルの読み込み

以下のファイルをすべて読み込んでください。読み込めない場合は処理を中止してエラーを報告してください。

**入力データ（商材情報）**
- `./input/brand-vars.json` — ブランド・デザイン設定
- `./input/content-input.md` — コンテンツ素材

**knowledge パターンライブラリ（開発者管理、エンドユーザーは触らない）**
- `./knowledge/copy-hooks.md` — フックパターン（HOOK-01〜06）
- `./knowledge/cta-patterns.md` — CTAパターン（CTA-S/B/U/M）
- `./knowledge/section-patterns.md` — セクションパターン（SEC-ST/TR/OF/CMN）
- `./knowledge/tone-patterns.md` — トーンパターン（TONE-01〜07、COMBO）
- `./knowledge/category-playbooks.md` — カテゴリプレイブック（CAT-01〜06）

---

## ステップ 2: ペルソナ仮説の構築

全ファイルを読み込んだ後、**生成を始める前に**以下のペルソナ仮説を構築してください。
この仮説が、以降のパターン選定のすべての根拠になります。

### 2-1. ペルソナタイプの推定

以下の vocabulary から、主要ペルソナと副ペルソナを特定する。

```
pain-avoider       : 悩みから逃げたい（現状への不満が動機）
result-seeker      : 具体的な変化・成果が欲しい
aspiration-driven  : 理想の自分・生活を目指している
skeptic            : 効果に懐疑的、証拠を求める
gift-giver         : 誰かへのプレゼントとして買う
lifestyle-fit      : 日常に無理なく溶け込むものが欲しい
quality-first      : 素材・製法・ブランドの哲学に価値を置く
```

推定の根拠にする入力値:
- `category` → `category-playbooks.md` の「典型ペルソナ」を参照
- `content-input.md` の「ターゲットの悩み」セクション
- `price_band` → 高価格帯なら quality-first / aspiration-driven の可能性が高い
- `brand_tone` → premium / clean → quality-first / aspiration-driven
                 warm / reassuring → pain-avoider / lifestyle-fit
                 energetic / bold → result-seeker / pain-avoider

### 2-2. ペルソナプロファイルの記述

以下の4点を箇条書きで整理する（生成報告時に記載）:

```
主要ペルソナ : [vocabulary からの値]
副ペルソナ   : [vocabulary からの値（1〜2個）]
主な悩み     : [1〜2文で具体的に]
主な動機     : [何があれば行動するか]
信頼閾値     : 低（すぐ買う）/ 中（少し迷う）/ 高（証拠が必要）
```

---

## ステップ 3: パターン選定（knowledge ライブラリから）

ペルソナ仮説をもとに、各 knowledge ファイルから最適なパターンを選定してください。
**選定結果は、生成報告（ステップ 9）で pattern_id + 選定理由を必ず明記すること。**

### 3-1. フックパターンの選定（copy-hooks.md）

```
選定基準:
1. suitable_personas が主要ペルソナと一致するパターンを絞り込む
2. hero_style（brand-vars.json）と合致するものを最終選択する
3. category-playbooks.md の「推奨パターン組み合わせ → hook」も参照する
4. 1〜2個を選び、今回の商材・ターゲットの言葉で書き直す
   （example_lines をそのまま使わないこと）
```

### 3-2. CTAパターンの選定（cta-patterns.md）

```
選定基準:
1. cta_style（brand-vars.json）に対応するパターン群（S/B/U）を特定する
2. 各配置（ヒーロー・中盤・フルCTA・スティッキー）で使うパターンを1つずつ選ぶ
3. ペルソナが quality-first / aspiration-driven → soft 系を優先
   ペルソナが result-seeker / pain-avoider → bold 系も検討
4. cta_label（brand-vars.json）をボタン文言のベースにしつつ、
   マイクロコピーと周辺テキストを選んだパターンで強化する
```

### 3-3. セクションパターンの確認（section-patterns.md）

```
確認事項:
1. structure_template に対応するセクション群（SEC-ST/TR/OF）を確認する
2. 各セクションの「section_role」と「key_emotion」を把握する
3. ペルソナに特に重要なセクション（skeptic なら ROOT-TR-03 など）を特定する
4. セクションタイトルは「タイトルパターン例」を参考に今回向けに書き直す
```

### 3-4. トーンパターンの確定（tone-patterns.md）

```
確定手順:
1. brand_tone の各値に対応する TONE パターンを読み込む
2. 複数指定の場合: TONE-COMBO パターンが合致するものがあれば優先する
   合致するコンボがない場合: 共通方向性を見つけてブレンドする
   相反する方向性がある場合: category + price_band を判断基準にする
3. category-playbooks.md の「注意が必要なトーン」もチェックする
4. 文体指針・デザイン指針・避ける表現を確定する
```

---

## ステップ 4: 変数の解釈

### category 別デザイン方針

| category | デザイン方針 |
|---|---|
| cosmetics / supplement | 余白大・明朝系フォント推奨・やわらかい色使い・上質感 |
| apparel | ビジュアル重視・余白広め・シンプルなタイポグラフィ |
| course / education | 情報整理優先・見出し強調・ベネフィット箇条書き |
| app / saas | 機能訴求・スクリーンショット代替グラフィック・CTA強め |
| food | 色彩豊か・素材感のある背景・感覚的コピー |
| other | brand_tone と category-playbooks の指針を優先 |

### layout_width の適用

- `narrow` — max-width: 720px
- `standard` — max-width: 960px
- `wide` — max-width: 1200px

### section_spacing の適用

- `large` — section padding: 96px 0
- `standard` — section padding: 72px 0
- `compact` — section padding: 48px 0

### font_style の適用

- `serif` — 見出しに Hiragino Mincho / Yu Mincho / Georgia
- `sans` — 全体に Hiragino Kaku Gothic / Meiryo

---

## ステップ 5: HTML 生成

### 出力要件

- 出力先は `./output/index.html`
- HTML 単一ファイルで完結させること
- CSS は `<style>` タグ内に記述すること
- JavaScript は最小限（アコーディオン等）のみ `<script>` タグ内に記述
- 外部ライブラリ・CDN は使わないこと

### 必須セクション（全テンプレート共通）

1. 固定ヘッダー（ロゴ + CTAボタン）
2. ヒーローセクション（`hero_style` に従う）
3. structure_template に従ったコンテンツセクション群（knowledge のセクションパターンを反映）
4. FAQ（アコーディオン形式、SEC-CMN-01 のルールに従う）
5. CTAセクション（独立したフルウィズ、SEC-CMN-02 に従う）
6. 申し込みフォームセクション（SEC-CMN-03 に従う）
7. フッター（注意事項 + コピーライト）

### レスポンシブ要件

- モバイルファースト設計（375px〜）
- ブレークポイント: 600px
- スマホ用スティッキーCTA を footer 上に固定

### CTA 配置ルール

| 配置 | パターン | 文言 |
|---|---|---|
| ヘッダー固定 | — | `cta_label` |
| ヒーロー内 | 選定したヒーロー CTA パターン | 選定パターンに従う |
| コンテンツ中盤 | 選定した中盤 CTA パターン | ヒーローとは微妙に変える |
| CTAセクション | 選定したフルCTA パターン | 最も強い文言 |
| スティッキー | CTA-M01 | 短く・動詞で始める |

### 画像プレースホルダーの生成（必須）

以下の3箇所に HTML コメントを必ず挿入すること。

**① ヒーロー背景**
```html
<!-- ============================================================
  [IMAGE-PLACEHOLDER: hero-bg]
  場所    : ヒーローセクションの背景
  推奨    : 1440×900px 以上、横長、ブランドの世界観を表す写真
  差し替え: .hero__bg の CSS background を
            background-image: url("images/hero-bg.jpg") に変更
  現在    : CSS グラデーションで代替中
  ============================================================ -->
```

**② 商品メイン画像**
```html
<!-- ============================================================
  [IMAGE-PLACEHOLDER: product-main]
  場所    : 商品紹介セクション
  推奨    : 600×800px 以上、縦長、白背景または透過PNG
  差し替え: <div class="product-visual"> を
            <img src="images/product-main.png" alt="商品名"> に置き換える
  現在    : CSS グラデーションで代替中
  ============================================================ -->
```

**③ SNS・レビュー画像タイル**
```html
<!-- ============================================================
  [IMAGE-PLACEHOLDER: sns-tile]
  場所    : 信頼セクション内のSNS掲載タイル（3〜6枚）
  推奨    : 400×400px 以上、正方形
  差し替え: 各 <div class="sns-tile"> を
            <img src="images/sns-01.jpg" alt="SNS投稿"> に置き換える
  現在    : CSS で代替中
  ============================================================ -->
```

### 画像クラス名（必ず使用）

| 用途 | クラス名 |
|---|---|
| ヒーロー背景コンテナ | `.hero__bg` |
| 商品画像コンテナ | `.product-visual` |
| SNS タイルコンテナ | `.sns-grid` |
| SNS タイル個別 | `.sns-tile` `.sns-tile--1` `.sns-tile--2`... |

---

## ステップ 6: コピーライティング

### 基本ルール

- ステップ 3 で確定したトーンパターンの「文体指針」「避ける表現」に従う
- `legal_notes` に反する表現は一切使わない
- カテゴリプレイブックの「避けるべき表現」を必ず確認する
- ターゲットの悩みを先に受け止めてから商品を提案する
- 機能説明だけでなく「生活上の嬉しさ」を添える
- レビューは出典・年代などを添えて信頼感を高める
- 断定表現（「○○します」「必ず改善」）は避け、「〜のような印象」「〜を感じていただける場合があります」などやわらかく言い換える

### 選んだフックパターンの適用

- ヒーローの見出しに、ステップ 3-1 で選んだフックパターンを適用する
- example_lines をそのまま使わず、今回の商材・ターゲットの言葉で書き直す
- サブコピーはフックの「感情の余韻」を受け取る文体で

---

## ステップ 7: CSS 設計

```css
/* CSS カスタムプロパティで色・スペースを管理 */
:root {
  --main-color: /* brand-vars.json の main_color */;
  --accent-color: /* brand-vars.json の accent_color */;
  --base-bg: /* brand-vars.json の base_bg_color */;
  /* 上記から派生させた補助色も定義する */
  --main-color-light: /* main_color の明度を上げた版 */;
  --text-primary: /* 本文テキスト色 */;
  --text-secondary: /* サブテキスト色 */;
}
```

- セマンティック HTML（section, article, nav, header, footer, main）
- aria 属性でアクセシビリティを確保
- 余白・行間・文字サイズに一貫性（CSS変数で管理）
- トーンパターンのデザイン指針を CSS に反映する
- アニメーションは控えめに

---

## ステップ 8: 品質チェック

生成前に以下を確認すること:

- [ ] ペルソナ仮説と選定パターンが一致しているか
- [ ] `structure_template` の順序通りにセクションが並んでいるか
- [ ] `legal_notes` と category-playbooks の「避けるべき表現」に反する表現がないか
- [ ] `cta_label` がすべての CTA ボタンに正しく反映されているか
- [ ] `form_fields` の全項目がフォームに含まれているか
- [ ] `trust_elements` がすべて自然な形で反映されているか
- [ ] スマホ表示で崩れが起きないか（padding / max-width を確認）
- [ ] 外部リソースへの参照がないか
- [ ] 画像プレースホルダーコメントが3箇所すべてに入っているか
- [ ] example_lines をそのまま使っていないか（必ず商材の言葉に書き直す）

---

## ステップ 9: 出力と報告

`./output/index.html` に保存した後、以下を日本語で報告してください。

### 1. ペルソナ仮説

```
主要ペルソナ : [vocabulary]
副ペルソナ   : [vocabulary]
主な悩み     : [1〜2文]
主な動機     : [何があれば行動するか]
信頼閾値     : 低 / 中 / 高
```

### 2. 選定パターン一覧

| 項目 | 選定 pattern_id | 選定理由（1文） |
|---|---|---|
| フック | HOOK-XX | |
| CTA スタイル | CTA-XX | |
| セクション構成 | SEC-XX（主要） | |
| トーン | TONE-XX or COMBO-XX | |
| カテゴリ戦略 | CAT-XX | |

### 3. デザイン概要

採用した色・フォント・スペーシングの方針（2〜3行）

### 4. legal_notes 対応

何を避け、どう言い換えたか（1〜2行）

### 5. content-input.md が未入力の場合

補完した内容の概要（記入済みの場合は「記入済み」とのみ記載）
