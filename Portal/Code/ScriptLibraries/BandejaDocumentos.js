//Arreglo para identificar si estan activados los filtros
var filtros = new Array(6);
//Arreglo para almacenar cada grilla
var grids = new Array(6);
//Arreglo para identificar cuales grillas estan maximizadas
var maximizadas = new Array(6);

function myErrorHandler(type, desc, erData){
    alert("Su sesión ha expirado. Por favor, vuelva al inicio e ingrese usuario y contraseña.");
}

function bandejasInit(primera){
	cargoFiltrosyCrear("Documentos");
	if(primera){
		//Inicializa arreglos
		for(i = 0;i<filtros.length;i++){
			filtros[i] = 0;
			maximizadas[i] = 0;
		}
		actualizarAltos();
		//Pregunta si se desea cargar una tab en especial {Esto es para cuando el usuario indica "ir a ..."}
 			if(paramTab=="tabPrincipal"){
				setCookIGDoc("IGDocBandejaNuevaDoc", "0", "CookieBandeja");
			}else if(paramTab=="tabReservados"){
				setCookIGDoc("IGDocBandejaNuevaDoc", "1", "CookieBandeja");
			}else if(paramTab=="tabAnulados"){
				setCookIGDoc("IGDocBandejaNuevaDoc", "2", "CookieBandeja");
			}else if(paramTab=="tabPublicados"){
				setCookIGDoc("IGDocBandejaNuevaDoc", "3", "CookieBandeja");
			}else if(paramTab=="tabPublico"){
				setCookIGDoc("IGDocBandejaNuevaDoc", "4", "CookieBandeja");
			}else if(paramTab=="tabMarcados"){
				setCookIGDoc("IGDocBandejaNuevaDoc", "5", "CookieBandeja");
			}else if(paramTab=="tabEventos"){
				setCookIGDoc("IGDocBandejaNuevaDoc", "6", "CookieBandeja");
				if(document.getElementById("moduloEventoActivo").value=="1" ){
						init();
				}				
			}
		}
		
	
		//Carga de una cookie el indice del tab a cargar
		var cookValue = getCook("IGDocBandejaNuevaDoc");

		if(cookValue != "0" && cookValue != "1" && cookValue!="2" && cookValue!="3" && cookValue!="4" && cookValue!="5" && cookValue!="6" && cookValue!="7"){
			cookValue = "0";
	}
		var $tabs = $('#tabs').tabs();
		$tabs.tabs( "option", "active",parseInt(cookValue)); 

		if(cookValue == "0"){
			cargarBandejaBorradores();
			//Debido a diferencias enre MZ e IE en el caso que sea mozilla o no sea la primera vez que cargo la pantalla
		}else if((navigator.appName == "Netscape") || !primera){

			switch(cookValue){
				case "1":
					cargarBandejaReservados();
					break;
				case "2":
					cargarBandejaAnulados();	
					break;	
				case "3":
					cargarBandejaPublicados();
					break;
				case "4":
					cargarBandejaPublicos();
					break;
				case "5":
					cargarBandejaMarcados();
					break;
				case "6":
					limpiarYCargar();	
					break;				
			}
		}
		

	document.getElementById('tabs').style.width = calcularAncho()-30 +"px";
}

//Función que inicializa la bandeja de documentos en estado Borrador
function cargarBandejaBorradores(){
	if(grids[0] != null){
		grids[0].destructor();
	}

	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value.toUpperCase();
	var tipoDoc = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].value;

	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaBorradores').style.overflow = "hidden";
	var strXml = urlBandejaBorradores  + "&RestrictToCategory=PDD_" + unidad+anio+tipoDoc+"&Count=5000";
	var mygrid = new dhtmlXGridObject('BandejaBorradores');
	
	dhtmlxError.catchError("LoadXML",myErrorHandler);
	
	mygrid.attachEvent("onXLE", cargarCantidadBorradores);

	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("Numero,Fecha,Título,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,120,500,*");
	mygrid.setColTypes("ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[0] = mygrid;
	mygrid.setColSorting("str,str,str,str");
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);

	filtros[0] = 0;
	document.getElementById("fil0").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaBorradores').style.overflow = "hidden";
	document.getElementById('BandejaBorradores').style.width = "100%";
	document.getElementById('BandejaBorradores').style.heigth = "100%";

}

