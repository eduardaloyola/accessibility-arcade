let pontuacao = 0;
const fasesConcluidas = new Set();
const totalFases = 6;

// Função executada ao clicar no botão da tela inicial
function iniciarJogo() {
    // 1. Esconde a tela de introdução
    document.getElementById('intro-screen').style.display = 'none';
    // 2. Torna visível o container do jogo
    document.getElementById('game-container').style.display = 'block';
    
    // 3. Inicializa e inicia a música de fundo obrigatoriamente
    initAudio();
    if (audioCtx && !isPlaying) {
        isPlaying = true;
        tocarMusica();
        loopInterval = setInterval(tocarMusica, 3600);
        document.getElementById('music-btn').innerText = "🎵 TRILHA SONORA: ON";
    }
}

function atualizarHUD() {
    document.getElementById('score-val').innerText = String(pontuacao).padStart(4, '0');
    document.getElementById('progress-val').innerText = `${fasesConcluidas.size}/${totalFases}`;
    
    if (fasesConcluidas.size === totalFases) {
        document.getElementById('status-val').innerText = "VICTORY!";
        document.getElementById('status-val').style.color = "var(--success-green)";
    }
}

function mostrarPanel(msg, tipo) {
    const panel = document.getElementById('fb-panel');
    document.getElementById('fb-text').innerText = msg;
    panel.className = 'feedback-panel active ' + tipo;
    
    setTimeout(() => { panel.className = 'feedback-panel'; }, 4000);
}

function responderMissao(id, correto, pontos, msg) {
    if (correto) {
        if (!fasesConcluidas.has(id)) {
            pontuacao += pontos;
            fasesConcluidas.add(id);
            atualizarHUD();
        }
        tocarSomMoeda();
        mostrarPanel(`[+${pontos} PTS] ${msg}`, 'success');
    } else {
        tocarSomErro();
        mostrarPanel(msg, 'error');
    }
}

