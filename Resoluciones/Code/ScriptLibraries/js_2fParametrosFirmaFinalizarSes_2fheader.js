function abrirDoc(univid){
	var pathname=location.pathname; 
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	window.open(pathname+'/0/'+univid+'?Opendocument','Resolucion','menubar=no,status=yes,resizable=yes,scrollbars=yes,width=790,height=590');
}

function cancelar(){
	document.getElementById('btnAceptar').style.visibility = "hidden";
	document.getElementById('btnCancelar').style.visibility = "hidden";
	if (document.forms[0].urlorigen.value != "") {
		location.href = document.forms[0].Protocolo.value+'://'+document.forms[0].urlorigen.value
	}
	else{
		window.history.back();
	}
}
function botonAceptarCAPICOM(){
//alert("Ingreso");
var txtNombre = document.forms[0].sUsuarioActualPlano.value;
var txtPlain = document.forms[0].aFirmar.value;
document.forms[0].Firma.value=firmar(txtPlain, txtNombre);

if (!(document.forms[0].Firma.value=='NO') && !(document.forms[0].Firma.value=='null') && !(document.forms[0].Firma.value=='')){
//var check = document.getElementById("Punto");
var check = document.forms[0].sPuntosaPublicar;
	var valores="";
	if (check.length){
		for (var i=0;i<check.length;i++){
			if (check[i].checked){
				if (valores=="")
					valores= check[i].value;
				else
					valores =valores+ ","+check[i].value;
			}
		}
	}else{
		if (check.checked){
			valores= check.value;
		}
	}
	document.forms[0].sPuntosaPublicar.value=valores;
	document.getElementById('btnAceptar').style.visibility = "hidden";
	document.getElementById('btnCancelar').style.visibility = "hidden";
	document.forms[0].submit();
}
if (document.forms[0].Firma.value==''){
	alert('No se puede firmar, por favor reinicie Windows e ingrese con su usuario de red');
}

	
}

function botonAceptar(){
//alert("botonAceptar!!!!!");
	if(document.forms[0].UsaApplet.value == "1"){
		$( "#DialogoFirmaFinalizar" ).dialog("open");
	}else{
		botonAceptarCAPICOM();
	}
}