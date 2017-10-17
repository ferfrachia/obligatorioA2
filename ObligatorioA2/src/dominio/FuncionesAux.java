package dominio;


import java.util.regex.Matcher;
import java.util.regex.Pattern;

import dominio.Retorno.Resultado;

public class FuncionesAux {


	private Pattern pattern;
	private Matcher matcher;

	private static final String EMAIL_PATTERN =
			"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
					+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";


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

	public boolean validarCedula(String ci) {
		/*
		if(ci.length() != 7 && ci.length() != 8){ 
			return false; 
		}else{ 
			try{ 
				Integer.parseInt(ci); 
			}catch (NumberFormatException e){ 
				return false; 
			} 
		} 

		int digVerificador = Integer.parseInt((ci.charAt(ci.length() - 1)) + "" ) ; 
		int[] factores; 
		if(ci.length() == 7){ // CI viejas 
			factores = new int[]{9, 8, 7, 6, 3, 4}; 
		}else{ 
			factores = new int[]{2, 9, 8, 7, 6, 3, 4}; 
		} 


		int suma = 0; 
		for(int i=0; i<ci.length()-1; i++ ){ 
			int digito = Integer.parseInt(ci.charAt(i) + "" ) ; 
			suma += digito * factores[ i ]; 
		} 

		int resto = suma % 10; 
		int checkdigit = 10 - resto; 

		if(checkdigit == 10){ 
			return (digVerificador == 0); 
		}else { 
			return (checkdigit == digVerificador) ; 
		} 
		*/
		return false;
	} 

}

