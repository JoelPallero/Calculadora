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
    if (!operando) {
        if (num[0] == null) {
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

//num[2] es el donde va el signo de la operacion
const operacionSigno = function(signoElegido){
    if(operando == true && num[2] != undefined && num[1] != undefined){
        num[2] = signoElegido;
        num[0] = num[4];
        num[3] = num[0] + ' ' + num[2] + ' ';
        document.getElementById('acumulador').value = num[3];
        num[1] = undefined;
    }else{
        let caracter = num[3].charAt(num[3].length-1)
        if(caracter == ' ' && signoElegido != '∛' && signoElegido != '√'){
            num[2] = signoElegido;
            num[3] = num[0] + ' ' + num[2] + ' ';
            document.getElementById('acumulador').value = num[3];
        }else{
            /* La operacion no entra en este if */
            if(num[4] != undefined && signoElegido == '√' || signoElegido == '∛'){
                num[2] = signoElegido;
                num[3] = num[2] + num[1];
                document.getElementById('acumulador').value = num[3];
                document.getElementById('resultado').value = '';
                console.log(num[1] + ' ' + num[2])
            }else{
                if(signoElegido == '√' || signoElegido == '∛'){
                    num[2] = signoElegido;
                    num[3] = num[2];
                    operando = true;
                    document.getElementById('acumulador').value = num[3];
                    console.log(num[1] + ' ' + num[2])
                }
                else{
                    if(num[1] == undefined && num[0] != undefined){
                        num[2] = signoElegido;
                        num[3] += ' ' + num[2] + ' ';
                
                        operando = true;
                        coma = false;
                        document.getElementById('acumulador').value = num[3];
                    }
                    else{
                        document.getElementById('acumulador').value = 'ERROR';
                    }
                }
            }
        }
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
