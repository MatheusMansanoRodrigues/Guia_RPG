// Torchlight Effect
document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', `${x}%`);
    document.body.style.setProperty('--mouse-y', `${y}%`);
});

// Particles.js Initialization
if (window.particlesJS) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#daa520" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 1, "direction": "top", "random": true, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } },
        "retina_detect": true
    });
}

// Typewriter Effect
function typeWriter(element, html, speed = 20) {
    element.innerHTML = '';
    let i = 0;
    let isTag = false;
    let text = html;

    function type() {
        if (i < text.length) {
            let char = text.charAt(i);
            if (char === '<') isTag = true;
            if (char === '>') isTag = false;

            element.innerHTML = text.substring(0, i + 1);
            i++;

            if (isTag) {
                type();
            } else {
                setTimeout(type, speed);
            }
        }
    }
    type();
}

const storyResult = document.getElementById('storyResult');
const npcResult = document.getElementById('npcResult');
const hookResult = document.getElementById('hookResult');
const plannerOutput = document.getElementById('plannerOutput');

// Conteúdo dinâmico por sistema (preenchido ao carregar conteudo_sistemas.json)
let conteudoData = { default: {} };
let geradoresData = {};
let currentGeradores = null;
let currentFortuna = null;
let currentPlannerTextos = null;

const storyPlaces = [
    'uma cidade élfica cercada por névoa eterna',
    'um reino anão dividido por guerra civil nas montanhas',
    'uma floresta onde fadas e o tempo se comportam de forma estranha',
    'uma ilha que surge apenas em noites sem lua, habitada por gnomos',
    'um vilarejo humano construído sobre ruínas esquecidas de elfos',
    'um império que proibiu toda forma de magia e exilou as fadas',
    'uma fortaleza anã abandonada nas profundezas da terra',
    'um círculo de cogumelos onde o reino das fadas se abre',
    'uma torre de gnomos repleta de engrenagens e artefatos estranhos',
    'um reino onde elfos e anões tentam uma paz frágil',
    'uma costa habitada por tritões e sereias',
    'uma planície onde centauros e humanos disputam território'
];

const storyProblems = [
    'pessoas estão desaparecendo sem deixar rastros — como se as fadas as tivessem levado',
    'um artefato élfico antigo começou a alterar a realidade ao redor',
    'os mortos passaram a sussurrar segredos proibidos nas ruínas anãs',
    'um culto está recrutando inocentes para um ritual que invocará algo antigo',
    'um rei governa mesmo depois da própria morte, sustentado por magia sombria',
    'um portal para o reino das fadas foi aberto embaixo do templo central',
    'gnomos inventaram uma máquina que está drenando a magia da região',
    'uma guerra iminente entre elfos da floresta e anões das montanhas',
    'dragões adormecidos estão despertando em cavernas esquecidas',
    'as fadas trocaram crianças humanas por changelings'
];

const storyVillains = [
    'um sacerdote élfico corrompido que traiu seu povo',
    'uma criatura ancestral aprisionada pelos antigos anões',
    'um nobre que fez pacto com a Rainha das Fadas',
    'uma rainha manipulada por visões proféticas de um oráculo gnomo',
    'um mago que quer reescrever a história e apagar as raças antigas',
    'um general anão que deseja provocar o caos para unir seu povo',
    'uma fada anciã que considera os mortais brinquedos',
    'um gnomo que perdeu a sanidade em seus experimentos',
    'um dragão que manipula reis como marionetes'
];

const storyTwists = [
    'o verdadeiro inimigo é um aliado próximo do grupo — talvez um elfo ou gnomo',
    'o vilão acredita genuinamente que está salvando o mundo das outras raças',
    'um dos personagens tem ligação direta com o problema — sangue élfico ou anão',
    'a ameaça foi criada por um erro dos próprios heróis do passado',
    'a cidade inteira já está sob efeito de uma ilusão das fadas',
    'a solução exige sacrificar algo importante — ou fazer um pacto com uma fada',
    'o "vilão" é na verdade um anão ou elfo tentando impedir algo pior',
    'as fadas estão testando os heróis para um propósito maior'
];

const npcRaces = { 'elfo': 'elf.png', 'anão': 'dwarf.png', 'gnomo': 'gnome.png', 'humano': 'human.png', 'meio-elfo': 'half-elf.png', 'meio-orc': 'half-orc.png', 'fada': 'fairy.png', 'halfling': 'halfling.png' };

