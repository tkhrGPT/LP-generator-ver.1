# コピーフック パターンライブラリ
# ================================================================
# このファイルは開発者が管理するパターンライブラリです。
# エンドユーザーは触りません。Claude が LP 生成時に参照します。
# ================================================================
#
# 使い方（Claude へ）:
# 1. input から構築したペルソナ仮説と、brand-vars の category / hero_style / lp_goal を照合する
# 2. suitable_personas・suitable_categories が最も合致するパターンを 1〜2 個選ぶ
# 3. 選んだ pattern_id と選定理由を生成前に明記する
# 4. example_lines をそのまま使わず、今回の商材・ターゲットの言葉で書き直す
# ================================================================

---

## HOOK-01: 問いかけ型

```
pattern_id        : HOOK-01
pattern_name      : 問いかけ型
summary           : ターゲットが心の中で感じている疑問・葛藤を一文で代弁し、「そうそう、それ自分のことだ」と思わせる
suitable_categories: supplement, course, app, cosmetics
suitable_personas : pain-avoider, skeptic, result-seeker
suitable_price_band: low, mid, high
suitable_lp_goals : purchase, trial, inquiry
suitable_templates: story, trust
tone              : warm, reassuring, clean
avoid_when        : ターゲットが明確な解決策を既に知っている場合。premium × quality-first ペルソナには軽すぎる
```

### 構造パターン

```
[疑問文で悩みを言語化] + [その原因への示唆] or [沈黙（答えをあえて置かない）]
```

### 例文（抽象パターン — 商材の言葉で書き直すこと）

```
なぜ、同じことを繰り返しているのに、変わらないのだろう。
続けているのに、なぜ結果が出ないのか。
合わないのか、試し方が悪いのか、それとも——。
どうして、あれほど気をつけているのに。
```

### 選定ロジック

- `hero_style: emotional` のとき第一候補
- ペルソナが `pain-avoider` または `skeptic` のとき特に効果的
- 答えを与えずに「問いを置く」ことで次を読ませる
- `supplement` / `course` / `cosmetics` との相性が高い

---

## HOOK-02: 共感型

```
pattern_id        : HOOK-02
pattern_name      : 共感型
summary           : ターゲットの感情・生活のひとコマを描写し、「この人は私のことをわかってくれている」という安心感を生む
suitable_categories: cosmetics, supplement, food, apparel
suitable_personas : pain-avoider, lifestyle-fit, aspiration-driven
suitable_price_band: low, mid, high
suitable_lp_goals : purchase, trial
suitable_templates: story
tone              : warm, clean, premium
avoid_when        : app / course でロジック訴求が主軸の場合。energetic ペルソナには流れが遅すぎる
```

### 構造パターン

```
[具体的な日常のシーン描写] + [その場面で感じる感情・ため息]
```

### 例文（抽象パターン — 商材の言葉で書き直すこと）

```
気づいたら、また後回しにしていた。
丁寧にしたいと思いながら、今日も急いでしまった。
頑張っているつもりなのに、気がついたら疲れていた。
誰かに気づいてもらえた日は、なんとなく嬉しかった。
```

### 選定ロジック

- `structure_template: story` との組み合わせで最大効果
- ペルソナが `lifestyle-fit` のとき第一候補
- 描写が具体的であるほど効果が高い（漠然とした共感は機能しない）
- ヒーローセクション後半に「でも、変えたかった」という転換を置くと流れが生まれる

---

## HOOK-03: 数字・実績型

```
pattern_id        : HOOK-03
pattern_name      : 数字・実績型
summary           : 具体的な数字・実績・期間を冒頭に置き、信頼性と期待感を同時に作る
suitable_categories: supplement, course, app, food
suitable_personas : skeptic, result-seeker
suitable_price_band: mid, high, premium
suitable_lp_goals : purchase, trial, signup
suitable_templates: trust, offer
tone              : energetic, bold, reassuring
avoid_when        : 根拠のある数字がない場合（使用禁止）。cosmetics で断定的な効果数値は薬機法リスクがある
```

### 構造パターン

```
[数字] + [その数字が意味すること] + [ターゲットへの示唆]
```

### 例文（抽象パターン — 商材の言葉で書き直すこと）

```
○○人が、三ヶ月続けた。
累計○○本。それでも足りないと言ってもらえた。
始めて○日で、何かが変わった気がした。
○○%が、もう一度選んだ。
```

### 選定ロジック

- ペルソナが `skeptic` または `result-seeker` のとき第一候補
- `hero_style: bold` と組み合わせると最も効く
- content-input.md に実績・数字データが入力されているときのみ使う
- 数字は出典・条件を `legal_notes` に明記することとセットで使う

---

## HOOK-04: 逆説・反転型

