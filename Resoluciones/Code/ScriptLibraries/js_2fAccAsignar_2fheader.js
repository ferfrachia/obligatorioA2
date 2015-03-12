function btnAceptarAsignarClick(){
	campo = document.getElementById("sAsignar");
	if (campo.value!=""){
		document.forms['dojoAsignar'].sAsignado.value=campo.value;
		document.forms['dojoAsignar'].submit();
	}else
		alert("Debe Seleccionar un Usuario para asignar");
}
