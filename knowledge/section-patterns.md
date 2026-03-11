# セクション構成 パターンライブラリ
# ================================================================
# このファイルは開発者が管理するパターンライブラリです。
# エンドユーザーは触りません。Claude が LP 生成時に参照します。
# ================================================================
#
# 使い方（Claude へ）:
# 1. structure_template（story / trust / offer）のセクション順を確認する
# 2. 各セクションのパターンを読み、ペルソナ仮説と合致するバリエーションを選ぶ
# 3. セクションタイトルは「機能的な名前」でなく「引きのある言葉」にする
# 4. セクション間には「前のセクションの感情を受け取る言葉」を置く（つなぎコピー）
# ================================================================

---

# story テンプレート（共感・感情訴求型）

適合ペルソナ: pain-avoider, aspiration-driven, lifestyle-fit
感情の流れ: **共感 → 期待 → 根拠 → 決断**

## SEC-ST-01: ヒーローセクション（story）

```
pattern_id        : SEC-ST-01
parent_template   : story
section_role      : ファーストビュー。「自分のことだ」と感じさせ、続きを読ませる
suitable_personas : pain-avoider, aspiration-driven, lifestyle-fit
key_emotion       : 共感・安堵
tone              : warm, clean, premium
avoid_when        : ターゲットが「解決策を探している」フェーズではなく「商品を比較している」フェーズの場合
```

### 構成要素

```
見出し     : HOOK-01 または HOOK-02 から選んだフックコピー（20文字以内推奨）
サブコピー  : 見出しを補足する1〜2文（ターゲットの状況を描写）
CTA        : CTA-S01（ソフト型ヒーロー）
ビジュアル  : hero__bg（グラデーションまたは画像プレースホルダー）
```

### タイトルパターン例（商材の言葉で書き直すこと）

```
気づいたら、また同じ場所にいた。
ずっと探していた、のかもしれない。
「これでいい」より、「これがいい」を。
```

---

## SEC-ST-02: 共感セクション（story）

```
pattern_id        : SEC-ST-02
parent_template   : story
section_role      : ターゲットの悩みを深く受け止め、「自分のことを理解してくれている」という信頼を築く
suitable_personas : pain-avoider, lifestyle-fit
key_emotion       : 共感・解放感（言葉にしてもらえた）
tone              : warm, reassuring
avoid_when        : ターゲットの悩みが content-input.md に未記入の場合（推測で書かない）
```

### 構成要素

```
セクション見出し : 悩みを受け止めるタイトル（疑問形または体言止め）
本文           : ターゲットが「あるある」と感じる具体的なシーン描写 × 2〜3段落
つなぎコピー    : 「でも、変えたかった」「だから、探し続けていた」などの転換フレーズ
```

### タイトルパターン例

```
毎日続けているのに、なぜか変わらない
そろそろ、本当のものを選びたかった
ちゃんとケアしているのに、なぜか
```

---

## SEC-ST-03: 商品との出会いセクション（story）

```
pattern_id        : SEC-ST-03
parent_template   : story
section_role      : 共感から商品へのブリッジ。「だから、この商品を作った（選んだ）」という接続
suitable_personas : pain-avoider, aspiration-driven, lifestyle-fit
key_emotion       : 期待・興味
tone              : warm, premium, clean
avoid_when        : ブランドストーリーが content-input.md に記入されていない場合（省略してSEC-ST-04へ）
```

### 構成要素

```
セクション見出し : 商品誕生の動機・きっかけを示すタイトル
本文           : ブランドが「なぜこの商品を作ったか」の背景。感情的な動機を含める
商品名・ビジュアル: product-visual（グラデーション代替または画像プレースホルダー）
```

### タイトルパターン例

```
自分が使いたくて、作りました
変えたかったのは、自分自身でした
同じ気持ちを持つ人へ、届けたかった
```

---

## SEC-ST-04: 特徴・成分セクション（story）

```
pattern_id        : SEC-ST-04
parent_template   : story
section_role      : 感情的な共感を「根拠」でサポート。なぜこの商品が違うのかを具体的に示す
suitable_personas : all（ただし skeptic には特に重要）
key_emotion       : 納得・信頼
tone              : clean, reassuring, premium
avoid_when        : 特になし（全テンプレートで共通して必要）
```

### 構成要素

