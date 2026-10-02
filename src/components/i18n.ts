export type Locale = 'en' | 'zh-TW' | 'zh-CN';

export const LOCALES: { id: Locale; short: string; name: string }[] = [
  { id: 'en', short: 'EN', name: 'English' },
  { id: 'zh-TW', short: '繁中', name: '繁體中文' },
  { id: 'zh-CN', short: '简中', name: '简体中文' },
];

export const EMAIL = 'service@wazcher.com';
export const CITORA_URL = 'https://citora.ai';
export const X_URL = 'https://x.com/Citora_ai';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/citora-ai/';

const en = {
  meta: { skip: 'Skip to content' },
  nav: {
    citora: 'Citora',
    ads: 'ChatGPT Ads',
    token: '$CIT',
    roadmap: 'Roadmap',
    faq: 'FAQ',
    launch: 'Launch Citora',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    home: 'Wazcher home',
  },
  hero: {
    title: 'Be the answer\nAI gives.',
    sub: 'Citora shows whether AI mentions and cites your brand, gets you recommended, and places your ads in ChatGPT.',
    cta1: 'Launch Citora',
    cta2: 'Explore $CIT',
    works: 'Works across',
  },
  demoNote: 'Example. Illustrative data.',
  scan: {
    hud: 'Reading 4 AI engines',
    fragments: ['Mentioned ×3', 'cited: your-site.com', 'Not mentioned', 'ChatGPT', 'cited: g2.com', 'Claude', 'Mentioned ×2', 'Gemini', 'Your brand', 'Perplexity', 'cited: reddit.com', 'Mention rate', 'Citation rate', 'Mentioned ×1'],
  },
  shift: {
    label: 'The shift',
    title: 'Discovery moved into the answer.',
    sub: 'AI does not rank. It recommends a few brands in one paragraph.',
    stats: [
      { n: '900', u: 'M', d: 'People who use ChatGPT every week', s: 'Reported by TechCrunch, February 2026' },
      {
        n: '51',
        u: '%',
        d: 'B2B software buyers who start their research with an AI chatbot, not a search engine',
        s: 'G2 buyer survey, April 2026, 1,076 software buyers',
      },
      { n: '+120', u: '%', d: 'More organic clicks when a brand is cited in a Google AI overview', s: 'Seer Interactive, April 2026, 53 brands' },
      {
        n: '40',
        u: '%',
        d: 'More visibility in AI answers for content adjusted with GEO methods, at most',
        s: 'Aggarwal et al., “GEO: Generative Engine Optimization”, Princeton / IIT Delhi, KDD 2024, controlled experiment.',
      },
    ],
  },
  citora: {
    label: 'Citora',
    title: 'See it. Find it. Hit it.',
    beats: [
      { n: 'See it.', d: 'Four AIs answer the same question at once: who is mentioned, who is cited.' },
      { n: 'Find it.', d: 'The opportunity map shows which questions no site has claimed yet.' },
      { n: 'Hit it.', d: 'Citora drafts your AI Profile, tests versions, and shows which one AI read.' },
    ],
    map: {
      title: 'Opportunity map',
      total: '48',
      totalLabel: 'searches, last 30 days',
      questions: 'questions',
      citations: 'citations',
      yourSite: 'Your site',
      lanes: [
        {
          n: 'Blue ocean',
          d: 'No site cited consistently yet',
          rows: [
            'How do I check whether ChatGPT cites my site?',
            'GEO platform for agencies in Asia',
            'How to track brand mentions in Perplexity',
            'AI search visibility report for a board meeting',
          ],
        },
        {
          n: 'Contested',
          d: 'You and others show up',
          rows: [
            'Best AI visibility tracker',
            'Tools that monitor brand mentions in AI answers',
            'How to get recommended by ChatGPT',
            'AI visibility tool for B2B software',
          ],
        },
        {
          n: 'Red ocean',
          d: 'One site is cited consistently',
          rows: ['Best SEO tools', 'Keyword research tool', 'Backlink checker', 'Rank tracking software'],
        },
      ],
    },
  },
  ads: {
    label: 'ChatGPT Ads',
    title: 'Ads in ChatGPT, aimed with mention and citation data.',
    sub: 'Place ads in ChatGPT through Citora, on the questions where AI leaves you out.',
    card: {
      title: 'Ad strategy',
      tabs: ['Strategy', 'Mentions', 'Citations'],
      brand: 'Your brand',
      target: '“Best AI visibility tracker for B2B teams”',
      angle: 'Gemini leaves you out of this comparison, so answer the weakness AI repeats and lead with the four-AI view.',
      placed: 'ChatGPT Free and Go',
      ratesLabel: 'Mention rate by engine',
      you: 'You',
      rival: 'Top competitor',
      totalLabel: 'Your mention rate across 4 engines',
    },
  },
  token: {
    label: '$CIT',
    title: 'One token for everything on Citora.',
    sub: 'Every spend on Citora will be paid in $CIT, so using the product and using the token are the same activity.',
    utilLabel: 'Paid in $CIT',
    utils: ['Plans and credits', 'AI Profile A/B experiments', 'ChatGPT ad budgets'],
    note: '$CIT is pre-launch, with no price, sale or trading. Nothing here is an offer to sell or a solicitation to buy any token or security.',
  },
  roadmap: {
    label: 'Roadmap',
    title: 'From GEO platform to token economy.',
    phase: 'Phase',
    phases: [
      { s: 'Live', t: 'Citora live', d: 'GEO platform tracking mentions and citations across ChatGPT, Claude, Gemini and Perplexity.' },
      { s: 'In progress', t: 'Ads in ChatGPT through Citora', d: 'Ads placed against conversations chosen from mention and citation data, measured in the same loop.' },
      { s: 'Next', t: '$CIT launch', d: 'Network and launch details announced beforehand.' },
      { s: 'Planned', t: 'All Citora spend in $CIT', d: 'Every purchase on Citora settled in $CIT, plus ecosystem expansion.' },
    ],
  },
  faq: {
    label: 'FAQ',
    title: 'Questions investors ask.',
    items: [
      {
        q: 'What is Wazcher?',
        a: 'Wazcher is taking Citora onchain. We are building the $CIT economy and the community around Citora, so that every action on the platform will settle in one token.',
      },
      {
        q: 'What is Citora?',
        a: 'Citora is the world’s first closed-loop GEO platform, live at citora.ai. It asks ChatGPT, Claude, Gemini and Perplexity the questions customers ask and shows two things for every answer: whether the brand is mentioned (the answer names it) and whether it is cited (the AI read its website while gathering sources). It then maps which questions are still open, drafts the brand’s AI Profile, tests versions and tracks mention and citation rates daily. Five steps, one platform: index, generate, test, optimise, measure.',
      },
      {
        q: 'What is GEO, and how is it different from SEO?',
        a: 'GEO, Generative Engine Optimization, is the work of getting a brand mentioned and cited in AI generated answers. On Google you compete for a position in a list. In an AI answer there is no 7th place: if you are not in the paragraph, you do not exist.',
        table: true,
      },
      {
        q: 'How do ads in ChatGPT work with Citora?',
        a: 'ChatGPT shows ads to its Free and Go users. Citora already knows how AI describes the brand, which questions are blue ocean, and where the brand is mentioned and where it is not. It uses that data to choose which conversations to place ads against and how to position them, places the ads, then measures mention rate, citation rate and ad results in the same loop, so earned and paid visibility are managed together.',
      },
      {
        q: 'Is $CIT live?',
        a: 'No. $CIT is pre-launch. There is no price, sale or trading today. Network and launch details will be announced later.',
      },
      {
        q: 'What will $CIT be used for?',
        a: 'Every spend on Citora: GEO plans, search and analysis credits, AI Profile A/B experiments and ChatGPT ad budgets.',
      },
      {
        q: 'How do I get in touch or invest?',
        a: 'Email service@wazcher.com. Investor materials are shared on request.',
      },
    ],
    geo: {
      cols: ['', 'SEO', 'GEO'],
      rows: [
        ['Where', 'Google, Bing', 'ChatGPT, Claude, Gemini, Perplexity'],
        ['What you get', 'A ranked list of links', 'One paragraph that recommends'],
        ['Goal', 'Rank higher', 'Be mentioned, and be cited'],
        ['Measured by', 'Position, click-through rate', 'Mention rate, citation rate, AI search visibility'],
      ],
    },
  },
  close: {
    title: 'Citora is live. $CIT is next.',
    note: 'Investor materials and product walkthroughs on request.',
  },
  footer: {
    desc: 'Wazcher × Citora: the closed-loop GEO platform, onchain with $CIT.',
    product: 'Product',
    company: 'Company',
    social: 'Social',
    contact: 'Contact',
    legal: '$CIT is not yet available. Nothing on this website is an offer to sell or a solicitation to buy any token or security. ChatGPT and OpenAI are trademarks of OpenAI. Claude, Gemini and Perplexity are trademarks of their respective owners.',
    copy: '© 2026 Wazcher',
  },
};

