var arrIndices= new Array(); // indice que identifica a cada postit
var arrColores= new Array();
var arrTitulos= new Array();
var arrTextos = new Array();

function getArrays(){
	// toma los string separados por un token, y los carga en arrays globales.
	var field = document.getElementById("colores_current").value;
	if (field!=""){
		arrColores = field.split("$$");
		field = document.getElementById("titulos_current").value;
		arrTitulos = field.split("$$");
		field = document.getElementById("textos_current").value;
		arrTextos = field.split("$$");
		return true;
	}else
		return false; 
}

function showUserTooltips(){
	// crea en html los tooltip apartir de los datos en los arrays globales.
	var len = arrColores.length;
	for (var i=0;i<len; i++){
		addTooltip(i+2,arrColores[i],entityToString(arrTitulos[i]),entityToString(arrTextos[i]));
		arrIndices[i]=i+2;
	}
}

function rgbConvert(str){
	if (document.all){ 	// i.e. browser sucks!
		return str.toUpperCase();
	}else{ 			// mozilla firefox rules!
		str = str.replace(/rgb\(|\)/g, "").split(",");
		str[0] = parseInt(str[0], 10).toString(16).toLowerCase();
		str[1] = parseInt(str[1], 10).toString(16).toLowerCase();
		str[2] = parseInt(str[2], 10).toString(16).toLowerCase();
		str[0] = (str[0].length == 1) ? '0' + str[0] : str[0];
		str[1] = (str[1].length == 1) ? '0' + str[1] : str[1];
		str[2] = (str[2].length == 1) ? '0' + str[2] : str[2];
		return ('#' + str.join(""));
	}
}
//********************************** EFECTO DE TOOTIP ******************************************
$.tools.addTipEffect("slidedown",  
		// opening animation
		function() { 
	var opacity = this.getConf().opacity;
	this.getTip().css({opacity:0}).animate({top: '+=5', opacity:opacity}, 300).show();
}, 
// closing animation
function() {
	this.getTip().animate({top: '+=15', opacity:0}, 300, function() { 
		$(this).hide().animate({top: '+=30'}, 0);
	});
});
//***********************************************************************************************
function stringToEntity (strOriginal){
	var str;
	str = strOriginal.replace(/á/g,"_aacute_");
	str = str.replace(/é/g,"_eacute_");
	str = str.replace(/í/g,"_iacute_");
	str = str.replace(/ó/g,"_oacute_");
	str = str.replace(/ú/g,"_uacute_");
	return str;
}

function entityToString (strOriginal){
	var str;
	str = strOriginal.replace(/_aacute_/g,"á");
	str = str.replace(/_eacute_/g,"é");
	str = str.replace(/_iacute_/g,"í");
	str = str.replace(/_oacute_/g,"ó");
	str = str.replace(/_uacute_/g,"ú");
	return str;
}
//***********************************************************************************************
function updateArrays(index, color, titulo, texto){
	// agrego: color, titulo y texto a los vectores correspondientes.

	var iter = -1;
	var len = arrIndices.length;
	for (iter = 0; iter< len;iter++){
		if (arrIndices[iter] == index)
			break;
	}
	titulo=stringToEntity(titulo);
	texto =stringToEntity(texto);
	if  (iter!=-1){ // object found!
		arrColores[iter] = color;
		arrTitulos[iter] = titulo;
		arrTextos[iter] = texto;
	}else{ // object not found! let's create it!
		arrColores.unshift(color);
		arrTitulos.unshift(titulo);
		arrTextos.unshift(texto);
	}
}
function updateDataFields(accion){
	document.getElementById('sAccion').value=accion;
	// actualiza los campos html con prefijo current_XXXX
	document.getElementById("colores_current").value= arrColores.join("$$");
	document.getElementById("titulos_current").value= arrTitulos.join("$$");
	document.getElementById("textos_current").value = arrTextos.join("$$");
}

