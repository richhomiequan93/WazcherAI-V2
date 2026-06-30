'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const T: Record<string, Record<string, string>> = {
  en: {
    nav_product:'Product', nav_features:'Features', nav_pricing:'Pricing',
    nav_why:'Why Us', nav_faq:'FAQ', nav_contact:'Contact', nav_cta:'Get Started',
    hero_badge:'AI Marketing · Get Cited Now',
    hero_line1:'WE BRING',
    hero_line2:'AI VISIBILITY',
    hero_line3:'TO BRANDS',
    hero_sub:'Wazcher is an authorized Citora partner. Get your brand cited by the AI engines your customers already trust.',
    hero_cta1:'Get Started', hero_cta2:'See How It Works',
    ai_covers:'Covers:',
    vision_tag:'Your AI Future',
    vision_title:'Your Future in AI Is Here.',
    stat1:'4', stat1_lbl:'AI Engines Monitored',
    stat2:'6-Step', stat2_lbl:'Closed-Loop Optimization',
    stat3:'24/7', stat3_lbl:'Real-time Monitoring',
    stat4:'13', stat4_lbl:'Languages Supported',
    prob_tag:'The Problem',
    prob_reveal:"Search has changed. Users go straight to AI and ask. AI picks who gets recommended and who gets ignored. If AI doesn't know you, your ranking won't save you. Every day you wait, a competitor earns the citation you're missing.",
    tbl_tag:'GEO vs SEO',
    tbl_title:'Two Disciplines. Different Rules.',
    tbl_sub:'Traditional SEO and Generative Engine Optimization serve different algorithms with entirely different logic.',
    tbl_col0:'Aspect', tbl_col1:'Traditional SEO', tbl_col2:'GEO (Citora)',
    tbl_r1a:'Target', tbl_r1b:'Google, Bing', tbl_r1c:'ChatGPT, Claude, Gemini, Perplexity',
    tbl_r2a:'Goal', tbl_r2b:'Rank in search results', tbl_r2c:'Get cited in AI-generated answers',
    tbl_r3a:'Key Signal', tbl_r3b:'Backlinks, keywords', tbl_r3c:'Structured content, factual accuracy',
    tbl_r4a:'Measurement', tbl_r4b:'Ranking position, CTR', tbl_r4c:'Citation rate, mention frequency',
    tbl_r5a:'Optimization', tbl_r5b:'Link building, on-page SEO', tbl_r5c:'AI Profile content, factual density',
    feat_tag:'Features',
    feat_title:'Six Modules. One Platform.',
    feat_sub:'Every tool you need to measure, improve, and sustain your brand\'s visibility in AI search.',
    f1_title:'AI Profile Editor', f1_badge:'All Plans',
    f1_body:'Structured Markdown editor with live preview. Auto-generate from your website. Version history with diff comparison. Sync to your /llms.txt.',
    f2_title:'Brand Monitoring', f2_badge:'All Plans',
    f2_body:'Daily or weekly GEO score tracking. Alerts fire when your score drops more than 10%. Competitor dashboard included.',
    f3_title:'AI Search Testing', f3_badge:'All Plans',
    f3_body:'Run queries live across all 4 AI engines simultaneously. Full response text with citation highlights and sentiment scoring.',
    f4_title:'A/B Experiments', f4_badge:'Business+',
    f4_body:'Put two content versions head to head across AI search. Wazcher tracks which gets cited more and tells you which one wins.',
    f5_title:'Keyword Discovery', f5_badge:'Business+',
    f5_body:'AI generates the queries your customers are actually asking. Categorized by brand, category, comparison, and problem-solution types.',
    f6_title:'Social Posting', f6_badge:'Business+',
    f6_body:'Publish AI-optimized content to Facebook, Instagram, X and Threads from the same platform with media support.',
    hiw_tag:'Closed-Loop Optimization',
    hiw_title:'The Cycle That Never Stops Working.',
    hiw_sub:'Most tools show you the problem. Wazcher fixes it - then keeps fixing it, automatically.',
    s1:'01 · Monitor', s1_title:'Scan Every AI Engine, Every Day', s1_body:'Automated queries fire daily across ChatGPT, Claude, Gemini, and Perplexity. Citation rate, ranking position, and sentiment feed directly into the loop.',
    s2:'02 · Analyze', s2_title:'Surface Every Gap', s2_body:'See exactly which engines cite your brand, which queries trigger it, and where competitors are showing up instead of you.',
    s3:'03 · Optimize', s3_title:'Build Content That Gets Cited', s3_body:'Generate a structured AI Profile from your website in one click. Edit it to match exactly what AI engines parse, reference, and recommend.',
    s4:'04 · Experiment', s4_title:'Test Before You Commit', s4_body:'Put two content versions head to head across AI search engines. Wazcher runs the stats, tracks which version gets cited more, and surfaces a clear winner. No guesswork.',
    s5:'05 · Deploy', s5_title:'Ship It. Watch It Compound.', s5_body:'One click sets the winner live. Wazcher restarts the monitoring cycle automatically - each loop smarter than the last, compounding your AI visibility over time.',
    plat_tag:'The Platform',
    plat_title:'See Exactly What AI Sees.',
    plat_sub:'Four tools. One mission: make every AI engine cite your brand.',
    ptab0:'AI Search Testing', ptab1:'A/B Experiments', ptab2:'Live Dashboard', ptab3:'Brand Monitoring',
    pt0_h:'Test your brand across all AI engines simultaneously',
    pt0_p:'Run any query and see exactly how ChatGPT, Claude, Gemini, and Perplexity respond - including whether your brand is cited, how prominently, and with what sentiment.',
    pt0_l1:'Live query across all 4 AI engines at once',
    pt0_l2:'Citation rate per engine with full response text',
    pt0_l3:'Sentiment scoring and citation highlighting',
    pt0_l4:'Top queries your brand appears in',
    pt1_h:'Run controlled experiments with statistical confidence',
    pt1_p:'Put two versions of your AI Profile head to head. Wazcher tracks which gets cited more across every engine and surfaces a clear winner.',
    pt1_l1:'A/B split testing on AI search responses',
    pt1_l2:'Statistically validated winner - no guesswork',
    pt1_l3:'Per-engine performance breakdown',
    pt1_l4:'UCB bandit auto-selects the winner',
    pt2_h:'Monitor your GEO score with live analytics',
    pt2_p:'Track your brand\'s visibility across all AI engines in one dashboard. See trends, get alerted on drops, and measure the impact of every change.',
    pt2_l1:'Overall GEO score updated daily',
    pt2_l2:'30-day trend chart with target markers',
    pt2_l3:'Citation rate and engine coverage metrics',
    pt2_l4:'Alerts when score drops more than 10%',
    pt3_h:'Track how AI engines mention your brand over time',
    pt3_p:'Set up continuous monitoring and get alerted whenever your citation rate changes. Spot anomalies before they become problems.',
    pt3_l1:'Daily and weekly monitoring runs',
    pt3_l2:'Per-engine mention rate with trend arrows',
    pt3_l3:'12-week GEO trend chart',
    pt3_l4:'Anomaly detection with instant alerts',
    price_tag:'Plans',
    price_title:'Find the Plan That Fits.',
    price_sub:'Not sure which plan fits your brand? Talk to us - we\'ll help you find the right one.',
    pl1_tier:'Trial', pl1_for:'For brands exploring GEO for the first time',
    pl1_f1:'1 client website', pl1_f2:'50 searches / month', pl1_f3:'2 standard AI channels', pl1_f4:'1 web monitor',
    pl1_note:'Application required',
    pl2_tier:'Business', pl2_for:'For marketing teams ready to scale', pl2_popular:'Most Chosen',
    pl2_f1:'10 client websites', pl2_f2:'10,000 searches + 3,500 AI analyses / month',
    pl2_f3:'Standard + Advanced channels (4 total)', pl2_f4:'20 web monitors + 15 AI monitors',
    pl2_f5:'30 brand tracking, 100 social posts / month', pl2_f6:'Scheduled indexing + A/B experiments',
    pl2_a1:'API access', pl2_a2:'Priority support',
    pl3_tier:'Enterprise', pl3_for:'For large teams needing full control',
    pl3_f1:'30 client websites', pl3_f2:'30,000 searches + 10,000 AI analyses / month',
    pl3_f3:'Standard + Advanced channels (4 total)', pl3_f4:'50 web monitors + 50 AI monitors',
    pl3_f5:'100 brand tracking, 500 social posts / month', pl3_f6:'Scheduled indexing + A/B experiments',
    pl3_a1:'API access', pl3_a2:'Priority support', pl3_a3:'SDK access', pl3_a4:'White label',
    pl_addon:'Optional add-ons - pricing upon request',
    pl_cta:'Talk to Us',
    why_tag:'Why Wazcher',
    why_title:'Citora\'s Platform. Expert Guidance.',
    why_body:'Wazcher is not just a reseller. We are your dedicated GEO growth partner - a certified team that learns your brand, handles setup, and helps you get results faster.',
    w1_title:'Official Authorized Partner', w1_body:'Direct access to Citora\'s full platform with priority onboarding support from a certified team.',
    w2_title:'Dedicated Account Manager', w2_body:'One person who knows your brand, your goals, and your industry. Always.',
    w3_title:'Live in 72 Hours', w3_body:'Your first AI Profile is set up and indexed within 72 hours of signing up.',
    w4_title:'Ongoing GEO Strategy', w4_body:'Regular check-ins and strategy reviews to keep your GEO score improving as AI engines evolve.',
    faq_tag:'FAQ', faq_title:'Common Questions.',
    faq1_q:'What is GEO and why does it matter?',
    faq1_a:'Generative Engine Optimization (GEO) is the practice of optimizing brand visibility in AI-powered search engines like ChatGPT, Claude, Gemini, and Perplexity. As more users go straight to AI for recommendations, brands invisible there lose discovery opportunities regardless of their Google rank.',
    faq2_q:'How is Citora different from other GEO tools?',
    faq2_a:'Most GEO tools only monitor: they show a score and leave optimization to guesswork. Wazcher closes the full loop - analysis, AI Profile editor, A/B testing across AI engines, and one-click deployment, all in one continuous cycle.',
    faq3_q:'Why work with Wazcher instead of signing up directly?',
    faq3_a:'Wazcher is an authorized Citora partner. You get a dedicated account manager, guided onboarding, and expert GEO support - faster and more effective than self-serve.',
    faq4_q:'How do I know which plan is right for me?',
    faq4_a:'Every brand has different needs. Reach out to Wazcher and we\'ll walk you through the options with no pressure - just a straightforward conversation about your goals.',
    faq5_q:'Which AI engines does Citora support?',
    faq5_a:'Citora supports ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), and Perplexity. Business and Enterprise plans include all four engines. The Trial plan covers two standard channels.',
    faq6_q:'How do I get started?',
    faq6_a:'Fill out the contact form and Wazcher will reach out within 24 hours to set up your account, walk you through the platform, and get your first AI Profile live within 72 hours.',
    ct_tag:'Contact Us',
    ct_title:'Ready to Get Cited by AI?',
    ct_body:'Tell us about your brand and we will recommend the right Citora plan, handle setup, and get your first AI Profile live within 72 hours.',
    ct_email:'service@wazcher.com', ct_partner:'Authorized Citora Partner', ct_response:'Response within 24 hours',
    f_name:'Name *', f_company:'Company', f_email:'Email *', f_plan:'Plan of Interest',
    f_plan_ph:'Select a plan', f_msg:'Message',
    f_opt1:'Just exploring', f_opt2:'Trial Plan', f_opt3:'Business Plan', f_opt4:'Enterprise Plan', f_opt5:'Not sure yet',
    f_submit:'Send Message', f_note:'We respond within 24 hours',
    f_success:'Message sent - we\'ll be in touch shortly.',
    ft_desc:'Wazcher is an authorized Citora partner, helping brands earn citations in AI-generated answers.',
    ft_product:'Product', ft_plans:'Plans', ft_company:'Company',
    ft_f1:'AI Profile Editor', ft_f2:'Brand Monitoring', ft_f3:'A/B Experiments', ft_f4:'Keyword Discovery', ft_f5:'Social Posting',
    ft_free:'Contact Us', ft_about:'About Wazcher', ft_contact:'Contact',
    ft_citora:'Citora Official Site ↗', ft_manual:'Citora Manual ↗',
    ft_copy:'© 2026 Wazcher - Authorized Citora Partner',
  },
  zh: {
    nav_product:'產品介紹', nav_features:'功能特色', nav_pricing:'方案選擇',
    nav_why:'為什麼選我們', nav_faq:'常見問題', nav_contact:'聯絡我們', nav_cta:'立即開始',
    hero_badge:'AI 行銷 · 立刻讓品牌被引用',
    hero_line1:'讓你的品牌',
    hero_line2:'在 AI 時代',
    hero_line3:'被看見。',
    hero_sub:'Wazcher 是 Citora 的授權代理商。讓你的品牌出現在客戶已在使用的 AI 引擎推薦清單裡。',
    hero_cta1:'立即開始', hero_cta2:'了解更多',
    ai_covers:'支援引擎：',
    vision_tag:'你的 AI 未來',
    vision_title:'你的 AI 未來 就在此刻。',
    stat1:'4', stat1_lbl:'個 AI 引擎覆蓋',
    stat2:'6 步', stat2_lbl:'閉環優化流程',
    stat3:'24/7', stat3_lbl:'全天候 AI 監測',
    stat4:'13', stat4_lbl:'種語言支援',
    prob_tag:'問題核心',
    prob_reveal:'用戶已不再滑動搜尋結果。他們直接向 AI 提問--輸入一句話，AI 給出答案。AI 決定推薦誰、忽略誰。你的 Google 排名在 AI 面前毫無意義。每一天你沒有行動，競爭對手就多拿走一次本該屬於你的引用。',
    tbl_tag:'GEO vs SEO',
    tbl_title:'兩種策略。 不同規則。',
    tbl_sub:'傳統 SEO 和生成式引擎優化服務於完全不同邏輯的演算法。',
    tbl_col0:'比較面向', tbl_col1:'傳統 SEO', tbl_col2:'GEO（Citora）',
    tbl_r1a:'目標引擎', tbl_r1b:'Google、Bing', tbl_r1c:'ChatGPT、Claude、Gemini、Perplexity',
    tbl_r2a:'核心目標', tbl_r2b:'在搜尋結果頁取得高排名', tbl_r2c:'讓品牌出現在 AI 生成的答案裡',
    tbl_r3a:'關鍵信號', tbl_r3b:'外部連結、關鍵字', tbl_r3c:'內容結構化程度、事實正確性',
    tbl_r4a:'成效衡量', tbl_r4b:'排名位置、點擊率', tbl_r4c:'被引用頻率、提及次數',
    tbl_r5a:'優化方法', tbl_r5b:'連結建設、站內 SEO', tbl_r5c:'AI Profile 內容、事實密度',
    feat_tag:'功能特色',
    feat_title:'六大模組。一個平台。',
    feat_sub:'從監測、分析到優化與實驗，你在 AI 搜尋中提升品牌能見度所需的一切工具。',
    f1_title:'AI Profile 編輯器', f1_badge:'所有方案',
    f1_body:'結構化 Markdown 編輯器，附即時預覽。一鍵從網站自動生成初稿，版本記錄與差異比對，同步發布至 /llms.txt。',
    f2_title:'品牌監測', f2_badge:'所有方案',
    f2_body:'每日或每週自動追蹤各 AI 引擎的 GEO 分數，分數下滑超過 10% 立即發出警報，附競爭對手儀表板。',
    f3_title:'AI 搜尋測試', f3_badge:'所有方案',
    f3_body:'同時向 ChatGPT、Claude、Gemini 和 Perplexity 發出真實查詢，完整顯示回應內容，標示引用位置與情感評分。',
    f4_title:'A/B 實驗', f4_badge:'商業版以上',
    f4_body:'讓兩個內容版本在 AI 搜尋引擎上直接對決，Wazcher 自動追蹤引用數據，幫你找出明確的勝者。',
    f5_title:'關鍵字探索', f5_badge:'商業版以上',
    f5_body:'由 AI 自動產生目標客群真正會問的搜尋問題，依品牌、類別、比較、痛點等類型分類整理。',
    f6_title:'社群貼文', f6_badge:'商業版以上',
    f6_body:'直接在平台內將 AI 優化內容排程發布至 Facebook、Instagram、X 和 Threads，支援圖文媒體附件。',
    hiw_tag:'閉環式優化',
    hiw_title:'永不停歇的優化循環。',
    hiw_sub:'大多數工具只告訴你問題在哪。Wazcher 替你解決問題--然後持續自動修正。',
    s1:'01 · 監測', s1_title:'每天掃描所有 AI 引擎', s1_body:'系統每日自動向 ChatGPT、Claude、Gemini 與 Perplexity 發出查詢，將引用率、排名位置與情感傾向直接回饋至優化迴圈。',
    s2:'02 · 分析', s2_title:'精準找出每一個缺口', s2_body:'清楚看到哪些引擎引用了你、哪些關鍵字能觸發引用，以及競爭對手在哪些地方取代了你的位置。',
    s3:'03 · 優化', s3_title:'打造能被 AI 引用的內容', s3_body:'一鍵從你的網站自動生成結構化 AI Profile，再進行精修，確保內容符合 AI 引擎的解析、引用與推薦邏輯。',
    s4:'04 · 實驗', s4_title:'測試，再決定', s4_body:'讓兩個版本的內容在 AI 搜尋引擎上對決。Wazcher 追蹤哪個版本被引用得更多，幫你找出明確的勝者，不靠猜測。',
    s5:'05 · 部署', s5_title:'上線即開始複利累積。', s5_body:'一鍵將勝出版本上線。Wazcher 自動重啟監測週期--每一輪迴圈都比上一輪更精準，讓你的 AI 能見度隨時間持續複利成長。',
    plat_tag:'平台介紹',
    plat_title:'看清楚 AI 眼中的你。',
    plat_sub:'四大工具，一個核心目標：讓每個 AI 引擎都主動推薦你的品牌。',
    ptab0:'AI 搜尋測試', ptab1:'A/B 實驗', ptab2:'即時儀表板', ptab3:'品牌監測',
    pt0_h:'同時測試你的品牌在所有 AI 引擎中的表現',
    pt0_p:'輸入任何查詢，即時查看 ChatGPT、Claude、Gemini 和 Perplexity 如何回應，包括你的品牌有沒有被引用、被引用的位置有多顯眼、情感傾向是正是負。',
    pt0_l1:'同時向全部 4 個 AI 引擎發出真實查詢', pt0_l2:'各引擎引用率與完整回應內容',
    pt0_l3:'情感評分與引用位置標示', pt0_l4:'品牌最常出現的熱門查詢',
    pt1_h:'用統計數據做出有把握的決策',
    pt1_p:'同時測試兩個版本的 AI Profile，Wazcher 自動追蹤各引擎的引用數據，找出明確的勝者，不靠猜測。',
    pt1_l1:'AI 搜尋回應的 A/B 分割測試', pt1_l2:'統計顯著性檢定（卡方、p 值）',
    pt1_l3:'各引擎分項成效比較', pt1_l4:'UCB 演算法自動選出勝出版本',
    pt2_h:'用即時數據掌握品牌 GEO 分數動態',
    pt2_p:'在單一儀表板追蹤品牌在所有 AI 引擎的能見度，一眼看出趨勢變化，分數下滑立即收到警報。',
    pt2_l1:'每日自動更新整體 GEO 分數', pt2_l2:'30 天趨勢圖附目標標記線',
    pt2_l3:'引用率與引擎覆蓋度指標', pt2_l4:'分數下滑超過 10% 立即警報',
    pt3_h:'持續追蹤 AI 引擎提及你品牌的頻率與方式',
    pt3_p:'開啟自動監測，一旦引用率出現明顯變動就立即通知你。隨時掌握各引擎趨勢，及早發現異常。',
    pt3_l1:'每日、每週自動監測運行', pt3_l2:'各引擎提及率與趨勢箭頭',
    pt3_l3:'12 週 GEO 趨勢走勢圖', pt3_l4:'異常偵測與即時警報通知',
    price_tag:'方案介紹',
    price_title:'找到最適合你的方案。',
    price_sub:'不確定哪個方案最適合你的品牌？聯絡我們，我們幫你找出最合適的選擇。',
    pl1_tier:'試用版', pl1_for:'適合初次探索 GEO 的品牌',
    pl1_f1:'1 個客戶網站', pl1_f2:'50 次搜尋 / 月', pl1_f3:'2 個標準 AI 頻道', pl1_f4:'1 個 Web 監控',
    pl1_note:'需申請開通',
    pl2_tier:'商業版', pl2_for:'適合準備擴展的行銷團隊', pl2_popular:'最多人選擇',
    pl2_f1:'10 個客戶網站', pl2_f2:'10,000 次搜尋 + 3,500 次 AI 分析 / 月',
    pl2_f3:'標準 + 進階頻道（共 4 個）', pl2_f4:'20 個 Web 監控 + 15 個 AI 排程監控',
    pl2_f5:'30 個追蹤品牌，100 篇社群貼文 / 月', pl2_f6:'排程收錄 + A/B 實驗',
    pl2_a1:'API 存取', pl2_a2:'優先客服支援',
    pl3_tier:'企業版', pl3_for:'適合需要完整掌控的大型企業',
    pl3_f1:'30 個客戶網站', pl3_f2:'30,000 次搜尋 + 10,000 次 AI 分析 / 月',
    pl3_f3:'標準 + 進階頻道（共 4 個）', pl3_f4:'50 個 Web 監控 + 50 個 AI 排程監控',
    pl3_f5:'100 個追蹤品牌，500 篇社群貼文 / 月', pl3_f6:'排程收錄 + A/B 實驗',
    pl3_a1:'API 存取', pl3_a2:'優先客服支援', pl3_a3:'SDK 存取', pl3_a4:'白標方案',
    pl_addon:'可選加購功能 - 開通價格另議',
    pl_cta:'與我們聯絡',
    why_tag:'為什麼選擇 Wazcher',
    why_title:'Citora 平台。專業夥伴陪跑。',
    why_body:'Wazcher 不只是代理商，而是你的 GEO 成長夥伴。我們的認證團隊會深入了解你的品牌，從頭到尾陪你走完每一步。',
    w1_title:'官方授權代理商', w1_body:'直接使用 Citora 完整平台，並享有認證合作夥伴的優先導入支援。',
    w2_title:'專屬客戶經理', w2_body:'由一位熟悉你品牌、目標與產業的專人全程負責，不用每次都重新解釋。',
    w3_title:'72 小時快速上線', w3_body:'報名後 72 小時內，你的第一個 AI Profile 就會完成設定並開始被 AI 引擎索引。',
    w4_title:'持續 GEO 優化策略', w4_body:'定期進行策略檢視與調整，讓你的 GEO 分數隨著 AI 引擎的演變持續成長。',
    faq_tag:'常見問題', faq_title:'你最想知道的，都在這裡。',
    faq1_q:'什麼是 GEO？為什麼重要？',
    faq1_a:'GEO（生成式引擎優化）是讓品牌在 ChatGPT、Claude、Gemini、Perplexity 等 AI 工具的回答中被看見的優化實踐。隨著越來越多人直接向 AI 尋求推薦，沒有 AI 能見度的品牌，無論 Google 排名再高，都會逐漸錯失客戶主動發現的機會。',
    faq2_q:'Citora 和其他 GEO 工具有什麼不同？',
    faq2_a:'大多數 GEO 工具只給你一個分數，剩下靠自己摸索。Wazcher 打通了完整閉環：從分析、AI Profile 編輯器，到跨引擎 A/B 測試，再到一鍵部署，全部在同一平台連貫完成。',
    faq3_q:'為什麼要透過 Wazcher，而不是直接訂閱 Citora？',
    faq3_a:'透過 Wazcher，你能獲得專屬客戶經理、引導式平台導入，以及持續的 GEO 策略支援，比自行摸索更快上手，效果也更好。',
    faq4_q:'我怎麼知道哪個方案最適合我？',
    faq4_a:'每個品牌的需求都不一樣。聯絡 Wazcher，我們會帶你了解各方案的差異，沒有任何壓力，就是一場關於你品牌目標的直接對話。',
    faq5_q:'Citora 支援哪些 AI 引擎？',
    faq5_a:'目前支援 ChatGPT（OpenAI）、Claude（Anthropic）、Gemini（Google）和 Perplexity。商業版與企業版涵蓋全部四個引擎；試用版包含其中兩個標準頻道。',
    faq6_q:'如何開始使用？',
    faq6_a:'填寫聯絡表單後，我們會在 24 小時內主動聯繫你，協助建立帳號、帶你熟悉平台，並在 72 小時內讓第一個 AI Profile 正式上線。',
    ct_tag:'聯絡我們',
    ct_title:'準備好讓 AI 開始推薦你了嗎？',
    ct_body:'告訴我們你的品牌現況，我們會推薦最適合的 Citora 方案，並在 72 小時內協助你完成所有設定、讓第一個 AI Profile 上線。',
    ct_email:'service@wazcher.com', ct_partner:'Citora 官方授權代理商', ct_response:'24 小時內回覆',
    f_name:'姓名 *', f_company:'公司名稱', f_email:'Email *', f_plan:'有興趣的方案',
    f_plan_ph:'請選擇方案', f_msg:'留言內容',
    f_opt1:'剛開始評估', f_opt2:'試用版', f_opt3:'商業版', f_opt4:'企業版', f_opt5:'還沒確定',
    f_submit:'送出訊息', f_note:'我們會在 24 小時內回覆',
    f_success:'訊息已送出！我們會盡快與你聯繫。',
    ft_desc:'Wazcher 是 Citora 的官方授權代理商，協助品牌在 AI 生成的答案中獲得引用與推薦。',
    ft_product:'產品功能', ft_plans:'方案選擇', ft_company:'關於我們',
    ft_f1:'AI Profile 編輯器', ft_f2:'品牌監測', ft_f3:'A/B 實驗', ft_f4:'關鍵字探索', ft_f5:'社群貼文',
    ft_free:'聯絡我們', ft_about:'關於 Wazcher', ft_contact:'聯絡我們',
    ft_citora:'Citora 官方網站 ↗', ft_manual:'Citora 使用手冊 ↗',
    ft_copy:'© 2026 Wazcher · Citora 官方授權代理商',
  },
};