function validarLaboratorio1() {
    const code = document.getElementById('code').value;
    if (/alt\s*=\s*['"].*?['"]/.test(code)) {
        responderMissao('m3', true, 200, 'SISTEMA ATUALIZADO! Atributo "alt" inserido com sucesso.');
    } else {
        responderMissao('m3', false, 0, 'FALHA NA COMPILAÇÃO! Adicione alt="..." para dar voz à imagem.');
    }
}

function gerarRelatorio() {
    const c1 = document.getElementById('chk1').checked;
    const c2 = document.getElementById('chk2').checked;
    const c3 = document.getElementById('chk3').checked;

    if (c1 && c2 && c3) {
        responderMissao('m4', true, 200, 'SCAN COMPLETO! Todos os vetores críticos de barreira foram mapeados.');
    } else {
        responderMissao('m4', false, 0, 'SCAN INCOMPLETO! Deixar critérios de fora gera falhas de segurança.');
    }
}

function validarLaboratorio2() {
    const code = document.getElementById('code-table').value.toLowerCase();
    const ocorrenciasScope = (code.match(/scope\s*=\s*['"]col['"]/g) || []).length;
    
    if (ocorrenciasScope >= 2) {
        responderMissao('m5', true, 200, 'STAGE CLEAR! O escopo de coluna ajuda leitores a ler tabelas de forma linear.');
    } else {
        responderMissao('m5', false, 0, 'SINTAXE REJEITADA! Adicione scope="col" nas tags th.');
    }
}

// Minigame Bônus
const bugsResolvidos = { header: false, img: false, contrast: false };

function corrigirBug(tipo, elemento) {
    if (tipo === 'header' && !bugsResolvidos.header) {
        bugsResolvidos.header = true;
        elemento.innerHTML = '<h2 style="margin:0; color:var(--success-green); font-size:1.1rem;">✅ ORDEM CORRIGIDA (H1 -> H2)</h2>';
        tocarSomMoeda();
    } else if (tipo === 'img' && !bugsResolvidos.img) {
        bugsResolvidos.img = true;
        elemento.innerHTML = '<span style="display:inline-block; background: #222; padding: 5px 15px; border: 2px solid var(--success-green); color:var(--success-green); font-size:0.8rem;">✅ Alt text Injetado</span>';
        tocarSomMoeda();
    } else if (tipo === 'contrast' && !bugsResolvidos.contrast) {
        bugsResolvidos.contrast = true;
        elemento.querySelector('p').style.color = "var(--text-light)";
        elemento.querySelector('p').innerText = "✅ CONTRASTE CORRIGIDO (4.5:1)";
        tocarSomMoeda();
    }

    if (bugsResolvidos.header && bugsResolvidos.img && bugsResolvidos.contrast) {
        const btn = document.getElementById('btn-bonus');
        btn.removeAttribute('disabled');
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    }
}

function validarBonus() {
    if (!fasesConcluidas.has('m6')) {
        pontuacao += 200;
        fasesConcluidas.add('m6');
        atualizarHUD();
    }
    
    tocarSomVitoria();
    
    document.getElementById('game-stages').style.display = 'none';
    document.getElementById('final-score').innerText = String(pontuacao).padStart(4, '0');
    document.getElementById('victory-panel').style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}




let audioCtx = null;
let loopInterval = null;
let isPlaying = false;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

const pacmanNotes = [
    {f: 246.94, d: 0.12}, {f: 493.88, d: 0.12}, {f: 369.99, d: 0.12}, {f: 311.13, d: 0.12}, {f: 493.88, d: 0.06}, {f: 369.99, d: 0.06}, {f: 311.13, d: 0.24},
    {f: 261.63, d: 0.12}, {f: 523.25, d: 0.12}, {f: 392.00, d: 0.12}, {f: 329.63, d: 0.12}, {f: 523.25, d: 0.06}, {f: 392.00, d: 0.06}, {f: 329.63, d: 0.24},
    {f: 246.94, d: 0.12}, {f: 493.88, d: 0.12}, {f: 369.99, d: 0.12}, {f: 311.13, d: 0.12}, {f: 493.88, d: 0.06}, {f: 369.99, d: 0.06}, {f: 311.13, d: 0.24},
    {f: 311.13, d: 0.06}, {f: 329.63, d: 0.06}, {f: 349.23, d: 0.06}, {f: 349.23, d: 0.06}, {f: 369.99, d: 0.06}, {f: 392.00, d: 0.06}, {f: 415.30, d: 0.12}, {f: 493.88, d: 0.24}
];

function tocarMusica() {
    if (!isPlaying) return;
    let tempoAcumulado = audioCtx.currentTime + 0.05;
    
    pacmanNotes.forEach(nota => {
        let osc = audioCtx.createOscillator();
        let gainNode = audioCtx.createGain();
        
        osc.type = 'triangle'; 
        osc.frequency.setValueAtTime(nota.f, tempoAcumulado);
        
        gainNode.gain.setValueAtTime(0.08, tempoAcumulado);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, tempoAcumulado + nota.d - 0.01);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start(tempoAcumulado);
        osc.stop(tempoAcumulado + nota.d);
        
        tempoAcumulado += nota.d;
    });
}

function toggleMusic() {
    initAudio();
    const btn = document.getElementById('music-btn');
    
    if (!isPlaying) {
        isPlaying = true;
        btn.innerText = "🎵 TRILHA SONORA: ON";
        tocarMusica();
        loopInterval = setInterval(tocarMusica, 3600); 
    } else {
        isPlaying = false;
        btn.innerText = "🎵 TRILHA SONORA: OFF";
        clearInterval(loopInterval);
    }
}

function tocarSomMoeda() {
    if (!audioCtx) return;
    let t = audioCtx.currentTime;
    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, t);
    osc.frequency.setValueAtTime(1318.51, t + 0.08);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(t); osc.stop(t + 0.3);
}

function tocarSomErro() {
    if (!audioCtx) return;
    let t = audioCtx.currentTime;
    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.linearRampToValueAtTime(70, t + 0.2);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(t); osc.stop(t + 0.25);
}

function tocarSomVitoria() {
    if (!audioCtx) return;
    let t = audioCtx.currentTime;
    let acordes = [523.25, 659.25, 783.99, 1046.50];
    acordes.forEach((f, i) => {
        let osc = audioCtx.createOscillator();
        let gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t + (i * 0.15));
        gain.gain.setValueAtTime(0.07, t + (i * 0.15));
        gain.gain.exponentialRampToValueAtTime(0.0001, t + (i * 0.15) + 0.5);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(t + (i * 0.15)); osc.stop(t + (i * 0.15) + 0.5);
    });
}

