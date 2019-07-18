
package Movilizadores;

import java.util.ArrayList;
import java.util.List;

public class Elemento {
    private List elementos = new ArrayList();

    public void addElemento(Object c){
        elementos.add(c);
    }
    /**
     * @return the elementos
     */
    public List getElementos() {
        return elementos;
    }

    /**
     * @param elementos the elementos to set
     */
    public void setElementos(List elementos) {
        this.elementos = elementos;
    }
}
