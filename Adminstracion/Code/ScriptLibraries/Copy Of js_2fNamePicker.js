/** * $file: NamePicker.js $ * $Revision: 1.001 $ * $Date: 2006/06/23 $ * * @author Jake Howlett, codestore.net * @copyright Copyright © 2006, Rockall Design ltd, All rights reserved. */ var NamePicker = {	target_field: "",	target_type: "",	remember_last: false,	init: function(settings){		NamePicker.settings = settings;		$("search_results").innerHTML=this.settings["prompt"];	},	reset: function (){		$('#search_spinner').hide();				$("search_text").value="";		$("search_results").innerHTML=this.settings["prompt"];	},		open: function(caller, field, type, prompt){			if (!this.RememberLast)			this.reset();		this.target_field = field;		this.target_type = type;		$('NamesPickerLabel').innerHTML="<strong>"+prompt+"</strong>";		$('#NamesPicker').css({ position: 'absolute', top:""+this.findPosY(caller)+"px", left: ""+this.findPosX(caller)+"px" });		if (type=="enlazada" || type=="singleenlazada"){		$('selBusq').innerHTML=""			$('search_text').style.display="none";			NamePicker.list_options();			document.getElementById("NamesPicker").style.display="block"		}else{		if (type=="multi_busq"){			$('selBusq').innerHTML='<input name="VistaBusq" type="radio" value="'+this.settings['viewname']+'" onclick="NamePicker.reset()">'+this.settings['option1']+'<input name="VistaBusq" value="'+this.settings['viewname2']+'" type="radio" onclick="NamePicker.reset()" checked>'+this.settings['option2'];			new Form.Element.Observer('search_text', 1, this.lookup);			document.getElementById("NamesPicker").style.display="block"			$("search_text").style.display="block"			$("search_text").focus();		}else{		$('selBusq').innerHTML=""		new Form.Element.Observer('search_text', 1, this.lookup);		//new Effect.SlideDown('NamesPicker');		document.getElementById("NamesPicker").style.display="block"		$("search_text").style.display="block"		$("search_text").focus();		}		}	},	open2: function (caller,fields,type,prompt,field_agr,table_name){		if (!this.RememberLast)			this.reset();		this.target_field = fields;		this.target_type = type;		this.target_field_Agr = field_agr;		this.target_table_name = table_name;		$('NamesPickerLabel').innerHTML="<strong>"+prompt+"</strong>";		Element.setStyle('NamesPicker', {position: 'absolute', top: this.findPosY(caller)+"px", left: this.findPosX(caller)+"px"} );		if (type=="enlazada"){			$('search_text').style.display="none";			NamePicker.list_options();					document.getElementById("NamesPicker").style.display="block"		}else{		new Form.Element.Observer('search_text', 1, this.lookup);		//new Effect.SlideDown('NamesPicker');		document.getElementById("NamesPicker").style.display="block"		$("search_text").style.display="block"		$("search_text").focus();		}	},	close: function(){		//new Effect.SlideUp('NamesPicker');		document.getElementById("NamesPicker").style.display="none"	},	add: function(name){		switch (this.target_type){			case "single":				$(this.target_field).value = name;				//new Effect.Highlight(this.target_field, { queue: 'front' }); //'Message');				this.close();			break;			case "singleenlazada":				var campo_borrado=$(NamePicker.settings['erase_field']);				if (campo_borrado.value==""){					campo_borrado.value=$(this.target_field).value;				}else{					campo_borrado.value=campo_borrado.value+","+$(this.target_field).value;				}				$(this.target_field).value = name;				//new Effect.Highlight(this.target_field, { queue: 'front' }); //'Message');				this.close();			break;			case "multi":				$(this.target_field).value+=name+'\n';			break;						case "table":				var vValores = StringToVector3(document.getElementById(this.target_field).value,",");				if (vValores.vIsMember(name)){					alert("La persona ya se encuentra agredada");				}else{					var empty=NamePicker.settings['empty'];					var row = "<tr>";					row+="<td class=\"tdSeleccion\">"+name+"</td>";					row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"NamePicker.remove(this.parentNode.parentNode,'"+this.target_field+"','"+name+"',"+empty+","+NamePicker.settings['actualizar']+")\" style=\"cursor:hand;\"></td>";					row+="</tr>";					vValores.vAgregar(name)					document.getElementById(this.target_field).value=VectorToString2(vValores,",")					new Insertion.Bottom(this.target_field+'-List', row);				}											break;			case "multi_busq":				var vValores = StringToVector3(document.getElementById(this.target_field).value,",");				if (vValores.vIsMember(name)){					alert("La persona ya se encuentra agredada");				}else{					var empty=NamePicker.settings['empty'];					var row = "<tr>";					row+="<td class=\"tdSeleccion\">"+name+"</td>";					row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"NamePicker.remove(this.parentNode.parentNode,'"+this.target_field+"','"+name+"',"+empty+","+NamePicker.settings['actualizar']+")\" style=\"cursor:hand;\"></td>";					row+="</tr>";					vValores.vAgregar(name)					document.getElementById(this.target_field).value=VectorToString2(vValores,",")					new Insertion.Bottom(this.target_field+'-List', row);				}											break;			case "tableunidad":				var empty=NamePicker.settings['empty'];				var vValores = StringToVector3(document.getElementById(this.target_field).value,",");				if (vValores.vIsMember(name)){					alert("La unidad ya se encuentra agregada");				}else{					var row = "<tr>";					row+="<td class=\"tdSeleccion\">"+name+"</td>";					row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"images/icons/remove.gif\" onclick=\"NamePicker.remove(this.parentNode.parentNode,'"+this.target_field+"','"+name+"',"+empty+")\" style=\"cursor:hand;\"></td>";					row+="</tr>";					vValores.vAgregar(name)					document.getElementById(this.target_field).value=VectorToString2(vValores,",")					new Insertion.Bottom(this.target_field+'-List', row);				}											break;			case "enlazada":				var vValores = StringToVector3(document.getElementById(this.target_field).value,",");				if (vValores.vIsMember(name)){					alert("La persona ya fue ingresada");				}else{					var row = "<tr>";					row+="<td class=\"tdSeleccion\">"+name+"</td>";					row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"images/icons/remove.gif\" onclick=\"NamePicker.remove(this.parentNode.parentNode,'"+this.target_field+"','"+name+"',"+this.settings['empty']+")\"></td>";					row+="</tr>";					vValores.vAgregar(name)					document.getElementById(this.target_field).value=VectorToString2(vValores,",")					new Insertion.Bottom(this.target_field+'-List', row);				}											break;					}	},	lookup: function(element, value) {		if (value=="") return;		var vista="viewname"	if (NamePicker.target_type == "multi_busq"){		if (document.forms[0].VistaBusq[1].checked){			vista="viewname2"		}		}	var categoria = "";	if (NamePicker.settings['categoria']){		categoria = "&RestrictToCategory="+NamePicker.settings['categoria'];	} else{		categoria="";		}			new Ajax.Request(      		  NamePicker.settings['addressbook']+'/'+NamePicker.settings[vista]+'?readviewentries&count=10'+categoria,         			{asynchronous:true, evalScripts:true,            			onSuccess:NamePicker.list_results,            			onLoading:function(request)            		{Element.show('search_spinner')},          	 	method:'get', parameters:'startkey=' + value  }		)	},	list_results: function (response){		var root = response.responseXML;		var entries = root.getElementsByTagName("viewentry");		var outputHTML = "<table class='names'>";		var vValores = StringToVector3(document.getElementById(NamePicker.target_field).value,",");		if (NamePicker.target_type == "table_doble"){			codigos = StringToVector3(document.getElementById(NamePicker.settings["valores"]).value,";");		}		for (var i=0; i<entries.length; i++) {		person= entries[i].getElementsByTagName("text").item(NamePicker.settings["column"]-1).firstChild.nodeValue;		if (NamePicker.target_type == "table_doble"){			codigo = entries[i].getElementsByTagName("text").item(NamePicker.settings["column2"]-1).firstChild.nodeValue;		}			if (NamePicker.target_type == "multi_busq"){				if (document.forms[0].VistaBusq[1].checked){					if (person.indexOf(",")>0){						person =person.substring(person.indexOf(",")+2,person.length) +" "+person.substring(0,person.indexOf(",")-1)+"/"+NamePicker.settings['Organizacion'];					}else{						person = person+"/"+NamePicker.settings['Organizacion']					}				}				}			if (NamePicker.target_type=="con_codigo" || NamePicker.target_type=="single_con_codigo" || NamePicker.target_type=="con_codigo_campo_multi"){				var codigo = entries[i].getElementsByTagName("text").item(NamePicker.settings["column_codigo"]-1).firstChild.nodeValue;				if (vValores.vIsMember(codigo)){					outputHTML+= "<tr onclick=\"NamePicker.agregar(this.firstChild.innerHTML,'"+codigo+"')\"><td style=\"color:red;\">"+person+"</td></tr>";				}else{					outputHTML+= "<tr onclick=\"NamePicker.agregar(this.firstChild.innerHTML,'"+codigo+"')\"><td onclick=\"this.style.color='#FF0000';\">"+person+"</td></tr>";				}			}else{				if (vValores.vIsMember(person)){					if (NamePicker.target_type=="table_doble"){						outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML,'"+codigo+"')\"><td style=\"color:red;\">"+person+"</td></tr>";					}else{						outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML)\"><td style=\"color:red;\">"+person+"</td></tr>";					}								}else{					if (NamePicker.target_type=="table_doble"){						outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML,'"+codigo+"')\"><td style=\"color:red;\">"+person+"</td></tr>";					}else{						outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML)\"><td onclick=\"this.style.color='#FF0000';\">"+person+"</td></tr>";					}				}			}		}		outputHTML+= "</table>";		$('search_results').innerHTML = outputHTML;		Element.hide('search_spinner');	},		list_options:function(){		valores = StringToVector3($(NamePicker.settings['campoOrigen']).value,',');		var campotarget = document.getElementById(NamePicker.target_field);		var vValores = StringToVector3(campotarget.value,",");		var outputHTML = "<table class='names'>";		outputHTML += "<col></col>"; 		outputHTML += "<col width='16'></col>";		for (var i=0; i<valores.vArray.length; i++) {			person= valores.vArray[i];			if (vValores.vIsMember(person)){				outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML)\"><td style=\"color:red;\">"+person+"</td></tr>";			}else{				outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML)\"><td onclick=\"this.style.color='#FF0000';\">"+person+"</td></tr>";			}					}		outputHTML+= "</table>";		$('search_results').innerHTML = outputHTML;		Element.hide('search_spinner');	},	remove: function (row,field,name,empty,actualizar){		var vValores= new Vector(0)		vValores=StringToVector3(document.getElementById(field).value,",")		if (vValores.vArray.length>1 || empty){		ind = vValores.vIndice(name);		vValores.vBorrar(ind);		// Si existe un campo igualVis		var campoVis = document.getElementById(field+"Vis");		if(campoVis)		{	var vValoresVis= new Vector(0);			vValoresVis=StringToVector3(campoVis.value,",");			vValoresVis.vBorrar(ind);			campoVis.value=VectorToString2(vValoresVis,",")		}		Element.remove(row);		document.getElementById(field).value=VectorToString2(vValores,",")			}else{			alert("No es posible eliminar todos los valores de este campo");		}		if (actualizar){			if (ActualizarMiembros){				ActualizarMiembros();			}		}	},	agregar: function(name,codigo){		switch(this.target_type){		case "con_codigo_campo_multi":		vValores = StringToVector3($(this.target_field).value,",");		if (vValores.vIsMember(codigo)){			alert("La unidad ya está en la lista.");		}else{			vValores.vAgregar(codigo);			$(this.target_field).value=VectorToString2(vValores,",");			var names = $(this.target_field+"Vis").value;			(names == "") ? names = name : names += "," + name ;			$(this.target_field+"Vis").value=VectorToString2( StringToVector3(names, ",")  ,",");//			vtextos= StringToVector3($(this.target_field+"Textos").value,",");//			vtextos.vAgregar(name);///			$(this.target_field+"Textos").value=VectorToString(vtextos);			var row = "<tr>";			row+="<td class=\"tdSeleccion\">"+name+"</td>";			row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"images/icons/remove.gif\" onclick=\"NamePicker.eliminar(this.parentNode.parentNode,'"+this.target_field+"','"+codigo+"')\" style=\"cursor:hand;\"></td>";			row+="</tr>";			new Insertion.Bottom(this.target_field+'Textos', row);						$(this.target_field+"Vis").options.length=0;			FieldToList ($(this.target_field+"Textos"), $(this.target_field+"Vis"));					}		break;		case "con_codigo":		// tabla con codigo		vValores = StringToVector3($(this.target_field).value,",");				if (vValores.vIsMember(codigo)){			alert(NamePicker.settings["msg_repetido"]);		}else{			vValores.vAgregar(codigo);			$(this.target_field).value=VectorToString2(vValores,",");///			$(this.target_field).value=VectorToString2(vValores,",");			var row = "<tr>";			row+="<td class=\"tdSeleccion\">"+name+"</td>";			row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"images/icons/remove.gif\" onclick=\"NamePicker.eliminar(this.parentNode.parentNode,'"+this.target_field+"','"+codigo+"')\" style=\"cursor:hand;\"></td>";			row+="</tr>";			new Insertion.Bottom(this.target_field+'-List', row);		}		break;		case "single_con_codigo":			$(this.target_field).value=codigo;			$(this.target_field+"Vis").value=name;			this.close();		break;		}	},	eliminar: function (row,campo,codigo){		vValores = StringToVector3($(campo).value,",");		ind = vValores.vIndice(codigo);		vValores.vBorrar(ind);		Element.remove(row);		document.getElementById(campo).value=VectorToString2(vValores,",")	},			findPosX: function(obj) 	{			var curleft = 0;		if (obj.offsetParent)		{			while (obj.offsetParent)			{				curleft += obj.offsetLeft				obj = obj.offsetParent;			}		}		else if (obj.x)			curleft += obj.x;				return curleft;	},	findPosY: function(obj)	{		var curtop = 0;		if (obj.offsetParent)		{			while (obj.offsetParent)			{				curtop += obj.offsetTop				obj = obj.offsetParent;			}		}		else if (obj.y)			curtop += obj.y;					return curtop;	}}