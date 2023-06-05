<?php
require_once('usuario.php');
require_once('../conexao/conexao.php');

class Mensagem {
    private $remetente;
    private $destinatario;
    private $conteudo;
    private $data;
    
    public function __construct($remetente, $destinatario, $conteudo, $data) {
        $this->remetente = $remetente;
        $this->destinatario = $destinatario;
        $this->conteudo = $conteudo;
        $this->data = $data;
    }

	public function getData() {
		return $this->data;
	}

	public function getConteudo() {
		return $this->conteudo;
	}

	public function getDestinatario() {
		return $this->destinatario;
	}

	public function getRemetente() {
		return $this->remetente;
	}
}