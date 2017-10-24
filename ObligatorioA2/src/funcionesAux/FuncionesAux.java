package funcionesAux;


import java.util.regex.Matcher;
import java.util.regex.Pattern;
import dominio.Retorno;
import dominio.Retorno.Resultado;

public class FuncionesAux {


	private Pattern pattern;
	private Matcher matcher;

	private static final String EMAIL_PATTERN =
			"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
					+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
	
	private static final String CEDULA_PATTERN =
			"[0-9]{6,8}$";
	
	private static final String CELULAR_PATTERN =
			"09{1,2}[0-9]{7}$";


	public FuncionesAux() {

	}

	
	public Retorno validarEmail(String email) {
		pattern = Pattern.compile(EMAIL_PATTERN);
		matcher = pattern.matcher(email);
		Retorno ret = new Retorno();
		
		if(matcher.matches()) {
			ret.resultado = Resultado.OK;
			return ret;	
		}else {
			ret.resultado = Resultado.ERROR_1;
			ret.valorEntero=1;
			ret.valorString="El email no cumple con el formato de direcciones.";
			return ret;	
		}
		
	}
	
	public Retorno validarCelular (String celular) {
		pattern = Pattern.compile(CELULAR_PATTERN);
		matcher = pattern.matcher(celular);
		Retorno ret = new Retorno();
		
		if(matcher.matches()) {
			ret.resultado = Resultado.OK;
			return ret;	
		}else {
			ret.resultado = Resultado.ERROR_1;
			ret.valorEntero=1;
			ret.valorString="El número de celular no es correcto.";
			return ret;	
		}
	}
	
	public Retorno validarCedula(String ci) {
		Retorno ret = new Retorno();
	
		pattern = Pattern.compile(CEDULA_PATTERN);
		matcher = pattern.matcher(ci);
		
		if(matcher.matches()) {
			ret.resultado = Resultado.OK;
			return ret;	
		}else {
			ret.resultado = Resultado.ERROR_1;
			ret.valorEntero=1;
			ret.valorString="El número de cédula no es correcto.";
			return ret;	
		}
	} 

}

