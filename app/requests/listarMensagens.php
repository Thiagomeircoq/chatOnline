<?php
require_once('../services/mensagemService.php');
require_once('../conexao/conexao.php');
session_start();
$remetente = $_SESSION['dados_user']['id_user'];
$destinatario = $_GET['destinatario'];

$database = new Database();
$mensagemServices = new MensagemService($database);
$mensagemServices->ListarMensagens($remetente, $destinatario);
return;