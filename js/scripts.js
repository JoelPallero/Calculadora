// La vamos a hacer simple.
// Vamos a asignarle un valor a cada boton
// Y una funcion igual. Pero vamos a tomar el valor de cada boton
// que para cada boton esdiferente y ahi vamos a realizar las
// asignaciones a las variables y a realizar las operaciones

let cumulo;
let operadorFinal;
let numA;
let numB;
let resFinal;

console.log(operadorFinal)

function Actumulativo(num) {

    if(resFinal !== undefined){
        AllClear();
        AcumulativoFinal(num);
    }
    else{
        AcumulativoFinal(num);
    }
}

function AcumulativoFinal(numero){
    // Verifiquemos primero si hay resultados ya registrados en el programa
    // Para borrarlos y resetear los controles.
    

    // Primero verificamos si hay algun operador previo
    // porque si hay operadores, entonces los numeros
    // que siguen del operador, deben irse a la variable 2
    // Siempre las operaciones terminan siendo entre 2 numeros.


    if (operadorFinal === undefined) {
        // Si la vasriable 1 no tiene datos, entonces esta es la primera en llenarse.
        // Pero esto lo hago ya que es un acumulativo(NO es una sumatoria). Cuando estan inicializadas
        // las variables como null o undefined, los valores 'null' y 'undefined'
        // se acumulan tmb.. alto perno. xD
        // No se me ocurrio otra forma mas simple, asique hago las comprobaciones
        // y si esta null o unidefined, lo que hago inicializar la variable

        if (numA === undefined) {
            numA = numero
        } else {
            // si ya esta inicializada, solo hago las acumulaciones de los numeros que 
            // se van seleccionando
            numA = numA + numero;
        }
        document.getElementById("final").value = numA;
    } else {
        // aca aplico el mismo principio que aplique en la variable anterior
        // para evitar acumulaciones de terminos no deseados.s
        if (numB === undefined) {
            numB = numero;
        } else {
            numB = numB + numero;
        }
        document.getElementById("final").value = numB;
    }

    // esta variable 'sumatoria; en realidad
    if (cumulo === undefined) {
        cumulo = numero;
    } else {
        cumulo = cumulo + numero;
    }
    console.log(cumulo);

    //vamos a ir mostrando los resultados y los numeros que vamos ingresando.
    document.getElementById("acumulativo").value = cumulo;
}

function operador(operador) {
    // primero verificamos si la operacion ya tiene un signo al final de la cadena.
    let longitudcumulo = cumulo.slice(-1);

    // si ya tiene uno al final de la cadena, entonces solo lo vamos a reemplazar.
    if (longitudcumulo === '+' ||
        longitudcumulo === '-' ||
        longitudcumulo === '*' ||
        longitudcumulo === '/') {

        // reasignamos el operador
        operadorFinal = operador;

        // borramos el operador anterior en el acumulativo
        cumulo = cumulo.slice(0, -1);

        //cambiamos el signo de operacion en la sumatoria.
        cumulo = cumulo + operador;
    } else {
        // si ya lo tiene y no esta al final de la cadena, entonces temos que realizar la operacion, 
        // asignar el resultado a la variable numA y luego agregarle el signo al final para poder realizar otra operacion.
        if (numB !== undefined) {
            Resultado();
            operadorFinal = operador;
            numA = resFinal;
            cumulo = numA + operadorFinal;
            numB = undefined;
        } else {
            // si no cumple ninguna de las opciones anteriores, entonces es una operacion nueva.
            operadorFinal = operador;
            cumulo = cumulo + operador;
        }
    }
    document.getElementById("acumulativo").value = cumulo;
    console.log(typeof numA);
}


function Resultado() {
    if(operadorFinal !== undefined){
        switch (operadorFinal) {
            case '+':
                resFinal = parseFloat(numA) + parseFloat(numB);
                break;
            case '-':
                resFinal = parseFloat(numA) - parseFloat(numB);
                break;
            case '*':
                resFinal = parseFloat(numA) * parseFloat(numB);
                break;
            case '/':
                resFinal = parseFloat(numA) / parseFloat(numB);
                break;
        }
            
        document.getElementById("final").value = resFinal;        
        operadorFinal = undefined;
    }
}


function Delete() {
    

    // Antes de ir borrando el ultimo elemento vamos a verificar
    // si las variables de 
    if(numB !== undefined){
        numB = numB.slice(0, -1);
        document.getElementById("final").value = numB;

        // si no tiene datos, la declaramos como undefined
        if (numB.lenght === 0){
            numB = undefined;
        }

    }
    else{
        // Si el signo de operacion esta definido entonces lo boramos
        if(operadorFinal !== undefined){
            operadorFinal = undefined;
        }
        else{
            // Y si ya esta borrado el signo de operacion
            // o si no tienen datos las variables de operadorFinal
            // ni numb2, entonces borramos los datos de la variable numA 
            cambiarDataType(numA);
            numA = numA.slice(0, -1);
            document.getElementById("final").value = numA;
            
            // si no tiene datos, la declaramos como undefined
            if (numA.lenght == 0){
                numA = undefined;
            }
        }
    }
    cumulo = cumulo.slice(0, -1);
    
    // si no tiene datos, la declaramos como undefined
    if (cumulo.lenght === 0){
        cumulo = undefined;
        document.getElementById("acumulativo").value = '';
    }
    else{
        document.getElementById("acumulativo").value = cumulo;
    }
    resFinal = undefined;
}

function AllClear() {
    numA = undefined;
    numB = undefined;
    cumulo = undefined;
    resFinal = undefined;
    operadorFinal = undefined;
    document.getElementById("acumulativo").value = '';
    document.getElementById("final").value = 0;
}

function cambiarDataType(datoParaCambiar){
    return datoParaCambiar.toString();
}