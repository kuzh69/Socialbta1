<?php

define("SERVIDOR", "Localhost");
define("USUARIO", "285272");
define("CONTRASENA", "Pudindemansana1");
define("BD", "285272");
define("PUERTO", "3306");

$conexion = mysqli_connect(SERVIDOR, USUARIO, CONTRASENA, BD, PUERTO);

?>
