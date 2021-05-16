# **alubio**

## **Instalación**.

    $ git clone https://github.com/crirompov/alubio
    //Nos vamos a la ruta del proyecto
    $ npm install
----
    Entramos en la carpeta DDBB y copiamos el contenido del archivo "CREATE_DATABASE.sql" a nuestro cliente SQL y lo ejecutamos. Con esto crearemos la base de datos. 
    Tras esto, debemos crear el usuario para dicha base de datos. Debemos darle los permisos necesarios. El nombre de usuario y contraseña deben ser: 
    Usuario: pixomaticcrpuser
    Password: pixomaticcrpuser

## **Ejecución**.

Normal: 

    npm run start

Modo debug

    npm run debug

## **Test**.

    Importar colección JSON a Postman y ejecutar

-----------
## **RETO C. Seguridad**.
No es seguro porque se podría hacer un ataque por fuerza bruta a los tokens y gracias a una posible cosilión en los tokens, una empresa ilegítima podría modificar datos de otra.
Para solventarlo, lo mejor es generar un token mediante JWT y una contraseña lo suficientemente larga como para que los tokens válidos sean solo generados por el servidor y se puedan evitar los ataques por cosilión gracias a la capacidad de cálculo de los ordenadores actuales. Es decir, en el supuesto caso de que una empresa usase un ordenador cuántico para hacer fuerza bruta al token generado para obtener la contraseña, podría obtener la contraseña con la que se genera de manera interna cada token. De momento no existe un ordenador de esas características que pueda ser costeado por una empresa. Por tanto, nos centramos en poner una contraseña lo suficientemente larga como para que no pueda ser crackeada.



## **Misión 3 & Reto B - Seguridad.**

**Helmet**:
Con Helmet configuramos la API de manera más segura para evitar multitud de ataques estableciendo cabeceras tales como:

*  csp establece la cabecera Content-Security-Policy para evitar ataques de scripts entre sitios y otras inyecciones entre sitios.
* hidePoweredBy elimina la cabecera X-Powered-By.
* hsts establece la cabecera Strict-Transport-Security que fuerza conexiones seguras (HTTP sobre SSL/TLS) con el servidor.
* ieNoOpen establece X-Download-Options para IE8+.
* noCache establece cabeceras Cache-Control y Pragma para inhabilitar el almacenamiento en memoria caché del lado de cliente.
* noSniff establece X-Content-Type-Options para evitar que los navegadores rastreen mediante MIME una respuesta del tipo de contenido declarado.
* frameguard establece la cabecera X-Frame-Options para proporcionar protección contra el clickjacking.
* xssFilter establece X-XSS-Protection para habilitar el filtro de scripts entre sitios (XSS) en los navegadores web más recientes.



**rateLimiter**:
 Bloqueamos a un usuario malicioso que trate de modificar una empresa distinta a la que indica en su token. Si el sistema determina que se ha intentado modificar más de 3 veces una empresa y ha habido un error, el usuario será bloqueado y se le enviará el mensaje: "Desde Alub.io te invitamos a unas alubias campeón"
 Además en caso de que haciendo 3 peticiones o más, en 3 de ellas haya errores consecutivos, también se bloqueará. De esta manera evitamos la fuerza bruta.

**Recurso no encontrado:** 
En caso de que un usuario trate de acceder a un recurso que no exista se le enviará el mensaje: "Desde Alub.io te invitamos a unas alubias campeón". Con esto evitamos el que un usuario malicioso intente hacer un ataque de directorio transversal al servidor.

**Saneado de parámetros:**
Con el saneamiento de los parámetros introducidos por URL o en el Body, evitamos el que se hagan inyecciones de código(SQLi, XSS, Command Injection, Remote Execution, etc.)

**Directorio Transversal y otras inyecciones en la URL:** Para comprobar el intento de explotación de vulnerabilidades via URL, como por ejemplo el Directorio Transversal, la redirección de URL, la ejecución de código en el servidor, etc. Además de apoyarnos en el recurso anteriormente comentado (Recurso no encontrado), se realiza también una comprobación por palabra clave, por si se se consigue bypasear el anterior filtro. En este momento, al ser una prueba técnica, solo comprobamos que en la URL no vaya la cadena: '../' podemos verla en el archivo "security" de la carpeta common. Lo ideal aquí es tener una base donde estén la mayor parte de palabras claves usadas y hacer un recorrido para comprobarlo. No obstante, con ese método sacrificaríamos parte del rendimiento de la API. Para realizar estas comprobaciones, en mi opinión, es mejor apoyarse de una herramienta externa tipo ElasticSearch, Needle.sh, entre otros. Ya que de esta manera, con los filtros correctos y el formato de log compatible con la herramienta podríamos comprobar todos los detalles de cada petición de manera externa a la API y sin perder rendimiento de esta. No obstante, esto no nos suprime el hecho de hacer las comprobaciones pertinentes para que un usuario malicioso no pueda explotar ninguna vulnerabilidad

----
Cuando se intente ejecutar una orden maliciosa se escribirá la petición en el archivo "error.txt" de la carpeta logs.

## Detalles:

Las tablas de la base de datos se eliminarán y se volverán a crear cada vez que la API sea ejecutada.

En postman es importante crear un entorno donde añadir la variable {{token_company}} 

En la colección postman las peticiones cuyo nombre comienzan con EXP, son las que intentan "Explotar" alguna vulnerabilidad. He hecho test de solo algunas. Pero en un entorno real se harían del resto tambié. Como mínimo del top 10 de OWASP