# E.Universe コーポレートサイト — 引き継ぎ書

最終更新：2026-09-21（公開翌日）
公開 URL：https://euniverse.co.jp/　　リポジトリ：github.com/payarock/euniverse-site（GitHub Pages で配信）
この文書は「この制作の経緯を知らない人」が一人でサイトを更新できるように書いています。専門用語は最小限にし、必要なところは手順をそのまま書きました。

---

## 0. 3行でわかる仕組み

1. サイトは **静的な HTML ファイルの集まり**です。サーバーもデータベースも CMS もありません。
2. `github.com/payarock/euniverse-site` の `main` ブランチにあるファイルが、**そのまま** `https://euniverse.co.jp/` で公開されます（GitHub Pages）。
3. したがって「更新する」＝「手元でファイルを直す → GitHub Desktop で commit → push」です。push から 2〜10 分で本番に反映されます。

---

## 1. リポジトリの構成

```
euniverse-site/
├── CNAME                 ← 独自ドメイン設定（中身は euniverse.co.jp の1行）※触らない
├── index.html            ← Home
├── story.html            ← Story
├── what-we-do.html       ← What We Do
├── noor.html             ← Noor
├── company.html          ← Company
├── contact.html          ← Contact
├── css/site.css          ← 全ページ共通のデザイン（色・文字・余白・レイアウト・3サイズ対応）
├── js/site.js            ← 全ページ共通の動き（仮画像の表示・モバイルメニュー・お問い合わせフォーム）
├── assets/
│   ├── img/              ← 写真（下の §3 参照）
│   ├── portrait.jpg      ← 代表の肖像（現在は暫定の縦写真）
│   ├── Symbol_Ink.svg    ← ロゴシンボル（黒）
│   ├── Symbol_Light.svg  ← ロゴシンボル（白・暗い背景用）
│   ├── Symbol_Accent.svg ← ロゴシンボル（アクセント色）※現在未使用
│   ├── og.png            ← SNS でリンクを貼ったときの画像（1200×630）
│   ├── favicon.ico / favicon-32.png / favicon-180.png / favicon-512.png  ← ブラウザタブのアイコン
│   └── logo-square-1200.png
├── sitemap.xml           ← 検索エンジン向けのページ一覧（6 URL）
├── robots.txt            ← 検索エンジン向けの指示（/v2/ と /archive/ を除外、sitemap の場所）
├── v2/                   ← 旧・確認用 URL。中身は本番への自動転送ページのみ ※触らない
├── archive/index-v1.html ← 公開前の暫定ページ（記録用、検索対象外）※触らない
├── tools/publish-v2.sh   ← 公開当日に使った昇格スクリプト（役目終了、再実行は自動で拒否される）
└── _docs/                ← この文書などの内部メモ（先頭の _ により Web には公開されない）
    ├── site-handover.md          ← 本書
    ├── launch-checklist.md       ← 公開日の確認手順
    ├── placeholder-images.md     ← 写真の対応表
    └── qa-2026-09-20.md          ← 公開前 QA の記録

（Git に含まれない＝この Mac にだけあるもの）
├── design/               ← 承認済みデザインの PNG 18 枚（14Sep 版）※Google Drive「Brand Assets/website/14Sep」に原本
├── content/copy.md       ← 承認済みコピーの正本（§4 参照）
├── content/copy.draft-original.md ← OCR 下書き（記録用）
└── qa/                   ← QA スクリーンショット
```

**参照の原本**（Google Drive 共有ドライブ「E.Universe — Brand Assets」）
- `EUniverse_Company_Details_v1.txt` … 会社情報の唯一の正本（住所・電話・表記ルール・色）。サイトの記載と食い違ったら**こちらが正しい**
- `website/14Sep/` … 承認済みデザイン PNG（Desktop／Tablet／Mobile × 6ページ）
- `website/website images/` … デザイナー納品の写真
- `Logo/` … ロゴ SVG

---

## 2. ページと CSS・JS の対応