//Función que inicializa la bandeja de documentos en estado Publicado
function cargarBandejaPublicados(){
	if(grids[3] != null){
		grids[3].destructor();
	}
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value.toUpperCase();
	var tipoDoc = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].value;
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaPublicados').style.overflow = "hidden";

	var strXml = urlBandejaPublicados  + "&RestrictToCategory=PDD_" + unidad+anio+tipoDoc+"&Count=5000";
	var mygrid = new dhtmlXGridObject('BandejaPublicados');
	
	dhtmlxError.catchError("LoadXML",myErrorHandler);
	mygrid.attachEvent("onXLE", cargarCantidadPublicados);
	
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("Numero,Fecha,Título,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,120,500,*");
	mygrid.setColTypes("ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[3] = mygrid;
	mygrid.setColSorting("str,str,str,str");

	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[3] = 0;
	document.getElementById("fil1").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaPublicados').style.overflow = "hidden";
	document.getElementById('BandejaPublicados').style.width = "100%";
	document.getElementById('BandejaPublicados').style.heigth = "100%";
}


function cargarBandejaPublicos(){

	if(grids[4] != null){
		grids[4].destructor();
	}
	
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value.toUpperCase();
	var tipoDoc = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].value;
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaPublicos').style.overflow = "hidden";

	var strXml = urlBandejaPublicados  + "&RestrictToCategory=PDD_ALL" +anio+tipoDoc+"&Count=5000";
	var mygrid = new dhtmlXGridObject('BandejaPublicos');
	
	dhtmlxError.catchError("LoadXML",myErrorHandler);
	mygrid.attachEvent("onXLE", cargarCantidadPublicos);
	
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("Numero,Fecha,Título,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,120,500,*");
	mygrid.setColTypes("ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[4] = mygrid;
	mygrid.setColSorting("str,str,str,str");

	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[4] = 0;
	document.getElementById("fil1").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaPublicos').style.overflow = "hidden";
	document.getElementById('BandejaPublicos').style.width = "100%";
	document.getElementById('BandejaPublicos').style.heigth = "100%";
}

function cargarBandejaMarcados(){	
	if(grids[5] != null){
		grids[5].destructor();
	}
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value;
	var strXml = urlBandejaMarcados;
	document.getElementById('BandejaMarcadas').style.overflow = "hidden";

	var estiloHeader =  "height:17px;margin:1px;font-size:11px;padding:1px";
	var mygrid;
	mygrid = new dhtmlXGridObject('BandejaMarcadas');
	
	dhtmlxError.catchError("LoadXML",myErrorHandler);
	mygrid.attachEvent("onXLE", cargarCantidadMarcados);
	
	mygrid.enableMultiline(true);
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader(",Número, ,Marca,Unidad,Asunto, ,Usuario",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	if(navigator.appName == "Netscape"){
		mygrid.setInitWidths("38,100,30,100,150,*,25,200");		
	}else{
		mygrid.setInitWidths("45,100,30,100,150,*,25,200");
	}		
	mygrid.setColTypes("ch,ro,cp,ro,ro,ro,img,ro");
	mygrid.setColAlign("center,left,left,left,left,left,center,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[5] = mygrid;
	mygrid.setColSorting("na,str,str,str,str,str,str,str");
	mygrid.enableAutoHeight(true);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	mygrid.enableEditEvents(false,false,false);
	filtros[5] = 0;
	document.getElementById("fil2").src = document.getElementById("title_filtro").value;
	document.getElementById('BandejaMarcadas').style.width = "100%";
	document.getElementById('BandejaMarcadas').style.heigth = "100%";
}
	
//Función que inicializa la bandeja de documentos en estado Anulado
function cargarBandejaAnulados(){
	if(grids[2] != null){
		grids[2].destructor();
	}

	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value.toUpperCase();
	var tipoDoc = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].value;

	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaAnulados').style.overflow = "hidden";
	var strXml = urlBandejaAnulados + "&RestrictToCategory=PDD_" + unidad+anio+tipoDoc+"&Count=5000";
	var mygrid = new dhtmlXGridObject('BandejaAnulados');
	
	dhtmlxError.catchError("LoadXML",myErrorHandler);
	mygrid.attachEvent("onXLE", cargarCantidadAnulados);

	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("Numero,Fecha,Título,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,120,500,*");
	mygrid.setColTypes("ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[2] = mygrid;
	mygrid.setColSorting("str,str,str,str");

	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);


	filtros[2] = 0;
	document.getElementById("fil4").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaAnulados').style.overflow = "hidden";
	document.getElementById('BandejaAnulados').style.width = "100%";
	document.getElementById('BandejaAnulados').style.heigth = "100%";

}

//Función que inicializa la bandeja de documentos en estado Reservado
function cargarBandejaReservados(){
	if(grids[1] != null){
		grids[1].destructor();
	}

	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.getElementById("sUsuario").value.toUpperCase();
	var tipoDoc = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].value;

	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaReservados').style.overflow = "hidden";
	
	var strXml = urlBandejaReservados + "&RestrictToCategory=PDD_" +unidad+usuario.split("/")[0]+anio+tipoDoc+"&Count=5000";
	var mygrid = new dhtmlXGridObject('BandejaReservados');
	
	dhtmlxError.catchError("LoadXML",myErrorHandler);
	mygrid.attachEvent("onXLE", cargarCantidadReservados);

	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("Numero,Fecha,Título,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,120,500,*");
	mygrid.setColTypes("ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[1] = mygrid;
	mygrid.setColSorting("str,str,str,str");

	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);

	filtros[1] = 0;
	document.getElementById("fil5").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaReservados').style.overflow = "hidden";
	document.getElementById('BandejaReservados').style.width = "100%";
	document.getElementById('BandejaReservados').style.heigth = "100%";

}

