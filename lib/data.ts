import { AIModel, PluginItem, ScheduledTask, Task, Artifact } from '@/types/agent';

export const DEFAULT_AI_MODELS: AIModel[] = [
  {
    id: 'manus-1.6',
    name: 'OpenManus 1.6 (Open Source Core)',
    provider: 'OpenManus',
    modelId: 'openmanus-1.6-hybrid',
    description: 'Motor de raciocínio autônomo open-source com orquestração de ferramentas e sandbox E2B.',
    badge: 'Open Source',
    isDefault: true,
    speed: 'Ultra Rápido',
    reasoningScore: '98.5%',
    contextWindow: '1M tokens',
  },
  {
    id: 'manus-1.6-pro',
    name: 'OpenManus 1.6 Pro (Community)',
    provider: 'OpenManus',
    modelId: 'openmanus-1.6-pro',
    description: 'Capacidade máxima de resolução de problemas, navegação profunda e geração de código complexo 100% open source.',
    badge: 'Open Source Pro',
    speed: 'Rápido',
    reasoningScore: '99.4%',
    contextWindow: '2M tokens',
  },
  {
    id: 'gemini-3.7-flash',
    name: 'Google Gemini 3.7 Flash',
    provider: 'Google',
    modelId: 'gemini-3.7-flash',
    description: 'Modelo de ponta do Google para raciocínio instantâneo, multimodalidade e pesquisa web.',
    badge: 'Oficial Google',
    speed: 'Instantâneo',
    reasoningScore: '97.8%',
    contextWindow: '1M tokens',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    modelId: 'claude-3-5-sonnet-20241022',
    description: 'Excelente para codificação, síntese arquitetural e nuances em texto técnico.',
    speed: 'Rápido',
    reasoningScore: '98.9%',
    contextWindow: '200k tokens',
  },
  {
    id: 'gpt-4o',
    name: 'OpenAI GPT-4o',
    provider: 'OpenAI',
    modelId: 'gpt-4o',
    description: 'Modelo versátil de alto desempenho para tarefas gerais e instruções estruturadas.',
    speed: 'Rápido',
    reasoningScore: '97.5%',
    contextWindow: '128k tokens',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 (Thinking)',
    provider: 'DeepSeek',
    modelId: 'deepseek-reasoner',
    description: 'Modelo especializado em cadeia de pensamento (CoT) e raciocínio matemático/algorítmico.',
    badge: 'Raciocínio Forte',
    speed: 'Médio',
    reasoningScore: '98.7%',
    contextWindow: '64k tokens',
  },
  {
    id: 'groq-llama-3-3-70b',
    name: 'Groq Llama 3.3 70B',
    provider: 'Groq',
    modelId: 'llama-3.3-70b-versatile',
    description: 'Inferência em velocidade ultra-sônica para automações em tempo real.',
    badge: 'Ultra Rápido',
    speed: 'Instantâneo (< 200ms)',
    reasoningScore: '95.2%',
    contextWindow: '128k tokens',
  },
];

