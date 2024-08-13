# Conexión a Belvo
* Conectate a https://belvo.com/ 
* Necesitamos que recuperes las transacciones de una cuenta bancaria (Recuperar al menos 3 meses)
* Los datos recuperados deben ser categorizados y mostrados en una tabla para que veamos un estado de cuenta (tablas)
* No puedes utilizar el belvo widget o belvo client, o cualquier librería de belvo, tienes que usar directamente el API
* Con https://www.highcharts.com/ realiza algunas gráficas que muestren los resultados obtenidos, estos deberán estar en un mismo componente y deberán poder manipularse con base a algunos controles, entre más controles logres más puntos consideraremos.Importante todas las gráficas deben ser autocontenidas:
    * Diagrama de dispersión (Tamaño del marker acorde al tamaño relativo de la transacción, color acorde al tipo de transacción y por categoría el tipo de marker)
    * Histogramas comparativos
    * Por período de tiempo (Por mes, semana, día)
    * Valores descriptivos (ejem. Media, moda, etc.)
    * Gráficas temporales por grupos
    * Lo más importante, es una prueba pon todo tu empeño y dedicación a los detalles, tiene que ser altamente atractiva
    * Cuando termines comparte por acá los links a tu repositorio y a tu aplicación

# Correr app
1. Tener instalado yarn, en caso contrario hacer:
```
npm install --global yarn
```

2. Clonar el repo
3. Una vez clonado, instalar las dependencias:
```
yarn
```
4. Para correr el proyecto:
```
yarn run dev
```