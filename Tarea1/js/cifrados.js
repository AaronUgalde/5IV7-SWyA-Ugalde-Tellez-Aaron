var cesar = cesar || (function(){
    var proceso = function(txt, desp, action){
        var replace = (function(){
            //primero necesito tener la matriz del alfabeto
            //hay que recorrar que el cifrado lo hace caracter por caracter
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
                        'm', 'n','ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 
                        'x', 'y', 'z'];
            var l = abc.length;

            //necesitamos obtener la posicion que va  a venir por parte 
            //de la llave privada

            return function(c){
                //vamos a saber la posicion
                var i = abc.indexOf(c.toLowerCase());
                //necesitamos saber es donde estamos adentro de la matriz
                //como la vamos a recorrer y que pasa cuando llegue
                //al final?
                //alert(c);
                //alert(i);

                if(i != -1){
                    //primero obtenemos la posicion para el desp
                    var pos = i;
                    //que voy a hacer cifrar o descifrar
                    if(action){
                        //cifrar para adelante
                        pos += desp;
                        //como se va a mover
                        pos -= (pos >= l)?l:0;
                    }else{
                        //descifrar para atras
                        pos -= desp;
                        //movimiento
                        pos += (pos < 0)?l:0;
                    }
                    return abc[pos];

                }
                return c;
            };
        })();
        //tenemos que saber que el texto este acorde al abc
        var re = (/([a-zñ ])/ig);
        //una funcion que se encargue del intercambio
        return String(txt).replace(re, function(match){
            return replace(match);
        });
        
    };

    return{
        a : function(txt, desp){
            return proceso(txt, desp, true);
        },

        b : function(txt, desp){
            return proceso(txt, desp, false);
        }
    };
})();

/*
Vamos a realizar el algoritmo para el cifrado simetrico de viggenere
*/


const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z'];

//llave
let key = "";
//funcion de cifrado

$('input:radio[name=tipoDeCifrado]').change(function(){
let cifrado = $('input:radio[name=tipoDeCifrado]:checked').val()
if(cifrado === "vigenere"){
    console.log("estas en vig")
    document.getElementById('Clave').style.display = "block"
    document.getElementById('Desplazamiento').style.display = "none"
    $("#Cifrar").off("click");
    $("#Descifrar").off("click");
    $('#Cifrar').click(function(){
        console.log("estas cifrando en vig")
        //para cifrar vamos a usar la funcion
        // y = (x+z)mod27 pq estamos usando la ñ
        //vamos a traer los datos de los campos de texto
        key = document.getElementById('clave').value;
        //vamos a verificar los datos
        key = key.replace(/ /g, '');
        //obtener el mensaje
        let mess = document.getElementById('mensaje').value;
        mess = mess.replace(/ /g, '');
        let newMess = "";
        let keyComplete = "";
        //algoritmo
        if(revision(mess, key)){
            for(var i = 0; i<mess.length; i++){
                keyComplete += key.charAt((i%Number(key.length)));
                }
                for(var i = 0; i<mess.length; i++){
                    //obtener la poscion de la letra por letra del mensaje
                    let charr = mess.charAt(i);
                    let posm = getPosition(charr);
                    charr = keyComplete.charAt(i);
                    let posk = getPosition(charr);
                    //ejecutamos el algoritmo
                    let newVal = change(posm, posk);
                    newMess += abc[newVal];  //mensaje cifrado
                }
                //imprimir el resultado
                document.getElementById('mensajeNuevo').value = newMess;
        }else{
                //aqui es si no se cumple las condiciones
            }
    });
    $('#Descifrar').click(function(){
        //para cifrar vamos a usar la funcion
        // y = (x+z)mod27 pq estamos usando la ñ
        //vamos a traer los datos de los campos de texto
        key = document.getElementById('clave').value;
        //vamos a verificar los datos
        key = key.replace(/ /g, '');
        //obtener el mensaje
        let mess = document.getElementById('mensaje').value;
        mess = mess.replace(/ /g, '');
        let newMess = "";
        let keyComplete = "";
        //algoritmo
        if(revision(mess, key)){
            for(var i = 0; i<mess.length; i++){
                keyComplete += key.charAt((i%Number(key.length)));
            }
            for(var i = 0; i<mess.length; i++){
                //obtener la poscion de la letra por letra del mensaje
                let charr = mess.charAt(i);
                let posm = getPosition(charr);
                charr = keyComplete.charAt(i);
                let posk = getPosition(charr);
                //ejecutamos el algoritmo
                let newVal = rechange(posm, posk);
                newMess += abc[newVal];  //mensaje decifrado
                }
                //imprimir el resultado
                document.getElementById('mensajeNuevo').value = newMess;
        }else{
                //aqui es si no se cumple las condiciones
            }
    });}else{
        console.log("estas en cesar")
        document.getElementById('Clave').style.display = "none"
        document.getElementById('Desplazamiento').style.display = "block"
        $("#Cifrar").off("click");
        $("#Descifrar").off("click");
    $('#Cifrar').click(function (){
        console.log("estas cifrando en ces")
        document.getElementById("mensajeNuevo").value =
        cesar.a(document.getElementById("mensaje").value, parseInt(document.getElementById("desplazamiento").value));
    });
    $('#Descifrar').click(function (){
        document.getElementById("mensajeNuevo").value =
        cesar.b(document.getElementById("mensaje").value, parseInt(document.getElementById("desplazamiento").value));
    });}
});

//cambio

function change(posm, posk){
    //aplicamos y = (x+z)mod27
    let y = (posm+posk)%27;
    return y;
}

function rechange(posm, posk){
    let val = 0;
    if((posm-posk)>=0){
        val = (posm-posk)%27;
    }else{
        val = (posm-posk+27)%27;
    }
    return val;
}

function getPosition(letra){
    let position = abc.indexOf(letra);
    return position;
}

function revision(mess, desp){
    //validar la entrada de los datos
    //expresion regular
    const re = /^([a-zñ?]+([]*[a-zñ?]?['-]?[a-zñ?]+)*)$/

    var acc = true;

    if(!re.test(mess)){
        sd();
        acc = false;
    }
    if(!re.test(desp)){
        sdd();
        acc = false;
    }
    if(desp.length > mess.length){
        sz();
    }
    return acc;
}

function sd(){
    //alert para decir que el texto no ha sido aceptado
    swal({
        title:"Error",
        text:"El texto ingreso no ha sido aceptado, ingrese solo minuscilas y evite numeros y simbolos",
        icon: 'error'
    });

}


function sdd(){
    //alert para decir que el texto no ha sido aceptado
    swal({
        title:"Error",
        text:"La clave ingresa es incorrecta, no cumple con las normas de solo minusculas y no usar numeros y/o simbolos",
        icon: 'error'
    });

}

function sz(){
    //alert para decir que el texto no ha sido aceptado
    swal({
        title:"Error",
        text:"La clave no puede ser mayor que el mensaje",
        icon: 'error'
    });

}