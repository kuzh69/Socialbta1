window.onload = function() {
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    principal = document.getElementById("principal");
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
    btnenviarM = document.getElementById("enviarM");
    txtCorreoM = document.getElementById("correoM");
    txtMensajeM = document.getElementById("mensajeM");
    redactar = document.getElementById("redactar");
    photo = document.getElementById("photo");
    camera = document.getElementById("camera");
    open = document.getElementById("open");
    if (localStorage.getItem("login") !== "1") {
        ingreso.style.display = "block";
        principal.style.display = "none";
        redactar.style.display = "none";
    }
    else {
        ingreso.style.display = "none";
        principal.style.display = "block";
        redactar.style.display = "block";
        nombre = localStorage.getItem("nombre");
        correo = localStorage.getItem("correo");
        document.getElementById("nombreP").innerHTML = nombre;
        leerM();
    }


document.getElementById("enviarM").addEventListener("click", function() {
    if (txtCorreoM.value == "") {
        alert("Debe escribir el correo");
        txtCorreoM.classList.add("errorCampo");
        return false;
    }
    else {
        txtCorreoM.classList.remove("errorCampo");
    }

    if (txtMensajeM.value == "") {
        alert("Debe escribir el nombre");
        txtMensajeM.classList.add("errorCampo");
        return false;
    }
    else {
        txtMensajeM.classList.remove("errorCampo");
    }

    let datosM = new FormData();
    datosM.append("correoM", txtCorreoM.value);
    datosM.append("mensajeM", txtMensajeM.value);

    fetch("https://tallerprogramacionavanzada.000webhostapp.com/guardarMensaje.php", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: datosM
    })
    .then(function (response) {
        if (response.ok) {
            alert("Usuario registrado");
        }
        else {
            alert("Ocurrió un error al registrar");
            console.log(response);
        }
    })
    .catch(function(err) {
        alert("Ocurrió un error inesperado");
        console.log(err);
    });
});

btnRegistrar.addEventListener("click", function() {
    ingreso.style.display = "none";
    registro.style.display = "block";
});

btnRegistro.addEventListener("click", function() {
    if (txtCorreo.value == "") {
        alert("Debe escribir el correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else {
        txtCorreo.classList.remove("errorCampo");
    }

    if (txtNombre.value == "") {
        alert("Debe escribir el nombre");
        return false;
    }
    if (txtContrasena.value == "") {
        alert("Debe escribir la contraseña");
        return false;
    }
    if (txtConfirmacion.value == "") {
        alert("Debe escribir la confirmación");
        return false;
    }
    if (txtContrasena.value !== txtConfirmacion.value) {
        alert("La contraseña y confirmación no coincide");
        return false;
    }
    if (txtFecha.value == "") {
        alert("Debe escribir la fecha");
        return false;
    }

    let datos = new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);
    //fetch("http://tpaepg.orgfree.com/registro.php", {
    fetch("https://tallerprogramacionavanzada.000webhostapp.com/registro.php", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: datos
    })
    .then(function (response) {
        if (response.ok) {
            alert("Usuario registrado");
        }
        else {
            alert("Ocurrió un error al registrar");
            console.log(response);
        }
    })
    .catch(function(err) {
        alert("Ocurrió un error inesperado");
        console.log(err);
    });
});

btnIngresar.addEventListener("click", function () {
    if (txtCorreoI.value == "") {
        alert("Debe escribir el correo");
        txtCorreo.classList.add("errorCampo");
        return false;
    }
    else {
        txtCorreoI.classList.remove("errorCampo");
    }

    if (txtContrasenaI.value == "") {
        alert("Debe escribir la contraseña");
        return false;
    }
    else {
        txtContrasenaI.classList.remove("errorCampo");
    }

    let datosI = new FormData();
    datosI.append("correoI", txtCorreoI.value);
    datosI.append("contrasenaI", txtContrasenaI.value);

    //fetch("http://tpaepg.orgfree.com/ingreso.php", {
    fetch("https://tallerprogramacionavanzada.000webhostapp.com/ingreso.php", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: datosI
    })
    .then(function (response) {
        return response.json();
    })
    .then(function(data){
        if (data.fallo == "contrasena") {
            alert("Debe escribir la contraseña correcta");
        }
        else if (data.fallo == "usuario") {
            alert("El correo no está registrado");
        }
        else {
            nombre = data.nombre;
            correo = data.correo;
            ingreso.style.display = "none";
            principal.style.display = "block";
            nombreP.innerHTML = nombre;
            localStorage.setItem("login", 1);
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("correo", correo);
            leerM();
        }
   })
    .catch(function(err) {
        alert("Ocurrió un error inesperado");
        console.log(err);
    });
});

document.getElementById("open").addEventListener("click", function() {
    camera.click();
});

camera.addEventListener("change", function(e) {
    photo.src = URL.createObjectURL(e.target.files[0]);
//    photo.srcObject = URL.createObjectURL(e.target.files[0]);
    let link = document.createElement('a');
    link.download = "test.png";
    link.href = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();
});
    
}  //onload

function mensajes() {
    redactar.style.display = "block";
    document.getElementById("mensajes").style.display = "block";
    document.getElementById("camara").style.display = "none";
    cerrarBarra();
} //principal

function cerrarSesion() {
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);
    //localStorage.clear();
    redactar.style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "none";
    document.getElementById("ingreso").style.display = "block";
} //cerrarSesion

function abrirBarra() {
    document.getElementById("barraMenu").style.width = "250px";
} //abrirBarra

function cerrarBarra() {
    document.getElementById("barraMenu").style.width = "0";
} //cerrarBarra

function leerM() {
    let datosLM = new FormData();
    datosLM.append("correoUsuario", correo);
    //fetch("http://tpaepg.orgfree.com/leerMensajes.php", {
    fetch("https://tallerprogramacionavanzada.000webhostapp.com/leerMensajes.php", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: datosLM
    })
    .then(function (response) {
        return response.json();
    })
    .then(function(data){
        for (let x = 0; x < data.length; x++) {
            document.getElementById("mensajes").innerHTML = 
            document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" +
            data[x].fechahora + "<br>";
        }
    });
} //leerM

function tomarFoto() {
    redactar.style.display = "none";
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("camara").style.display = "block";
    cerrarBarra();
} //tomarFoto

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../sw.js').then( () => {
      console.log('Service Worker Registered')
    })
  })
}