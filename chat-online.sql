-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05-Jun-2023 às 21:01
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `chat-online`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_mensagem`
--

CREATE TABLE `tb_mensagem` (
  `id_mensagem` int(11) NOT NULL,
  `fk_cod_remetente` int(255) NOT NULL,
  `fk_cod_destinatario` int(255) NOT NULL,
  `conteudo` mediumtext NOT NULL,
  `data_msg` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tb_mensagem`
--

INSERT INTO `tb_mensagem` (`id_mensagem`, `fk_cod_remetente`, `fk_cod_destinatario`, `conteudo`, `data_msg`) VALUES
(3, 5, 4, 'Ola', '2023-05-22 01:06:11'),
(4, 5, 4, 'Tudo bom?', '2023-05-22 01:06:21'),
(5, 4, 5, 'Olá, tudo bom', '2023-05-22 01:06:37'),
(6, 4, 5, 'E com você?', '2023-05-22 01:06:41'),
(7, 5, 2, 'Oi Marcelo, como está?', '2023-05-22 01:06:53'),
(9, 12, 2, 'Olá Marcelo, tudo bom?', '2023-05-22 01:22:14'),
(11, 2, 12, 'Oi, como está?', '2023-05-22 01:22:56'),
(12, 2, 13, 'Oi Thiago, tudo bom?', '2023-05-22 01:24:58'),
(15, 13, 5, 'Olá claudio!', '2023-05-22 01:31:34'),
(16, 13, 3, 'Olá', '2023-05-22 01:32:03'),
(17, 13, 5, 'Eae', '2023-05-22 01:40:37'),
(18, 13, 5, 'Tudo bom?', '2023-05-22 01:41:02'),
(20, 2, 14, 'Olá Thiago, tudo bom?', '2023-05-22 01:47:02'),
(24, 14, 2, 'Olá', '2023-05-22 20:13:48'),
(25, 1, 14, 'Olá', '2023-05-25 05:26:35');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `id_user` int(255) NOT NULL,
  `imagem` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tb_usuario`
--

INSERT INTO `tb_usuario` (`id_user`, `imagem`, `usuario`, `senha`, `email`, `status`) VALUES
(1, 'img/conceito-de-emocoes-e-pessoas-foto-de-um-homem-bonito-de-aparencia-seria-com-barba-parecendo-confiante-e-determinado_1258-26730.avif', 'João Pedro', '$2y$10$x3Exgp/jFeHEe5NjLueoUOCGQhDnt0ZytGx3mTAXLq5UFubMaN8Wm', 'thiago5meira@outlook.com', ''),
(2, 'img/close-de-um-barbudo-sorridente-e-feliz-olhando_176420-20048.avif', 'Marcelo Pereira', '$2y$10$yHbHG3BnflJPOmaw4ldLSeJ00EAMhZ1gyfsFOyO0Sqx7.x7ywpQaK', 'marcelo@gmail.com', ''),
(3, 'img/user3.avif', 'Rafael Santos', '$2y$10$LsZd6oajbDjkdyM9qKYvDOtgwu616s/u5V1SHaLXaGAJ.a0bfp.Nu', 'rafael@gmail.com', ''),
(4, 'img/user4.avif', 'Felipe Augusto', '$2y$10$0afrDrps8gp5HbfTdWtJ1OgExif0dfhq4Xyvx4mZR9EWygTcQ0QhO', 'felipe@gmail.com', ''),
(5, 'img/close-de-um-barbudo-sorridente-e-feliz-olhando_176420-20048.avif', 'Claudio Santos', '$2y$10$OZtthDyU15budGeNrtUNmugUF06DyAnWpE4Kxdv5BNiBi8AIU73sO', 'claudio@gmail.com', ''),
(14, 'img/images.jfif', 'Thiago Meira', '$2y$10$81RgVdwzKM4/PO39L0Osn.ItE.twS1bG.6RDKcEXdyA1soMcvSffq', 'thiago5coqueiro@outlook.com', '');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_mensagem`
--
ALTER TABLE `tb_mensagem`
  ADD PRIMARY KEY (`id_mensagem`);

--
-- Índices para tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_mensagem`
--
ALTER TABLE `tb_mensagem`
  MODIFY `id_mensagem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de tabela `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `id_user` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
