function metodoIngreso(tipo){

	if(tipo == "Selector"){
		document.getElementById("divLibre").style.display = "none";
		document.getElementById("divName").style.display=   "block";
	}else{
		document.getElementById("divLibre").style.display = "block";
		document.getElementById("divName").style.display=   "none";
	}
}

function agregar(datoAgregar){
		var vValores =  StringToVector3(document.forms[0].destinatarios.value,",");
		datoAgregar = datoAgregar.split("/")[0];
		if (vValores.vIsMember(datoAgregar)){
			 alert (datoAgregar + " ya existe en la lista de votantes");
			 return false;
		}
		
		document.forms[0].destinatarios.value+= "," + datoAgregar;
		cargarDestinatarios();
}
function cargarDestinatariosLibre(datoAgregar){
var vValores =  StringToVector3(document.forms[0].destinatarios.value,",");
	if (vValores.vIsMember(datoAgregar)){
			 alert (datoAgregar + " ya existe en la lista de votantes");
			 return false;
		}
		
		document.forms[0].destinatarios.value+= "," + datoAgregar;
		cargarDestinatarios();
}
function cargarDestinatarios(){
var vValores =  StringToVector3(document.getElementById("destinatarios").value,",");
	var row = "<table width=\"250\"  border=0 cellpadding=\"0\" cellspacing=\"0\">";	

	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
		//if(document.forms[0].sModo.value=="1" & document.forms[0].ccEstado.value=="En Desarrollo"){
			row+="<td class=\"tdSeleccion\" align='right'><img alt=\"Remover de Votantes\" src=\""+ DirABS()+"/images/icons/remove.gif\" onclick=\"quitarDestinatarios("+ i+ ")\"></td>";	
		//}		
		row+="</tr>";

		//new Insertion.Bottom("sAdministradores-List",row);
	}
	row+="</table>"
	//alert(document.getElementById("sVotantes-List"));
	document.getElementById("destinatarios-List").innerHTML=row;
}
function quitarDestinatarios(indice){
	var vValores =  StringToVector3(document.forms[0].destinatarios.value,",");
	vValores.vBorrar(indice)
	document.forms[0].destinatarios.value=VectorToString2(vValores,",");
	cargarDestinatarios();

}

function aagregar(datoAgregar){
	
		if (document.forms[0].destinatarios.value==""){

			document.forms[0].destinatarios.value=datoAgregar;
			
		}	
		else{
	     	document.forms[0].destinatarios.value+=";"+datoAgregar;
	     }
		$('#NamePickerULTRA').dialog( "close" );
}
function agregarUnidad(nombre,codigo){
		
			var vValores2 =  StringToVector3(document.forms[0].unidadesdest.value,",");
			if (vValores2.vIsMember(codigo)){
					 alert (nombre + "  ya existe en la lista de Unidades Destinatarias");
			 		return false;
			}

			document.forms[0].unidadesdest.value += "," +codigo;
    			document.forms[0].unidadesdestTextos.value +=","+ nombre ;
			 cargarUnidades();
			 $('#NamePickerUnidadULTRA').dialog( "close" );
}
function cargarUnidades(){

	vValores =  StringToVector3(document.forms[0].unidadesdestTextos.value,",");

	var row = "";	
	for (i = 0; i < vValores.vArray.length; i++){
		row+= "<tr>";
		row+="<td class=\"tdSeleccion\" width='240'>"+vValores.vArray[i]+"<input type=\"hidden\" name=\""+this.target_field+"\" value=\""+vValores.vArray[i]+"\"></td>";
          if (document.getElementById("Edicion").value == 1){
			row+="<td class=\"tdSeleccion\" align='right'><img src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarUnidadDest("+ i+ ")\"></td>";
		}		

		row+="</tr>";
	
	}
	$("#tablaUnidades > tbody").html(row);

}
function QuitarUnidadDest(indice){
		
		var vValores =  StringToVector3(document.forms[0].unidadesdest.value,",");
		vValores.vBorrar(indice);
		document.forms[0].unidadesdest.value=VectorToString2(vValores,",");

		var vValores =  StringToVector3(document.forms[0].unidadesdestTextos.value,",");
		vValores.vBorrar(indice);
		document.forms[0].unidadesdestTextos.value=VectorToString2(vValores,",");
		cargarUnidades();
		

}
function DirABS(){ 
var pathname=location.pathname;  
pathname=pathname.toUpperCase();
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.indexOf('.NSF')+5)))  
} 

function Notificar(){
	if ( document.getElementById("numAuto").value=="No"){	//debe ingresar un numero de comunicacion
		if (document.forms[0].num_comunicacion.value==""){
			alert("Debe ingresar el Nro de Comunicación")
		}else{
		
			if (document.forms[0].destinatarios.value=="" ){
				alert("Debe ingresar los Destinatarios de la Comunicación");
			
			}else{
		 	   document.forms[0].submit();
			}
		}
	}else {
		if (document.forms[0].destinatarios.value=="" ){
				alert("Debe ingresar los Destinatarios de la Comunicación");
			
			}else{
		 	   document.forms[0].submit();
			}
	}
}
function Salir(){
	window.location = DirABS();
}
function Resolucion(){
	window.location=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+"/"+document.forms[0].baseResol.value+"/0/"+document.forms[0].id.value+"?OpenDocument"
}
function Resoluciones(){
	window.location=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+"/"+document.forms[0].baseResol.value+"/inicio?OpenFrameSet"
}

function Editar(){
	window.location=DirABS()+"/0/"+document.forms[0].unid.value+"?EditDocument";
}
function seleccionarDestinatario(boton){
NamePicker.init( {
  
  prompt: '<p>Seleccione la persona que desea agregar</p>',
  addressbook: '/names.nsf',
  viewname: '($VIMPeople)',
  viewname2: 'People',
  column: 1,
  actualizar: 1,
  empty: true
})
NamePicker.open(boton, 'destinatarios', 'multi', 'Seleccione  los Miembros');
}

function seleccionarUnidad(boton){
NamePicker.init( {
  prompt: '<p>Seleccione la Unidad</p>',
  addressbook: "/"+document.forms[0].sPathOrgan.value,
  viewname: '(BusquedaCorreoPorUnidad)',
  column: 1,
  column_codigo: 2,
  msg_repetido: "La unidad ya se encuentra seleccionada",
  empty: true
})
NamePicker.open(boton, "unidadesdest", 'con_codigo', 'Seleccione  la Unidad');
}
function dibujarImg(nombre){
//document.write("<img src='../"+ document.getElementById("universalidd")+"/$FILE/" + nombre+"' alt='' />");
	return "<img src='../"+ document.getElementById("unid").value+"/$FILE/" + nombre+"' alt='' />";
}