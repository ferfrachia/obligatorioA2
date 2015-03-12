//Arreglo para identificar si estan activados los filtros
var filtros = new Array(7);
//Arreglo para almacenar cada grilla
var grids = new Array(7);
//Arreglo para identificar cuales grillas estan maximizadas
var maximizadas = new Array(7);


function myErrorHandler(type, desc, erData){
    alert("Su sesión ha expirado. Por favor, vuelva al inicio e ingrese usuario y contraseña.");
}

function quitarMarcas(){
	var usuarioActual = document.getElementById("sUsuario").value;
	var primera = true;
	var dbPath=document.forms[0].sPathDbOrg.value;
	var cantFilas = grids[5].getRowsNum();
	var marcada;
	var idFila;
	var marcas = "";
	//Recorro las filas de la grilla para verificar cuales estan seleccionadas
	for(i = 0; i<cantFilas;i++){
		marcada = grids[5].cellByIndex(i, 0).getValue();
		idFila = grids[5].getRowId(i);
		//Pregunto si la fila está seleccionada
		if (marcada == 1){
			var duenio = grids[5].getUserData(idFila, "duenio");
			var nomMarca = grids[5].getUserData(idFila, "nomMarca");
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
			grids[5].cellByIndex(i, 0).setValue("0");
		}
	}
	//Si no hay ninguna válida seleccionada despliego error
	if (marcas==''){
		alert('Debe seleccionar las marcas que va a eliminar.');
		return;
	}

	//Si hay alguna a eliminar pregunto y redirecciono
	var url="/"+ document.forms[0].sPathDbOrg.value + '/FormMarcasController?OpenAgent&User='+ usuarioActual +',Accion=acc_eliminar_marcas,lista=' + marcas + ']';
	if (confirm('Desea eliminar las marcas seleccionadas ?'))
		window.location.replace(url);
}

function irAMarcas(){
var url ="/"+document.forms[0].sPathDbOrg.value+"/fTiposMarca?OpenForm"
top.location.replace(url);
}
function irAMarca(unid){
	var url = "/"+document.forms[0].sPathDbOrg.value+"/0/"+unid+"?OpenDocument"
	window.location.replace(url)
}
function cargarBandejaMarcadas(){	
	if(grids[5] != null){
		grids[5].destructor();
	}
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value;
	var strXml = urlBandejaMarcados;
	document.getElementById('BandejaMarcadas').style.overflow = "hidden";

	//var estiloHeader = "height:0px;margin:0px;font-size:0px;padding:0px;display:none;";
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
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
	//mygrid.enableAutoHeight(true);
	//mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	mygrid.enableEditEvents(false,false,false);
	filtros[5] = 0;
	document.getElementById("fil5").src = document.getElementById("title_filtro").value;
	document.getElementById('BandejaMarcadas').style.width = "100%";
	document.getElementById('BandejaMarcadas').style.heigth = "100%";
	}
//Función que inicializa las bandejas {recibe como parámetro si es la primera vez que se carga}
function bandejasInit(primera){
	cargoFiltrosyCrear("Formularios");
	if(primera){
		//Inicializa arreglos
		for(i = 0;i<7;i++){
			filtros[i] = 0;
			maximizadas[i] = 0;
		}
		actualizarAltos();
		//Pregunta si se desea cargar una tab en especial {Esto es para cuando el usuario indica "ir a ..."}
		if(paramTab=="tabPrincipal"){
			setCookIGDoc("IGDocBandejaNuevaForm", "0", "CookieBandeja");
		}else if(paramTab=="tabReservados"){
			setCookIGDoc("IGDocBandejaNuevaForm", "1", "CookieBandeja");
		}else if(paramTab=="tabFinalizados"){
			setCookIGDoc("IGDocBandejaNuevaForm", "2", "CookieBandeja");
		}
	}
	
	//Carga de una cookie el indice del tab a cargar
	var cookValue = getCook("IGDocBandejaNuevaForm");
	if(cookValue != "0" && cookValue != "1" && cookValue != "2" && cookValue != "3"){
		cookValue = "0";
	}
	var $tabs = $('#tabs').tabs();
	$tabs.tabs( "option", "active",parseInt(cookValue)); 
	if(cookValue == "0"){
		cargarBandFormularios();
	//Debido a diferencias enre MZ e IE en el caso que sea mozilla o no sea la primera vez que cargo la pantalla
	}else if((navigator.appName.localeCompare("Netscape")==0) || !primera){
		switch(cookValue){
			case "1":
				cargarBandejaReservados();
				break;
			case "2":
				cargarBandejaFinalizados();
				break;
			case "3":
				cargarBandejaMarcadas();
			case "4":
				cargarBandejaParaFirmar();
			break;
		}
	}
	
	if(primera){
		//En el caso que el usuario indique que quiere abrir las bandejas en una bandeja maximizada, se procesa lo indicado.
		if(paramBandejaMax=="BandejaEntrada$max"){
			maximizarBandeja("CabezalBandejaEntradaWrap",1);
		}else if(paramBandejaMax=="BandejaTrabajo$max"){
			maximizarBandeja("CabezalBandejaTrabajoWrap",0);
		}else if(paramBandejaMax=="BandejaSalida$max"){
			maximizarBandeja("CabezalBandejaSalidaWrap",2);
		}
	}
	
	//if(navigator.appName == "Netscape")
	document.getElementById('tabs').style.width = calcularAncho()-30 +"px";
		
}

