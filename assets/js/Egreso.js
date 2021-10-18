class Egreso extends Dato {
    //esta variable se encargara de dar un identificador unico a cada objeto de la clase Dato
    static contadorEgresos = 0;

    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._id = ++Egreso.contadorEgresos;
    }
    get id() {
        return this._id;
    }
}