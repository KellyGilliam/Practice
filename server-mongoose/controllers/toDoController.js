const ToDo = require('./../models/toDoModel');

const toDoController = {};

toDoController.create = (req, res) => {
  console.log('NEW TO DO:', req.body);
  ToDo.create({ "toDoItem": req.body.toDoItem }, function (err, success) {
    if (err) {
      res.send(err);
    } else if (success) {
      res.send(success);
    }
  })
}

toDoController.getAllToDos = (req, res) => {
  console.log(req.body);
  ToDo.find(req.body, (function (err, found) {
    if (found) {
      res.send(found.map((el => el.toDoItem)));
    } else {
      console.log('error');
      res.send(err);
    }
  }))
};

toDoController.removeToDo = (req, res) => {
  console.log('BODY is:', req.body.toDoItem);
  let itemToRemove = req.body.toDoItem;
  ToDo.remove({ toDoItem: itemToRemove }, function (err) {
    if (err) return handleError(err);
    // removed!
  });
  // ToDo.findOne({"toDoItem": "Buy Turkey"}).remove();  
  // ToDo.findByIdAndRemove(req.body.toDoItem, (err, todo) => {
  //   // We'll create a simple object to send back with a message and the id of the document that was removed
  //   // You can really do this however you want, though.
  //   // let response = {
  //   //   message: "Todo successfully deleted",
  //   //   id: todo._id
  //   // };
  //   // res.status(200).send(response);
  // });
};

module.exports = toDoController;