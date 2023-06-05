
async function contatosData() {
    const url = `http://localhost/Chat-anonimo/app/requests/listarUsuarios.php`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro na aquisição: ' + response.status);
        }
    
        const result = await response.json();
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

async function dadosContatoSelecionado() {
    const url = `http://localhost/Chat-anonimo/app/requests/dadosUsuario.php`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro na aquisição: ' + response.status);
        }
        const result = await response.json();
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

async function alterarDadosUsuario() {
    const dados = await dadosContatoSelecionado();
    const imgUser = document.querySelector('#img-user');
    imgUser.src = dados[0].imagem;
}

alterarDadosUsuario();

const inputBusca = document.querySelector('#buscar-contato');

inputBusca.addEventListener('input', function() {
    listarContatos(inputBusca.value);
})

// Mostra todos os usuarios cadastrados
async function listarContatos(usuarioPesquisa) {
    const dados = await contatosData();
    const listarContato = document.querySelector('.lista-contatos');
    listarContato.innerHTML = ''; // Limpa a lista de contatos antes de exibir os resultados da pesquisa
  
    dados.forEach((usuario) => {
        const nomeUsuario = usuario.usuario.toLowerCase();
        const pesquisa = usuarioPesquisa.toLowerCase();
    
        if (nomeUsuario.includes(pesquisa)) {
            const liUser = document.createElement('li');
            liUser.id = usuario.id_user;
    
            // Seleciona um destinatario
            liUser.addEventListener('click', function() {
            conversa(usuario.id_user);
            });
    
            const imgUser = document.createElement('img');
            const divInfos = document.createElement('div');
            divInfos.classList.add('infos-contato');
            const nomeUser = document.createElement('h2');
           
            nomeUser.innerText = usuario.usuario;
            imgUser.src = usuario.imagem;
    
            listarContato.appendChild(liUser);
            liUser.appendChild(imgUser);
            liUser.appendChild(divInfos);
            divInfos.appendChild(nomeUser);

            RenderlastMensage(usuario.id_user);
        }
    });
}
listarContatos('');

async function RenderlastMensage(id_user) {
    const contatosItem = document.querySelectorAll('.lista-contatos li');
    contatosItem.forEach(async contato => {
        if (contato.id == id_user) {
            const divInfos = contato.querySelector('.infos-contato');
            const msgAnterior = divInfos.querySelector('p');
            if (msgAnterior) {
                msgAnterior.remove();
            }
            const lastMensage = document.createElement('p');
            divInfos.appendChild(lastMensage);
            conversasData = await listarConversas(id_user);
            const ultimoElemento = conversasData[conversasData.length - 1];
            lastMensage.innerText = ultimoElemento.conteudo;
        }
    });
}

let submitMensagemEvent;
let intervaloAtualizacaoChat;
let conversasData = null;
let mensagensLength = 0;

// Inicia uma conversa com o destinatário selecionado
async function conversa(destinatario) {
    const submitMensagem = document.querySelector('#button-enviarMensagem');
    const enviarMensagemDiv = document.querySelector('.enviar-mensagem');
    enviarMensagemDiv.style.display = 'flex';

    conversasData = await listarConversas(destinatario);
    exibirConversas(conversasData, destinatario);

    // Limpar conversa atual
    const mensagens = document.querySelector('.mensagens');
    mensagens.innerHTML = '';
    const inputMensage = document.querySelector('.enviar-mensagem');
    if (inputMensage) {
       
    }

    // Interromper a atualização periódica
    if (intervaloAtualizacaoChat) {
        clearInterval(intervaloAtualizacaoChat);
    }

    mensagensLength = conversasData.length;

    if (submitMensagemEvent) {
        submitMensagem.removeEventListener('click', submitMensagemEvent);
    }

    submitMensagemEvent = async function() {
        const conteudo = document.querySelector('#mensagem');
        if (conteudo.value != "") {
            
            await enviarMensagem(destinatario, conteudo.value, conversasData);
            await atualizarChat(destinatario);
            conteudo.value = '';
        }
    };

    submitMensagem.addEventListener('click', submitMensagemEvent);

    // Iniciar a atualização periódica do chat apenas se a conversa já tiver sido exibida
    if (conversasData !== null) {
        intervaloAtualizacaoChat = setInterval(async () => {
            await atualizarChat(destinatario);
        }, 1000);
    }
}

// Envia uma mensagem para um destinatario selecionado
async function enviarMensagem(destinatarioId, conteudoMsg) {
    try {
        await new Promise((resolve) => {
            $.post("http://localhost/Chat-anonimo/app/requests/cadastrarMensagem.php", {
                destinatario: destinatarioId,
                conteudo: conteudoMsg
            }, resolve);
        });
    } catch (error) {
        console.log(error);
    }
}

