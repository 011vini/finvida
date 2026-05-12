<?php

include("../config/conexao.php");

$dados = json_decode(
    file_get_contents("php://input"),
    true
);

$usuario_id = $dados["usuario_id"];

$descricao = $dados["descricao"];

$valor = $dados["valor"];

$categoria = $dados["categoria"];

$data = $dados["data_gasto"];

$sql = "INSERT INTO gastos
(
    usuario_id,
    descricao,
    valor,
    categoria,
    data_gasto
)
VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "isdss",
    $usuario_id,
    $descricao,
    $valor,
    $categoria,
    $data
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