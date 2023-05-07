import datos from "./users.json"
import fs from "fs";

window.addEventListener(`DOMContentLoaded`, (event) =>{
  obtener_listado();
});

function obtener_listado(){
  var solicitud = generar_solicitud();
  var resp_server = false;
  var msg_error = "";

  solicitud.onreadystatechange = function(){
    if(solicitud.readyState == 4) {
      if (solicitud.status == 200) {
        if (solicitud.responseText != null && solicitud.responseText != undefined){
          try {
            resp_server = JSON.parse(solicitud.responseText);
            
            if (resp_server.datos != null && resp_server.datos != 0) {
              dibujar_tabla_ubicaciones(resp_server.datos);
            } else {
              msg_error = "la tabla no contiene datos.";
            }
          } catch (error) {
            msg_error = "Error al interpretar la respuesta del servidor: " + error;
          } 
        } else {
          msg_error = "la tabla no contiene datos.";
        }
      } else {
        msg_error = "Error al conectar con el servidor: " + solicitud.statusText;
      }

      document.getElementById(`error_servidor`).innerHTML = msg_error;
    }
  }

  solicitud.open("POST", "leerubicaciones.php");
  solicitud.send();
}

function generar_solicitud() {
  var solicitud = new XMLHttpRequest();
  return solicitud;
}
