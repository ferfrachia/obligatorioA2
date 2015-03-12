//BIBLIOTECA DE FUNCIONES JAVASCRIPT//Contiene las siguientes funciones://---FUNCIONES PARA MANEJO DE NÚMEROS---//Esta función convierte un valor de texto en número//Nota: todos los valores que se toman de campos son de tipo texto//function SetNumber(valor)//Función que toma un valor numérico y lo redondea hasta dos decimales despues de la coma//function Redondea(valor)//Función que indica si el valor recibido es numérico o no//function isNumber( theObj ) //----FUNCIONES PARA MANEJO DE TABLAS DINAMICAS----//Borra un elemento de una tabla dinámica//function BorrarTabla(campo,Lista,i)//Agrega una línea a la tabla dinámica//function Agregar(strCampo,campodest,listadest)//Parámetros: strCampo es el valro que quiere agregarse; campodest es el campo multivaluado real, listadest es el campo de visualización de la lista//---FUNCIONES PARA MANEJO DE STRING//Devuelve el string desde la posicion beg hasta el separador div (left)//function ParserLeft(str,beg,div)//Devuelve el string desde el primer div que encuentre a partir de la posicion beg (right)//function ParserRight(str,beg,div)//Función que recibe un string con , y devuelve el mismo string cambiando las , por .//function CambiaFormato(str)//---FUNCIONES PARA CONVERSION ENTRE STRING Y VECTORES//Función que recibe un string con varios valores separados por ";" y devuelve un vector con los valores//function stringToVector(str)//Función que recibe un string con varios valores separados por div y devuelve un vector con los valores//function stringToVector2(str,div)//Función que recibe un vector y devuelve un string con los valores del vector separados con ";"//function VectorToString(v)//Función que convierte el vector v a un string con el separador div//function VectorToString2(v,div)// Separa todos los valores que viene en str y llama a marcar con //cada posible valor//----CLASE VECTOR---//Constructor//function Vector(variable)//Parámetro: largo del vector //Método que agrega un valor al vector//function vAgregar(obj)//Método que inserta en la posicion indicada por ind en el vector//function vInsert(obj,ind)//Método que borra el elemento de la posición ind//function vBorrar (ind) //Método que indica si el obj es miembro del vector//function vIsMember(obj)//Método que devuelve la posición de obj//function vIndice(obj) //---FUNCIONES PARA VALIDACION DE FECHAS---//Función que controla la validez de una fecha//function FechaValida(field)//Parámetros: field = campo que se quiere validar (document.forms[0].<nombre campo>) //Control del formato fecha dd/mm/aaaa//function validarFecha(field)//Parámetros: field = campo que se quiere validar (document.forms[0].<nombre campo>) //---FUNCIONES PARA VALIDACION DE CAMPOS---//Función que controla si existe el campo en el form//function existField(strCampo,frm)//Validación de campos de texto o rexto enriquecido - Chequea que se haya completado el campo//function validar(field,msg)//Parámetros: field = campo que se quiere validar (document.forms[0].<nombre campo>) //                         msg = mensaje que se desea mostrar al usuario si no se completó el campo//Validación de campos tipo combobox - Chequea que se haya completado el campo//function validarC(field,msg)//Parámetros: field = campo que se quiere validar (document.forms[0].<nombre campo>) //                         msg = mensaje que se desea mostrar al usuario si no se completó el campo//Validación de campos tipo radiobutton - Chequea que se haya completado el campo//function validarR(field,msg)//Parámetros: field = campo que se quiere validar (document.forms[0].<nombre campo>) //                         msg = mensaje que se desea mostrar al usuario si no se completó el campo//Control del formato de una cédula uruguaya//function validarCI(field)//Parámetros: field = campo que se quiere validar (document.forms[0].<nombre campo>) //Control de que una dirección de mail tenga @//function validarMail(field)//Parámetros: field = campo que se quiere validar (document.forms[0].<nombre campo>) //--FUNCIONES PARA MODIFICACION DE CAMPOS---//Borrado del valor de un campo texto//function blanquear(field)//Parámetros: field = campo que se quiere blanquear (document.forms[0].<nombre campo>) //Borrado del valor de un campo combo//function blanquearC(field)//Parámetros: field = campo que se quiere blanquear (document.forms[0].<nombre campo>) //Asignación de valor a un campo texto//function asignar(field,valor)//Asignación de valor a un campo combo//function asignarC(field,valor)//Función que agrega el valor indicado al campo (si es que ya no está en él)//function AgregaGrupo(campo,valor)//---FUNCIONES PARA CONSULTA DE CAMPOS---//Devolución valor de un campo tipo combobox//function valorC(field)//Devolución valor de un campo tipo radiobutton//function valorR(field) //Devolucion valor de un campo tipo checkbox como string separado por ;//function valorCh(campo) //Devolución valor de un campo tipo texto//function valor(field) //Esta funcion marca el checkbox si es que exite uno que tenga por valor str//function Marcar (strCarrito,field1,vAux)//---FUNCIONES PARA CONVERSION DE VALORES DE CAMPOS A LISTAS//Función que crea una lista con la dimensión de la cantidad de valores del campo//function AgregaNro2(list,field)//Función que toma los valores del campo field y los carga en el list//function FieldToList(field,list)//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//VARIABLESvar v;//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//FUNCIONES//---FUNCIONES PARA MANEJO DE NÚMEROS---//Esta función convierte un valor de texto en número//Nota: todos los valores que se toman de campos son de tipo textofunction SetNumber(valor){	var n = new Number(valor);	return(n);}//Esta funcion toma un valor numerico y lo redondea hasta dos decimales despues de la comafunction Redondea(valor){   var x;   x=Math.round(valor*100);   return(x/100)	}//Indica si theObj es numerico o nofunction isNumber( theObj ) { 	var digits = "0123456789." ;	var temp ;	for (var i = 0; i < theObj.length; i++ ) { 		temp = theObj.substring( i , i + 1 ) ;		if ( digits.indexOf( temp ) == -1 ) { return false } 	} 	return true } //---FUNCIONES PARA MANEJO DE TABLAS DINAMICAS---//Borra un elemento de una tabla dinámicafunction BorrarTabla(campo,Lista,i){	v=new Vector(3);	v=stringToVector(campo.value);	v.vBorrar(i);	Lista.options.length=0;	campo.value=VectorToField(campo,Lista);}//Se usa en la función Agregar que está a continuaciónfunction VectorToField(field,field1){	var div = "; ";	var str ="";		var tam = v.vLength;		if (tam!=1){		for(var i=0; i< tam-1;i=i+1)			{					str += v.vArray[i] + div;			field1.options[field1.options.length] = new Option(v.vArray[i]);					}	}		str += v.vArray[tam-1];	field1.options[field1.options.length] = new Option(v.vArray[tam-1])	return str;}//Agrega una línea a la tabla dinámicafunction Agregar(strCampo,campodest,listadest){if(strCampo!=""){		v=new Vector(3);		v=stringToVector(campodest.value);		v.vAgregar(strCampo);		listadest.options.length=0;		campodest.value=VectorToField(campodest,listadest);			}}//---FUNCIONES PARA MANEJO DE STRING---//Devuelve el string desde la posicion beg hasta el separador div (left)function ParserLeft(str,beg,div){	if(-1 == (end = str.indexOf(div,beg))) end = str.length;	return str.substring(beg,end);}//Devuelve el string desde el primer div que encuentre a partir de la posicion beg (right)function ParserRight(str,beg,div){	if(-1 == (end = str.indexOf(div,beg))) end = str.length;	return str.substring(end+2,str.length);}//Esta funcion recibe un string con , y devuelve el mismo string cambiando las , por .function CambiaFormato(str){	var aux = "";	var div = ",";	var end=0;			if (-1 == (end = str.indexOf(div,beg)))	{		return str;	}	for(var  beg=0 ; beg < str.length ; beg = end+div.length)	{				if(-1 == (end = str.indexOf(div,beg))) end = str.length;			if (end < str.length){				aux = aux + str.substring(beg,end) + ".";		}		if(end == str.length)		{			aux = aux + str.substring(beg,str.length) ;		}	}		return aux;}//---FUNCIONES PARA CONVERSION ENTRE STRING Y VECTORES---//Esta función recibe un string con varios valores separados por ";"//Devuelve un vector con los valoresfunction stringToVector(str){    var vAux;    vAux = new Vector(0);	var div = "; ";	var end=0;			for(var  beg=0 ; beg < str.length ; beg = end+div.length)	{				if(-1 == (end = str.indexOf(div,beg))) end = str.length;				var entry = str.substring(beg,end);						if(entry!="")  vAux.vAgregar(entry);			}		return vAux;}//Esta función recibe un string con varios valores separados por div//Devuelve un vector con los valoresfunction StringToVector2(str,div){    var vAux;    vAux = new Vector(0);		var end=0;			for(var  beg=0 ; beg < str.length ; beg = end+div.length)	{				if(-1 == (end = str.indexOf(div,beg))) end = str.length;				var entry = str.substring(beg,end);						if(entry!="")  vAux.vAgregar(entry);			}		return vAux;}//Esta función recibe un string con varios valores separados por div//Devuelve un vector con los valoresfunction StringToVector3(str,div){    var vAux;    vAux = new Vector(0);		var end=0;			for(var  beg=0 ; beg < str.length ; beg = end+div.length)	{				if(-1 == (end = str.indexOf(div,beg))) end = str.length;				var entry = trim(str.substring(beg,end));						if(entry!="")  vAux.vAgregar(entry);			}		return vAux;}//Esta funcion recibe un vector y devuelve un string//con los valores del vector separados con ";"function VectorToString(v){	var div = "; ";	var str ="";		var tam = v.vLength;	if (tam==0)	{		return str;	}	if (tam!=1){		for(var i=0; i< tam-1;i=i+1)			{					str += v.vArray[i] + div;								}	}		str += v.vArray[tam-1];		return str;}function VectorToString2(v,div){	var str ="";		var tam = v.vLength;	if (tam==0)	{		return str;	}	if (tam!=1){		for(var i=0; i< tam-1;i=i+1)			{					str += v.vArray[i] + div;								}	}		str += v.vArray[tam-1];		return str;}//---CLASE VECTOR---//******************************************Clase Vector***********************************function Vector(variable) {  this.vLength = 0;  this.vArray = new Array(0);  this.vAgregar = vAgregar;  this.vBorrar = vBorrar;  this.vIsMember = vIsMember;  this.vIndice = vIndice;  this.vInsert = vInsert;}// Métodos de la clase vectorfunction vAgregar(obj){	this.vLength++;		aux = new Array(this.vLength);	for(var i=0;i<this.vLength-1;i++){		aux[i] = this.vArray[i];	}	aux[this.vLength-1] = obj;	this.vArray = aux;}//Inserta en la posicion indicada por ind en el vectorfunction vInsert(obj,ind){	this.vLength++;		aux = new Array(this.vLength);	for(var i=0;i<ind;i++){		aux[i] = this.vArray[i];	}	aux[ind] = obj;			for(var j=ind+1;j<this.vLength;j++){		aux[j] = this.vArray[j-1];	}	this.vArray = aux;}function vBorrar (ind){  this.vLength--;    aux= new Array(this.vLength);  for (var i=0; i<=this.vLength;i++){    	if (i<ind) {  	   aux[i] = this.vArray[i];	}			if(i>ind){		aux[i-1] = this.vArray[i];	}  }  this.vArray = aux;}function vIsMember(obj){	if (this.vLength == 0 )	{		return false;	}	for(var i=0;i<=this.vLength-1;i++)	{		if (obj == this.vArray[i]) 		{			return true;		}	}	return false;}function vIndice(obj) {	for(var i=0;i<=this.vLength-1;i++)	{		if (obj == this.vArray[i]) 		{			return i;		}	}	return -1;}//*************************************Fin Clase Vector***********************************//---FUNCIONES PARA VALIDACION DE FECHAS---//control del mes en la fechafunction ValidarMes(mes){	if (mes<1 || mes>12)	{	return false	}	else	{	return true	}}//control del dia en la fechafunction ValidarDia(dia,mes,anio){	if (mes==1 || mes==3 || mes==5 || mes==7 || mes==8 || mes==10 || mes==12)   //31 dias	{		if (dia<1 || dia>31)		{		return false		}	}	else	{		if (mes==2)  		// depende del año		{			if ((anio % 4)==0)  //bisiesto, 29 días			{				if (dia<1 || dia>29)				{				return false				}			}				else   //28 dias			{				if (dia<1 || dia>28)				{				return false				}			}			}		else  //30 días		{			if (dia<1 || dia>30)			{			return false			}		}	}return true}//control de la validez de la fechafunction FechaValida(field){if (field.value!="")	{	dia=field.value.substr(0,2);	mes=field.value.substr(3,2);	anio=field.value.substr(6,4);	validomes=ValidarMes(mes);	if (validomes==true)		{		validodia=ValidarDia(dia,mes,anio);		if (validodia==false)			{	       	alert("El día ingresado en la fecha no es válido");			field.focus();			return false;			}		else  //dia valido			{			return true			}			}	else  //mes invalido		{       		alert("El mes ingresado en la fecha no es válido");			field.focus();			return false;		}	}	else   //si la fecha está vacía devuelvo true porque no es obligación ponerla	{		return true	}}//control que la fecha no este en blancofunction validarFecha(field,msg){	if (field.value=="")	{			alert(msg);		return false;	}	return true;}//---FUNCIONES PARA VALIDACION DE CAMPOS---//Se fija si existe el campo pasado como parámetro en el form pasadofunction existField(strCampo,frm){	var aElements = frm.elements;	for (var i = 0; i<aElements.length;i++)	{		if(aElements[i].name==strCampo)		{							return (true);		}	}		return (false);}//validación de campos de textofunction validar(field,msg){if (field.value == "")	{	alert(msg);	if(existDocs(field)){	field.focus();}	return false;	}else	{	return true;	}}//validacion de campos tipo comboboxfunction validarC(field,msg){if (field.selectedIndex==-1)	{	alert(msg);	field.focus();	return false;	}else	{	return true;	}}//validación campos tipo radio buttonfunction validarR(field,msg) {for (var i=0; i < field.length; i++) {	if (field[i].checked)	 {		return true;	}}//si sigo acá no hay ninguno seleccionadoalert(msg);return false;}//control del formato de una cedula uruguayafunction validarCI(field){if (field.value!=""){	//asumo formato de la cedula correcto xxxxxxx o xxxxxx	var buscoguion=field.value.indexOf("-");	if (buscoguion>-1)  //si ingresan algún guion doy error	{		alert("Formato incorrecto. La cédula debe ser ingresada en formato xxxxxxx");		field.focus();		return false;	}	else 	{		var buscopto=field.value.indexOf(".");		if (buscopto>-1)  //si ingresan algún punto doy error		{			alert("Formato incorrecto. La cédula debe ser ingresada en formato xxxxxxx");			field.focus();			return false;		}		else 		{			if (field.value.length<6 | field.value.length>7)			{				alert("Cantidad de dígitos incorrecta en la cédula");			field.focus();			return false;			}			else			{					return true			}		}	}}}//control del formato de una dirección de mailfunction validarMail(field){if (field.value!=""){	var buscoarroba=field.value.indexOf("@");	if (buscoarroba<=-1)  //si no hay @	{		alert("Formato incorrecto. La dirección de correo no contiene '@'");		field.focus();		return false;	}	else 	{	return true;	}}}//---FUNCIONES PARA MODIFICACION DE CAMPOS---//Borrado del valor de un campo textofunction blanquear(field){	field.value = "";}//Borrado del valor de un campo combofunction blanquearC(field){	field.selectedIndex = -1;}//Asignación de valor a un campo textofunction asignar(field,valor){field.value = valor}//Asignación de valor a un campo combofunction asignarC(field,valor){	var j = 0;	var encontre = false;	while (j<field.length && !encontre)	{		if (field.options[j].text == valor)		{		encontre = true		}		else		{		j ++		}	}	if (encontre)	{	field.selectedIndex = j;	}}function StringToVector2Null(str,div){    var vAux;    vAux = new Vector(0);		var end=0;			for(var  beg=0 ; beg < str.length ; beg = end+div.length)	{				if(-1 == (end = str.indexOf(div,beg))) end = str.length;				var entry = str.substring(beg,end);						vAux.vAgregar(entry);			}		return vAux;}//funcion que agrega el valor seleccionado al campo si es que no estaba en el campofunction AgregaGrupo(campo,valor){	if (valor=="")	{return;}	var vGrupos = stringToVector(campo.value);	if (campo.value="")	{			campo.value=valor;	}	else	{	if(!vGrupos.vIsMember(valor))	{		vGrupos.vAgregar(valor);	}	campo.value=VectorToString(vGrupos);	alert("Los valores del campo: "+ campo.name +" son: " +campo.value);	}}//---FUNCIONES PARA CONSULTA DE CAMPOS---//Devolucion valor de un campo tipo comboboxfunction valorC(field){	if (field.type != 'select-one') 	{  		return (field.value)	}	else	{		return (field.options[field.selectedIndex].text)	}}//Devolucion valor de un campo tipo radiobuttonfunction valorR(campo) {	if (typeof campo.length == 'undefined')	{		return(campo.value);	}	else	{		for(var i=0; i<campo.length; i++)		{			if (campo[i].checked)			{				return(campo[i].value)			}		}		return(null);	}}//Devolucion valor de un campo tipo checkbox como string separado por ;function valorCh(campo) {	if (typeof campo.length == 'undefined')	{		return(campo.value);	}	else	{		v = new Vector(campo.length);			for(var i=0; i<campo.length; i++)		{			if (campo[i].checked)			{				v.vAgregar(campo[i].value);			}		}			return(VectorToString2(v,"\n"));  //Se devuelve un string con los valores separados por enter	}}//Devolucion valor de un campo tipo textofunction valor(field) {	return (field.value)}//---FUNCIONES PARA CONVERSION DE VALORES DE CAMPOS A LISTAS---function AgregaNro2(list,field){	var vValores;		vValores = stringToVector(field.value);	list.options.length = 0;	for (var i = 0; i<vValores.vLength;i++)	{		list.options[list.options.length] = new Option(i+1);	}}//Este procedimiento toma los valores del campo field y los pone como options en el//listfunction FieldToList(field,list){	var vValores;	vValores = stringToVector(field.value);	for (var i = 0; i<vValores.vLength;i++)	{		list.options[list.options.length] = new Option(vValores.vArray[i]);	}}//Recibe un vector y devuelve un string con separador ;function VectorToField2(vAux){	var div = "; ";	var str ="";		var tam = vAux.vLength;		if (tam!=1){		for(var i=0; i< tam-1;i++)		{			str += vAux.vArray[i] + div;		}	}	str += vAux.vArray[tam-1];	return str;}// Separa todos los valores que viene en str y llama a marcar con //cada posible valorfunction CompletaChecks(str,field1){		 var div = ";";		 var end=0;		 for(var  beg=0 ; beg < str.length ; beg = end+div.length)		 {		 		 		 		 if(-1 == (end = str.indexOf(div,beg))) end = str.length;		 		 var entry = str.substring(beg,end);		 		 if(entry!="") Marcar(entry,field1);		 }}//Esta funcion marca el checkbox si es que exite uno que tenga por valor strfunction Marcar (str,field1){		 var beg=0;		 if (field1.value==str)		 {		 		 field1.click();		 }else{		 		 		 		 if(field1.type!="checkbox"){		 		 		 for (var i=0; i<field1.length;i++)		 		 		 {		 		  		 		 if  (field1[i].value == str )		 		 		 		 {		 		  		 		 		 		 		 		 if (!field1[i].checked) field1[i].click();		 		 		 		 		 		 		 }		 		 		 }		 		 }		 }		 }function dialogBox(wnd,interfase,url,atributos){/*wnd=windowinterfase=un objeto en el cual se pasan parámetros y se reciben resultados	Ej: 	function interfase(){		var controlFechaNew;		var controlHoraNew;		var controlTecnicoNew;		var controlLugarVerNewIndex;		var controlTiempoNew;	}url=url de la página a abrir atributos= atributos de la ventana que se abrirá	Ej:		atributos="dialogHeight:200px;dialogWidth:600px;center;edge:Sunken;help:No;resizable: No;"*/	if (wnd.showModalDialog(url,interfase,atributos))		return true;	else 		return false;}function existDocs(strCampo){	var aElements = document.forms[0].elements;	for (var i = 0; i<aElements.length;i++)	{		if(aElements[i].name==strCampo)		{						return (true);		}	}		return (false);}// Removes leading whitespacesfunction LTrim( value ) {		var re = /\s*((\S+\s*)*)/;	return value.replace(re, "$1");	}// Removes ending whitespacesfunction RTrim( value ) {		var re = /((\s*\S+)*)\s*/;	return value.replace(re, "$1");	}// Removes leading and ending whitespacesfunction trim( value ) {	resultado="";	var i =0;	while (i<value.length){		resultado=resultado+value.charAt(i);		i++		if (value.charAt(i)==' '){			resultado=resultado+value.charAt(i);			while(value.charAt(i)==' '){					i++;			}		}	}		return LTrim(RTrim(resultado));	//return RTrim(resultado)}//Devolucion valor de un campo tipo checkbox como string separado por ;function valorCh2(campo){	if (typeof campo.length == 'undefined')	{		return(campo.value);	}	else	{		v = new Vector(campo.length);		for(var i=0; i<campo.length; i++)		{			if (campo[i].checked)			{				v.vAgregar(campo[i].value);			}		}		return(VectorToString2(v,", "));  //Se devuelve un string con los valores separados por coma.	}}