const STEPS = ['s1','s2','s3','s4','s5','s6'] as const;
const FEATURES = [
  { key:'f1', icon:'✍️' },
  { key:'f2', icon:'📊' },
  { key:'f3', icon:'🔎' },
  { key:'f4', icon:'🧪' },
  { key:'f5', icon:'💡' },
  { key:'f6', icon:'📣' },
] as const;

const WHY = [
  { key:'w1' },
  { key:'w2' },
  { key:'w3' },
  { key:'w4' },
] as const;

const FAQS = ['faq1','faq2','faq3','faq4','faq5','faq6'] as const;
const TABS = ['ptab0','ptab1','ptab2','ptab3'] as const;

type QuizOpt = { label: string; tier: number };
type QuizMsg = { role: 'bot' | 'user'; text: string };
const QUIZ: Record<string, {
  intro: string;
  questions: { q: string; opts: QuizOpt[] }[];
  results: Record<number, { plan: string; desc: string; restart: string }>;
  rec: string;
}> = {
  en: {
    intro: "Hi! Let's find the right plan for you. Just answer a few quick questions.",
    questions: [
      { q: "Who are you optimizing AI visibility for?", opts: [
        { label: "My own brand or personal project", tier: 1 },
        { label: "My company's marketing team", tier: 2 },
        { label: "Multiple clients - I run an agency", tier: 3 },
        { label: "A large organization with many brands", tier: 3 },
      ]},
      { q: "How many brands or websites do you manage?", opts: [
        { label: "Just 1", tier: 1 },
        { label: "2 to 10", tier: 2 },
        { label: "10 or more", tier: 3 },
      ]},
      { q: "What's your main goal right now?", opts: [
        { label: "See how my brand shows up in AI search", tier: 1 },
        { label: "Actively test and improve AI visibility over time", tier: 2 },
        { label: "Automate monitoring and run optimizations at scale", tier: 3 },
      ]},
      { q: "How do you plan to use these insights?", opts: [
        { label: "For my own brand's internal use", tier: 1 },
        { label: "Share results with clients or leadership", tier: 2 },
        { label: "Build services or products on top of the data", tier: 3 },
      ]},
    ],
    results: {
      1: { plan: "Trial", desc: "Perfect for exploring GEO. Monitor 1 website, test 2 AI channels, and start tracking your brand visibility with no commitment.", restart: "Retake Quiz" },
      2: { plan: "Business", desc: "Built for marketing teams. 10 websites, 10,000 searches/month, all AI channels, A/B experiments, and social posting included.", restart: "Retake Quiz" },
      3: { plan: "Enterprise", desc: "For large teams that need full control. 30 websites, 30,000 searches/month, white label, SDK access, and priority support.", restart: "Retake Quiz" },
    },
    rec: "We recommend",
  },
  zh: {
    intro: "嗨！讓我們幫你找到最適合的方案，只需要回答幾個問題。",
    questions: [
      { q: "你在幫誰優化 AI 能見度？", opts: [
        { label: "我自己的品牌或個人專案", tier: 1 },
        { label: "公司內部的行銷團隊", tier: 2 },
        { label: "多個客戶品牌（我是代理商）", tier: 3 },
        { label: "大型企業，旗下有多個品牌", tier: 3 },
      ]},
      { q: "你目前管理幾個品牌或網站？", opts: [
        { label: "只有 1 個", tier: 1 },
        { label: "2 到 10 個", tier: 2 },
        { label: "10 個以上", tier: 3 },
      ]},
      { q: "你現在最主要的目標是什麼？", opts: [
        { label: "先了解我的品牌在 AI 搜尋中的現況", tier: 1 },
        { label: "積極測試並持續改善 AI 能見度", tier: 2 },
        { label: "大規模自動化監測，持續執行優化", tier: 3 },
      ]},
      { q: "你打算怎麼運用這些數據？", opts: [
        { label: "只用於自己品牌的內部優化", tier: 1 },
        { label: "向客戶或管理層報告成果", tier: 2 },
        { label: "在數據之上打造服務或產品", tier: 3 },
      ]},
    ],
    results: {
      1: { plan: "試用版", desc: "適合初次探索 GEO 的品牌。監測 1 個網站、測試 2 個 AI 頻道，開始追蹤品牌能見度。", restart: "重新測試" },
      2: { plan: "商業版", desc: "專為行銷團隊設計。管理 10 個網站、1 萬次搜尋/月、完整 AI 頻道、A/B 實驗與社群排程。", restart: "重新測試" },
      3: { plan: "企業版", desc: "適合需要完整掌控的大型團隊。30 個網站、3 萬次搜尋/月，白標、SDK 及優先支援全部包含。", restart: "重新測試" },
    },
    rec: "我們推薦你選擇",
  },
};