const npcNames = [
    'Eldric', 'Mira', 'Thoran', 'Selene', 'Varik', 'Liora',
    'Darian', 'Nyx', 'Alaric', 'Bruna', 'Caelan', 'Ishara',
    'Gimrik', 'Faelwen', 'Bodric', 'Tinker', 'Glitter', 'Stonefist'
];

const npcTraits = [
    'fala muito baixo e observa tudo como um elfo ancião',
    'ri em momentos inadequados — talvez influência das fadas',
    'tem um olhar cansado e desconfiado de quem viu muitas guerras',
    'é educado demais para parecer natural',
    'sempre carrega um objeto antigo consigo — runa anã ou artefato élfico',
    'muda de humor quando alguém menciona o passado',
    'fala em rimas como se estivesse sob encantamento',
    'tem mãos calejadas de ferreiro ou engrenagens de gnomo',
    'sussurra consigo mesmo em uma língua antiga'
];

const npcSecrets = [
    'trabalha secretamente para um grupo rival',
    'viu algo terrível nas profundezas e esconde a verdade',
    'é herdeiro de uma linhagem élfica ou anã proibida',
    'roubou um artefato das fadas anos atrás',
    'está tentando impedir uma profecia gnômica',
    'já serviu ao vilão da campanha',
    'é um changeling — foi trocado por fadas na infância',
    'possui sangue de dragão e não sabe'
];

const npcGoals = [
    'proteger a própria família ou clã',
    'se vingar de alguém poderoso que destruiu sua aldeia',
    'encontrar redenção por um passado sombrio',
    'ficar rico antes de fugir da cidade',
    'descobrir quem realmente é — suas origens são misteriosas',
    'destruir um segredo enterrado nas montanhas anãs',
    'reabrir o portal para o reino das fadas',
    'provar que gnomos podem ser grandes heróis'
];

const hookStarts = [
    'Durante um festival local na praça da vila,',
    'Na primeira noite de viagem pela floresta élfica,',
    'Logo após uma tempestade que pareceu conjurada,',
    'Enquanto descansam em uma taverna frequentada por anões,',
    'Ao cruzarem os portões da cidade,',
    'Durante o enterro de um nobre importante,',
    'Quando um gnomo excêntrico se aproxima da mesa,',
    'Sob o luar, próximo a um círculo de cogumelos,',
    'Dentro das ruínas de uma fortaleza anã abandonada,'
];

const hookEvents = [
    'um elfo misterioso entrega ao grupo um mapa incompleto',
    'uma criança aparece coberta de sangue — ou pó de fada — pedindo ajuda',
    'os sinos do templo tocam sozinhos em uma melodia antiga',
    'um corpo cai do céu diante de todos',
    'uma figura mascarada chama os heróis pelo nome',
    'um incêndio revela uma passagem subterrânea para as minas anãs',
    'uma fada aparece e oferece um pacto perigoso',
    'um gnomo entrega uma caixa que não deve ser aberta',
    'runas élficas começam a brilhar nas paredes'
];

const hookComplications = [
    'e guardas chegam acusando os aventureiros',
    'mas ninguém além deles parece notar o problema — como se fosse ilusão',
    'enquanto uma antiga runa anã começa a brilhar',
    'e um aliado desaparece no meio da confusão',
    'mas o evento já havia sido previsto em uma profecia élfica',
    'e tudo isso acontece exatamente onde eles deveriam estar',
    'e as fadas observam de longe, rindo',
    'enquanto túneis gnômicos se abrem nas paredes'
];

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

document.getElementById('generateStoryBtn').addEventListener('click', function () {
    const g = currentGeradores || {};
    const places = g.storyPlaces || storyPlaces;
    const problems = g.storyProblems || storyProblems;
    const villains = g.storyVillains || storyVillains;
    const twists = g.storyTwists || storyTwists;
    const story = `
        <strong>Cenário:</strong> Em ${pick(places)}.<br>
        <strong>Problema:</strong> ${pick(problems)}.<br>
        <strong>Antagonista:</strong> Por trás disso está ${pick(villains)}.<br>
        <strong>Reviravolta:</strong> No entanto, ${pick(twists)}.
      `;
    typeWriter(storyResult, story);
});

