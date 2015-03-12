/** * $file: NamePicker.js $ * $Revision: 1.001 $ * $Date: 2006/06/23 $ * * @author Jake Howlett, codestore.net * @copyright Copyright © 2006, Rockall Design ltd, All rights reserved. */var NamePicker = {	target_field: "",	target_type: "",	remember_last: false,	init: function(settings){		NamePicker.settings = settings;		$("#search_results").html(this.settings["prompt"]);	},	reset: function (){	//alert("reset");		$('#search_spinner').hide();		$("#search_text").val("");		$("#search_results").html(this.settings["prompt"]);	},		open: function(caller, field, type, prompt){				if (!this.RememberLast)			this.reset();		this.target_field = field;		this.target_type = type;		$('#NamesPickerLabel').html("<strong>"+prompt+"</strong>");		$('#NamesPicker').css({ position: 'absolute', top:""+this.findPosY(caller)+"px", left: ""+this.findPosX(caller)+"px" });		if (type=="enlazada" || type=="singleenlazada"){			//alert("1");			$('#selBusq').html("");			document.getElementById('search_text').style.display="none";			NamePicker.list_options();			document.getElementById("NamesPicker").style.display="block";		}else{			//alert("2");			if (type=="multi_busq"){				//alert("3");				$('#selBusq').html('<input name="VistaBusq" type="radio" value="'+this.settings['viewname']+'" onclick="NamePicker.reset()">'+this.settings['option1']+'<input name="VistaBusq" value="'+this.settings['viewname2']+'" type="radio" onclick="NamePicker.reset()" checked>'+this.settings['option2']);				//new Form.Element.Observer('search_text', 1, this.lookup);				//$('#search_text').keyup(this.lookup);				$('#search_text').bind("keyup",this.lookup);				document.getElementById("NamesPicker").style.display="block";				document.getElementById("search_text").style.display="block";				$("#search_text").focus();			}else{				//alert("4");				$('#selBusq').html("");				//new Form.Element.Observer('search_text', 1, this.lookup);				//$('#search_text').keyup(this.lookup);				$('#search_text').bind("keyup",this.lookup);				//new Effect.SlideDown('NamesPicker');				document.getElementById("NamesPicker").style.display="block";				$("#search_text").show();				$("#search_text").focus();			}		}	},	close: function(){	//alert("close");		//new Effect.SlideUp('NamesPicker');		document.getElementById("NamesPicker").style.display="none";	},	add: function(name){	alert("add");		switch (this.target_type){			case "single":				alert(1);				$("#"+this.target_field).val(name);				//new Effect.Highlight(this.target_field, { queue: 'front' }); //'Message');				this.close();			break;						case "singleenlazada":			alert(2);				var campo_borrado=$("#"+NamePicker.settings['erase_field']);				if (campo_borrado.val()==""){					campo_borrado.val($("#"+this.target_field).val());				}else{					campo_borrado.val(campo_borrado.val()+","+$("#"+this.target_field).val());				}				$("#"+this.target_field).val(name);				new Effect.Highlight(this.target_field, { queue: 'front' }); //'Message');				this.close();			break;						case "multi":			alert(3);				$("#"+this.target_field).val($("#"+this.target_field).val()+name+'\n');			break;						case "table":			alert(4);				var vValoresUpper = StringToVector3(document.getElementById(this.target_field).value.toUpperCase(),",");				var vValores = StringToVector3(document.getElementById(this.target_field).value,",");				if (vValoresUpper.vIsMember(name.toUpperCase())){					alert("La persona ya se encuentra agredada");				}else{					var empty=NamePicker.settings['empty'];					var row = "<tr>";					row+="<td class=\"tdSeleccion\">"+name+"</td>";					row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"NamePicker.remove(this.parentNode.parentNode,'"+this.target_field+"','"+name+"',"+empty+","+NamePicker.settings['actualizar']+")\" style=\"cursor:hand;\"></td>";					row+="</tr>";					vValores.vAgregar(name);					document.getElementById(this.target_field).value=VectorToString2(vValores,",");					//new Insertion.Bottom(this.target_field+'-List', row);					$("#"+this.target_field+'-List').append(row);				}			break;						case "multi_busq":			alert(5);				//var vValores = StringToVector3(document.getElementById(this.target_field).value.toUpperCase(),",");				var vValoresUpper = StringToVector3(document.getElementById(this.target_field).value.toUpperCase(),",");				var vValores = StringToVector3(document.getElementById(this.target_field).value,",");				if (vValoresUpper.vIsMember(name.toUpperCase())){					alert("La persona ya se encuentra agredada");				}else{					var empty=NamePicker.settings['empty'];					var row = "<tr>";					row+="<td class=\"tdSeleccion\">"+name+"</td>";					row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"NamePicker.remove(this.parentNode.parentNode,'"+this.target_field+"','"+name+"',"+empty+","+NamePicker.settings['actualizar']+")\" style=\"cursor:hand;\"></td>";					row+="</tr>";					vValores.vAgregar(name);					document.getElementById(this.target_field).value=VectorToString2(vValores,",");					//new Insertion.Bottom(this.target_field+'-List', row);					$("#"+this.target_field+'-List').append(row);				}			break;						case "tableunidad":			alert(6);				var empty=NamePicker.settings['empty'];				var vValoresUpper = StringToVector3(document.getElementById(this.target_field).value.toUpperCase(),",");				var vValores = StringToVector3(document.getElementById(this.target_field).value,",");				if (vValoresUpper.vIsMember(name.toUpperCase())){					alert("La unidad ya se encuentra agredada");				}else{					var row = "<tr>";					row+="<td class=\"tdSeleccion\">"+name+"</td>";					row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"NamePicker.remove(this.parentNode.parentNode,'"+this.target_field+"','"+name+"',"+empty+")\" style=\"cursor:hand;\"></td>";					row+="</tr>";					vValores.vAgregar(name);					document.getElementById(this.target_field).value=VectorToString2(vValores,",");					//new Insertion.Bottom(this.target_field+'-List', row);					$("#"+this.target_field+'-List').append(row);				}			break;						case "enlazada":			alert(7);				var vValoresUpper = StringToVector3(document.getElementById(this.target_field).value.toUpperCase(),",");				var vValores = StringToVector3(document.getElementById(this.target_field).value,",");				if (vValoresUpper.vIsMember(name.toUpperCase())){					alert("La persona ya fue ingresada");				}else{					var row = "<tr>";					row+="<td class=\"tdSeleccion\">"+name+"</td>";					row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"NamePicker.remove(this.parentNode.parentNode,'"+this.target_field+"','"+name+"',"+this.settings['empty']+")\"></td>";					row+="</tr>";					vValores.vAgregar(name);					document.getElementById(this.target_field).value=VectorToString2(vValores,",");					//new Insertion.Bottom(this.target_field+'-List', row);					$("#"+this.target_field+'-List').append(row);				}			break;		}	},	lookup: function(element, value) {	  	//alert("lookup");	  	value= $("#search_text").val();		if (value=="") {			$('#search_results').html("");			return;		}		var vista="viewname"		if (NamePicker.target_type == "multi_busq"){			if (document.forms[0].VistaBusq[1].checked){				vista="viewname2";			}			}		var cantidad="10";		if (NamePicker.settings['cantidad']){			cantidad = NamePicker.settings['cantidad'];		}		var categoria = "";		if (NamePicker.settings['categoria']){			categoria = "&RestrictToCategory="+NamePicker.settings['categoria'];		} else{			categoria="";		}	//alert(NamePicker.settings['addressbook']+'/'+NamePicker.settings[vista]+'?readviewentries&count='+cantidad+categoria)		$('#search_spinner').show();		$.ajax({    			type: "GET",    			url: NamePicker.settings['addressbook']+'/'+NamePicker.settings[vista]+'?readviewentries&count='+cantidad+categoria,    			data: 'startkey=' + value,    			success: NamePicker.list_results,   			async: true  		});	},	list_results: function (response){		//alert("list_result");		//alert(response.getElementsByTagName("viewentry"));		var root = response.responseXML;		//var entries = root.getElementsByTagName("viewentry");		var entries = response.getElementsByTagName("viewentry");			var outputHTML = "<table class='names'>";		outputHTML += "<col></col>"; 		outputHTML += "<col width='16'></col>";		var vValores = StringToVector3(document.getElementById(NamePicker.target_field).value,",");		if (NamePicker.target_type == "table_doble"){			codigos = StringToVector3(document.getElementById(NamePicker.settings["valores"]).value,";");		}		for (var i=0; i<entries.length; i++) {			person= entries[i].getElementsByTagName("text").item(NamePicker.settings["column"]-1).firstChild.nodeValue;			if (NamePicker.target_type == "table_doble"){				codigo = entries[i].getElementsByTagName("text").item(NamePicker.settings["column2"]-1).firstChild.nodeValue;			}			if (NamePicker.target_type == "multi_busq"){				if (document.forms[0].VistaBusq[1].checked){					if (person.indexOf(",")>0){						person =person.substring(person.indexOf(",")+2,person.length) +" "+person.substring(0,person.indexOf(",")-1)+"/"+NamePicker.settings['Organizacion'];					}else{						person = person+"/"+NamePicker.settings['Organizacion'];					}				}				}			if (NamePicker.target_type=="con_codigo" || NamePicker.target_type=="single_con_codigo" || NamePicker.target_type=="con_codigo_campo_multi"){				var codigo = entries[i].getElementsByTagName("text").item(NamePicker.settings["column_codigo"]-1).firstChild.nodeValue;				if (vValores.vIsMember(codigo)){					outputHTML+= "<tr onclick=\"NamePicker.agregar(this.firstChild.innerHTML,'"+codigo+"')\"><td style=\"color:red;\">"+person+"</td></tr>";				}else{					outputHTML+= "<tr onclick=\"NamePicker.agregar(this.firstChild.innerHTML,'"+codigo+"')\"><td onclick=\"this.style.color='#FF0000';\">"+person+"</td></tr>";				}			}else{				var vValores = StringToVector3(document.getElementById(NamePicker.target_field).value.toUpperCase(),",");				if (vValores.vIsMember(person.toUpperCase())){					if (NamePicker.target_type=="table_doble"){						outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML,'"+codigo+"')\"><td style=\"color:red;\">"+person+"</td></tr>";					}else{							outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML)\"><td style=\"color:red;\">"+person+"</td></tr>";					}				}else{					if (NamePicker.target_type=="table_doble"){						outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML,'"+codigo+"')\"><td style=\"color:red;\">"+person+"</td></tr>";					}else{						outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML)\"><td onclick=\"this.style.color='#FF0000';\">"+person+"</td></tr>";					}				}			}		}		outputHTML+= "</table>";		$('#search_results').html(outputHTML);		$('#search_spinner').hide();	},		list_options:function(){	//alert("list_options");		valores = StringToVector3($("#"+NamePicker.settings['campoOrigen']).val(),',');		var vValores = StringToVector3(document.getElementById(NamePicker.target_field).value,",");		var vValoresUpper = StringToVector3(document.getElementById(NamePicker.target_field).value.toUpperCase(),",");		var outputHTML = "<table class='names'>";		outputHTML += "<col></col>"; 		outputHTML += "<col width='16'></col>";		for (var i=0; i<valores.vArray.length; i++) {			person= valores.vArray[i];			if (vValoresUpper.vIsMember(person.toUpperCase())){				outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML)\"><td style=\"color:red;\">"+person+"</td></tr>";			}else{				outputHTML+= "<tr onclick=\"NamePicker.add(this.firstChild.innerHTML)\"><td onclick=\"this.style.color='#FF0000';\">"+person+"</td></tr>";			}			}		outputHTML+= "</table>";		$('#search_results').html(outputHTML);		$('#search_spinner').hide();	},		remove: function (row,field,name,empty,actualizar){	//alert("remove");		var vValores= new Vector(0);		vValores=StringToVector3(document.getElementById(field).value,",");		var vValoresUpper=StringToVector3(document.getElementById(field).value.toUpperCase(),",");				if (vValores.vArray.length>1 || empty){		ind = vValoresUpper.vIndice(name.toUpperCase());		vValores.vBorrar(ind);		//Element.remove(row);		$(row).remove();		document.getElementById(field).value=VectorToString2(vValores,",");		}else{			alert("No es posible eliminar todos los valores de este campo");		}		if (actualizar){			if (ActualizarMiembros){				ActualizarMiembros();			}		}	},		agregar: function(name,codigo){	//alert("agregar");				switch(this.target_type){			case "con_codigo_campo_multi":				vValores = StringToVector3($("#"+this.target_field).val(),";");				if (vValores.vIsMember(codigo)){					alert(NamePicker.settings["msg_repetido"]);				}else{					var vectorAux = $("#"+this.target_field).val().split(";");					vectorAux[vectorAux.length] = codigo;										vValores.vAgregar(codigo);					var sep = "";					if($("#"+this.target_field).val()!="" )						sep = ";";					$("#"+this.target_field).val($("#"+this.target_field).val()+sep+codigo);					$("#"+this.target_field+"Textos").val($("#"+this.target_field+"Textos").val()+sep+name);							//alert(this.target_field+"Textos")										var miembros=$("#"+this.target_field).val().split(";");					var miembrosName=$("#"+this.target_field+"Textos").val().split(";");							$(document.getElementById(this.target_field+"Tabla")).empty();										for (var i=0; i<miembros.length;i++){						var row = "<tr>";						row+="<td class=\"tdSeleccion\">"+miembrosName[i]+"</td>";						if (document.forms[0].modo.value=="1"){							row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+miembrosName[i]+"\" src=\""+DirABS()+"/images/icons/remove.gif\" onclick=\"NamePicker.remove(this.parentNode.parentNode,'" + this.target_field+ "','"+miembros[i]+"',true)\" style=\"cursor:pointer;\"></td>";						}else{							row+="<td class=\"tdSeleccion\">&nbsp;</td>";						}						row+="</tr>";												if(miembrosName[i]!="")									$(document.getElementById(this.target_field+"Tabla")).append(row);					}										//$("#"+this.target_field+"Textos").val($("#"+this.target_field+"Textos").val()+";"+name);					//$("#"+this.target_field+"Vis").options.length=0;					document.getElementById(this.target_field+"Vis").options.length=0;					FieldToList (document.getElementById(this.target_field+"Textos"), document.getElementById(this.target_field+"Vis"));						}			break;						case "con_codigo":				// tabla con codigo				vValores = StringToVector3($("#"+this.target_field).val(),",");				if (vValores.vIsMember(codigo)){					alert(NamePicker.settings["msg_repetido"]);				}else{					vValores.vAgregar(codigo);					$("#"+this.target_field).val(VectorToString2(vValores,","));					var row = "<tr>";					row+="<td class=\"tdSeleccion\">"+name+"</td>";					row+="<td class=\"tdSeleccion\"><img alt=\"Borrar&#013;"+name+"\" src=\""+DirABS()+"images/icons/remove.gif\" onclick=\"NamePicker.eliminar(this.parentNode.parentNode,'"+this.target_field+"','"+codigo+"')\" style=\"cursor:hand;\"></td>";					row+="</tr>";					//new Insertion.Bottom(this.target_field+'-List', row);					$("#"+this.target_field+'-List').append(row);				}			break;						case "single_con_codigo":				$("#"+this.target_field).val(codigo);				$("#"+this.target_field+"Vis").val(name);				this.close();			break;		}	},		eliminar: function (row,campo,codigo){		vValores = StringToVector3($("#"+campo).val(),",");		ind = vValores.vIndice(codigo);		vValores.vBorrar(ind);		//Element.remove(row);		$(row).remove();		document.getElementById(campo).value=VectorToString2(vValores,",");	},		findPosX: function(obj) 	{			var curleft = 0;		if (obj.offsetParent)		{			while (obj.offsetParent)			{				curleft += obj.offsetLeft;				obj = obj.offsetParent;			}		}		else if (obj.x)			curleft += obj.x;				return curleft;	},	findPosY: function(obj)	{		var curtop = 0;		if (obj.offsetParent)		{			while (obj.offsetParent)			{				curtop += obj.offsetTop;				obj = obj.offsetParent;			}		}		else if (obj.y)			curtop += obj.y;					return curtop;	}}