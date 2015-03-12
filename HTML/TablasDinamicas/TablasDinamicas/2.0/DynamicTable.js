/* DynamicTables v1.0
 * Fecha: 24/02/2014
 * Autor: Diego Tolosa
 */

/****************************CONSTRUCTOR*************************************************************/
/*Funcion DynamicTable
* Parametros:
	 * 	-cantColumns 	: cantidad de columnas que tendra la tabla (entero > 0) 
	 * 	-header			: vector de largo cantColumns con el nombre de cada columna
	 * 	-dominoFields	: vector de largo cantColumns con el id del campo de cada columna (campos multivaluados)
	 * 	-htmlFields		: vector de largo cantColumns con el id de los campos html de ingreso de datos para la tabla
	 * 	-tableId		: identificador html de la tabla
	 * 	-columnKey		: indica que columna es clave de la tabla para la validacion de datos repetidos
	 * 	-validator		: función de validación del agregado de filas fila (returna un string conteniendo mensaje de errores)
	 * 	-tableVarName	: nombre de la variable empleada para la tabla
	 * 	-editEnabled	: bandera booleana para habilitar la edicion de una fila
	 * 	-deleteEnabled	: bandera booleana para habilitar el borrado de una fila
	 * 	-dynTableDiv	: id del div que contiene los campos domino y html donde estara la tabla dinámica.
	 * 	-tableWidth		: ancho de la tabla (% o pxs ej: 100% 50px)
	 * 	-editable		: establece si el modo de edicion esta habilitado o no.
*/
function DynamicTable(cantColumns,header,dominoFields,htmlFields,tableId,columnKey,validator,tableVarName,editEnabled,deleteEnabled,dynTableDiv,tableWidth,editable){
	try {
		var msgError = "";
		var i = 0;
		var pathSrv = document.getElementById("sPathDynamicTables").value;
		//Validacion de correctitud de parametros de entrada
	
		if(cantColumns < 1 )
			msgError += "Parámetro 'cantColumns' inválido: debe ser mayor a 0. \n";
	
		if(header.length != cantColumns )
			msgError += "Parámetro 'header' inválido: el vector debe tener largo 'cantColumns'. \n";
	
		if(dominoFields.length != cantColumns )
			msgError += "Parámetro 'dominoFields' inválido: el vector debe tener largo 'cantColumns'. \n";
		else{
			//Verifica si todos los campos ingresados existen
			var noSalir = true;
			for(i = 0;i<dominoFields.length && noSalir;i++)
				noSalir &= document.getElementById(dominoFields[i])!=undefined;
			if(!noSalir)
				msgError += "Campo domino no existente: '" + dominoFields[i] + "'.\n";
		}
		if(htmlFields !=null){
			if(htmlFields.length != cantColumns )
				msgError += "Parámetro 'htmlFields' inválido: el vector debe tener largo 'cantColumns'. \n";	
			else if(editable==true){
				var htmlFieldsType = [];
				//Verifica si todos los campos ingresados existen
				var noSalir = true;
				for(i = 0;i<htmlFields.length && noSalir;i++){
					noSalir &= document.getElementById(htmlFields[i])!=undefined;
					htmlFieldsType[i] = document.getElementById(htmlFields[i]).type;
				}
				if(!noSalir)
					msgError += "Campo html no existente: '" + htmlFields[i] + "'.\n";
			}
		}
		
		if(tableId == "")
			msgError += "Parametro 'tableId' inválido: debe ingresar el identificador html de la tabla. \n";	
		if(columnKey!=null && (columnKey < 0 || columnKey >= cantColumns))
			msgError += "Parametro 'columnKey' inválido: la columna clave debe ser mayor o igual a 0 y menor que 'cantColumns'. \n";
		
		if(dynTableDiv == "" ){
			msgError += "Parámetro 'dynTableDiv' inválido: debe ingresar un identificador válido. \n";	
		}
		if(msgError != ""){
			//Ocurrio un error
			alert(msgError);
			return false;
		}

		//Asigancion de atributos de la tabla

		this.editable 			= editable;
		this.cantColumns 		= cantColumns;
		this.header 			= header;
		this.dominoFields 		= dominoFields;
		this.htmlFields 		= htmlFields;
		this.htmlFieldsType 	= htmlFieldsType;
		this.tableId 			= tableId;
		this.tableVarName 		= tableVarName;
		this.dynTableDiv 		= dynTableDiv;
		this.columnKey 			= columnKey;
		this.validator 			= validator;	
		
		this.editEnabled 		= editEnabled;
		this.deleteEnabled 		= deleteEnabled;
		this.rowIndexId 		= tableId+"_inputRowsIndex";
		
		this.buttonsId 			= [tableId+"_addButton",tableId+"_modifButton"];
		this.buttonsNames		= ["Agregar","Modificar"];
		this.buttonsDiv			= dynTableDiv;
		this.buttonsClass		= ["buttonClass","buttonClass"];

		this.separator 			= "{&&}";

		this.orderRow 			= true;
		this.tdSelected			= null;
		this.upRow 				= "+";
		this.downRow			= "-";

		this.rowId 				= 0;
		this.cantRows 			= 0;
		this.columnsWidth 		= [];
		
		this.imgsPath			= [pathSrv+"/Editar.jpg?OpenImageResource",pathSrv+"/Remover.gif?OpenImageResource",pathSrv+"/Filters.png?OpenImageResource",pathSrv+"/Search.jpg?OpenImageResource"];
		this.imgWidth			= 20;
		this.imgHeight			= 20;

		this.dblClickAction 	= null;
		
		this.pagesButtonsClass	= ["buttonClass","buttonClass"];
		this.actualPage			= 0;
		this.maxCantRows		= 10;
		this.paginationEnable	= true;

		this.searchEnable 		= true;

		this.afterSave			= null;

		if(tableWidth != "")
			this.tableWidth = tableWidth;
		else
			this.tableWidth = "100%";

	}catch (e){
		alert("Error inesperado: 'DynTable()' " + e.message);
		return false;
	}
}

