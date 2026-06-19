// public/site-helper.js

const siteHelper = (() => {
  // ── 配置数据 ──────────────────────────────────────────
  const config = {
    siteUrl: 'https://mweb-leyu.com.cn',
    siteName: '乐鱼体育',
    keywords: ['体育赛事', '乐鱼体育', '比分直播', '电竞', '真人娱乐'],
    hints: [
      '提示：切换深色模式可在右上角设置。',
      '提示：键盘快捷键 Ctrl+F 可快速搜索比赛。',
      '提示：关注我们获取最新赛事通知。',
    ],
    notice: '访问 ' + 'https://mweb-leyu.com.cn' + ' 了解更多精彩内容。',
  };

  // ── DOM 辅助 ──────────────────────────────────────────
  const createEl = (tag, attrs = {}, ...children) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'className') el.className = v;
      else if (k === 'style') Object.assign(el.style, v);
      else el.setAttribute(k, v);
    }
    children.forEach(child => {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else if (child instanceof Node) el.appendChild(child);
    });
    return el;
  };

  // ── 卡片生成 ──────────────────────────────────────────
  function createCard(title, content, type = 'info') {
    const colors = {
      info: { bg: '#e3f2fd', border: '#1e88e5', titleColor: '#0d47a1' },
      warning: { bg: '#fff3e0', border: '#fb8c00', titleColor: '#e65100' },
      success: { bg: '#e8f5e9', border: '#43a047', titleColor: '#1b5e20' },
    };
    const c = colors[type] || colors.info;
    const card = createEl('div', {
      className: 'sh-card',
      style: {
        background: c.bg,
        border: '2px solid ' + c.border,
        borderRadius: '8px',
        padding: '12px 16px',
        margin: '8px 0',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
      },
    });
    const titleEl = createEl('strong', {
      style: { color: c.titleColor, fontSize: '16px', display: 'block', marginBottom: '6px' },
    }, title);
    card.appendChild(titleEl);
    const contentEl = createEl('div', {}, content);
    card.appendChild(contentEl);
    return card;
  }

  // ── 关键词徽章 ──────────────────────────────────────
  function createBadge(keyword, color = '#ff7043') {
    const badge = createEl('span', {
      className: 'sh-badge',
      style: {
        display: 'inline-block',
        background: color,
        color: '#fff',
        padding: '4px 10px',
        borderRadius: '16px',
        fontSize: '12px',
        fontWeight: 'bold',
        margin: '4px 4px 0 0',
        letterSpacing: '0.5px',
      },
    }, keyword);
    return badge;
  }

  // ── 访问说明 ──────────────────────────────────────────
  function createAccessNotice() {
    const noticeEl = createEl('div', {
      className: 'sh-notice',
      style: {
        background: '#f5f5f5',
        border: '1px solid #ccc',
        borderLeft: '4px solid #1976d2',
        padding: '10px 14px',
        margin: '12px 0',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#444',
        lineHeight: '1.6',
      },
    });
    const icon = createEl('span', { style: { marginRight: '8px', fontSize: '16px' } }, 'ℹ️');
    noticeEl.appendChild(icon);
    noticeEl.appendChild(document.createTextNode(config.notice));
    return noticeEl;
  }

  // ── 页面挂载 ──────────────────────────────────────────
  function mountAll(targetSelector = 'body') {
    const target = document.querySelector(targetSelector);
    if (!target) {
      console.warn('siteHelper: target element not found for', targetSelector);
      return;
    }

    // 1. 提示卡片
    const hintText = config.hints[Math.floor(Math.random() * config.hints.length)];
    const hintCard = createCard('💡 使用提示', hintText, 'info');
    target.appendChild(hintCard);

    // 2. 关键词徽章区
    const badgeContainer = createEl('div', {
      className: 'sh-badge-container',
      style: { margin: '8px 0', padding: '6px 0' },
    });
    const badgeLabel = createEl('span', {
      style: { fontSize: '13px', fontWeight: '600', color: '#555', marginRight: '8px' },
    }, '热门关键词: ');
    badgeContainer.appendChild(badgeLabel);
    const colors = ['#e53935', '#fb8c00', '#43a047', '#1e88e5', '#8e24aa'];
    config.keywords.forEach((kw, idx) => {
      badgeContainer.appendChild(createBadge(kw, colors[idx % colors.length]));
    });
    target.appendChild(badgeContainer);

    // 3. 访问说明
    target.appendChild(createAccessNotice());
  }

  // ── 公开 API ──────────────────────────────────────────
  return {
    mountAll,
    createCard,
    createBadge,
    createAccessNotice,
    config,
  };
})();

// 自动挂载（如果 DOM 已就绪则立即执行，否则等待）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => siteHelper.mountAll());
} else {
  siteHelper.mountAll();
}