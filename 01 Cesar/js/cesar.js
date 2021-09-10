var cesar = cesar || (function(){
    var proceso = function(txt, desp, action){
        var replace = (function(){
            //primero necesito tener la matriz del alfabeto
            //hay que recordar que el cifrado lo hace caracter por caracter
            var abc = ['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','ñ', 'o','p','q','r','s','t','u','v','x','y','z']
            var l = abc.length;
            //necesitamos obtener la posicion que va a venir por parte de la llave privada
            return function(c){
                //vamos a saber la posicion
                var i = abc.indexOf(c.toLowerCase());
                //necesitamos saber es donde estamos adentro de la matriz
                //como la vamos a recorrer y que pasa cuando llegue al final
                if(i!=-1){
                    //primero obtenemos la posicion para el desplazamiento
                    var pos = i;
                    if(action){
                        //cifrar para delante
                        pos += desp;
                        //como se va a mover
                        pos -= (pos >= l)?1:0;
                    }else{
                        //descifar para atras
                        pos -= desp;
                        //movimeinto
                        pos += (pos < 0)?1:0;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();
        //tenemos que saber que el texo este acorde al abc
        var re = (/([a-z])/ig);
        //una funcion que se encargue del intercambio
        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    return{
        encode : function(txt,desp){
            return proceso(txt,desp,true)
        },
        decode : function(text,desp){
            return proceso(text,desp,false)
        }
    };
})();

//funcion de cifrado

function cifrar(){
    document.getElementById('resultado').innerHTML = 
    cesar.encode(document.getElementById("cadena").Value, 3);
}

function descifrar(){
    document.getElementById('resultado').innerHTML = 
    cesar.decode(document.getElementById("cadena").Value, 3);
}