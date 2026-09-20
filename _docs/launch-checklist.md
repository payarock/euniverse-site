# 公開当日の手順と確認（1枚）— E.Universe サイト v2

所要：公開作業 5 分 → 反映待ち 2〜10 分 → 目視 15 分 → 外部リンク・Search Console 15 分。
やり直しは `sh tools/publish-v2.sh --undo` → commit → push で 1 手（旧の暫定ページは Git 履歴 `2d0f910` に残っています）。

---

## 0. 公開前の最終確認（当日の朝）
- [ ] 写真 8 点が揃い、仮画像（灰色の枠）が 6 ページから消えている（[placeholder-images.md](placeholder-images.md)）
- [ ] 代表の肖像を横長の原本に差し替え、`director__photo--provisional` を外した
- [ ] `euniverse.co.jp/v2/` を 3 サイズで最後に目視（スマホ実機で 1 回は見る）
- [ ] GitHub Desktop の未送信が 0（手元と GitHub が一致）

## 1. 公開の一手（Claude が実行 → あなたが push）
1. あなた：「公開して」と言う
2. Claude：`sh tools/publish-v2.sh` を実行。やること＝
   - `v2/` の 6 ページをルートへ移し、`noindex` を外す
   - `/v2/…` には旧リンク用の自動転送ページを残す（共有済み URL が生きる）
   - `sitemap.xml` と `robots.txt` を生成
   - `CNAME` は触らない
3. Claude：`git status` の一覧を見せる → あなたが OK → Claude が commit
4. あなた：GitHub Desktop で **Push origin**
5. 反映待ち：通常 2〜3 分、長くて 10 分。`https://euniverse.co.jp/` をシークレットウィンドウで開いて新デザインになれば反映済み

## 2. euniverse.co.jp の目視項目（反映後）
すべて **シークレットウィンドウ**（キャッシュを避けるため）で。

| # | 見るもの | 合格の状態 |
|---|---|---|
| 1 | HTTPS | アドレスバーに鍵マーク。`http://euniverse.co.jp/` と入力しても `https://` に自動で変わる。「保護されていない」警告が出ない |
| 2 | 6 ページ | `/`・`/story.html`・`/what-we-do.html`・`/noor.html`・`/company.html`・`/contact.html` が全部開く。ナビとフッターのリンクで 6 ページを一周できる |
| 3 | 旧 URL | `/v2/` と `/v2/story.html` を開くと、ルートの同じページに自動で飛ぶ |
| 4 | 写真 | 灰色の枠（ファイル名が書かれた四角）が 1 つも無い |
| 5 | フォーム | Contact で必須 5 項目を埋めて Send Message → メールアプリが `info@euniverse.co.jp` 宛・件名「Enquiry via euniverse.co.jp — （Topic）」で開く。空欄のまま送ると赤い警告が出て送れない |
| 6 | 404 | 存在しない URL（例 `/abc`）で GitHub の 404 ページが出る（真っ白でなければ OK。専用 404 ページは後日） |
| 7 | OGP（SNS プレビュー） | LinkedIn の投稿画面に `https://euniverse.co.jp/` を貼ると、シンボル画像＋タイトル「E.Universe — A Nagoya studio for design & digital direction.」が出る。出ない／古い場合は LinkedIn Post Inspector（linkedin.com/post-inspector/）に URL を入れて「Inspect」でキャッシュを更新 |
| 8 | スマホ | 実機で `/` を開き、横スクロールが出ない・ハンバーガーメニューが開閉できる・電話番号タップで発信画面が出る |
| 9 | 検索エンジン向け | `https://euniverse.co.jp/sitemap.xml` に 6 URL、`https://euniverse.co.jp/robots.txt` に `Sitemap:` 行がある。ページのソース（右クリック→ページのソースを表示）に `noindex` が **無い** |
| 10 | 会社情報 | Company の住所・法人名・電話（052）が Company Details と一致 |

問題があれば Claude に「○番が NG」と伝えれば直します。致命的なら `--undo` で戻します。

## 3. 外部プロフィールのウェブサイト欄
### Google ビジネス プロフィール（GBP）
1. business.google.com にログイン → E.Universe株式会社 のプロフィールを開く
2. 「プロフィールを編集」→「連絡先情報」→ **ウェブサイト** が `https://euniverse.co.jp` になっているか確認（`http://`・`.com`・旧 URL なら修正）
3. 保存。反映は数分〜数日。Google 検索で「E.Universe株式会社」と検索し、ナレッジパネルの「ウェブサイト」ボタンが新サイトに飛ぶことを確認
4. （任意）「予約リンク／お問い合わせ」があれば `https://euniverse.co.jp/contact.html`

### LinkedIn 会社ページ
1. linkedin.com/company/e-universe-corp → 管理者ビュー →「ページを編集」
2. 「ヘッダー」タブの **ウェブサイト** を `https://euniverse.co.jp` に（末尾スラッシュ無しで可）
3. 「概要」タブのタグライン欄が `A Nagoya studio for design & digital direction.` になっているか合わせて確認
4. 保存 → 公開ビューでウェブサイトボタンをクリックし、新サイトが開くことを確認
5. 過去投稿のプレビューが古い場合は Post Inspector で URL を再取得

## 4. Google Search Console への sitemap 送信（手で行う手順）
### 4-1. プロパティが無い場合（初回のみ）
1. search.google.com/search-console にログイン（Google Workspace の y.hayashi@ か info@）
2. 左上「プロパティを追加」→ **ドメイン** を選び `euniverse.co.jp` と入力 → 続行
3. 表示される **TXT レコード**（`google-site-verification=…`）をコピー
4. ドメインの DNS 管理画面（お名前.com／ムームードメイン／Cloudflare 等、CNAME を設定した場所）で TXT レコードを追加：ホスト名は空欄（または `@`）、値は貼り付け
5. 数分〜1 時間待って Search Console に戻り「確認」。失敗したら時間を置いて再試行

### 4-2. sitemap の送信
1. Search Console の左メニュー「サイトマップ」
2. 「新しいサイトマップの追加」に `sitemap.xml` と入力 → 送信
3. ステータスが「成功しました」、検出された URL が **6** になれば完了（数分〜数時間）
4. 「URL 検査」で `https://euniverse.co.jp/` を入れ →「インデックス登録をリクエスト」を押すと初回の巡回が早まる（6 ページ分やってもよい）

### 4-3. 1 週間後に見るもの
- 「ページ」レポートで 6 ページが「インデックス登録済み」
- 「ページ」で `/v2/…` が「リダイレクト」として除外されていれば正常
- 「検索パフォーマンス」に `E.Universe` `イーユニバース` `E.Universe株式会社` の表示が出始める

## 5. 公開後 1 週間のフォロー（Claude 側）
- 404 の実 URL ページ（デザインに合わせた専用 404）
- OGP 画像をページ別に（任意）
- Formspree 等への切り替え（メールアプリが無い端末でもフォーム送信できるように）
