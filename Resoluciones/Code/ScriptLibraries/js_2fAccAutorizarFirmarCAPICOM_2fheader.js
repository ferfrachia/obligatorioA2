function reiniciarDialogoAutorizarFirma(){
	try{
		$( "#DialogoAutorizarFirma" ).dialog( "destroy" );
	}catch(e){}
	$( "#DialogoAutorizarFirma" ).dialog({
		autoOpen: false,
		height: 325,
		width: 510,
		modal: true,
		resizable: false,
		draggable: false,
		closeOnEscape: false
	});
}

function aceptarAutorizarFirma(){
var txtNombre = document.forms["dialogAutorizarFirmaApplet"].sUsuarioActualPlano.value;
var txtPlain = document.forms["dialogAutorizarFirmaApplet"].aFirmar.value;
if (document.all){
	document.forms["dialogAutorizarFirmaApplet"].sFirma.value=firmar(txtPlain, txtNombre);
}else{
	var firma = window.crypto.signText(txtPlain, 'auto');
	document.forms["dialogAutorizarFirmaApplet"].sFirma.value=firma;
}

if (!(document.forms["dialogAutorizarFirmaApplet"].sFirma.value=='NO') && !(document.forms[1].sFirma.value=='null') && !(document.forms[1].sFirma.value=='') && !(document.forms[1].sFirma.value.substring(0,5)=="error")){
	document.forms["dialogAutorizarFirmaApplet"].submit();
}
if (document.forms["dialogAutorizarFirmaApplet"].sFirma.value==''){
	alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
}else{
	if (document.forms["dialogAutorizarFirmaApplet"].sFirma.value.substring(0,5)=="error"){
		alert("No es posible Firmar, "+ document.forms["dialogAutorizarFirmaApplet"].sFirma.value);
	}
}
}