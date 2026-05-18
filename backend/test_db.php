<?php
include("config/conexao.php");

$usuario_id = 4;
$descricao = "Teste 2";
$valor = 10.5;
$categoria = "Outros";
$data = "2026-05-18";

$sql = "INSERT INTO gastos ( usuario_id, descricao, valor, categoria, data_gasto ) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
    exit;
}

$stmt->bind_param("isdss", $usuario_id, $descricao, $valor, $categoria, $data);

if($stmt->execute()){
    echo "Success";
}else{
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
?>
