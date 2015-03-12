function DirABS(){ 
var pathname=location.pathname;  
return(document.forms[0].Protocolo.value+'://'+location.hostname+":"+document.forms[0].Puerto.value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
} 
function dibujarImg(nombre){
//document.write("<img src='../"+ document.getElementById("universalidd")+"/$FILE/" + nombre+"' alt='' />");
	return "<img src='../"+ document.getElementById("id").value+"/$FILE/" + nombre+"' alt='' />";
}

function imprimir(id){
var pathDB = DirABS();
	//window.open(pathDB+'/ImpresionActa?OpenForm&id='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
	enPdf = document.getElementById("sActaEnPdf").value == "Si";
		
		if(enPdf){
			window.open(pathDB + 'ImpActaPDF?openagent&uniddoc='+id,'PDFActa','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
		}else{
//			window.open(pathDB+'xsp_ImpActa.xsp?action=openDocument&documentId='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
			window.open(pathDB+'/ImpresionActa?OpenForm&id='+id,'Imprimir','menubar=yes,status=yes,resizable=yes,scrollbars=yes,LEFT=100,TOP=10,width=650,height=550');
		}
}

function Salir(){
	var pathDB = DirABS();
	if (document.forms[0].Src.value != ""){
		location.href = DirABS() + "Inicio?OpenFrameSet&Frame=Derecho&Src=" + document.forms[0].Src.value;
	}else{
		window.history.back();
	}
}