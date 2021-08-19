<?php

header("Access-Control-Allow-Origin: *");

$correo = $_REQUEST["correoUsuario"];
$mensajede =$_REQUEST["mensaje"];

require("conexion.php");

$sql ="SELECT * FROM tblMensajes WHERE menPara ='$correo'";

$retorno = array();

$resultado = mysqli_query($conexion, $sql);

while($registro = mysqli_fetch_assoc($resultado))
{
    $retorno[] = array("correo" => $registro["menPara"],
    "mensaje" => $registro["menMensaje"], 
    "fechahora" => $registro["menFechaHora"]);
}
mysqli_close($conexion);

header('Content-type: application/json');
echo json_encode($retorno);


?>