'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Usuario
Route.post('/cadastro', 'UsuarioController.create')
Route.get('/listar', 'UsuarioController.read').middleware('auth')
Route.get('/listar/:id', 'UsuarioController.readById').middleware('auth')
Route.put('/atualizar/:id', 'UsuarioController.update').middleware('auth')
Route.delete('/deletar/:id', 'UsuarioController.delete').middleware('auth')

//Produtos
Route.post('/inserirProduto', 'ProdutoController.create').middleware('auth')
Route.get('/listarProduto', 'ProdutoController.show').middleware('auth')
Route.get('/listarProdutoComImg', 'ProdutoController.showWithImg').middleware('auth')
Route.get('/listarProduto/:id', 'ProdutoController.showById').middleware('auth')
Route.put('/atualizarProdutos/:id', 'ProdutoController.edit').middleware('auth')
Route.delete('/deletarProdutos/:id', 'ProdutoController.destroy').middleware('auth')

//Endereço
Route.group(() => {
    Route.resource('endereco', 'EnderecoController')
}).middleware('auth')

//Pedidos
Route.group(() => {
    Route.post('/pedidosCreate', 'PedidoController.criar')
    Route.get('/listarPedidoByUser', 'PedidoController.listarAllByUser')
    Route.get('/listarPedidoAllUser', 'PedidoController.listarTodosAllUser')
    Route.get('/listarPedidoById/:id', 'PedidoController.listarById')
    Route.delete('/deletePedido/:id', 'PedidoController.delete')
}).middleware('auth')


//Login
Route.post('/login', 'AuthController.login')

Route.on('/').render('welcome')

