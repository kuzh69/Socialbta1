<?php
header("Access-Control-Allow-Origin: *");

$correoUsuario = $_REQUEST["correoUsuario"];

$sql = "SELECT * FROM tblMensajes WHERE menPara = '$correoUsuario'";

require("conexion.php");

$resultado = mysqli_query($conexion, $sql);

$retorno = array();

while ($registro = mysqli_fetch_assoc($resultado)){
    $retorno[] = array("correo" => $registro["menPara"],
                       "mensaje" => $registro["menMensaje"],
                       "fechahora" => $registro["menFechaHora"]);
}

mysqli_close($conexion);

header('Content-type: application/json');
echo json_encode($retorno);
?>