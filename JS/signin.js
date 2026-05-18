let btnVerSenha = document.querySelector('#verSenha');

if (btnVerSenha) {
  btnVerSenha.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha');
    if (inputSenha.type === 'password') {
      inputSenha.type = 'text';
      btnVerSenha.classList.remove('fa-eye');
      btnVerSenha.classList.add('fa-eye-slash');
    } else {
      inputSenha.type = 'password';
      btnVerSenha.classList.remove('fa-eye-slash');
      btnVerSenha.classList.add('fa-eye');
    }
  });
}

async function entrar() {

  let usuario = document.querySelector('#usuario')

  let senha = document.querySelector('#senha')

  let userLabel = document.querySelector('#userLabel')

  let senhaLabel = document.querySelector('#senhaLabel')

  let msgError = document.querySelector('#msgError')

  try {

    const resposta = await fetch(
      '../backend/auth/login.php',
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

      localStorage.setItem(
        'token',
        dados.token
      )

      localStorage.setItem(
        'userLogado',
        JSON.stringify(dados.usuario)
      )

      window.location.href = '../index.html'

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