```
セクション見出し : 「何が特別か」を問いかける or 宣言するタイトル
特徴カード      : 3〜4点（アイコン or 番号 + 特徴名 + 1〜2行の説明）
説明の順序      : 特徴名 → 「つまりどういうことか」→「生活上の嬉しさ」の順
```

### タイトルパターン例

```
選ばれる理由は、ここにあります
こだわり抜いた、三つのちがい
素材が、全然ちがいます
```

---

## SEC-ST-05: ベネフィットセクション（story）

```
pattern_id        : SEC-ST-05
parent_template   : story
section_role      : 機能説明から「使うと生活がどう変わるか」への橋渡し。感情的なゴールを描く
suitable_personas : aspiration-driven, lifestyle-fit, pain-avoider
key_emotion       : 期待・憧れ
tone              : warm, premium, clean
avoid_when        : 機能・特徴セクション（SEC-ST-04）と内容が重複する場合（統合する）
```

### 構成要素

```
セクション見出し : 「使った後の自分」を示すタイトル
本文           : 商品を使った後の生活・気持ちの変化を具体的に描写（断定でなく「〜気がした」「〜感じた」）
ビジュアル      : 生活感のある素材イメージ（CSS 背景 or 画像プレースホルダー）
```

### タイトルパターン例

```
毎日の、ちょっとした楽しみに
気づいたら、続けていた
鏡を見る時間が、少し好きになった
```

---

## SEC-ST-06: 信頼セクション（story）

```
pattern_id        : SEC-ST-06
parent_template   : story
section_role      : 共感・特徴に続き、第三者の声・実績で信頼を積み上げる
suitable_personas : skeptic, pain-avoider, lifestyle-fit
key_emotion       : 安心・共感（「自分と同じ人が使っている」）
tone              : reassuring, warm
avoid_when        : レビュー・実績データが content-input.md に未記入の場合（SEC-ST-07 で補完）
```

### 構成要素

```
セクション見出し : レビュー・SNS投稿の存在を示すタイトル
レビューカード   : 3〜5件（氏名 or ペンネーム・年代・一言タイトル + 本文2〜3行）
SNS タイル      : sns-grid（3〜6枚のプレースホルダー）
trust_elements  : brand-vars.json の指定要素をすべて含める
```

### タイトルパターン例

```
使ってみた、正直な感想
届いた声を、そのままお届けします
同じ気持ちの方が、たくさんいました
```

---

# trust テンプレート（証拠・根拠訴求型）

適合ペルソナ: skeptic, result-seeker
感情の流れ: **問題認識 → 期待 → 確信 → 決断**

## SEC-TR-01: ヒーローセクション（trust）

```
pattern_id        : SEC-TR-01
parent_template   : trust
section_role      : ファーストビュー。問題と解決策を同時に提示し、信頼性の根拠を匂わせる
suitable_personas : skeptic, result-seeker
key_emotion       : 「これは信頼できそう」という直感
tone              : energetic, bold, reassuring, clean
avoid_when        : 数字・実績データが根拠として存在しない場合
```

### 構成要素

```
見出し     : HOOK-03（数字型）または HOOK-06（否定型）から選択
サブコピー  : 「なぜ違うのか」を1文で
数字強調   : 実績・ユーザー数などを大きく表示（content-input.md に記載がある場合のみ）
CTA        : CTA-B01（ボールド型ヒーロー）
```

### タイトルパターン例

```
○○人が実感した、理由があります
変わらなかったのは、原因が違ったから
根拠がなければ、選ばなくていい
```

---

## SEC-TR-02: 課題提示セクション（trust）

```
pattern_id        : SEC-TR-02
parent_template   : trust
section_role      : ターゲットが今直面している問題を明確化し、「なぜそれが起きているか」の原因仮説を提示する
suitable_personas : skeptic, result-seeker, pain-avoider
key_emotion       : 「そういうことだったのか」という納得
tone              : clean, reassuring, bold
avoid_when        : ターゲットの課題が明確でない場合（推測で書かない）
```

### 構成要素

```
セクション見出し : 問題の根本原因を指す
本文           : ターゲットが陥りやすいパターン → その原因 → なぜ今まで変わらなかったかの説明
視覚的整理      : 番号付きリストまたは「なぜ？」→「なぜなら」の対比レイアウト
```

