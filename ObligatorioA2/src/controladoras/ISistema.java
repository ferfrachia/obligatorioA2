package controladoras;

import dominio.Retorno;

public interface ISistema {

	public Retorno inicializarSistema (int cantPuntos);
	public Retorno destruirSistema();
	public Retorno registrarProductor(String cedula, String nombre, String direccion, String email, String celular);
	public Retorno registrarCiudad(String nombre, Double coordX, Double coordY);
	public Retorno registrarPlantación(String nombre, Double coordX, Double coordY, String cedula_productor, int capacidad);
	public Retorno registrarSilo(String nombre, Double coordX, Double coordY, int capacidad);
	public Retorno registrarTramo(Double coordXi, Double coordYi, Double coordXf, Double coordYf, int peso);
	public Retorno eliminarTramo(Double coordXi, Double coordYi, Double coordXf, Double coordYf);
	public Retorno eliminarPunto(Double coordX, Double coordY);
	public Retorno mapaEstado();
	public Retorno rutaASiloMasCercano(Double coordX, Double coordY);
	public Retorno listadoDePlantacionesEnCiudad(Double coordX, Double coordY);
	public Retorno listadoDeSilos();
	public Retorno listadoProductores();

}
