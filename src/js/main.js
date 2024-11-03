(function () {
  let btAddPlayer = document.getElementById('btAddPlayer');
  let btStart = document.getElementById('btStart');
  let btSortear = document.getElementById('btSortear');
  let players = [];
  let secPlayers = document.querySelector('.sec-players');
  let secVerdadeDesafio = document.querySelector('.sec-verdade-desafio');
  let secPergunta = document.querySelector('.sec-pergunta');
  let btVerdade = document.getElementById('btVerdade');
  let btDesafio = document.getElementById('btDesafio');
  let difficulty = "facil";

  // ADICIONA MAIS CAMPOS DE JOGADORES NO FORMULÁRIO
  btAddPlayer.addEventListener('click', () => {
    let input = document.querySelector('.input-group').cloneNode(true);
    document.querySelector('.sec-players .wrap').appendChild(input).lastChild;
    let inputs = document.querySelectorAll('.sec-players .wrap .input-group input');

    inputs.forEach((el, i, arr) => {
      if((i + 1) == arr.length) {
        el.value = '';
      }
    });

  });

  // FAZ O SORTEIO DO JOGADOR QUE SERÁ SELECIONADO PARA RESPONDER
  function run() {
    let player = Math.floor(Math.random() * players.length);
    let playerName = document.getElementById('playerName');
    let loading = document.getElementById('loading');

    loading.style.display = 'flex';

    window.scrollTo(0, 0);

    setTimeout(() => {
      loading.style.display = 'none';

      secPlayers.style.display = 'none';
      secVerdadeDesafio.style.display = 'block';
      secPergunta.style.display = 'none';

      playerName.innerHTML = players[player];
      
      }, 3000);

  }

  // ADICIONA JOGADORES LISTADOS PELO USUÁRIO E VALIDA SE O NÚMERO DE JOGADORES É VALIDO
  btStart.addEventListener('click', () => {
    let playersNames = document.querySelectorAll('.player-name');

    playersNames.forEach((el) => {
      if(el.value !== '') {
        players.push(el.value);
      }
    });

    if(players.length < 2) {

      let alert = document.querySelector('.sec-players .alert');
      
      alert.style.display = 'block';

      alert.innerHTML = '<b>ERRO!</b> Insira pelo menos <b>2 jogadores</b> para começar.';

    } else {
      run();
    }

  });

  // FAZ UMA REQUISIÇÃO PARA TRAZER A PERGUNTA A SER FEITA PARA O JOGADOR SORTEADO
  btVerdade.addEventListener('click', () => {

    secVerdadeDesafio.style.display = 'none';
    secPergunta.style.display = 'block';

    fetch("./questions.json") 
    .then(response => {
      return response.json();
    })
    .then(data => {
      if(data.verdades[difficulty]) {
        const random = Math.floor(Math.random() * data.verdades[difficulty].length);
        const DOMText = document.querySelector('.sec-pergunta .sec-title');
        
        DOMText.innerHTML = data.verdades[difficulty][random];
      } else {
        console.error('Difficulty level not found for verdades');
      }
    })
    .catch(error => console.error('Error fetching verdades:', error));

  });

  // FAZ UMA REQUISIÇÃO PARA TRAZER O DESAFIO A SER FEITO PARA O JOGADOR SORTEADO
  btDesafio.addEventListener('click', () => {

    secVerdadeDesafio.style.display = 'none';
    secPergunta.style.display = 'block';

    fetch("./questions.json") 
    .then(response => {
      return response.json();
    })
    .then(data => {
      if(data.desafios[difficulty]) {
        const random = Math.floor(Math.random() * data.desafios[difficulty].length);
        const DOMText = document.querySelector('.sec-pergunta .sec-title');
        
        DOMText.innerHTML = data.desafios[difficulty][random];
      } else {
        console.error('Difficulty level not found for desafios');
      }
    })
    .catch(error => console.error('Error fetching desafios:', error));
  });

  // SELECIONA DIFICULDADE
  document.getElementById('btFacil').addEventListener('click', () => {
    difficulty = "facil";
    console.log('Difficulty set to facil');
  });
  
  document.getElementById('btMedio').addEventListener('click', () => {
    difficulty = "medio";
    console.log('Difficulty set to medio');
  });

  document.getElementById('btDificil').addEventListener('click', () => {
    difficulty = "dificil";
    console.log('Difficulty set to dificil');
  });

  // REALIZA UM NOVO SORTEIO
  btSortear.addEventListener('click', () => {
    const DOMText = document.querySelector('.sec-pergunta .sec-title');

    setTimeout(() => {
      DOMText.innerHTML = '';
    }, 3000);
    
    run();
  });
  
})();