document.getElementById('generateNpcBtn').addEventListener('click', function () {
    const g = currentGeradores || {};

    const racesObj = g.npcRaces || npcRaces;
    const namesArr = g.npcNames || npcNames;
    const traitsArr = g.npcTraits || npcTraits;
    const secretsArr = g.npcSecrets || npcSecrets;
    const goalsArr = g.npcGoals || npcGoals;

    const race = pick(Object.keys(racesObj));
    const img = racesObj[race];
    const name = pick(namesArr);
    const trait = pick(traitsArr);
    const secret = pick(secretsArr);
    const goal = pick(goalsArr);

    const showImage = img && img.trim() !== "";

    const npc = `
        ${showImage ? `
        <div style="text-align:center; margin-bottom: 15px;">
            <img src="imgs/${img}" alt="${race}" style="width: 150px; height: 150px; border: 2px solid var(--gold); border-radius: 50%;">
        </div>` : ""}
        <strong>Nome:</strong> ${name}<br>
        <strong>Perfil:</strong> ${race}<br>
        <strong>Traço:</strong> ${trait}.<br>
        <strong>Segredo:</strong> ${secret}.<br>
        <strong>Objetivo:</strong> ${goal}.
    `;

    typeWriter(npcResult, npc);
});

document.getElementById('generateHookBtn').addEventListener('click', function () {
    const g = currentGeradores || {};
    const starts = g.hookStarts || hookStarts;
    const events = g.hookEvents || hookEvents;
    const complications = g.hookComplications || hookComplications;
    const hook = `
        ${pick(starts)} ${pick(events)}, ${pick(complications)}.
      `;
    typeWriter(hookResult, hook);
});


const tips = document.querySelectorAll('.tip');
tips.forEach(tip => {
    tip.querySelector('.tip-btn').addEventListener('click', () => {
        tip.classList.toggle('active');
    });
});

const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
let progressTextTemplate = 'da sessão preparada — o pergaminho aguarda';
let progressCompleteTemplate = 'O pergaminho está completo! Pronto para a aventura!';

function updateProgress() {
    const checks = document.querySelectorAll('.session-check');
    const total = checks.length;
    const checked = document.querySelectorAll('.session-check:checked').length;
    const percent = Math.round((checked / total) * 100);

    if (progressFill) progressFill.style.width = percent + '%';
    if (progressText) {
        progressText.textContent = percent === 100
            ? `100% — ${progressCompleteTemplate}`
            : `${percent}% ${progressTextTemplate}`;
    }
}

const checks = document.querySelectorAll('.session-check');
checks.forEach(check => check.addEventListener('change', updateProgress));

document.getElementById('planSessionBtn').addEventListener('click', function () {
    const theme = document.getElementById('themeInput').value.trim() || 'um mistério antigo';
    const tone = document.getElementById('toneSelect').value;

    const pt = currentPlannerTextos;
    const replaceTheme = (s) => (s || '').replace(/\{\{theme\}\}/g, theme);

    const openings = pt?.openings ? {
        sombrio: replaceTheme(pt.openings.sombrio),
        epico: replaceTheme(pt.openings.epico),
        misterioso: replaceTheme(pt.openings.misterioso),
        leve: replaceTheme(pt.openings.leve)
    } : {
        sombrio: `Os heróis chegam em meio a sinais perturbadores ligados a ${theme}.`,
        epico: `Uma grande ameaça envolvendo ${theme} começa a se espalhar.`,
        misterioso: `Pistas desconexas sobre ${theme} surgem em locais improváveis.`,
        leve: `Uma aventura inesperada relacionada a ${theme} convida o grupo.`
    };

    const middle = pt?.middle ? {
        sombrio: pt.middle.sombrio,
        epico: pt.middle.epico,
        misterioso: pt.middle.misterioso,
        leve: pt.middle.leve
    } : {
        sombrio: 'No desenvolvimento, eles descobrem segredos e alguém manipulando tudo nas sombras.',
        epico: 'No meio da sessão, o grupo enfrenta desafios maiores. Uma decisão crucial os aguarda.',
        misterioso: 'No desenvolvimento, cada resposta abre novas dúvidas.',
        leve: 'No meio da aventura, surgem confusões e obstáculos criativos.'
    };

    const ending = pt?.ending ? {
        sombrio: pt.ending.sombrio,
        epico: pt.ending.epico,
        misterioso: pt.ending.misterioso,
        leve: pt.ending.leve
    } : {
        sombrio: 'No final, uma revelação cruel muda a visão do grupo.',
        epico: 'No final, os heróis impedem uma catástrofe parcial, mas uma ameaça maior se ergue.',
        misterioso: 'No final, uma pista decisiva aparece. O mistério aprofunda-se.',
        leve: 'No final, o grupo resolve o problema e encontra algo curioso para a próxima campanha.'
    };

    plannerOutput.innerHTML = `
        <div class="planner-block"><strong>Início:</strong> ${openings[tone] || openings.sombrio}</div>
        <div class="planner-block"><strong>Meio:</strong> ${middle[tone] || middle.sombrio}</div>
        <div class="planner-block"><strong>Fim:</strong> ${ending[tone] || ending.sombrio}</div>
      `;
});