export type Dict = typeof en;

const zhTW: Dict = {
  meta: { skip: '跳到主要內容' },
  nav: {
    citora: 'Citora',
    ads: 'ChatGPT 廣告',
    token: '$CIT',
    roadmap: '發展藍圖',
    faq: '常見問題',
    launch: '前往 Citora',
    openMenu: '開啟選單',
    closeMenu: '關閉選單',
    language: '語言',
    home: 'Wazcher 首頁',
  },
  hero: {
    title: '成為 AI\n給出的答案。',
    sub: 'Citora 告訴你 AI 有沒有提到、引用你的品牌，讓 AI 推薦你，還能在 ChatGPT 投放廣告。',
    cta1: '前往 Citora',
    cta2: '了解 $CIT',
    works: '支援引擎',
  },
  demoNote: '範例，數據僅供示意。',
  scan: {
    hud: '正在讀取 4 個 AI 引擎',
    fragments: ['提到 ×3', '引用：your-site.com', '沒提到', 'ChatGPT', '引用：g2.com', 'Claude', '提到 ×2', 'Gemini', '你的品牌', 'Perplexity', '引用：reddit.com', 'AI 回答提及率', '來源引用率', '提到 ×1'],
  },
  shift: {
    label: '轉變',
    title: '被發現的地方，\n已經移到答案裡。',
    sub: 'AI 不排名，只在一段話裡推薦少數幾個品牌。',
    stats: [
      { n: '9', u: '億', d: '每週使用 ChatGPT 的人數', s: 'TechCrunch 報導，2026 年 2 月' },
      { n: '51', u: '%', d: 'B2B 軟體買家採購第一步先問 AI，而不是搜尋引擎', s: 'G2 買家調查，2026 年 4 月，1,076 位軟體買家' },
      { n: '+120', u: '%', d: '品牌被 Google AI 摘要引用時，自然點擊多出的比例', s: 'Seer Interactive，2026 年 4 月，53 個品牌' },
      { n: '40', u: '%', d: '依 GEO 方法調整內容，在 AI 回答裡的能見度最高提升幅度', s: 'Aggarwal 等，〈GEO: Generative Engine Optimization〉，Princeton／IIT Delhi，KDD 2024，受控實驗。' },
    ],
  },
  citora: {
    label: 'Citora',
    title: '看得清、找得到、打得準。',
    beats: [
      { n: '看得清。', d: '四個 AI 同時回答同一題，誰被提到、誰被引用，一目了然。' },
      { n: '找得到。', d: '機會地圖標出哪些問題還沒有網站站穩。' },
      { n: '打得準。', d: 'Citora 替你寫好 AI Profile，測試不同版本，看 AI 讀了哪一版。' },
    ],
    map: {
      title: '機會地圖',
      total: '48',
      totalLabel: '次搜尋，最近 30 天',
      questions: '個問題',
      citations: '次引用',
      yourSite: '你的網站',
      lanes: [
        {
          n: '藍海',
          d: '還沒有網站被穩定引用',
          rows: [
            '怎麼確認 ChatGPT 有沒有引用我的網站？',
            '適合亞洲代理商的 GEO 平台',
            '怎麼追蹤品牌在 Perplexity 被提到幾次',
            '給董事會看的 AI 搜尋能見度報告',
          ],
        },
        {
          n: '競爭區',
          d: '你和其他網站都在',
          rows: ['最好用的 AI 能見度追蹤工具', '監測品牌在 AI 回答中被提及的工具', '怎麼讓 ChatGPT 推薦我', '適合 B2B 軟體的 AI 能見度工具'],
        },
        {
          n: '紅海',
          d: '已有網站被穩定引用',
          rows: ['最好的 SEO 工具', '關鍵字研究工具', '反向連結檢查工具', '排名追蹤軟體'],
        },
      ],
    },
  },
  ads: {
    label: 'ChatGPT 廣告',
    title: '用提及與引用數據\n規劃 ChatGPT 廣告。',
    sub: '透過 Citora 在 ChatGPT 投放廣告，鎖定 AI 沒提到你的那些問題。',
    card: {
      title: '廣告策略',
      tabs: ['策略', '提及', '引用'],
      brand: '你的品牌',
      target: '「最適合 B2B 團隊的 AI 能見度追蹤工具」',
      angle: 'Gemini 在這道比較題沒提到你，所以正面回應 AI 常說的弱點，先秀四個 AI 的對照。',
      placed: 'ChatGPT Free 與 Go',
      ratesLabel: '各引擎提及率',
      you: '你',
      rival: '主要競品',
      totalLabel: '你在 4 個引擎的提及率',
    },
  },
  token: {
    label: '$CIT',
    title: 'Citora 上的一切，\n用同一個代幣。',
    sub: 'Citora 上的每一筆支出，未來都以 $CIT 支付。使用產品，就是使用代幣。',
    utilLabel: '以 $CIT 支付',
    utils: ['方案與點數', 'AI Profile A/B 實驗', 'ChatGPT 廣告預算'],
    note: '$CIT 尚未發行，目前沒有價格、銷售或交易。本網站內容不構成出售任何代幣或證券的要約，亦不構成購買之邀約。',
  },
  roadmap: {
    label: '發展藍圖',
    title: '從 GEO 平台\n走向代幣經濟。',
    phase: '階段',
    phases: [
      { s: '已上線', t: 'Citora 上線', d: 'GEO 平台已在 ChatGPT、Claude、Gemini 與 Perplexity 上追蹤提及與引用。' },
      { s: '進行中', t: '透過 Citora 投放 ChatGPT 廣告', d: '依提及與引用數據挑選要投放的對話，並在同一個閉環內衡量。' },
      { s: '下一步', t: '$CIT 發行', d: '網路與發行細節將事先公布。' },
      { s: '規劃中', t: 'Citora 支出全面使用 $CIT', d: 'Citora 上的每一筆購買都以 $CIT 結算，並擴展生態系。' },
    ],
  },
  faq: {
    label: '常見問題',
    title: '投資人常問的問題。',
    items: [
      {
        q: 'Wazcher 是什麼？',
        a: 'Wazcher 正在將 Citora 帶上鏈。我們要建立 $CIT 經濟，以及圍繞 Citora 的社群，讓平台上的每一筆操作，未來都以同一個代幣結算。',
      },
      {
        q: 'Citora 是什麼？',
        a: 'Citora 是全世界第一個閉環式 GEO 平台，已在 citora.ai 上線。它用客戶會問的問題去問 ChatGPT、Claude、Gemini 與 Perplexity，每一則回答都看兩件事：有沒有提到品牌（回答點名了它），以及有沒有引用（AI 找資料時讀了它的網站）。接著標出哪些問題還有機會、替品牌寫好 AI Profile、測試不同版本，並每天追蹤提及率與引用率。五個步驟在同一個平台：收錄、生成、測試、優化、測量。',
      },
      {
        q: '什麼是 GEO？和 SEO 有什麼不同？',
        a: 'GEO（生成式引擎優化）是讓品牌在 AI 生成的回答中被提到、被引用的工作。在 Google 上，你爭的是列表中的名次；在 AI 回答裡沒有第 7 名，不在那段話裡，就等於不存在。',
        table: true,
      },
      {
        q: 'Citora 如何處理 ChatGPT 廣告？',
        a: 'ChatGPT 會向 Free 與 Go 用戶顯示廣告。Citora 已經知道 AI 怎麼描述品牌、哪些問題還是藍海、品牌在哪裡被提到、在哪裡沒有，並用這些數據決定廣告要出現在哪些對話旁、如何定位。接著完成投放，再把提及率、引用率與廣告成效放進同一個閉環衡量，讓自然曝光與付費曝光一起管理。',
      },
      {
        q: '$CIT 已經上線了嗎？',
        a: '還沒有。$CIT 目前尚未發行，沒有價格、銷售或交易。網路與發行細節將於日後公布。',
      },
      {
        q: '$CIT 未來的用途是什麼？',
        a: '支付 Citora 上的所有支出：GEO 方案、搜尋與分析點數、AI Profile A/B 實驗，以及 ChatGPT 廣告預算。',
      },
      {
        q: '如何聯絡或洽談投資？',
        a: '請來信 service@wazcher.com，投資人資料可依需求提供。',
      },
    ],
    geo: {
      cols: ['', 'SEO', 'GEO'],
      rows: [
        ['在哪裡', 'Google、Bing', 'ChatGPT、Claude、Gemini、Perplexity'],
        ['呈現方式', '一串排序過的連結', '一段直接推薦的回答'],
        ['目標', '排名往前', '被提到，也被引用'],
        ['衡量方式', '排名位置、點擊率', '提及率、引用率、AI 搜尋能見度'],
      ],
    },
  },
  close: {
    title: 'Citora 已上線，\n下一步是 $CIT。',
    note: '投資人資料與產品導覽，歡迎來信索取。',
  },
  footer: {
    desc: 'Wazcher × Citora：閉環式 GEO 平台，以 $CIT 上鏈。',
    product: '產品',
    company: '公司',
    social: '社群',
    contact: '聯絡我們',
    legal: '$CIT 目前尚未推出。本網站任何內容均不構成出售任何代幣或證券的要約，亦不構成購買之邀約。ChatGPT 與 OpenAI 為 OpenAI 之商標。Claude、Gemini 與 Perplexity 為其各自所有者之商標。',
    copy: '© 2026 Wazcher',
  },
};

