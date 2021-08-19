<?php

header("Access-Control-Allow-Origin: *");

$correoM = $_REQUEST["correoM"];
$MensajeM = $_REQUEST["MensajeM"];

require("conexion.php");

$sql ="INSERT INTO tblMensajes VALUES('$correoM','$MensajeM', NOW() )";
mysqli_query($conexion, $sql);
mysqli_close($conexion);


echo "Enviado!";
 
?>