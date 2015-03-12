$('#nav_up').click(
        function (e) {
            $('html, body').animate({scrollTop: '0px'}, 800);
        }
    );

function DirABS(){ 
var pathname=location.pathname;  
	return(document.getElementById('Protocolo').value+'://'+location.hostname+":"+document.getElementById('Puerto').value+pathname.substring(0,(pathname.toUpperCase().indexOf('.NSF')+5)))  
}

function abrirAdjunto(unid,archivo){
	alert(unid);
	alert(archivo);
}