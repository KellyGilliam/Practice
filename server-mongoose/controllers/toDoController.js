const ToDo = require('./../models/toDoModel');

const toDoController = {};

toDoController.create = (req, res) => {
  console.log('NEW TO DO:', req.body);
  ToDo.create({ "toDoItem": req.body.toDoItem }, function (err, success) {
    if (err) {
      res.send(err);
    } else if (success) {
      // res.send(success);
      console.log(success._id);
      res.send(success);
    }
  })
}

toDoController.getAllToDos = (req, res) => {
  console.log(req.body);
  ToDo.find(req.body, (function (err, found) {
    if (found) {
      // res.send(found.map((el => el.toDoItem)));
      res.send(found.map((el => el)));
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
};
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

  // toDoController.updateToDo = (req, res) => {
  //   console.log(req.body);
  //   // let query = { toDoItem: 'YEH' }
  //   ToDo.findOneAndUpdate(req.query, { toDoItem: 'jason bourne' }, function (err) {
  //     if (err) return handleError(err);
  //     // removed!
  //   });    
  //   // ToDo.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)
  // }


  // messageController.updateToDo = (req, res, next) => {
  //   // find and update a specific message
  //   // if error send error
  //   // else update message and send back result
  //   Message.findOneAndUpdate(
  //     { _id: req.params.id },
  //     { $set: { toDoItem: "that was a much needed nap" } },
  //     { new: true },
  //     (err, result) => {
  //       console.log('update', result);
  //       if (err) {
  //         return res.status(404).send('you have an error');
  //       } else {
  //         return res.json(result);
  //       }
  //     });
  // }


module.exports = toDoController;