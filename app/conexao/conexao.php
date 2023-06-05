<?php
class Database {
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'chat-online';
    private $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->conn->connect_error) {
            die('Erro na conexão com o banco de dados: ' . $this->conn->connect_error);
        }
    }

    public function getConnection() {
        return $this->conn;
    }

    public function fecharConexao() {
        $this->conn->close();
    }
}

$con = new Database();
