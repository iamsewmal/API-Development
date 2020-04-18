const Tester = require("../models/tester.model.js");


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      
     // const tester = new Tester(req.body);
    
      Tester.create(new Tester(req.body), (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Testers."
          });
        else res.send(data);
      });
};

exports.findAll = (req, res) => {
    Tester.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving testers."
          });
        else res.send(data);
      });
};

exports.findOne = (req, res) => {
    Tester.findById(req.params.testerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found tester with id ${req.params.testerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving tester with id " + req.params.testerId
            });
          }
        } else res.send(data);
      });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Tester.updateById(req.params.testerId,new Tester(req.body),(err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found tester with id ${req.params.testerId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating tester with id " + req.params.testerId
              });
            }
          } else res.send(data);
        }
      );
};

exports.delete = (req, res) => {
    Tester.remove(req.params.testerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found tester with id ${req.params.testerId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete tester with id " + req.params.testerId
            });
          }
        } else res.send({ message: `tester was deleted successfully!` });
      });
};

exports.deleteAll = (req, res) => {
    Tester.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all testers."
          });
        else res.send({ message: `All testers were deleted successfully!` });
      });
};