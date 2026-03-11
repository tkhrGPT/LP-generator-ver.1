# CTAパターン パターンライブラリ
# ================================================================
# このファイルは開発者が管理するパターンライブラリです。
# エンドユーザーは触りません。Claude が LP 生成時に参照します。
# ================================================================
#
# 使い方（Claude へ）:
# 1. ペルソナ仮説・cta_style・lp_goal をもとに、各配置場所で使う CTA パターンを選ぶ
# 2. 全配置で同じ文言を使わず、文脈に合わせて微妙に変える
# 3. brand-vars.json の cta_label を優先しつつ、マイクロコピー・周辺コピーを強化する
# 4. example_lines はそのまま使わず、今回の商材の言葉で書き直す
# ================================================================

---

## CTA-S01: ソフト型 — ヒーロー配置

```
pattern_id        : CTA-S01
pattern_name      : ソフト型 ヒーロー配置
summary           : 「まず知る・試す」温度感で、押しつけず自然に次のステップへ誘う
suitable_categories: cosmetics, apparel, food, supplement
suitable_personas : lifestyle-fit, quality-first, aspiration-driven
suitable_price_band: mid, high, premium
suitable_lp_goals : purchase, trial, inquiry
suitable_templates: story
tone              : clean, premium, warm
avoid_when        : lp_goal が signup / trial で緊急性が必要な場合。pain-avoider で離脱率が高い場面
```

### ボタン文言パターン

```
[メインCTA]  まずは詳しく見る / じっくり読む / 試してみる
[サブCTA]    すでに気になっている方へ / 詳細ページへ
```

### マイクロコピー例

```
※ いつでもやめられます
今だけのご案内です
はじめての方へ、特別なご用意があります
```

### 選定ロジック

- `cta_style: soft` のとき標準選択
- ペルソナが `lifestyle-fit` / `quality-first` のとき — 急かすと逆効果
- `premium` 価格帯では「今すぐ」系を使わない

---

## CTA-S02: ソフト型 — 中盤コンテンツ配置

```
pattern_id        : CTA-S02
pattern_name      : ソフト型 中盤コンテンツ配置
summary           : 特徴・ベネフィットを読んで「気になり始めた」状態で自然に背中を押す
suitable_categories: cosmetics, supplement, course, food
suitable_personas : lifestyle-fit, aspiration-driven, pain-avoider
suitable_price_band: low, mid, high
suitable_lp_goals : purchase, trial
suitable_templates: story, trust
tone              : warm, clean, reassuring
avoid_when        : offer テンプレートで単価訴求が主軸の場合（CTA-B02 を使う）
```

### ボタン文言パターン

```
[メインCTA]  気になったら試してみる / 詳しくはこちら
[サブCTA]    まずは内容を確認する
```

### マイクロコピー例

```
読んで気になった方は、ぜひ一度お試しください
返金保証付きなので、安心して試せます
```

### 選定ロジック

- コンテンツ中盤（特徴セクション後）に配置
- 流れを止めないよう、目立たせすぎない（background を薄くする）
- trust_elements に「返金保証」が含まれる場合、マイクロコピーで触れる

---

## CTA-S03: ソフト型 — フルCTAセクション配置

```
pattern_id        : CTA-S03
pattern_name      : ソフト型 フルCTAセクション
summary           : 最後の後押し。「ここまで読んでくれた人」に静かに呼びかける
suitable_categories: cosmetics, apparel, food
suitable_personas : quality-first, aspiration-driven, lifestyle-fit
suitable_price_band: high, premium
suitable_lp_goals : purchase, inquiry
suitable_templates: story
tone              : premium, clean, warm
avoid_when        : lp_goal が trial / signup で期間限定オファーがある場合（CTA-U03 を使う）
```

### ボタン文言パターン

```
[メインCTA]  はじめてみる / 試してみる / お申し込みはこちら
[サブテキスト]  ここまで読んでくださったあなたへ。/ 選んでくれた方だけに、丁寧にお届けします。
```

### マイクロコピー例

```
定期購入ではありません。1回のみのお試しからどうぞ
合わなければご連絡ください。返金対応しています
```

---

## CTA-B01: ボールド型 — ヒーロー配置

```
pattern_id        : CTA-B01
pattern_name      : ボールド型 ヒーロー配置
summary           : 価値を一瞬で信じさせ、強い行動喚起で即決を促す
suitable_categories: supplement, app, course, food
suitable_personas : result-seeker, pain-avoider
suitable_price_band: low, mid
suitable_lp_goals : purchase, trial, signup
suitable_templates: trust, offer
tone              : energetic, bold
avoid_when        : premium 価格帯（信頼構築前の強引なCTAは逆効果）。quality-first ペルソナ
```

### ボタン文言パターン

```
[メインCTA]  今すぐ購入する / 限定特典を受け取る / 申し込む
[サブCTA]    まずは詳しく見る
```

### マイクロコピー例

```
送料無料・即日発送
今月の残り在庫: ○○点
```

### 選定ロジック

- `cta_style: bold` のとき標準選択
- `lp_goal: purchase` かつ `price_band: low / mid` のとき
- ペルソナが `result-seeker` で決断が早い場合

---

## CTA-B02: ボールド型 — 中盤コンテンツ配置

```
pattern_id        : CTA-B02
pattern_name      : ボールド型 中盤コンテンツ配置
summary           : ベネフィット・実績を読み終えた直後に、行動の「今がタイミング」を伝える
suitable_categories: supplement, course, app
suitable_personas : result-seeker, skeptic（証拠を読んだ後）
suitable_price_band: low, mid
suitable_lp_goals : purchase, trial
suitable_templates: trust, offer
tone              : energetic, bold, reassuring
avoid_when        : story テンプレートで感情的な流れが続いている場合（流れを断ち切る）
```

