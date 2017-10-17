package dominio;

public class Ciudad {

	String nombre;
	double coordX;
	double coordY;
	
	
	public Ciudad(String nombre, Double coordX, Double coordY) {
		this.nombre=nombre;
		this.coordX=coordX;
		this.coordY=coordY;
	}
	
	public Ciudad() {
		
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
	public double getCoordY() {
		return coordY;
	}
	public void setCoordY(double coordY) {
		this.coordY = coordY;
	}
	
	
	
	
}