function cargarBandFormularios(){
	//Comienzo a cargar la bandeja de salida	
	if(grids[2] != null){
		grids[2].destructor();
	}
	//Cargo unidad y año	
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var frm = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].value;
	//Estilo del cabezal
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";	
	//Oculto el contenedor de la tabla para que luego esta se ajuste a cualquier tamaño
	document.getElementById('BandejaSalida').style.overflow = "hidden";


	var headTextS = "&nbsp;,Número,Formulario,Unidad,Fecha";
	if(frm != "Todos"){
		var auxiliarString = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].text + "_SALIDA";
		auxiliarString = auxiliarString.toUpperCase();
		while(auxiliarString != auxiliarString.replace(" ","_")){
			auxiliarString = auxiliarString.replace(" ","_");
		}
		if(document.getElementById(auxiliarString) != undefined)
			headTextS = document.getElementById(auxiliarString).value;
		var strXml = urlBandejaSalida + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000&filtroform=true";
	}else{
		var strXml = urlBandejaSalida + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000";
	}	
	//var strXml = urlBandejaTrabajo + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000";	
	var mygridS = new dhtmlXGridObject('BandejaSalida');

	dhtmlxError.catchError("LoadXML",myErrorHandler);
	
	//Cargo evento al seleccionar una fila
	mygridS.attachEvent("onRowSelect", rowSelection);
	mygridS.attachEvent("onXLE", cargarCantidadSalida);
	
	mygridS.setImagePath("/codebase/imgs/");
	//Cargo el cabezal
	mygridS.setHeader(headTextS,null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	//Cargo los anchos de las columnas
	mygridS.setInitWidths("70,80,*,150,70");
	//Cargo los tipos de las columnas
	mygridS.setColTypes("ro,ro,ro,ro,ro");
	//Cargo alineación de las columnas
	mygridS.setColAlign("left,left,left,left,left");
	//Cargo el estilo de la grilla
	mygridS.setSkin("light");
	mygridS.enableAlterCss("even", "uneven");
	mygridS.enableRowsHover(true,'grid_hover');
	//Seteo que se ajuste la altura automáticamente
	//mygridS.enableAutoHeight(true);
	mygridS.enableSmartRendering(true,20);
	mygridS.enableAutoWidth(true);

	//Inicializo la grilla
	mygridS.init();

	//Seteo los criterios de ordenamiento de las columnas
	mygridS.setColSorting("na,str,str,str,str");
	//Cargo el xml con los datos requeridos
	mygridS.loadXML(strXml);
	
	//Guardo la grilla en el arreglo
	grids[2] = mygridS;
	//Seteo que no se muestra el filtro
	filtros[2] = 0;
	//Seteo la imagen del filtro
	document.getElementById("fil2").src = document.getElementById("title_filtro").value;
	//Ajusto nuevamente el alto y ancho del div que contiene a la grilla
	document.getElementById('BandejaSalida').style.width = "100%";
	document.getElementById('BandejaSalida').style.heigth = "100%";
	
	//Se puede decir que el procedimiento es análogo para el resto de las grillas

	//Cargo la bandeja de entrada
	if(grids[1] != null){
		grids[1].destructor();
	}
	
	document.getElementById('BandejaEntrada').style.overflow = "hidden";

	var headTextE = "&nbsp;,Número,Formulario,Unidad,Fecha";
	if(frm != "Todos"){
		var auxiliarString = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].text + "_ENTRADA";
		auxiliarString = auxiliarString.toUpperCase();
		while(auxiliarString != auxiliarString.replace(" ","_")){
			auxiliarString = auxiliarString.replace(" ","_");
		}
		if(document.getElementById(auxiliarString) != undefined)
			headTextE = document.getElementById(auxiliarString).value;
		strXml = urlBandejaEntrada + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000&filtroform=true";
	}else{
		strXml = urlBandejaEntrada + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000";
	}
	//strXml = urlBandejaTrabajo + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000";
	var mygridE = new dhtmlXGridObject('BandejaEntrada');

	dhtmlxError.catchError("LoadXML",myErrorHandler);
	
	mygridE.attachEvent("onRowSelect", rowSelection);
	mygridE.attachEvent("onXLE", cargarCantidadEntrada);
	
	mygridE.setImagePath("/codebase/imgs/");
	mygridE.setHeader(headTextE,null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygridE.setInitWidths("70,80,*,150,70");
	mygridE.setColTypes("ro,ro,ro,ro,ro");
	mygridE.setColAlign("left,left,left,left,left");
	mygridE.setSkin("light");
	mygridE.enableAlterCss("even", "uneven");
	mygridE.enableRowsHover(true,'grid_hover');
	//mygridE.enableAutoHeight(true);
	mygridE.enableSmartRendering(true,20);
	mygridE.enableAutoWidth(true);
	mygridE.init();
	mygridE.setColSorting("na,str,str,str,str");
	mygridE.loadXML(strXml);
	grids[1] = mygridE;
	filtros[1] = 0; 
	document.getElementById("fil1").src = document.getElementById("title_filtro").value;
	document.getElementById('BandejaEntrada').style.width = "100%";
	document.getElementById('BandejaEntrada').style.heigth = "100%";

	//Se inicializa la bandeja de trabajo
	if(grids[0] != null){
		grids[0].destructor();
	}
	
	document.getElementById('BandejaTrabajo').style.overflow = "hidden";

	
	//strXml = urlBandejaTrabajo + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000";
	var headText = "&nbsp;,Número,Formulario,Fecha,Estado";
	
	if(frm != "Todos"){
		var auxiliarString = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].text
		auxiliarString = auxiliarString.toUpperCase();
		while(auxiliarString != auxiliarString.replace(" ","_")){
			auxiliarString = auxiliarString.replace(" ","_");
		}
		if(document.getElementById(auxiliarString) != undefined)
			headText = document.getElementById(auxiliarString).value;
		strXml = urlBandejaTrabajo + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000&filtroform=true";
	}else{
		strXml = urlBandejaTrabajo + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000";
	}
	var mygrid = new dhtmlXGridObject('BandejaTrabajo');

	dhtmlxError.catchError("LoadXML",myErrorHandler);
	
	mygrid.attachEvent("onRowSelect", rowSelection);
	mygrid.attachEvent("onXLE", cargarCantidadTrabajo);
	
	mygrid.setImagePath("/codebase/imgs/");
	
	mygrid.setHeader(headText,null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,100,*,70,200");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[0] = mygrid;
	mygrid.setColSorting("na,str,str,str,str");
	//mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.setSizes();
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[0] = 0;
	document.getElementById("fil0").src = document.getElementById("title_filtro").value;
	document.getElementById('BandejaTrabajo').style.overflow = "hidden";
	document.getElementById('BandejaTrabajo').style.width = "100%";
	document.getElementById('BandejaTrabajo').style.heigth = "100%";
}

