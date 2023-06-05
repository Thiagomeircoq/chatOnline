<?php
require_once('../services/mensagemService.php');
require_once('../conexao/conexao.php');
session_start();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idMensagem = $_POST['idMensagem'];
    $mensagem = $_POST['mensagem'];

    $database = new Database();
    $mensagemServices = new MensagemService($database);
    if ($mensagemServices->editarMensagem($idMensagem, $mensagem) == true) {
        $respota = [
            'status' => 'success',
            'mensagem' => 'Atualizado com sucesso!'
        ];
    };
}

echo json_encode($respota);
return;