<?php
$data = array(
    "usuario_id" => 4,
    "descricao" => "Test 3",
    "valor" => 15.00,
    "categoria" => "Outros",
    "data_gasto" => "2026-05-18"
);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents('http://localhost/finvida/finvida/backend/gastos/adicionar.php', false, $context);
if ($result === FALSE) { 
    echo "Error";
} else {
    echo "Result:\n" . $result;
}
?>
