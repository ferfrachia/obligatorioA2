function validarFirma(aFirmarNom,FirmaNom,FechaFirmaNom,TituloNom){
var aFirmar=document.all(aFirmarNom);
var Firma=document.all(FirmaNom);
var FechaFirma=document.all(FechaFirmaNom);
var Titulo=document.all(TituloNom);

var txtPlain = aFirmar.value;
var vSignatures =  StringToVector2(Firma.value,',');
var vFechas =StringToVector2(FechaFirma.value,',');
var vTitulo = StringToVector2Null(Titulo.value,',');
for(var i=0; i<vSignatures.vLength;i++){
var txtSignature= vSignatures .vArray[i];
var txtFecha =   cleanDate(vFechas.vArray[i]);
if (txtSignature!=""){
	var usuario = verficar(txtPlain, txtSignature);
	if (usuario=="NOTRUST")
		{
if (ConfiarUnidadCertificadors()) 
{
	usuario = verficar(txtPlain, txtSignature);
	if (usuario!="NULL")
		if (Titulo.value!=''){
			document.writeln('<DIV align=left><br>&nbsp;&nbsp;&nbsp;&nbsp<font size="1" face="arial" color=blue>Firmado electronicamente por ' +vTitulo.vArray[i]+' '	+usuario+ ' el  ' + txtFecha +' </font></DIV>');
		}
		else {
			document.writeln('<DIV align=left><br>&nbsp;&nbsp;&nbsp;&nbsp<font size="1" face="arial" color=blue>Firmado electronicamente por ' +usuario+ ' el  ' + txtFecha +' </font></DIV>');
		}
	else
		document.writeln('<DIV align=left><br>&nbsp;&nbsp;&nbsp;&nbsp<font size="1" face="arial" color=blue>Este documento ha sido alterado o no se pudo validar su firma. Consulte con el Administrador del sistema</font></DIV>');	
}
else{
document.writeln('<DIV align=left><br>&nbsp;&nbsp;&nbsp;&nbsp<font size="1" face="arial" color=blue>Este documento posiblemente esté firmado pero Ud. no puede verificar la firma, consulte con el Administrador del sistema.</font></DIV>');
i=vSignatures.vLength;
}}
	else if (usuario!="NULL")
		if (Titulo.value!=''){
			document.writeln('<DIV align=left><br>&nbsp;&nbsp;&nbsp;&nbsp<font size="1" face="arial" color=blue>Firmado electronicamente por ' +vTitulo.vArray[i]+' ' 	+usuario+ ' el ' + txtFecha +' </font></DIV>');
		}
		else{
			document.writeln('<DIV align=left><br>&nbsp;&nbsp;&nbsp;&nbsp<font size="1" face="arial" color=blue>Firmado electronicamente por ' +usuario+ ' el  ' + txtFecha +' </font></DIV>');
		}
	else
		document.writeln('<DIV align=left><br>&nbsp;&nbsp;&nbsp;&nbsp<font size="1" face="arial" color=blue>Este documento ha sido alterado o no se pudo validar su firma. Consulte con el Administrador del sistema</font></DIV>');
}
}

}
function cleanDate(d){
var izq=d.substring(0,16);
var der=d.substring(d.length - 4,d.length);

return izq + der;
}