const STEP_KEYS = ['s1','s2','s3','s4','s5'] as const;
// Node Y positions as fraction of sticky container height
const HIW_POSITIONS = [0.30, 0.43, 0.56, 0.70, 0.83];

export default function HomePage() {
  const [lang, setLang] = useState('en');
  const [tab, setTab]   = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const hiwWrapRef   = useRef<HTMLDivElement>(null);
  const hiwRocketRef = useRef<HTMLDivElement>(null);
  const revealRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const heroContent = document.querySelector<HTMLElement>('.hero-content');
    if (!heroContent) return;
    const tween = gsap.to(heroContent, {
      opacity: 0,
      y: -50,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: () => window.innerHeight * 0.4,
        scrub: 0.5,
      },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = revealRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>('.rev-word');
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 62%',
      end: 'bottom 75%',
      scrub: 0.7,
      onUpdate(self) {
        const p = self.progress;
        words.forEach((w, i) => {
          const t = i / (words.length - 1);
          const feather = 6 / words.length;
          const brightness = Math.min(1, Math.max(0.12, (p - t + feather) / feather));
          w.style.opacity = String(brightness);
        });
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards and rows fade in with stagger
      gsap.fromTo('.plat-engine-card, .plat-mention-row, .plat-query-row, .plat-stat-card, .plat-lift-row, .plat-ba-row, .plat-ab-panel',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out', clearProps: 'transform' }
      );
      // Horizontal bars (width)
      gsap.fromTo('.plat-bar-fill, .plat-ba-bar',
        { width: '0%' },
        { width: (_, el) => (el as HTMLElement).dataset.w ?? '0%', duration: 0.9, stagger: 0.06, delay: 0.25, ease: 'power3.out' }
      );
      // Vertical bars (height)
      gsap.fromTo('.plat-trend-bar, .plat-ab-bar',
        { height: '0%' },
        { height: (_, el) => (el as HTMLElement).dataset.h ?? '0%', duration: 0.7, stagger: 0.04, delay: 0.2, ease: 'power2.out' }
      );
      // Misc fade-ups
      gsap.fromTo('.plat-search-bar, .plat-citation-rate, .plat-queries, .plat-lift-section, .plat-ab-footer, .plat-trend-section, .plat-ba-section, .plat-mentions-head, .plat-geo-chart, .plat-alert',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, delay: 0.1, ease: 'power2.out', clearProps: 'transform' }
      );
      // SVG line draw
      const line = document.querySelector('.plat-geo-line') as SVGPathElement | null;
      if (line) {
        const len = line.getTotalLength();
        gsap.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.2, delay: 0.4, ease: 'power2.out' });
      }
    });
    return () => ctx.revert();
  }, [tab]);

  const [typedQuery, setTypedQuery] = useState('');
  const [resultsVisible, setResultsVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [thinking, setThinking] = useState(false);

  // Typing animation for tab 0 search bar
  useEffect(() => {
    if (tab !== 0) { setTypedQuery(''); setResultsVisible(false); setSending(false); setThinking(false); return; }
    const query = lang === 'en' ? 'Best AI marketing analytics tools 2026' : '2026 年最佳 AI 行銷分析工具';
    setTypedQuery('');
    setResultsVisible(false);
    setSending(false);
    setThinking(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTypedQuery(query.slice(0, i));
      if (i >= query.length) {
        clearInterval(iv);
        setTimeout(() => setSending(true), 120);
        setTimeout(() => { setSending(false); setThinking(true); }, 380);
        setTimeout(() => { setThinking(false); setResultsVisible(true); }, 900);
      }
    }, 22);
    return () => clearInterval(iv);
  }, [tab, lang]);

  // GSAP animations for tab 0 results after they appear
  useEffect(() => {
    if (!resultsVisible) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.plat-engine-card',
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.32, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,scale' }
      );
      gsap.fromTo('.plat-citation-rate',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.28, delay: 0.26, ease: 'power2.out', clearProps: 'transform' }
      );
      gsap.fromTo('.plat-queries',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.28, delay: 0.34, ease: 'power2.out', clearProps: 'transform' }
      );
      gsap.fromTo('.plat-bar-fill',
        { width: '0%' },
        { width: (_, el) => (el as HTMLElement).dataset.w ?? '0%', duration: 0.7, stagger: 0.05, delay: 0.12, ease: 'power3.out' }
      );
      gsap.fromTo('.plat-query-row',
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.24, stagger: 0.05, delay: 0.38, ease: 'power2.out', clearProps: 'transform' }
      );
    });
    return () => ctx.revert();
  }, [resultsVisible]);

  // Tab 1 (A/B) bar animation
  useEffect(() => {
    if (tab !== 1) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.plat-ab-bar',
        { height: '0px' },
        { height: (_:number, el:Element) => (el as HTMLElement).dataset.h ?? '0px', duration: 0.65, stagger: 0.04, delay: 0.15, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, [tab]);

  // Tab 3 bar animation
  useEffect(() => {
    if (tab !== 3) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.plat-mentions-list .plat-bar-fill',
        { width: '0%' },
        { width: (_:number, el:Element) => (el as HTMLElement).dataset.w ?? '0%', duration: 0.8, stagger: 0.07, delay: 0.2, ease: 'power3.out' }
      );
      const line = document.querySelector('.plat-geo-line') as SVGPathElement | null;
      if (line) {
        const len = line.getTotalLength();
        gsap.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.4, delay: 0.5, ease: 'power2.out' });
      }
    });
    return () => ctx.revert();
  }, [tab]);

  // Feature cards scroll-in animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.feat-glass-card'));
    const sts = cards.map(card =>
      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }),
      })
    );
    return () => sts.forEach(st => st.kill());
  }, []);

  // Scroll-driven rocket - Closed Loop Cycle
  useEffect(() => {
    if (window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = hiwWrapRef.current;
    const rocket  = hiwRocketRef.current;
    if (!wrapper || !rocket) return;

    const vh = window.innerHeight;
    const topY    = HIW_POSITIONS[0] * vh;
    const bottomY = HIW_POSITIONS[HIW_POSITIONS.length - 1] * vh;
    const span    = bottomY - topY;
    // line-fill spans from first to last node = (HIW_POSITIONS[last] - HIW_POSITIONS[0]) * 100%
    const fillSpan = (HIW_POSITIONS[HIW_POSITIONS.length-1] - HIW_POSITIONS[0]) * 100;

    gsap.set(rocket, { y: topY });

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.4,
      onUpdate(self) {
        const p = self.progress;
        gsap.set(rocket, { y: topY + p * span });
        const fill = wrapper.querySelector<HTMLElement>('.hiw-line-fill');
        if (fill) fill.style.height = `${p * fillSpan}%`;
        wrapper.querySelectorAll<HTMLElement>('.hiw-item').forEach((el, i) => {
          el.classList.toggle('hiw-item-on', p >= i / (HIW_POSITIONS.length - 1) - 0.02);
        });
        wrapper.querySelectorAll<HTMLElement>('.hiw-node').forEach((el, i) => {
          el.classList.toggle('hiw-node-on', p >= i / (HIW_POSITIONS.length - 1) - 0.02);
        });
      },
    });

    ScrollTrigger.refresh();
    return () => st.kill();
  }, []);

  const [submitText, setSubmitText] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const s = T[lang];

  useEffect(() => {
    const saved = localStorage.getItem('wlang');
    if (saved && T[saved]) setLang(saved);
  }, []);

  function switchLang(l: string) {
    setLang(l);
    localStorage.setItem('wlang', l);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Quiz ──────────────────────────────────────────────
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizMsgs, setQuizMsgs] = useState<QuizMsg[]>([]);
  const [quizTyping, setQuizTyping] = useState(false);
  const [quizQ, setQuizQ] = useState(0);
  const [quizTier, setQuizTier] = useState(1);
  const [quizDone, setQuizDone] = useState(false);
  const [quizRes, setQuizRes] = useState<{ plan: string; desc: string; restart: string } | null>(null);
  const quizBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuizStarted(false);
    setQuizMsgs([]);
    setQuizQ(0);
    setQuizTier(1);
    setQuizDone(false);
    setQuizRes(null);
  }, [lang]);

  useEffect(() => {
    if (quizBoxRef.current) quizBoxRef.current.scrollTop = quizBoxRef.current.scrollHeight;
  }, [quizMsgs, quizTyping]);

  function startQuiz() {
    const d = QUIZ[lang] ?? QUIZ.en;
    setQuizMsgs([]);
    setQuizQ(0);
    setQuizTier(1);
    setQuizDone(false);
    setQuizRes(null);
    setQuizStarted(true);
    setQuizTyping(true);
    setTimeout(() => {
      setQuizTyping(false);
      setQuizMsgs([{ role: 'bot', text: d.intro }]);
      setTimeout(() => {
        setQuizTyping(true);
        setTimeout(() => {
          setQuizTyping(false);
          setQuizMsgs(m => [...m, { role: 'bot', text: d.questions[0].q }]);
        }, 650);
      }, 300);
    }, 700);
  }

  function handleQuizOpt(opt: QuizOpt, currentQ: number, currentTier: number) {
    const d = QUIZ[lang] ?? QUIZ.en;
    const newTier = Math.max(currentTier, opt.tier);
    setQuizMsgs(m => [...m, { role: 'user', text: opt.label }]);
    setQuizQ(-1);
    setQuizTier(newTier);
    setQuizTyping(true);
    setTimeout(() => {
      setQuizTyping(false);
      const nextQ = currentQ + 1;
      if (nextQ < d.questions.length) {
        setQuizMsgs(m => [...m, { role: 'bot', text: d.questions[nextQ].q }]);
        setQuizQ(nextQ);
      } else {
        const res = d.results[newTier];
        setQuizMsgs(m => [...m, { role: 'bot', text: `${d.rec}: ${res.plan} ✦` }]);
        setQuizDone(true);
        setQuizRes(res);
      }
    }, 700);
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const payload = {
      name:    (f.querySelector('#inp-name')    as HTMLInputElement).value.trim(),
      company: (f.querySelector('#inp-company') as HTMLInputElement).value.trim(),
      email:   (f.querySelector('#inp-email')   as HTMLInputElement).value.trim(),
      plan:    (f.querySelector('#inp-plan')    as HTMLSelectElement).value,
      message: (f.querySelector('#inp-msg')     as HTMLTextAreaElement).value.trim(),
    };
    setSubmitText('...');
    try {
      const res  = await fetch('/api/submit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.ok) { setSubmitText(s.f_success); }
      else throw new Error(data.error);
    } catch {
      setSubmitText('');
      alert('Something went wrong. Please email us at service@wazcher.com');
    }
  }

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
        <div className="container navbar-inner">
          <a href="#" className="nav-logo">
            <img src="/logo.png" alt="Wazcher" />
          </a>

          {/* Desktop pill */}
          <div className="nav-right">
            <ul className="nav-links">
              <li><a href="#features">{s.nav_features}</a></li>
              <li><a href="#pricing">{s.nav_pricing}</a></li>
              <li><a href="#why">{s.nav_why}</a></li>
              <li><a href="#contact">{s.nav_contact}</a></li>
            </ul>
            <div className="nav-pill-divider" />
            <div className="lang-dropdown-wrap">
              <button
                className={`lang-dropdown-btn${langOpen ? ' open' : ''}`}
                onClick={() => setLangOpen(v => !v)}
              >
                {lang === 'en' ? 'EN' : '繁中'}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
              </button>
              {langOpen && (
                <div className="lang-dropdown-menu">
                  <button className={lang==='en'?'active':''} onClick={() => { switchLang('en'); setLangOpen(false); }}>English</button>
                  <button className={lang==='zh'?'active':''} onClick={() => { switchLang('zh'); setLangOpen(false); }}>繁體中文</button>
                </div>
              )}
            </div>
            <a href="#contact" className="btn btn-primary" style={{marginLeft:4}}>{s.nav_cta}</a>
          </div>

          {/* Hamburger button - mobile only */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="nav-mobile-drawer">
            <a href="#features" className="mob-link" onClick={() => setMenuOpen(false)}>{s.nav_features}</a>
            <a href="#pricing" className="mob-link" onClick={() => setMenuOpen(false)}>{s.nav_pricing}</a>
            <a href="#why" className="mob-link" onClick={() => setMenuOpen(false)}>{s.nav_why}</a>
            <a href="#contact" className="mob-link" onClick={() => setMenuOpen(false)}>{s.nav_contact}</a>
            <div className="mob-divider" />
            <div className="mob-lang">
              <button className={lang==='en'?'active':''} onClick={() => { switchLang('en'); setMenuOpen(false); }}>English</button>
              <button className={lang==='zh'?'active':''} onClick={() => { switchLang('zh'); setMenuOpen(false); }}>繁體中文</button>
            </div>
            <a href="#contact" className="btn btn-primary mob-cta" onClick={() => setMenuOpen(false)}>{s.nav_cta}</a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-bg.jpg" alt="" aria-hidden className="hero-bg-img" />
        <div className="hero-overlay" aria-hidden />
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="serif anim d1">{s.hero_line1}</span>
              <span className="accent anim d2">{s.hero_line2}</span>
              <span className="anim d3">{s.hero_line3}</span>
            </h1>
            <p className="hero-sub anim d3">{s.hero_sub}</p>
            <div className="hero-ctas anim d4">
              <a href="#contact" className="btn btn-primary btn-lg">{s.hero_cta1}</a>
              <a href="#features" className="btn btn-ghost btn-lg">{s.hero_cta2}</a>
            </div>
            <div className="hero-bottom anim d4">
              <span className="hero-bottom-label">{s.ai_covers}</span>
              <span className="engine-pill"><span className="engine-dot" style={{background:'#4ade80'}} />ChatGPT</span>
              <span className="engine-pill"><span className="engine-dot" style={{background:'#fb923c'}} />Claude</span>
              <span className="engine-pill"><span className="engine-dot" style={{background:'#60a5fa'}} />Gemini</span>
              <span className="engine-pill"><span className="engine-dot" style={{background:'#a78bfa'}} />Perplexity</span>
            </div>
          </div>
        </div>
      </section>



      {/* ── PROBLEM - scroll word reveal ── */}
      <section className="rev-section">
        <div className="rev-tag">{s.prob_tag}</div>
        <div className="rev-text" ref={revealRef}>
          {s.prob_reveal.split(' ').map((word, i) => (
            <span key={i} className="rev-word" style={{opacity:0.12}}>{word}{' '}</span>
          ))}
        </div>
      </section>


      {/* ── FEATURES ── */}
      <section id="features">
        <div className="container">
          <div className="feat-layout">
            <div className="feat-left">
              <div className="s-tag">{s.feat_tag}</div>
              <h2 className="feat-left-title">{s.feat_title}</h2>
              <p className="feat-left-sub">{s.feat_sub}</p>
            </div>
            <div className="feat-right">
              {FEATURES.map(({key}) => (
                <div key={key} className="feat-glass-card">
                  <h3>{s[`${key}_title` as keyof typeof s]}</h3>
                  <span className="feature-badge">{s[`${key}_badge` as keyof typeof s]}</span>
                  <p>{s[`${key}_body` as keyof typeof s]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS - scroll rocket ── */}
      <div className="hiw-wrapper" ref={hiwWrapRef}>
        <div className="hiw-sticky">
          <div className="hiw-heading">
            <div className="s-tag" style={{margin:'0 auto 10px',display:'inline-block'}}>{s.hiw_tag}</div>
            <h2 className="hiw-title-text">{s.hiw_title}</h2>
            <p className="hiw-sub-text">{s.hiw_sub}</p>
          </div>

          <div className="hiw-track-line">
            <div className="hiw-line-bg" />
            <div className="hiw-line-fill" />
            <div className="hiw-rocket" ref={hiwRocketRef}>
            </div>
            {HIW_POSITIONS.map((frac, i) => (
              <div key={i} className="hiw-node" style={{top:`${frac * 100}%`}} />
            ))}
          </div>

          {STEP_KEYS.map((k, i) => (
            <div
              key={k}
              className={`hiw-item ${i % 2 === 0 ? 'hiw-left' : 'hiw-right'}`}
              style={{top:`${HIW_POSITIONS[i] * 100}%`}}
            >
              <div className="hiw-card-inner">
                <div className="hiw-card-num">{s[k as keyof typeof s]}</div>
                <h3 className="hiw-card-title">{s[`${k}_title` as keyof typeof s]}</h3>
                <p className="hiw-card-body">{s[`${k}_body` as keyof typeof s]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PLATFORM TABS ── */}
      <section className="section section-bg2" id="platform">
        <div className="container" style={{textAlign:'center'}}>
          <div className="s-tag anim">{s.plat_tag}</div>
          <h2 className="s-title anim d1">{s.plat_title}</h2>
          <p className="s-sub anim d2">{s.plat_sub}</p>

          <div className="ptabs-bar anim d2">
            {(['ptab0','ptab1','ptab2','ptab3'] as const).map((k,i)=>(
              <button key={k} className={`ptab-btn${tab===i?' active':''}`} onClick={()=>setTab(i)}>
                {s[k as keyof typeof s]}
              </button>
            ))}
          </div>

          <p className="plat-tab-desc" key={`desc-${tab}`}>
            {[
              lang==='en'?'Test your brand visibility across multiple AI search engines simultaneously. See exactly where and how you\'re being cited.':'同時在多個 AI 搜尋引擎測試你的品牌能見度，精確掌握被引用的位置與方式。',
              lang==='en'?'Run controlled experiments to optimize your content for AI citations. Measure the impact of every change with statistical confidence.':'執行受控實驗以優化 AI 引用內容，以統計信心度衡量每次變更的影響。',
              lang==='en'?'Monitor your GEO score and citation rates with live analytics. Track your progress across all AI search engines in one place.':'透過即時分析監控你的 GEO 分數與引用率，在單一平台追蹤所有 AI 引擎的進展。',
              lang==='en'?'Track how AI engines mention and cite your brand across different queries. Get alerted when your visibility changes.':'追蹤 AI 引擎在不同查詢中提及你品牌的方式，當能見度有變化時即時收到通知。',
            ][tab]}
          </p>

          <div className="mock-browser anim d3">
            <div className="mock-browser-toolbar">
              <div className="mock-browser-dots">
                <span style={{background:'#ff5f57'}} />
                <span style={{background:'#ffbd2e'}} />
                <span style={{background:'#28ca41'}} />
              </div>
              <div className="mock-browser-url">
                citora.ai/{['search','experiments','dashboard','monitoring'][tab]}
              </div>
            </div>

            <div className="mock-browser-body" key={tab}>

              {/* Tab 0 - AI Search Testing */}
              {tab===0 && (
                <div className="plat-content">
                  <div className={`plat-search-bar${sending?' sending':''}`}>
                    <span className="plat-search-typed">
                      {typedQuery}
                      {!resultsVisible && !thinking && <span className="plat-cursor" />}
                    </span>
                    <button className={`plat-search-send${sending?' active':''}`}>↑</button>
                  </div>
                  {thinking && (
                    <div className="plat-thinking">
                      <span /><span /><span />
                    </div>
                  )}
                  {resultsVisible && <><div className="plat-engine-grid">
                    {([
                      {name:'ChatGPT',color:'#4ade80',w:'85%',pct:'85%',cited:true},
                      {name:'Claude',color:'#fb923c',w:'72%',pct:'72%',cited:true},
                      {name:'Perplexity',color:'#a78bfa',w:'61%',pct:'61%',cited:true},
                      {name:'Gemini',color:'#f87171',w:'15%',pct:'15%',cited:false},
                    ] as const).map((e,i)=>(
                      <div key={e.name} className={`plat-engine-card${e.cited?'':' not-cited'}`} style={{animationDelay:`${i*0.08}s`}}>
                        <div className="plat-card-head">
                          <span className="plat-eng-dot" style={{background:e.color}} />
                          <span className="plat-eng-name">{e.name}</span>
                          <span className={`plat-badge ${e.cited?'cited':'missed'}`}>
                            {e.cited?(lang==='en'?'Cited':'已引用'):(lang==='en'?'Not cited':'未引用')}
                          </span>
                        </div>
                        <div className={`plat-status ${e.cited?'cited':'missed'}`}>
                          {e.cited?(lang==='en'?'Cited':'已引用'):(lang==='en'?'Not cited':'未引用')}
                        </div>
                        <div className="plat-bar-track">
                          <div className={`plat-bar-fill ${e.cited?'':' dim'}`} data-w={e.w} />
                        </div>
                        <div className={`plat-card-pct ${e.cited?'':' bad'}`}>{e.pct}</div>
                      </div>
                    ))}
                  </div>
                  <div className="plat-citation-rate">
                    <span className="plat-cr-label">Citation Rate</span>
                    <span className="plat-cr-score">3 / 4</span>
                    <div className="plat-bar-track wide">
                      <div className="plat-bar-fill" data-w="75%" />
                    </div>
                    <span className="plat-cr-pct">75%</span>
                  </div>
                  <div className="plat-queries">
                    <div className="plat-queries-head">
                      <span>Top Queries</span><span className="plat-q-count">3 queries</span>
                    </div>
                    {([
                      {q:lang==='en'?'Best CRM tools 2026':'最佳 CRM 工具',dots:3,pct:'75%'},
                      {q:lang==='en'?'Marketing automation platforms':'行銷自動化平台',dots:2,pct:'50%'},
                      {q:lang==='en'?'Email platform comparison':'電子郵件平台比較',dots:4,pct:'100%'},
                    ] as const).map((r,i)=>(
                      <div key={i} className="plat-query-row" style={{animationDelay:`${0.5+i*0.06}s`}}>
                        <span className="plat-q-text">{r.q}</span>
                        <span className="plat-q-dots">
                          {[0,1,2,3].map(d=><span key={d} className={`plat-q-dot${d<r.dots?' on':''}`} />)}
                        </span>
                        <span className="plat-q-score">{r.dots}/4</span>
                        <span className={`plat-q-pct${r.pct==='100%'?' full':r.pct==='50%'?' mid':''}`}>{r.pct}</span>
                      </div>
                    ))}
                  </div>
                  </>}
                </div>
              )}

              {/* Tab 1 - A/B Experiments */}
              {tab===1 && (
                <div className="plat-content">
                  <div className="plat-ab-grid">
                    <div className="plat-ab-panel control" style={{animationDelay:'0s'}}>
                      <div className="plat-ab-label">CONTROL</div>
                      <div className="plat-ab-bars">
                        {[27,30,33,36,37,40,42].map((px,i)=>(
                          <div key={i} className="plat-ab-bar" data-h={`${px}px`} />
                        ))}
                      </div>
                      <div className="plat-ab-pct">45%</div>
                    </div>
                    <div className="plat-ab-panel winner" style={{animationDelay:'0.08s'}}>
                      <div className="plat-ab-label winner">VARIANT A <span className="win-badge">WINNER</span></div>
                      <div className="plat-ab-bars">
                        {[35,42,47,52,56,61,66].map((px,i)=>(
                          <div key={i} className="plat-ab-bar win" data-h={`${px}px`} />
                        ))}
                      </div>
                      <div className="plat-ab-pct win">67%</div>
                    </div>
                  </div>
                  <div className="plat-radar-wrap">
                    <div className="plat-lift-label">PER-ENGINE LIFT</div>
                    {(()=>{
                      const cx=110,cy=92,R=50;
                      const axes=[
                        {label:'ChatGPT', pct:'78%', angle:-90, ctrl:45, vari:78},
                        {label:'Claude',  pct:'62%', angle:0,   ctrl:38, vari:62},
                        {label:'Perplexity',pct:'58%',angle:90, ctrl:35, vari:58},
                        {label:'Gemini',  pct:'34%', angle:180, ctrl:22, vari:34},
                      ];
                      const rad=(d:number)=>d*Math.PI/180;
                      const pt=(v:number,a:number)=>({
                        x:cx+(v/100)*R*Math.cos(rad(a)),
                        y:cy+(v/100)*R*Math.sin(rad(a)),
                      });
                      const poly=(pts:{x:number,y:number}[])=>
                        pts.map((p,i)=>`${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')+'Z';
                      const ctrlPts=axes.map(a=>pt(a.ctrl,a.angle));
                      const variPts=axes.map(a=>pt(a.vari,a.angle));
                      return(
                        <svg viewBox="0 0 215 188" className="plat-radar-svg" style={{width:'100%',maxWidth:'210px',height:'auto',display:'block',margin:'0 auto'}}>
                          {/* Grid diamonds */}
                          {[33,66,100].map(lvl=>(
                            <polygon key={lvl}
                              points={axes.map(a=>{const p=pt(lvl,a.angle);return`${p.x.toFixed(1)},${p.y.toFixed(1)}`}).join(' ')}
                              fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"
                              strokeDasharray={lvl===100?'none':'3 2'}
                            />
                          ))}
                          {/* Axis lines */}
                          {axes.map((a,i)=>{const p=pt(100,a.angle);return(
                            <line key={i} x1={cx} y1={cy} x2={p.x.toFixed(1)} y2={p.y.toFixed(1)}
                              stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
                          )})}
                          {/* Control polygon */}
                          <path d={poly(ctrlPts)} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" strokeDasharray="3 2"/>
                          {/* Variant A polygon */}
                          <path d={poly(variPts)} fill="rgba(107,185,63,0.16)" stroke="rgba(107,185,63,0.85)" strokeWidth="1.8"/>
                          {/* Variant dots */}
                          {variPts.map((p,i)=>(
                            <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="3.5" fill="var(--primary)" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2"/>
                          ))}
                          {/* Axis labels */}
                          {axes.map((a,i)=>{
                            const lp=pt(100,a.angle);
                            const pad=14;
                            const lx=cx+(lp.x-cx)/R*(R+pad);
                            const ly=cy+(lp.y-cy)/R*(R+pad);
                            const anchor=a.angle===0?'start':a.angle===180?'end':'middle';
                            return(
                              <g key={i}>
                                <text x={lx.toFixed(1)} y={(ly-3).toFixed(1)} textAnchor={anchor} fontSize="9" fill="rgba(255,255,255,0.5)" fontFamily="var(--font-body)">{a.label}</text>
                                <text x={lx.toFixed(1)} y={(ly+8).toFixed(1)} textAnchor={anchor} fontSize="9.5" fontWeight="700" fill="var(--primary)" fontFamily="var(--font-body)">{a.pct}</text>
                              </g>
                            );
                          })}
                          {/* Legend */}
                          <g transform="translate(48,177)">
                            <rect width="8" height="1.5" y="3.5" fill="rgba(255,255,255,0.3)" rx="1"/>
                            <text x="12" y="9" fontSize="8.5" fill="rgba(255,255,255,0.38)" fontFamily="var(--font-body)">Control</text>
                            <circle cx="60" cy="4.5" r="3" fill="var(--primary)"/>
                            <text x="67" y="9" fontSize="8.5" fill="rgba(255,255,255,0.38)" fontFamily="var(--font-body)">Variant A</text>
                          </g>
                        </svg>
                      );
                    })()}
                  </div>
                  <div className="plat-ab-footer">
                    <div className="plat-lift-badge">↗ +48.9%</div>
                    <div className="plat-rounds">
                      {(['R1','R2','✓'] as const).map((r,i)=>(
                        <React.Fragment key={r}>
                          {i>0 && <div className="plat-round-connector"/>}
                          <div className="plat-round-step">
                            <div className={`plat-round${i===2?' done':''}`}><span>{r}</span></div>
                            <span className="plat-round-pct">{['38%','52%','67%'][i]}</span>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    <span className="plat-confidence">95% confidence</span>
                  </div>
                </div>
              )}

              {/* Tab 2 - Live Dashboard */}
              {tab===2 && (
                <div className="plat-content">
                  <div className="plat-stats-grid">
                    {([
                      {val:'78',lbl:lang==='en'?'GEO Score':'GEO 分數'},
                      {val:'67.3%',lbl:lang==='en'?'Citation Rate':'引用率'},
                      {val:'4/4',lbl:lang==='en'?'Engine Coverage':'引擎覆蓋'},
                    ] as const).map((m,i)=>(
                      <div key={i} className="plat-stat-card" style={{animationDelay:`${i*0.1}s`}}>
                        <div className="plat-stat-val">{m.val}</div>
                        <div className="plat-stat-lbl">{m.lbl}</div>
                      </div>
                    ))}
                  </div>
                  <div className="plat-trend-section">
                    <div className="plat-trend-head">
                      <span>30-{lang==='en'?'Day GEO Trend':'天 GEO 趨勢'} <span className="plat-live-dot" /></span>
                      <span className="plat-trend-delta">+12 pts</span>
                    </div>
                    <div className="plat-trend-bars">
                      {[42,45,44,50,54,57,61,65,68,72,75,78].map((h,i)=>(
                        <div key={i} className="plat-trend-bar" data-h={`${Math.round(h/78*100)}%`} />
                      ))}
                    </div>
                    <div className="plat-trend-labels"><span>42</span><span>78</span></div>
                  </div>
                  <div className="plat-ba-section">
                    <div className="plat-ba-head">
                      <span>BEFORE &amp; AFTER</span>
                      <span className="plat-trend-delta">Avg +68%</span>
                    </div>
                    {([
                      {name:'ChatGPT',before:50,after:85},
                      {name:'Claude',before:35,after:72},
                      {name:'Perplexity',before:30,after:61},
                      {name:'Gemini',before:20,after:42},
                    ] as const).map((e,i)=>(
                      <div key={e.name} className="plat-ba-row" style={{animationDelay:`${0.3+i*0.08}s`}}>
                        <span className="plat-ba-name">{e.name}</span>
                        <div className="plat-ba-bars">
                          <div className="plat-ba-bar before" data-w={`${e.before}%`} />
                          <div className="plat-ba-bar after" data-w={`${e.after}%`} />
                        </div>
                        <span className="plat-ba-pct">{e.after}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3 - Brand Monitoring */}
              {tab===3 && (()=>{
                const engines=[
                  {name:'ChatGPT', color:'#22c55e', w:'83%', pct:'83%', up:true,  delta:'12%', ago:'2m',  spark:[72,74,76,80,83]},
                  {name:'Claude',  color:'#fb923c', w:'67%', pct:'67%', up:true,  delta:'8%',  ago:'5m',  spark:[60,61,63,65,67]},
                  {name:'Perplexity',color:'#0d9488',w:'58%',pct:'58%', up:true,  delta:'15%', ago:'12m', spark:[44,48,52,56,58]},
                  {name:'Gemini',  color:'#3b82f6', w:'42%', pct:'42%', up:false, delta:'3%',  ago:'8m',  spark:[46,45,44,43,42]},
                ];
                const spark=(pts:number[],color:string,up:boolean)=>{
                  const W=56,H=22,mx=Math.max(...pts),mn=Math.min(...pts),r=mx-mn||1;
                  const cs=pts.map((v,i)=>({x:(i/(pts.length-1))*(W-4)+2,y:H-((v-mn)/r*(H-6))-3}));
                  const d=cs.map((p,i)=>`${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
                  return(
                    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{flexShrink:0,overflow:'visible'}}>
                      <path d={d} fill="none" stroke={up?color:'#f87171'} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/>
                    </svg>
                  );
                };
                // GEO trend line chart
                const geoData=[64,65,66,68,71,65,68,72,74,70,72,76];
                const anomalies=[{i:5,label:'-6'},{i:9,label:'-4'}];
                const W=370,H=80,yMin=60,yMax=80,pad={l:28,r:14,t:8,b:0};
                const cw=W-pad.l-pad.r,ch=H-pad.t-pad.b;
                const gx=(i:number)=>pad.l+i/(geoData.length-1)*cw;
                const gy=(v:number)=>pad.t+ch-(v-yMin)/(yMax-yMin)*ch;
                const pts=geoData.map((v,i)=>({x:gx(i),y:gy(v)}));
                const linePath=pts.map((p,i)=>`${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
                const areaPath=linePath+` L${pts[pts.length-1].x.toFixed(1)},${(pad.t+ch).toFixed(1)} L${pad.l.toFixed(1)},${(pad.t+ch).toFixed(1)} Z`;
                return(
                <div className="plat-content">
                  <div className="plat-mentions-head">
                    <span className="plat-mentions-title">Brand Mentions</span>
                    <span className="plat-live-indicator"><span className="plat-live-dot-static" /> Live · 4/4</span>
                  </div>
                  <div className="plat-mentions-list">
                    {engines.map((e,i)=>(
                      <div key={e.name} className="plat-mention-row" style={{animationDelay:`${i*0.08}s`}}>
                        <span className="plat-eng-dot-circle" style={{background:e.color}} />
                        <span className="plat-mention-name">{e.name}</span>
                        <div className="plat-bar-track">
                          <div className="plat-bar-fill" style={{background:e.color}} data-w={e.w} />
                        </div>
                        <span className="plat-mention-pct">{e.pct}</span>
                        {spark(e.spark,e.color,e.up)}
                        <span className={`plat-mention-delta${e.up?'':' down'}`}>{e.up?'↗':'↘'} {e.delta}</span>
                        <span className="plat-mention-ago">{e.ago}</span>
                      </div>
                    ))}
                  </div>
                  <div className="plat-geo-chart">
                    <div className="plat-geo-head">
                      <span>12-{lang==='en'?'Week GEO Trend':'週 GEO 趨勢'}</span>
                      <span className="plat-geo-legend">
                        <span className="plat-geo-leg-dot green"/> Score
                        {'  '}
                        <span className="plat-geo-leg-dot red"/> Anomaly
                      </span>
                    </div>
                    <svg viewBox={`0 0 ${W} ${H+22}`} className="plat-geo-svg" style={{width:'100%',height:'auto',overflow:'visible'}}>
                      <defs>
                        <linearGradient id="geoGrad2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6BB93F" stopOpacity="0.22"/>
                          <stop offset="100%" stopColor="#6BB93F" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      {/* Y-axis grid + labels */}
                      {[60,65,70,75,80].map(v=>(
                        <g key={v}>
                          <line x1={pad.l} y1={gy(v).toFixed(1)} x2={W-pad.r} y2={gy(v).toFixed(1)} stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="3 3"/>
                          <text x={(pad.l-4).toFixed(1)} y={(gy(v)+3.5).toFixed(1)} textAnchor="end" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="var(--font-body)">{v}</text>
                        </g>
                      ))}
                      {/* Area fill */}
                      <path d={areaPath} fill="url(#geoGrad2)"/>
                      {/* Line */}
                      <path d={linePath} fill="none" stroke="#6BB93F" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" className="plat-geo-line"/>
                      {/* Regular dots */}
                      {pts.map((p,i)=>!anomalies.find(a=>a.i===i) && i<pts.length-1 && (
                        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="2.8" fill="#6BB93F" stroke="rgba(0,0,0,0.4)" strokeWidth="1"/>
                      ))}
                      {/* Anomaly dots + labels */}
                      {anomalies.map(a=>(
                        <g key={a.i}>
                          <circle cx={pts[a.i].x.toFixed(1)} cy={pts[a.i].y.toFixed(1)} r="3.5" fill="#f87171" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
                          <text x={pts[a.i].x.toFixed(1)} y={(pts[a.i].y-8).toFixed(1)} textAnchor="middle" fontSize="9" fontWeight="700" fill="#f87171" fontFamily="var(--font-body)">{a.label}</text>
                        </g>
                      ))}
                      {/* Last point badge */}
                      <rect x={(pts[pts.length-1].x-12).toFixed(1)} y={(pts[pts.length-1].y-10).toFixed(1)} width="24" height="14" rx="7" fill="#6BB93F"/>
                      <text x={pts[pts.length-1].x.toFixed(1)} y={(pts[pts.length-1].y+1.5).toFixed(1)} textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#000" fontFamily="var(--font-body)">76</text>
                      {/* X-axis labels */}
                      {geoData.map((_,i)=>(
                        <text key={i} x={gx(i).toFixed(1)} y={(H+18).toFixed(1)} textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.3)" fontFamily="var(--font-body)">{i===0?'W1':i+1}</text>
                      ))}
                    </svg>
                  </div>
                  <div className="plat-alert">
                    ⚡ {lang==='en'?'Perplexity citation rate +15% today':'Perplexity 引用率今日上升 15%'}
                  </div>
                </div>
                );
              })()}

            </div>
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="s-tag anim">{s.price_tag}</div>
          <h2 className="s-title anim d1">{s.price_title}</h2>
          <p className="s-sub anim d2">{s.price_sub}</p>
          <div className="plans-grid">
            {/* Trial */}
            <div className="plan-card anim">
              <div className="plan-tier">{s.pl1_tier}</div>
              <div className="plan-for">{s.pl1_for}</div>
              <div className="plan-price-label">{lang==='en'?'Pricing on request':'價格請洽詢'}</div>
              <a href="#contact" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:20,marginBottom:4}}>{s.pl_cta}</a>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li>{s.pl1_f1}</li>
                <li>{s.pl1_f2}</li>
                <li>{s.pl1_f3}</li>
                <li>{s.pl1_f4}</li>
              </ul>
              <p className="plan-note">{s.pl1_note}</p>
            </div>
            {/* Business */}
            <div className="plan-card featured anim d1">
              <div className="plan-popular">✦ {s.pl2_popular}</div>
              <div className="plan-tier accent">{s.pl2_tier}</div>
              <div className="plan-for">{s.pl2_for}</div>
              <div className="plan-price-label">{lang==='en'?'Pricing on request':'價格請洽詢'}</div>
              <a href="#contact" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:20,marginBottom:4}}>{s.pl_cta}</a>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li>{s.pl2_f1}</li>
                <li>{s.pl2_f2}</li>
                <li>{s.pl2_f3}</li>
                <li>{s.pl2_f4}</li>
                <li>{s.pl2_f5}</li>
                <li>{s.pl2_f6}</li>
              </ul>
              <div className="plan-addon-label">{s.pl_addon}</div>
              <ul className="plan-features">
                <li className="addon">{s.pl2_a1}</li>
                <li className="addon">{s.pl2_a2}</li>
              </ul>
            </div>
            {/* Enterprise */}
            <div className="plan-card anim d2">
              <div className="plan-tier">{s.pl3_tier}</div>
              <div className="plan-for">{s.pl3_for}</div>
              <div className="plan-price-label">{lang==='en'?'Pricing on request':'價格請洽詢'}</div>
              <a href="#contact" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:20,marginBottom:4}}>{s.pl_cta}</a>
              <div className="plan-divider" />
              <ul className="plan-features">
                <li>{s.pl3_f1}</li>
                <li>{s.pl3_f2}</li>
                <li>{s.pl3_f3}</li>
                <li>{s.pl3_f4}</li>
                <li>{s.pl3_f5}</li>
                <li>{s.pl3_f6}</li>
              </ul>
              <div className="plan-addon-label">{s.pl_addon}</div>
              <ul className="plan-features">
                <li className="addon">{s.pl3_a1}</li>
                <li className="addon">{s.pl3_a2}</li>
                <li className="addon">{s.pl3_a3}</li>
                <li className="addon">{s.pl3_a4}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section className="section" id="plan-finder">
        <div className="container">
          <div className="quiz-layout">
            {/* LEFT - Chat panel */}
            <div className="quiz-panel anim">
              <div className="quiz-panel-header">
                <div className="quiz-panel-avatar">
                  W
                  <div className="quiz-panel-dot" />
                </div>
                <div>
                  <div className="quiz-panel-name">Wazcher AI</div>
                  <div className="quiz-panel-status">{lang==='en'?'Online · Plan Advisor':'線上 · 方案顧問'}</div>
                </div>
              </div>
              <div className="quiz-messages" ref={quizBoxRef}>
                {!quizStarted && (
                  <div className="quiz-msg bot">
                    <div className="quiz-mini-av">W</div>
                    <div className="quiz-bubble">{lang==='en'?"Hi! I'm Wazcher AI. I'll help you find the right plan. Click the button below to get started.":"嗨！我是 Wazcher AI，讓我幫你找到最適合的方案。點擊下方按鈕開始！"}</div>
                  </div>
                )}
                {quizMsgs.map((m, i) => (
                  <div key={i} className={`quiz-msg ${m.role}`}>
                    {m.role==='bot' && <div className="quiz-mini-av">W</div>}
                    <div className="quiz-bubble">{m.text}</div>
                  </div>
                ))}
                {quizTyping && (
                  <div className="quiz-msg bot">
                    <div className="quiz-mini-av">W</div>
                    <div className="quiz-bubble">
                      <div className="quiz-typing">
                        <div className="quiz-dot"/><div className="quiz-dot"/><div className="quiz-dot"/>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {!quizStarted && (
                <div className="quiz-input-row">
                  <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}} onClick={startQuiz}>
                    {lang==='en'?'Start Quiz →':'開始測驗 →'}
                  </button>
                </div>
              )}
              {quizStarted && !quizDone && quizQ >= 0 && (
                <div className="quiz-opts">
                  {(QUIZ[lang]??QUIZ.en).questions[quizQ].opts.map((opt, i) => (
                    <button key={i} className="quiz-opt" onClick={() => handleQuizOpt(opt, quizQ, quizTier)}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
              {quizDone && (
                <div className="quiz-input-row">
                  <button className="quiz-restart" onClick={startQuiz}>{quizRes?.restart}</button>
                </div>
              )}
            </div>

            {/* RIGHT - Copy */}
            <div className="anim d1">
              <div className="quiz-live-badge">
                {lang==='en'?'Plan Finder':'方案推薦'}
              </div>
              <h2 className="quiz-heading">{lang==='en'?'Find Your Perfect Plan.':'找到最適合你的方案。'}</h2>
              <p className="quiz-sub">{lang==='en'?'Answer 4 quick questions. Get a personalised plan recommendation - no pressure, no commitment.':'回答 4 個問題，立刻獲得最適合你品牌的個人化方案推薦。'}</p>
              <div className="quiz-plan-pills">
                {(lang==='en'
                  ? ['Trial','Business','Enterprise']
                  : ['試用版','商業版','企業版']
                ).map((plan, i) => (
                  <div key={plan} className={`quiz-plan-pill${quizRes?.plan===plan?' active':''}`}>
                    {plan}
                    {i===1 && !quizRes && <span className="quiz-pill-badge">{lang==='en'?'Popular':'熱門'}</span>}
                  </div>
                ))}
              </div>
              {quizDone && quizRes && (
                <div className="quiz-rec-card">
                  <div className="quiz-rec-label">{(QUIZ[lang]??QUIZ.en).rec}</div>
                  <div className="quiz-rec-plan">{quizRes.plan}</div>
                  <div className="quiz-rec-desc">{quizRes.desc}</div>
                  <div className="quiz-rec-btns">
                    <a href="#contact" className="btn btn-primary" style={{fontSize:13,padding:'10px 22px'}}>
                      {lang==='en'?'Talk to Us →':'與我們聯絡 →'}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY WAZCHER ── */}
      <section className="section section-bg2" id="why">
        <div className="container">
          <div className="why-grid">
            <div>
              <div className="s-tag anim">{s.why_tag}</div>
              <h2 className="s-title anim d1">{s.why_title}</h2>
              <p style={{fontSize:15,lineHeight:1.72,color:'#fff',marginBottom:0}} className="anim d2">{s.why_body}</p>
              <ul className="why-list">
                {WHY.map(({key}) => (
                  <li key={key} className="why-item anim d2">
                    <div>
                      <h3>{s[`${key}_title` as keyof typeof s]}</h3>
                      <p>{s[`${key}_body` as keyof typeof s]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="why-visual anim d2">
              <p className="score-title">{lang==='en'?'Brand GEO Score':'品牌 GEO 分數'}</p>
              <div className="score-ring">
                <div className="score-ring-inner">
                  <div className="score-val">73</div>
                  <div className="score-lbl">GEO</div>
                </div>
              </div>
              <p className="score-title">{lang==='en'?'Per-Engine Breakdown':'各引擎分項數據'}</p>
              <div className="eng-bars">
                {[
                  {n:'ChatGPT', w:'82%', v:82},
                  {n:'Claude',  w:'75%', v:75},
                  {n:'Gemini',  w:'68%', v:68},
                  {n:'Perplexity',w:'67%',v:67},
                ].map(e => (
                  <div key={e.n} className="eng-row">
                    <span className="eng-name">{e.n}</span>
                    <div className="eng-bar"><div className="eng-fill" style={{width:e.w}} /></div>
                    <span className="eng-score">{e.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section section-bg2" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info anim">
              <div className="s-tag">{s.ct_tag}</div>
              <h2>{s.ct_title.split(' ')[0]}&nbsp;<span>{s.ct_title.split(' ').slice(1).join(' ')}</span></h2>
              <p>{s.ct_body}</p>
              <div className="contact-meta">
                <div className="contact-meta-item">📧 <a href={`mailto:${s.ct_email}`}>{s.ct_email}</a></div>
                <div className="contact-meta-item">✦ {s.ct_partner}</div>
                <div className="contact-meta-item">⏱ {s.ct_response}</div>
              </div>
            </div>
            <div className="anim d2">
              <form onSubmit={handleSubmit} className="form-box">
                <div className="form-row">
                  <div className="form-group">
                    <label>{s.f_name}</label>
                    <input type="text" id="inp-name" required placeholder={lang==='en'?'Your name':'你的姓名'} />
                  </div>
                  <div className="form-group">
                    <label>{s.f_company}</label>
                    <input type="text" id="inp-company" placeholder={lang==='en'?'Your company':'你的公司'} />
                  </div>
                </div>
                <div className="form-group">
                  <label>{s.f_email}</label>
                  <input type="email" id="inp-email" required placeholder="you@company.com" />
                </div>
                <div className="form-group">
                  <label>{s.f_plan}</label>
                  <select id="inp-plan">
                    <option value="">{s.f_plan_ph}</option>
                    <option>{s.f_opt1}</option>
                    <option>{s.f_opt2}</option>
                    <option>{s.f_opt3}</option>
                    <option>{s.f_opt4}</option>
                    <option>{s.f_opt5}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{s.f_msg}</label>
                  <textarea id="inp-msg" placeholder={lang==='en'?'Tell us about your brand and goals.':'告訴我們你的品牌與目標。'} />
                </div>
                <button type="submit" className="form-submit">{submitText || s.f_submit}</button>
                <p className="form-note">{s.f_note}</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" id="faq">
        <div className="container">
          <div className="s-tag anim" style={{justifyContent:'center'}}>{s.faq_tag}</div>
          <h2 className="s-title anim d1" style={{textAlign:'center',marginBottom:52}}>{s.faq_title}</h2>
          <div className="faq-list">
            {FAQS.map((k, i) => (
              <div key={k} className={`faq-item anim d${Math.min(i,3) as 0|1|2|3}${openFaq===i?' open':''}`}>
                <button className="faq-btn" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                  <span>{s[`${k}_q` as keyof typeof s]}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-body">
                  <div className="faq-inner"><p>{s[`${k}_a` as keyof typeof s]}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo"><img src="/logo.png" alt="Wazcher" /></div>
              <p className="footer-desc">{s.ft_desc}</p>
            </div>
            <div className="footer-col">
              <h4>{s.ft_product}</h4>
              <ul>
                <li><a href="#features">{s.ft_f1}</a></li>
                <li><a href="#features">{s.ft_f2}</a></li>
                <li><a href="#features">{s.ft_f3}</a></li>
                <li><a href="#features">{s.ft_f4}</a></li>
                <li><a href="#features">{s.ft_f5}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{s.ft_plans}</h4>
              <ul>
                <li><a href="#pricing">{s.pl1_tier}</a></li>
                <li><a href="#pricing">{s.pl2_tier}</a></li>
                <li><a href="#pricing">{s.pl3_tier}</a></li>
                <li><a href="#contact">{s.ft_free}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{s.ft_company}</h4>
              <ul>
                <li><a href="#why">{s.ft_about}</a></li>
                <li><a href="#contact">{s.ft_contact}</a></li>
                <li><a href="https://citora.ai" target="_blank" rel="noopener noreferrer">{s.ft_citora}</a></li>
                <li><a href="https://citora.ai/manual" target="_blank" rel="noopener noreferrer">{s.ft_manual}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{s.ft_copy}</span>
            <span>Powered by <a href="https://citora.ai" target="_blank" rel="noopener noreferrer">Citora</a></span>
          </div>
        </div>
      </footer>
    </>
  );
}
