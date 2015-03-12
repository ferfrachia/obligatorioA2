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
		closeOnEscape: false,
		beforeClose: function(event, ui) {document.applets["appletAutorizar"].style.display="none";
													   document.getElementById("textoConfirmarAutorizarFirma").style.display="block";}
	});
}