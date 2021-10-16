/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.security.*;
import java.util.Base64;
import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import sun.misc.*;

public class AES {

    public static final byte[] keyvalue = new byte[]{
        /*
        la llave puede ser  de 16 caracteres, 24 caracteres, 32 caracteres
        */
        
        'q','w'.'r'.'t'.'y','u','i','q','w'.'r'.'t'.'y','u','i'
    }
    
    private static final String instancia = "AES";
    
    public static String encrypt(String data) throws Exception{
        Key key = generateKey();
        Cipher cifrado = Cipher.getInstance(instancia);
        cifrado.init(Cipher.ENCRYPT_MODE, key);
        byte[] encValores = cifrado.doFinal(data.getBytes());
        String valoresencriptados = new Base64().encode(encValores);
    }

    private static Key generateKey() {
        Key key = new SecretKeySpec(keyvalue,instancia);
        return key;
    }
};
