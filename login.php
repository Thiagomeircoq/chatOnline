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
                    <h1>Login da Conta</h1>
                </div>
                <form action="app/requests/loginUsuario.php" method="post" enctype="multipart/form-data" id="form-cadastrar">
                    <label for="">Email</label>
                    <input type="email" name="email" required>
                    <label for="">Senha</label>
                    <input type="password" name="senha" required>
                    <button type="submit">Entrar na Conta</button>
                </form>
                <p>Não tem uma conta? <a href="cadastrar-usuario.php">Inscrever-se</a></p>
            </div>
        </div>
    </section>
</body>
</html>