function deleteAndUpdateFields(target_id, accion){
	document.getElementById('sAccion').value=accion;
	// busco el i/ arrIndices[i]=index para borrar, si no esta, agrego al principio.
	var iter = -1;
	var len = arrIndices.length;
	for (iter = len; iter >=0;iter--){
		if (arrIndices[iter] == target_id)
			break; 
	}
	if  (iter!=-1){ // object found!
		if((iter == 0) && (len == 1)){ // parche, cuando borran el unico
			arrIndices = new Array();
			arrColores = new Array();
			arrTitulos = new Array();
			arrTextos  = new Array();
		}else if((iter == 0) && (len > 1)){ // parche, cuando borran en primero
			arrColores = arrColores.slice(1);
			arrIndices = arrIndices.slice(1);
			arrTitulos = arrTitulos.slice(1);
			arrTextos  = arrTextos.slice(1);
		}else{
			arrColores.splice(iter,iter);
			arrTitulos.splice(iter,iter);
			arrTextos.splice(iter,iter);
		}
		updateDataFields(accion);
	}

}

//Variables para el indice de los postit
var td_index = 1; //indice asignado a cada postit/td/trigger/etc


function getPrevTDIndex(){
	return td_index-1;
}

function incrementAndGetLast(){
	td_index +=1;
	return td_index;
}
//*************************************************************************************************
function addTooltip(id,color,titulo,texto){
	if(id > td_index){ // sino, puede ser que quiera usar un id que ya existe.
		//------- BINDING EL EFECTO DE slidedown AL LOS QUE TIENEN LA CLASE trigger
		$('.trigger').tooltip({effect: 'slidedown', position:['bottom', 'left']});
		//---------------------------------------------------------------------------

		//****************** Clonacion del tooltip ****************************
//		$("#td_1").clone(false).attr("id","td_"+id).insertAfter("#td_1");
		$("#td_1").clone(false).attr("id","td_"+id).insertAfter("#td_"+(td_index));
		//$("#td_1").clone(false).attr("id","td_"+id).insertAfter("#row_postit > td : last");
		td_index++;
		$('#td_'+id).show();
		$('#td_'+id).find('#div_title_1').attr('id','div_title_'+id);
		//$('#td_'+id).find('#div_title_'+id).attr('title',titulo);
		$('#td_'+id).find('#div_tooltip_1').attr('id','div_tooltip_'+id);
		$('#td_'+id).find('.trigger').removeClass('trigger').addClass('trigger_'+id);
		$('.trigger_'+id).tooltip({effect: 'slidedown', position:['bottom', 'left']});
		$('#td_'+id).find('#campos_trigger_1').attr('id','campos_trigger_'+id);
		$('#td_'+id).find('#campos_trigger_'+id).css({'background-color' : color});
		//****************** Fin Clonacion del Tooltip *************************

		$('.dialog_opener').click(function(){
			//guardo el nro de td que lo invoca, para remplazar en http-post
			var str_id = $(this).parent().parent().attr('id');
			var idx = str_id.lastIndexOf("_");
			var nro2 = str_id.substr(idx+1);

			$('#dialogEdit').find('#idOpener').val(str_id.substr(idx+1));
			// titulo
			var tooltip_title = $(this).parent().parent().find("#user_title_"+nro2).html();
			$('#dialogEdit').dialog('option', 'title', "Editar Nota Personal" );
			$('#dialogEdit').find("#titleEdit").val(tooltip_title);
			//color
			var colorActual = document.getElementById("div_tooltip_"+nro2).style.backgroundColor;
			colorActual = rgbConvert(colorActual).toUpperCase();
			$('#colorpicker').val(colorActual);
			//texto
			var texto = document.getElementById('user_input_'+ nro2).innerHTML;
			$('#dialogEdit').find('#txtAreaEdit').val(texto);
			$('#dialogEdit').dialog('open');
		});
		//boton de borrar postit.
		$('#div_title_'+id).find('#delete_1').attr('id','delete_'+id);
		$('#div_title_'+id).find('#delete_'+id).removeClass('confirm').addClass('confirm');
		$('#div_title_'+id).find('#user_input_1').attr('id','user_input_'+id);
		$('#div_title_'+id).find('#user_input_'+id).html(texto);
		$('#div_title_'+id).find('#user_title_1').attr('id','user_title_'+id);
		$('#div_title_'+id).find('#user_title_'+id).html(titulo);

		//**************** Mensaje de confirmacion.
		$('#div_title_'+id).find('#yes').click(function(){
			var target_id = this.parentNode.parentNode.id;  // div_title_x que contiene al postit
			var numId = target_id.substr(target_id.lastIndexOf("_")+1);
			$('#td_'+numId).remove();
			deleteAndUpdateFields(numId, "acc_postit_delete");
			$('#div_title_'+numId).find('#operation').show();
			$('#div_title_'+numId).find('#confirmation').hide();
			document.forms["frmTooltip"].submit();
			$('#dialog_pausa').dialog('open');
		});

		$('#div_title_'+id).find('#no').click(function(){
			$('#div_title_'+id).find('#operation').show();
			$('#div_title_'+id).find('#confirmation').hide();
		});
		//**************** Codigo para borrar el postit.
		$('#div_title_'+id).find('.confirm').click(function(){
			$('#div_title_'+id).find('#operation').hide();
			$('#div_title_'+id).find('#confirmation').show();
		});
		//**************** Fin Clonacion del dialog *************************

		// seteo el color al postit
		document.getElementById('div_tooltip_'+id).style.background = color;
	}else{
		alert("El id:"+id+" ya existe.");
	}
}

