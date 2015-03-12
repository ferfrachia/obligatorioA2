//****************************************CLASE TABLA***************************************************************/*SUPOSICIONES:- Solo se modifican y quitan valores seleccionando la lÃ­nea desde la primer columna de la tabla- Los campos utilizados para agregar informaciÃ³n a la tabla son de tipo texto o combobox*/Tabla = function (strdato,strvisualiz,strnuevo,div) {	/*new	Crea un objeto tabla	ParÃ¡metros: 	strdato = string de nombres de campos donde se cargan los datos reales de la tabla			strvisualiz = string de nombres de campos donde se cargan los datos de visualizacion de la tabla				strnuevo = string de nombres de campos donde se cargan los datos para agregar a la tabla			div = separador incluido en los strings anteriores para separar los nombres de campos (los tres strings deben estar separados por 			          el mismo separador	*/	try{		//Variables			var vdatos = new Vector(0);		var vvisualizacion = new Vector(0);		var vvalores = new Vector(0);						vdatos=armarVector(strdato,div);		vvisualizacion=armarVector(strvisualiz,div);		vvalores=armarVector(strnuevo,div);				//El throw no funciona en la versi{on 5 del navegador		//if ((vdatos.vLength!=vvisualizacion.vLength) | (vdatos.vLength!=vvalores.vLength)) throw Error('No coincide la cantidad de campos de datos, visualizaciÃ³n e informaciÃ³n nueva para una tabla dinÃ¡mica del formulario');			if ((vdatos.vLength!=vvisualizacion.vLength) | (vdatos.vLength!=vvalores.vLength)) {			alert('No coincide la cantidad de campos de datos, visualizaciÃ³n e informaciÃ³n nueva para una tabla dinÃ¡mica del formulario');			return false;		}					this.vdatos = vdatos;		this.vvisualizacion = vvisualizacion;		this.vvalores = vvalores;				//MÃ©todos		//Agrega una lÃ­nea a la tabla con los valores de los campos strcampo		//Esta funciÃ³n debe llamarse en el botÃ³n Agregar del formulario		this.tAgregar = function (){			try {				//Controlo que todos los campos con nuevos valores estÃ©n cargados				for (var i=0; i < this.vvalores.vLength; i ++)				{					var name_camponuevo = this.vvalores.vArray[i];					var camponuevo = eval ("document.forms[0]."+name_camponuevo);								//if (valorCampo(camponuevo)=="") throw Error('Debe ingresar todos los nuevos valores');																		if (valorCampo(camponuevo)==""){						alert('Debe ingresar todos los nuevos valores');									return false;					}				}				//Controlo que no agreguen un dato duplicado en la primer columna (clave)				var name_campodato = this.vdatos.vArray[0];				var name_camponuevo = this.vvalores.vArray[0];				var campodato = eval ("document.forms[0]."+name_campodato);				var camponuevo = eval ("document.forms[0]."+name_camponuevo);				var vvaloresdato = new Vector(0);				vvaloresdato = stringToVector(campodato.value);				if (vvaloresdato.vIsMember(valorCampo(camponuevo))){					alert ('La primer columna tiene valores claves. No pueden estar duplicados');					return false;				}					//Agrego la lÃ­nea por cada columna				for (var i=0; i < this.vdatos.vLength; i ++)				{					var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];					var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);										Agregar(valorCampo(camponuevo),campodato,campovisualiz);					blanquear(camponuevo);				}			} catch(err) { alert(err.message) }		} //Fin tAgregar		this.tAgregarBusqueda = function (){						try {				//Controlo que todos los campos con nuevos valores estÃ©n cargados				for (var i=0; i < this.vvalores.vLength; i ++)				{					var name_camponuevo = this.vvalores.vArray[i];					var camponuevo = eval ("document.forms[0]."+name_camponuevo);								//if (valorCampo(camponuevo)=="") throw Error('Debe ingresar todos los nuevos valores');																		if (valorCampo(camponuevo)==""){						alert('Debe ingresar todos los nuevos valores');									return false;					}				}								//Controlo que no agreguen un dato duplicado en la primer columna (clave)				var name_campodato = this.vdatos.vArray[0];				var name_camponuevo = this.vvalores.vArray[0];				var campodato = eval ("document.forms[0]."+name_campodato);				var camponuevo = eval ("document.forms[0]."+name_camponuevo);				var vvaloresdato = new Vector(0);												vvaloresdato = StringToVector3(campodato.value,"\n");								if (vvaloresdato.vIsMember(valorCampo(camponuevo))){					alert ('La primer columna tiene valores claves. No pueden estar duplicados');					return false;				}									//Agrego la lÃ­nea por cada columna				for (var i=0; i < this.vdatos.vLength; i ++)				{										var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];					var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);																				Agregar2(valorCampo(camponuevo),campodato,campovisualiz,"\n");										blanquear(camponuevo);				}			} catch(err) { alert(err.message) }					} //Fin tAgregarBusqueda				//Elimina la lÃ­nea de la posiciÃ³n indicada en el campo cuyo nombre recibe		//Esta funciÃ³n debe llamarse en el botÃ³n Quitar del formulario		this.tBorrar = function (name_campoindice) {			try {				var campoindice = eval ("document.forms[0]."+name_campoindice);				var pos = SetNumber(valor(campoindice));								//El throw no funciona en la versiÃ³n 5 del navegador; sÃ­ en la 6				//if (valor(campoindice) == "-1") throw Error ('Los datos indicados no existen en la tabla. No se quitarÃ¡ ninguna lÃ­nea.');				if (valor(campoindice) == "-1") {					alert ('Los datos indicados no existen en la tabla. No se quitarÃ¡ ninguna lÃ­nea.');					return false;				}									//Controlo que no hayan modificado los datos que seleccionaron				for (var i=0; i < this.vdatos.vLength; i ++)				{					var name_camponuevo = this.vvalores.vArray[i];					var name_campodato = this.vdatos.vArray[i];					var camponuevo = eval ("document.forms[0]."+name_camponuevo);									var campodato = eval ("document.forms[0]."+name_campodato);											var vvaloresdato = new Vector(0);					vvaloresdato = stringToVector(campodato.value);					if (valorCampo(camponuevo) != vvaloresdato.vArray[pos]) {						alert ('Los datos indicados no existen en la tabla. No se quitarÃ¡ ninguna lÃ­nea.');						return false;					}								}							//Borro la lÃ­nea columna por columna				for (var i=0; i < this.vdatos.vLength; i ++)				{					var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];						var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);								if (campovisualiz.options.length==1)  //solo hay un elemento en la lista					{						//Se vacÃ­an los campos de visualizaciÃ³n							campovisualiz.options.length=0;					 	//Se borran los campos que tienen los datos reales						blanquear(campodato);					}					else					{								//Se borra la posiciÃ³n elegida de la tabla						BorrarTabla(campodato,campovisualiz,pos);					}							//Se borrar los nuevos campos					blanquear(camponuevo);					//Se vuelve el Ã­ndice a -1					asignar(campoindice,-1);				}			} catch(err) { alert(err.message) }		} //Fin tBorrar						//Elimina la lÃ­nea de la posiciÃ³n indicada en el campo cuyo nombre recibe		//Esta funciÃ³n debe llamarse en el botÃ³n Quitar del formulario		this.tBorrarBusqueda = function (name_campoindice) {			try {				var campoindice = eval ("document.forms[0]."+name_campoindice);				var pos = SetNumber(valor(campoindice));								//El throw no funciona en la versiÃ³n 5 del navegador; sÃ­ en la 6				//if (valor(campoindice) == "-1") throw Error ('Los datos indicados no existen en la tabla. No se quitarÃ¡ ninguna lÃ­nea.');				if (valor(campoindice) == "-1") {					alert ('Los datos indicados no existen en la tabla. No se quitarÃ¡ ninguna lÃ­nea.');					return false;				}									//Controlo que no hayan modificado los datos que seleccionaron				for (var i=0; i < this.vdatos.vLength; i ++)				{					var name_camponuevo = this.vvalores.vArray[i];					var name_campodato = this.vdatos.vArray[i];					var camponuevo = eval ("document.forms[0]."+name_camponuevo);					var campodato = eval ("document.forms[0]."+name_campodato);											var vvaloresdato = new Vector(0);					vvaloresdato = StringToVector3(campodato.value,"\n");					if (valorCampo(camponuevo) != vvaloresdato.vArray[pos]) {						alert ('Los datos indicados no existen en la tabla. No se quitarÃ¡ ninguna lÃ­nea.');						return false;					}								}							//Borro la lÃ­nea columna por columna				for (var i=0; i < this.vdatos.vLength; i ++)				{					var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];						var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);								if (campovisualiz.options.length==1)  //solo hay un elemento en la lista					{						//Se vacÃ­an los campos de visualizaciÃ³n							campovisualiz.options.length=0;					 	//Se borran los campos que tienen los datos reales						blanquear(campodato);					}					else					{								//Se borra la posiciÃ³n elegida de la tabla						BorrarTabla2(campodato,campovisualiz,pos,"\n");					}							//Se borrar los nuevos campos					blanquear(camponuevo);					//Se vuelve el Ã­ndice a -1					asignar(campoindice,-1);				}			} catch(err) { alert(err.message) }		} //Fin tBorrarBusqueda				//Modifica la lÃ­nea de la posiciÃ³n indicada en el campo cuyo nombre recibe		//Esta funciÃ³n debe llamarse en el botÃ³n Modificar del formulario		this.tModificar = function (name_campoindice) {			try {				var campoindice = eval ("document.forms[0]."+name_campoindice);				var pos = SetNumber(valor(campoindice));				//if (valor(campoindice) == "-1") throw Error ('Los datos indicados no existen en la tabla. No se modificarÃ¡ ninguna lÃ­nea.');				if (valor(campoindice) == "-1") {					alert ('Los datos indicados no existen en la tabla. No se modificarÃ¡ ninguna lÃ­nea.');					return false;				}								//Controlo que no hayan borrado ninguno de los valores seleccionados				for (var i=0; i < this.vdatos.vLength; i ++)				{					//Controlo que no borren el valor de un campo					var name_camponuevo = this.vvalores.vArray[i];					var camponuevo = eval ("document.forms[0]."+name_camponuevo);											if (valorCampo(camponuevo) == "") {						alert ('No puede borrar valores de las columnas. Utilice quitar para eliminar una lÃ­nea');						return false;					}								}								//Controlo que no agreguen un dato duplicado en la primer columna (clave)				//Como es modificaciÃ³n va a existir el propio valor!!			/*	var name_campodato = this.vdatos.vArray[0];				var name_camponuevo = this.vvalores.vArray[0];				var campodato = eval ("document.forms[0]."+name_campodato);				var camponuevo = eval ("document.forms[0]."+name_camponuevo);				var vvaloresdato = new Vector(0);				vvaloresdato = stringToVector(campodato.value);				if (vvaloresdato.vIsMember(valorCampo(camponuevo))){					alert ('La primer columna tiene valores claves. No pueden estar duplicados');					return false;				}	*/								//Borro los valores columna por columna				for (var i=0; i < this.vdatos.vLength; i ++)				{					var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];						var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);										if(campovisualiz.options.length==1)  //solo hay un elemento en la lista					{						//Se vacÃ­an los campos de visualizaciÃ³n							campovisualiz.options.length=0;						 //Se borran los campos que tienen los datos reales						blanquear(campodato);					}					else					{								//Se borra la posiciÃ³n elegida de la tabla						BorrarTabla(campodato,campovisualiz,pos);					}					//Se crea un vector con los valores del campodato y se inserta el nuevo valor					var v = new Vector(0);					//Obs. el separador es ; mÃ¡s un espacio porque asÃ­ queda al leer el valor del campo dato					v = armarVector(valor(campodato),"; ");					v.vInsert(valorCampo(camponuevo),pos);					//Se asignan los nuevos valores al campodato					asignar(campodato,VectorToString(v));					//Se pasan dichos valores al campo de visualizacion					campovisualiz.options.length = 0;					FieldToList(campodato,campovisualiz);												//Se borrar los nuevos campos					blanquear(camponuevo);					//Se vuelve el Ã­ndice a -1					asignar(campoindice,-1);									}			} catch(err) { alert(err.message) }			} //Fin tModificar				//Modifica la lÃ­nea de la posiciÃ³n indicada en el campo cuyo nombre recibe		//Esta funciÃ³n debe llamarse en el botÃ³n Modificar del formulario		this.tModificarBusqueda = function (name_campoindice) {			try {				var campoindice = eval ("document.forms[0]."+name_campoindice);				var pos = SetNumber(valor(campoindice));								//if (valor(campoindice) == "-1") throw Error ('Los datos indicados no existen en la tabla. No se modificarÃ¡ ninguna lÃ­nea.');				if (valor(campoindice) == "-1") {					alert ('Los datos indicados no existen en la tabla. No se modificarÃ¡ ninguna lÃ­nea.');					return false;				}								//Controlo que no hayan borrado ninguno de los valores seleccionados				for (var i=0; i < this.vdatos.vLength; i ++)				{					//Controlo que no borren el valor de un campo					var name_camponuevo = this.vvalores.vArray[i];					var camponuevo = eval ("document.forms[0]."+name_camponuevo);											if (valorCampo(camponuevo) == "") {						alert ('No puede borrar valores de las columnas. Utilice quitar para eliminar una lÃ­nea');						return false;					}								}								//Controlo que no agreguen un dato duplicado en la primer columna (clave)				//Como es modificaciÃ³n va a existir el propio valor!!			/*	var name_campodato = this.vdatos.vArray[0];				var name_camponuevo = this.vvalores.vArray[0];				var campodato = eval ("document.forms[0]."+name_campodato);				var camponuevo = eval ("document.forms[0]."+name_camponuevo);				var vvaloresdato = new Vector(0);				vvaloresdato = stringToVector(campodato.value);				if (vvaloresdato.vIsMember(valorCampo(camponuevo))){					alert ('La primer columna tiene valores claves. No pueden estar duplicados');					return false;				}	*/								//Borro los valores columna por columna				for (var i=0; i < this.vdatos.vLength; i ++)				{										var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];						var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);										if(campovisualiz.options.length==1)  //solo hay un elemento en la lista					{						//Se vacÃ­an los campos de visualizaciÃ³n							campovisualiz.options.length=0;						 //Se borran los campos que tienen los datos reales						blanquear(campodato);					}					else					{								//Se borra la posiciÃ³n elegida de la tabla						BorrarTabla2(campodato,campovisualiz,pos,"\n");					}					//Se crea un vector con los valores del campodato y se inserta el nuevo valor					var v = new Vector(0);									//Obs. el separador es ; mÃ¡s un espacio porque asÃ­ queda al leer el valor del campo dato					v = armarVector(valor(campodato),"\n");									v.vInsert(valorCampo(camponuevo),pos);					//Se asignan los nuevos valores al campodato					asignar(campodato,VectorToString2(v,"\n"));					//Se pasan dichos valores al campo de visualizacion					campovisualiz.options.length = 0;										var a=valor(campodato).split("\n");						for(var g=0;g<a.length;g++)						{							campovisualiz.options[campovisualiz.options.length] = new Option(a[g]);						}					//Se borrar los nuevos campos					blanquear(camponuevo);					//Se vuelve el Ã­ndice a -1					asignar(campoindice,-1);										}			} catch(err) { alert(err.message) }			} //Fin tModificar		//Inicializa la tabla cargando los campos de visualizaciÃ³n con los de datos reales		//Esta funciÃ³n debe llamarse en el OnLoad del formulario		//Se supone que antes de llamarla se controla si el documento estÃ¡ en ediciÃ³n para hacerlo		this.tInicializar = function () {								for (var i=0; i < this.vdatos.vLength; i ++)				{									var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];								var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);					if (valor(campodato) != "")					{						//Se cargan los datos desde el campodato al campovisualiz						campovisualiz.options.length = 0;						FieldToList(campodato,campovisualiz);																	}				}		} //Fin tInicializar					//Inicializa la tabla cargando los campos de visualizaciÃ³n con los de datos reales		//Esta funciÃ³n debe llamarse en el OnLoad del formulario		//Se supone que antes de llamarla se controla si el documento estÃ¡ en ediciÃ³n para hacerlo		this.tInicializarBusqueda = function () {								for (var i=0; i < this.vdatos.vLength; i ++)				{									var name_campodato = this.vdatos.vArray[i];					var name_campovisualiz = this.vvisualizacion.vArray[i];					var name_camponuevo = this.vvalores.vArray[i];								var campodato = eval ("document.forms[0]."+name_campodato);					var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);					var camponuevo = eval ("document.forms[0]."+name_camponuevo);					if (valor(campodato) != "")					{						//Se cargan los datos desde el campodato al campovisualiz																		campovisualiz.options.length = 0;						//campovisualiz.options=campodato;						var a=valor(campodato).split("\n");						for(var g=0;g<a.length;g++)						{							campovisualiz.options[campovisualiz.options.length] = new Option(a[g]);						}					//	FieldToList(campodato,campovisualiz);																	}				}		} //Fin tInicializar			//Borra las posiciones seleccionadas en todas las columnas, excepto en la primera (para asegurar que no queden con una selecciÃ³n 		//fuera de lugar)		//Esta funciÃ³n debe llamarse en el OnClick del campo de la primera columna de la tabla		this.OnClickColSelect = function () {			for (var i=1; i < this.vdatos.vLength; i ++)  //me salteo la columna de selecciÃ³n			{				var name_campovisualiz = this.vvisualizacion.vArray[i];				var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);							//Se deja sin selecciÃ³n los demÃ¡s campos de la tabla, por si estaban marcados previamente				campovisualiz.selectedIndex = -1;			}		}		//Asigna la posiciÃ³n seleccionada al campo cuyo nombre recibe y carga los valores de esa lÃ­nea en los campos de ingreso de informaciÃ³n		//Esta funciÃ³n debe llamarse en el OnDobleClick del campo de la primera columna de la tabla		this.OnDobleClickColSelect = function (name_campoindice) {			var pos;			for (var i=0; i < this.vdatos.vLength; i ++)  //me salteo la columna de selecciÃ³n			{								var name_campodato = this.vdatos.vArray[i];				var name_campovisualiz = this.vvisualizacion.vArray[i];				var name_camponuevo = this.vvalores.vArray[i];							var campodato = eval ("document.forms[0]."+name_campodato);				var campovisualiz = eval ("document.forms[0]."+name_campovisualiz);				var camponuevo = eval ("document.forms[0]."+name_camponuevo);				//Se asigna el valor del indice al campo Indice							if (i==0)   //solo para el primer campo				{						var campoindice = eval ("document.forms[0]."+name_campoindice);					asignar(campoindice, campovisualiz.selectedIndex + '');					pos = campoindice.value;					//Se asigna el valor seleccionado al campo nuevo					asignarCampo(camponuevo,valorCampo(campovisualiz));				}				else				{					//Se asigna el mismo Ã­ndice a los demÃ¡s campos de la tabla					campovisualiz.selectedIndex = parseInt(pos);					//Se asigna el valor seleccionado al campo nuevo					asignarCampo(camponuevo,campovisualiz.options[parseInt(pos)].text);				}			}		}	} catch(err) { alert(err.message) }   //catch de la clase entera	}  //Fin de la clase Tabla//************************************************************************************************************************************************************************//Funciones auxiliares para la clase tablafunction valorCampo(campo) {	//Recibe un objeto campo ya seteado	//Devuelve el valor para los campos de texto comÃºn o combobox	//No estÃ¡n incluidos en esta funciÃ³n campos de tipo radio button o checkbox, para eso estan las funciones valorR y valorCh	//Se usa para obtener valores de campos de ingreso de informaciÃ³n		switch (campo.type){	case "text" :		return(campo.value);		break;	case "select-one":		if (campo.selectedIndex == -1){			return(campo.value);			break;		}		else {			return(campo.options[campo.selectedIndex].text);			break;		}	case "select-multiple":		if (campo.selectedIndex == -1){			return(campo.value);			break;		}		else {			return(campo.options[campo.selectedIndex].text);			break;		}	default : return(null);	}}function asignarCampo(campo,valor) {	//Recibe un objeto campo ya seteado y el valor que se le quiere asignar	//Setea el valor para los campos de texto comÃºn o combobox	//No estÃ¡n incluidos en esta funciÃ³n campos de tipo radio button o checkbox, para eso estan las funciones asignarR y asignarCh	//Se usa para oasignar valores a los campos de ingreso de informaciÃ³n	switch (campo.type){	case "text" :		campo.value = valor;		break;	case "select-one":		var j = 0;		var encontre = false;		while (j<campo.length && !encontre)		{			if (campo.options[j].text == valor)			{			encontre = true			}			else			{			j ++			}		}		if (encontre)		{		campo.selectedIndex = j;		}		break;	default : return(null);	}}//FunciÃ³n que recibe un string y su separador y genera un vector con los valores que estÃ¡n entre los separadores//Se usa en el constructor de la clase para crear los vectores que utilizafunction armarVector(str,div){    var vAux;    vAux = new Vector(0);		var beg=0;	var end=str.indexOf(div);	if (end == -1) end = str.length;	var entry = str.substring(beg,end);	while (entry != "")	{			vAux.vAgregar(entry);							beg = entry.length + div.length;		str = str.substring(beg,str.length);		end = str.indexOf(div);		if (end == -1) end = str.length;		entry = str.substring(0,end);	}		return vAux;}