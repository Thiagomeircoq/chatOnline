<?php
require_once('../services/usuarioService.php');
require_once('../conexao/conexao.php');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $database = new Database();
    $userService = new UsuarioService($database);
    $loginValido = $userService->login($email, $senha);
    if (!isset($_SESSION['login'])) {
        if ($loginValido) {
            $_SESSION['login'] = true;
            $_SESSION['dados_user'] = [
                'id_user' => $loginValido['id_user'],
                'user_name' => $loginValido['usuario']
            ];
            header('Location: ../../index.php');
        } else {
            header('Location: ../../login.php');
        }
    } else {
        header('Location: ../../login.php');
    }
}