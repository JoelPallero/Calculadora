//operaciones de resultado y acumulacion
let operando = false;
let num = [];
let coma = false;
let strAcum;

//Funcion para tomar el value de cada boton de numeros presionado
//incluyendo el punto
function operador(queHago){
    if (!isNaN(queHago) || queHago === '.'){
        acumular(queHago);
    }
}

// Aca vamos a rellenar el array que va a contener los datos para operar
// num[0] es el primer numero y num[1] es el segundo.
const acumular = function(agregar){

    //Hacer que despues de un tiempo de 30s
    //Cualquier digitacion numerica, haga resetear variables
    //y realizar operacioes como si recie se encendiera la calculadora.
    if(operando && num[4] != null || num[4] != undefined){
        clearScreen();
        operando = false;
        acumular(agregar);
    }else{
        if (!operando) {
            if (num[0] == undefined) {
                num[0] = agregar;
                num[3] = agregar;
            }
            else if (agregar == '.' && !coma) {
                num[0] += '.';
                parseFloat(num[0]);            
                num[3] += agregar;
                coma = true;
            }
            else{
                if(agregar != '.'){
                    num[0] += agregar;
                    num[3] += agregar;
                }
            }
        }else{
            if (num[1] == null){
                num[1] = agregar;
                num[3] += agregar;
            }else if (agregar == '.' && !coma) {
                num[1] += '.';
                parseFloat(num[1])
                num[3] += agregar;
                coma = true;
            }
            else{
                if(agregar != '.'){
                    num[1] += agregar;
                    num[3] += agregar;
                }
            }        
        }
        document.getElementById('acumulador').value = num[3];
    }
}

//num[2] es el donde va el signo de la operacion
const operacionSigno = (signoElegido) => {
    operando = true;
    //Verificacion para saber si el signo es una raiz
    if(signoElegido == '√' || signoElegido == '∛'){
        if(num[4] == undefined){
            num[2] = signoElegido;
            num[3] = signoElegido;
        }
        else{
            num[1] = parseFloat(document.getElementById('resultado').value);
            num[2] = signoElegido;
            num[3] = signoElegido + parseFloat(document.getElementById('resultado').value);
            operacion();
        }
        document.getElementById('acumulador').value = num[3];
    }
    else{
        if(num[4] != undefined || num[4] != null){
            num[0] = parseFloat(document.getElementById('resultado').value);
            num[2] = signoElegido;
            document.getElementById('resultado').value = '';
            num[1] = undefined;
            num[4] = undefined;
        }
        else{
            if(num[1] != undefined || num[1] != null){
                operacion();
                num[0] = parseFloat(document.getElementById('resultado').value);
                num[2] = signoElegido;
                num[1] = undefined;
                num[4] = undefined;
                
            }
            else{
                num[2] = signoElegido;
            }
        }
        num[3] = num[0] + ' ' + signoElegido + ' ';
        document.getElementById('acumulador').value = num[3];
    }
}

//Se ejecuta con el igual, '=', para ya realizar la operacion final
//y dar el resultado
const operacion = function(){
    let res;
    if (num[2] != undefined) {
        let signo = num[2];
        switch (signo) {
            case '+':
                res = parseFloat(num[0]) + parseFloat(num[1]);
                break;        
            case '-':
                res = parseFloat(num[0]) - parseFloat(num[1]);
                break;
            case '*':
                res = parseFloat(num[0]) * parseFloat(num[1]);
                break;
            case '/':
                res = parseFloat(num[0]) / parseFloat(num[1]);
                break;
            case '√':
                res = Math.sqrt(num[1]);
                break;
            case '∛':
                res = Math.cbrt(num[1]);
                break;
            case '^':
                res = Math.pow(num[0], num[1]);
                break;
        }

        num[4] = res;
        
    }else{
        num[4] = num[0];
    }
    document.getElementById('resultado').value = num[4];
}

//restauramos todas las variables
const clearScreen = () => {
    document.getElementById('acumulador').value = '';
    document.getElementById('resultado').value = '';
    operando = false;
    coma = false;
    num = [];
}

const clearLastOne = () =>{
    acumulador = document.getElementById('acumulador').value;
    toString(acumulador);    

    if(num[1] != null){
        toString(num[1]);
        acumulador = acumulador.substring(0, acumulador.length -1);
        num[1] = num[1].substring(0, num[1].length -1);
        if(num[1].length == 0){
            num[1] = null;
        }
    }
    else if(num[1] == null && num[2] != null){
        num[3] = num[3].substring(0, num[3].length -3);
        num[2] = null;
        operando = false;
    }
    else{
        toString(num[0]);
        acumulador = acumulador.substring(0, acumulador.length -1);
        num[0] = num[0].substring(0, num[0].length -1);
        if(num[0].length == 0){
            num[0] = null;
            acumulador = null;
        }
    }
    document.getElementById('acumulador').value = acumulador;
}

//obtener el ultimo caracter de una cadena de texto
function getCharAt(str) {
    return str.charAt(str.length-1);
}
