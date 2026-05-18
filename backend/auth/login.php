<?php

include("../config/conexao.php");

$dados = json_decode(
    file_get_contents("php://input"),
    true
);

$usuario = $dados["usuario"];
$senha = $dados["senha"];

$sql = "SELECT * FROM usuarios
WHERE usuario = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $usuario);

$stmt->execute();

$resultado = $stmt->get_result();

if($resultado->num_rows > 0){

    $user = $resultado->fetch_assoc();

    if(password_verify(
        $senha,
        $user["senha"]
    )){

        echo json_encode([
            "status" => "sucesso",
            "token" => base64_encode($user["id"] . ":" . $user["usuario"]),
            "usuario" => [
                "id" => $user["id"],
                "nome" => $user["nome"],
                "usuario" => $user["usuario"]
            ]
        ]);

    }else{

        echo json_encode([
            "status" => "senha incorreta"
        ]);
    }

}else{

    echo json_encode([
        "status" => "usuario nao encontrado"
    ]);
}

?>