<?php
require_once('../services/mensagemService.php');
require_once('../model/usuario.php');
require_once('../conexao/conexao.php');
session_start();

if (isset($_POST)) {
    $database = new Database();
    $msgService = new MensagemService($database);

    $destinatario = $_POST['destinatario'];
    $remetente = $_SESSION['dados_user']['id_user'];
    $conteudo = $_POST['conteudo'];
    $data = date('Y-m-d H:i:s');

    $msgService->AdicionarMensagem($remetente, $destinatario, $conteudo, $data);
}
?>