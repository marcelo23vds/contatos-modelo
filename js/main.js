/* *********************************************************************
* Objetivo: Aprender como fazer o CRUD (todos os verbos) no Frontend
* Data: 10/11/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

'use strict'

import { lerContatos, criarContato, atualizarContato, deletarContato } from "./contatos.js"

let contatoSelecionado = null

async function exibirContatos() {

  const contatos = await lerContatos()
  const contatosFiltrados = contatos.filter(contatos => Object.hasOwn(contatos, "nome"))
  const container = document.getElementById('container')
  container.innerHTML = ''

  contatosFiltrados.forEach(contato => {

    const card = document.createElement('div')
    const imagem = document.createElement('img')
    const nome = document.createElement('h2')
    const telefone = document.createElement('p')

    card.classList.add('card-contato')
    imagem.src = contato.foto
    nome.textContent = contato.nome
    telefone.textContent = contato.celular

    //guardar dados no próprio card (dataset)
    card.dataset.id = contato.id
    card.dataset.nome = contato.nome
    card.dataset.email = contato.email
    card.dataset.celular = contato.celular
    card.dataset.endereco = contato.endereco
    card.dataset.cidade = contato.cidade
    card.dataset.foto = contato.foto

    card.append(imagem, nome, telefone)
    container.appendChild(card)
  })
}

exibirContatos()

function exibirFormulario(card) {
    
  const main = document.querySelector('main')
  main.classList.remove('card-show')
  main.classList.add('form-show')

  limparCampos()

  if (card) {
    contatoSelecionado = card

    document.getElementById('nome').value = card.dataset.nome || ''
    document.getElementById('email').value = card.dataset.email || ''
    document.getElementById('celular').value = card.dataset.celular || ''
    document.getElementById('endereco').value = card.dataset.endereco || ''
    document.getElementById('cidade').value = card.dataset.cidade || ''

    desabilitarCampos(true)

  } else {
    contatoSelecionado = null
    limparCampos()
    desabilitarCampos(false)
  }
}

function limparCampos() {
  document.getElementById('nome').value = ''
  document.getElementById('email').value = ''
  document.getElementById('celular').value = ''
  document.getElementById('endereco').value = ''
  document.getElementById('cidade').value = ''
}

function desabilitarCampos(status) {
  document.getElementById('nome').disabled = status
  document.getElementById('email').disabled = status
  document.getElementById('celular').disabled = status
  document.getElementById('endereco').disabled = status
  document.getElementById('cidade').disabled = status
}

const botaoNovoContato = document.getElementById('novo-contato')
botaoNovoContato.addEventListener('click', () => exibirFormulario())

const botaoCancelar = document.getElementById('cancelar')
//funcao anonima apenas para voltar para "pagina inicial" caso clique em cancelar
botaoCancelar.addEventListener('click', () => {
  const main = document.querySelector('main')
  main.classList.remove('form-show')
  main.classList.add('card-show')
})

const botaoEditar = document.getElementById('editar')
botaoEditar.addEventListener('click', () => desabilitarCampos(false))

async function salvarContato() {

  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value
  const celular = document.getElementById('celular').value
  const endereco = document.getElementById('endereco').value
  const cidade = document.getElementById('cidade').value

  const dadosContato = {
    nome,
    email,
    celular,
    endereco,
    cidade,
    foto: contatoSelecionado?.dataset?.foto || "semfoto.png"
  }

  if (contatoSelecionado) {
    const id = contatoSelecionado.dataset.id
    await atualizarContato(id, dadosContato)
    alert("Contato atualizado com sucesso!")
  } else {
    await criarContato(dadosContato)
    alert("Contato criado com sucesso!")
  }

  location.reload()
}

document.getElementById('salvar').addEventListener('click', salvarContato)

const botaoExcluir = document.getElementById('deletar')
if (botaoExcluir) {
  botaoExcluir.addEventListener('click', async () => {
    if (!contatoSelecionado) return

    const confirmacao = confirm(`Tem certeza que deseja excluir o contato "${contatoSelecionado.dataset.nome}"?`)
    if (!confirmacao) return

    const id = contatoSelecionado.dataset.id
    const ok = await deletarContato(id)

    if (ok) {
      alert("Contato excluído com sucesso!")
      location.reload()
    } else {
      alert("Erro ao excluir o contato.")
    }
  })
}

const container = document.getElementById('container')
container.addEventListener('click', (e) => {
  const card = e.target.closest('.card-contato')
  if (!card) return
  exibirFormulario(card)
})

//imagem.src = URL.createObjectURL(foto.files[0])