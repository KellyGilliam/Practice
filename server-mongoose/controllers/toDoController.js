const ToDo = require('./../models/toDoModel');

const toDoController = {};

toDoController.create = (req, res) => {
  console.log(req.body);
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

module.exports = toDoController;