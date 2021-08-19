window.onload = function(){
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    ingreso = document.getElementById("principal");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistro = document.getElementById("btnRegistro");
    btnRegresarIngresar = document.getElementById("Entrar");
    txtCorreoI = document.getElementById("correoI")
    txtContrasenaI = document.getElementById("contrasenaI");
    nombreP = document.getElementById("nombreP");
    MensajeM = document.getElementById("mensajeM");
    correoM = document.getElementById("correoM");
    photo = document.getElementById("photo");
    camara = document.getElementById("camara");
    openq = document.getElementById("open");
    mapa = document.getElementById("mapa");
    lugar = document.getElementById("lugar");
    redactar = document.getElementById("redactar");
    mensajes = document.getElementById("mensajes");
    /*localStorage.setItem("login", 1);
    localStorage.setItem("nombre", "Jose M");
    localStorage.setItem("correo", "1@1.com");
    if (localStorage.getItem("login") !=="1"){
        ingreso.style.display="block";
        principal.style.display="none";
        redactar.style.display="none";
        document.getElementById("camara").style.display = "none";
    } 
    else{
        ingreso.style.display="none";
        principal.style.display="block";
        redactar.style.display="block";
        nombreP.innerHTML= "Jose M";
        nombre = localStorage.getItem("nombre");
        nombre = localStorage.getItem("correo");
        //leerM();
    }*/

}
enviarM.addEventListener("click", function(){
    if(correoM.value == ""){
        alert ("Debes escribir usuario");
        correoM.classList.add("errorCampo");
        return false;
    }
    else {
        correoM.classList.remove("errorCampo");
    }
    if(MensajeM.value == ""){
        alert ("Debes escribir el mensaje");
        MensajeM.classList.add("errorCampo");
        return false;
    }
    else {
        correoM.classList.remove("errorCampo");
    }
    let metaMensaje = new FormData();
    metaMensaje.append("correoM", correoM.value);
    metaMensaje.append("MensajeM", MensajeM.value);

    fetch ("http://tcpmgja.orgfree.com/registrarMensaje.php", {
        method: 'POST',
        body: metaMensaje
    })
    .then (function(response){
        if (response.ok) {
            alert ("Mensaje Enviado");
        }
        else {
            alert("Ocurrio un error");
            console.log(response);
        }
        })
        .catch(function(err) {
            alert("ocurrio un error");
            console.log(err);
        }); 
});

btnRegistrar.addEventListener("click", function(){
ingreso.style.display ="none";
registro.style.display ="block";
});

btnRegistro.addEventListener("click", function(){

    if(txtCorreo.value == ""){
        alert ("Debes escribir tu correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else {
        txtCorreo.classList.remove("errorCampo");
    }
    if(txtContrasena.value !== txtConfirmacion.value){
        alert ("La confirmacion de la Contraseña es erronea");
        txtConfirmacion.classList.add("errorCampo");
        txtContrasena.classList.add("errorCampo");
        return false;
    }
    let datos = new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);

    fetch ("http://tcpmgja.orgfree.com/registro.php", {
        method: 'POST',
        body: datos
    })
    .then (function(response){
        if (response.ok) {
            alert ("usuario registrado");
        }
        else {
            alert("Ocurrio un error");
            console.log(response);
        }
        })
        .catch(function(err) {
            alert("ocurrio un error");
            console.log(err);
        }); 
});
document.getElementById("Entrar").addEventListener("click", function () {
    if(txtCorreoI.value == ""){
        alert ("Debes escribir tu correo");
        txtCorreoI.classList.add("errorCampo");
        return false;
    }
    else {
        txtCorreoI.classList.remove("errorCampo");
    }
    if(txtContrasenaI.value == ""){
        alert ("Debes escribir tu contrasena");
        txtContrasenaI.classList.add("errorCampo");
        return false;
    }
    else {
        txtCorreoI.classList.remove("errorCampo");
    }
    let datosI = new FormData();
    datosI.append("correoI", txtCorreoI.value);
    datosI.append("contrasenaI", txtContrasenaI.value);

    fetch ("http://tcpmgja.orgfree.com/Ingreso.php", {
        method: 'POST',
        body: datosI
    })
    .then (function(response){
        return response.json();
    })
    .then (function(data){
        if(data.fallo =="contrasena")
        {alert("debe ingresar contraseña")}
        else {  nombre = data.nombre;
                correo = data.correo;
                document.getElementById("ingreso").style.display = "none";
                principal.style.display = "block";
                nombreP.innerHTML = nombre;
                localStorage.setItem("Login", 1);
                localStorage.setItem("nombre", nombre);
                localStorage.setItem("correo", correo);
                leerM();

            }
    })
        .catch(function(err) {
            alert("ocurrio un error");
            console.log(err);
        });

});


function abrirBarra(){
    document.getElementById("barraMenu").style.width = "250px";
}
function cerrarBarra(){ 
    document.getElementById("barraMenu").style.width= "0px";
}
        

function leerM()
{   //Inicio leerM
        let datosLM = new FormData();
        datosLM.append("correoUsuario", correo)
        fetch ("http://tcpmgja.orgfree.com/leerMensajes.php", {
        method: 'POST',
        body: datosLM
    })
    .then (function(response){
        return response.json();
    })
    .then (function(data){
        for ( let x= 0; x < data.length;){
            x++;
            document.getElementById("mensajes").innerHTML = document.getElementById("mensajes").innerHTML + data[x].correo + "<br>" + data[x].mensaje + "<br>" +data[x].fechahora+ "<br>";
        }
    });
}//fin leerM

document.getElementById("open").addEventListener("click", function(){
    document.getElementById("camera").click();
});

function tomarfoto() {
    redactar.style.display = "none";
    mensajes.style.display = "none";
    document.getElementById("camara").style.display = "block";
}

document.getElementById("camera").addEventListener("change", function(e){
    ruta = URL.createObjectURL(e.target.file[0]);
    //7photo.src = URL.createObjectURL(e.target.file[0]);
    obtenerLugar();
    photo.src = ruta;
    if (obtenerSO() =="iOS"){
        let link = document.createElement('a');
        link.download= "prueba1.png";
        //link.href = ruta; ///photo.toDataURL(images/png).replace("image/png", "image/octet-stream");
        link.ruta;
        link.click();
        alert("foto capturada");
    }
    
});

mapa.addEventListener('click', function(){
    window.open("http://nominatim.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon" + coordenadas.lon + "&zoom=20");
});

function obtenerLugar(){
coordenadas = {lat:0, lon:0};
navigator.geolocation.getCurrentPosition(function(position){
    coordenadas = {lat: position.coords.latitude, lon: position.coords.longitude}

    fetch ("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon" + coordenadas.lon)
    .then(response => response.json())
    .then(data => {
        document.getElementById("lugar").value = data.address.country + " " + data.address.state;
    })
    .catch(error => {
        console.log(error);
        coordenadas = {lat:0, lon:0};
    });
});
}

function obtenerSO(){
    let so = null;
    let platform = window.navigator.platform,
        iosPlatforms = ['iPhone', 'iPad','iPod'];
    if (iosPlatforms.includes(platforms)){
        so = 'iOS';
    return so;
    }
}

function cerrarSesion() {

    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);

    redactar.style.display = "none";
    document.getElementById("principal").style.display= "none";
    document.getElementById("mensajes").style.display= "none";
    document.getElementById("camara").style.display= "none";
    document.getElementById("ingreso").style.display= "block";
}
function mensajes() {
    redactar.style.display = "block";
    document.getElementById("mensajes").style.display = "block";
    document.getElementById("camara").style.display = "none";
    cerrarBarra();
}

