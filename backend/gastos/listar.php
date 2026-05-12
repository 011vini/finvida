<?php

include("../config/conexao.php");

$usuario_id = $_GET["usuario_id"];

$sql = "SELECT * FROM gastos
WHERE usuario_id = ?
ORDER BY data_gasto DESC";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "i",
    $usuario_id
);

$stmt->execute();

$resultado = $stmt->get_result();

$gastos = [];

while($linha = $resultado->fetch_assoc()){

    $gastos[] = $linha;
}

echo json_encode($gastos);

?>