```
pattern_id        : HOOK-04
pattern_name      : 逆説・反転型
summary           : 「普通そう思うよね、でも違う」という構造で意表を突き、続きを読ませる
suitable_categories: app, course, apparel, supplement
suitable_personas : skeptic, result-seeker, aspiration-driven
suitable_price_band: mid, high, premium
suitable_lp_goals : trial, purchase, signup
suitable_templates: trust, offer, story
tone              : bold, energetic, clean
avoid_when        : 説明コストが高い商材（逆説が伝わる前に離脱する）。warm / reassuring トーン主体では世界観が合わない
```

### 構造パターン

```
[一般的な前提 or 努力] + [「でも」「なのに」などの転換] + [逆の結論]
```

### 例文（抽象パターン — 商材の言葉で書き直すこと）

```
がんばるより、仕組みを変えるだけでよかった。
シンプルなのに、一番目立った。
続けるのをやめたら、むしろうまくいった。
もっとやれば変わると思っていた。違った。
```

### 選定ロジック

- `hero_style: bold` のとき第一候補
- ペルソナが `skeptic` で「今まで試してきた」背景がある場合に特に響く
- `app` / `course` の「今の方法論を変える」提案と相性が良い
- 逆説の「違和感」が商材の独自性と一致しているときのみ使う

---

## HOOK-05: 宣言・世界観型

```
pattern_id        : HOOK-05
pattern_name      : 宣言・世界観型
summary           : ブランドや商品の哲学・姿勢を短い言葉で宣言し、「このブランドが好き」という感情的なつながりを作る
suitable_categories: cosmetics, apparel, food
suitable_personas : quality-first, aspiration-driven, lifestyle-fit, gift-giver
suitable_price_band: high, premium
suitable_lp_goals : purchase, inquiry
suitable_templates: story, offer
tone              : premium, clean, warm, bold
avoid_when        : 低価格帯商材（世界観と価格のギャップが生まれる）。skeptic ペルソナ（根拠なしの宣言は信頼されない）
```

### 構造パターン

```
[ブランドの信念 or 哲学を短文で] + [それが商品にどう現れているか（省略可）]
```

### 例文（抽象パターン — 商材の言葉で書き直すこと）

```
丁寧に作られたものだけが、丁寧に届く。
余分なものを省いた。それだけのことが、難しかった。
長く使い続けることで、少しずつ馴染んでいく。
選ぶ理由が、好きという気持ちでいいと思っている。
```

### 選定ロジック

- `hero_style: simple` または `brand_tone: premium` のとき第一候補
- ペルソナが `quality-first` または `aspiration-driven` のときに特に響く
- 世界観コピーは短くなるほど強い（20文字以内が理想）
- `category-playbooks.md` の当該カテゴリのデザインヒントと合わせて設計する

---

## HOOK-06: 否定・ズレ訴求型

```
pattern_id        : HOOK-06
pattern_name      : 否定・ズレ訴求型
summary           : ターゲットが「こういうものだ」と思い込んでいた常識を否定し、視点の転換を促す
suitable_categories: course, app, supplement, cosmetics
suitable_personas : skeptic, result-seeker, pain-avoider
suitable_price_band: mid, high
suitable_lp_goals : purchase, trial, signup
suitable_templates: trust, story
tone              : bold, energetic, clean
avoid_when        : brand_tone が warm / reassuring のみの場合（否定のトーンが合わない）。gift-giver ペルソナには伝わりにくい
```

### 構造パターン

```
[よくある間違い or 誤解の指摘] + [なぜそれが違うのかの示唆] + [本当の原因 or 解決策への誘導]
```

### 例文（抽象パターン — 商材の言葉で書き直すこと）

```
それ、方向が違うかもしれない。
続かないのは、意志の問題じゃない。
間違った順番で、ずっとやっていた。
原因は、頑張り方ではなく、選び方にあった。
```

### 選定ロジック

- ペルソナが `skeptic` かつ「何度か試して失敗している」背景が読めるとき
- `course` / `app` で「今のやり方を変える」提案型の商材と相性が良い
- 否定が「商材の強み」の裏返しになっているときのみ使う（否定だけで終わらない）
- HOOK-04（逆説型）との違い: こちらは「間違いを指摘する」構造、04 は「意外な答えを提示する」構造

---

## フック選定マトリクス

### ペルソナ別推奨

| ペルソナ | 第1候補 | 第2候補 |
|---|---|---|
| pain-avoider | HOOK-01（問いかけ）| HOOK-02（共感）|
| result-seeker | HOOK-03（数字）| HOOK-04（逆説）|
| aspiration-driven | HOOK-05（宣言）| HOOK-02（共感）|
| skeptic | HOOK-06（否定）| HOOK-03（数字）|
| gift-giver | HOOK-05（宣言）| HOOK-02（共感）|
| lifestyle-fit | HOOK-02（共感）| HOOK-05（宣言）|
| quality-first | HOOK-05（宣言）| HOOK-04（逆説）|

### hero_style 別推奨

| hero_style | 推奨フック |
|---|---|
| emotional | HOOK-01, HOOK-02 |
| bold | HOOK-03, HOOK-04, HOOK-05 |
| simple | HOOK-05（短く・静かに）|
