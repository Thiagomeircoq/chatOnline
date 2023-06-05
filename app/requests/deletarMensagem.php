<?php
require_once('../services/mensagemService.php');
require_once('../conexao/conexao.php');

$idMensagem = $_GET['idMensagem'];

$database = new Database();
$mensagemServices = new MensagemService($database);
$mensagemServices->deletarMensagem($idMensagem);
return;