### タイトルパターン例

```
原因は、頑張り方ではなかった
続けていたのに変わらない、本当の理由
どこでつまずいているか、わかりますか
```

---

## SEC-TR-03: 根拠・データセクション（trust）

```
pattern_id        : SEC-TR-03
parent_template   : trust
section_role      : 商品の効果・品質を支える「根拠」を提示する。成分・研究・製法・認証など
suitable_personas : skeptic, result-seeker
key_emotion       : 確信・安心
tone              : clean, reassuring, energetic
avoid_when        : 根拠のあるデータが存在しない場合（使用禁止）。cosmetics での断定的効果数値（薬機法）
```

### 構成要素

```
セクション見出し : 「なぜ効くのか」「なぜ信頼できるのか」の問いに答えるタイトル
根拠カード      : 2〜4点（成分名 → わかりやすい言い換え → 生活への影響 の順）
出典表記        : 数字・研究は必ず条件・出典を明記（フッターでも可）
```

### タイトルパターン例

```
効果の根拠を、正直にお伝えします
なぜこの成分なのか
ここに、違いがあります
```

---

## SEC-TR-04: 特徴セクション（trust）

```
pattern_id        : SEC-TR-04
parent_template   : trust
section_role      : SEC-TR-03 の根拠を受けて、商品固有の特徴・差別化ポイントを整理する
suitable_personas : all
key_emotion       : 納得・比較優位の確認
tone              : clean, bold, reassuring
avoid_when        : なし（trust テンプレートでは常に含める）
```

### 構成要素

```
セクション見出し : 特徴を列挙する前の「まとめ」的なタイトル
特徴カード      : 3〜5点（特徴名 + 説明 + 「つまり、ユーザーへの嬉しさ」）
構造           : story の SEC-ST-04 と同様だが、証拠・根拠との連動を意識する
```

---

## SEC-TR-05: レビューセクション（trust）

```
pattern_id        : SEC-TR-05
parent_template   : trust
section_role      : 実際のユーザーの変化・感想を提示し、「自分にも起きるかもしれない」と思わせる
suitable_personas : skeptic, result-seeker, pain-avoider
key_emotion       : 期待・安心（「私と似た人が変わっている」）
tone              : warm, reassuring
avoid_when        : レビューが未記入の場合（SEC-ST-06 と同様）
```

### 構成要素

```
セクション見出し : レビューの信頼性を示すタイトル
レビューカード   : 3〜5件。変化の時系列（○週間後など）を含めると信頼感が高まる
trust_elements  : 返金保証・SNS掲載などを自然に配置
```

### タイトルパターン例

```
変化は、こんなふうに現れました
試してみた方の、正直な声
○週間後、気づいたこと
```

---

# offer テンプレート（オファー直撃型）

適合ペルソナ: result-seeker, pain-avoider（かつ価格に敏感）
感情の流れ: **引き → 納得 → 安心 → 即決**

## SEC-OF-01: ヒーローセクション（offer）

```
pattern_id        : SEC-OF-01
parent_template   : offer
section_role      : ファーストビュー。オファー内容（価格・特典・期間）を即座に提示し、興味を引く
suitable_personas : result-seeker, pain-avoider
key_emotion       : 「お得かもしれない」「今がチャンス」
tone              : energetic, bold
avoid_when        : premium 価格帯（オファー前面は世界観を壊す）。quality-first ペルソナ
```

### 構成要素

```
見出し     : HOOK-03（数字型）または HOOK-04（逆説型）から選択
オファー提示: 価格・特典・期間を大きく・明確に
CTA        : CTA-U01（緊急型）または CTA-B01（ボールド型）
カウントダウン: 期間限定の場合（事実に基づく場合のみ）
```

### タイトルパターン例

```
今月だけの、特別な価格でお届けします
初めての方へ、とっておきのご案内
このセットを、今だけこの価格で
```

---

## SEC-OF-02: メリット一覧セクション（offer）

```
pattern_id        : SEC-OF-02
parent_template   : offer
section_role      : 「このオファーを選ぶとどう得か」を箇条書きで整理し、比較検討を後押しする
suitable_personas : result-seeker, pain-avoider
key_emotion       : 納得・計算（「確かに得だ」）
tone              : clean, energetic, reassuring
avoid_when        : メリットがオファー条件と無関係な場合（商品特徴と混同しない）
```

