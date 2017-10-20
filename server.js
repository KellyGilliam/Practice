const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const compiler = webpack(webpackConfig);
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const toDoController = require('./server-mongoose/controllers/toDoController');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://sampleuser:samplepassword@ds147902.mlab.com:47902/practicecruddatabase');
mongoose.connection.once('open', (err, success) => {
  if (err) console.log('NOOOOOOOO');
  console.log('CONNECTED YAYYYYY');
})
 
app.use(express.static(__dirname + '/www'));  //lets things load right away without individual requests?
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(bodyParser.urlencoded({ extended: true })); //YOU NEED THIS!
app.use(bodyParser.json());
// const cookieParser = require('cookie-parser')



// app.get('/styless.css', (req, res) => {
//     res.sendfile('./styles.css');
// })

// app.get('/styles.css', (req, res) => {
//     res.setHeader({'content-type': 'text/html; charset=UTF-8'});
//     res.statusCode(200);
// })

// app.get('/jquery.js', (req, res) => {
//     res.sendfile('/jquery.js');
// })

// app.get('/jquery.js', (req, res) => {
//     res.setHeader({'content-type': 'application/json; charset=UTF-8'});
//     res.statusCode(200);
// })

// app.get('/main.js', (req, res) => {
//     res.sendfile('./src/main.js');
// })

// app.get('/main.js', (req, res) => {
//     res.setHeader({'content-type': 'application/json; charset=UTF-8'});
//     res.statusCode(200);
// })

app.post('/createToDoItem', toDoController.create);
app.get('/getToDoList', toDoController.getAllToDos);
app.post('/removeToDo', toDoController.removeToDo);
// app.post('/updateToDo', toDoController.updateToDo);

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});