### 2-1. 共通部分（6ページすべてに同じものが入っている）
| 部品 | HTML 内の目印 | CSS（site.css 内の見出し） |
|---|---|---|
| 上部ナビ（ロゴ・ピル型メニュー・地球アイコン） | `<header class="site-header">` | `Header / navigation` |
| モバイル用メニュー（ハンバーガーで開く） | `<div class="mobile-menu">` | 同上（`.mobile-menu`） |
| フッター | `<footer class="site-footer">` | `Footer` |
| 「Get in Touch」ブロック（Home／What We Do／Noor の末尾） | `<section class="cta">` | `.cta` |

**共通部分を直すときは 6 ファイルすべてを同じように直す**必要があります（エディタの「すべてのファイルで置換」を使う）。現在ページを示す `aria-current="page"` は、そのページのリンクにだけ付いています（ナビのグレー地・フッターの青字の元）。

### 2-2. ページ固有のブロック
| ページ | セクション（上から順） | HTML の class | CSS の見出し |
|---|---|---|---|
| Home `index.html` | ヒーロー／Who we are（軌道図）／What we do（黒地4列＋巨大ロゴ）／Our Story（写真背景）／Gallery／Get in Touch | `.hero` `.who` `.orbit` `.services` `.story-teaser` `.gallery` `.cta` | `Home` |
| Story | ヒーロー（名古屋城）／年表／写真2枚／Mission & Vision（黒地）／Our Values（白カード3枚） | `.story-hero` `.timeline` `.strip` `.mv` `.values` | `Story` |
| What We Do | 見出し／4事業（写真＋文）／Talent（Maryam）／Selected work／Guides Growth（4段階）／Get in Touch | `.wwd-hero` `.svc` `.talent` `.work` `.steps` | `What we do` |
| Noor | 見出し／写真・文・写真・文・写真・結び／Get in Touch | `.noor-hero` `.noor-text` `.photo--band` | `Noor` |
| Company | 会社概要の表／Our Approach／コンパス写真／A Shared Direction／代表 | `.co-hero` `.co-table` `.approach` `.shared` `.director` | `Company` |
| Contact | 見出し／フォーム／連絡先＋青いカード | `.contact-hero` `.form` `.contact-details` `.light-card` | `Contact` |

### 2-3. 画面幅による切り替え（site.css の後半）
- 1025px 以上：デスクトップ（基準 1440）
- 641〜1024px：タブレット（`@media (max-width: 1024px)` の中）
- 640px 以下：スマホ（`@media (max-width: 640px)` の中）
- 色・書体の元の値は site.css 冒頭の `:root { … }`（Paper `#F7F6F2`／Ink `#121212`／Accent `#5C73FF`、書体 Poppins＝Google Fonts）

### 2-4. js/site.js がやっていること（4つだけ）
1. 写真ファイルが無いとき、その枠を灰色にしてファイル名を表示する（＝仮画像の仕組み）
2. Story の暗いヒーローの上ではナビを白文字にし、スクロールしたら黒文字に戻す
3. Topic のプルダウンを未選択のあいだ灰色にする
4. Contact フォームの「Send Message」で、入力内容を整えて `mailto:info@euniverse.co.jp` を開く

---

## 3. 写真の差し替え方

**原則：同じファイル名で上書きするだけ。HTML も CSS も触らない。**

| ページ・場所 | ファイル（`assets/img/` 内） | 目安サイズ（px） |
|---|---|---|
| Home › Our Story 背景（石の回廊） | `home-story-corridor.jpg` | 2400×1600 横長 |
| Home › Gallery 1／2／3 | `gallery-brand-bible.jpg` `gallery-logo-system.jpg` `gallery-business-card.jpg` | 1200×1400 縦長 |
| Story › ヒーロー（名古屋城） | `story-hero-castle.jpg` | 2400×1800 |
| Story › 写真帯 左（丸窓）／右（提灯） | `story-strip-window.jpg` `story-strip-lantern.jpg` | 1500×1600 縦長 |
| What We Do › 01 Noor（ドーム） | `what-we-do-noor.jpg` | 2400×1400 横長 |
| What We Do › 02 Brand & Identity（赤煉瓦） | `what-we-do-brand.jpg` | 同上 |
| What We Do › 03 Digital Direction（ノートPC） | `what-we-do-digital.jpg` | 同上 |
| What We Do › 04 Care & Health（ドライフラワー） | `what-we-do-care.jpg` | 同上 |
| What We Do › Maryam の肖像 | `what-we-do-maryam.jpg` | 1200×1670 縦長 |
| What We Do › Selected work 1／2／3 | `work-brand-bible.jpg` `work-logo-system.jpg` `work-business-card.jpg` | 1200×1140 |
| Noor › 写真 1／2／3 | `noor-arches.jpg` `noor-craft.jpg` `noor-panels.jpg` | 2400×1400 横長 |
| Company › コンパス | `company-approach-compass.jpg` | 2400×1400 横長 |
| Company › 代表の肖像 | **`assets/portrait.jpg`**（`img/` の外） | 2880×1400 横長・暗い背景 |

