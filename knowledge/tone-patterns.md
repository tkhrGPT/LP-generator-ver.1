# トーン パターンライブラリ
# ================================================================
# このファイルは開発者が管理するパターンライブラリです。
# エンドユーザーは触りません。Claude が LP 生成時に参照します。
# ================================================================
#
# 使い方（Claude へ）:
# 1. brand_tone の各値に対応するパターンを読み込む
# 2. 複数指定の場合は「共通する方向性」を優先し、相反する場合は category / price_band で判断する
# 3. 各パターンの「文体指針」「デザイン指針」「avoid_when」をペルソナ仮説と照合する
# 4. example_lines はそのまま使わず、商材の言葉で書き直す
# ================================================================

---

## TONE-01: clean（清潔感・シンプル）

```
pattern_id        : TONE-01
pattern_name      : clean
summary           : 装飾を最小限にし、ホワイトスペースと短文で清潔感と信頼を演出する
suitable_categories: cosmetics, apparel, food, app
suitable_personas : lifestyle-fit, quality-first, aspiration-driven
suitable_price_band: mid, high, premium
suitable_lp_goals : purchase, inquiry
suitable_templates: story, trust, offer
avoid_when        : 情報量が多くページをスクロールさせる必要がある場合（情報が埋もれる）
```

### 文体指針

```
- 1文20文字以内が理想
- 修飾語を最小限にする
- 余韻を残す余白のある文章
- 「〜です」「〜ます」の丁寧語で統一。断言調と混ぜない
- ひらがなを多めに使うと柔らかくなる
```

### 例文（商材の言葉で書き直すこと）

```
余分なものを省いた。それだけのことが、難しかった。
シンプルだから、毎日続けられる。
使った日の夜、鏡が少し好きになった気がした。
```

### 避ける表現

```
× 超・スゴい・最強・圧倒的・ナンバーワン
× 感嘆符（！）の多用
× 「〜じゃないですか？」など話しかけすぎる表現
× カタカナ語の乱用（ソリューション・イノベーションなど）
```

### デザイン指針

```
- ホワイトスペースを惜しまない
- 装飾は最小限：ボーダーは細く、影は薄く
- 色数を 3色以内に絞る（base + main + accent）
- フォントは細め〜標準ウェイト
- アイコンより文字とシンプルな線で構成
```

---

## TONE-02: premium（上質・高級感・余白）

```
pattern_id        : TONE-02
pattern_name      : premium
summary           : 語りかけるより「静かに提示する」文体で、高品質ブランドの世界観を守る
suitable_categories: cosmetics, apparel, food（高価格帯）
suitable_personas : quality-first, aspiration-driven, gift-giver
suitable_price_band: high, premium
suitable_lp_goals : purchase, inquiry
suitable_templates: story
avoid_when        : price_band が low / mid の場合（世界観と価格のギャップが不信感を生む）
```

### 文体指針

```
- 「語りかける」より「静かに提示する」文体
- 長い形容詞チェーンを避け、一語一語の重みを大切にする
- ひらがなとカタカナのバランスに気を配る
- 読み手を急かさない、待つ姿勢のある文章
- 行間を読ませる（言いすぎない）
```

### 例文（商材の言葉で書き直すこと）

```
丁寧に作られたものだけが、丁寧に届く。
ブランドの哲学は、素材の選び方に現れる。
長く使い続けることで、少しずつ馴染んでいく。
受け取った瞬間に、わかってもらえると思っています。
```

### 避ける表現

```
× 「お得！」「コスパ最高！」などのコスト訴求
× 早口のような情報詰め込み
× 数字の羅列（「○%off × ○○円 × ○○本」）
× 絵文字・記号の使用
× 感嘆符（！）
```

### デザイン指針

```
- セクション間の余白を最も広く取る（section_spacing: large）
- ボーダーは 1px、色はメインカラーの薄い版か透明度付き
- 背景は base_bg_color を基調に、アクセントカラーのセクションは 1〜2箇所だけ
- フォントは serif 推奨（font_style: serif と組み合わせる）
- 商品画像の代替グラフィックも最小限の装飾に
```

---

## TONE-03: warm（温かい・やわらかい・親しみやすい）

```
pattern_id        : TONE-03
pattern_name      : warm
summary           : 話しかけるような文体で、読み手を「包む」安心感を作る
suitable_categories: supplement, cosmetics, food, course
suitable_personas : pain-avoider, lifestyle-fit, aspiration-driven
suitable_price_band: low, mid, high
suitable_lp_goals : purchase, trial
suitable_templates: story, trust
avoid_when        : skeptic ペルソナが主体で「証拠・ロジック」が求められる場合（TONE-05 と組み合わせる）
```

