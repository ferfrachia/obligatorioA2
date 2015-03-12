function agregarUsu(usuario){
	if(document.getElementById('Usuarios').value==""){
		document.getElementById('Usuarios').value=usuario;
	}else{
		var miembros=StringToVector3(document.getElementById("Usuarios").value,';')
		var esta = false;
		for (var i=0; i<miembros.vLength;i++){
			if (miembros.vArray[i] == usuario) {
				esta = true;
				alert("Este usuario ya esta ingresado");
			}
		}
		
		if (esta==false){	
			document.getElementById('Usuarios').value+=";"+usuario;
		}
	}
	cargarUsuarios();
	$('#NamePickerULTRARolFirmante').dialog('close');
}

function cargarUsuarios(){
	var tbody= document.getElementById('Usuarios-List');
	while(tbody.rows.length>0){
		tbody.deleteRow(tbody.rows[1])
	}
	//var miembros=StringToVector3(document.forms['formAvisos'].Usuarios.value,',')
	var miembros=StringToVector3(document.getElementById("Usuarios").value,';')
	for (var i=0; i<miembros.vLength;i++){
			var row = "<tr>";
			row+="<td class=\"tdSeleccion\">"+miembros.vArray[i]+"</td>";
			row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"QuitarUsuario("+i+")\" style=\"cursor:hand;\"></td>";
			row+="</tr>";
			$('#Usuarios-List').html($('#Usuarios-List').html()+row);
	}
}

function QuitarUsuario(pos){
	arregloLectores = document.getElementById('Usuarios').value.split(";");
	arregloLectores.splice(pos,1);
	document.getElementById('Usuarios').value=arregloLectores.join(";");
	cargarUsuarios();
}

function setearFirmantes(){
	var sActual = document.getElementById("tipoSesionActual").value;
	var pos = 0	
	
	for (var i=0; i<document.getElementsByName("tiposSesion").length;i++){
		if(document.getElementsByName("tiposSesion")[i].value == sActual){
			pos=i;
		}
	}
	var cantFirmas = document.getElementsByName("firmasSesion")[pos].value;

	//var cantFirmas = document.getElementsByName("cantFirmas")[0].value;
	var uSelecc = document.getElementById("Usuarios").value;
	var usrElegidos = uSelecc.split(";");

	if (parseInt(cantFirmas)>parseInt(usrElegidos.length) || uSelecc==""){
		alert("Debe seleccionar al menos " + cantFirmas + " usuario/s para enviar a firmar esta sesión");
	}
	else {
		var id = document.getElementById("sId").value;
		url = DirABS() + "ControllerResoluciones?OpenAgent&Id="+id+",usr="+document.getElementById('sUsuarioo').value+",Accion=acc_pasar_a_firmar,Firmantes=" + uSelecc;
		location.href=url;
	}

	return;
}