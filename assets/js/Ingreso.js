class Ingreso extends Dato {
    //esta variable se encargara de dar un identificador unico a cada objeto de la clase Dato
    static contadorIngresos = 0;

    constructor(descripcion, valor) {
        //con el metodo super mando a traer los metodos del constructor de la clase padre
        super(descripcion, valor);
        //genero un atributo ID y lo preincremento a la variable estatica.
        this._id = ++Ingreso.contadorIngresos;
    }
    get id() {
        return this._id;
    }
}