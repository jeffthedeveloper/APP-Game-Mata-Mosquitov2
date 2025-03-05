let altura = window.innerHeight;
let largura = window.innerWidth;
let vidas = 1;
let tempo = 15;
let criaMosquitoTempo = 1500;

const mosquitoBuzz = document.getElementById('mosquitoBuzz');
const mosquitoDeath = document.getElementById('mosquitoDeath');
const impactSound = document.getElementById('impactSound');

function ajustaTamanhoPalcoJogo() {
	largura = window.innerWidth;
	altura = window.innerHeight;
	console.log(largura, altura);
}

window.onresize = ajustaTamanhoPalcoJogo;

ajustaTamanhoPalcoJogo();

const nivel = window.location.search.replace('?', '');

if (nivel === 'normal') {
	criaMosquitoTempo = 1500;
} else if (nivel === 'dificil') {
	criaMosquitoTempo = 1000;
} else if (nivel === 'chucknorris') {
	criaMosquitoTempo = 750;
}

const cronometro = setInterval(() => {
	tempo -= 1;

	if (tempo < 0) {
		clearInterval(cronometro);
		clearInterval(criaMosquinhas);
		window.location.href = 'vitoria.html';
	} else {
		document.getElementById('cronometro').innerHTML = tempo;
	}
}, 1000);

// Adicionado evento de 'loadeddata' para garantir que o mosquitoBuzz esteja pronto
mosquitoBuzz.addEventListener('loadeddata', () => {
	console.log('mosquitoBuzz carregado');
});

function posicaoRandomica() {
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove();

		if (vidas > 3) {
			window.location.href = 'fim_de_jogo.html';
		} else {
			document.getElementById(`v${vidas}`).src = "imagens/coracao_vazio.png";
			vidas++;
		}
	}

	let posicaoX = Math.max(0, Math.floor(Math.random() * largura) - 90);
	let posicaoY = Math.max(0, Math.floor(Math.random() * altura) - 90);

	console.log(posicaoX, posicaoY);

	const criaMosquito = () => {
		const mosquito = document.createElement('img');
		mosquito.src = 'imagens/mosquito.png';
		mosquito.classList.add(tamanhoAleatorio(), ladoAleatorio());
		mosquito.style.left = `${posicaoX}px`;
		mosquito.style.top = `${posicaoY}px`;
		mosquito.style.position = 'absolute';
		mosquito.id = 'mosquito';

		// Evento de clique para matar o mosquito e tocar o som de morte
		mosquito.onclick = function () {
			this.remove();
			if (mosquitoDeath) {
				mosquitoDeath.currentTime = 0;
				mosquitoDeath.play();
			}
		};

		if (mosquitoBuzz) {
			mosquitoBuzz.currentTime = 0;
			mosquitoBuzz.play(); // Toca o zumbido sempre que um novo mosquito aparece
		}
		document.body.appendChild(mosquito);
	};

	criaMosquito();
}

// Evento de clique para tocar o som de impacto
window.addEventListener('click', () => {
	if (impactSound) {
		impactSound.currentTime = 0;
		impactSound.play();
	}
});

function tamanhoAleatorio() {
	const tamanhos = ['mosquito1', 'mosquito2', 'mosquito3'];
	return tamanhos[Math.floor(Math.random() * tamanhos.length)];
}

function ladoAleatorio() {
	const lados = ['ladoA', 'ladoB'];
	return lados[Math.floor(Math.random() * lados.length)];
}

const criaMosquinhas = setInterval(posicaoRandomica, criaMosquitoTempo);