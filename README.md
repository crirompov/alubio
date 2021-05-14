# alubio






#### RETO C. Seguridad.
No es seguro porque se podría hacer un ataque por fuerza bruta a los tokens y gracias a una posible cosilión en los tokens, una empresa ilegítima podría modificar datos de otra.
Para solventarlo, lo mejor es generar un token mediante JWT y una contraseña lo suficientemente larga como para que los tokens válidos sean solo generados por el servidor y se puedan evitar los ataques por cosilión gracias a la capacidad de cálculo de los ordenadores actuales. Es decir, en el supuesto caso de que una empresa usase un ordenador cuántico para hacer fuerza bruta al token generado para obtener la contraseña, podría obtener la contraseña con la que se genera de manera interna cada token. De momento no existe un ordenador de esas características que pueda ser costeado por una empresa. Por tanto, nos centramos en poner una contraseña lo suficientemente larga como para que no pueda ser crackeada.