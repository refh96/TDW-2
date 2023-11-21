'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.resource('dogs','DogController').apiOnly();
Route.resource('interaccions','InteraccionController').apiOnly();
Route.post('cargar_foto/:id', 'DogController.cargarFoto');
Route.post('/dogs/preferencias', 'InteraccionController.guardarPreferencias');
Route.get('/dogs/:id/aceptados', 'InteraccionController.perrosAceptados');
Route.get('/dogs/:id/rechazados', 'InteraccionController.perrosRechazados');

