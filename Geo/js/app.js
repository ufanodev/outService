'use strict'

var lat;
var long;
var url, peticion, unjson;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("No soporta geo");
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  lat=lat+'123';
  long = position.coords.longitude;
  long=long+'123';
  realizarPeticion();
}

function realizarPeticion(){
  console.log("hace peticion");
  let key='db55f1777b1a777d9db0bca240c105ba';
  url = 'http://api.positionstack.com/v1/reverse?access_key='+key+'&query='+lat+','+long;
  peticion = new XMLHttpRequest();
  peticion.onreadystatechange = procesarRespuesta;
  peticion.open("GET", url, true );
  peticion.send(null);
}

function procesarRespuesta(){
  let respuesta='';
  console.log("hace procesar");
  if ( peticion.readyState == 4 && peticion.status == 200 )
    {
        if ( peticion.responseText == "Not found" )
        {
          console.log("not found");
        }
        else
        {
          unjson = JSON.parse(peticion.responseText);
          respuesta = unjson.data[7].label;
          document.getElementById("recogida").innerHTML = respuesta;
        }
    }
    else{
      console.log(peticion.status);
    }
}

function fechaActual(){
	var f = new Date();
	f = (f.getDate() + "-" + (f.getMonth() +1) + "-" + f.getFullYear());
    return f;
}

function horaInicio(){
    var f = new Date();
	f = (f.getHours() + ":" + (f.getMinutes() + 35) + ":" + f.getSeconds());
    return f;
}

function horaFin(){
    var f = new Date();
    let hora = f.getHours();
    let minutos = f.getMinutes() + 60;
    let segundos = 55;
    if (minutos > 60){
        minutos = minutos % 60;
        hora +=1;
    }
	f = hora + ":" + minutos + ":" + segundos;
    return f;
}

window.addEventListener("load", function () {
  let fecha = fechaActual();
  let inicio = horaInicio();
  let final = horaFin();
  document.getElementById("fecha").innerHTML = fecha;
  document.getElementById("horaini").innerHTML = inicio;
  document.getElementById("horafin").innerHTML = final;
  getLocation();
});