手順
1. 写真を JPEG にし、上の目安サイズ程度に縮小する（1 ファイル 1MB 以下が目安。大きいままでも動くが表示が遅くなる）
2. **EXIF（撮影日時・位置情報）を消す**：Mac の「プレビュー」で開く → ファイル → 書き出す → 形式 JPEG、または画像最適化アプリで「メタデータを削除」
3. Finder で `Documents/euniverse-site/assets/img/` を開き、同じ名前で上書き
4. GitHub Desktop で commit → push（§6）
5. 数分後、本番をシークレットウィンドウで開いて確認

注意
- 比率が違っても枠に合わせて中央で自動トリミングされます。人物写真は顔の位置がずれることがあるので、必ず本番で見る
- 代表の肖像だけは特別：今は縦長の暫定写真を「黒地に丸ごと収める」表示にしています。横長のスタジオ写真に差し替えたら、`company.html` の `director__photo--provisional` という語を1つ削除すると全面表示になります（削除しないと黒地に小さく収まる表示のまま）
- **生成画像（ChatGPT 等）は使わない**方針です。デザイナー納品フォルダに `ChatGPT Image …` という名前のファイルがありますが、使っていません
- 使ってよい写真の出所：Brand Assets の実写（IMG_*.jpeg）、Pexels（ライセンス上クレジット不要）。出所は `_docs/placeholder-images.md` に記録

---

## 4. コピー（文言）を直すときの手順

### 4-1. 正本との関係
- サイトの英文の**正本は `content/copy.md`**（この Mac の `Documents/euniverse-site/content/`。Git には入れていない）。承認済みデザイン PNG と1行ずつ突き合わせて確定し、代表の判断で直した箇所には `✔ DECIDED` と理由が書いてあります
- 公開時点で、copy.md の文言 176 件と本番の表示は完全に一致しています
- **文言を変えるときは、HTML と copy.md の両方を直す**。片方だけ直すと、次に誰かが照合したとき「どちらが正しいか」わからなくなります
- copy.md は Mac にしか無いので、Brand Assets の Drive にもコピーを置くことを勧めます（`website/` の下など）

### 4-2. 表記ルール（Company Details に基づく）
- 英国英語：organisation／recognised／colour／centre／practised（米国綴りにしない）
- アポストロフィは `’`（まっすぐな `'` は使わない）。ダッシュは `—`（前後に半角スペース）
- 社名は本文では `E.Universe`、契約書等では `E.Universe Corp.`。`EUniverse`／`E Universe`／`Inc.` は使わない
- 名古屋のみ。Tokyo／Osaka を出さない。電話は 052（東京 03・大阪 06 の番号は出さない）。ドメインは `.co.jp` のみ
- 代表が介護・医療の現場で働いていることを示す語（care worker／nursing／night shift／facility／on the floor 等）は本文・alt・meta・コメントのどこにも出さない。※04 Care & Health の承認済みコピー（`welfare and medical organisations`）は例外
- 事業は「Design & Digital Direction」と「Noor」の幹に絞る。旧事業（ジュエリー／3Dプリント／メディア等）は出さない

### 4-3. 実際の直し方
1. エディタ（VS Code 推奨。無ければ macOS 標準の「テキストエディット」を**標準テキストモード**で）で該当の `.html` を開く
2. 文言を探して直す。`<em>…</em>` は斜体、`<br>` は改行、`&amp;` は `&` の意味（HTML の中では `&` を `&amp;` と書く）
3. 同じ文言が複数ページにある場合は全部直す（例：Get in Touch のブロックは 3 ページ、フッターは 6 ページ、4事業の説明は Home と What We Do）
4. `content/copy.md` の該当行も同じに直し、末尾に日付と理由を1行添える
5. ローカルで確認（§7）→ commit → push
6. **meta description**（検索結果に出る説明文）は各 HTML の `<head>` 内 `name="description"` と `property="og:description"` の 2 箇所。155 字以内に

