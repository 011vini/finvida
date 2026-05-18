<?php
include("config/conexao.php");
$res = $conn->query("SELECT id, usuario FROM usuarios LIMIT 5");
while($row = $res->fetch_assoc()) {
    print_r($row);
}
?>
