<?php

$host = "127.0.0.1";
$usuario = "root";
$senha = "";
$banco = "finvida";
$porta = 3307;

$conn = new mysqli(
    $host,
    $usuario,
    $senha,
    $banco,
    $porta
);

if($conn->connect_error){

    die("Erro: " . $conn->connect_error);
}

?>