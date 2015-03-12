function DirABS(){ 
var pathname=location.pathname;  
pathname=pathname.toUpperCase();
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.indexOf('.NSF')+5)))  
} 
function Atras(){
 window.location=DirABS()+'inicio?OpenFrameset';
}
function Busqueda(){
var frm = document.forms[0]
if (frm.sNroExpediente.value=="" && frm.sNroResolucion.value=="" && frm.fdesde.value=="" && frm.fhasta.value=="" && frm.sOficina.selectedIndex==0 && frm.sPalabra.value=="" && frm.sNroRepartido.value==""){
alert("Debe ingresar valores para la busqueda")
}else{
	frm.submit()
}
}
function seleccionarOficina(oficina){
	document.forms[0].sOficina.value=oficina
}