//*************************************************************************************************


//*********** FIN DEL CODIGO DEL TOOTIP *************

//************ CODIGO PARA EL MODAL FORM DE EDICION ************
$(function() {
	var txtArea = $("#txtAreaEdit");
	var allFields = $([]).add(txtArea);

	$("#dialogEdit").dialog({
		bgiframe: true,
		autoOpen: false,
		height: 420,
		maxHeight: 420,
		modal: true,
		resizable: false,
		draggable: true,
		buttons: {
		'Cancelar': function() {
		$(this).dialog('close');
	},
	'Guardar': function() {
		var idx = $('#idOpener').val();
		var editedColor = $('#colorpicker').val();			
		var editedTitle = $('#titleEdit').val();
		var editedText = $('#txtAreaEdit').val();
		updateArrays(idx, editedColor,editedTitle, editedText);
		updateDataFields("acc_postit_edit");
		document.forms["frmTooltip"].submit();
		$(this).dialog('close');
		$('#dialog_pausa').dialog('open');
	}
	},
	open: function(){
		$("#txtAreaEdit").focus();
	},
	close: function() {
		allFields.val('').removeClass('ui-state-error');
	}


	});

	$('#show_dialog').click(function() {
		$('#dialogEdit').dialog('open');
	})
});
//FIN DEL CODIGO DEL MODAL FORM.

//************ CODIGO PARA EL MODAL FORM DE Creacion ************
$(function() {
	var txtArea = $("#txtAreaCreate");
	var allFields = $([]).add(txtArea);

	$("#dialogCreate").dialog({
		bgiframe: true,
		autoOpen: false,
		height: 420,
		maxHeight: 420,
		modal: true,
		resizable: false,
		draggable: true,
		buttons: {
		'Crear': function() {
		var idx = td_index+2;
		var userColor = $('#newColorPicker').val();				
		var userTitle = $('#newTitle').val();
		var userText = $('#txtAreaCreate').val();
		addTooltip(idx,userColor,userTitle,userText);
		updateArrays(idx,userColor,userTitle,userText);
		updateDataFields("acc_postit_create");
		document.forms["frmTooltip"].submit();
		$(this).dialog('close');
		$('#dialog_pausa').dialog('open');
	},
	'Cancelar': function() {
		$(this).dialog('close');
	}

	},
	open: function(){
		$('#newColorPicker').val("");
		$('#newTitle').val("");
		$('#txtAreaCreate').val("");
		$("#newTitle").focus();
	},
	close: function() {
		allFields.val('').removeClass('ui-state-error');
	}


	});
	$('#menuitem2_17').click(function() {
		$('#dialogCreate').dialog('open');
	})
});
//********************** FIN DEL MODAL FORM DE CREACION ***********************