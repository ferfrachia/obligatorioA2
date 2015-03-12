// For convenience
var dominio;
var fieldSendTo ;
var openerSendTo;
var openerCopyTo;
var openerBlindCopyTo;
var openerDelegee;
var openerMembers;
var fieldEntryList;
var AddrVersion;
var curNAB;
var Campo;

function OKClick()
{
	// put the values back in the underlying form in the right format
	if(window.opener)
	{
//			alert(selectToString(fieldSendTo));
			openerSendTo.value = selectToString(fieldSendTo);
	}
	self.close();
}


function CancelClick() 
{
	self.close();
}


function AddClick(field)
{
if(fieldEntryList.selectedIndex != -1)
{
for (var i=0; i < fieldEntryList.options.length; ++i)
{
if (fieldEntryList.options[i].selected)
{ 
if (fieldEntryList.options[i].value.indexOf("CN=")!= -1) 
{
var selection = FixName(fieldEntryList.options[i].value)
// Here's some ajustment ***************** 
}else if(fieldEntryList.options[i].value.indexOf(",")== -1)
{var selection = FixName(fieldEntryList.options[i].text)
}else{
var selection = FixName(fieldEntryList.options[i].valueh)
}
//****************************************** 
//Se controla que el usuario ya no este agregado al campo
var esta=false;
for (var k=0;k<field.options.length;k++){
	if (field.options[k].text==selection){
		esta=true;
		alert('El Usuario ' + selection + ' ya esta en la lista');
	}
}
if (!esta)
	field.options[field.options.length] = new Option(selection);
}
}
}
}

function substring2(string, start, length) {
return string.substring(start,start+length);
}

/*
function FixName(name)
{
if (name.indexOf("CN=")!= -1)
{
tmpstring=name.substring(3) 
var fullname=substring2(tmpstring,0,tmpstring.indexOf("/")); 
tmpstring=substring2(tmpstring,tmpstring.indexOf("/"),tmpstring.length);
strpos = tmpstring.indexOf("=")+1;

while (strpos != -1)
{
tmpstring=substring2(tmpstring,strpos,tmpstring.length); 
if (tmpstring.indexOf("/")!= -1)
{
restofname=substring2(tmpstring,0,tmpstring.indexOf("/")); 
tmpstring = substring2(tmpstring,tmpstring.indexOf("/"),tmpstring.length); 
if (restofname.length!=0)
{ 
fullname=fullname+"/"+restofname;
}
strpos=tmpstring.indexOf("=") + 1; 
} else 
{
fullname=fullname+"/"+tmpstring;
strpos=-1;
} 
}
return fullname;
// Here's some more ajustment ***************** 
}else if (name.indexOf(",")== -1)
{return name;
} else
tmpstring=name;
var fullname=substring2(tmpstring,0,tmpstring.indexOf(",")); 
tmpstring=substring2(tmpstring,tmpstring.indexOf(","),tmpstring.length);
strpos = tmpstring.indexOf(" ")+1;
fullname=tmpstring.substring(strpos,tmpstring.length)+ " "+fullname;
return fullname; 
//******************************************* 
*/
function FixName(name)
{
if (name.indexOf("CN=")!= -1)
{
tmpstring=name.substring(3) 
var fullname=substring2(tmpstring,0,tmpstring.indexOf("/")); 
tmpstring=substring2(tmpstring,tmpstring.indexOf("/"),tmpstring.length);
strpos = tmpstring.indexOf("=")+1;

while (strpos != -1)
{
tmpstring=substring2(tmpstring,strpos,tmpstring.length); 
if (tmpstring.indexOf("/")!= -1)
{
restofname=substring2(tmpstring,0,tmpstring.indexOf("/")); 
tmpstring = substring2(tmpstring,tmpstring.indexOf("/"),tmpstring.length); 
if (restofname.length!=0)
{ 
fullname=fullname+"/"+restofname;
}
strpos=tmpstring.indexOf("=") + 1; 
} else 
{
fullname=fullname+"/"+tmpstring;
strpos=-1;
} 
}
if (fullname.toUpperCase().indexOf(dominio)==-1)
 fullname=fullname.substring(0,fullname.length-1)+ dominio;
return fullname;
// Here's some more ajustment ***************** 
}else if (name.indexOf(",")== -1)
{
if (name.toUpperCase().indexOf(dominio)==-1)
 name=name.substring(0,name.length)+ dominio;


return name;
} else
tmpstring=name;
var fullname=substring2(tmpstring,0,tmpstring.indexOf(",")); 
tmpstring=substring2(tmpstring,tmpstring.indexOf(","),tmpstring.length);
strpos = tmpstring.indexOf(" ")+1;
fullname=tmpstring.substring(strpos,tmpstring.length)+ " "+fullname;
if (fullname.toUpperCase().indexOf(dominio)==-1)
 fullname=fullname.substring(0,fullname.length-1)+ dominio;

return fullname; 
//******************************************* 


// else return name;
} 			
function RemoveClick(field)
{
	if (field.length != 0){ 
	if (field.selectedIndex != -1)
	{
		for(var i=0;i<field.options.length ; ++i)
			{
				if (field.options[i].selected)
					{
						field.options[i] = null;
						--i;
					}
			}
	}
}
}

function RemoveAllClick()
{
	if (AddrVersion == "Group") {
		fieldMembers.options.length=0;
	} else if (AddrVersion == "Directory") {
		fieldContacts.options.length=0;
	} else if (AddrVersion != "Delegate") {
		fieldSendTo.options.length=0;
	} 
}


function trim(str)
{
	for(var i = 0 ; i<str.length && str.charAt(i)==" " ; i++ ) ;
	return str.substring(i,str.length); 
}


function stringToSelect(str,field)
{
	var div = "\n"
	
	if (AddrVersion == "Directory") div = "%%"
	for(var  beg=0 ; beg < str.length ; beg = end+div.length)
	{
		if(-1 == (end = str.indexOf(div,beg))) end = str.length+1;
		var entry = trim(str.substring(beg,end-1));
		//alert(entry.indexOf(div,0));
		//if (entry.indexOf(div,0)>0) entry = entry.substring(0,entry.length-2);
		if(entry!="") field.options[field.options.length++].text = entry;
	}
	
}


function selectToString(field)
{
	if (field.length!=0)
	{
		var div = "\n"
		var str = "";
		if (AddrVersion == "Directory") div = "%%"
		for(i=0 ; i < field.options.length-1 ; i++)
			str += field.options[i].text + div;
		return str += field.options[i].text;
		
	} else return "";
}


function okFocus()
{
	document.forms[0].OK.focus();
}

function findSubmit() {
	if (document.forms[0].fl_tmpAddrVersion != "Directory")
	if (document.forms[0].fl_tmpFindSubmit.value == "1") {
		document.forms[0].fl_tmpFindSubmit.value = "0";
		document.forms[0].Find.click();
		}
	return true;
	}

//Funcion para el manejo de los separadores en los campos roles
function cambioSeparador(str, divOrigen, divDestino)
{
	var strAux="";
	var end;

	for(var  beg=0 ; beg < str.length ; beg = end+divOrigen.length)
	{
		if(-1 == (end = str.indexOf(divOrigen,beg))) end = str.length+1;
		var entry = str.substring(beg,end-1)+divDestino;
		if(entry!="")		
			strAux+=entry; 
	}
	return strAux.substring(0,strAux.length-1);
	
}