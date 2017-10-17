package funcionesAuxiliares;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FuncionesAux {
	
	
	private Pattern pattern;
	private Matcher matcher;

	private static final String EMAIL_PATTERN =
		"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
		+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
	
	
	public FuncionesAux() {
		
	}
	
	public boolean validarEmail(String email) {
		pattern = Pattern.compile(EMAIL_PATTERN);
		
		matcher = pattern.matcher(email);
		return matcher.matches();
	}
	
	public boolean validarCedula(String ci) {
		
		return false;
	}

	
}
