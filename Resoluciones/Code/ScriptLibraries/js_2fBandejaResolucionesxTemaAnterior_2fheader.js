function abrirDoc(univid){

	var pathname=location.pathname; 
	var urlorigen = location.hostname+"/"+document.forms[0].cvBase.value+document.forms[0].cvPathOrigen.value;
	pathname=document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5));
	if (document.forms[0].Anonimo.value=="0")
		top.location.href =  pathname+'/0/'+univid+'/?Opendocument&urlorigen='+urlorigen;
	else
		top.location.href = pathname + "Resolucion Publicada?OpenForm&id=" + univid + "&";	
}
