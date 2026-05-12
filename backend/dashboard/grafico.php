<?php

include("../config/conexao.php");

$usuario_id = $_GET["usuario_id"];

$sql = "
SELECT
categoria,
SUM(valor) as total
FROM gastos
WHERE usuario_id = ?
GROUP BY categoria
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "i",
    $usuario_id
);

$stmt->execute();

$resultado = $stmt->get_result();

$dados = [];

while($linha = $resultado->fetch_assoc()){

    $dados[] = $linha;
}

echo json_encode($dados);

?>