document.getElementById('sendMessageBtn').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    const contactResult = document.getElementById('contactResult');

    if (!name || !message) {
        contactResult.innerHTML = '<strong>Erro:</strong> preencha seu nome e sua mensagem para testar o formulário.';
        return;
    }

    contactResult.innerHTML = `<strong>Mensagem enviada com sucesso!</strong><br>Obrigado, ${name}. Sua dúvida foi registrada no exemplo do site.`;
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuToggle.textContent = menu.classList.contains('active') ? '✕' : '☰';
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        menuToggle.textContent = '☰';
    });
});

// Race Cards Mobile Toggle
const raceCards = document.querySelectorAll('.race-card');
raceCards.forEach(card => {
    card.addEventListener('click', () => {
        // Toggle current card, close others
        raceCards.forEach(c => {
            if (c !== card) c.classList.remove('active');
        });
        card.classList.toggle('active');
    });
});

// Dice Roller — Oráculo dos Dados
const FORTUNA_CRIT = [
    'Os deuses sorriem para você!', 'O destino te escolheu!', 'A sorte dos heróis está com você!',
    'As runas antigas se alinham!', 'O vento carrega sua vitória!', 'Até as fadas aplaudem!'
];
const FORTUNA_FUMBLE = [
    'O destino conspira...', 'Até os heróis tropeçam.', 'A sorte virou as costas.',
    'As runas sussurram cautela.', 'O próximo capítulo será melhor.', 'A mesa espera sua redenção.'
];
const FORTUNA_NORMAL = [
    'O dado rola, a história continua.', 'A sorte está no ar.', 'O pergaminho aguarda.',
    'Que os dados decidam.', 'O destino ainda não revelou tudo.', 'A aventura continua.'
];

function rollDie(faces) {
    return Math.floor(Math.random() * faces) + 1;
}

function createParticles(x, y, color = '#daa520', count = 30) {
    for (let i = 0; i < count; i++) {
        const dx = (Math.random() - 0.5) * 200;
        const dy = (Math.random() - 0.5) * 200 - 50;
        const p = document.createElement('div');
        p.className = 'dice-particle';
        p.style.cssText = `
            position: fixed; left: ${x}px; top: ${y}px; width: 6px; height: 6px;
            background: ${color}; border-radius: 50%; pointer-events: none; z-index: 10002;
        `;
        document.body.appendChild(p);
        p.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
        ], { duration: 800, easing: 'ease-out' }).onfinish = () => p.remove();
    }
}

