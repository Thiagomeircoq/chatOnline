<?php
require_once('../conexao/conexao.php');

class MensagemService {
    private $database;

    public function __construct(Database $database) {
        $this->database = $database;
    }

    public function AdicionarMensagem($remetente, $destinatario, $conteudo, $data) {
        $conn = $this->database->getConnection();

        $sql = "INSERT INTO tb_mensagem (fk_cod_remetente, fk_cod_destinatario, conteudo, data_msg) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die('Erro na preparação da consulta: ' . $conn->error);
        }

        $stmt->bind_param('ssss', $remetente, $destinatario, $conteudo, $data);
        if ($stmt->execute()) {
            return true;
        } else {
            echo "Erro ao cadastrar a mensagem: " . $stmt->error;
        }
        
        $stmt->close();
        $this->database->fecharConexao();
    }

    public function ListarMensagens($remetente, $destinatario) {
        $conn = $this->database->getConnection();
    
        $sql = "SELECT m.*, u_remetente.*, u_destinatario.*
        FROM tb_mensagem m
        JOIN tb_usuario u_remetente ON m.fk_cod_remetente = u_remetente.id_user
        JOIN tb_usuario u_destinatario ON m.fk_cod_destinatario = u_destinatario.id_user
        WHERE (m.fk_cod_remetente = ? AND m.fk_cod_destinatario = ?)
           OR (m.fk_cod_remetente = ? AND m.fk_cod_destinatario = ?)";   
    
        $stmt = mysqli_prepare($conn, $sql);

        if ($stmt === false) {
            die('Erro na declaração preparada: '. mysqli_error($conn));
        }
    
        mysqli_stmt_bind_param($stmt, 'iiii', $remetente, $destinatario, $destinatario, $remetente);
    
        mysqli_stmt_execute($stmt);
    
        $result = mysqli_stmt_get_result($stmt);
        $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

        mysqli_stmt_close($stmt);
        $this->database->fecharConexao();
        foreach ($rows as &$row) {
            $row['remetente'] = array(
                'id_user' => $row['fk_cod_remetente'],
                'nome' => $row['usuario'],
                'email' => $row['email'],
                'imagem' => $row['imagem'],
            );
            $row['destinatario'] = array(
                'id_user' => $row['fk_cod_destinatario'],
                'nome' => $row['usuario'],
                'email' => $row['email'],
                'imagem' => $row['imagem'],
            );
            unset($row['fk_cod_remetente']);
            unset($row['nome_remetente']);
            unset($row['email_remetente']);
            unset($row['fk_cod_destinatario']);
            unset($row['nome_destinatario']);
            unset($row['email_destinatario']);
        } 
        echo json_encode($rows);
        return $rows;   
    }

    public function editarMensagem($idMensagem, $mensagem) {
        $conn = $this->database->getConnection();

        $sql = "UPDATE tb_mensagem SET conteudo = ? WHERE id_mensagem = ?";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die('Erro na preparação da consulta: ' . $conn->error);
        }

        $stmt->bind_param('ss', $mensagem, $idMensagem);

        if ($stmt->execute()) {
            return true;
        } else {
            echo "Erro ao atualizar a mensagem: " . $stmt->error;
        }

        $stmt->close();
        $this->database->fecharConexao();
    }

    public function deletarMensagem($idMensagem) {
        $conn = $this->database->getConnection();
    
        $sql = "DELETE FROM tb_mensagem WHERE id_mensagem = ?";
        $stmt = $conn->prepare($sql);
    
        if (!$stmt) {
            die('Erro na preparação da consulta: ' . $conn->error);
        }
    
        $stmt->bind_param('s', $idMensagem);
    
        if ($stmt->execute()) {
            $stmt->close();
            $this->database->fecharConexao();
            return true;
        } else {
            echo "Erro ao deletar a mensagem: " . $stmt->error;
        }
    
        $stmt->close();
        $this->database->fecharConexao();
    }
    
}   