---

## 5. 公開の一手と戻し方

### 5-1. すでに公開済み（2026-09-20）
公開は `tools/publish-v2.sh` で行いました（`/v2/` の 6 ページをルートへ移し、`noindex` を外し、`sitemap.xml`／`robots.txt` を作り、旧ページを `archive/` に残す）。該当コミットは **`2c06579`**。
このスクリプトは**役目を終えています**。誤って実行しても「Already published」と表示して何もしません。`--undo` も同様に拒否します。

### 5-2. 日常の更新（＝これが今後の「公開の一手」）
ファイルを直して commit → push するだけです。専用の手順はありません。

### 5-3. 戻し方（直した内容を取り消したい）
GitHub Desktop の **History** タブで、取り消したいコミットを右クリック → **Revert Changes in Commit** → push。これで「そのコミットの逆」が新しいコミットとして作られ、本番も元に戻ります（履歴は消えません）。
- 直近 1 回分を戻す：そのコミットを Revert
- 公開そのものを取り消して暫定ページに戻す：`2c06579` を Revert（`archive/index-v1.html` の内容がルートに戻る）

### 5-4. もし本番が真っ白／壊れたら
1. 慌てず、GitHub Desktop の History で「最後に正常だったコミット」を確認
2. それ以降のコミットを新しい順に Revert → push
3. `CNAME` が消えていないか確認（消えると `euniverse.co.jp` で開けなくなり `payarock.github.io` になる）。消えていたら中身 `euniverse.co.jp` の1行だけのファイルを作り直して push

---

## 6. GitHub Desktop での push の手順

初回のみ：GitHub Desktop（desktop.github.com）をインストール → GitHub アカウントでサインイン → File → Add Local Repository → `Documents/euniverse-site` を選ぶ。

毎回：
1. GitHub Desktop を開く。左の **Changes** に、直したファイルの一覧が出る
2. 一覧を見て「意図したファイルだけ」か確認する（`CNAME` や `v2/`、`archive/` が混ざっていたら止まる → §8）
3. 左下の **Summary** に変更の要約を 1 行で書く（例：`Company: portrait replaced with studio photo`）。日本語でも可
4. **Commit to main** を押す
5. 上部の **Push origin** を押す（数字は未送信のコミット数）
6. 2〜10 分待ち、シークレットウィンドウで本番を開いて確認（通常のウィンドウだと古い表示が残ることがある）

うまくいかないとき
- 「Fetch origin」しか出ない → 変更が commit されていない。手順 3〜4 を確認
- push でエラー → いったん **Fetch origin** → **Pull origin** してから再度 Push
- 「Conflict」と出た → 同じファイルを別の場所でも直している。触らずに相談する

### 6-1. GitHub のウェブ画面で直接直した場合（必ず先に pull）

github.com のファイル画面（鉛筆アイコン → Commit changes）で直すと、その変更は **GitHub 側にだけ** あり、手元の `Documents/euniverse-site` には入っていません。この状態で Claude Code や GitHub Desktop で作業を始めると、古いファイルを土台に直してしまい、push のときに Conflict になります。

ルール：**GitHub のウェブで直した後、次に Claude Code で作業する前に必ず pull する。**

- Claude Code なら、最初の指示に「まず `git pull origin main` して」と一言入れる（またはターミナルで下を実行）
  ```
  git pull origin main
  ```
- GitHub Desktop なら、上部の **Fetch origin** → **Pull origin** を押してから作業を始める

確認のしかた：`git log --oneline -3` の先頭が、ウェブで直したコミットになっていれば手元は最新です。

（実例：2026-09-21、ウェブで6コミット直したあと手元が遅れていたため、作業前に pull してから続けた）

---

## 7. ローカルで確認する方法（push する前に見る）

ターミナルで次を実行し、ブラウザで `http://127.0.0.1:8811/` を開く（終わるときはターミナルで Ctrl+C）。

```bash
cd ~/Documents/euniverse-site && python3 -m http.server 8811 --bind 127.0.0.1
```

