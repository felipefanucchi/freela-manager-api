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
const User = use("App/Models/User")

Route.get('/', async () => {
  const user = await User.create({
    name: 'Felipe Fanucchi',
    email: 'flfanucchi@gmail.com',
    phone: '11983086001',
    password: '123456'
  });

  return { user }
})

// Route.group(() => {
// }).middleware(['auth']);

// Customers routes
Route.resource('customers', 'CustomerController').apiOnly();
