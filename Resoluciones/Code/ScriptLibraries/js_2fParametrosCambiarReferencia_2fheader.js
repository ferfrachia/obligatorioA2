function aceptar(){
document.getElementById('btnAceptar').style.visibility = "hidden";
document.getElementById('btnCancelar').style.visibility = "hidden";

document.forms[0].submit();
}

function cancelar(){
document.getElementById('btnAceptar').style.visibility = "hidden";
document.getElementById('btnCancelar').style.visibility = "hidden";

if (document.forms[0].urlorigen.value != "")
{
location.href = document.forms[0].Protocolo.value+'://'+document.forms[0].urlorigen.value
}
else
{
window.history.back();
}
}