function createDiceRoller() {
    const wrapper = document.createElement('div');
    wrapper.id = 'dice-roller-wrapper';
    wrapper.innerHTML = `
        <button type="button" id="dice-roller-btn" class="dice-btn" aria-label="Abrir oráculo dos dados">
            <span class="dice-icon">✦</span>
            <span class="dice-label">Dados</span>
        </button>
        <div id="dice-panel" class="dice-panel">
            <div class="dice-panel-header">
                <span class="dice-panel-title">Oráculo dos Dados</span>
                <button type="button" class="dice-close" aria-label="Fechar">×</button>
            </div>
            <div class="dice-presets">
                <button type="button" data-roll="1d20">d20</button>
                <button type="button" data-roll="2d6">2d6</button>
                <button type="button" data-roll="3d6">3d6</button>
                <button type="button" data-roll="1d100">d100</button>
            </div>
            <div class="dice-custom">
                <input type="number" id="dice-count" min="1" max="10" value="1" />
                <span>d</span>
                <select id="dice-type">
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="20" selected>20</option>
                </select>
                <span>+</span>
                <input type="number" id="dice-mod" min="-20" max="20" value="0" />
            </div>
            <button type="button" id="dice-roll-btn" class="dice-roll-main">Rolar</button>
            <div id="dice-result-area" class="dice-result-area">
                <div id="dice-value" class="dice-value"></div>
                <div id="dice-fortuna" class="dice-fortuna"></div>
            </div>
        </div>
    `;
    document.body.appendChild(wrapper);

    const btn = document.getElementById('dice-roller-btn');
    const panel = document.getElementById('dice-panel');
    const closeBtn = panel.querySelector('.dice-close');
    const resultArea = document.getElementById('dice-result-area');
    const diceValue = document.getElementById('dice-value');
    const diceFortuna = document.getElementById('dice-fortuna');

    function togglePanel() {
        panel.classList.toggle('open');
        btn.classList.toggle('active', panel.classList.contains('open'));
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePanel();
    });
    closeBtn.addEventListener('click', togglePanel);
    document.addEventListener('click', (e) => {
        if (panel.classList.contains('open') && !wrapper.contains(e.target)) togglePanel();
    });

    function doRoll(notation) {
        const match = notation.match(/(\d+)d(\d+)/);
        const count = match ? parseInt(match[1], 10) : 1;
        const faces = match ? parseInt(match[2], 10) : 20;
        const mod = parseInt(document.getElementById('dice-mod').value, 10) || 0;

        resultArea.classList.add('rolling');
        diceValue.textContent = '...';
        diceFortuna.textContent = '';

        const rolls = [];
        for (let i = 0; i < count; i++) rolls.push(rollDie(faces));
        const total = rolls.reduce((a, b) => a + b, 0) + mod;

        setTimeout(() => {
            resultArea.classList.remove('rolling');
            const display = count > 1
                ? `${rolls.join(' + ')}${mod ? ` + ${mod}` : ''} = ${total}`
                : `${total}${mod ? ` (${rolls[0]} + ${mod})` : ''}`;
            diceValue.textContent = display;
            diceValue.className = 'dice-value';

            const fortunaCrit = (currentFortuna?.crit?.length ? currentFortuna.crit : FORTUNA_CRIT);
            const fortunaFumble = (currentFortuna?.fumble?.length ? currentFortuna.fumble : FORTUNA_FUMBLE);
            const fortunaNormal = (currentFortuna?.normal?.length ? currentFortuna.normal : FORTUNA_NORMAL);
            let fortuna = '';
            if (count === 1 && faces === 20) {
                if (rolls[0] === 20) {
                    diceValue.classList.add('crit');
                    fortuna = fortunaCrit[Math.floor(Math.random() * fortunaCrit.length)];
                    const rect = resultArea.getBoundingClientRect();
                    createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#daa520');
                } else if (rolls[0] === 1) {
                    diceValue.classList.add('fumble');
                    fortuna = fortunaFumble[Math.floor(Math.random() * fortunaFumble.length)];
                } else {
                    fortuna = fortunaNormal[Math.floor(Math.random() * fortunaNormal.length)];
                }
            } else {
                fortuna = fortunaNormal[Math.floor(Math.random() * fortunaNormal.length)];
            }
            diceFortuna.textContent = fortuna;
        }, 800);
    }

    panel.querySelectorAll('.dice-presets button').forEach(b => {
        b.addEventListener('click', () => {
            const [count, faces] = b.dataset.roll.split('d').map(Number);
            document.getElementById('dice-count').value = count;
            document.getElementById('dice-type').value = faces;
            doRoll(b.dataset.roll);
        });
    });

    document.getElementById('dice-roll-btn').addEventListener('click', () => {
        const count = parseInt(document.getElementById('dice-count').value, 10) || 1;
        const faces = parseInt(document.getElementById('dice-type').value, 10) || 20;
        doRoll(`${count}d${faces}`);
    });
}

// ========== SISTEMAS COMO CATEGORIAS - GUIA DINÂMICO ==========
const STORAGE_KEY = 'tomo_sistema_selecionado';
let sistemasData = [];

async function loadConteudoSistemas() {
    try {
        const url = new URL('conteudo_sistemas.json', window.location.href).href;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data === 'object') {
                conteudoData = data;
            }
        }
    } catch (e) {
        console.warn('Conteúdo por sistema não carregado via fetch:', e.message);
    }

    const fallbackEl = document.getElementById('conteudo-sistemas-json');
    if (fallbackEl && (!conteudoData.default?.sabedoria)) {
        try {
            const data = JSON.parse(fallbackEl.textContent);
            if (data && typeof data === 'object') conteudoData = data;
        } catch (err) {
            console.warn('Fallback JSON inválido:', err);
        }
    }
}

async function loadSystems() {
    const grid = document.getElementById('systems-grid');
    if (!grid) return;

    try {
        await Promise.all([
            loadConteudoSistemas(),
            loadGeradores()
        ]);

        const response = await fetch('sistemas.json');
        if (!response.ok) throw new Error('Falha ao carregar sistemas');
        sistemasData = await response.json();

        renderSystemsAsCategories(sistemasData);
        checkInitialView();
    } catch (error) {
        console.error('Erro loading systems:', error);
        grid.innerHTML = '<p class="error">Não foi possível carregar os pergaminhos dos sistemas. Tente novamente mais tarde.</p>';
    }
}

