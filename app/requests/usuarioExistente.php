<?php
require_once('../services/usuarioService.php');
require_once('../conexao/conexao.php');

$database = new Database();
$userService = new UsuarioService($database);

if (isset($_GET['email'])) {
    $email = $_GET['email'];

    $usuarioExistente = $userService->usuarioExistente($email);
}

if (!empty($usuarioExistente)) {
    $resposta = [
        'status'=> false,
        'mensagem'=> 'Usuario Existente'
    ];
} else {
    $resposta = [
        'status'=> true,
        'mensagem'=> 'Usuario não Existente'
    ];
}

echo json_encode($resposta);