function abrirDoc(univid){
	var pathname=location.pathname; 
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	window.open(pathname+'/0/'+univid+'?Opendocument','Resolucion','menubar=no,status=yes,resizable=yes,scrollbars=yes,width=790,height=590');
}

function cancelar(){
	document.getElementById("btnAceptar").style.visibility="hidden";
	document.getElementById("btnCancelar").style.visibility="hidden";
	if (document.forms[0].urlorigen.value != "") {
		location.href = document.forms[0].Protocolo.value+'://'+document.forms[0].urlorigen.value
	}
	else{
		window.history.back();
	}
}
function botonAceptar(){
	document.getElementById("btnAceptar").style.visibility="hidden";
	document.getElementById("btnCancelar").style.visibility="hidden";
	//var check = document.getElementById("Punto");
	var check = document.forms[0].sPuntosaPublicar
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
	document.forms[0].submit();
}