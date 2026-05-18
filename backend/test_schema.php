<?php
include("config/conexao.php");
$res = $conn->query("SHOW COLUMNS FROM gastos");
while($row = $res->fetch_assoc()) {
    print_r($row);
}
?>
