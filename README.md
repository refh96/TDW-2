# TDW-2
Taller Avanzado Desarrollo Web. / Integrantes: Rodrigo Flores Hernández / Carrera: Ingeniería de ejecución en computación e informática

Segunda parte del proyecto uso de Backend realizado con Adonis.js por exceso de conflictos en php artisan opte por utilizar adonis el cual tambien utiliza migraciones y seeders ya que esta basado en laravel, utilice comandos:

adonis make:migration nombreMigracion///

adonis make:model nombreModelo///

adonis make:seed nombreSeeder///

adonis make:controller nombreControlador --resource ///

para crear: migraciones-Seeders-modelos-controladores 

Para este proyecto utilice XAMPP control panel para utilizar los servicios de apache y mysql como base de datos y mediante el panel de phpmyadmin cree una base de datos llamada "backend" 

Posteriormente se crea el archivo .env en el proyecto para conectar a la base de datos(guiarce con el .env.example)

no olvidar ejecutar npm install para agregar las dependencias del proyecto

para realizar migracion a la base de datos utilizamos el comando:
adonis migration:run 

para el Seeder utilizamos el comando:
adonis migration:refresh --seed

para correr el proyecto utilizamos el comando: adonis serve --dev

Dentro de la carpeta backend podra encontrar un archivo .json con mi coleccion de INSOMNIA para que pueda revisar como ingrese los datos 