### 文体指針

```
- 話しかけるような一人称的な文体
- 「〜かもしれない」「〜でいい」などの余地のある表現
- 読み手を「包む」ような文章。突き放さない
- ひらがなを多めに使うと温かみが増す
- 体験談・日常描写と相性が良い
```

### 例文（商材の言葉で書き直すこと）

```
がんばりすぎなくて、いい。
毎日のちょっとした時間が、もう少し好きになれたら。
うまくいかない日があっても、これだけは続けられた。
作り手の顔が見える、そんなものを届けたかった。
```

### 避ける表現

```
× 冷たい命令形（「今すぐ〜しろ」）
× 他社との比較攻撃
× 専門用語の多用
× 数字・論理だけの説得
```

### デザイン指針

```
- 角丸を積極的に使う（border-radius: 8〜16px）
- 暖色系のカラーパレット（オレンジ・ベージュ・テラコッタ系）
- 柔らかい影（box-shadow の透明度高め）
- フォントはやや太め、ゴシック系でも読みやすい
```

---

## TONE-04: energetic（活気・コントラスト・躍動感）

```
pattern_id        : TONE-04
pattern_name      : energetic
summary           : テンポの速い短文と強い動詞で、読み手を「乗せていく」文体
suitable_categories: course, app, supplement
suitable_personas : result-seeker, pain-avoider（行動力がある）
suitable_price_band: low, mid
suitable_lp_goals : purchase, trial, signup
suitable_templates: trust, offer
avoid_when        : cosmetics / apparel の高価格帯（世界観を壊す）。quality-first ペルソナ
```

### 文体指針

```
- テンポが速く、短いフレーズが続く
- 行動を促す強い動詞を使う
- 読み手を「乗せていく」ような文体
- 感嘆符（！）を 1〜2箇所だけ効果的に使う
- 体言止めを多用
```

### 例文（商材の言葉で書き直すこと）

```
変わりたいなら、動く日は今日だ。
全力でやった日の自分を、応援したくて作った。
もう言い訳しなくていい。仕組みを変えるだけでいい。
やる気は待っていても来ない。ツールを変えればいい。
```

### 避ける表現

```
× 消極的な言い回し（「〜かもしれない」の多用）
× 長いリード文・説明
× 弱い動詞（「使えます」「試せます」）
```

### デザイン指針

```
- コントラストを強く（accent_color を濃く・背景を明確に分ける）
- 見出しは太いウェイト（font-weight: bold または 700以上）
- グラデーションより単色・明快な色使い
- CTAボタンは目立つ色・大きいサイズ
- hover 効果を積極的に（transform: scale など）
```

---

## TONE-05: playful（楽しい・丸み・明るい）

```
pattern_id        : TONE-05
pattern_name      : playful
summary           : 読んでいて思わず微笑むような軽さで、ターゲットと同じ目線に立つ
suitable_categories: food, apparel（カジュアル）、app（カジュアル向け）
suitable_personas : aspiration-driven, lifestyle-fit, gift-giver
suitable_price_band: low, mid
suitable_lp_goals : purchase, trial
suitable_templates: story, offer
avoid_when        : supplement / course（信頼感が下がる）。skeptic ペルソナ（真剣さが伝わらない）
```

### 文体指針

```
- 読んでいて思わず笑えるような軽さ
- 遊び心のあるコピー（ダジャレでなく、意外な切り口）
- ターゲットと同じ目線で話す
- 「〜しちゃう」「〜なんです」など話し言葉の混在もアリ
```

### 例文（商材の言葉で書き直すこと）

```
開けた瞬間に、もうお気に入り。
気づいたら、また頼んでた。
ちょっとズルいくらいかわいい。
「どこのやつ？」って聞かれる一枚。
```

### 避ける表現

```
× 堅い説明文
× 「本格的・本物・真剣に」などシリアスなワード
× 過度な敬語・丁寧語（読み手との距離が生まれる）
```

### デザイン指針

```
- 角丸を最大限に活用（ボタン・カード・タグすべて rounded）
- 明るいアクセントカラー（イエロー・コーラル・ミントなど）
- 適度な装飾（ドット・ストライプなど）
- フォントはゴシック系、やや太め
- hover 時に弾むような動き（transform: scale(1.05) など）
```

---

## TONE-06: bold（力強い・インパクト重視）