export const DEFAULT_PLUGINS: PluginItem[] = [
  // Conectores
  {
    id: 'conn-browser',
    category: 'connector',
    name: 'Meu Navegador',
    description: 'Acesse a web no seu próprio navegador de forma segura e autônoma.',
    iconName: 'Globe',
    isConnected: true,
  },
  {
    id: 'conn-gmail',
    category: 'connector',
    name: 'Gmail',
    description: 'Redija respostas, pesquise na sua caixa de entrada e resuma conversas por e-mail com segurança.',
    iconName: 'Mail',
    isConnected: false,
  },
  {
    id: 'conn-instagram',
    category: 'connector',
    name: 'Instagram',
    description: 'Gere e publique Posts, Stories ou Reels no Instagram com agendamento inteligente.',
    iconName: 'Camera',
    isConnected: false,
  },
  {
    id: 'conn-workspace',
    category: 'connector',
    name: 'Google Workspace',
    description: 'Acesse seus arquivos, pesquise instantaneamente e deixe o Manus criar planilhas e docs.',
    iconName: 'FolderKanban',
    isConnected: true,
  },
  {
    id: 'conn-meta-ads',
    category: 'connector',
    name: 'Meta Ads Manager',
    description: 'Automatize insights e otimização de anúncios para economizar horas e maximizar lucros.',
    iconName: 'Megaphone',
    isConnected: false,
  },
  {
    id: 'conn-calendar',
    category: 'connector',
    name: 'Google Agenda',
    description: 'Entenda sua agenda, gerencie eventos e otimize seu tempo de forma eficaz.',
    iconName: 'Calendar',
    isConnected: false,
  },
  {
    id: 'conn-notion',
    category: 'connector',
    name: 'Notion',
    description: 'Pesquise o conteúdo do espaço de trabalho, atualize notas e automatize fluxos de trabalho.',
    iconName: 'FileText',
    isConnected: false,
  },
  {
    id: 'conn-insta-creator',
    category: 'connector',
    name: 'Instagram Creator Marketplace',
    description: 'Descubra criadores que se encaixam no alcance, nos tópicos e no estilo da sua marca.',
    iconName: 'Users',
    isConnected: false,
  },

  // Habilidades
  {
    id: 'skill-github-gem',
    category: 'skill',
    name: 'github-gem-seeker',
    description: "Search GitHub for battle-tested solutions instead of reinventing the wheel. Use when the user's task requires open-source libraries.",
    iconName: 'GitBranch',
    isConnected: true,
    verified: true,
  },
  {
    id: 'skill-skill-finder',
    category: 'skill',
    name: 'internet-skill-finder',
    description: 'Search and recommend Agent Skills from verified GitHub repositories with automatic integration testing.',
    iconName: 'SearchCode',
    isConnected: true,
    verified: true,
  },
  {
    id: 'skill-html-video',
    category: 'skill',
    name: 'html-video-production',
    description: 'Build editable, scene-based HTML videos rendered to MP4 on HyperFrames open-source pipeline.',
    iconName: 'Video',
    isConnected: false,
    verified: true,
  },
  {
    id: 'skill-manim',
    category: 'skill',
    name: 'manim-animator',
    description: 'Gere vídeos de animação explicativos baseados em código e gráficos vetoriais precisos usando Manim Python.',
    iconName: 'Sparkles',
    isConnected: false,
    verified: true,
  },
  {
    id: 'skill-seo-comp',
    category: 'skill',
    name: 'análise-de-concorrentes-seo',
    description: 'Crie relatórios simplificados de concorrentes orgânicos de SEO, focados no alvo e palavras-chave de alto valor.',
    iconName: 'BarChart2',
    isConnected: false,
    verified: true,
  },
  {
    id: 'skill-seo-audit',
    category: 'skill',
    name: 'auditoria-seo',
    description: 'Crie relatórios de auditoria de SEO em linguagem simples e baseados em evidências estruturadas.',
    iconName: 'Search',
    isConnected: false,
    verified: true,
  },
  {
    id: 'skill-keywords',
    category: 'skill',
    name: 'pesquisa-de-palavras-chave',
    description: 'Realize uma pesquisa de palavras-chave e gere uma pasta de trabalho do Excel de três abas automatizada.',
    iconName: 'KeyRound',
    isConnected: false,
  },
  {
    id: 'skill-traffic-checker',
    category: 'skill',
    name: 'verificador-de-tráfego-de-site',
    description: 'Fluxo de trabalho abrangente de análise de tráfego de sites. Use quando o usuário solicitar métricas de audiência.',
    iconName: 'TrendingUp',
    isConnected: false,
    verified: true,
  },

  // Fontes de dados
  {
    id: 'ds-similarweb',
    category: 'datasource',
    name: 'Similarweb',
    description: 'Analise o tráfego do site e os dados de SEO para qualquer domínio ou URL de site.',
    iconName: 'PieChart',
    isConnected: true,
  },
  {
    id: 'ds-worldbank',
    category: 'datasource',
    name: 'World Bank DataBank',
    description: 'Busque estatísticas oficiais do World Bank para qualquer país, região ou grupo de renda.',
    iconName: 'Globe2',
    isConnected: true,
  },
  {
    id: 'ds-twitter',
    category: 'datasource',
    name: 'X/Twitter',
    description: 'Busque e pesquise dados públicos do X (Twitter) para qualquer link de postagem, hashtag ou perfil.',
    iconName: 'Twitter',
    isConnected: true,
  },
  {
    id: 'ds-brand24',
    category: 'datasource',
    name: 'Brand24',
    description: 'Monitore menções à marca, sentimentos e influenciadores na web aberta.',
    iconName: 'ShieldAlert',
    isConnected: false,
  },
  {
    id: 'ds-ahrefs',
    category: 'datasource',
    name: 'Ahrefs',
    description: 'Analise o desempenho de SEO, acompanhe classificações e pesquise palavras-chave em larga escala.',
    iconName: 'Target',
    isConnected: false,
  },
  {
    id: 'ds-coingecko',
    category: 'datasource',
    name: 'CoinGecko',
    description: 'Acesse dados de mercado de cripto em tempo real, preços, tendências e análises onchain.',
    iconName: 'Coins',
    isConnected: false,
  },
  {
    id: 'ds-pophive',
    category: 'datasource',
    name: 'PopHIVE',
    description: 'Acesse dados de saúde pública nos painéis globais do PopHIVE.',
    iconName: 'Activity',
    isConnected: false,
  },
  {
    id: 'ds-morningstar',
    category: 'datasource',
    name: 'Morningstar',
    description: 'Acesse dados de investimento, pesquisas e análises da Morningstar para valores mobiliários.',
    iconName: 'DollarSign',
    isConnected: false,
  },
];