// Obtem todas as mensagens refernetes ao destinatario selecionado
async function listarConversas(destinatarioId) {
    const timestamp = Date.now();
    const url = `http://localhost/Chat-anonimo/app/requests/listarMensagens.php?destinatario=${encodeURIComponent(destinatarioId)}&_=${timestamp}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro na aquisição: ' + response.status);
        }
        const result = await response.json();
        if (result) {
            return result;
        }
    } catch (error) {
        console.log(error);
    }
}

async function exibirConversas(conversasData, destinatario) {
    const dadosContato = await contatosData();
    const dadosUsuarioAtual = await dadosContatoSelecionado();
    const mensagens = document.querySelector('.mensagens');
    const rightContainer = document.querySelector('.right-chat');
    mensagens.innerHTML = '';   

    const mensagensTopo = document.createElement('div');
    const imgUserSelect = document.createElement('img');
    const nameUserSelect = document.createElement('h2');
    const mensagensConteudo = document.createElement('ul');

    rightContainer.appendChild(mensagensTopo);
    mensagensTopo.appendChild(imgUserSelect);
    mensagensTopo.appendChild(nameUserSelect);
    mensagens.appendChild(mensagensConteudo);

    mensagens.classList.add('mensagens');
    mensagensTopo.classList.add('mensagens-topo');
    mensagensConteudo.classList.add('mensagens-conteudo');

    dadosContato.forEach(contato => {
        if (contato.id_user == destinatario) {
            imgUserSelect.src = contato.imagem;
            nameUserSelect.innerText = contato.usuario;
        }
    });

    let ultimaData = '';

    conversasData.forEach(mensagem => {
        const mensagensItem = document.createElement('li');
        const imgUserItem = document.createElement('img');
        const msgItem = document.createElement('p');
        const imgMensagem = document.createElement('div');
      
        const dataMsg = new Date(mensagem.data_msg);
        const dataFormatada = formatarData(dataMsg);

        imgMensagem.classList.add('img-mensagem');

        if (dataFormatada !== ultimaData) {
            ultimaData = dataFormatada;
        
            const dataItem = document.createElement('li');
            dataItem.classList.add('data-item');

            const textData = document.createElement('p');
            textData.innerText = dataFormatada;
            dataItem.appendChild(textData);
            mensagensConteudo.appendChild(dataItem);

            const linhaItem = document.createElement('hr');
            linhaItem.classList.add('linha-item');
            dataItem.appendChild(linhaItem);
        }
        
        const dataItem = document.createElement('span');
        dataItem.classList.add('data-mensagem');
        dataItem.innerText = dataFormatada;
        
        if (mensagem.id_user != destinatario) {
            dadosContato.forEach(contato => {
                if (contato.id_user == destinatario) {
                    imgUserItem.src = contato.imagem;
                }
            });
            msgItem.innerText = mensagem.conteudo;
            msgItem.id = "destinatario-msg";
            mensagensItem.id = "destinatario";    

            mensagensConteudo.appendChild(mensagensItem);
            mensagensItem.appendChild(imgMensagem);
            imgMensagem.appendChild(imgUserItem);
            imgMensagem.appendChild(msgItem);
        } else {
            imgUserItem.src = dadosUsuarioAtual[0].imagem;
            msgItem.innerText = mensagem.conteudo;
            msgItem.id = "remetente-msg";
            mensagensItem.id = "remetente";
            
            mensagensConteudo.appendChild(mensagensItem);
            mensagensItem.appendChild(imgMensagem);
            imgMensagem.appendChild(msgItem);
            imgMensagem.appendChild(imgUserItem);


            mensagensItem.addEventListener('mouseenter', () => {
                mensagemActions(mensagensItem, mensagem.id_mensagem);
            });
    
            mensagensItem.addEventListener('mouseleave', () => {
                const actionsDiv = document.querySelector('.actions-div');
                actionsDiv.remove();
            });
        }
    });
    mensagensConteudo.scrollTop = mensagensConteudo.scrollHeight;
}


async function atualizarChat(destinatario) {
    const conversasAtualizadas = await listarConversas(destinatario);

    if (conversasAtualizadas.length != mensagensLength) {
        const mensagens = document.querySelector('.mensagens');
        const scrollAtBottom = mensagens.scrollHeight - mensagens.clientHeight <= mensagens.scrollTop + 10;

        if (conversasAtualizadas.length > mensagensLength) {
            exibirConversas(conversasAtualizadas, destinatario);
            mensagensLength++;
        } else if (conversasAtualizadas.length < mensagensLength) {
            exibirConversas(conversasAtualizadas, destinatario);
            mensagensLength--;
        }

        RenderlastMensage(destinatario);
    }
}

function formatarData(data) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return data.toLocaleDateString('pt-BR', options);
}

let inputMensagemAtual = null; // Referência ao input atualmente em edição
let avisoComandos;

function mensagemActions(mensagem, idMensagem) {
    const actionsDiv = document.createElement('ul');

    const editarMensagem = document.createElement('li');
    const excluirMensagem = document.createElement('li');

    editarMensagem.classList.add('fa-solid', 'fa-pencil');
    editarMensagem.id = 'editar-mensagem';

    excluirMensagem.classList.add('fa-solid', 'fa-trash-can');
    excluirMensagem.id = 'excluir-mensagem';

    actionsDiv.classList.add('actions-div');

    mensagem.appendChild(actionsDiv);
    actionsDiv.appendChild(editarMensagem);
    actionsDiv.appendChild(excluirMensagem);

    editarMensagem.addEventListener('click', () => {
        if (inputMensagemAtual) {
            inputMensagemAtual.previousSibling.style.display = 'block'; // Exibe o elemento anterior (p)
            inputMensagemAtual.remove(); // Remove o input anterior
            avisoComandos.remove();
        }

        editMensagem(mensagem, idMensagem);
    });

    excluirMensagem.addEventListener('click', () => {
        deletarMensagem(mensagem, idMensagem);
    })
}

function editMensagem(mensagem, idMensagem) {
    const msgAtual = mensagem.querySelector('p');
    avisoComandos = document.createElement('p');
    avisoComandos.innerHTML = '';

    avisoComandos.classList.add('aviso-comandos');
    avisoComandos.innerHTML = 'esc para <span> cancelar </span> e enter para <span> salvar </span>.';

    mensagem.appendChild(avisoComandos);

    if (!msgAtual) {
        return;
    }

    const inputMensagem = document.createElement('input');
    inputMensagem.id = 'remetente-msg';
    inputMensagem.value = msgAtual.innerText;

    msgAtual.style.display = 'none';
    msgAtual.insertAdjacentElement('afterend', inputMensagem);
    inputMensagem.focus();

    inputMensagem.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            msgAtual.style.display = 'flex';
            inputMensagem.remove();
            avisoComandos.remove();
            inputMensagemAtual = null;
        }
    });

    inputMensagem.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (inputMensagem.value === '') {
                inputMensagem.remove();
                avisoComandos.remove();
                inputMensagemAtual = null;
                msgAtual.style.display = 'flex';
                return;
            }
            try {
                $.post("http://localhost/Chat-anonimo/app/requests/editarMensagem.php", {
                    idMensagem: idMensagem, 
                    mensagem: inputMensagem.value
                }, (resultado) => {
                    const respota = JSON.parse(resultado);
                    if (respota.status === 'success') {
                        msgAtual.style.display = 'flex';
                        msgAtual.innerText = inputMensagem.value;
                        inputMensagemAtual = null;
                        avisoComandos.remove();
                        inputMensagem.remove();
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    });

    inputMensagemAtual = inputMensagem;
}

async function deletarMensagem(mensagem, idMensagem) {
    try {
        const buttonConfirmado = await buttonConfirmation('Excluir Mensagem', 'Deseja mesmo excluir essa mensagem', mensagem);
        const timestamp = Date.now();
        const url = `http://localhost/Chat-anonimo/app/requests/deletarMensagem.php?idMensagem=${encodeURIComponent(idMensagem)}&_=${timestamp}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro na aquisição: ' + response.status);
            }
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.error('Operação cancelada pelo usuário');
    }
}

