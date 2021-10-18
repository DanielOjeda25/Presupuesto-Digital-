//arreglos para almacenar los ingresos, egresos
const ingresos = [new Ingreso("Sueldos", 2220.1), new Ingreso("Venta", 1500.0)];

const egresos = [new Egreso("Pago", 1500.0), new Egreso("agua", 500)];

//creo una funcion que cargue con el body
let cargarApp = () => {
    //con cada cambio que se efectue en el cabecero se llamara a la siguiente funcion
    cargarCabecero();

    //cada momento que se efectue un cambio en la lista de ingresos se cargara dinamicamente
    cargarIngresos();

    //cuando se efectue en cambio en la lista de egresos y el porcentaje se vera reflejado
    cargarEgreso();
};

//funcion para calcular el total de los ingresos
let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
};

//esta funcion calcula el total de los egresos
let totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
};

//funcion para dar el formato Moneda
const formatoMoneda = (valor) => {
    return valor.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    });
};

//funcion para dar el formato al porcentaje
const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
    });
};
//Esta funcion le da dinamismo a el cabecero.
let cargarCabecero = () => {
    //calculo del total
    let presupuesto = totalIngresos() - totalEgresos();
    //variable que mostrara el porcentaje
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    //recuperamos los elementos HTML
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto); //presupuesto

    document.getElementById("porcentaje").innerHTML =
        formatoPorcentaje(porcentajeEgreso); //porcentaje

    document.getElementById("ingresos").innerHTML = formatoMoneda(
        totalIngresos()
    ); //llamada a la funcion que calcula el total de ingresos

    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos()); //llamada a la funcion que calcula el total de egresos
};

//con esta funcion podremos cargar ingresos y plasmarlo en la seccion de Ingresos
const cargarIngresos = () => {
    let ingresosHTML = "";
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

//con esta funcion cambiamos el elemento dinamicamente
const crearIngresoHTML = (ingreso) => {
    let ingresoHTMl = `<div class="elemento limpiarEstilos">
                    <div class="elemento__descripcion">${
                      ingreso.descripcion
                    }</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento__valor">${formatoMoneda(
                          ingreso.valor
                        )}</div>
                        <div class="elemento__eliminar">
                            <button class="elemento__eliminar--btn">
                  <ion-icon name="close-circle-outline"
                  onClick ='eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
                        </div>
                    </div>
                </div>`;
    return ingresoHTMl;
};

//con esta funcion daremos dinamimismo al icono de eliminar
//para poder sacar elementos del arreglo ingreso
const eliminarIngreso = (id) => {
    //si el id coincide con el indice se encontrara
    let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);

    //eliminamos o cortamos el arreglo con el indice
    ingresos.splice(indiceEliminar, 1);

    //volvemos a llamar a la funcion para recargar el valor del cabezero
    cargarCabecero();

    //refrescamos el valor de los ingresos
    cargarIngresos();
};
//funciones de egresos
const cargarEgreso = () => {
    let egresosHTML = "";
    for (let egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

//funcion que modificara el html de egresos

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `<div class="elemento limpiarEstilos">
                    <div class="elemento__descripcion">${
                      egreso.descripcion
                    }</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento__valor">${formatoMoneda(
                          egreso.valor
                        )}</div>
                        <div class="elemento__porcentaje">${formatoPorcentaje(
                          egreso.valor / totalEgresos()
                        )}</div>
                        <div class="elemento__eliminar">
                            <button class="elemento__eliminar--btn">
                  <ion-icon name="close-circle-outline"
                  onClick ='eliminarEgreso(${egreso.id})'></ion-icon>
                </button>
                        </div>
                    </div>
                </div>`;
    return egresoHTML;
};

const eliminarEgreso = (id) => {
    //si el id coincide con el indice se encontrara
    let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);

    //eliminamos o cortamos el arreglo con el indice
    egresos.splice(indiceEliminar, 1);

    //volvemos a llamar a la funcion para recargar el valor del cabezero
    cargarCabecero();

    cargarEgreso();
};

//con esta funcion agregaremos datos a la tabla de ingresos o egresos

let agregarDato = () => {
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];

    if (descripcion.value !== " " && valor.value !== " ") {
        if (tipo.value === "ingreso") {
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value === "egreso") {
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgreso();
        }
    }
};