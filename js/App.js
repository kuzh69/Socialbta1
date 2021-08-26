window.onload = function(){
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    principal = document.getElementById("principal");
    mensajes = document.getElementById("mensajes");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistro = document.getElementById("btnRegistro");
    btnIngresar = document.getElementById("btnIngresar");
    txtCorreoI = document.getElementById("correoI");
    txtContrasenaI = document.getElementById("contrasenaI");
    nombreP = document.getElementById("nombreP");
    DM = document.getElementById("DM");
    btnEnviar = document.getElementById("btnEnviar");
    txtmenPara = document.getElementById("menPara");
    txtmenMensaje = document.getElementById("menMensaje");
    lmensajes = document.getElementById("lmensajes");
    photo = document.getElementById("photo");
    camera = document.getElementById("camera");
    opens = document.getElementById("opens");
    mapa = document.getElementById("mapa");
    lugar = document.getElementById("lugar");
    /*Temporal*/
    /*localStorage.setItem("login", 1);
    localStorage.setItem("nombre", "luis");
    localStorage.setItem("correo", "luis@prueba.com");
    if(localStorage.getItem("login") !== "1"){
        ingreso.style.display = "block";
        principal.style.display = "none";
        DM.style.display = "none";
        camera.style.display = "none";
    }
    else{
        ingreso.style.display = "none";
        principal.style.display = "block";
        DM.style.display = "block";
        nombre = localStorage.getItem("nombre");
        correo = localStorage.getItem("correo");
        nombreP.innerHTML = nombre;
        leerM();
    }*/

}

btnRegistrar.addEventListener("click", function() {
    ingreso.style.display = "none";
    registro.style.display = "block";
});

btnRegistro.addEventListener("click", function(){
    if(txtCorreo.value == ""){
        alert("Debe escribir un correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreo.classList.remove("errorCampo");
    }
    if(txtNombre.value == ""){
        alert("Ingresa el nombre");
        txtNombre.classList.add("errorCampo");
        return false;
    }
    else{
        txtNombre.classList.remove("errorCampo");
    }
    if(txtContrasena.value == ""){
        alert("Escribir una contraseña");
        txtContrasena.classList.add("errorCampo");
        return false;
    }
    else{
        txtContrasena.classList.remove("errorCampo");
    }
    if(txtConfirmacion.value == ""){
        alert("Escribir la confirmación");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    }
    else{
        txtConfirmacion.classList.remove("errorCampo");
    }
    if(txtContrasena.value !== txtConfirmacion.value){
        alert("Las contraseñas no coinciden");
        txtConfirmacion.classList.add("errorCampo");
        return false;
    }
    else{
        txtConfirmacion.classList.remove("errorCampo");
    }
    if(txtFecha.value == ""){
        alert("Ingresa la fecha");
        txtFecha.classList.add("errorCampo");
        return false;
    }
    else{
        txtFecha.classList.remove("errorCampo");
    }

    let datos = new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);

    fetch("http://tpaoala.orgfree.com/registro.php", { //lo manda al php y de ahí a la base de datos
        method: 'POST', //*GET, POST, PUT, DELETE, etc.
        body: datos 
    })
    .then(function (response) {
        if (response.ok){
            alert("Usuario registrado"); //Verifica que el usuario este bien registrado
        }
        else{
            alert("Ocurrió un error al registrar"); //Hace saber que ocurrio un error al usuario al momento de registrarse
            console.log(response);
        }
    }) //then se ejecuta después del fetch 
    .catch(function(err) {
        alert("Ocurrió un error inesperado");
        console.log(err);
    }); //catch si ocurre un error desde antes cae en este bloque y con este mensaje se identifica
});

btnIngresar.addEventListener("click", function(){
    if(txtCorreoI.value == ""){
        alert("Ingrese correo");
        txtCorreoI.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreoI.classList.remove("errorCampo");
    }
    if(txtContrasenaI.value == ""){
        alert("Ingrese su contraseña");
        txtContrasenaI.classList.add("errorCampo");
        return false;
    }
    else{
        txtContrasenaI.classList.remove("errorCampo");
    }

    let datosI = new FormData();
    datosI.append("correoI", txtCorreoI.value);
    datosI.append("contrasenaI", txtContrasenaI.value);

    fetch("http://tpaoala.orgfree.com/ingreso.php",{
        method: 'POST',
        body: datosI
    })
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        if(data.fallo == "contrasena"){
            alert("Verifique su contraseña");
        }
        else if(data.fallo == "usuario"){
            alert("El correo no existe");
        }
        else{
            nombre = data.nombre;
            correo = data.correo;
            ingreso.style.display = "none";
            principal.style.display = "block";
            nombreP.innerHTML = nombre;
            localStorage.setItem("login", 1)//guardar datos aislados localstorage. setitem para guardar un documento del archivo
            localStorage.setItem("nombre", nombre)
            localStorage.setItem("correo", correo)
            leerM();
        }
    })
    .catch(function (err){
        alert("Hubo un error, por favor vuelva a intentarlo");
        console.log(err);
    });
});