async function buttonConfirmation(titulo, subTitulo, mensagem) {
    return new Promise((resolve, reject) => {
        const mensagemDuplicada = mensagem.cloneNode(true);
        const overlay = document.createElement('div');
        const divMensagem = document.createElement('div');
        const mensagemTopo = document.createElement('div');
        const tituloName = document.createElement('h2')
        const subTituloName = document.createElement('h3');
        const mensagemSelecionada = document.createElement('div');
        const buttonsDiv = document.createElement('div');
        const buttonCancel = document.createElement('button');
        const buttonContinue = document.createElement('button');

        overlay.classList.add('overlay');
        divMensagem.classList.add('divMensagem');
        mensagemTopo.classList.add('mensagemTopo');
        mensagemSelecionada.classList.add('mensagemSelecionada');
        buttonCancel.classList.add('buttonCancel');
        buttonContinue.classList.add('buttonContinue');
        buttonsDiv.classList.add('buttonsDiv');

        document.body.appendChild(overlay);
        overlay.appendChild(divMensagem);
        divMensagem.appendChild(mensagemTopo);
        mensagemTopo.appendChild(tituloName);
        mensagemTopo.appendChild(subTituloName);
        divMensagem.appendChild(mensagemSelecionada);
        mensagemSelecionada.appendChild(mensagemDuplicada);
        divMensagem.appendChild(buttonsDiv);
        buttonsDiv.appendChild(buttonCancel)
        buttonsDiv.appendChild(buttonContinue);

        tituloName.innerText = titulo;
        subTituloName.innerText = subTitulo;
        buttonCancel.innerText = 'Cancelar';
        buttonContinue.innerText = 'Excluir';
        const acitonRemove = mensagemSelecionada.querySelector('.actions-div').remove();

        buttonCancel.addEventListener('click', () => {
            overlay.remove();
            reject();
        })

        buttonContinue.addEventListener('click', () => {
            overlay.remove();
            resolve(true);
        })
    });
}
