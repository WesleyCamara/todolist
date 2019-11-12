const $botaoCriar = document.querySelector('[data-js="botao-criar"]')
const $inputTarefa = document.querySelector('[data-js="input-tarefa"]')
const $painelTarefasPendentes = document.querySelector('[data-js="tarefas-pendentes"]')
const $painelTarefasConcluidas = document.querySelector('[data-js="tarefas-concluidas"]')
const $limpar = document.querySelector('[data-js="limpar"]')
const botoesPendentes = '<div class="botoes"><button class="botao-deletar" onclick=deletar(this)> ✘ </button><button class="botao-completar" onclick=completar(this)> ✔ </button></div>'

let tarefasPendentes = []
let tarefasConcluidas = []

$botaoCriar.addEventListener('click', () => {
  event.preventDefault()
  addTarefa()
})

$limpar.addEventListener('click', limpaHistorico) 

function buscaStorage(){
  !!localStorage.pendente ? tarefasPendentes = JSON.parse(localStorage.pendente) : ''
  !!localStorage.concluido ? tarefasConcluidas = JSON.parse(localStorage.concluido) : ''
  localStorage.listaPendentes ? atualizaPainelPendentes() : ''
  localStorage.listaConcluidos ? atualizaPainelConcluidos() : ''
  }
  buscaStorage()

function addTarefa() {
  const tarefa = {
    id: geraId(),
    descricao: $inputTarefa.value
  }
  tarefasPendentes.push(tarefa)
  $inputTarefa.value = ""

  salvarLista('pendente', JSON.stringify(tarefasPendentes))
  adicionaValorPendente()
  atualizaPainelPendentes()
}

function adicionaValorPendente() {
  let lista = '<ul class="tarefas-pendentes-ul">';
  tarefasPendentes.forEach((item) => {
    lista += `<li data-id=${item.id}><p>${item.descricao}</p>${botoesPendentes}</li>`
  })
  lista += '<ul>';

  salvarLista('listaPendentes', lista)
}

function adicionaValorConcluido() {
  let lista = '<ul class="tarefas-concluidas-ul">'
  tarefasConcluidas.forEach(item => {
    lista += `<li data-id=${item[0].id}><p> ${item[0].descricao}</p> <span class="span"> ✔ </span></li>`
  });
  lista += '</ul>';

  salvarLista('pendente', JSON.stringify(tarefasPendentes))
  salvarLista('listaConcluidos', lista)
}

function atualizaPainelPendentes() {
  $painelTarefasPendentes.innerHTML = localStorage.listaPendentes
}

function atualizaPainelConcluidos() {
  $painelTarefasConcluidas.innerHTML = localStorage.listaConcluidos
}

function deletar(element) {
  const idExcluir = element.parentElement.parentElement.getAttribute('data-id');
  const novasTarefas = tarefasPendentes.filter(item => {
    return item.id != idExcluir
  })
  tarefasPendentes = novasTarefas

  salvarLista('pendente', JSON.stringify(tarefasPendentes))
  adicionaValorPendente()
  atualizaPainelPendentes()
}

function completar(element) {
  const idItemCompleto = element.parentElement.parentElement.getAttribute('data-id');
  const itemCompleto = tarefasPendentes.filter(item => {
    return item.id == idItemCompleto;
  })
  tarefasConcluidas.push(itemCompleto)

  deletar(element)
  salvarLista('concluido', JSON.stringify(tarefasConcluidas))
  adicionaValorPendente()
  adicionaValorConcluido()
  atualizaPainelConcluidos()
}

function limpaHistorico(){
console.log('limpou')
localStorage.removeItem('concluido')
localStorage.removeItem('listaConcluidos')
tarefasConcluidas = []
$painelTarefasConcluidas.innerHTML = ''
}

function salvarLista(chave, valor) {
  localStorage[chave] = valor
}

function geraId() {
  const time = new Date()
  const id = '' + time.getMinutes() +
    time.getSeconds() +
    time.getMilliseconds()
  return id;
}