function abrirBarra(){
    document.getElementById("barraMenu").style.width="250px";
}
function cerrarBarra(){
    document.getElementById("barraMenu").style.width="0";
}
function leerM(){
    let datosLM = new FormData();
    datosLM.append("correoUsuario", correo);
    
    fetch("http://tpaoala.orgfree.com/leerMensajes.php",{
        method: 'POST',
        body: datosLM
    })
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        for(let x = 0; x < data.length; x++){
            document.getElementById("lmensajes").innerHTML =
            document.getElementById("lmensajes").innerHTML + data[x].mensaje + "<br>" +
            data[x].fechahora + "<br>";
        }
    })
    .catch(function (err){
        alert("Hubo un error, por favor vuelva a intentarlo");
        console.log(err);
    });
}

/*DM.addEventListener("click", function(){
    principal.style.display = "none";
    mensajes.style.display = "block";
    cerrarBarra();
});*/

btnEnviar.addEventListener("click", function(){
    if(txtmenPara == ""){
        alert("No has escrito el destinatario");
        txtmenPara.classList.add("errorCampo");
        return false;
    }
    else{
        txtmenPara.classList.remove("errorCampo");
    }
    if(txtmenMensaje == ""){
        alert("Escribe lo que vas a mandar");
        txtmenMensaje.classList.add("errorCampo");
        return false;
    }
    else{
        txtmenMensaje.classList.remove("errorCampo");
    }

    let datosII = new FormData();
    datosII.append("menPara", txtmenPara.value);
    datosII.append("menMensaje", txtmenMensaje.value);

    fetch("http://tpaoala.orgfree.com/registrarMensaje.php",{
        method: 'POST',
        body: datosII
    })
    .then(function (response){
        if(response.ok){
            alert("Mensaje enviado");
        }
        else{
            alert("Ocurrio un error")
        }
    })
    .catch(function(err){
        alert("Ocurrió un error inesperado");
        console.log(err);
    });

});

function mensaje(){
    //DM.display.style = "block";
    mensajes.style.display = "block";
    camara.style.display = "none";
    camera.style.display = "none";
    cerrarBarra();
}

opens.addEventListener("click", function(){
    camera.click();
});

function obtenerSO(){
    let so = null;
    let plataform = window.navigator.platform,
        iosPlataforms = ['iPhone', 'iPad', 'iPod'];
    if(iosPlataforms.includes(platform)){
        so = 'iOS';
    }
    return so;
}

mapa.addEventListener('click', function(){
    window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon=" + coordenadas.lon + "&zoom=20");
});

camara.addEventListener("change", function(e){
    ruta = URL.createObjectURL(e.target.files[0]);
    obtenerLugar();
    photo.src = ruta;
    if (obtenerSO() == "iOS"){
        let link = document.createElement('a');//crea un nuevo html
        link.download = "test.png";//lo que se vaya a descargar llevará ese nombre
        //link.href = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");
        link.ruta;
        link.click();
    }
});

function obtenerLugar(){
    coordenadas = {lat: 0, lon:0};
    navigator.geolocation.getCurrentPosition(function(position){
        coordenadas = {lat: position.coords.latitude, lon: position.coords.longitude}

        fetch("http://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon=" + coordenadas.lon)
        .then(response => response.json())
        .then(data => {
            document.getElementById("lugar").value = data.address.country + " " + data.address.state;
        })
        .catch(error => {
            console.log(error);
            coordenadas = {lat: 0, lon: 0};
        });
    });
}

function tomarFoto(){
    camara.style.display = "block";
    //DM.style.display = "none";
    mensajes.style.display = "none";
    cerrarBarra();
}

function cerrarSesion(){
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);
    //localStorage.clear se puede usar para no poner las 3 anteriores
    DM.style.display = "none";
    principal.style.display = "none";
    mensajes.style.display = "none";
    camera.style.display = "none";
    ingreso.style.display = "block";
}