function applyConteudoSistema(conteudoKey) {
    const c = conteudoData[conteudoKey] || conteudoData.default || {};

    // Sabedoria
    if (c.sabedoria) {
        const s = c.sabedoria;
        setText('sabedoria-titulo', s.titulo);
        setText('sabedoria-subtitulo', s.subtitulo);
        setText('sabedoria-lore', s.lore);
        const tipsList = document.getElementById('tips-list');
        if (tipsList && s.tips) {
            tipsList.innerHTML = s.tips.map((t, i) => `
                <div class="tip">
                    <button class="tip-btn">${t.btn}</button>
                    <div class="tip-content">${t.content}</div>
                </div>
            `).join('');
            tipsList.querySelectorAll('.tip').forEach(tip => {
                tip.querySelector('.tip-btn').addEventListener('click', () => tip.classList.toggle('active'));
            });
        }
    }

    // Arte de Contar Histórias
    if (c.arte_historias) {
        const a = c.arte_historias;
        setText('arte-titulo', a.titulo);
        setText('arte-subtitulo', a.subtitulo);
        setText('arte-lore', a.lore);
        const cardsEl = document.getElementById('arte-cards');
        if (cardsEl && a.cards) {
            cardsEl.innerHTML = a.cards.map(card => `
                <div class="card">
                    <span class="tag">${card.tag}</span>
                    <h3>${card.titulo}</h3>
                    <p>${card.conteudo}</p>
                </div>
            `).join('');
        }
    }

    // Oráculo
    if (c.oraculo) {
        const o = c.oraculo;
        setText('oraculo-titulo', o.titulo);
        setText('oraculo-subtitulo', o.subtitulo);
        const btn = document.getElementById('generateStoryBtn');
        if (btn) btn.textContent = o.btn_text || '✦ Conjurar História ✦';
        if (storyResult) storyResult.textContent = o.placeholder || storyResult.textContent;
    }

    // NPC
    if (c.npc) {
        const n = c.npc;
        setText('npc-titulo', n.titulo);
        setText('npc-subtitulo', n.subtitulo);
        const btn = document.getElementById('generateNpcBtn');
        if (btn) btn.textContent = n.btn_text || '✦ Conjurar NPC ✦';
        if (npcResult) npcResult.textContent = n.placeholder || npcResult.textContent;
    }

    // Gancho
    if (c.gancho) {
        const g = c.gancho;
        setText('gancho-titulo', g.titulo);
        setText('gancho-subtitulo', g.subtitulo);
        const btn = document.getElementById('generateHookBtn');
        if (btn) btn.textContent = g.btn_text || '✦ Conjurar Gancho ✦';
        if (hookResult) hookResult.textContent = g.placeholder || hookResult.textContent;
    }

    // Checklist
    if (c.checklist) {
        const ch = c.checklist;
        setText('checklist-titulo', ch.titulo);
        setText('checklist-subtitulo', ch.subtitulo);
        const itemsEl = document.getElementById('checklist-items');
        if (itemsEl && ch.items) {
            itemsEl.innerHTML = ch.items.map(item => `
                <label class="check-item"><input type="checkbox" class="session-check" /> ${item}</label>
            `).join('');
            itemsEl.querySelectorAll('.session-check').forEach(check => check.addEventListener('change', updateProgress));
            updateProgress();
        }
    }

    // Planejador
    if (c.planejador) {
        const p = c.planejador;
        setText('planejador-titulo', p.titulo);
        setText('planejador-subtitulo', p.subtitulo);
        const themeInput = document.getElementById('themeInput');
        if (themeInput && p.theme_placeholder) themeInput.placeholder = p.theme_placeholder;
        progressTextTemplate = p.progress_text || progressTextTemplate;
        progressCompleteTemplate = p.progress_complete || progressCompleteTemplate;
        currentPlannerTextos = p.planner_textos || null;
    } else {
        currentPlannerTextos = null;
    }

    // Fortuna (Oráculo dos Dados)
    currentFortuna = c.fortuna || null;

    // Raças e Criaturas
    if (c.racas) {
        setText('racas-titulo', c.racas.titulo);
        setText('racas-subtitulo', c.racas.subtitulo);
        setText('racas-lore', c.racas.lore);
    }

    // Geradores (para story, hook, npc) - estrutura: { "d20": { "geradores": {...} } }
    const geradoresSistema = geradoresData[conteudoKey] || geradoresData.default;
    currentGeradores = geradoresSistema?.geradores || geradoresSistema || null;

    // Atualizar barra de progresso com os novos templates
    updateProgress();
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text != null) el.textContent = text;
}

