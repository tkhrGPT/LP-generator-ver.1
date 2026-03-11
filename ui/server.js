/**
 * LP Generator UI — ローカルサーバー
 * 起動: node ui/server.js
 * アクセス: http://localhost:3000
 *
 * 依存: Node.js 組み込みモジュールのみ（npm install 不要）
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT       = 3000;
const ROOT       = path.join(__dirname, '..');
const INPUT_DIR  = path.join(ROOT, 'input');
const BRAND_PATH = path.join(INPUT_DIR, 'brand-vars.json');
const CONTENT_PATH = path.join(INPUT_DIR, 'content-input.md');
const UI_HTML    = path.join(__dirname, 'index.html');

// ── ユーティリティ ────────────────────────────────────────────────

function readJson(res) {
  return new Promise((resolve, reject) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch (e) { reject(e); }
    });
  });
}

function json(res, statusCode, data) {
  const payload = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(payload);
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ── brand-vars.json の生成 ────────────────────────────────────────

function buildBrandVars(f) {
  // フォームデータ → ジェネレーターが読む brand-vars.json
  return {
    brand_name:        f.brand_name        || '',
    brand_tagline:     f.brand_tagline     || '',
    product_name:      f.product_name      || '',
    product_tagline:   f.product_tagline   || '',
    category:          f.category          || 'other',
    target_audience:   f.target_audience   || '',
    lp_goal:           f.lp_goal           || 'purchase',
    campaign_type:     f.campaign_type     || 'new_customer',
    brand_tone:        f.brand_tone        || '',
    hero_style:        f.hero_style        || 'emotional',
    cta_style:         f.cta_style         || 'soft',
    font_style:        f.font_style        || 'sans',
    price_band:        f.price_band        || 'mid',
    price_display:     f.price_display     || '',
    offer_details:     f.offer_details     || '',
    main_color:        f.main_color        || '#F3E7E2',
    accent_color:      f.accent_color      || '#2E2A29',
    base_bg_color:     f.base_bg_color     || '#FFFFFF',
    hero_bg_style:     f.hero_bg_style     || 'gradient',
    cta_label:         f.cta_label         || '購入する',
    cta_sub_label:     f.cta_sub_label     || '詳しく見る',
    visual_keywords:   splitLines(f.visual_keywords),
    trust_elements:    Array.isArray(f.trust_elements) ? f.trust_elements : [],
    guarantee_text:    f.guarantee_text    || '',
    sns_platforms:     Array.isArray(f.sns_platforms) ? f.sns_platforms : [],
    structure_template: f.structure_template || 'story',
    form_fields:       Array.isArray(f.form_fields) ? f.form_fields : [],
    form_submit_label: f.form_submit_label || '申し込む',
    legal_notes:       splitLines(f.legal_notes),
    layout_width:      f.layout_width      || 'narrow',
    section_spacing:   f.section_spacing   || 'standard',
  };
}

// ── content-input.md の生成 ───────────────────────────────────────

function buildContentMd(f) {
  const lines = [];

  lines.push('# LP コンテンツ入力ファイル');
  lines.push('# ── このファイルはLPジェネレーターUIから生成されました ──');
  lines.push('');

  lines.push('# 商品概要');
  lines.push(f.product_overview || '');
  lines.push('');

  lines.push('# ターゲットの悩み');
  toBullets(f.target_concerns).forEach(l => lines.push(l));
  lines.push('');

  lines.push('# ベネフィット');
  toBullets(f.benefits).forEach(l => lines.push(l));
  lines.push('');

  lines.push('# 主な特徴');
  toBullets(f.features).forEach(l => lines.push(l));
  lines.push('');

  lines.push('# オファー内容');
  lines.push(f.offer || '');
  lines.push('');

  lines.push('# CTA 補足メモ');
  lines.push(f.cta_note || '');
  lines.push('');

  // FAQ
  lines.push('# よくある質問（FAQ）');
  const faqs = f.faqs || [];
  faqs.forEach((faq, i) => {
    const n = i + 1;
    lines.push(`## Q${n}`);
    lines.push(faq.q || '');
    lines.push('');
    lines.push(`## A${n}`);
    lines.push(faq.a || '');
    lines.push('');
  });

  lines.push('# お客様の声・レビュー');
  toBullets(f.reviews).forEach(l => lines.push(l));
  lines.push('');

  lines.push('# ビジュアル素材について');
  lines.push('');
  lines.push('## ヒーロー背景画像');
  lines.push(f.hero_image || 'なし');
  lines.push('');
  lines.push('## 商品メイン画像');
  lines.push(f.product_image || 'なし');
  lines.push('');
  lines.push('## SNS・ライフスタイル画像（複数可）');
  lines.push(f.sns_images || 'なし');
  lines.push('');

  lines.push('# 注意事項・免責');
  toBullets(f.legal_disclaimers).forEach(l => lines.push(l));
  lines.push('');

  return lines.join('\n');
}

// ── content-input.md のパース ─────────────────────────────────────

function parseContentMd(md) {
  const result = {
    product_overview:  '',
    target_concerns:   '',
    benefits:          '',
    features:          '',
    offer:             '',
    cta_note:          '',
    faqs:              [],
    reviews:           '',
    hero_image:        'なし',
    product_image:     'なし',
    sns_images:        'なし',
    legal_disclaimers: '',
  };

  // セクション見出しで分割
  const sectionRe = /^# (.+)$/gm;
  const positions = [];
  let m;
  while ((m = sectionRe.exec(md)) !== null) {
    positions.push({ title: m[1].trim(), index: m.index, end: m.index + m[0].length });
  }

  function sectionBody(title) {
    const pos = positions.find(p => p.title === title);
    if (!pos) return '';
    const nextPos = positions.find(p => p.index > pos.index);
    const bodyRaw = md.slice(pos.end, nextPos ? nextPos.index : undefined);
    return bodyRaw
      .split('\n')
      .filter(l => !l.startsWith('#'))
      .join('\n')
      .trim();
  }

  result.product_overview  = sectionBody('商品概要');
  result.target_concerns   = stripBullets(sectionBody('ターゲットの悩み'));
  result.benefits          = stripBullets(sectionBody('ベネフィット'));
  result.features          = stripBullets(sectionBody('主な特徴'));
  result.offer             = sectionBody('オファー内容');
  result.cta_note          = sectionBody('CTA 補足メモ');
  result.reviews           = stripBullets(sectionBody('お客様の声・レビュー'));
  result.legal_disclaimers = stripBullets(sectionBody('注意事項・免責'));

  // FAQ のパース（## Q1 / ## A1 形式）
  const faqRe = /## Q(\d+)\n([\s\S]*?)(?=## A\1)(## A\1\n)([\s\S]*?)(?=## Q\d+|# |$)/g;
  const faqSection = sectionBody('よくある質問（FAQ）');
  const faqFull = '# よくある質問（FAQ）\n' + faqSection;
  const qRe = /## Q(\d+)\n([\s\S]*?)(?=## Q\d+|## A\d+|$)/g;
  const aRe = /## A(\d+)\n([\s\S]*?)(?=## Q\d+|## A\d+|$)/g;
  const qs = {}, as = {};
  let qm, am;
  while ((qm = qRe.exec(faqSection)) !== null) qs[qm[1]] = qm[2].trim();
  while ((am = aRe.exec(faqSection)) !== null) as[am[1]] = am[2].trim();
  const maxN = Math.max(...Object.keys(qs).map(Number), 0);
  for (let i = 1; i <= maxN; i++) {
    result.faqs.push({ q: qs[String(i)] || '', a: as[String(i)] || '' });
  }
  if (result.faqs.length === 0) result.faqs.push({ q: '', a: '' });

  // ビジュアル素材
  const visualBody = sectionBody('ビジュアル素材について');
  const heroM   = visualBody.match(/## ヒーロー背景画像\n([^\n]*)/);
  const prodM   = visualBody.match(/## 商品メイン画像\n([^\n]*)/);
  const snsM    = visualBody.match(/## SNS・ライフスタイル画像[^\n]*\n([^\n]*)/);
  if (heroM) result.hero_image    = heroM[1].trim();
  if (prodM) result.product_image = prodM[1].trim();
  if (snsM)  result.sns_images    = snsM[1].trim();

  return result;
}

// ── ヘルパー ──────────────────────────────────────────────────────

function splitLines(str) {
  if (!str) return [];
  return str.split('\n').map(s => s.trim()).filter(Boolean);
}

function toBullets(str) {
  if (!str) return [];
  return str.split('\n').filter(s => s.trim()).map(s => {
    const t = s.trim().replace(/^-\s*/, '');
    return `- ${t}`;
  });
}

