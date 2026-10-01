export type Locale = 'en' | 'zh-TW' | 'zh-CN';

export const LOCALES: { id: Locale; short: string; name: string }[] = [
  { id: 'en', short: 'EN', name: 'English' },
  { id: 'zh-TW', short: '繁中', name: '繁體中文' },
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
    sub: 'Wazcher builds Citora, the closed-loop GEO platform that gets brands cited by ChatGPT, Claude, Gemini and Perplexity and places their ads inside ChatGPT. Every action on Citora will settle in $CIT.',
    cta1: 'Launch Citora',
    cta2: 'Explore $CIT',
    works: 'Works across',
    metricsLabel: 'Citora at a glance',
    metrics: [
      { v: '4', l: 'AI engines' },
      { v: '6-step', l: 'Closed loop' },
      { v: '13', l: 'Languages' },
      { v: '24/7', l: 'Monitoring' },
      { v: '+339%', l: 'Avg. citation increase', n: 'Citora customer average' },
    ],
  },
  test: {
    tag: 'Example',
    title: 'AI search test',
    queryLabel: 'Query',
    query: '“best analytics tool for a small online store”',
    brandLabel: 'Brand',
    brand: 'Northlight Analytics',
    cols: ['Engine', 'Cited', 'Position', 'Sentiment'],
    yes: 'Yes',
    no: 'No',
    positive: 'Positive',
    neutral: 'Neutral',
    rateLabel: 'Citation rate',
    rate: '3 of 4 engines',
    na: 'n/a',
  },
  shift: {
    label: 'The shift',
    title: 'Discovery moved into the answer.',
    items: [
      {
        t: 'Search moved from links to answers.',
        d: 'People ask ChatGPT, Claude, Gemini or Perplexity and act on a single answer. Often no results page is ever opened.',
      },
      {
        t: 'AI decides who gets recommended.',
        d: 'Engines recommend what they can parse, verify and trust. A strong Google ranking does not carry over on its own.',
      },
      {
        t: 'Being cited is the new being found.',
        d: 'The answer now has paid space next to it as well: ChatGPT shows ads to Free and Go users. Brands need to earn the citation and buy the placement.',
      },
    ],
  },
  citora: {
    label: 'Citora',
    title: 'A closed loop for visibility in AI answers.',
    intro: 'Citora is the first closed-loop GEO (Generative Engine Optimization) platform. Most tools stop at a score. Citora measures how each engine treats a brand, rewrites what the engines read, tests the change, ships the winner and starts again.',
    loopLabel: 'The loop',
    steps: [
      {
        n: 'Monitor',
        d: 'Scheduled queries run across ChatGPT, Claude, Gemini and Perplexity, daily or weekly.',
        k: ['Citation rate', 'Ranking position', 'Sentiment', 'Alerts on drops over 10%'],
      },
      {
        n: 'Analyze',
        d: 'Which engines cite the brand, which queries trigger it, and where competitors appear instead.',
        k: ['Brand analysis', 'Competitor view', 'Keyword discovery'],
      },
      {
        n: 'Optimize',
        d: 'A structured AI Profile generated from the brand’s own site, edited and synced to /llms.txt.',
        k: ['AI Profile', '/llms.txt', 'Version history'],
      },
      {
        n: 'Experiment',
        d: 'Two content versions compete across the engines. Statistics pick the winner, not opinion.',
        k: ['Chi-squared', 'Cohen’s h', 'UCB bandit'],
      },
      {
        n: 'Deploy',
        d: 'The winning version goes live in one step. Optimized posts can go out to social channels.',
        k: ['One-step deploy', 'Facebook', 'Instagram', 'X', 'Threads'],
      },
      {
        n: 'Repeat',
        d: 'Monitoring restarts on the new baseline. The loop runs around the clock.',
        k: ['24/7', '13 languages'],
      },
    ],
    exp: {
      tag: 'Example',
      title: 'A/B experiment',
      variant: 'Variant',
      rate: 'Citation rate',
      a: 'Current AI Profile',
      b: 'Rewritten FAQ block',
      rows: [
        ['Queries sampled', '480 across 4 engines'],
        ['Chi-squared', 'p < 0.001'],
        ['Cohen’s h', '0.32'],
        ['Allocation', 'UCB bandit'],
      ],
      result: 'Result',
      resultV: 'Deploy B, +16 pts',
    },
    modulesLabel: 'Modules',
    modules: [
      ['AI Profile editor', 'Structured content AI engines parse, synced to /llms.txt.'],
      ['AI search testing', 'One query, 4 engines at once: citation rate, position, sentiment.'],
      ['Brand analysis', 'How each engine describes the brand, and where it falls short.'],
      ['Brand monitoring', 'Scheduled tracking with alerts when visibility drops over 10%.'],
      ['A/B experiments', 'Chi-squared significance, Cohen’s h effect size, UCB bandit.'],
      ['Keyword discovery', 'The questions customers actually ask, grouped by intent.'],
      ['Social posting', 'Facebook, Instagram, X and Threads from one place.'],
      ['Languages', '13 supported.'],
    ],
    liveLabel: 'Citora is live',
    liveLink: 'citora.ai',
  },
  ads: {
    label: 'Ads in ChatGPT',
    kicker: 'Place ads in ChatGPT',
    title: 'Ads in ChatGPT, planned with GEO data.',
    intro: 'OpenAI shows ads to ChatGPT Free and ChatGPT Go users. Through Citora, brands can place ads in ChatGPT. Citora analyzes the brand, its audience and how AI already describes it, builds the ad strategy, places the ads and feeds the results back into the GEO loop.',
    tiersLabel: 'Ad inventory',
    tiers: [
      { n: 'ChatGPT Free', d: 'Free plan. Ads shown.' },
      { n: 'ChatGPT Go', d: 'Low-cost paid plan. Ads shown.' },
    ],
    flowLabel: 'How Citora runs it',
    flow: [
      { n: 'Analyze', d: 'The brand, its audience, and how each AI engine describes it today.' },
      { n: 'Strategy', d: 'Which prompts and topics to appear against, the positioning and the creative angle.' },
      { n: 'Place', d: 'Citora places the ads in ChatGPT.' },
      { n: 'Measure', d: 'Results return to the GEO loop and shape the next round.' },
    ],
    card: {
      tag: 'Example',
      title: 'Ad strategy',
      rows: [
        ['Category', 'Analytics software for online stores'],
        ['Audience', 'Store owners, 1 to 20 staff'],
        ['Inventory', 'ChatGPT Free, ChatGPT Go'],
        ['AI context', 'Cited by 3 of 4 engines, not by Gemini'],
        ['Topics', 'small store analytics; tracking repeat customers'],
        ['Positioning', 'Set up in an afternoon, no analyst needed'],
        ['Creative angle', 'Answer the question first, then show the dashboard'],
        ['Measure', 'Clicks, conversions, change in citation rate'],
      ],
      paidLabel: 'Paid in',
    },
    paid: 'Ad budgets on Citora will be paid in $CIT.',
  },
  token: {
    label: '$CIT',
    title: 'One token for everything on Citora.',
    intro: 'Every spend on Citora will be paid in $CIT. Plans, credits, experiments and ChatGPT ad budgets run on one unit, so using the product and using the token are the same activity.',
    utilLabel: 'Paid in $CIT',
    utils: [
      ['GEO plans', 'Monitoring, AI Profile and the full loop.'],
      ['Search and analysis credits', 'Queries across 4 engines, brand analysis.'],
      ['A/B experiments', 'Variant tests with statistical significance.'],
      ['ChatGPT ad budgets', 'Ad spend placed through Citora.'],
    ],
    flowLabel: 'How value moves',
    flow: [
      'Brands acquire $CIT',
      'They spend it on Citora',
      'Visibility in AI answers and ChatGPT ads',
      'Results bring more brands',
    ],
    flowBack: 'Back to 01',
    statusLabel: 'Status',
    status: [
      ['Ticker', '$CIT'],
      ['Status', 'Pre-launch'],
      ['Network', 'To be announced'],
      ['Details', 'Investor materials on request'],
    ],
    note: '$CIT is not live. There is no price, sale or trading today.',
  },
  roadmap: {
    label: 'Roadmap',
    title: 'From GEO platform to token economy.',
    phase: 'Phase',
    phases: [
      { s: 'Live', t: 'Citora live', d: 'GEO platform running across ChatGPT, Claude, Gemini and Perplexity.' },
      { s: 'Building', t: 'Ads in ChatGPT through Citora', d: 'Ad strategy, placement and measurement inside the same loop.' },
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
        a: 'Wazcher is the company that builds Citora. We work on how brands are found, cited and advertised inside AI assistants.',
      },
      {
        q: 'What is Citora?',
        a: 'Citora is a closed-loop GEO platform, live at citora.ai. It tests how ChatGPT, Claude, Gemini and Perplexity answer questions about a brand, finds the gaps, rewrites the content the engines read, runs A/B experiments and deploys the winner, then repeats. It supports 13 languages.',
      },
      {
        q: 'What is GEO, and how is it different from SEO?',
        a: 'GEO, Generative Engine Optimization, is the work of getting a brand cited inside AI generated answers. SEO competes for a ranked list of links. The two reward different things:',
        table: true,
      },
      {
        q: 'How do ads in ChatGPT work with Citora?',
        a: 'OpenAI shows ads to ChatGPT Free and Go users. Citora analyzes the brand, its audience and how AI already describes it, then proposes the strategy: the prompts and topics to appear against, the positioning and the creative angle. It places the ads and feeds the results back into the GEO loop, so earned and paid visibility are managed together.',
      },
      {
        q: 'Is $CIT live?',
        a: 'No. $CIT is pre-launch. There is no price, sale or trading today. Network and launch details will be announced later.',
      },
      {
        q: 'What will $CIT be used for?',
        a: 'Every spend on Citora: GEO plans, search and analysis credits, A/B experiments and ChatGPT ad budgets.',
      },
      {
        q: 'How do I get in touch or invest?',
        a: 'Email service@wazcher.com. Investor materials are shared on request.',
      },
    ],
    geo: {
      cols: ['', 'SEO', 'GEO'],
      rows: [
        ['Target', 'Google, Bing', 'ChatGPT, Claude, Gemini, Perplexity'],
        ['Goal', 'Rank in search results', 'Get cited in AI answers'],
        ['Key signal', 'Backlinks, keywords', 'Structured, factual content'],
        ['Measured by', 'Position, click-through rate', 'Citation rate, position in answer, sentiment'],
      ],
    },
  },
  close: {
    title: 'Citora is live. $CIT is next.',
    sub: 'For investor materials or a product walkthrough, write to us.',
  },
  footer: {
    desc: 'Wazcher builds Citora, the closed-loop GEO platform for visibility in AI answers and ads in ChatGPT.',
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
    sub: 'Wazcher 打造 Citora：一套閉環式 GEO 平台，讓品牌被 ChatGPT、Claude、Gemini 與 Perplexity 引用，並直接在 ChatGPT 裡投放廣告。Citora 上的每一筆操作，未來都將以 $CIT 結算。',
    cta1: '前往 Citora',
    cta2: '了解 $CIT',
    works: '支援引擎',
    metricsLabel: 'Citora 概況',
    metrics: [
      { v: '4', l: '個 AI 引擎' },
      { v: '6 步', l: '閉環流程' },
      { v: '13', l: '種語言' },
      { v: '24/7', l: '全天候監測' },
      { v: '+339%', l: '平均引用提升', n: 'Citora 客戶平均數據' },
    ],
  },
  test: {
    tag: '範例',
    title: 'AI 搜尋測試',
    queryLabel: '查詢',
    query: '「小型網店最好用的數據分析工具」',
    brandLabel: '品牌',
    brand: 'Northlight Analytics',
    cols: ['引擎', '引用', '排名', '情感'],
    yes: '是',
    no: '否',
    positive: '正面',
    neutral: '中性',
    rateLabel: '引用率',
    rate: '4 個引擎中 3 個',
    na: '未出現',
  },
  shift: {
    label: '轉變',
    title: '被發現的地方，\n已經移到答案裡。',
    items: [
      {
        t: '搜尋從連結變成了答案。',
        d: '人們直接問 ChatGPT、Claude、Gemini 或 Perplexity，然後依照一個答案做決定，常常連搜尋結果頁都沒打開。',
      },
      {
        t: '誰被推薦，由 AI 決定。',
        d: 'AI 引擎推薦的是它能解析、能查證、能信任的內容。Google 排名再好，也不會自動延續到 AI 答案裡。',
      },
      {
        t: '被引用，就是新的被看見。',
        d: '答案旁邊現在也有付費版位：ChatGPT 已向 Free 與 Go 用戶顯示廣告。品牌既要贏得引用，也要買到版位。',
      },
    ],
  },
  citora: {
    label: 'Citora',
    title: '讓品牌在 AI 答案中\n被看見的閉環。',
    intro: 'Citora 是首個閉環式 GEO（生成式引擎優化）平台。多數工具給你一個分數就結束了；Citora 會衡量每個引擎如何看待品牌，改寫引擎讀取的內容，測試改動，上線勝出版本，然後重新開始。',
    loopLabel: '優化閉環',
    steps: [
      {
        n: '監測',
        d: '依排程每日或每週在 ChatGPT、Claude、Gemini 與 Perplexity 上執行查詢。',
        k: ['引用率', '排名位置', '情感傾向', '下滑超過 10% 即警示'],
      },
      {
        n: '分析',
        d: '哪些引擎引用了品牌、哪些查詢會觸發引用，以及競爭對手在哪裡取代了你。',
        k: ['品牌分析', '競品對照', '關鍵字探索'],
      },
      {
        n: '優化',
        d: '從品牌官網自動產生結構化的 AI Profile，編修後同步到 /llms.txt。',
        k: ['AI Profile', '/llms.txt', '版本紀錄'],
      },
      {
        n: '實驗',
        d: '兩個內容版本在各引擎上同場比較，由統計結果決定勝負，而不是主觀判斷。',
        k: ['卡方檢定', 'Cohen’s h', 'UCB 演算法'],
      },
      {
        n: '部署',
        d: '勝出版本一步上線，優化後的貼文也能同步發布到社群。',
        k: ['一步部署', 'Facebook', 'Instagram', 'X', 'Threads'],
      },
      {
        n: '循環',
        d: '以新的基準重新開始監測，整個閉環全天候運作。',
        k: ['24/7', '13 種語言'],
      },
    ],
    exp: {
      tag: '範例',
      title: 'A/B 實驗',
      variant: '版本',
      rate: '引用率',
      a: '目前的 AI Profile',
      b: '改寫後的 FAQ 區塊',
      rows: [
        ['抽樣查詢', '480 次，橫跨 4 個引擎'],
        ['卡方檢定', 'p < 0.001'],
        ['Cohen’s h', '0.32'],
        ['流量分配', 'UCB 演算法'],
      ],
      result: '結果',
      resultV: '部署 B，+16 個百分點',
    },
    modulesLabel: '功能模組',
    modules: [
      ['AI Profile 編輯器', 'AI 引擎能解析的結構化內容，同步至 /llms.txt。'],
      ['AI 搜尋測試', '一次查詢，同時跑 4 個引擎：引用率、排名、情感。'],
      ['品牌分析', '每個引擎如何描述品牌，以及哪裡還不夠。'],
      ['品牌監測', '排程追蹤，能見度下滑超過 10% 即發出警示。'],
      ['A/B 實驗', '卡方檢定、Cohen’s h 效果量、UCB 演算法。'],
      ['關鍵字探索', '客戶真正會問的問題，依意圖分類。'],
      ['社群發布', 'Facebook、Instagram、X 與 Threads，一處完成。'],
      ['支援語言', '13 種。'],
    ],
    liveLabel: 'Citora 已正式上線',
    liveLink: 'citora.ai',
  },
  ads: {
    label: 'ChatGPT 廣告',
    kicker: '在 ChatGPT 投放廣告',
    title: '用 GEO 數據\n規劃 ChatGPT 廣告。',
    intro: 'OpenAI 已開始向 ChatGPT Free 與 ChatGPT Go 用戶顯示廣告。品牌可以透過 Citora 在 ChatGPT 投放廣告：Citora 先分析品牌、受眾，以及 AI 目前如何描述這個品牌，擬定廣告策略並完成投放，再把成效回饋到 GEO 閉環。',
    tiersLabel: '廣告版位',
    tiers: [
      { n: 'ChatGPT Free', d: '免費方案，會顯示廣告。' },
      { n: 'ChatGPT Go', d: '平價付費方案，會顯示廣告。' },
    ],
    flowLabel: 'Citora 的執行方式',
    flow: [
      { n: '分析', d: '品牌、受眾，以及各個 AI 引擎目前如何描述它。' },
      { n: '策略', d: '該出現在哪些提問與主題旁、如何定位、用什麼創意切角。' },
      { n: '投放', d: '由 Citora 在 ChatGPT 中投放廣告。' },
      { n: '衡量', d: '成效回到 GEO 閉環，決定下一輪的調整。' },
    ],
    card: {
      tag: '範例',
      title: '廣告策略',
      rows: [
        ['類別', '網路商店數據分析軟體'],
        ['受眾', '店主，員工 1 到 20 人'],
        ['版位', 'ChatGPT Free、ChatGPT Go'],
        ['AI 現況', '4 個引擎中有 3 個引用，Gemini 未引用'],
        ['主題', '小型網店數據分析；追蹤回購客'],
        ['定位', '一個下午就能設定完成，不需要分析師'],
        ['創意切角', '先回答問題，再展示儀表板'],
        ['衡量指標', '點擊、轉換、引用率變化'],
      ],
      paidLabel: '支付方式',
    },
    paid: 'Citora 上的廣告預算，未來將以 $CIT 支付。',
  },
  token: {
    label: '$CIT',
    title: 'Citora 上的一切，\n用同一個代幣。',
    intro: 'Citora 上的每一筆支出，未來都將以 $CIT 支付。方案、點數、實驗與 ChatGPT 廣告預算都使用同一個單位，使用產品與使用代幣是同一件事。',
    utilLabel: '以 $CIT 支付',
    utils: [
      ['GEO 方案', '監測、AI Profile 與完整閉環。'],
      ['搜尋與分析點數', '橫跨 4 個引擎的查詢與品牌分析。'],
      ['A/B 實驗', '具統計顯著性的版本測試。'],
      ['ChatGPT 廣告預算', '透過 Citora 投放的廣告支出。'],
    ],
    flowLabel: '價值如何流動',
    flow: [
      '品牌取得 $CIT',
      '在 Citora 上使用',
      '在 AI 答案與 ChatGPT 廣告中被看見',
      '成果帶來更多品牌',
    ],
    flowBack: '回到 01',
    statusLabel: '狀態',
    status: [
      ['代號', '$CIT'],
      ['狀態', '尚未發行'],
      ['網路', '將另行公布'],
      ['詳細資訊', '投資人資料可依需求提供'],
    ],
    note: '$CIT 尚未上線，目前沒有價格、銷售或交易。',
  },
  roadmap: {
    label: '發展藍圖',
    title: '從 GEO 平台\n走向代幣經濟。',
    phase: '階段',
    phases: [
      { s: '已上線', t: 'Citora 上線', d: 'GEO 平台已在 ChatGPT、Claude、Gemini 與 Perplexity 上運作。' },
      { s: '建置中', t: '透過 Citora 投放 ChatGPT 廣告', d: '廣告策略、投放與成效衡量，都在同一個閉環內完成。' },
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
        a: 'Wazcher 是打造 Citora 的公司，專注於品牌如何在 AI 助理中被找到、被引用，以及如何在其中投放廣告。',
      },
      {
        q: 'Citora 是什麼？',
        a: 'Citora 是閉環式 GEO 平台，已在 citora.ai 上線。它測試 ChatGPT、Claude、Gemini 與 Perplexity 如何回答與品牌相關的問題，找出缺口，改寫引擎讀取的內容，執行 A/B 實驗並部署勝出版本，然後持續循環。支援 13 種語言。',
      },
      {
        q: '什麼是 GEO？和 SEO 有什麼不同？',
        a: 'GEO（生成式引擎優化）是讓品牌在 AI 生成的答案中被引用的工作。SEO 爭取的是連結列表中的排名。兩者看重的東西不同：',
        table: true,
      },
      {
        q: 'Citora 如何處理 ChatGPT 廣告？',
        a: 'OpenAI 會向 ChatGPT Free 與 Go 用戶顯示廣告。Citora 先分析品牌、受眾，以及 AI 目前如何描述這個品牌，再提出策略：要出現在哪些提問與主題旁、如何定位、用什麼創意切角。接著完成投放，並把成效回饋到 GEO 閉環，讓自然曝光與付費曝光一起管理。',
      },
      {
        q: '$CIT 已經上線了嗎？',
        a: '還沒有。$CIT 目前尚未發行，沒有價格、銷售或交易。網路與發行細節將於日後公布。',
      },
      {
        q: '$CIT 未來的用途是什麼？',
        a: '支付 Citora 上的所有支出：GEO 方案、搜尋與分析點數、A/B 實驗，以及 ChatGPT 廣告預算。',
      },
      {
        q: '如何聯絡或洽談投資？',
        a: '請來信 service@wazcher.com，投資人資料可依需求提供。',
      },
    ],
    geo: {
      cols: ['', 'SEO', 'GEO'],
      rows: [
        ['目標', 'Google、Bing', 'ChatGPT、Claude、Gemini、Perplexity'],
        ['目的', '在搜尋結果中排名', '在 AI 答案中被引用'],
        ['關鍵訊號', '外部連結、關鍵字', '結構化、正確的內容'],
        ['衡量方式', '排名位置、點擊率', '引用率、答案中的位置、情感傾向'],
      ],
    },
  },
  close: {
    title: 'Citora 已上線，\n下一步是 $CIT。',
    sub: '索取投資人資料或預約產品導覽，歡迎來信。',
  },
  footer: {
    desc: 'Wazcher 打造 Citora：讓品牌在 AI 答案中被看見、並能在 ChatGPT 投放廣告的閉環式 GEO 平台。',
    product: '產品',
    company: '公司',
    social: '社群',
    contact: '聯絡我們',
    legal: '$CIT 目前尚未推出。本網站任何內容均不構成出售任何代幣或證券的要約，亦不構成購買之邀約。ChatGPT 與 OpenAI 為 OpenAI 之商標。Claude、Gemini 與 Perplexity 為其各自所有者之商標。',
    copy: '© 2026 Wazcher',
  },
};


export const DICT: Record<Locale, Dict> = {
  en,
  'zh-TW': zhTW,
  'zh-CN': zhTW, // Simplified dictionary added separately
};
