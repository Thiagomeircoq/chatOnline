const imagemUsuario = document.querySelector('#img-user');
imagemUsuario.addEventListener('click', () => {
    estruturaEditarTopo();
    estruturaEditarCorpo();
})

function estruturaEditarTopo() {
    const editarFoto = document.querySelector('.editar-foto');
    const topo = document.createElement('div');
    const voltar = document.createElement('div');
    const iconVoltar = document.createElement('i');
    const pVoltar = document.createElement('p');

    pVoltar.innerText = 'Perfil'
    editarFoto.style.transform = 'translateX(-100%)';

    voltar.classList.add('voltar');
    iconVoltar.classList.add('fa-solid','fa-arrow-left');
    topo.classList.add('topo-editar');

    editarFoto.appendChild(topo);
    topo.appendChild(voltar);
    voltar.appendChild(iconVoltar);
    voltar.appendChild(pVoltar);

    setTimeout(() => {
        editarFoto.style.zIndex = '9999';
        editarFoto.style.transform = 'translateX(0)';
    }, 0);

    iconVoltar.addEventListener('click', () => {
        editarFoto.style.transform = 'translateX(-100%)';
        editarFoto.innerHTML = '';
    });
}

async function estruturaEditarCorpo() {
    const dadosUser = await dadosContatoSelecionado();

    const editar = document.querySelector('.editar-foto');
    const conteudoEditar = document.createElement('div');
    const imagemDiv = document.createElement('div');
    const imagem = document.createElement('img');
    const mudarImgDiv = document.createElement('div');
    const nomeDiv = document.createElement('div');
    const pTopo = document.createElement('p');
    const nomeIconDiv = document.createElement('div');
    const nome = document.createElement('p');
    const iconEdit = document.createElement('i');

    conteudoEditar.classList.add('conteudo-editar');
    imagemDiv.classList.add('img-container');
    mudarImgDiv.classList.add('mudar-img-div');
    nomeDiv.classList.add('nome-container');
    pTopo.classList.add('titulo-nome');
    nomeIconDiv.classList.add('nome-icon-container');
    iconEdit.classList.add('fa-solid', 'fa-pencil');
    imagem.id = 'imagem-user';

    editar.appendChild(conteudoEditar);
    conteudoEditar.appendChild(imagemDiv);
    imagemDiv.appendChild(imagem);
    imagemDiv.appendChild(mudarImgDiv);
    conteudoEditar.appendChild(nomeDiv);
    nomeDiv.appendChild(pTopo);
    nomeDiv.appendChild(nomeIconDiv);
    nomeIconDiv.appendChild(nome);
    nomeIconDiv.appendChild(iconEdit);

    pTopo.innerText = 'Seu nome';
    imagem.src = dadosUser[0].imagem;
    nome.innerText = dadosUser[0].usuario;

    iconEdit.addEventListener('click', () => {
        if (iconEdit.classList.contains('fa-pencil')) {
            editarNome();
        } 
    });

    imagem.addEventListener('mouseenter', () => {
        mudarImgDiv.style.opacity = 1;
        mudarImgDiv.style.zIndex = 0;
        imagem.style.opacity = 0.5;
        editarImagemEstruture();
    });
    
    mudarImgDiv.addEventListener('mouseleave', () => {
        mudarImgDiv.style.opacity = 0;
        mudarImgDiv.style.zIndex = -1;
        imagem.style.opacity = 1;
        mudarImgDiv.innerHTML = '';
    });
}   

function editarNome() {
    const nomeIconDiv = document.querySelector('.nome-icon-container');
    const nomeAtual = nomeIconDiv.getElementsByTagName('p')[0];
    const nomeUser = document.querySelector('#nome-user');
    const iconEdit = nomeIconDiv.getElementsByTagName('i')[0];
    const input = document.createElement('input');
    const imagemAtual = document.querySelector('#imagem-user');

    const iconConfirm = document.createElement('i');
    iconConfirm.classList.add('fa-solid', 'fa-check-circle');

    nomeAtual.style.display = 'none';
    iconEdit.style.display = 'none';
    nomeIconDiv.insertBefore(input, iconEdit);
    nomeIconDiv.appendChild(iconConfirm);

    input.value = nomeAtual.innerText;
    iconConfirm.addEventListener('click', () => {
        if (nomeAtual.innerText !== input.value) {
            try {
                $.post("http://localhost/Chat-anonimo/app/requests/editarUsuario.php", {
                    nome: input.value,
                    imagem: ''
                }, (resultado) => {
                    const resposta = JSON.parse(resultado);
                    if (resposta.status === 'success') {
                        nomeAtual.innerText = input.value;
                        nomeUser.innerText = input.value;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }

        input.remove();
        iconConfirm.remove();
        nomeAtual.style.display = 'block';
        iconEdit.style.display = 'inline-block';
    });
}

function enviarImagem(file) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('nome', ''); // Adiciona o nome vazio
    
    try {
        $.ajax({
            url: 'http://localhost/Chat-anonimo/app/requests/editarUsuario.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (resultado) {
            const resposta = JSON.parse(resultado);
            if (resposta.status === 'success') {
            }
            },
            error: function (error) {
            console.log(error);
            }
        });
    } catch (error) {
        console.log(error);
    }
}
  

function imgRender() {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.style.display = 'none';
  
    inputFile.addEventListener('change', (event) => {
      const file = event.target.files[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgUser = document.querySelector('#img-user');
        const imagem = document.querySelector('#imagem-user');
        imagem.src = e.target.result;
        imgUser.src = e.target.result;
        // Envia a imagem via Ajax
        enviarImagem(file);
      };
      reader.readAsDataURL(file);
    });
  
    inputFile.click();
}

function editarImagemEstruture() {
    const mudarImgDiv = document.querySelector('.mudar-img-div');
    const imagemUser = document.querySelector('.imagem-user');
    const iconMudaImg = document.createElement('i');
    const pMudaImg = document.createElement('p');

    mudarImgDiv.innerHTML = '';
    pMudaImg.innerText = 'MUDAR FOTO DO PERFIL';
    iconMudaImg.classList.add('fa-solid', 'fa-camera');

    mudarImgDiv.appendChild(iconMudaImg);
    mudarImgDiv.appendChild(pMudaImg);

    mudarImgDiv.addEventListener('click', imgRender);
}