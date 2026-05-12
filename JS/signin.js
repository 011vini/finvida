async function entrar() {

  let usuario = document.querySelector('#usuario')

  let senha = document.querySelector('#senha')

  let userLabel = document.querySelector('#userLabel')

  let senhaLabel = document.querySelector('#senhaLabel')

  let msgError = document.querySelector('#msgError')

  try {

    const resposta = await fetch(

      'http://localhost/finvida/backend/auth/login.php',

      {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          usuario: usuario.value,

          senha: senha.value
        })
      }
    )

    const dados = await resposta.json()

    console.log(dados)

    if (dados.status === 'sucesso') {

      let token =
        Math.random().toString(16).substr(2)

      localStorage.setItem(
        'token',
        token
      )

      localStorage.setItem(
        'userLogado',
        JSON.stringify(dados.usuario)
      )

      window.location.href =
        './finvida/index.html'

    } else {

      userLabel.style.color = 'red'

      usuario.style.borderColor = 'red'

      senhaLabel.style.color = 'red'

      senha.style.borderColor = 'red'

      msgError.style.display = 'block'

      msgError.innerHTML =
        'Usuário ou senha incorretos'
    }

  } catch (erro) {

    console.log(erro)

    msgError.style.display = 'block'

    msgError.innerHTML =
      'Erro no servidor'
  }
}