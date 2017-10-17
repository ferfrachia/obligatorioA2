package dominio;

public class Plantacion extends Punto{

	
	String nombre;
	String cedula_productor;
	int capacidad;
	
	
	public Plantacion(String nombre, Double coordX, Double coordY, String cedula_productor,
			int capacidad) {
		
		this.nombre=nombre;
		this.coordX=coordX;
		this.coordY=coordY;
		this.cedula_productor=cedula_productor;
		this.capacidad=capacidad;
		
	}
	
	public Plantacion() {
		
	}
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getCedula_productor() {
		return cedula_productor;
	}
	public void setCedula_productor(String cedula_productor) {
		this.cedula_productor = cedula_productor;
	}
	public int getCapacidad() {
		return capacidad;
	}
	public void setCapacidad(int capacidad) {
		this.capacidad = capacidad;
	}
	
	
	
	
}