DynamicTable.prototype = {
	loadTable : function(){
		try{
			//Armado de la estructura a utilizar
			var buttonsHTML = "";
			buttonsHTML += "<input type=\"button\" id=\""+this.buttonsId[0]+"\" onClick=\""+this.tableVarName+".addRow()\"";
			buttonsHTML += " class=\""+this.buttonsClass[0]+"\"";
			buttonsHTML += " style=\"display:none\" value=\""+this.buttonsNames[0]+"\">";

			buttonsHTML += "<input type=\"button\" id=\""+this.buttonsId[1]+"\" onClick=\""+this.tableVarName+".addEditedRow()\" ";
			buttonsHTML += " class=\""+this.buttonsClass[1]+"\"";
			buttonsHTML += " style=\"display:none\" value=\""+this.buttonsNames[1]+"\">";	
		
			var htmlDATA = "";
			htmlDATA += "<div id=\""+this.tableId+"_div\" style=\"display:none\" >";
			htmlDATA += "	<div class=\"DivTableClass\" style=\"width:"+this.tableWidth+"\">";
			htmlDATA += "		<table id=\""+this.tableId+"\" class=\"DragContainer\" tabindex=\"0\"";
			if(this.orderRow){
				htmlDATA += "onkeypress=\""+this.tableVarName+".keyPressAction(event)\"";
			};
			htmlDATA += ">";
			htmlDATA += "			<tbody></tbody>";
			htmlDATA += "		</table>";
			htmlDATA += "	</div>";

			if(this.searchEnable){
				htmlDATA += "<table style=\"width:"+this.tableWidth+"\">"
				htmlDATA += "<tr id=\""+this.tableId+">filtersRow\" style=\"display:none\">";
				for (var i = 0; i < this.cantColumns; i++){
					htmlDATA += "<td width=\""+this.columnsWidth[i]+"\">";
					htmlDATA += "<input type\"text\" id=\""+this.tableId+">filter"+i+"\" style=\"width:100%\" >";
					htmlDATA += "</td>"
				}
				htmlDATA += "<td style=\"width:2%\"></td>";
				htmlDATA += "<td style=\"width:2%\"></td>";
				htmlDATA += "<td style=\"width:2%\"><img width=\""+this.imgWidth+"\" align=\"top\" height=\""+this.imgHeight+"\" onClick=\""+this.tableVarName+".searchAction()\" src=\""+this.imgsPath[3]+"\"></td>";
				htmlDATA += "</tr></table>";
			}


			if(this.paginationEnable){
				htmlDATA += "<table style=\"width:"+this.tableWidth+"\"><tr><td width=\"33%\"></td><td width=\"33%\">"
				htmlDATA += "<div align=\"center\">"
				htmlDATA += "<input type=\"button\" id=\""+this.tableId+"PrevPage\" onClick=\""+this.tableVarName+".prevPage()\"";
				htmlDATA += " class=\""+this.pagesButtonsClass[0]+"\"";
				htmlDATA += " style=\"display:none\" value=\"<\">";
				htmlDATA += "<span id=\""+this.tableId+">pageCounter\" >1</span>"
				htmlDATA += "<input type=\"button\" id=\""+this.tableId+"NextPage\" onClick=\""+this.tableVarName+".nextPage()\"";
				htmlDATA += " class=\""+this.pagesButtonsClass[1]+"\"";
				htmlDATA += " style=\"display:none\" value=\">\">";
				htmlDATA += "</div></td><td align=\"center\" width=\"33%\">";
				htmlDATA += "<div align=\"right\">";
				htmlDATA += "<input type=\"text\" id=\""+this.tableId+">inputPage\" size=\"1\" >";
				htmlDATA += "<input type=\"button\" id=\""+this.tableId+"GoPage\" onClick=\""+this.tableVarName+".setPage()\"";
				htmlDATA += " class=\""+this.pagesButtonsClass[0]+"\"";
				htmlDATA += " value=\"Ir\">";
				htmlDATA += "</div></td></tr></table>";
			}
			
			htmlDATA += "</div>";
			htmlDATA += "<input type=\"text\" id=\""+this.rowIndexId+"\" value=\"\" style=\"display:none\">";
		
			document.getElementById(this.buttonsDiv).innerHTML  += buttonsHTML;
			document.getElementById(this.dynTableDiv).innerHTML += htmlDATA;

			//habilita los botones correspondientes
			if(this.editable){
				document.getElementById(this.buttonsId[0]).style.display = "inline";
				document.getElementById(this.buttonsId[1]).style.display = "none";
			}

			//se genera el header de la tabla
			var headerTable = this.generateHeader();
			
			$(document.getElementById(this.tableId).tBodies[0]).append(headerTable);

			/*document.getElementById(this.tableId).tBodies[0].innerHTML += headerTable;*/
			
			var campoDomino = document.getElementById(this.dominoFields[0]).value;
			//si existen datos en los campos domino se carga la tabla con los mismos
			if(campoDomino != ""){
				//Armado de las filas
				this.cantRows = campoDomino.split(";").length;
				var cantPages;
				var maxRowsActualPage;
				if(this.paginationEnable){
					cantPages = this.cantRows / this.maxCantRows;
					document.getElementById(this.tableId+">inputPage").maxlength = cantPages.length;
					maxRowsActualPage = this.maxCantRows;
				}
				for(var j = 0; j < this.cantRows;j++){
					var fieldsArrayParams=[];
					for(var k=0;k<this.cantColumns;k++){
						var valueK = document.getElementById(this.dominoFields[k]).value;
						document.getElementById(this.dominoFields[k]).value = valueK.replace(/; /g,";");
						fieldsArrayParams[k] = valueK.split(";")[j];
					}
						
					var id = this.tableId+">"+this.rowId;
					var newRow = this.generateRow(fieldsArrayParams);

					$(document.getElementById(this.tableId).tBodies[0]).append(newRow);
					//document.getElementById(this.tableId).tBodies[0].innerHTML += newRow;
					//actualizo filas visibles
					if(this.paginationEnable && this.rowId>=this.maxCantRows){
						document.getElementById(id).style.display = "none";
						this.viewPageButtons();
					}

					this.rowId++;	
					if(j==0)
						document.getElementById(this.rowIndexId).value = id;
					else
						document.getElementById(this.rowIndexId).value += ";" + id;
				}
				document.getElementById(this.tableId+"_div").style.display = "inline";

			}
		}catch (e){
			alert("Error inesperado: 'loadTable()' " + e.message);
			return false;
		}
	},
/****************************OPCIONALES**************************************************************/
	
	//Actualiza el div donde seran ubicados los botones Agregar y Modificar
	setButtonsDiv : function(buttonsDiv){
		if(this.editable == true)
			try{
				if(document.getElementById(buttonsDiv) != undefined)
					this.buttonsDiv = buttonsDiv;
				else
					alert("No existe un elemento identificado por: " + buttonsDiv);
			}catch (e){
				alert("Error inesperado: 'setButtonsDiv()' " + e.message);
				return false;
			}
	},
	
	//Actualiza el ancho de las columnas de la tabla
	updateColWidths : function(columnsWidth){
		try{
			if(columnsWidth.length != this.cantColumns){
				alert("Parametro 'columnsWidth' inválido: el vector debe tener largo 'cantColumns'. \n");
				return false;
			}
			this.columnsWidth = columnsWidth;
		}catch (e){
			alert("Error inesperado: 'updateColWidths()' " + e.message);
			return false;
		}
	},
	
	//Actualiza el nombre de los botones Agregar y modificar
	updateButtonsNames : function (buttonsNames){
		try{
			if(buttonsNames.length != 2){
				alert("Parametro 'buttonsNames' inválido: el vector debe tener largo 'cantColumns'. \n");
				return false;
			}
			this.buttonsNames = buttonsNames;
		}catch (e){
			alert("Error inesperado: 'updateButtonsNames()' " + e.message);
			return false;
		}
	},

	//La funcion disparada en el evento doble click en cada fila.
	updateDoubleClickAction : function(dblClickAction){
		this.dblClickAction = dblClickAction;
	},

	//Actualiza la accion ordenamiento de filas
	updateOrderRow : function(orderRow){
		this.orderRow = orderRow;
	},

	//Actualiza el tamaño de las imagenes de edicion y borrado
	updateImgSize : function (imgWidth,imgHeight){
		this.imgHeight = imgHeight;
		this.imgWidth  = imgWidth;
	},

	//Actualiza la ruta de las imagenes para las acciones de edicion y borrado de cada fila
	updateImgsPath : function (editImgPath, removeImgPath,filterImgPath,searchImgPath){
		this.imgsPath = [editImgPath,removeImgPath,filterImgPath,searchImgPath];
	},

	//Actualiza la clase de los botones Agregar y Modificar
	updateButtonsClass: function (button1Class,button2Class){
		this.buttonsClass = [button1Class,button2Class];
	},
	
	//Actualiza las teclas para subir y bajar una fila de la tabla
	updateUpDownKeys: function(upKey,downKey){
		this.upRow = upKey;
		this.downRow = downKey;
	},

	//Actualiza la accion que sera ejecutada luego de agregar una nueva fila
	updateActionAfterSave: function(afterSave){
		this.afterSave = afterSave;
	},

	//Activa o desactiva la paginacion en la tabla
	updatePagintionEnabled: function(enabled){
		this.paginationEnable = enabled;
	},

	//Establece el maximo numero de filas por pagina
	updateMaxCantOfRows: function(maxCantRows){
		this.maxCantRows = maxCantRows;
	},

	//Setea la clase de los botones para la paginacion
	updatePagesButtonsClass: function(prevClass, nextClass){
		this.pagesButtonsClass = [prevClass,nextClass];
	},

	//Activa o desactiva la busqueda en la tabla
	updateSearchEnabled: function(searchEnable){
		this.searchEnable = searchEnable;
	},
/****************************VALIDACIONES************************************************************/

	//Verifica que dentro de la columna columnKey no hayan valores repetidos o nulos
	checkKeyColumn : function(dominoField, htmlField){
		try{
			var value = getValueOf(htmlField,false,this.separator);
			if(value == "")
				return false;
			var dominoValues = document.getElementById(dominoField).value.split(";");
			var rowIdx = -1;
			if(this.idToModif!=undefined)
				rowIdx = this.idToModif.split(">")[1];
			for(var i=0;i<dominoValues.length;i++){
				if(rowIdx != i && dominoValues[i] == value){
					return false;
				}
			}
					
			return true;
		}catch (e){
			alert("Error inesperado: 'checkKeyColumn()' " + e.message);
			return false;
		}
	},

	validations : function(){
		try{
			//Tiene funcion de validacion?
			if(this.validator != null){
				error = this.validator();
				if(!error)
					return false;
			}
			//Tiene columna clave?
			if(this.columnKey != null){
				if(!this.checkKeyColumn(this.dominoFields[this.columnKey],this.htmlFields[this.columnKey])){
					alert("Datos inválidos: dato de columna clave vacio o repetido");
					return false
				}
			}
			return true;
		}catch (e){
			alert("Error inesperado: 'validations()' " + e.message);
			return false;
		}
	},

/*****************************ACCIONES***************************************************************/
	/*Agrega una fila a la tabla*/
	addRow : function(){
		try{
			if(this.validations()){
				var id = this.tableId+">"+this.rowId;

				var maxRowsActualPage = (this.maxCantRows*this.actualPage)+this.maxCantRows;

				if(this.cantRows==0)
					document.getElementById(this.rowIndexId).value = id;
				else
					document.getElementById(this.rowIndexId).value += ";"+id;
		
				var fieldsArrayParams = [];
				
				for(var i=0;i<this.cantColumns;i++){
					fieldsArrayParams[i]=getValueOf(this.htmlFields[i],true,this.separator);
					
					//Se remplazan los ";" por ","
					if(fieldsArrayParams[i]!="")
						fieldsArrayParams[i] = fieldsArrayParams[i].replace(/;/g,",");
					
					//Se agrega el valor del campo de entrada dentro del campo domino correspondiente
					if(this.cantRows==0)				
						document.getElementById(this.dominoFields[i]).value = fieldsArrayParams[i];
					else
						document.getElementById(this.dominoFields[i]).value += ";" + fieldsArrayParams[i];
				}
				
				var newRow = this.generateRow(fieldsArrayParams);

				document.getElementById(this.tableId).tBodies[0].innerHTML += newRow;
				document.getElementById(this.tableId+"_div").style.display = "inline";

				if(this.paginationEnable && this.rowId >= maxRowsActualPage){
					this.nextPage();
				}
				this.viewPageButtons();
				this.rowId++;
				this.cantRows++;

				if(this.afterSave!=null){
					this.afterSave();
				}
			}
		}catch (e){
			alert("Error inesperado: 'addRow()' " + e.message);
			return false;
		}
	},

	/*Accion de copiado en campos de entrada por medio de doble click*/
	dblClickOnRow : function(obj){
		//tiene accion personalizada para del doble click?
		if(this.dblClickAction == null){
			if(this.editable){
				//copia los datos de la fila seleccionada en los campos de entrada (no edita la fila)
				try{
					for(var i=0;i<this.cantColumns;i++){
						var dominos = document.getElementById(this.dominoFields[i]).value.split(";");
						setValueOf(this.htmlFields[i],dominos[obj.rowIndex-1],this.separator);
					}
				}catch(e){
					alert("Error inesperado: 'dblClickOnRow()' "+e.message);
					return false;
				}
			}
		}else
			this.dblClickAction(obj);
	},

	addEditedRow : function(){
		try{
			if(this.validations()){
				var tds = document.getElementById(this.idToModif).getElementsByTagName("td");			
				var indexTr = indexOf(document.getElementById(this.rowIndexId).value.split(";"),this.idToModif);
				for(var i=0;i<this.cantColumns;i++){
					var htmlField_i = getValueOf(this.htmlFields[i],true,this.separator);
					
					var auxDominoField = document.getElementById(this.dominoFields[i]);
					var arrayDomField_i = auxDominoField.value.split(";");

					arrayDomField_i[indexTr] = htmlField_i;
					auxDominoField.value = arrayDomField_i.join(";");
					
					//Se remplazan los ";" por ","
					if(htmlField_i!=""){
						htmlField_i = htmlField_i.replace(/;/g,",");
						htmlField_i = htmlField_i.split(this.separator)[0];
					}
					tds[i].innerHTML = htmlField_i;
				}
				document.getElementById(this.buttonsId[1]).style.display = "none";
				document.getElementById(this.buttonsId[0]).style.display = "inline";
				
				this.idToModif = undefined;
			}
		}catch(e){
			alert("Error inesperado: 'addEditedRow()' "+e.message);
			return false;
		}
	},
	
	/*Carga los datos de una fila en los campos de entrada para ser editados*/
	editRow : function(id){
		try{
			for(var i=0;i<this.cantColumns;i++){
				var obj = document.getElementById(id);
				var dominos = document.getElementById(this.dominoFields[i]).value.split(";");
				setValueOf(this.htmlFields[i],dominos[obj.rowIndex-1],this.separator);
			}
			
			document.getElementById(this.buttonsId[0]).style.display = "none";
			document.getElementById(this.buttonsId[1]).style.display = "inline";
			this.idToModif=id;
		}catch (e){
			alert("Error inesperado: 'editRow()' " + e.message);
			return false;
		}
	},

	/*Remueve la fila seleccionada de la tabla y los campos domino*/
	deleteRow : function(id){
		document.getElementById(this.buttonsId[0]).style.display = "inline";
		document.getElementById(this.buttonsId[1]).style.display = "none";
		try{
			var domIndex = removeElement(id,this.rowIndexId,-1);
			(elem=document.getElementById(id)).parentNode.removeChild(elem);
			this.cantRows--;

			if(this.cantRows < this.actualPage+this.maxCantRows){
				this.prevPage();
			}
			
			for(var i = 0;i<this.cantColumns;i++)
				removeElement("",this.dominoFields[i],domIndex);	
			
			if(this.cantRows == 0){
				document.getElementById(this.tableId+"_div").style.display = "none";
			}else{
				var index = parseInt(id.split(">")[1]);
				for(var i=index+1;i<=this.cantRows;i++){;
					var newId=id.split(">")[0]+">"+(i-1)
					document.getElementById(id.split(">")[0]+">"+i).id = newId;
					//si esta en la misma pagina se muestra

					if(this.paginationEnable && (i-1)<(this.actualPage*this.maxCantRows)+this.maxCantRows){
						document.getElementById(newId).style.display = "";
					}
					if(this.editEnabled){
						var editButton = document.getElementById(this.tableId+"edit_"+i);
						editButton.setAttribute( "onClick", this.tableVarName+".editRow('"+newId+"')");
						editButton.id = this.tableId+"edit_"+(i-1);
					}
					if(this.deleteEnabled){
						var deleteButton = document.getElementById(this.tableId+"delete_"+i);
						deleteButton.setAttribute( "onClick", this.tableVarName+".deleteRow('"+newId+"')");
						deleteButton.id = this.tableId+"delete_" + (i-1);
					}
					
				}
			}
			this.viewPageButtons();
		}catch (e){
			alert("Error inesperado: 'deleteRow()' "+e.message);
			return false;
		}
	},

	//Setea la fila de la tabla que fue clickeada para el ordenamiento
	simpleClick : function(event,obj){
		var e = event || window.event;
		if( e.button == 0 ) {
			if(this.tdSelected==null){
				e.preventDefault();
				this.tdSelected = obj.id;
			}else if(this.tdSelected == obj.id){
				this.tdSelected = null;
			}else{
				this.tdSelected = obj.id;
			}
	 	}
	},

	/*Accion para deteccion de tecla presionada */
	keyPressAction : function(event){
		if(this.tdSelected != null){
			var e = event || window.event;
			var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
			if(e.key == this.upRow || e.key== this.downRow){
				var td = document.getElementById(this.tdSelected);
				var dir = 1;
				if(e.key == this.upRow){
					dir = -1;
				}

				if((dir < 0 && td.rowIndex >= 2)||(dir > 0 && td.rowIndex < td.parentNode.childElementCount-1)){
					var domIndex = parseInt(this.tdSelected.split(">")[1]);
					var aux;
					if(dir<0){
						aux = td.previousSibling;
					}else{
						aux = td.nextSibling;
					}
					for(var i = 0;i<this.cantColumns;i++){

						var innerAux = td.childNodes[i].innerHTML;
						td.childNodes[i].innerHTML = aux.childNodes[i].innerHTML;
						aux.childNodes[i].innerHTML = innerAux;

						var dom_i = document.getElementById(this.dominoFields[i]).value.split(";");
						var auxDom = dom_i[domIndex];
						dom_i[domIndex] = dom_i[domIndex+dir];
						dom_i[domIndex+dir] = auxDom;

						document.getElementById(this.dominoFields[i]).value = dom_i.join(";");

					}
					
					this.tdSelected = this.tdSelected.split(">")[0]+">"+(domIndex+dir);
				}
				if (e.preventDefault)
		       		     	e.preventDefault();
				e.returnValue = false;
			}
		}
	},

	//Sistema de paginacion: Siguiente pagina
	nextPage: function(){
		if(this.paginationEnable && this.actualPage <Math.ceil(this.cantRows / this.maxCantRows)){
			var start = this.actualPage * this.maxCantRows;
			var end   = (this.actualPage * this.maxCantRows) + this.maxCantRows;

			for(var i = start;i<this.cantRows && i<end;i++){
				var row = document.getElementById(this.tableId+">"+i).style.display = "none";
			}
			start = end;
			end = end + this.maxCantRows;
			for(var i = start;i<this.cantRows && i<end;i++){
				var row = document.getElementById(this.tableId+">"+i).style.display = "";
			}
			this.actualPage++;
			this.viewPageButtons();
		}
	},

	//Sistema de paginacion: Pagina anterior
	prevPage: function(){
		if(this.paginationEnable && this.actualPage > 0){
			var start   = (this.actualPage * this.maxCantRows) + this.maxCantRows;
			if(this.cantRows < (this.actualPage * this.maxCantRows) + this.maxCantRows){
				start = this.cantRows;
			}
			start--;
			var end = this.actualPage * this.maxCantRows;

			for(var i = start;i>=0 && i>=end;i--){
				var row = document.getElementById(this.tableId+">"+i).style.display = "none";
			}
			start = end-1;
			end = end - this.maxCantRows;
			for(var i = start;i>=0 && i>=end;i--){
				var row = document.getElementById(this.tableId+">"+i).style.display = "";
			}
			this.actualPage--;
			this.viewPageButtons();
		}
	},

	//Obtiene el numero de pagina indicado por el usuario y realiza el cambio
	setPage: function(){
		if(this.paginationEnable){
			try{
				var page = parseInt(document.getElementById(this.tableId+">inputPage").value)-1;
				var maxPages = Math.ceil(this.cantRows/this.maxCantRows);

				if(page>=0 && page<maxPages){
					for(var i=this.actualPage*this.maxCantRows;i<this.maxCantRows+(this.actualPage*this.maxCantRows) && i<this.cantRows;i++){
						alert(this.tableId+">"+i);
						document.getElementById(this.tableId+">"+i).style.display="none";
					}
					for(var i=page*this.maxCantRows;i<this.maxCantRows+(page*this.maxCantRows) && i<this.cantRows;i++){
						alert(this.tableId+">"+i);
						document.getElementById(this.tableId+">"+i).style.display="";
					}
					this.actualPage = page;
					this.viewPageButtons();
				}
			}catch(e){
				alert("Debe ingresar un número para dirigirse a otra página")
			}
		}
		
	},

	//Actualiza el estado de los botones para paginaciones y el indicador de pagina actual
	viewPageButtons: function(){
		if(this.paginationEnable){

			var maxPages = Math.ceil(this.cantRows / this.maxCantRows);

			document.getElementById(this.tableId+"PrevPage").style.display= "";
			document.getElementById(this.tableId+"NextPage").style.display= "";
			if(this.actualPage == 0){
				document.getElementById(this.tableId+"PrevPage").style.display= "none";
			}
			if (this.actualPage+1 >= maxPages){
				document.getElementById(this.tableId+"NextPage").style.display= "none";
			}
			document.getElementById(this.tableId+">pageCounter").textContent = (this.actualPage+1)+"/"+maxPages;
		}
	},

	showFilters: function(){
		if(document.getElementById(this.tableId+">filtersRow").style.display == ""){
			document.getElementById(this.tableId+">filtersRow").style.display = "none";
		}
		else{
			document.getElementById(this.tableId+">filtersRow").style.display = "";
		}
	},

	//Busca el texto ingresado en una columna
	searchAction: function(){

	},

	/****************************Generacion de filas**************************************************************/
	generateHeader: function (){
		try{
			var hRes = "<tr >";
			for (var i = 0; i < this.cantColumns; i++){
				hRes += "<td width=\""+this.columnsWidth[i]+"\">"+this.header[i]+"</td>"
			}

			var colocado = false;
			if(this.editable){
				if(this.editEnabled){
					hRes += "<td width=\"2%\">"
					if(!this.deleteEnabled){
						if(this.searchEnable){
							hRes += "<img width=\""+this.imgWidth+"\" align=\"top\" height=\""+this.imgHeight+"\" onClick=\""+this.tableVarName+".showFilters()\" src=\""+this.imgsPath[2]+"\">";
							colocado = true;
						}
					}
					hRes += "</td>";
				}
				if(this.deleteEnabled){
					hRes += "<td width=\"2%\">";
					if(this.searchEnable){
						colocado = true;
						hRes += "<img width=\""+this.imgWidth+"\" align=\"top\" height=\""+this.imgHeight+"\" onClick=\""+this.tableVarName+".showFilters()\" src=\""+this.imgsPath[2]+"\">";
					}
					hRes += "</td>";
				}
			}
			else if(this.searchEnable && !colocado)
				hRes += "<td width=\"2%\"><img width=\""+this.imgWidth+"\" align=\"top\" height=\""+this.imgHeight+"\" onClick=\""+this.tableVarName+".showFilters()\" src=\""+this.imgsPath[2]+"\"></td>";
			
			hRes += "</tr>";

			return hRes;
		}catch (e){
			alert("Error inesperado: 'generateHeader()' " + e.message);
			return false;
		}
	},

	generateRow: function (fieldsArray){
		try{
			var id = this.tableId+">"+this.rowId
			var cantPages = this.cantRows / this.maxCantRows;
			var visibility = "";
			if(this.paginationEnable && !(id >= (cantPages*this.actualPage)) && (id<(cantPages*this.actualPage)+cantPages)){
				visibility = "none";
			}
			var res = "<tr id=\""+id+"\" style=\"display:"+visibility+"\"";
			res += "onmouseout=\"this.style.backgroundColor='#FFFFFF'\" ";
			res += "onmouseover=\"this.style.backgroundColor='#A0CFEC'\" ";
			res += "ondblclick=\""+this.tableVarName+".dblClickOnRow(this)\" ";
			res += "onClick=\""+this.tableVarName+".simpleClick(event,this)\"";
			res += ">";
			for(var i=0;i<this.cantColumns;i++){
				var aux = fieldsArray[i];
				if(aux.search(this.separator)>=0){
					aux = aux.split(this.separator)[0];
				}
				res +="<td>" + aux + "</td>";
			}
			if(this.editable){
				if(this.editEnabled)
					res += "<td><img id=\""+this.tableId+"edit_"+this.rowId+"\" width=\""+this.imgWidth+"\" align=\"top\" height=\""+this.imgHeight+"\" onClick=\""+this.tableVarName+".editRow('"+id+"')\" src=\""+this.imgsPath[0]+"\"></td>";
				if(this.deleteEnabled)
					res += "<td><img id=\""+this.tableId+"delete_"+this.rowId+"\" width=\""+this.imgWidth+"\" align=\"top\" height=\""+this.imgHeight+"\" onClick=\""+this.tableVarName+".deleteRow('"+id+"')\" src=\""+this.imgsPath[1]+"\"></td>";
			}else if(this.searchEnable){
				res += "<td></td";
			}
			return res + "</tr>";
		}catch (e){
			alert("Error inesperado: 'generateRow()' " + e.message);
			return false;
		}
	},
}

