<?php

    header("Access-Control-Allow-Origin: *"); //Permite que el origen de la informacion sea de un lugar diferente al servidor, si no se le pone rechazan los datos los navegadores

    $correo = $_REQUEST["correoR"];//REQUEST identifica cualquier metodo que estemos usando
    $nombre = $_REQUEST["nombreR"];
    $contrasena = $_REQUEST["contrasenaR"];
    $fecha = $_REQUEST["fechaR"];

    require("conexion.php");

    $cifrada = password_hash($contrasena, PASSWORD_DEFAULT);
    $sql = "INSERT INTO tblUsuario VALUES('$correo','$cifrada','$nombre','$fecha')";
    mysqli_query($conexion, $sql);
    mysqli_close($conexion);

    echo "Registrado";
?>