function cargarCantidadTrabajo(){
	document.getElementById("cantDoc0").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadEntrada(){
	document.getElementById("cantDoc1").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadSalida(){
	document.getElementById("cantDoc2").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadReservados(){
	document.getElementById("cantDoc3").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadFinalizados(){
	document.getElementById("cantDoc4").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadMarcados(){
	document.getElementById("cantDoc5").innerHTML = "(" + this.getRowsNum()+ ")";
}
function cargarCantidadParaFirmar(){
	document.getElementById("cantDoc6").innerHTML = "(" + this.getRowsNum()+ ")";
}

//Función que inicializa la bandeja de reservados
function cargarBandejaReservados(){
	if(grids[3] != null){
		grids[3].destructor();
	}
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var usuario = document.forms[0].sUsuario.value;
	var frm = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].value;
    
	var strXml = urlBandejaReservados + "&RestrictToCategory=" + unidad+usuario+anio+frm+"&Count=5000";
	
	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	document.getElementById('BandejaReservados').style.overflow = "hidden";
    
	var mygrid = new dhtmlXGridObject('BandejaReservados');

	dhtmlxError.catchError("LoadXML",myErrorHandler);
	
	mygrid.attachEvent("onXLE", cargarCantidadReservados);
	
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("&nbsp;,Número,Formulario,Fecha,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,100,*,70,200");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[3] = mygrid;
	mygrid.setColSorting("na,str,str,str,str");
	//mygrid.enableAutoHeight(true);
	//mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);

	filtros[3] = 0;
	document.getElementById("fil3").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaReservados').style.overflow = "hidden";
	document.getElementById('BandejaReservados').style.width = "100%";
	document.getElementById('BandejaReservados').style.heigth = "100%";

}

//Función que inicializa la bandeja de Formularios Finalizados
function cargarBandejaFinalizados(){
	if(grids[4] != null){
		grids[4].destructor();
	}
	
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var frm = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].value;	
	var strXml = urlBandejaFinalizados + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000";
	
	document.getElementById('BandejaFinalizados').style.overflow = "hidden";

	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	
	var mygrid = new dhtmlXGridObject('BandejaFinalizados');

	dhtmlxError.catchError("LoadXML",myErrorHandler);
	
	mygrid.attachEvent("onXLE", cargarCantidadFinalizados);
	
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("&nbsp;,Número,Formulario,Fecha,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,100,*,70,200");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[4] = mygrid;
	mygrid.setColSorting("na,str,str,str,str");
	//mygrid.enableAutoHeight(true);
	//mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[4] = 0;
	document.getElementById("fil4").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaFinalizados').style.overflow = "hidden";
	document.getElementById('BandejaFinalizados').style.width = "100%";
	document.getElementById('BandejaFinalizados').style.heigth = "100%";
}

//Función que inicializa la bandeja de Formularios ParaFirmar
function cargarBandejaParaFirmar(){
	if(grids[6] != null){
		grids[6].destructor();
	}
	
	var unidad = document.getElementById("unidad").options[document.getElementById("unidad").selectedIndex].value;
	var anio = document.getElementById("anio").options[document.getElementById("anio").selectedIndex].value;
	var frm = document.getElementById("filtroTipoDoc").options[document.getElementById("filtroTipoDoc").selectedIndex].value;
	var usuarioActual = document.getElementById("sUsuario").value;
	//var strXml = urlBandejaParaFirmar + "&RestrictToCategory=" + unidad+anio+frm+"&Count=5000";
	var strXml = urlBandejaParaFirmar + "&RestrictToCategory=" + unidad+usuarioActual+anio+frm +"&Count=5000";
	
	document.getElementById('BandejaParaFirmar').style.overflow = "hidden";

	var estiloHeader = "height:17px;margin:1px;font-size:11px;padding:1px";
	
	var mygrid = new dhtmlXGridObject('BandejaParaFirmar');

	dhtmlxError.catchError("LoadXML",myErrorHandler);
	
	mygrid.attachEvent("onXLE", cargarCantidadParaFirmar);
	
	mygrid.setImagePath("/codebase/imgs/");
	mygrid.setHeader("&nbsp;,Número,Formulario,Fecha,Estado",null,[estiloHeader,estiloHeader,estiloHeader,estiloHeader,estiloHeader]);
	mygrid.setInitWidths("100,100,*,70,200");
	mygrid.setColTypes("ro,ro,ro,ro,ro");
	mygrid.setColAlign("left,left,left,left,left");
	mygrid.setSkin("light");
	mygrid.enableAlterCss("even", "uneven");
	mygrid.enableRowsHover(true,'grid_hover');
	grids[6] = mygrid;
	mygrid.setColSorting("na,str,str,str,str");
	//mygrid.enableAutoHeight(true);
	//mygrid.enableSmartRendering(true,20);
	mygrid.enableAutoWidth(true);
	mygrid.init();
	mygrid.loadXML(strXml);
	filtros[6] = 0;
	document.getElementById("fil6").src = document.getElementById("title_filtro").value;
	mygrid.attachEvent("onRowSelect", rowSelection);
	document.getElementById('BandejaParaFirmar').style.overflow = "hidden";
	document.getElementById('BandejaParaFirmar').style.width = "100%";
	document.getElementById('BandejaParaFirmar').style.heigth = "100%";
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
		if(i==5){
			estiloAttachHeader = estiloAttachHeader + "text-align:left;";
			grids[i].attachHeader("#master_checkbox,#text_filter,,#text_filter,#text_filter,#text_filter,,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
			grids[i].attachHeader("#master_checkbox,#text_filter,,#text_filter,#text_filter,#text_filter,,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
		}else{
			grids[i].attachHeader("#rspan,#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
			grids[i].attachHeader("#rspan,#text_filter,#text_filter,#text_filter,#text_filter",[estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader,estiloAttachHeader]);
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

//funcion que se encarga de cargar el contenido de las bandejas a la hora de seleccionar una tab
function cargarContenidoTab(event, ui){
	//Seteo el cookie de la tab seleccionada
	setCookIGDoc("IGDocBandejaNuevaForm", ui.newPanel.index()-1, "CookieBandeja");

	//Cargo la tab seleccionada
	switch(ui.newPanel.index()-1){
		case 0:
			//alert("#tabs-1");
			cargarBandFormularios();
			break;
		case 1:
			cargarBandejaReservados();
			break;
		case 2:
			//alert("#tabs-3");
			cargarBandejaFinalizados();
			break;
		case 3:
			cargarBandejaMarcadas();
		case 4:
			cargarBandejaParaFirmar();
		break;
	}		
}

//Función que minimiza las bandejas
function minimizarBandeja(idBandeja,num){
	var display = document.getElementById(idBandeja).style.display;
	if((display == "")||(display == "block")){
		document.getElementById(idBandeja).style.display = "none";
		document.getElementById("min"+num).src = document.getElementById("title_minimize_on").value;
		if(num=="0"){
			document.getElementById("CabezalBandejaEntradaWrap").style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
			document.getElementById("CabezalBandejaSalidaWrap").style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
		}else if(((num=="1")&&(document.getElementById("CabezalBandejaSalidaWrap").style.display=="none"))||((num=="2")&&(document.getElementById("CabezalBandejaEntradaWrap").style.display=="none"))){
			//Cuando minimizo la bandeja de entrada o de salida y la otra esta minimizada debo agrandar la bandeja de trabajo
			document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
		}
	}else{
		document.getElementById(idBandeja).style.display = "block";
		document.getElementById("min"+num).src = document.getElementById("title_minimize").value;
		if(num=="0"){
			document.getElementById("CabezalBandejaEntradaWrap").style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
			document.getElementById("CabezalBandejaSalidaWrap").style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
		}else if((num==1)||(num==2)){
			//Al restaurar la bandeja de entrada o de salida debo volver el alto original a la bandeja de trabajo
			document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO_TRABAJO) + "px";
		}
	}
	resize();
}

//Función para maximizar las bandejas
function maximizarBandeja(idBandeja,num){
	if(idBandeja == "CabezalBandejaTrabajoWrap"){
		if(maximizadas[0] == 0){
			document.getElementById("CabezalBandejaEntrada").style.display = "none";
			document.getElementById("CabezalBandejaSalida").style.display = "none";
			document.getElementById("CabezalBandejaEntradaWrap").style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
			document.getElementById("CabezalBandejaSalidaWrap").style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
			document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO_MAXIMIZADA) + "px";
			document.getElementById(idBandeja).style.display = "block";
			document.getElementById("min"+num).src = document.getElementById("title_minimize").value;
			document.getElementById("min"+num).style.display = "none";
			document.getElementById("max"+num).src = document.getElementById("title_maximize").value;
			maximizadas[0] = 1;
		}else{
			document.getElementById("CabezalBandejaEntrada").style.display = "block";
			document.getElementById("CabezalBandejaSalida").style.display = "block";
			if((document.getElementById("CabezalBandejaSalidaWrap").style.display == "none")&&(document.getElementById("CabezalBandejaEntradaWrap").style.display == "none")){
				document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO - 2*ALTO_CABEZAL) + "px";
			}else{
				document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO_TRABAJO) + "px";
			}
			//document.getElementById("CabezalBandejaTrabajoWrap").style.margin_bottom = "5px";
			document.getElementById("min"+num).style.display = "inline-block";
			document.getElementById("max"+num).src = document.getElementById("title_maximize_off").value;
			maximizadas[0] = 0;
		}
	}else if(idBandeja == "CabezalBandejaEntradaWrap"){
		if(maximizadas[1] == 0){
			document.getElementById("CabezalBandejaTrabajo").style.display = "none";
			document.getElementById("CabezalBandejaSalida").style.display = "none";
			document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO_TRABAJO) + "px";
			document.getElementById(idBandeja).style.height = "" + (ALTO_MAXIMIZADA) + "px";
			document.getElementById(idBandeja).style.display = "block";
			document.getElementById("CabezalBandejaEntrada").style.width = "100%";
			document.getElementById("min"+num).src = document.getElementById("title_minimize").value;
			document.getElementById("max"+num).src = document.getElementById("title_maximize").value;
			maximizadas[1] = 1;
			document.getElementById("min"+num).style.display = "none";
			document.getElementById('BandejaEntrada').style.width = "100%";
			grids[1].sortRows(0);
		}else{
			document.getElementById("CabezalBandejaTrabajo").style.display = "block";
			document.getElementById("CabezalBandejaSalida").style.display = "block";
			if(document.getElementById("CabezalBandejaTrabajoWrap").style.display == "none"){
				document.getElementById(idBandeja).style.height = "" + (ALTO_MAXIMIZADA-ALTO_CABEZAL) + "px";
			}else{
				document.getElementById(idBandeja).style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
			}
			document.getElementById("CabezalBandejaEntrada").style.width = "49%";
			document.getElementById('BandejaEntrada').style.width = "100%";
			maximizadas[1] = 0;
			document.getElementById("max"+num).src = document.getElementById("title_maximize_off").value;
			document.getElementById("min"+num).style.display = "inline-block";
			grids[1].sortRows(0);
		}
	}else if(idBandeja == "CabezalBandejaSalidaWrap"){
		if(maximizadas[2] == 0){
			document.getElementById("CabezalBandejaTrabajo").style.display = "none";
			document.getElementById("CabezalBandejaEntrada").style.display = "none";
			document.getElementById("CabezalBandejaTrabajoWrap").style.height = "" + (ALTO_TRABAJO) + "px";
			document.getElementById(idBandeja).style.height = "" + (ALTO_MAXIMIZADA) + "px";
			document.getElementById(idBandeja).style.display = "block";
			document.getElementById("CabezalBandejaSalida").style.width = "100%";
			document.getElementById("BandejaSalida").style.width = "100%";
			document.getElementById("min"+num).src = document.getElementById("title_minimize").value;
			document.getElementById("max"+num).src = document.getElementById("title_maximize").value;
			maximizadas[2] = 1;
			document.getElementById("min"+num).style.display = "none";
			grids[2].sortRows(0);
		}else{
			document.getElementById("CabezalBandejaTrabajo").style.display = "block";
			document.getElementById("CabezalBandejaEntrada").style.display = "block";
			if(document.getElementById("CabezalBandejaTrabajoWrap").style.display == "none"){
				document.getElementById(idBandeja).style.height = "" + (ALTO_MAXIMIZADA-ALTO_CABEZAL) + "px";
			}else{
				document.getElementById(idBandeja).style.height = "" + (ALTO_ENTRADA_SALIDA) + "px";
			}
			document.getElementById("CabezalBandejaSalida").style.width = "49%";
			document.getElementById("BandejaSalida").style.width = "100%";
			document.getElementById("max"+num).src = document.getElementById("title_maximize_off").value;
			maximizadas[2] = 0;
			document.getElementById("min"+num).style.display = "inline-block";
			grids[2].sortRows(0);
		}
	}
	resize();
}

//Función que reajusta las tablas a la hora de hacer un resize de la ventana


function resize()
{
	
	document.getElementById('BandejaTrabajo').style.height = "100%";
	document.getElementById('BandejaEntrada').style.height = "100%";
	document.getElementById('BandejaSalida').style.height = "100%";
	document.getElementById('BandejaReservados').style.height = "100%";
	document.getElementById('BandejaFinalizados').style.height = "100%";
	document.getElementById('BandejaMarcadas').style.height = "100%";
	document.getElementById('BandejaParaFirmar').style.height = "100%";


	for(i = 0;i<7;i++){
			if(grids[i] != null){
				grids[i].setSizes();
			}
	}

	actualizarAltos();

	document.getElementById('tabs').style.width = calcularAncho()-30 +"px";
}

//Función que desplega el menú a la hora de clickear una fila
function rowSelection(idTabla){
	var e = window.event;
	var tabla = this;
	if(tabla!= null){
		var ind = tabla.getSelectedCellIndex();
	//	alert(ind);
		//Verifico que la fila seleccionada no sea la primera, en ese caso no se desplega menú porque allí estan las imágenes
		if(ind != 0){
			var selectedId=tabla.getSelectedRowId();
	//		alert(selectedId);
		    	var unidActuacion =  tabla.getRowAttribute(selectedId,"unidActuacion");

			var clave =  tabla.getRowAttribute(selectedId,"clave");
			var base = tabla.getRowAttribute(selectedId,"base");
			var id = tabla.getRowAttribute(selectedId,"id");
			var nroCopia =  tabla.getRowAttribute(selectedId,"NroCopia");
			irFormulario(base,id);
		}
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
  	return myHeight -10;
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
	
	if(maximizadas[0]==1){
		document.getElementById('CabezalBandejaTrabajoWrap').style.height = ""+ ALTO_MAXIMIZADA + "px";
	}else if(document.getElementById("CabezalBandejaSalidaWrap").style.display=="none"&&document.getElementById("CabezalBandejaEntradaWrap").style.display=="none"){
		document.getElementById('CabezalBandejaTrabajoWrap').style.height = ""+(ALTO - 2*ALTO_CABEZAL)+"px";
	}else{
		document.getElementById('CabezalBandejaTrabajoWrap').style.height = ""+ALTO_TRABAJO+"px";
	}
	if(maximizadas[1]==1){
		document.getElementById('CabezalBandejaEntradaWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	}else if(document.getElementById("CabezalBandejaTrabajoWrap").style.display=="none"){
		document.getElementById('CabezalBandejaEntradaWrap').style.height = ""+(ALTO - 2*ALTO_CABEZAL)+"px";
	}else{
		document.getElementById('CabezalBandejaEntradaWrap').style.height = ""+ALTO_ENTRADA_SALIDA+"px";
	}
	if(maximizadas[2]==1){
		document.getElementById('CabezalBandejaSalidaWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	}else if(document.getElementById("CabezalBandejaTrabajoWrap").style.display=="none"){
		document.getElementById('CabezalBandejaSalidaWrap').style.height = ""+(ALTO - 2*ALTO_CABEZAL)+"px";
	}else{
		document.getElementById('CabezalBandejaSalidaWrap').style.height = ""+ALTO_ENTRADA_SALIDA+"px";
	}
	
	document.getElementById('CabezalBandejaReservadosWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaFinalizadosWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaParaFirmarWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
	document.getElementById('CabezalBandejaMarcadasWrap').style.height = ""+ALTO_MAXIMIZADA+"px";
}

function irFormulario(base,id){
	var url =  "/" + base + "/0/" + id + "?OpenDocument";
	//if (document.forms[0].nuevaVentana.value=="1"){
	//	if (confirm("¿Desea abrir la Carátula en una nueva ventana?")){
	//		window.open(url,"menubar=no,status=yes,resizable=yes,scrollbars=yes,LEFT=0,TOP=0");
	//	}else{
	//			window.location.replace(url);
	//	}
	//}else{
				window.location.replace(url);
	//}	
}