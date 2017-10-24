package controladoras;

import dominio.Retorno;

public class InicioPrueba {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Sistema s = new Sistema();
		Retorno r = new Retorno();
		
		s.inicializarSistema(2);
		
		r=s.registrarProductor("39089194", "Martin D", "aaaaa", "prueba@mdv.com", "049290995");
		System.out.println(r.valorString);
		r=s.registrarProductor("4392858", "Fernando F", "vbbbbbb", "hola@gmail.com", "099872334");
		System.out.println(r.valorString);
		r=s.listadoProductores();
		//System.out.println(r.valorString);
	}

}