export const DEFAULT_SCHEDULED_TASKS: ScheduledTask[] = [
  {
    id: 'sch-1',
    title: 'Monitoramento diário de concorrentes e menções de marca',
    prompt: 'Execute uma varredura nas notícias e redes sociais sobre concorrentes e resuma os principais lançamentos e preços.',
    scheduleType: 'daily',
    time: '08:00',
    isActive: true,
    lastRun: 'Hoje às 08:00',
    nextRun: 'Amanhã às 08:00',
    autoRunSandbox: true,
    targetModel: 'manus-1.6-pro',
    tags: ['SEO', 'Concorrência'],
  },
  {
    id: 'sch-2',
    title: 'Resumo Matinal da Caixa de Entrada & Agenda',
    prompt: 'Verifique reuniões do Google Agenda, e-mails prioritários do Gmail e gere um checklist de ações para o dia.',
    scheduleType: 'daily',
    time: '07:30',
    isActive: true,
    lastRun: 'Hoje às 07:30',
    nextRun: 'Amanhã às 07:30',
    autoRunSandbox: false,
    targetModel: 'gemini-3.7-flash',
    tags: ['Produtividade', 'Gmail'],
  },
  {
    id: 'sch-3',
    title: 'Auditoria Semanal de Performance e SEO',
    prompt: 'Rode o script E2B de verificação de Lighthouse e PageSpeed nos domínios da empresa e salve o relatório em PDF.',
    scheduleType: 'weekly',
    time: 'Segunda 09:00',
    isActive: false,
    lastRun: '10 de ago.',
    nextRun: 'Próxima segunda às 09:00',
    autoRunSandbox: true,
    targetModel: 'manus-1.6',
    tags: ['DevOps', 'E2B Sandbox'],
  },
];

