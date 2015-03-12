function XPDEV_DTM_LoadContent(cDoc,RichTextFieldName){
	try{


		//Paso los objetos MIME a RichText
		session.setConvertMIME(false);
		var db : NotesDatabase = session.getDatabase(database.getServer(),"Desarrollo/"+context.getUrl().getParameter("base")+".nsf");
		var doc : NotesDocument = db.getDocumentByUNID(context.getUrl().getParameter("unid"));	
	
	if(doc.getMIMEEntity(RichTextFieldName)!=null){

		var RT:NotesMIMEEntity=doc.getMIMEEntity(RichTextFieldName);
		var html=RT.getContentAsText();

		viewScope.put(RichTextFieldName,html)
	} else {
		viewScope.put(RichTextFieldName,"")
		cDoc.getDocument().closeMIMEEntities();
		session.setConvertMIME(true);
	}
	}catch(e){
		print("XPDEV_DTM_LoadContent Error:"+e.toString())
	}
}
function XPDEV_DTM_StoreClientId(clientId,RichTextFieldName){
	try{
	if(viewScope.XPDEV_DTM_StoredId==null){
		viewScope.XPDEV_DTM_StoredId=clientId+";"+RichTextFieldName
	} else {
		var tmp=viewScope.XPDEV_DTM_StoredId
		if(tmp.indexOf(clientId+";")==-1){
			tmp+="~"+clientId+";"+RichTextFieldName
			viewScope.XPDEV_DTM_StoredId=tmp
		}
	}
	return "OK"
	}catch(e){
		print("XPDEV_DTM_StoreClientId Error:"+e.toString())
		return "NOK"
	}
}
function XPDEV_DTM_SaveToField(){
	try{
	var cDoc=currentDocument
	if(viewScope.XPDEV_DTM_StoredId!=null){
		var tmp=viewScope.XPDEV_DTM_StoredId;
		var thisDoc:NotesDocument=cDoc.getDocument(true)
		var arr1;var arr2;var html="";var x;
		if(tmp.indexOf("~")==-1){
			arr2=tmp.split(";")
			html=viewScope.get(arr2[1])
			if(thisDoc.hasItem(arr2[1])){
				thisDoc.removeItem(arr2[1])
			}
			tmp=arr2[1]
			var stream:NotesStream = session.createStream();
			var RT:NotesMIMEEntity =thisDoc.createMIMEEntity(tmp);
			stream.writeText(html);
			RT.setContentFromText(stream, "text/plain", 1730);
			stream.truncate();
			thisDoc.save();
		}else{
			arr1=tmp.split("~")
			for(x=0;x<arr1.length;x++){
				arr2=arr1[x].split(";")
				html=viewScope.get(arr2[1])
				if(thisDoc.hasItem(arr2[1])){
					thisDoc.removeItem(arr2[1])
				}
				var RT=thisDoc.createRichTextItem(arr2[1])
					RT.appendText(html)
			}
		}
	}
	}catch(e){
		print("XPDEV_DTM_SaveToField Error:"+e.toString())
	}
}