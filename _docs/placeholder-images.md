# 仮画像の一覧（最終形）— 2026-09-20（同日、デザイナー写真の取り込み後に更新）

写真が届いたら、下の「期待するファイル名」で **`assets/img/`** に置くだけで差し替わります（HTML・CSS の変更は不要）。
例外は代表の肖像 1 点のみ（`assets/portrait.jpg`、クラス名を 1 つ外す作業あり）。

置き方：Finder で `Documents/euniverse-site/assets/img/` を開き、同じ名前で上書き → GitHub Desktop で commit → push。

## 取り込み結果（2026-09-20、Drive「website images」より）

| 枠 | 使ったファイル | 判定 |
|---|---|---|
| Gallery 1〜3（Home） | `2X version/Gallery/Image 1 (1).jpg` `Image 2.jpg` `Image 3 (2).jpg`（2026-09-21 差し替え） | ✅ 使用（875×1020 ＝ デザイン枠 437px のちょうど2倍。JPEG 80・EXIF 除去。以前は 656×765） |
| Selected work 1〜3（What we do） | `2X version/selected work/Image 1 (1).jpg` `Image 2.jpg` `Image 3 (2).jpg`（2026-09-21 差し替え） | ✅ 使用（875×830、`work-*.jpg` として別ファイル。以前は 656×623） |
| 03 Digital Direction の全幅写真 | `what we do/desktop/pexels-artempodrez-4884106 1 (2).png` | ✅ 使用 |
| Maryam の肖像 | `what we do/desktop/Maryam.png` | ✅ 使用（許可済み） |
| Noor 3 枚目 | `Noor/desktop/pexels-alfred-franz-114875410-31171037 1.png` | ✅ 使用 |
| 02 Brand & Identity の全幅写真 | `what we do/desktop/ChatGPT Image Sep 8, 2026….png` → 代わりに Brand Assets 直下の `IMG_1457.jpeg`（赤煉瓦の外壁・実写） | ❌ 生成画像は不使用 → ✅ 実写を右 22% トリミング（通行人・看板を除去）、2160px・JPEG 80・EXIF 除去で使用 |
| 代表の肖像 | `company/desktop/Image (1).png` | ❌ 不使用。名前に ChatGPT を含まないが、tablet 版が `ChatGPT Image Jul 4…` で同一構図＝生成画像 → **暫定の実写のまま** |

## A. まだ仮画像（灰色の枠）のもの — 8 点 → **残り 0 点**（代表の肖像のみ暫定の実写）

| # | ページ | 場所 | 期待するファイル名 | 推奨サイズ（横×縦 px） | 形式 | 置くだけで差し替わるか |
|---|---|---|---|---|---|---|
| 1 | Home ／ What we do | Gallery ／ Selected work 1枚目 — Brand Bible 表紙 | `assets/img/gallery-brand-bible.jpg` | 1200×1400（比率 437:508、縦長） | JPEG（または PNG） | ✅ はい |
| 2 | Home ／ What we do | Gallery ／ Selected work 2枚目 — Logo System | `assets/img/gallery-logo-system.jpg` | 1200×1400（同上） | JPEG／PNG | ✅ はい |
| 3 | Home ／ What we do | Gallery ／ Selected work 3枚目 — 名刺モック | `assets/img/gallery-business-card.jpg` | 1200×1400（同上） | JPEG／PNG | ✅ はい |
| 4 | What we do | 02 Brand & Identity の上の全幅写真（石の上のエンボス名刺） | `assets/img/what-we-do-brand.jpg` | 2400×1400（比率 1440:836、横長） | JPEG | ✅ はい |
| 5 | What we do | 03 Digital Direction の上の全幅写真（白い机のノートPC） | `assets/img/what-we-do-digital.jpg` | 2400×1400（同上） | JPEG | ✅ はい |
| 6 | What we do | A universe Where Talent Gathers — Maryam Alavi の肖像 | `assets/img/what-we-do-maryam.jpg` | 1200×1670（比率 437:608、縦長） | JPEG | ✅ はい |
| 7 | Noor | 3 枚目の全幅写真（漆喰の彫刻パネル） | `assets/img/noor-panels.jpg` | 2400×1400（比率 1440:836） | JPEG | ✅ はい |
| 8 | Company | Representative Director — 代表の肖像（現在は暫定の縦写真） | `assets/portrait.jpg` ※ `img/` の外 | 2880×1400（比率 1440:700、**横長**・暗い背景・人物は中央〜やや左） | JPEG | ⚠ 差し替え後、[v2/company.html](../v2/company.html) の `director__photo--provisional` というクラス名を 1 つ消すと全面表示に戻る（私に言ってもらえれば 1 分で対応） |

## B. いったん使用中だが、原本が来たら同名で上書きするもの — 7 点

docx 埋め込み（2048px）を使っています。表示には足りていますが、原本（高解像度）が届いたら同じ名前で上書きしてください。

| ページ | 場所 | ファイル名 | 推奨サイズ | 元ネタ |
|---|---|---|---|---|
| Story | 写真帯・左（丸窓） | `assets/img/story-strip-window.jpg` | 1500×1600（縦長） | Pexels 32416088 |
| Story | 写真帯・右（提灯） | `assets/img/story-strip-lantern.jpg` | 1500×1600（縦長） | Pexels 31729757（Boris Dahm） |
| What we do | 01 Noor の上（白いドーム） | `assets/img/what-we-do-noor.jpg` | 2400×1400 | Pexels 7698870（Meruyert Gonullu） |
| What we do | 04 Care & Health の上（ドライフラワー） | `assets/img/what-we-do-care.jpg` | 2400×1400 | Pexels 10902211（Marie Martin） |
| Noor | 1 枚目（白いアーチ） | `assets/img/noor-arches.jpg` | 2400×1400 | Pexels 34890484（Zunaid Hasan） |
| Noor | 2 枚目（木彫りの手元） | `assets/img/noor-craft.jpg` | 2400×1400 | Pexels 30563520（Moussa Idrissi） |
| Company | Our Approach の下（コンパス） | `assets/img/company-approach-compass.jpg` | 2400×1400 | Pexels 37270795 |

## C. 原本を使用済み（差し替え不要）— 2 点

| ページ | 場所 | ファイル名 | 出所 |
|---|---|---|---|
| Home | Our Story の背景（石の回廊） | `assets/img/home-story-corridor.jpg` | Brand Assets／pexels-gera-cejas-3616330-31733770.jpg（Gera Cejas） |
| Story | ヒーロー（名古屋城） | `assets/img/story-hero-castle.jpg` | Brand Assets／IMG_0217.jpeg |

## 補足
- 推奨サイズは「デスクトップで 2 倍密度（Retina）でも粗くならない大きさ」です。これより大きくても構いません（読み込み時に縮小されます）。逆に小さいと少しぼやけます。
- 比率が推奨と違っても崩れません（枠に合わせて中央で自動トリミング）。ただし人物写真は顔の位置がずれる可能性があるので、届いたら私が表示位置を確認します。
- 1 ファイル 1MB 以下が目安です。大きい場合は私が縮小します（そのまま置いてもらって構いません）。
- Pexels 写真の出所は `Images in  website_.docx`（Brand Assets）に一覧があります。公開後にクレジット表記が必要かは Pexels ライセンス上は不要ですが、任意で Footer に入れられます。
