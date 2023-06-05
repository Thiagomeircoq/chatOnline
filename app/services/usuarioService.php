<?php
require_once('../conexao/conexao.php');

class UsuarioService {
    private $database;

    public function __construct(Database $database) {
        $this->database = $database;
    }
    
    public function cadastrarUsuario($email, $senha, $usuario, $imagem) {
        $imagem = 'img/user-imagem.png';
        $senhaCriptografada = password_hash($senha, PASSWORD_DEFAULT);
        
        $conn = $this->database->getConnection();

        $sql = "INSERT INTO tb_usuario (imagem, usuario, senha, email) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die('Erro na preparação da consulta: ' . $conn->error);
        }

        $stmt->bind_param('ssss', $imagem, $usuario, $senhaCriptografada, $email);
        if ($stmt->execute()) {
            return true;
        } else {
            echo "Erro ao cadastrar o usuário: " . $stmt->error;
        }
        
        $stmt->close();
        $this->database->fecharConexao();

    }
    
    public function exibirTodosUsuarios($id_usuario) {
        $conn = $this->database->getConnection();

        $sql = "SELECT * FROM tb_usuario WHERE id_user != $id_usuario";

        $stmt = mysqli_prepare($conn, $sql);

        if ($stmt === false) {
            die('Erro na declaração preparada: '. mysqli_error($conn));
        }

        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);
        $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

        mysqli_stmt_close($stmt);
        
        $this->database->fecharConexao();
        
        echo json_encode($rows);
        return;
    }

    public function usuarioExistente($email) {
        $conn = $this->database->getConnection();
    
        $sql = "SELECT * FROM tb_usuario WHERE email = ?";
    
        $stmt = mysqli_prepare($conn, $sql);
    
        if ($stmt === false) {
            die('Erro na declaração preparada: '. mysqli_error($conn));
        }
    
        mysqli_stmt_bind_param($stmt, 's', $email);
    
        mysqli_stmt_execute($stmt);
    
        $result = mysqli_stmt_get_result($stmt);
        $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
        mysqli_stmt_close($stmt);
        $this->database->fecharConexao();
    
        return $rows;
    }

    public function login($email, $senha) {
        $conn = $this->database->getConnection();

        $sql = "SELECT * FROM tb_usuario WHERE email = ?";
    
        $stmt = mysqli_prepare($conn, $sql);
    
        if ($stmt === false) {
            die('Erro na declaração preparada: ' . mysqli_error($conn));
        }
    
        mysqli_stmt_bind_param($stmt, 's', $email);
    
        mysqli_stmt_execute($stmt);
    
        $result = mysqli_stmt_get_result($stmt);
        $usuario = mysqli_fetch_assoc($result);
    
        mysqli_stmt_close($stmt);

        if ($usuario && password_verify($senha, $usuario['senha'])) {
            return $usuario;
        } else {
            return false;
        }
    }

    public function exibirUsuarioSelecionado($id_usuario) {
        $conn = $this->database->getConnection();
    
        $sql = "SELECT * FROM tb_usuario WHERE id_user = $id_usuario";
    
        $stmt = mysqli_prepare($conn, $sql);
    
        if ($stmt === false) {
            die('Erro na declaração preparada: '. mysqli_error($conn));
        }
    
        mysqli_stmt_execute($stmt);
    
        $result = mysqli_stmt_get_result($stmt);
        $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    
        mysqli_stmt_close($stmt);

        return $rows;
    }
    
    public function editarUsuario($imagem, $nome, $id_usuario) {
        $conn = $this->database->getConnection();
    
        $sql = "UPDATE tb_usuario SET imagem = ?, usuario = ? WHERE id_user = ?";
        $stmt = $conn->prepare($sql);
    
        if (!$stmt) {
            die('Erro na preparação da consulta: ' . $conn->error);
        }
    
        $stmt->bind_param('sss', $imagem, $nome, $id_usuario);
    
        if ($stmt->execute()) {
            $stmt->close();
            return true;
        } else {
            $stmt->close();
            echo "Erro ao atualizar o usuario: " . $stmt->error;
        }
    }
}