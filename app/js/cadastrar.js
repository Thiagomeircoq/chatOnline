const form = document.querySelector('#form-cadastrar');
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const msgError = document.querySelector('#error');

// função acionadas apartir do submit do form
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputValido = await inputsValidate();
    if (inputValido.status) {
        const email = document.querySelector('#email');
        const usuarioValido = await usuarioExistente(email.value);
        if (usuarioValido) {
            form.submit();
        } else {
            displayErrorMessage('Email já cadastrado!');
        }
    } else {
        displayErrorMessage(inputValido.mensagem);
    }
});

// validar oss campos do formulario
function inputsValidate() {
    const usuario = document.querySelector('#usuario');
    const senha = document.querySelector('#senha');
    const email = document.querySelector('#email');

    if (usuario.value.length <= 5) {
        return { status: false, mensagem: 'Usuário deve conter mais de 5 letras!' };
    } else if (senha.value.length <= 5) {
        return { status: false, mensagem: 'Senha fraca!' };
    } else if (!emailRegex.test(email.value)) {
        return { status: false, mensagem: 'Email inválido!' };
    } else {
        return { status: true, mensagem: 'Inputs válidos!' };
    }
}

// verifica se o usuario já é cadastrado procurando pelo email passado no input
async function usuarioExistente(emailValor) {
    const url = `http://localhost/Chat-anonimo/app/requests/usuarioExistente.php?email=${encodeURIComponent(emailValor)}`;
 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro na aquisição: ' + response.status);
        }
    
        const result = await response.json();
        if (result.status) {
            return true;
        }

        return false;
    } catch (error) {
        console.log(error);
    }
}

function hideErrorMessage() {
    msgError.style.display = 'none';
}

function displayErrorMessage(mensagem) {
    msgError.innerText = mensagem;
    msgError.style.display = 'block';
}