### 構成要素

```
セクション見出し : オファーの全体像を示すタイトル
メリットリスト  : 4〜6点（チェックアイコン + 一言で）
オファー詳細    : 価格・内容物・期間・数量制限を整理して表示
```

### タイトルパターン例

```
このセットに含まれるもの
今回だけ、これがついてきます
受け取れる価値の全部
```

---

## SEC-OF-03: 根拠・信頼セクション（offer）

```
pattern_id        : SEC-OF-03
parent_template   : offer
section_role      : offer テンプレートでは唯一、信頼構築に特化したセクション。レビューと証拠を凝縮する
suitable_personas : skeptic（offer テンプレートに流れ込んだ場合）
key_emotion       : 安心（「焦って買う前に、信頼できるか確認できた」）
tone              : reassuring, clean, warm
avoid_when        : SEC-OF-01 直後に配置するのは避ける（先にメリットを見せる）
```

### 構成要素

```
セクション見出し : 「信頼できるか」の疑問に答えるタイトル
レビュー        : 2〜3件（コンパクトに）
返金保証        : guarantee_text を目立つ位置に配置
信頼バッジ      : trust_elements の指定要素
```

---

## 全テンプレート共通セクション

### SEC-CMN-01: FAQ セクション

```
pattern_id        : SEC-CMN-01
section_role      : 購入前の不安・疑問を先回りして解消し、行動を妨げるハードルを下げる
suitable_personas : skeptic, pain-avoider, lifestyle-fit（「自分に合うか」の確認）
key_emotion       : 安心・信頼
tone              : reassuring, clean, warm
avoid_when        : なし（全テンプレートで必須）
```

#### FAQ の設計ルール

```
必須質問カテゴリ:
1. 効果・結果への疑問（「本当に変わりますか」）
2. 自分への適合確認（「〇〇でも使えますか」「敏感肌でも大丈夫？」）
3. 継続・解約の不安（「定期縛りはありますか」「途中でやめられますか」）
4. 配送・支払いの確認（「いつ届きますか」「支払い方法は」）
5. 万が一への保証（「合わなかった場合は？」）

問数: 最低5問、reassuring トーンの場合は7問以上推奨
アコーディオン形式: 必須（JS で実装）
```

#### タイトルパターン例

```
よくいただく質問
購入前に確認したいこと
気になることを、まとめました
```

---

### SEC-CMN-02: CTAセクション（フルウィズ）

```
pattern_id        : SEC-CMN-02
section_role      : クライマックス。LP 全体で最も強い行動喚起のセクション
suitable_personas : all
key_emotion       : 決断・期待
tone              : cta_style に従う
avoid_when        : なし（全テンプレートで必須）
```

#### 構成要素

```
リード文     : 「ここまで読んでくれた人」への呼びかけ or オファーの最終提示
メインCTA   : cta_style に応じたパターン（CTA-S03 / CTA-B03 / CTA-U02）
保証テキスト : guarantee_text を CTA 下部に配置
マイクロコピー: 「返金保証」「定期縛りなし」などの不安解消ワード
```

---

### SEC-CMN-03: フォームセクション

```
pattern_id        : SEC-CMN-03
section_role      : 実際の申し込み・問い合わせを受け付けるフォーム
suitable_personas : all
key_emotion       : 安心（フォームが簡単）
avoid_when        : なし（全テンプレートで必須）
```

#### 設計ルール

```
- form_fields の指定項目を全て含める
- 最大6項目推奨（多いと離脱率が上がる）
- form_submit_label を送信ボタンに使用
- フォーム上部: 保証・個人情報の取り扱いを1行で
- フォーム下部: 送信後の流れを1〜2行で明示
- required 属性と aria-label を必ず設定
```

---

## セクションタイトル パターンライブラリ

タイトルを作る際の「型」一覧（商材の言葉で書き直すこと）

```
[問いかけ型]
なぜ、○○にはこだわったのか
どこが、違うのか

[体言止め型]
選んだ理由、三つ
続く人の、共通点

[宣言型]
これが、私たちの答えです
自信を持って、お届けできます

[転換型]
でも、変えられました
気づいた日から、変わりはじめた

[受け取り型]
お客様の声を、そのまま
届いた声の一部をご紹介します
```
