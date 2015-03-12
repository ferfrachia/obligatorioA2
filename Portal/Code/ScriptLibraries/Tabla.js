//****************************************CLASE TABLA***************************************************************/*SUPOSICIONES:- Solo se modifican y quitan valores seleccionando la línea desde la primer columna de la tabla- Los campos utilizados para agregar información a la tabla son de tipo texto o combobox*/Tabla = function (strdato,strvisualiz,strnuevo,div) {	/*new	Crea un objeto tabla	Parámetros: 	strdato = string de nombres de campos donde se cargan los datos reales de la tabla			strvisualiz = string de nombres de campos donde se cargan los datos de visualizacion de la tabla				strnuevo = string de nombres de campos donde se cargan los datos para agregar a la tabla			div = separador incluido en los strings anteriores para separar los nombres de campos (los tres strings deben estar separados por 			          el mismo separador	*/	try{		//Variables			var vdatos = new Vector(0);		var vvisualizacion = new Vector(0);		var vvalores = new Vector(0);		vdatos=armarVector(strdato,div);		vvisualizacion=armarVector(strvisualiz,div);		vvalores=armarVector(strnuevo,div);			//El throw no funciona en la versi{on 5 del navegador		//if ((vdatos.vLength!=vvisualizacion.vLength) | (vdatos.vLength!=vvalores.vLength)) throw Error('No coincide la cantidad de campos de datos, visualización e información nueva para una tabla dinámica del formulario');			if ((vdatos.vLength!=vvisualizacion.vLength) | (vdatos.vLength!=vvalores.vLength)) {			alert('No coincide la cantidad de campos de datos, visualización e información nueva para una tabla dinámica del formulario');			return false;		}					this.vdatos = vdatos;		this.vvisualizacion = vvisualizacion;		this.vvalores = vvalores;			//Métodos		//Agrega una línea a la tabla con los valores de los campos strcampo		//Esta función debe llamarse en el botón Agregar del formulario		this.tAgregar = function (){			//Controlo que todos los campos con nuevos valores estén cargados			try {				for (var i=0; i < this.vvalores.vLength; i ++)				{					var name_camponuevo = this.vvalores.vArray[i];					var camponuevo = eval ("document.forms[0]."+name_camponuevo);								//if (valorCampo(camponuevo)=="") throw Error('Debe ingresar todos los nuevos valores');								if (valorCampo(camponuevo)==""){						alert('Debe ingresar todos los nuevos valores');									return false;					}				}						for (var i=0; i < this.vdatos.vLength; i ++)				{					var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];					var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);					Agregar(valorCampo(camponuevo),campodato,campovisualiz);					blanquear(camponuevo);				}			} catch(err) { alert(err.message) }		} //Fin tAgregar		//Elimina la línea de la posición indicada en el campo cuyo nombre recibe		//Esta función debe llamarse en el botón Quitar del formulario		this.tBorrar = function (name_campoindice) {			try {				var campoindice = eval ("document.forms[0]."+name_campoindice);				var pos = SetNumber(valor(campoindice));				//El throw no funciona en la versión 5 del navegador; sí en la 6				//if (valor(campoindice) == "-1") throw Error ('Los datos indicados no existen en la tabla. No se quitará ninguna línea.');				if (valor(campoindice) == "-1") {					alert ('Los datos indicados no existen en la tabla. No se quitará ninguna línea.');					return false;				}								for (var i=0; i < this.vdatos.vLength; i ++)				{					var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];						var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);								if (campovisualiz.options.length==1)  //solo hay un elemento en la lista					{						//Se vacían los campos de visualización							campovisualiz.options.length=0;					 	//Se borran los campos que tienen los datos reales						blanquear(campodato);					}					else					{								//Se borra la posición elegida de la tabla						BorrarTabla(campodato,campovisualiz,pos);					}							//Se borrar los nuevos campos					blanquear(camponuevo);					//Se vuelve el índice a -1					asignar(campoindice,-1);				}			} catch(err) { alert(err.message) }		} //Fin tBorrar		//Modifica la línea de la posición indicada en el campo cuyo nombre recibe		//Esta función debe llamarse en el botón Modificar del formulario		this.tModificar = function (name_campoindice) {			try {				var campoindice = eval ("document.forms[0]."+name_campoindice);				var pos = SetNumber(valor(campoindice));				//if (valor(campoindice) == "-1") throw Error ('Los datos indicados no existen en la tabla. No se modificará ninguna línea.');				if (valor(campoindice) == "-1") {					alert ('Los datos indicados no existen en la tabla. No se modificará ninguna línea.');					return false;				}				for (var i=0; i < this.vdatos.vLength; i ++)				{					var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];						var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);								if(campovisualiz.options.length==1)  //solo hay un elemento en la lista					{						//Se vacían los campos de visualización							campovisualiz.options.length=0;						 //Se borran los campos que tienen los datos reales						blanquear(campodato);					}					else					{								//Se borra la posición elegida de la tabla						BorrarTabla(campodato,campovisualiz,pos);					}					//Se crea un vector con los valores del campodato y se inserta el nuevo valor					var v = new Vector(0);					//Obs. el separador es ; más un espacio porque así queda al leer el valor del campo dato					v = armarVector(valor(campodato),"; ");					v.vInsert(valorCampo(camponuevo),pos);					//Se asignan los nuevos valores al campodato					asignar(campodato,VectorToString(v));					//Se pasan dichos valores al campo de visualizacion					campovisualiz.options.length = 0;					FieldToList(campodato,campovisualiz);												//Se borrar los nuevos campos					blanquear(camponuevo);					//Se vuelve el índice a -1					asignar(campoindice,-1);				}			} catch(err) { alert(err.message) }			} //Fin tModificar		//Inicializa la tabla cargando los campos de visualización con los de datos reales		//Esta función debe llamarse en el OnLoad del formulario		//Se supone que antes de llamarla se controla si el documento está en edición para hacerlo		this.tInicializar = function () {				for (var i=0; i < this.vdatos.vLength; i ++)				{					var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];						var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);					if (valor(campodato) != "")					{						//Se cargan los datos desde el campodato al campovisualiz						campovisualiz.options.length = 0;						FieldToList(campodato,campovisualiz);					}				}		} //Fin tInicializar			//Borra las posiciones seleccionadas en todas las columnas, excepto en la primera (para asegurar que no queden con una selección 		//fuera de lugar)		//Esta función debe llamarse en el OnClick del campo de la primera columna de la tabla		this.OnClickColSelect = function () {			for (var i=1; i < this.vdatos.vLength; i ++)  //me salteo la columna de selección			{				var name_campovisualiz = this.vvisualizacion.vArray[i];				var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);							//Se deja sin selección los demás campos de la tabla, por si estaban marcados previamente				campovisualiz.selectedIndex = -1;			}		}		//Asigna la posición seleccionada al campo cuyo nombre recibe y carga los valores de esa línea en los campos de ingreso de información		//Esta función debe llamarse en el OnDobleClick del campo de la primera columna de la tabla		this.OnDobleClickColSelect = function (name_campoindice) {			for (var i=0; i < this.vdatos.vLength; i ++)  //me salteo la columna de selección			{				var name_campodato = this.vdatos.vArray[i];				var name_campovisualiz = this.vvisualizacion.vArray[i];				var name_camponuevo = this.vvalores.vArray[i];					var campodato = eval ("document.forms[0]."+name_campodato);				var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);				var camponuevo = eval ("document.forms[0]."+name_camponuevo);				//Se asigna el valor del indice al campo Indice				if (i==0)   //solo para el primer campo				{					var campoindice = eval ("document.forms[0]."+name_campoindice);					asignar(campoindice,campovisualiz.selectedIndex);					var pos = valor(campoindice);					//Se asigna el valor seleccionado al campo nuevo					asignarCampo(camponuevo,valorCampo(campovisualiz));				}				else				{					//Se asigna el mismo índice a los demás campos de la tabla					campovisualiz.selectedIndex = pos;					//Se asigna el valor seleccionado al campo nuevo					asignarCampo(camponuevo,campovisualiz.options[pos].text);				}			}		}	} catch(err) { alert(err.message) }   //catch de la clase entera	}  //Fin de la clase Tabla//************************************************************************************************************************************************************************//Funciones auxiliares para la clase tablafunction valorCampo(campo) {	//Recibe un objeto campo ya seteado	//Devuelve el valor para los campos de texto común o combobox	//No están incluidos en esta función campos de tipo radio button o checkbox, para eso estan las funciones valorR y valorCh	//Se usa para obtener valores de campos de ingreso de información	switch (campo.type){	case "text" :		return(campo.value);		break;	case "select-one":		return(campo.options[campo.selectedIndex].text);		break;	case "select-multiple":		return(campo.options[campo.selectedIndex].text);		break;	default : return(null);	}}function asignarCampo(campo,valor) {	//Recibe un objeto campo ya seteado y el valor que se le quiere asignar	//Setea el valor para los campos de texto común o combobox	//No están incluidos en esta función campos de tipo radio button o checkbox, para eso estan las funciones asignarR y asignarCh	//Se usa para oasignar valores a los campos de ingreso de información	switch (campo.type){	case "text" :		campo.value = valor;		break;	case "select-one":		var j = 0;		var encontre = false;		while (j<campo.length && !encontre)		{			if (campo.options[j].text == valor)			{			encontre = true			}			else			{			j ++			}		}		if (encontre)		{		campo.selectedIndex = j;		}		break;	default : return(null);	}}//Función que recibe un string y su separador y genera un vector con los valores que están entre los separadores//Se usa en el constructor de la clase para crear los vectores que utilizafunction armarVector(str,div){    var vAux;    vAux = new Vector(0);		var beg=0;	var end=str.indexOf(div);	if (end == -1) end = str.length;	var entry = str.substring(beg,end);	while (entry != "")	{			vAux.vAgregar(entry);							beg = entry.length + div.length;		str = str.substring(beg,str.length);		end = str.indexOf(div);		if (end == -1) end = str.length;		entry = str.substring(0,end);	}		return vAux;}