package controladoras;
import dominio.Retorno;
import dominio.Retorno.Resultado;
import funcionesAux.FuncionesAux;

public class Sistema implements ISistema {
	
	ControladoraProductor ctrlProductor;
	
	@Override
	public Retorno inicializarSistema(int cantPuntos) {
		Retorno ret = new Retorno();
		ctrlProductor = ControladoraProductor.getInstacia();
		
		//ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno destruirSistema() {
		Retorno ret = new Retorno();

		ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno registrarProductor(String cedula, String nombre, String direccion, String email, String celular) {
		Retorno ret = new Retorno();
		FuncionesAux faux = new FuncionesAux();
		
		ret =faux.validarEmail(email); 

		if (ret.resultado==Resultado.OK) {
			ret = faux.validarCedula(cedula);
			if(ret.resultado==Resultado.OK) {
				ret=faux.validarCelular(celular);
				if(ret.resultado == Resultado.OK) {
					if(ctrlProductor.registrarProductor(cedula, nombre, direccion, email, celular)) {
						ret.resultado =Resultado.OK;
					}else {
						ret.resultado=Resultado.ERROR_1;
						ret.valorString="Ya existe un Productor con cédula: " + cedula;
					}
				}
			}
		}
		return ret;
	}

	@Override
	public Retorno registrarCiudad(String nombre, Double coordX, Double coordY) {
		Retorno ret = new Retorno();

		ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno registrarPlantación(String nombre, Double coordX, Double coordY, String cedula_productor,
			int capacidad) {
		Retorno ret = new Retorno();

		ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno registrarSilo(String nombre, Double coordX, Double coordY, int capacidad) {
		Retorno ret = new Retorno();

		ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno registrarTramo(Double coordXi, Double coordYi, Double coordXf, Double coordYf, int peso) {
		Retorno ret = new Retorno();

		ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno eliminarTramo(Double coordXi, Double coordYi, Double coordXf, Double coordYf) {
		Retorno ret = new Retorno();

		ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno eliminarPunto(Double coordX, Double coordY) {
		Retorno ret = new Retorno();

		ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno mapaEstado() {
		Retorno ret = new Retorno();

		ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno rutaASiloMasCercano(Double coordX, Double coordY) {
		Retorno ret = new Retorno();

		ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno listadoDePlantacionesEnCiudad(Double coordX, Double coordY) {
		Retorno ret = new Retorno();

		ret.resultado = Resultado.NO_IMPLEMENTADA;

		return ret;
	}

	@Override
	public Retorno listadoDeSilos() {
		Retorno ret = new Retorno();
		//ret.resultado = Resultado.NO_IMPLEMENTADA;
		
		ret.resultado = Resultado.OK;
		return ret;
	}

	@Override
	public Retorno listadoProductores() {
		Retorno ret = new Retorno();
		//ret.valorString=ctrlProductor.listarProductores();
		ctrlProductor.listarProductores();
		/*
		if (ret.valorString!="") {
			ret.resultado = Resultado.OK;
		}else{
			ret.valorString="No existen Productores en el sistema";
			ret.resultado=Resultado.ERROR_1;
		}*/
		return ret;
	}

}