function stripBullets(str) {
  return str.split('\n').map(s => s.replace(/^-\s*/, '').trim()).filter(Boolean).join('\n');
}

// ── サーバー ──────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  cors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET / → フォームUI を返す
  if (req.method === 'GET' && req.url === '/') {
    try {
      const html = fs.readFileSync(UI_HTML, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (e) {
      res.writeHead(500);
      res.end('UI ファイルが見つかりません: ' + e.message);
    }
    return;
  }

  // GET /api/load → 既存ファイルを読んで返す
  if (req.method === 'GET' && req.url === '/api/load') {
    try {
      let brandVars = {};
      let contentData = {};

      if (fs.existsSync(BRAND_PATH)) {
        const raw = fs.readFileSync(BRAND_PATH, 'utf8');
        const parsed = JSON.parse(raw);
        // _comment や // キーを除いたデータだけ渡す
        for (const [k, v] of Object.entries(parsed)) {
          if (!k.startsWith('_') && !k.startsWith('//')) brandVars[k] = v;
        }
      }

      if (fs.existsSync(CONTENT_PATH)) {
        const raw = fs.readFileSync(CONTENT_PATH, 'utf8');
        contentData = parseContentMd(raw);
      }

      json(res, 200, { brandVars, contentData });
    } catch (e) {
      json(res, 500, { error: e.message });
    }
    return;
  }

  // POST /api/save → ファイルを書き込む
  if (req.method === 'POST' && req.url === '/api/save') {
    try {
      const body = await readJson(req);
      const brandVars = buildBrandVars(body.brandVars || {});
      const contentMd = buildContentMd(body.contentData || {});

      if (!fs.existsSync(INPUT_DIR)) fs.mkdirSync(INPUT_DIR, { recursive: true });
      fs.writeFileSync(BRAND_PATH, JSON.stringify(brandVars, null, 2), 'utf8');
      fs.writeFileSync(CONTENT_PATH, contentMd, 'utf8');

      json(res, 200, { ok: true, message: '保存しました' });
    } catch (e) {
      json(res, 500, { error: e.message });
    }
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ✓ LP Generator UI が起動しました');
  console.log(`  → ブラウザで開く: http://localhost:${PORT}`);
  console.log('');
  console.log('  停止するには Ctrl+C を押してください');
  console.log('');
});