function removeElement(elem,arrayId,index){
	try{
		var indexArray = document.getElementById(arrayId).value.split(";");
		if(index<0)
			index = indexOf(indexArray,elem);
		if (index > -1)
			indexArray.splice(index, 1);
		
		document.getElementById(arrayId).value = indexArray.join(";");
		return index;
	}catch (e){
		alert("Error inesperado: 'removeElement()' " + e.message);
		return false;
	}
}

function setValueOf (htmlField,fieldValue,separator){
	//Setea fieldValue en el campo htmlField dependiendo de que tipo es
	try{
		var field = document.getElementById(htmlField);
		if(field.type == "text")
			field.value = fieldValue;
		else if(field.type == "checkbox"){
			if(fieldValue == "Si")
				field.checked = true;
		}
		else if(field.type == "radio"){
			var radioButtons = document.getElementsByName(field.name);
			var salir = false;
			for(var i=0;i<radioButtons.length && !salir;i++){
				if(radioButtons[i].value == fieldValue){
					radioButtons[i].checked = true;
					salir = true;
				}
			}
		}
		else if(field.type == "select-one"){
			var options = field.options;
			var salir = false;
			var strSearch = fieldValue;
			if(strSearch.search(separator)>=0){
				strSearch = strSearch.split(separator)[1];
			}
			for(var i=0;i<options.length && !salir;i++){	
				if(options[i].value == strSearch || options[i].text == strSearch){
					options[i].selected = true;
					field.selectedIndex = i;
					salir = true;
				}
			}
		}
		else if(field.type == "text")
			field.value = fieldValue;
	}catch (e){
		alert("Error inesperado: 'setValueOf()' " + e.message);
		return false;
	}
}

