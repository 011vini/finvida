<?php

include("../config/conexao.php");

$dados = json_decode(
    file_get_contents("php://input"),
    true
);

$usuario = $dados["usuario"];
$nome = $dados["nome"];

$senha = password_hash(
    $dados["senha"],
    PASSWORD_DEFAULT
);

$sql = "INSERT INTO usuarios
(usuario, nome, senha)
VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sss",
    $usuario,
    $nome,
    $senha
);

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