function renderSystemsAsCategories(systems) {
    const grid = document.getElementById('systems-grid');
    grid.innerHTML = '';

    systems.forEach(system => {
        const card = document.createElement('div');
        card.className = 'system-card system-card-selectable';
        card.dataset.id = system.id;
        card.dataset.category = system.categoria;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        card.innerHTML = `
            <div class="system-tag">${system.tag}</div>
            <h3>${system.nome}</h3>
            <p>${system.resumo}</p>
            <ul class="system-features">
                ${system.caracteristicas.map(feat => `<li>${feat}</li>`).join('')}
            </ul>
            <span class="system-select-hint">Clique para abrir o guia completo →</span>
        `;

        card.addEventListener('click', () => selectSystem(system.id));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectSystem(system.id);
            }
        });

        grid.appendChild(card);
    });
}

function selectSystem(systemId) {
    const system = sistemasData.find(s => s.id === systemId);
    if (!system) return;

    localStorage.setItem(STORAGE_KEY, systemId);
    showGuia(system);
}

function showGuia(system) {
    const seletor = document.getElementById('seletor-sistemas');
    const guia = document.getElementById('guia-completo');
    const btnTrocar = document.getElementById('btnTrocarSistema');
    const navGuia = document.querySelectorAll('.nav-guia');

    if (seletor) seletor.style.display = 'none';
    if (guia) guia.style.display = 'block';
    if (btnTrocar) btnTrocar.style.display = 'inline-block';
    const navSistemas = document.getElementById('navSistemas');
    if (navSistemas) navSistemas.style.display = 'none';
    navGuia.forEach(el => el.style.display = '');

    // Atualizar título e meta
    document.title = `O Tomo do Mestre — Guia ${system.nome}`;

    const badge = document.getElementById('badge-sistema');
    const titulo = document.getElementById('titulo-guia');
    const desc = document.getElementById('descricao-guia');

    if (badge) badge.textContent = `Guia ${system.tag}`;
    if (titulo) titulo.textContent = `O Tomo do Mestre — ${system.nome}`;
    if (desc) desc.textContent = system.resumo;

    // Preencher essenciais do mestre
    const essenciais = document.getElementById('essenciais-conteudo');
    if (essenciais && system.essenciais_mestre) {
        const e = system.essenciais_mestre;
        let html = '<ul>';
        if (e.mecanica_core) html += `<li><strong>Mecânica core:</strong> ${e.mecanica_core}</li>`;
        if (e.combate) html += `<li><strong>Combate:</strong> ${e.combate}</li>`;
        if (e.progressao) html += `<li><strong>Progressão:</strong> ${e.progressao}</li>`;
        if (e.descanso) html += `<li><strong>Descanso:</strong> ${e.descanso}</li>`;
        if (e.economia_acao) html += `<li><strong>Ações:</strong> ${e.economia_acao}</li>`;
        if (e.falha_critica) html += `<li><strong>Falha crítica:</strong> ${e.falha_critica}</li>`;
        if (e.saude) html += `<li><strong>Saúde:</strong> ${e.saude}</li>`;
        if (e.pontos) html += `<li><strong>Pontos:</strong> ${e.pontos}</li>`;
        if (e.dano) html += `<li><strong>Dano:</strong> ${e.dano}</li>`;
        if (e.aces) html += `<li><strong>Aces:</strong> ${e.aces}</li>`;
        if (e.shaken) html += `<li><strong>Shaken:</strong> ${e.shaken}</li>`;
        if (e.aspectos) html += `<li><strong>Aspectos:</strong> ${e.aspectos}</li>`;
        if (e.consequencias) html += `<li><strong>Consequências:</strong> ${e.consequencias}</li>`;
        if (e.agendas) html += `<li><strong>Agendas:</strong> ${e.agendas}</li>`;
        if (e.moves) html += `<li><strong>Moves:</strong> ${e.moves}</li>`;
        if (e.push) html += `<li><strong>Push:</strong> ${e.push}</li>`;
        if (e.letalidade) html += `<li><strong>Letalidade:</strong> ${e.letalidade}</li>`;
        if (e.sanidade) html += `<li><strong>Sanidade:</strong> ${e.sanidade}</li>`;
        if (e.esforco) html += `<li><strong>Esforço:</strong> ${e.esforco}</li>`;
        if (e.cyphers) html += `<li><strong>Cyphers:</strong> ${e.cyphers}</li>`;
        if (e.dica_mestre) html += `<li class="dica-destaque"><strong>Dica do mestre:</strong> ${e.dica_mestre}</li>`;
        html += '</ul>';
        essenciais.innerHTML = html;
    }

    // Aplicar conteúdo dinâmico (Sabedoria, Arte, Oráculo, NPC, Gancho, Checklist, Planejador)
    const conteudoKey = system.conteudo || 'default';
    applyConteudoSistema(conteudoKey);

    // Scroll suave para o topo do guia
    document.getElementById('hero-guia')?.scrollIntoView({ behavior: 'smooth' });
}

