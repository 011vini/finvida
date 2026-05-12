<?php

include("../config/conexao.php");

// RECEBER JSON

$dados = json_decode(
    file_get_contents("php://input"),
    true
);

// PEGAR DADOS

$nome = $dados["nome"];

$usuario = $dados["usuario"];

$senha = password_hash(
    $dados["senha"],
    PASSWORD_DEFAULT
);

// SQL

$sql = "INSERT INTO usuarios
(nome, usuario, senha)
VALUES (?, ?, ?)";

// PREPARAR

$stmt = $conn->prepare($sql);

// PASSAR DADOS

$stmt->bind_param(
    "sss",
    $nome,
    $usuario,
    $senha
);

// EXECUTAR

if($stmt->execute()){

    echo json_encode([
        "status" => "sucesso"
    ]);

}else{

    echo json_encode([
        "status" => "erro"
    ]);
}

?>