const zhCN: Dict = {
  meta: { skip: '跳到主要内容' },
  nav: {
    citora: 'Citora',
    ads: 'ChatGPT 广告',
    token: '$CIT',
    roadmap: '路线图',
    faq: '常见问题',
    launch: '进入 Citora',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    language: '语言',
    home: 'Wazcher 首页',
  },
  hero: {
    title: '成为 AI\n给出的答案。',
    sub: 'Citora 告诉你 AI 有没有提到、引用你的品牌，让 AI 推荐你，还能在 ChatGPT 投放广告。',
    cta1: '进入 Citora',
    cta2: '了解 $CIT',
    works: '支持引擎',
  },
  demoNote: '示例，数据仅作演示。',
  scan: {
    hud: '正在读取 4 个 AI 引擎',
    fragments: ['提到 ×3', '引用：your-site.com', '没提到', 'ChatGPT', '引用：g2.com', 'Claude', '提到 ×2', 'Gemini', '你的品牌', 'Perplexity', '引用：reddit.com', 'AI 回答提及率', '来源引用率', '提到 ×1'],
  },
  shift: {
    label: '变化',
    title: '品牌被发现的地方，\n已经转移到答案里。',
    sub: 'AI 不排名，只在一段话里推荐少数几个品牌。',
    stats: [
      { n: '9', u: '亿', d: '每周使用 ChatGPT 的人数', s: 'TechCrunch 报道，2026 年 2 月' },
      { n: '51', u: '%', d: 'B2B 软件买家采购的第一步是问 AI，而不是用搜索引擎', s: 'G2 买家调查，2026 年 4 月，1,076 位软件买家' },
      { n: '+120', u: '%', d: '品牌被 Google AI 摘要引用时，自然点击增加的比例', s: 'Seer Interactive，2026 年 4 月，53 个品牌' },
      { n: '40', u: '%', d: '按 GEO 方法调整内容后，在 AI 回答中的能见度最高提升幅度', s: 'Aggarwal 等，《GEO: Generative Engine Optimization》，Princeton／IIT Delhi，KDD 2024，对照实验。' },
    ],
  },
  citora: {
    label: 'Citora',
    title: '看得清、找得到、打得准。',
    beats: [
      { n: '看得清。', d: '四个 AI 同时回答同一个问题，谁被提到、谁被引用，一目了然。' },
      { n: '找得到。', d: '机会地图标出哪些问题还没有网站站稳。' },
      { n: '打得准。', d: 'Citora 帮你写好 AI Profile，测试不同版本，看 AI 读的是哪一版。' },
    ],
    map: {
      title: '机会地图',
      total: '48',
      totalLabel: '次搜索，最近 30 天',
      questions: '个问题',
      citations: '次引用',
      yourSite: '你的网站',
      lanes: [
        {
          n: '蓝海',
          d: '还没有网站被稳定引用',
          rows: [
            '怎么确认 ChatGPT 有没有引用我的网站？',
            '适合亚洲代理商的 GEO 平台',
            '怎么追踪品牌在 Perplexity 被提到几次',
            '给董事会看的 AI 搜索能见度报告',
          ],
        },
        {
          n: '竞争区',
          d: '你和其他网站都在',
          rows: ['最好用的 AI 能见度追踪工具', '监测品牌在 AI 回答中被提及的工具', '怎么让 ChatGPT 推荐我', '适合 B2B 软件的 AI 能见度工具'],
        },
        {
          n: '红海',
          d: '已有网站被稳定引用',
          rows: ['最好的 SEO 工具', '关键词研究工具', '反向链接检查工具', '排名追踪软件'],
        },
      ],
    },
  },
  ads: {
    label: 'ChatGPT 广告',
    title: '用提及和引用数据\n规划 ChatGPT 广告。',
    sub: '通过 Citora 在 ChatGPT 投放广告，瞄准 AI 没提到你的那些问题。',
    card: {
      title: '广告策略',
      tabs: ['策略', '提及', '引用'],
      brand: '你的品牌',
      target: '“最适合 B2B 团队的 AI 能见度追踪工具”',
      angle: 'Gemini 在这道对比题里没提到你，所以正面回应 AI 常说的短板，先展示四个 AI 的对比。',
      placed: 'ChatGPT Free 和 Go',
      ratesLabel: '各引擎提及率',
      you: '你',
      rival: '主要竞品',
      totalLabel: '你在 4 个引擎的提及率',
    },
  },
  token: {
    label: '$CIT',
    title: 'Citora 上的一切，\n用同一个代币。',
    sub: 'Citora 上的每一笔支出，将来都用 $CIT 支付。使用产品，就是使用代币。',
    utilLabel: '以 $CIT 支付',
    utils: ['套餐与额度', 'AI Profile A/B 实验', 'ChatGPT 广告预算'],
    note: '$CIT 尚未发行，目前没有价格、发售或交易。本网站内容不构成出售任何代币或证券的要约，也不构成购买邀约。',
  },
  roadmap: {
    label: '路线图',
    title: '从 GEO 平台\n走向代币经济。',
    phase: '阶段',
    phases: [
      { s: '已上线', t: 'Citora 上线', d: 'GEO 平台已在 ChatGPT、Claude、Gemini 和 Perplexity 上追踪提及和引用。' },
      { s: '进行中', t: '通过 Citora 投放 ChatGPT 广告', d: '根据提及和引用数据选择投放的对话，并在同一个闭环内衡量。' },
      { s: '下一步', t: '$CIT 发行', d: '网络和发行细节将提前公布。' },
      { s: '规划中', t: 'Citora 支出全面使用 $CIT', d: 'Citora 上的每一笔购买都以 $CIT 结算，并扩展生态。' },
    ],
  },
  faq: {
    label: '常见问题',
    title: '投资人常问的问题。',
    items: [
      {
        q: 'Wazcher 是什么？',
        a: 'Wazcher 正在将 Citora 带上链。我们要建立 $CIT 经济，以及围绕 Citora 的社区，让平台上的每一项操作，将来都用同一个代币结算。',
      },
      {
        q: 'Citora 是什么？',
        a: 'Citora 是全球第一个闭环式 GEO 平台，已在 citora.ai 上线。它用客户会问的问题去问 ChatGPT、Claude、Gemini 和 Perplexity，每条回答都看两件事：有没有提到品牌（回答点了它的名），以及有没有引用（AI 查资料时读了它的网站）。然后标出哪些问题还有机会、帮品牌写好 AI Profile、测试不同版本，并每天追踪提及率和引用率。五个步骤在同一个平台上完成：收录、生成、测试、优化、测量。',
      },
      {
        q: '什么是 GEO？和 SEO 有什么区别？',
        a: 'GEO（生成式引擎优化）是让品牌在 AI 生成的回答中被提到、被引用的工作。在 Google 上，你争的是列表里的名次；在 AI 回答里没有第 7 名，不在那段话里，就等于不存在。',
        table: true,
      },
      {
        q: 'Citora 如何做 ChatGPT 广告？',
        a: 'ChatGPT 会向 Free 和 Go 用户展示广告。Citora 已经掌握 AI 怎么描述品牌、哪些问题还是蓝海、品牌在哪里被提到、在哪里没有，并据此决定广告出现在哪些对话旁、如何定位。随后完成投放，再把提及率、引用率和广告效果放进同一个闭环衡量，让自然曝光和付费曝光统一管理。',
      },
      {
        q: '$CIT 已经上线了吗？',
        a: '还没有。$CIT 目前尚未发行，没有价格、发售或交易。网络和发行细节将在之后公布。',
      },
      {
        q: '$CIT 将来用于什么？',
        a: '支付 Citora 上的所有支出：GEO 套餐、搜索与分析额度、AI Profile A/B 实验，以及 ChatGPT 广告预算。',
      },
      {
        q: '如何联系或洽谈投资？',
        a: '请发邮件至 service@wazcher.com，投资人资料可按需提供。',
      },
    ],
    geo: {
      cols: ['', 'SEO', 'GEO'],
      rows: [
        ['在哪里', 'Google、Bing', 'ChatGPT、Claude、Gemini、Perplexity'],
        ['呈现方式', '一串排好序的链接', '一段直接推荐的回答'],
        ['目标', '排名靠前', '被提到，也被引用'],
        ['衡量方式', '排名位置、点击率', '提及率、引用率、AI 搜索能见度'],
      ],
    },
  },
  close: {
    title: 'Citora 已上线，\n下一步是 $CIT。',
    note: '投资人资料和产品演示，欢迎发邮件索取。',
  },
  footer: {
    desc: 'Wazcher × Citora：闭环式 GEO 平台，以 $CIT 上链。',
    product: '产品',
    company: '公司',
    social: '社交媒体',
    contact: '联系我们',
    legal: '$CIT 目前尚未推出。本网站的任何内容均不构成出售任何代币或证券的要约，也不构成购买邀约。ChatGPT 和 OpenAI 是 OpenAI 的商标。Claude、Gemini 和 Perplexity 是其各自所有者的商标。',
    copy: '© 2026 Wazcher',
  },
};

export const DICT: Record<Locale, Dict> = {
  en,
  'zh-TW': zhTW,
  'zh-CN': zhCN,
};
