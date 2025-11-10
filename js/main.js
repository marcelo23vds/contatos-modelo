/* *********************************************************************
* Objetivo: Aprender como fazer o CRUD (todos os verbos) no Frontend
* Data: 10/11/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

'use strict'

import { lerContatos } from "./contatos.js"
import { criarContato } from "./contatos.js"

async function exibirContatos() {

    const contatos = await lerContatos()

    //filtrando para exibir apenas os contatos que possuam nome 
    //em ambiente profissional provavelmente nao seria necessario pois o backend ja trataria de receber apenas objetos com o atributo nome preenchido
    const contatosFiltrados = contatos.filter((contatos) => Object.hasOwn(contatos, "nome"))

    const container = document.getElementById('container')

    contatosFiltrados.forEach(contato => {

        const card = document.createElement('div')
        const imagem = document.createElement('img')
        const nome = document.createElement('h2')
        const telefone = document.createElement('p')

        card.classList.add('card-contato')
        imagem.src = contato.foto
        nome.textContent = contato.nome
        telefone.textContent = contato.celular

        container.appendChild(card)
        card.appendChild(imagem)
        card.appendChild(nome)
        card.appendChild(telefone)

    })  

}

exibirContatos()


function exibirFormulario() {

    const main = document.querySelector('main')
    main.classList.remove('card-show')
    main.classList.add('form-show')

}
  
const botaoNovoContato = document.getElementById('novo-contato')
botaoNovoContato.addEventListener('click', exibirFormulario)


function exibirCards() {

    const main = document.querySelector('main')
    main.classList.remove('form-show')
    main.classList.add('card-show')

}

const botaoCancelar = document.getElementById('cancelar')
botaoCancelar.addEventListener('click', exibirCards)


function criarNovoContato() {

    const nome = document.getElementById('nome')
    const email = document.getElementById('email')
    const celular = document.getElementById('celular')
    const endereco = document.getElementById('endereco')
    const cidade = document.getElementById('cidade')

    const novoContato = {
        
        "nome": nome.value,
        "celular": celular.value,
        "foto": "semfoto.png",
        "email": email.value,
        "endereco": endereco.value,
        "cidade": cidade.value
    }

    criarContato(novoContato)

    alert("Contato criado com sucesso!")
    location.reload()
}

const botaoSalvar = document.getElementById('salvar')
botaoSalvar.addEventListener('click', criarNovoContato)
