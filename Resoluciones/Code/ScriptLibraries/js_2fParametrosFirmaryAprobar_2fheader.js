function aceptar(){
var txtNombre = document.forms[0].sUsuarioActualPlano.value;
var txtPlain = document.forms[0].aFirmar.value;
if (document.all){
	document.forms[0].Firma.value=firmar(txtPlain, txtNombre);
}else{
	var firma = window.crypto.signText(txtPlain, 'auto');
	document.forms[0].Firma.value=firma;
}

if (!(document.forms[0].Firma.value=='NO') && !(document.forms[0].Firma.value=='null') && !(document.forms[0].Firma.value=='') && !(document.forms[0].Firma.value.substring(0,5)=="error")){
	document.getElementById("btnAceptar").visibility="hidden"
	document.getElementById("btnCancelar").visibility="hidden"
	document.forms[0].submit();
}
if (document.forms[0].Firma.value==''){
	alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
}else{
	if (document.forms[0].Firma.value.substring(0,5)=="error"){
		alert("No es posible Firmar, "+ document.forms[0].Firma.value);
	}
}
}

function cancelar(){
	document.getElementById("btnAceptar").visibility="hidden"
	document.getElementById("btnCancelar").visibility="hidden"
	
if (document.forms[0].urlorigen.value != "")
{
location.href = document.forms[0].Protocolo.value+'://'+document.forms[0].urlorigen.value
}
else
{
window.history.back();
}
}