/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

const UsersController = () => import('#controllers/users_controller')

router.get('user/', [UsersController, 'index'])
router.post('user/', [UsersController, 'store'])
router.put('user/:id', [UsersController, 'update'])
router.delete('user/:id', [UsersController, 'delete'])
