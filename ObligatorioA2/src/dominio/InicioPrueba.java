package dominio;

public class InicioPrueba {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Sistema s = new Sistema();
		Retorno r = new Retorno();
		
		s.inicializarSistema(2);
		
		r=s.registrarProductor("1234567", "tincho", "aaaaa", "sdadsad.com", "4343434");
		System.out.println(r.valorString);
		r=s.registrarProductor("12345678", "tincho2", "vbbbbbb", "s3323dad@sad.com", "4123434");
		r=s.listadoProductores();
		System.out.println(r.valorString);
	}

}
