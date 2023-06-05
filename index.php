<?php
    session_start();
    if (!isset($_SESSION['login'])) {
        header("Location: login.php");
        session_destroy();
    }
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://kit.fontawesome.com/9a785616dc.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <section class="central chat">
        <div class="container">
            <div class="chat-container">
                <div class="left-chat">
                    <div class="home">
                        <div class="dados-user">
                            <div class="user-atual">
                                <img src="img/user-imagem.png" alt="" id="img-user">
                                <p id="nome-user"><?= $_SESSION['dados_user']['user_name']; ?></p>
                            </div>
                            <a href="app/conexao/deslogar.php"><i class="fa-solid fa-right-from-bracket"></i></a>
                        </div>
                        <div class="buscar-contatos">
                            <input type="text" placeholder="Buscar contatos..." id="buscar-contato">
                        </div>
                        <ul class="lista-contatos"></ul>
                    </div>
                    <div class="editar-foto">

                    </div>
                </div>
                <div class="right-chat">
                    <div class="mensagens">
                    </div>
                    <div class="enviar-mensagem">
                        <input type="text" id="mensagem" placeholder="Escreva uma mensagem...">
                        <button id="button-enviarMensagem"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="app/js/lista-contato.js"></script>
    <script src="app/js/editar-dados.js"></script>
</body>

</html>