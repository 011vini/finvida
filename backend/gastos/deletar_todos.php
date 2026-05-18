<?php
include("../config/conexao.php");

$dados = json_decode(file_get_contents("php://input"), true);
$usuario_id = $dados["usuario_id"];

if (!$usuario_id) {
    echo json_encode(["status" => "erro", "mensagem" => "ID do usuário não fornecido"]);
    exit;
}

$sql = "DELETE FROM gastos WHERE usuario_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "erro", "mensagem" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $usuario_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "sucesso"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Execute failed: " . $stmt->error]);
}
?>
