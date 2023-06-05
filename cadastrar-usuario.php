<?php 
    session_start();
    if (isset($_SESSION['login'])) {
        header("Location: index.php");
    }
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <section class="login-card central">
        <div class="container">
            <div class="login central">
                <div class="login-title">
                    <h1>Cadastrar Conta</h1>
                </div>
                <form action="app/requests/cadastarUsuario.php" method="post" enctype="multipart/form-data" id="form-cadastrar">
                    <label for="">Usuario</label>
                    <input type="text" name="usuario" id="usuario">
                    <label for="">Email</label>
                    <input type="email" name="email" id="email">
                    <label for="">Senha</label>
                    <input type="password" name="senha" id="senha">
                    <p id="error">Dados Invalidos!</p>
                    <button type="submit">Registrar Conta</button>
                </form>
                <p>Já possui conta? <a href="login.php">Realize o login</a></p>
            </div>
        </div>
    </section>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="app/js/cadastrar.js"></script>
</body>
</html>