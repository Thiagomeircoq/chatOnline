<?php
require_once('../services/usuarioService.php');
require_once('../conexao/conexao.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'];
    $senha = $_POST['senha'];
    $email = $_POST['email'];

    $database = new Database();
    $userService = new UsuarioService($database);
    $usuarioCadastrado = $userService->cadastrarUsuario($email, $senha, $usuario, $imagem);
    if ($usuarioCadastrado) {
        header('Location: ../../login.php');
    }
}