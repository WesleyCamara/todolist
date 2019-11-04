const $botaoCriar = document.querySelector('[data-js="botao-criar"]');
const $tarefa = document.querySelector('[data-js="input-tarefa"]');
const $coisasFazer = document.querySelector('[data-js="coisas-fazer"]');
const $coisasFeitas = document.querySelector('[data-js="coisas-feitas"]');

let tarefas = [];
let feitos = []

const $botoesPendentes = '<div><button class="to-completed" onclick=deletar(this)> ✘ </button><button class="conclude" onclick=completar(this)> ✔ </button></div>';

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
    descricao: $tarefa.value
  }
  tarefas.push(tarefa);
  $tarefa.value = "";
  atualizaTelaPendente()
}

function atualizaTelaPendente() {
  let lista = '<ul class="tarefas-pendentes-ul">';
  tarefas.forEach((item) => {
    lista += `<li data-id=${item.id}><p>${item.descricao}</p>${$botoesPendentes}</li>`
  });
  lista += '<ul>';
  $coisasFazer.innerHTML = lista;
}


function atualizaTelaConcluidos() {
  let lista = '<ul>'
  feitos.forEach(item => {
    lista += `<li data-id=${item.id}> ${item[0].descricao} <span class="span-completed"> ✔ </span></li>`
  })
  lista += '</ul>'
  $coisasFeitas.innerHTML = lista;
}


function deletar(element) {
  const idExcluir = element.parentElement.parentElement.getAttribute('data-id');
  const novasTarefas = tarefas.filter(item => {
    return item.id != idExcluir;
  })
  tarefas = novasTarefas;
  atualizaTelaPendente()
}

function completar(element) {
  const idCompletar = element.parentElement.parentElement.getAttribute('data-id');
  const itemCompleto = tarefas.filter(item => {
    return item.id == idCompletar;
  })
  feitos.push(itemCompleto)
  deletar(element)
  atualizaTelaPendente()
  atualizaTelaConcluidos()
}