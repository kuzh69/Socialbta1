<?php
header("Access-Control-Allow-Origin: *");

$para = $_REQUEST["menPara"];
$mensaje = $_REQUEST["menMensaje"];

require("conexion.php");

$sql = "INSERT INTO tblMensajes VALUES('$para','$mensaje',NOW())";

mysqli_query($conexion, $sql);
mysqli_close($conexion);

?>