### ボタン文言パターン

```
[メインCTA]  この内容で試してみる / 購入ページへ進む
[サブCTA]    まとめを読む / もっと詳しく
```

### マイクロコピー例

```
3分で申し込み完了
今ならセット価格でご提供中
```

---

## CTA-B03: ボールド型 — フルCTAセクション配置

```
pattern_id        : CTA-B03
pattern_name      : ボールド型 フルCTAセクション
summary           : クライマックス。全情報を読んだ後の「決断の瞬間」を演出する
suitable_categories: supplement, course, app, food
suitable_personas : result-seeker, pain-avoider
suitable_price_band: low, mid, high
suitable_lp_goals : purchase, trial, signup
suitable_templates: trust, offer
tone              : energetic, bold
avoid_when        : premium × quality-first（押しすぎる印象になる）
```

### ボタン文言パターン

```
[メインCTA]  今すぐ申し込む / 特典付きで購入する / 試してみる
[リード文]   ここまで読んでくださったなら、一度試してみる価値はあると思っています。
```

### マイクロコピー例

```
○日間返金保証付き
定期縛りなし / 1回でも解約OK
今月中のご注文で、特典プレゼント
```

---

## CTA-U01: 緊急型 — ヒーロー配置

```
pattern_id        : CTA-U01
pattern_name      : 緊急型 ヒーロー配置
summary           : 期間・数量・特典の限定性を冒頭から打ち出し、即時行動を促す
suitable_categories: food, supplement, app, course
suitable_personas : result-seeker, pain-avoider
suitable_price_band: low, mid
suitable_lp_goals : purchase, trial
suitable_templates: offer
tone              : energetic, bold
avoid_when        : 限定性が事実でない場合（使用禁止）。premium 価格帯。quality-first ペルソナ
```

### ボタン文言パターン

```
[メインCTA]  今すぐ申し込む（残り○点）/ ○月○日まで限定
[サブテキスト]  この価格でのご提供は、今回限りです
```

### マイクロコピー例

```
先着○名様限定 / 期間限定価格
キャンペーン終了まで: ○日 ○時間
```

### 選定ロジック

- `cta_style: urgent` のとき標準選択
- `lp_goal: purchase` かつ期間限定オファーが実在する場合のみ使う
- 限定性は必ず事実に基づくこと（景表法）

---

## CTA-U02: 緊急型 — フルCTAセクション配置

```
pattern_id        : CTA-U02
pattern_name      : 緊急型 フルCTAセクション
summary           : LP 全体の最終的なクロージング。オファー内容・期限を再提示して決断を促す
suitable_categories: food, supplement, course, app
suitable_personas : result-seeker, pain-avoider
suitable_price_band: low, mid
suitable_lp_goals : purchase, trial
suitable_templates: offer, trust
tone              : energetic, bold, reassuring
avoid_when        : premium × quality-first。限定性が事実でない場合（使用禁止）
```

### ボタン文言パターン

```
[メインCTA]  今すぐ特別価格で申し込む / キャンペーンに申し込む
[オファー再提示]  ○月○日まで: 通常価格○○円 → ○○円（○%OFF）
```

### マイクロコピー例

```
今回のみの特別価格です
○日後にはこの価格ではご案内できません
```

---

## CTA-M01: モバイルスティッキー型

```
pattern_id        : CTA-M01
pattern_name      : モバイルスティッキー型
summary           : スマホ画面下部に固定表示。どのスクロール位置でも購入への経路を確保する
suitable_categories: all
suitable_personas : all
suitable_price_band: all
suitable_lp_goals : purchase, trial, signup
suitable_templates: all
tone              : （lp_goal に合わせて調整）
avoid_when        : テキストが長すぎる場合（1行に収める）
```

### ボタン文言パターン

```
[短く・動詞で始める]
今すぐ申し込む / 試してみる / 購入する / 詳しく見る
```

### 実装ルール

```
- position: fixed; bottom: 0 で footer 上に配置
- スマホのみ表示（@media max-width: 600px）
- 背景: accent_color / テキスト: 白 / padding: 16px
- 幅: 100%; z-index: 1000
```

---

## CTA 選定マトリクス

### cta_style × 配置別推奨 pattern_id

| 配置 | soft | bold | urgent |
|---|---|---|---|
| ヒーロー | CTA-S01 | CTA-B01 | CTA-U01 |
| 中盤 | CTA-S02 | CTA-B02 | CTA-B02 |
| フルCTA | CTA-S03 | CTA-B03 | CTA-U02 |
| スティッキー | CTA-M01 | CTA-M01 | CTA-M01 |

### ペルソナ別 CTA 温度感

| ペルソナ | 推奨スタイル | 理由 |
|---|---|---|
| pain-avoider | bold または urgent | 解決策を早く知りたい気持ちが強い |
| result-seeker | bold | 具体的な変化への期待が行動力になる |
| aspiration-driven | soft | 押しつけると夢が壊れる |
| skeptic | soft → 中盤 bold | 信頼構築後に行動を促す |
| gift-giver | soft | 相手のことを考えている時間を邪魔しない |
| lifestyle-fit | soft | 自分のペースを大切にするペルソナ |
| quality-first | soft | 高品質ブランドが「今すぐ」を叫ぶのは矛盾 |