```
pattern_id        : TONE-06
pattern_name      : bold
summary           : 一文一文が強く、余計な説明をしない。読み手の想像力を信頼する
suitable_categories: course, app, supplement, apparel（ストリート系）
suitable_personas : result-seeker, skeptic（証拠を見た後）、aspiration-driven
suitable_price_band: mid, high
suitable_lp_goals : purchase, signup, trial
suitable_templates: trust, offer
avoid_when        : cosmetics の高価格帯（繊細さが失われる）。warm / reassuring トーン主体の場合
```

### 文体指針

```
- 一文一文が強い。淡泊に言いきる
- 余計な説明をしない。読み手の想像力を信頼する
- 見出しを長くしない（6〜10文字が強い）
- 体言止めを多用
```

### 例文（商材の言葉で書き直すこと）

```
結果を、出す。
言い訳のいらない、○○。
試した人だけが知っている。
妥協したくない人のために、作った。
```

### 避ける表現

```
× 「〜かもしれない」「〜と思います」
× やわらかすぎる接続詞（「でも」「ただ」）
× 体験談の多用（感情より事実・結果を優先）
```

### デザイン指針

```
- コントラスト最大（白×黒、または強い補色）
- 見出しフォントサイズを最大まで大きく使う
- 余白は狭め（情報を詰める方が力強く見える）
- CTAはページで最も目立つ要素に
```

---

## TONE-07: reassuring（安心感・信頼・FAQ重視）

```
pattern_id        : TONE-07
pattern_name      : reassuring
summary           : 不安を先回りして解消する文章構造で、購入前の躊躇を取り除く
suitable_categories: supplement, cosmetics, course
suitable_personas : skeptic, pain-avoider, lifestyle-fit
suitable_price_band: mid, high, premium
suitable_lp_goals : purchase, trial
suitable_templates: trust, story
avoid_when        : offer テンプレートで緊急性が主軸の場合（安心感は流れを緩める）
```

### 文体指針

```
- 不安を先回りして解消する文章構造
- 「万が一」「もしも」を想定した言葉を添える
- 保証・条件・例外をできるだけ明確に書く
- 読み手を急かさない、待てるトーン
```

### 例文（商材の言葉で書き直すこと）

```
合わなければ、ご相談ください。
急かすつもりはありません。じっくり確かめてください。
疑問があれば、遠慮なく聞いてください。
返金保証つきなので、まず試してみるだけでも。
```

### 避ける表現

```
× 「絶対に」「必ず」「100%」など保証の断言
× 不安を煽るだけで解消しない書き方
× FAQ が少ない構成（reassuring では 5問以上が理想）
```

### デザイン指針

```
- 返金保証・FAQ・信頼バッジを目立つ位置に配置
- フォームの前に保証内容を必ず入れる
- 色は落ち着いたトーン（青系・グリーン系が信頼感を高める）
- CTA周辺には必ずマイクロコピーを添える
```

---

## トーン組み合わせ パターン

### TONE-01 × TONE-02（clean × premium）

```
pattern_id        : TONE-COMBO-01
summary           : 静かで上質。語りすぎない。余白がデザイン。
suitable_categories: cosmetics, apparel, food（高価格帯）
suitable_personas : quality-first, aspiration-driven
suitable_price_band: high, premium
文体              : 短文の言い切り + ひらがな多め + やわらかい余韻
デザイン          : serif / 余白最大 / 1px ボーダー / モノトーン系 or 淡い暖色
```

### TONE-03 × TONE-07（warm × reassuring）

```
pattern_id        : TONE-COMBO-02
summary           : 寄り添いながらも信頼できるブランド像を作る。
suitable_categories: supplement, cosmetics, course
suitable_personas : pain-avoider, skeptic（説得型より共感型で入る）
suitable_price_band: mid, high
文体              : 話しかける体験談 + 保証・FAQ を丁寧に
デザイン          : 暖色 / 角丸 / マイクロコピー多め / FAQ を充実させる
```

### TONE-04 × TONE-06（energetic × bold）

```
pattern_id        : TONE-COMBO-03
summary           : 読み手の背中を強く押す。スピード感がある。
suitable_categories: app, course, supplement
suitable_personas : result-seeker, pain-avoider（行動力がある）
suitable_price_band: low, mid
文体              : 短文断言 + 行動動詞 + 体言止め
デザイン          : 高コントラスト / 太いフォント / CTA大 / hover 効果あり
```

### TONE-01 × TONE-03（clean × warm）

```
pattern_id        : TONE-COMBO-04
summary           : シンプルだけど冷たくない。日常に溶け込む。
suitable_categories: food, cosmetics（低〜中価格帯）
suitable_personas : lifestyle-fit, aspiration-driven
suitable_price_band: low, mid
文体              : 短文 + やわらかい語尾 + 生活に近い描写
デザイン          : ゴシック系 / 余白標準〜大 / 淡い暖色
```