//Función encargada de actualizar los altos de las grillas al hacer un resize de la ventana
function actualizarAltos(){
	var altoVentana = calcularAlto();
	ALTO = altoVentana - 135;
	if(ALTO<0)
		ALTO = 0;
	ALTO_TRABAJO = (ALTO - 2*ALTO_CABEZAL)*(parseInt(document.getElementById("BandejasExp_Alto_Rel_Trabajo").value)/100);
	if(ALTO_TRABAJO<0)
		ALTO_TRABAJO = 0;
	ALTO_ENTRADA_SALIDA = (ALTO - 2*ALTO_CABEZAL)*(1-(parseInt(document.getElementById("BandejasExp_Alto_Rel_Trabajo").value)/100));
	if(ALTO_ENTRADA_SALIDA<0)
		ALTO_ENTRADA_SALIDA = 0;
	ALTO_MAXIMIZADA = ALTO - ALTO_CABEZAL;
	if(ALTO_MAXIMIZADA<0)
		ALTO_MAXIMIZADA = 0;
	ALTO_NOTIFICADOS = (ALTO - 2*ALTO_CABEZAL)*(parseInt(document.getElementById("BandejasExp_Alto_Rel_Notif").value)/100);
	
	document.getElementById('CabezalBandejaBorradoresWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaPublicadosWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaMarcadasWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaReservadosWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaAnuladosWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaPublicosWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	if (document.getElementById('BandejaEventosWraper')!=null){
		document.getElementById('BandejaEventosWraper').style.height = ""+ALTO_MAXIMIZADA+"px";
	}
}

//Función encargada de calcular el alto de la ventana
function calcularAlto() {
	myHeight = 0;
	if( typeof( window.innerHeight ) == 'number' ) {
		//Non-IE
    		myHeight = window.innerHeight;
  	} else if( document.documentElement && document.documentElement.clientHeight ) {
    		//IE 6+ in 'standards compliant mode'
    		myHeight = document.documentElement.clientHeight;
  	} else if( document.body && document.body.clientHeight ) {
    		//IE 4 compatible
    		myHeight = document.body.clientHeight;
  	}
  	return myHeight - 10;
}

//Función encargada de calcular el ancho de la ventana
function calcularAncho() {
	myWidth = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
    		myWidth = window.innerWidth;
  	} else if( document.documentElement && document.documentElement.clientWidth ) {
    		//IE 6+ in 'standards compliant mode'
    		myWidth = document.documentElement.clientWidth;
  	} else if( document.body && document.body.clientWidth ) {
    		//IE 4 compatible
    		myWidth = document.body.clientWidth;
  	}
  	return myWidth;
}

//Función que desplega el menú a la hora de clickear una fila
function rowSelection(idTabla){
	var e = window.event;
	var tabla = this;
	if(tabla!= null){
		var ind = tabla.getSelectedCellIndex();
		//Verifico que la fila seleccionada no sea la primera, en ese caso no se desplega menú porque allí estan las imágenes
		var selectedId=tabla.getSelectedRowId();
		var unid =  tabla.getUserData(selectedId, "documentid");
		var base = tabla.getUserData(selectedId, "base");
		var tipoDoc = tabla.getUserData(selectedId, "tipoDoc");
		var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
		abrirDoc(unid,tipoDoc,unidad);
	}
}

