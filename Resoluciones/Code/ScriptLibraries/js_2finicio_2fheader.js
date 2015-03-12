function llamadoAj(){
url = "http://desarrollo2.isaltda.com.uy/desarrollo/Resoluciones.nsf/InicioResolucionesHTML?OpenAgent"
	$.ajax({
 	 type: "GET",
 	 url: url,
 	 cache: false,
	contentType: "text/html; charset=UTF-8", 	  	 
	 success: function(response){
		$("#contenidoaj").html(response);
		},
	 error: function(response) {
           alert("**" +response.error);
          }
	});
}