ブラウザの幅を狭めるとタブレット／スマホの組み方に切り替わります。Chrome なら「表示 → 開発 / 管理 → デベロッパーツール」のスマホアイコンで iPhone サイズを再現できます。
※ HTML ファイルを直接ダブルクリックで開く方法は、ページ間リンクや画像のパスが `/assets/…` 形式のため正しく表示されません。必ず上のサーバー経由で見てください。

---

## 8. 触ってはいけないもの

| 対象 | 理由 | もし触ってしまったら |
|---|---|---|
| `CNAME` | 独自ドメインの設定。中身が変わる／消えると `euniverse.co.jp` で開けなくなる | 中身を `euniverse.co.jp` の1行に戻して push |
| `archive/` | 公開前の暫定ページの記録。検索対象外にしてある | Revert で戻す |
| `v2/` | 旧・確認用 URL からの自動転送ページ。名刺・メール等で `/v2/` を共有した人のために残している | Revert で戻す |
| `design/`（Mac のみ） | 承認済みデザインの原本。Web に公開してはいけない（`.gitignore` で除外済み） | Git に入っていないか GitHub Desktop の Changes で確認 |
| `content/`（Mac のみ） | コピーの正本と下書き。同上 | 同上 |
| `robots.txt` の `Disallow` 行、`sitemap.xml` | 検索エンジン向け。ページを増やしたときだけ `sitemap.xml` に `<url>` を追加する | — |
| `_docs/` の先頭の `_` | この `_` があるおかげで Web に出ない。フォルダ名を変えると公開される | 名前を戻す |

---

## 9. よくある更新の早見表

| やりたいこと | 直す場所 |
|---|---|
| 写真を替える | `assets/img/` に同名で上書き（§3） |
| 文言を直す | 該当 `.html` ＋ `content/copy.md`（§4） |
| 電話・住所・メールを直す | `company.html` の表、`contact.html` の連絡先、6ページのフッター（メール）。Company Details も更新 |
| お問い合わせフォームを Formspree 等に切り替える | `contact.html` の `<form …>` 1 行を `action="https://formspree.io/f/XXXX" method="post"` にして `data-mailto` を消す。`js/site.js` の 4 番の処理は自動的に無効になる |
| Topic の選択肢を変える | `contact.html` の `<option>` 行 |
| ナビ・フッターのリンクを増やす | 6 ファイルすべての `<nav class="site-nav">`／`<div class="mobile-menu">`／`<footer>` |
| 新しいページを作る | 既存ページ（例 `noor.html`）を複製 → `<title>`／description／canonical／og:url／`aria-current` を直す → 6ページのナビに追加 → `sitemap.xml` に追加 |
| 「See All ›」の行き先 | Home Gallery → `what-we-do.html#work`、What We Do Selected work → `index.html#gallery`、Talent → `noor.html`（作品ページができたら付け替える予定） |
| 日本語版をつくる | 未着手。ナビ右上の地球アイコンはデザインどおり置いてあるがリンク先なし |

---

## 10. 既知の残件（2026-09-21 時点）

1. 代表の肖像は暫定（縦写真を黒地に収めて表示）。横長のスタジオ写真が撮れたら §3 の手順で差し替え
2. Gallery／Selected work のカード画像は 656px 幅（デザイナーの書き出し）。Retina ではやや柔らかい。2倍サイズの書き出しをもらえたら同名で上書き
3. 専用の 404 ページは未作成（現在は GitHub 標準の 404）
4. フォームは mailto 方式（送信者の端末にメールアプリが必要）。Formspree 等への切り替えは §9
5. Story の写真帯（丸窓・提灯）はタブレットでデザインよりやや横長
6. ヒーロー見出しの大きさ（Home）は写真が揃った状態で一度だけ微調整する予定だった → 公開後に判断

---

## 11. 相談先・履歴の見方
- 何を・いつ・なぜ変えたかは GitHub Desktop の **History**（または github.com のリポジトリ → Commits）に全部残っています。コミットメッセージが説明です
- 公開までの判断（コピーの確定理由、使わなかった画像とその理由、QA 結果）は `_docs/` と `content/copy.md` に残っています
- Search Console：`euniverse.co.jp`（ドメインプロパティ）。sitemap 送信済み。新しいページを足したら `sitemap.xml` を更新するだけで再送信は不要（数日で自動取得）
