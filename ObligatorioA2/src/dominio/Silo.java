package dominio;

public class Silo extends Punto {

	String nombre;
	int capacidad;
	int remanente;

	public Silo(String nombre, Double coordX, Double coordY, int capacidad) {

		this.nombre=nombre;
		this.coordX=coordX;
		this.coordY=coordY;
		this.capacidad=capacidad;
	}

	public Silo() {

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

	
	public String toString () {
		return this.coordX + ";" + this.coordY+ ";" + this.capacidad + ";" + "falta capacidad remanente";
	}
	
	


}
