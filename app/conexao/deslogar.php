<?php 
session_start();
if (isset($_SESSION['login'])) {
    session_destroy();
    header('Location: http://localhost/Chat-anonimo/login.php');
    exit;
}else {
    header('Location: http://localhost/Chat-anonimo/login.php');
}
