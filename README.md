# TDW-2
Taller Avanzado Desarrollo Web. / Integrantes: Rodrigo Flores Hernández / Carrera: Ingeniería de ejecución en computación e informática
Segunda parte del proyecto uso de Backend realizado con Adonis.js por exceso de conflictos en php artisan opte por utilizar adonis el cual tambien utiliza migraciones y seeders, utilice comandos:

adonis make:migration nombreMigracion
adonis make:model nombreModelo
adonis make:seed nombreSeeder
adonis make:controller nombreControlador --resource 

para crear: migraciones-Seeders-modelos-controladores 

para realizar migracion a la base de datos 
adonis migration:run 

para cargar Seeder
adonis migration:refresh --seed