function showSeletor() {
    const seletor = document.getElementById('seletor-sistemas');
    const guia = document.getElementById('guia-completo');
    const btnTrocar = document.getElementById('btnTrocarSistema');
    const navGuia = document.querySelectorAll('.nav-guia');

    localStorage.removeItem(STORAGE_KEY);
    document.title = 'O Tomo do Mestre — Guia Medieval de RPG';

    if (seletor) seletor.style.display = 'block';
    if (guia) guia.style.display = 'none';
    if (btnTrocar) btnTrocar.style.display = 'none';
    const navSistemas = document.getElementById('navSistemas');
    if (navSistemas) navSistemas.style.display = '';
    navGuia.forEach(el => el.style.display = 'none');

    document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
}

function checkInitialView() {
    const savedId = localStorage.getItem(STORAGE_KEY);
    const system = sistemasData.find(s => s.id === savedId);

    if (system) {
        showGuia(system);
    } else {
        const btnTrocar = document.getElementById('btnTrocarSistema');
        const navGuia = document.querySelectorAll('.nav-guia');
        if (btnTrocar) btnTrocar.style.display = 'none';
        navGuia.forEach(el => el.style.display = 'none');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSystems();
    createDiceRoller();

    document.getElementById('btnTrocarSistema')?.addEventListener('click', () => {
        showSeletor();
    });

    // ========== BACKGROUND AUDIO LOGIC ==========
    const bgAudio = document.getElementById('bg-audio');
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = audioToggle?.querySelector('.audio-icon i'); // <i> que recebe as classes Font Awesome

    function updateAudioUI(playing) {
        if (!audioIcon) return;
        audioIcon.classList.remove('fa-volume-xmark', 'fa-guitar');
        if (playing) {
            audioIcon.classList.add('fa-guitar');
            audioToggle?.classList.add('playing');
        } else {
            audioIcon.classList.add('fa-volume-xmark');
            audioToggle?.classList.remove('playing');
        }
    }

    if (bgAudio && audioToggle) {
        bgAudio.volume = 0.15;

        // Se for a primeira vez (null), assumimos que o usuário quer ouvir (false para muted)
        let isMuted = localStorage.getItem('tomo_audio_muted');
        if (isMuted === null) {
            isMuted = 'false';
            localStorage.setItem('tomo_audio_muted', 'false');
        }
        isMuted = isMuted === 'true';

        updateAudioUI(!isMuted); // Estado inicial do ícone

        async function attemptPlay() {
            try {
                await bgAudio.play();
                updateAudioUI(true);
                // Remove listeners de fallback se conseguimos dar o play
                document.removeEventListener('click', attemptPlay);
                document.removeEventListener('scroll', attemptPlay);
            } catch (err) {
                console.log('Autoplay blocked, waiting for interaction.');
                updateAudioUI(false);
            }
        }

        if (!isMuted) {
            // Tenta tocar imediatamente
            attemptPlay();

            // Fallback: se o browser bloqueou o play automático, tenta no primeiro clique ou scroll
            document.addEventListener('click', attemptPlay, { once: true });
            document.addEventListener('scroll', attemptPlay, { once: true });
        } else {
            updateAudioUI(false);
        }

        audioToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita o listener de fallback
            if (bgAudio.paused) {
                bgAudio.play();
                updateAudioUI(true);
                localStorage.setItem('tomo_audio_muted', 'false');
            } else {
                bgAudio.pause();
                updateAudioUI(false);
                localStorage.setItem('tomo_audio_muted', 'true');
            }
        });
    }
});

async function loadGeradores() {
    try {
        const url = new URL('geradores.json', window.location.href).href;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Falha ao carregar geradores.json');

        const data = await res.json();
        if (data && typeof data === 'object') {
            geradoresData = data;
        }
    } catch (e) {
        console.warn('Geradores não carregados via fetch:', e.message);
        geradoresData = {};
    }
}