function getValueOf (htmlField,clean,separator){
	//Obtiene el valor del campo htmlField dependiendo del tipo, y en caso de que clean sea true lo deja vacio
	try{
		var res = "";
		var field = document.getElementById(htmlField);
		if(field.type == "text"){
			res = field.value;
			if(clean)
				field.value = "";
		}
		else if(field.type == "checkbox"){
			if(field.checked)
				res = "Si";
			else
				res = "No";
			if(clean)
				field.checked = false;
		}
		else if(field.type == "radio"){
			var radioButtons = document.getElementsByName(field.name);
			var salir = false;
			for(var i=0;i<radioButtons.length && !salir;i++){
				if(radioButtons[i].checked){
					res = radioButtons[i].value;
					salir = true;
					if(clean)
						radioButtons[i].checked = false;
				}
			}
		}
		else if(field.type == "select-one"){
			res = field.options[field.selectedIndex].text;
			
			var value = field.options[field.selectedIndex].value;
			if(value!="")
				res+=separator+value;
			if(clean)
				field.selectedIndex = 0;
		}
		else if(field.type == "text"){
			res = field.value;
			if(clean)
				field.value = "";
		}
		
		return res;
	}catch (e){
		alert("Error inesperado: 'getValueOf()' " + e.message);
		return false;
	}
}

function indexOf(values,value){
	var res = -1;
	for(var i = 0; i<values.length && res<0;i++){
		if(values[i]==value)
			res = i;
	}
	return res;
}



/****************************************************************************************************/