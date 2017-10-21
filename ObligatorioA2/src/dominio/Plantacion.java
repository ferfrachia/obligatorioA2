package dominio;

public class Plantacion extends Punto{

	public enum Tipo {
		SOJA, TRIGO, ARROZ
	};
	String nombre;
	Productor productor;
	int capacidad;
	Tipo tipo;
	
	
	public Plantacion(String nombre, Double coordX, Double coordY, Productor productor, Tipo tipo,
			int capacidad) {
		
		this.nombre=nombre;
		this.coordX=coordX;
		this.coordY=coordY;
		this.productor=productor;
		this.capacidad=capacidad;
		this.tipo = tipo;
	}
	
	public Plantacion() {
		
	}
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	
	public int getCapacidad() {
		return capacidad;
	}
	public void setCapacidad(int capacidad) {
		this.capacidad = capacidad;
	}
	
	
	
	
}