function abrirDoc(id,tipoDoc,unidad){
	flagOcultar="0";

	var puerto = document.getElementById('Puerto').value;
	var url = DirABS()+"/abrirDocumento?OpenAgent&id="+id+"&tipoDoc=DOCUMENTOS&unidad="+unidad+"&defDoc="+tipoDoc;
	if (document.forms[0].nuevaVentana.value=="1"){
		if (confirm("¿Desea abrir el Documento en una nueva ventana?")){
				window.open(url,"menubar=no,status=yes,resizable=yes,scrollbars=yes,LEFT=0,TOP=0");
		}else{
			window.location.replace(url);
		}
	}else{
				window.location.replace(url);
	}			
}



//Función que reajusta las tablas a la hora de hacer un resize de la ventana

function resize()
{
	document.getElementById('BandejaBorradores').style.height = "100%";
	document.getElementById('BandejaPublicados').style.height = "100%";
	document.getElementById('BandejaMarcadas').style.height = "100%";
	document.getElementById('BandejaReservados').style.height = "100%";
	document.getElementById('BandejaAnulados').style.height = "100%";
	document.getElementById('BandejaPublicos').style.height = "100%";
	
	for(i = 0;i<2;i++){
			if(grids[i] != null){
				grids[i].setSizes();
			}
	}

	document.getElementById('BandejaBorradores').style.width = "100%";
	document.getElementById('BandejaPublicados').style.width = "100%";
	document.getElementById('BandejaMarcadas').style.width = "100%";
	document.getElementById('BandejaReservados').style.width = "100%";	
	document.getElementById('BandejaAnulados').style.width = "100%";
	document.getElementById('BandejaPublicos').style.width = "100%";	
	if(document.getElementById('BandejaEventosWraper')!=null){
		document.getElementById('BandejaEventosWraper').style.width ="100%"
	}
	actualizarAltos();

	document.getElementById('tabs').style.width = calcularAncho()-30 +"px";
}

//funcion que se encarga de cargar el contenido de las bandejas a la hora de seleccionar una tab
function cargarContenidoTab(event, ui){

	//Seteo el cookie de la tab seleccionada
	setCookIGDoc("IGDocBandejaNuevaDoc", ui.newPanel.index()-1, "CookieBandeja");

	//Cargo la tab seleccionada

	
	switch(parseInt(ui.newPanel.index()-1)){
		case 0:
			cargarBandejaBorradores();
			break;
		case 1:
			cargarBandejaReservados();
			break;
		case 2:
			cargarBandejaAnulados();			
			break;
		case 3:
			cargarBandejaPublicados();			
			break;
		case 4:
			cargarBandejaPublicos();			
			break;
		case 5:
			cargarBandejaMarcados();			
			break;
		case 6:
			if(document.getElementById("moduloEventoActivo").value=="1" ){
				init();
			}				
			break;
		case 7:				
			break;
	}		
}


