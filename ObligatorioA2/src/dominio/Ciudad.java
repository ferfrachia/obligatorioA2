package dominio;

public class Ciudad extends Punto{

	String nombre;
	
	
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
	
	
}
