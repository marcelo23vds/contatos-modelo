/* *********************************************************************
* Objetivo: Aprender como fazer o CRUD (todos os verbos) no Frontend
* Data: 03/11/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* **********************************************************************/

'use strict'

export async function lerContatos() {
    const url = "https://bakcend-fecaf-render.onrender.com/contatos"

    const response = await fetch(url)

    const contatos = await response.json()

    return contatos
}

export async function criarContato(contato) {
    const url = "https://bakcend-fecaf-render.onrender.com/contatos"

    const options = {
        method:"POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)

    console.log(response.ok)

    return response.ok
}

export async function atualizarContato(id, contato) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`

    const options = {
        method:"PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(url, options)

    console.log(response.ok)

    return response.ok
}

export async function deletarContato (id) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`

    const options = {
        method:"DELETE"
    }

    const response = await fetch(url, options)

    return response.ok
}
