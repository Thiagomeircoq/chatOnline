<?php

class Usuario {
    private $nome;
    private $email;
	private $imagem;

    public function __construct($nome, $email, $imagem) {
        $this->nome = $nome;

        $this->email = $email;
		$this->imagem = $imagem;
    }
    
	public function getNome() {
		return $this->nome;
	}

	public function getEmail() {
		return $this->email;
	}
	public function getImagem() {
		return $this->imagem;
	}
}   