export const INITIAL_ARTIFACTS: Artifact[] = [
  {
    id: 'art-1',
    title: 'DesignHub — 50 Professional UI Designs',
    type: 'site',
    description: 'Plataforma completa de biblioteca de 50 designs modernos com animações, layouts responsivos e código pronto.',
    date: 'Ontem, 13:39',
    tags: ['Design', 'Next.js', 'Tailwind', 'UI/UX'],
    starred: true,
    content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DesignHub — 50 Professional UI Designs</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-stone-50 text-stone-900 min-h-screen p-6 md:p-12">
  <div class="max-w-6xl mx-auto space-y-12">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-200 pb-8">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-stone-900 text-stone-100 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
          Design System v2.4
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900">Interfaces com <span class="text-amber-700 italic">intenção</span>.</h1>
        <p class="text-stone-500 mt-2 text-lg">Coleção curada de 50 componentes e telas de alta fidelidade.</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="px-5 py-2.5 bg-stone-900 text-white rounded-xl font-medium shadow-sm hover:bg-stone-800 transition">Explorar Acervo</button>
        <button class="px-5 py-2.5 bg-white border border-stone-200 text-stone-700 rounded-xl font-medium hover:bg-stone-100 transition">Documentação</button>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm space-y-4 hover:shadow-md transition">
        <div class="w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">01</div>
        <h3 class="text-xl font-bold text-stone-900">Dashboards Analíticos</h3>
        <p class="text-stone-500 text-sm">Visualizações densas de métricas, gráficos e tabelas com suporte a modo escuro e filtros avançados.</p>
        <div class="pt-2 text-xs font-semibold text-amber-800">14 Variações Prontas &rarr;</div>
      </div>

      <div class="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm space-y-4 hover:shadow-md transition">
        <div class="w-10 h-10 bg-sky-100 text-sky-800 rounded-xl flex items-center justify-center font-bold">02</div>
        <h3 class="text-xl font-bold text-stone-900">Fluxos de Onboarding</h3>
        <p class="text-stone-500 text-sm">Passo a passo interativo para engajar usuários desde o primeiro minuto com formulários dinâmicos.</p>
        <div class="pt-2 text-xs font-semibold text-sky-800">18 Variações Prontas &rarr;</div>
      </div>

      <div class="p-6 bg-white rounded-2xl border border-stone-200/80 shadow-sm space-y-4 hover:shadow-md transition">
        <div class="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">03</div>
        <h3 class="text-xl font-bold text-stone-900">Checkout & Pagamentos</h3>
        <p class="text-stone-500 text-sm">Telas de pagamento seguras, cálculo de impostos, seleção de moedas e recibos instantâneos.</p>
        <div class="pt-2 text-xs font-semibold text-emerald-800">18 Variações Prontas &rarr;</div>
      </div>
    </div>
  </div>
</body>
</html>`,
    files: [
      {
        name: 'index.html',
        path: '/src/index.html',
        language: 'html',
        content: `<!-- DesignHub Index Component -->`,
      },
    ],
  },
  {
    id: 'art-2',
    title: 'Koi Zen Snake',
    type: 'game',
    description: 'Jogo interativo da Cobrinha com temática de lago de carpas japonesas, física suave, sons e efeitos de água.',
    date: 'Ontem, 12:50',
    tags: ['Game', 'Canvas', 'HTML5', 'Zen'],
    starred: true,
    content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Koi Zen Snake</title>
  <style>
    body { margin: 0; background: #0f1c1e; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #e0f2fe; }
    canvas { background: #132a2f; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); border: 2px solid #234e52; }
    .header { text-align: center; margin-bottom: 12px; }
    .score-board { font-size: 18px; color: #a5f3fc; margin-top: 8px; }
    .controls { margin-top: 14px; font-size: 13px; color: #64748b; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin:0; font-size: 24px; color: #e2e8f0;">🌸 Koi Zen Snake</h2>
    <div class="score-board">Pontuação: <span id="score">0</span> | Lótus Coletadas: <span id="lotus">0</span></div>
  </div>
  <canvas id="gameCanvas" width="480" height="360"></canvas>
  <div class="controls">Use as setas do teclado ou W, A, S, D para nadar pelo lago.</div>

  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    let snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
    let dir = {x: 1, y: 0};
    let nextDir = {x: 1, y: 0};
    let food = {x: 15, y: 8};
    let score = 0;
    let lotus = 0;

    function resetGame() {
      snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
      dir = {x: 1, y: 0};
      nextDir = {x: 1, y: 0};
      score = 0;
      lotus = 0;
      document.getElementById('score').innerText = score;
      document.getElementById('lotus').innerText = lotus;
      spawnFood();
    }

    function spawnFood() {
      food.x = Math.floor(Math.random() * (canvas.width / gridSize));
      food.y = Math.floor(Math.random() * (canvas.height / gridSize));
    }

    window.addEventListener('keydown', e => {
      if ((e.key === 'ArrowUp' || e.key === 'w') && dir.y === 0) nextDir = {x: 0, y: -1};
      if ((e.key === 'ArrowDown' || e.key === 's') && dir.y === 0) nextDir = {x: 0, y: 1};
      if ((e.key === 'ArrowLeft' || e.key === 'a') && dir.x === 0) nextDir = {x: -1, y: 0};
      if ((e.key === 'ArrowRight' || e.key === 'd') && dir.x === 0) nextDir = {x: 1, y: 0};
    });

    function update() {
      dir = nextDir;
      const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

      if (head.x < 0) head.x = (canvas.width / gridSize) - 1;
      if (head.x >= canvas.width / gridSize) head.x = 0;
      if (head.y < 0) head.y = (canvas.height / gridSize) - 1;
      if (head.y >= canvas.height / gridSize) head.y = 0;

      for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
          resetGame();
          return;
        }
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 100;
        lotus += 1;
        document.getElementById('score').innerText = score;
        document.getElementById('lotus').innerText = lotus;
        spawnFood();
      } else {
        snake.pop();
      }
    }

    function draw() {
      ctx.fillStyle = '#132a2f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw water ripples
      ctx.strokeStyle = 'rgba(78, 201, 176, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.arc(i + 20, 180, 60, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw food (Lotus flower)
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw Koi fish snake
      snake.forEach((seg, index) => {
        const isHead = index === 0;
        ctx.fillStyle = isHead ? '#f97316' : index % 2 === 0 ? '#fb923c' : '#fdba74';
        ctx.beginPath();
        ctx.arc(seg.x * gridSize + gridSize/2, seg.y * gridSize + gridSize/2, isHead ? gridSize/2 : gridSize/2 - 2, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    setInterval(() => {
      update();
      draw();
    }, 110);
  </script>
</body>
</html>`,
  },
  {
    id: 'art-3',
    title: 'Simulador de Drone Realista',
    type: 'simulation',
    description: 'Ambiente tridimensional de simulação de voo com telemetria DJI (Mavic 3 / Avata), controle de vento, bateria e giroscópio.',
    date: '6 de jul.',
    tags: ['Simulação', '3D', 'Canvas', 'DJI'],
    content: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Simulador de Drone DJI</title>
  <style>
    body { margin: 0; background: #0b0f19; color: #f8fafc; font-family: monospace; overflow: hidden; }
    #hud { position: absolute; top: 16px; left: 16px; background: rgba(15,23,42,0.8); padding: 14px 20px; border-radius: 12px; border: 1px solid #334155; font-size: 13px; line-height: 1.6; }
    #instructions { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); background: rgba(15,23,42,0.85); padding: 10px 20px; border-radius: 999px; border: 1px solid #334155; font-size: 12px; color: #94a3b8; }
    canvas { width: 100vw; height: 100vh; display: block; }
  </style>
</head>
<body>
  <div id="hud">
    <div style="font-weight: bold; color: #38bdf8; margin-bottom: 4px;">📡 TELEMETRIA DJI MAVIC 3 PRO</div>
    <div>ALTITUDE: <span id="alt" style="color: #4ade80;">24.5 m</span></div>
    <div>VELOCIDADE: <span id="spd" style="color: #4ade80;">14.2 km/h</span></div>
    <div>BATERIA: <span style="color: #facc15;">88% (27 min)</span></div>
    <div>SINAL GPS: <span style="color: #4ade80;">21 Satélites (Ótimo)</span></div>
    <div>VENTO: <span>3.2 m/s (NE)</span></div>
  </div>
  <div id="instructions">Use [W / S] Acelerar/Ré | [A / D] Guinada | [Setas Cima/Baixo] Altitude</div>
  <canvas id="droneView"></canvas>

  <script>
    const canvas = document.getElementById('droneView');
    const ctx = canvas.getContext('2d');
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let drone = { x: canvas.width / 2, y: canvas.height / 2, altitude: 25, yaw: 0, speed: 0 };
    let keys = {};
    window.addEventListener('keydown', e => keys[e.key] = true);
    window.addEventListener('keyup', e => keys[e.key] = false);

    function loop() {
      if (keys['w'] || keys['W']) drone.y -= 2;
      if (keys['s'] || keys['S']) drone.y += 2;
      if (keys['a'] || keys['A']) drone.x -= 2;
      if (keys['d'] || keys['D']) drone.x += 2;
      if (keys['ArrowUp']) drone.altitude = Math.min(120, drone.altitude + 0.3);
      if (keys['ArrowDown']) drone.altitude = Math.max(1, drone.altitude - 0.3);

      document.getElementById('alt').innerText = drone.altitude.toFixed(1) + ' m';

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid ground
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Drone reticle
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(drone.x, drone.y, 30, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(drone.x - 40, drone.y); ctx.lineTo(drone.x + 40, drone.y);
      ctx.moveTo(drone.x, drone.y - 40); ctx.lineTo(drone.x, drone.y + 40);
      ctx.stroke();

      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`,
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-active-1',
    title: 'How to Clone My GitHub Repository?',
    iconType: 'code',
    status: 'running',
    createdAt: 'Agora mesmo',
    modelUsed: 'Manus 1.6',
    totalSteps: 5,
    currentStep: 2,
    messages: [
      {
        id: 'm-1',
        role: 'user',
        content: 'no documentacao direto no console e noogle onde os endpoints no meio bugado corrija e deixe certinho , tambem melhore a documentaçao publica,deixe mais profissional eperaçao com documentacoes profissionais depois verifique erros e faz o teste',
        timestamp: '16:32',
      },
      {
        id: 'm-2',
        role: 'assistant',
        content: 'Vou revisar a documentação do console e a documentação pública, identificar a origem dos bugs, corrigir a implementação e o conteúdo, rodar as verificações do projeto e só então enviar as alterações para o repositório.',
        timestamp: '16:32',
        thinkingProcess: `1. Analisar estrutura da documentação Markdown e endpoints OpenAPI/REST.
2. Identificar parâmetros mal formatados e URLs com inconsistências de rotas.
3. Executar validação no sandbox E2B para rodar scripts de teste de endpoints.
4. Ajustar cabeçalhos, schemas de resposta JSON e autenticação Bearer nos exemplos.
5. Rodar build e testes de linting antes de finalizar.`,
        steps: [
          {
            id: 's-1',
            title: 'Fazer a clonagem do usuário',
            description: 'Clonagem do repositório no ambiente de sandbox isolado E2B com autenticação segura.',
            status: 'completed',
            toolCall: {
              toolName: 'e2b_sandbox_bash',
              command: 'git clone https://github.com/user/api-docs-repo.git /workspace/repo',
              stdout: 'Cloning into \'/workspace/repo\'...\nremote: Enumerating objects: 142, done.\nremote: Total 142 (delta 42), reused 120 (delta 30)\nReceiving objects: 100% (142/142), 48.20 KiB | 1.40 MiB/s, done.',
              executionTimeMs: 420,
            },
          },
          {
            id: 's-2',
            title: 'Auditar estrutura e identificar os logs de documentação',
            description: 'Auditoria sintática e estrutural dos arquivos markdown e rotas da API.',
            status: 'running',
            toolCall: {
              toolName: 'document_auditor',
              command: 'python -m audit_endpoints --target /workspace/repo/docs',
              stdout: '[AUDIT] 14 endpoints verificados. 3 discrepâncias de rota detectadas em /api/v1/auth e /api/v1/billing.',
              executionTimeMs: 650,
            },
          },
          {
            id: 's-3',
            title: 'Substituir a documentação Markdown pública por uma referência REST profissional, completa e ativa',
            description: 'Gerar documentação interativa compatível com Swagger/OpenAPI 3.1 com exemplos curl e TypeScript.',
            status: 'pending',
          },
          {
            id: 's-4',
            title: 'Rodar validações e corrigir erros encontrados',
            description: 'Executar suíte de testes de integração e validação de schema.',
            status: 'pending',
          },
          {
            id: 's-5',
            title: 'Entregar resumo das alterações e verificações',
            description: 'Produzir relatório final de conformidade e commit das correções.',
            status: 'pending',
          },
        ],
      },
    ],
    artifacts: [],
  },
  {
    id: 'task-past-2',
    title: 'Criação de Plataforma com 50 Designs Profissionais',
    iconType: 'sparkles',
    status: 'completed',
    createdAt: 'Ontem, 13:39',
    modelUsed: 'Manus 1.6 Pro',
    totalSteps: 4,
    currentStep: 4,
    messages: [
      {
        id: 'm-3',
        role: 'user',
        content: 'Crie uma plataforma completa com 50 designs profissionais de interface para web e mobile.',
        timestamp: 'Ontem, 13:35',
      },
      {
        id: 'm-4',
        role: 'assistant',
        content: 'Plataforma criada com sucesso! Estruturei 50 componentes e telas organizadas em categorias com pré-visualização interativa e exportação de código.',
        timestamp: 'Ontem, 13:39',
      },
    ],
    artifacts: [INITIAL_ARTIFACTS[0]],
  },
  {
    id: 'task-past-3',
    title: 'Jogo Clássico da Cobrinha com Tema de Jardim Zen',
    iconType: 'game',
    status: 'completed',
    createdAt: 'Ontem, 12:50',
    modelUsed: 'Manus 1.6',
    totalSteps: 3,
    currentStep: 3,
    messages: [
      {
        id: 'm-5',
        role: 'user',
        content: 'Crie um jogo da cobrinha em HTML5 Canvas com tema de lago zen de carpas japonesas.',
        timestamp: 'Ontem, 12:45',
      },
      {
        id: 'm-6',
        role: 'assistant',
        content: 'Jogo Koi Zen Snake implementado com física fluida, controles por teclado e animações suaves!',
        timestamp: 'Ontem, 12:50',
      },
    ],
    artifacts: [INITIAL_ARTIFACTS[1]],
  },
  {
    id: 'task-past-4',
    title: 'Simulador de Drone Realista com Modelos DJI e Genéricos',
    iconType: 'drone',
    status: 'completed',
    createdAt: '6 de jul.',
    modelUsed: 'Manus 1.6 Pro',
    totalSteps: 4,
    currentStep: 4,
    messages: [
      {
        id: 'm-7',
        role: 'user',
        content: 'Construa um simulador de voo de drone com HUD de telemetria DJI, controle de vento e física de gravidade.',
        timestamp: '6 de jul., 10:00',
      },
      {
        id: 'm-8',
        role: 'assistant',
        content: 'Simulador DJI Mavic 3 Pro pronto com HUD completo e controles interativos em tempo real.',
        timestamp: '6 de jul., 10:15',
      },
    ],
    artifacts: [INITIAL_ARTIFACTS[2]],
  },
  {
    id: 'task-past-5',
    title: 'App de Investimento com IA e Suporte...',
    iconType: 'database',
    status: 'completed',
    createdAt: '4 de jul.',
    modelUsed: 'Gemini 3.7 Flash',
    messages: [],
    artifacts: [],
  },
  {
    id: 'task-past-6',
    title: 'What Is CloOne?',
    iconType: 'doc',
    status: 'completed',
    createdAt: '2 de jul.',
    modelUsed: 'Manus 1.6',
    messages: [],
    artifacts: [],
  },
  {
    id: 'task-past-7',
    title: 'Creating a Title',
    iconType: 'doc',
    status: 'completed',
    createdAt: '1 de jul.',
    modelUsed: 'Manus 1.6',
    messages: [],
    artifacts: [],
  },
];
