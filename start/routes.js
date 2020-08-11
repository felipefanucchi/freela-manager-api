'use strict'

const RouteGroup = require('@adonisjs/framework/src/Route/Group');

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

Route.post('/register', 'AuthController.store')
Route.post('/login', 'AuthController.login')

Route.post('/users', 'UserController.create')

Route.post('/session', 'SessionController.login')
Route.post('/session/recover', 'SessionController.recover')

// Logged in routes
Route.group(() => {
  // Customers routes
  Route.resource('customers', 'CustomerController')
    .apiOnly();
  Route.resource('customer/contacts', 'CustomerContactController')
    .apiOnly()
    .except(['index']);
}).middleware(['auth']);