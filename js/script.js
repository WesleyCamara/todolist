const $botaoCriar = document.querySelector('[data-js="botao-criar"]');
const $inputTarefa = document.querySelector('[data-js="input-tarefa"]');
const $painelTarefasPendentes = document.querySelector('[data-js="tarefas-pendentes"]');
const $painelTarefasConcluidas = document.querySelector('[data-js="tarefas-concluidas"]');

let tarefasPendentes = [];
let tarefasConcluidas = []

const botoesPendentes = '<div><button class="botao-deletar" onclick=deletar(this)> ✘ </button><button class="botao-completar" onclick=completar(this)> ✔ </button></div>';

$botaoCriar.addEventListener('click', function () {
  event.preventDefault();
  addTarefa()
})

function geraId() {
  const time = new Date();
  const id = '' + time.getMinutes() +
    time.getSeconds() +
    time.getMilliseconds();
  return id;
}

function addTarefa() {
  const tarefa = {
    id: geraId(),
    descricao: $inputTarefa.value
  }
  tarefasPendentes.push(tarefa);
  $inputTarefa.value = "";
  atualizaPainelPendentes();
}

function atualizaPainelPendentes() {
  let lista = '<ul class="tarefas-pendentes-ul">';
  tarefasPendentes.forEach((item) => {
    lista += `<li data-id=${item.id}><p>${item.descricao}</p>${botoesPendentes}</li>`
  });
  lista += '<ul>';
  $painelTarefasPendentes.innerHTML = lista;
}

function atualizaPainelConcluidas() {
  let lista = '<ul class="tarefas-concluidas-ul">';
  tarefasConcluidas.forEach(item => {
    lista += `<li data-id=${item[0].id}><p> ${item[0].descricao}</p> <span class="span"> ✔ </span></li>`
  });
  lista += '</ul>';
  $painelTarefasConcluidas.innerHTML = lista;
}

function deletar(element) {
  const idExcluir = element.parentElement.parentElement.getAttribute('data-id');
  const novasTarefas = tarefasPendentes.filter(item => {
    return item.id != idExcluir;
  })
  tarefasPendentes = novasTarefas;
  atualizaPainelPendentes()
}

function completar(element) {
  const idItemCompleto = element.parentElement.parentElement.getAttribute('data-id');
  const itemCompleto = tarefasPendentes.filter(item => {
    return item.id == idItemCompleto;
  })
  tarefasConcluidas.push(itemCompleto)
  deletar(element)
  atualizaPainelPendentes()
  atualizaPainelConcluidas()
}