const storyResult = document.getElementById('storyResult');
const npcResult = document.getElementById('npcResult');
const hookResult = document.getElementById('hookResult');
const plannerOutput = document.getElementById('plannerOutput');

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

const npcRaces      = {'elfo': 'elf.png', 'anão': 'dwarf.png', 'gnomo': 'gnome.png', 'humano': 'human.png', 'meio-elfo': 'half-elf.png', 'meio-orc': 'half-orc.png', 'fada': 'fairy.png', 'halfling': 'halfling.png'};

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
    const story = `
        <strong>Cenário:</strong> Em ${pick(storyPlaces)}.<br>
        <strong>Problema:</strong> ${pick(storyProblems)}.<br>
        <strong>Antagonista:</strong> Por trás disso está ${pick(storyVillains)}.<br>
        <strong>Reviravolta:</strong> No entanto, ${pick(storyTwists)}.
      `;
    storyResult.innerHTML = story;
});

document.getElementById('generateNpcBtn').addEventListener('click', function () {

    const race = pick(Object.keys(npcRaces));
    const img = npcRaces[race];

    const name = pick(npcNames);
    const trait = pick(npcTraits);
    const secret = pick(npcSecrets);
    const goal = pick(npcGoals);

    const npc = `
        <img src="imgs/${img}" alt="${race}" style="width: 200px; height: 200px;">
        <strong>Nome:</strong> ${name}<br>
        <strong>Raça:</strong> ${race}<br>
        <strong>Traço:</strong> ${trait}.<br>
        <strong>Segredo:</strong> ${secret}.<br>
        <strong>Objetivo:</strong> ${goal}.
    `;

    npcResult.innerHTML = npc;
});

document.getElementById('generateHookBtn').addEventListener('click', function () {
    const hook = `
        ${pick(hookStarts)} ${pick(hookEvents)}, ${pick(hookComplications)}.
      `;
    hookResult.innerHTML = hook;
});

const tips = document.querySelectorAll('.tip');
tips.forEach(tip => {
    tip.querySelector('.tip-btn').addEventListener('click', () => {
        tip.classList.toggle('active');
    });
});

const checks = document.querySelectorAll('.session-check');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

function updateProgress() {
    const total = checks.length;
    const checked = document.querySelectorAll('.session-check:checked').length;
    const percent = Math.round((checked / total) * 100);

    progressFill.style.width = percent + '%';
    progressText.textContent = percent === 100 ? '100% — O pergaminho está completo! Pronto para a aventura!' : percent + '% da sessão preparada — o pergaminho aguarda';
}

checks.forEach(check => check.addEventListener('change', updateProgress));

document.getElementById('planSessionBtn').addEventListener('click', function () {
    const theme = document.getElementById('themeInput').value.trim() || 'um mistério antigo';
    const tone = document.getElementById('toneSelect').value;

    const openings = {
        sombrio: `Os heróis chegam em meio a sinais perturbadores ligados a ${theme} — talvez runas antigas, sussurros nas ruínas élficas ou um aviso deixado por um anão moribundo.`,
        epico: `Uma grande ameaça envolvendo ${theme} começa a se espalhar pelo reino. Elfos, anões e humanos precisarão unir forças — ou perecer separados.`,
        misterioso: `Pistas desconexas sobre ${theme} surgem em locais improváveis: uma taverna de gnomos, um círculo de fadas na floresta, as profundezas das minas anãs.`,
        leve: `Uma aventura inesperada relacionada a ${theme} convida o grupo a sair da rotina — talvez um gnomo precise de ajuda ou uma fada ofereça um desafio divertido.`
    };

    const middle = {
        sombrio: `No desenvolvimento, eles descobrem sacrifícios antigos, segredos enterrados nas montanhas anãs e alguém — talvez um elfo corrompido ou uma fada caprichosa — manipulando tudo nas sombras.`,
        epico: `No meio da sessão, o grupo enfrenta desafios maiores: talvez um dragão, uma guerra entre raças ou um artefato élfico de poder imenso. Uma decisão crucial os aguarda.`,
        misterioso: `No desenvolvimento, cada resposta abre novas dúvidas. Um aliado — elfo, gnomo ou humano — pode estar escondendo parte da verdade. As fadas observam e sussurram.`,
        leve: `No meio da aventura, surgem confusões hilárias, rivais carismáticos (um anão orgulhoso? um gnomo excêntrico?) e obstáculos criativos que mantêm o ritmo divertido.`
    };

    const ending = {
        sombrio: `No final, uma revelação cruel muda a visão do grupo — talvez sobre as fadas, os elfos ou o verdadeiro custo da magia. Um gancho pesado aguarda a próxima sessão.`,
        epico: `No final, os heróis impedem uma catástrofe parcial, mas percebem que isso era apenas o começo. Uma ameaça maior se ergue no horizonte — e as raças antigas precisarão deles.`,
        misterioso: `No final, uma pista decisiva aparece, mas o principal suspeito some sem deixar rastros — como se as fadas o tivessem levado. O mistério aprofunda-se.`,
        leve: `No final, o grupo resolve o problema imediato, mas encontra algo curioso — um portal élfico, um artefato gnômico, uma mensagem das fadas — que pode virar uma grande campanha.`
    };

    plannerOutput.innerHTML = `
        <div class="planner-block"><strong>Início:</strong> ${openings[tone]}</div>
        <div class="planner-block"><strong>Meio:</strong> ${middle[tone]}</div>
        <div class="planner-block"><strong>Fim:</strong> ${ending[tone]}</div>
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