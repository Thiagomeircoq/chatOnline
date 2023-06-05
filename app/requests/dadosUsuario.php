<?php
require_once('../services/usuarioService.php');
require_once('../model/usuario.php');
require_once('../conexao/conexao.php');
session_start();

$id_usuario = $_SESSION['dados_user']['id_user'];

$database = new Database();
$userService = new UsuarioService($database);
$dadosUsuario = $userService->exibirUsuarioSelecionado($id_usuario);    
echo json_encode($dadosUsuario);
return;