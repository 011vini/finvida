<?php

include("../config/conexao.php");

$dados = json_decode(
    file_get_contents("php://input"),
    true
);

$id = $dados["id"];
$usuario_id = $dados["usuario_id"];

$sql = "DELETE FROM gastos WHERE id = ? AND usuario_id = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ii",
    $id,
    $usuario_id
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
