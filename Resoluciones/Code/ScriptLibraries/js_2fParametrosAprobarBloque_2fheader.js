/*function cargarPuntos(){
html="";
//numeros=StringToVector2(document.forms[0].NroPuntos.value,"##")
//referencias=StringToVector2(document.forms[0].Puntos.value,"##")
numeros=StringToVector2Null(document.forms[0].NroPuntos.value,"##")
referencias=StringToVector2Null(document.forms[0].Puntos.value,"##")
nrosExp=StringToVector2Null(document.forms[0].NrosExp.value,"##")

html="<table width=\"100%\">";
for (var i=0;i<numeros.vLength;i++){

	html=html+"<tr class=\"textoFila\" onmouseover=\"this.className='textoFilaOvr'\" onmouseout=\"this.className='textoFila'\">";
	html+="<td class=\"textoFila\"><input type=\"checkbox\" name=\"PtosAprobar\" value=\""+numeros.vArray[i]+"\"></td>";
	html+="<td width=\"40\">"+numeros.vArray[i]+"</td>";
	html+="<td><nobr>"+(nrosExp.vArray[i]==undefined?"":nrosExp.vArray[i])+"</nobr></td>";
	html+= "<td><nobr>"+referencias.vArray[i]+"</nobr></td><td width=\"100%\">&nbsp;</td></tr>";
}
html=html+"</table>"
document.getElementById("PuntosaAprobar").innerHTML=html
}*/


function cargarPuntos(){
html="";
//numeros=StringToVector2(document.forms[0].NroPuntos.value,"##")
//referencias=StringToVector2(document.forms[0].Puntos.value,"##")
numeros=StringToVector2Null(document.forms[0].NroPuntos.value,"##");	
referencias=StringToVector2Null(document.forms[0].sReferencia.value,"##");
nrosExp=StringToVector2Null(document.forms[0].NrosExp.value,"##");

html="<table width=\"100%\">";
for (var i=0;i<numeros.vLength;i++){

	html=html+"<tr class=\"textoFila\" onmouseover=\"this.className='textoFilaOvr'\" onmouseout=\"this.className='textoFila'\">";
	html+="<td class=\"textoFila\"><input type=\"checkbox\" name=\"PtosAprobar\" value=\""+numeros.vArray[i]+"\"></td>";
	html+="<td width=\"40\">"+numeros.vArray[i]+"</td>";
	html+="<td><nobr>"+(nrosExp.vArray[i]==undefined?"":nrosExp.vArray[i])+"</nobr></td>";
	html+= "<td><nobr>"+(referencias.vArray[i]==undefined?"":referencias.vArray[i])+"</nobr></td><td width=\"100%\">&nbsp;</td></tr>";
}
html=html+"</table>"
document.getElementById("PuntosaAprobar").innerHTML=html
}




function aceptar(){
	var checks = document.forms[0].PtosAprobar
	var ptos ="";
	if (checks.length){
		for (var i=0;i<checks.length;i++){
			if (checks[i].checked){
				if (ptos==""){
					ptos=checks[i].value
				}else{
					ptos=ptos+","+checks[i].value
				}
			}
		}
		document.forms[0].sAsuntos.value=ptos
	}else{
		if (checks.checked){
			document.forms[0].sAsuntos.value=checks.value
		}
	}
	document.forms[0].submit();
}

function cancelar(){
	window.history.back();
}
