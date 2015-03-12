var entrada=0;
var salida=0;
var trabajo=0;
var reservados=0;

function cargarBandejaTrabajo(){
var ajax =dojo.xhrGet({
        url: url,
        handleAs: "text",
     	preventCache: true,
        timeout: 10000, //Time in milliseconds
        handle: function(response, ioArgs){
                   if(response instanceof Error){
                        if(response.dojoType == "cancel"){
                       			alert(ioArgs.xhr.status)
                        }else if(response.dojoType == "timeout"){
                           alert("timeout");
                        }else{
                             alert( "problem"+ response.dojoType);
                        }
                }else{
                	 trabajo=1;
				//alert(response)
                     document.getElementById("BandejaTrabajo").innerHTML=response;	
                  //document.getElementById("BandejaTrabajo").innerText="<a>TRABAJO</A>"
                }
                return response;
        }
});
}
function cargarBandejaEntrada(){
var ajaxentrada =dojo.xhrGet({
        url: urlentrada,
        handleAs: "text",
     	preventCache: true,
        timeout: 10000, //Time in milliseconds
        handle: function(response, ioArgs){
                   if(response instanceof Error){
                        if(response.dojoType == "cancel"){
                       			alert(ioArgs.xhr.status)
                        }else if(response.dojoType == "timeout"){
                           alert(timeout);
                        }else{
                               
                        }
                }else{
                	entrada=1;
                      document.getElementById("BandejaEntrada").innerHTML=response
                     // document.getElementById("BandejaEntrada").innerHTML="<A>ENTRADA</A>"
                }
                return response;
        }
});

}
function cargarBandejaSalida(){
var ajaxsalida =dojo.xhrGet({
        url: urlsalida,
        handleAs: "text",
     	preventCache: true,
        timeout: 10000, //Time in milliseconds
        handle: function(response, ioArgs){
                   if(response instanceof Error){
                        if(response.dojoType == "cancel"){
                       			alert(ioArgs.xhr.status)
                        }else if(response.dojoType == "timeout"){
                           alert(timeout);
                        }else{
                               
                        }
                }else{
                	  salida=1;
                     document.getElementById("BandejaSalida").innerHTML=response	
//				document.getElementById("BandejaSalida").innerHTML="<A>SALIDA</A>"		
                }
                return response;
        }
});

}
function cargarReservados(){
var ajaxentrada =dojo.xhrGet({
        url: urlreservados,
        handleAs: "text",
     	preventCache: true,
        timeout: 10000, //Time in milliseconds
        handle: function(response, ioArgs){
                   if(response instanceof Error){
                        if(response.dojoType == "cancel"){
                       			alert(ioArgs.xhr.status)
                        }else if(response.dojoType == "timeout"){
                           alert(timeout);
                        }else{
                        }
                }else{
                      document.getElementById("divReservados").innerHTML=response
				 cargarNombres();
                }
                return response;
        }
});

}
// Carga la bandeja de finalizados
function cargarFinalizados(){
var ajaxentrada =dojo.xhrGet({
        url: urlfinalizados,
        handleAs: "text",
     	preventCache: true,
        timeout: 10000, //Time in milliseconds
        handle: function(response, ioArgs){
                   if(response instanceof Error){
                        if(response.dojoType == "cancel"){
                       			alert(ioArgs.xhr.status)
                        }else if(response.dojoType == "timeout"){
                           alert(timeout);
                        }else{
                        }
                }else{
                      document.getElementById("divFinalizados").innerHTML=response
				 cargarNombres();
                }
                return response;
        }
});

}
function DirABS(){ 
var pathname=location.pathname;  
	return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)));
}

function retornarNombreForm(codigo){
	return top.frames['superior'].nombreFormulario(codigo);
}

function obtenerNombreForm(codigo){
	nombre=top.frames['superior'].nombreFormulario(codigo);
	document.write(nombre);
}

function abrirDocumento(unid){
	top.location.href = DirABS()+"/0/"+unid+"?OpenDocument";
}


function crearFormulario(codigo){
	dijit.byId("dialogCrearForm").show();
	//top.location = DirABS()+"/CrearForm?OpenAgent&unidad="+document.forms[0].sUnidad.value+"&usuario="+document.forms[0].sUsuario.value+"&codigo="+codigo;
}
function cargarNombres(){
	if (entrada==1 && salida==1 && trabajo==1){
		var celdas = document.getElementsByTagName("td");

		for (var i=0;i<celdas.length;i++){
			if(celdas[i].id){
				if (celdas[i].id=="nombreForm"){
					celdas[i].innerHTML=top.frames['superior'].nombreFormulario(celdas[i].innerHTML);
				}else{
					if (celdas[i].id=="nombreUnidad" && celdas[i].innerHTML!="&nbsp;"){
						celdas[i].innerHTML=top.frames['superior'].nombreUnidad(celdas[i].innerHTML);
					}
				}
			}
		}
	}else{
		setTimeout("cargarNombres()",300);
	}
}