//Función que muestra y oculta los filtros
function mostrarFiltro(i){
	//Seteo el estilo de los filtros
	var estiloAttachHeader;
	if(navigator.appName == "Netscape"){
		estiloAttachHeader = "height:18px;margin:0px;padding:0px;";
	}else{
		estiloAttachHeader = "height:25px;margin:0px;padding:0px;";
	}
	//Si no se esta mostrando el filtro
	if(filtros[i] == 0){
		//Diferencio el unico caso particular que es en la grilla de marcas
		if(i==2){
			estiloAttachHeader = estiloAttachHeader + "text-align:left;";
			grids[i].attachHeader("#master_checkbox,#text_filter,,#text_filter,#text_filter,#text_filter,,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
			grids[i].attachHeader("#master_checkbox,#text_filter,,#text_filter,#text_filter,#text_filter,,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		}else{
			grids[i].attachHeader("#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
			grids[i].attachHeader("#text_filter,#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		}
		//Quito un cabezal para actualizar y que aparezca el filtro
		grids[i].detachHeader(2);
		//Marco como que se está mostrando el filtro de la bandeja con indice i
		filtros[i] = 1;
		//Seteo el ícono de filtro activado
		document.getElementById("fil"+i).src = document.getElementById("title_filtro_on").value;
	}else{
		//Reseteo los filtros y luego elimino la barra de filtrado
		grids[i].filterByAll();
		grids[i].filterBy(2,"");
		grids[i].filterBy(3,"");
		grids[i].filterBy(4,"");
		grids[i].filterBy(5,"");
		grids[i].filterBy(6,"");
		grids[i].detachHeader(1);
		filtros[i]=0;
		//Seteo el ícono de filtro desactivado
		document.getElementById("fil"+i).src = document.getElementById("title_filtro").value;
	}
}

function irAMarcas(){
var url ="/"+document.forms[0].sPathDbOrg.value+"/fTiposMarca?OpenForm"
top.location.replace(url);
}
function irAMarca(unid){
	var url = "/"+document.forms[0].sPathDbOrg.value+"/0/"+unid+"?OpenDocument"
	window.location.replace(url)
}


//Función para compartir las marcas seleccionadas {Análoga a quitar marcas}
function CompartirMarcas(){
	var usuarioActual = document.getElementById("sUsuario").value;
	var dbPath=document.forms[0].sPathDbOrg.value;
	var cantFilas = grids[2].getRowsNum();
	var marcada;
	var idFila;
	var primera = true;
	var marcas = "";
	for(i = 0; i<cantFilas;i++){
		marcada = grids[2].cellByIndex(i, 0).getValue();
		idFila = grids[2].getRowId(i);
		if (marcada == 1){
			var duenio = grids[2].getUserData(idFila, "duenio");
			var nomMarca = grids[2].getUserData(idFila, "nomMarca");
			if(usuarioActual != duenio){
				alert('La siguiente marca pertenece al usuario ' + duenio + '\n' + nomMarca);
			}else{
				if (primera){
					marcas= "" + marcas +  idFila;
					primera=false;
				}else{
					marcas= "" + marcas + ";" + idFila;
				}
			}
			grids[2].cellByIndex(i, 0).setValue("0");
		}
	}
	if (marcas==''){
		alert('Debe seleccionar las marcas que va a compartir.');
		return;
	}

	var url=document.forms[0].Protocolo.value+'://' + window.location.hostname+":"+document.forms[0].Puerto.value +"/"+ dbPath + '/FParametrosExportMarcasCom?openForm&MarcasId=' + marcas;
	window.location.replace(url);
}
function quitarMarcas(){

	var usuarioActual = document.getElementById("sUsuario").value;
	var primera = true;
	var dbPath=document.forms[0].sPathDbOrg.value;
	var cantFilas = grids[3].getRowsNum();
	var marcada;
	var idFila;
	var marcas = "";
	//Recorro las filas de la grilla para verificar cuales estan seleccionadas
	for(i = 0; i<cantFilas;i++){
		marcada = grids[3].cellByIndex(i, 0).getValue();
		idFila = grids[3].getRowId(i);
		//Pregunto si la fila está seleccionada
		if (marcada == 1){
			var duenio = grids[3].getUserData(idFila, "duenio");
			var nomMarca = grids[3].getUserData(idFila, "nomMarca");
			//Verifico que quien desea eliminar las marcas sea el dueño de las mismas
			if(usuarioActual != duenio){
				alert('La siguiente marca pertenece al usuario ' + duenio + '\n' + nomMarca);
			}else{
				if (primera){
					marcas= "" + marcas +  idFila;
					primera=false;
				}else{
					marcas= "" + marcas + ";" + idFila;
				}
			}
			//Luego de procesada la desmarco
			grids[3].cellByIndex(i, 0).setValue("0");
		}
	}
	//Si no hay ninguna válida seleccionada despliego error
	if (marcas==''){
		alert('Debe seleccionar las marcas que va a eliminar.');
		return;
	}

	//Si hay alguna a eliminar pregunto y redirecciono
	//var url=document.forms[0].Protocolo.value+'://' + window.location.hostname +":"+document.forms[0].Puerto.value+"/"+ document.forms[0].sPathDbOrg.value + '/DocMarcasController?OpenAgent&User='+ usuarioActual +',Accion=acc_eliminar_marcas,lista=' + marcas + ']';
	var url="/"+ document.forms[0].sPathDbOrg.value + '/DocMarcasController?OpenAgent&User='+ usuarioActual +',Accion=acc_eliminar_marcas,lista=' + marcas + ']';
	if (confirm('Desea eliminar las marcas seleccionadas ?'))
		window.location.replace(url);
}

function cargarCantidadBorradores(){
	document.getElementById("cantDoc0").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadPublicados(){
	document.getElementById("cantDoc1").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadMarcados(){
	document.getElementById("cantDoc2").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadPublicos(){
	document.getElementById("cantDoc4").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadAnulados(){
	document.getElementById("cantDoc5").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadReservados(){
	document.getElementById("cantDoc6").innerHTML = "(" + this.getRowsNum()+ ")";
}