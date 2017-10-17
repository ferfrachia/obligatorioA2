package dominio;

public class Silo {

	String nombre;
	double coordX;
	double coorY;
	int capacidad;


	public Silo(String nombre, Double coordX, Double coordY, int capacidad) {

		this.nombre=nombre;
		this.coordX=coordX;
		this.coorY=coordY;
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
	public double getCoordX() {
		return coordX;
	}
	public void setCoordX(double coordX) {
		this.coordX = coordX;
	}
	public double getCoorY() {
		return coorY;
	}
	public void setCoorY(double coorY) {
		this.coorY = coorY;
	}
	public int getCapacidad() {
		return capacidad;
	}
	public void setCapacidad(int capacidad) {
		this.capacidad = capacidad;
	}





}
