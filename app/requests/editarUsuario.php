<?php
require_once('../services/usuarioService.php');
require_once('../conexao/conexao.php');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $id_usuario = $_SESSION['dados_user']['id_user'];

    $database = new Database();
    $userService = new UsuarioService($database);

    if (isset($_FILES['image'])) {
        $imagem = $_FILES['image'];
        $nomeArquivo = $imagem['name'];
        $caminhoDestino = '../../img/' . $nomeArquivo;

        if (move_uploaded_file($imagem['tmp_name'], $caminhoDestino)) {
            $caminhoImagem = 'img/' . $nomeArquivo;

            if (empty($nome)) {
                $dadosUsuario = $userService->exibirUsuarioSelecionado($id_usuario);
                $nome = $dadosUsuario[0]['usuario'];
            }

            if ($userService->editarUsuario($caminhoImagem, $nome, $id_usuario)) {
                $resposta = [
                    'status' => 'success',
                    'mensagem' => 'Atualizado com sucesso!'
                ];
                $_SESSION['dados_user']['user_name'] = $nome;
            } else {
                $resposta = [
                    'status' => 'error',
                    'mensagem' => 'Erro ao atualizar o usuário'
                ];
            }
        } else {
            $resposta = [
                'status' => 'error',
                'mensagem' => 'Erro ao mover a imagem para o destino'
            ];
        }
    } else {
        $dadosUsuario = $userService->exibirUsuarioSelecionado($id_usuario);
        $caminhoImagem = $dadosUsuario[0]['imagem'];

        if (empty($nome)) {
            $nome = $dadosUsuario[0]['usuario'];
        }

        if ($userService->editarUsuario($caminhoImagem, $nome, $id_usuario)) {
            $resposta = [
                'status' => 'success',
                'mensagem' => 'Atualizado com sucesso!'
            ];
            $_SESSION['dados_user']['user_name'] = $nome;
        } else {
            $resposta = [
                'status' => 'error',
                'mensagem' => 'Erro ao atualizar o usuário'
            ];
        }
    }
}

echo json_encode($resposta);
return;