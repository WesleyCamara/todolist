const $botaoCriar = document.querySelector('[data-js="botao-criar"]');
const $inputTarefa = document.querySelector('[data-js="input-tarefa"]');
const $painelTarefasPendentes = document.querySelector('[data-js="coisas-fazer"]');
const $painelTarefasConcluidas = document.querySelector('[data-js="coisas-feitas"]');

let tarefasPendentes = [];
let tarefasConcluidas = []

const botoesPendentes = '<div><button class="to-completed" onclick=deletar(this)> ✘ </button><button class="conclude" onclick=completar(this)> ✔ </button></div>';

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
  atualizaPainelPendentes()
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
  let lista = '<ul>'
  tarefasConcluidas.forEach(item => {
    lista += `<li data-id=${item.id}> ${item[0].descricao} <span class="span-completed"> ✔ </span></li>`
  })
  lista += '</ul>'
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