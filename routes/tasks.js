var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Task = require('../models/taskSchema');

    router.get('/', function (req, res) {
        var query = req.query;
        var whereQuery = {};
        var limitQuery = 100;
        if ("where" in query) {
            whereQuery = JSON.parse(query.where);
        }
        if ("sort" in query) {
            var sortQuery = JSON.parse(query.sort);
        }
        if ("select" in query) {
            var selectQuery = JSON.parse(query.select);
        }
        if ("skip" in query) {
            var skipQuery = JSON.parse(query.skip);
        }
        if ("limit" in query) {
            limitQuery = JSON.parse(query.limit);
        }
        if ("count" in query) {
            var countQuery = JSON.parse(query.count);
        }
        if (countQuery){
            Task.find()
                .where(whereQuery)
                .sort(sortQuery)
                .select(selectQuery)
                .skip(skipQuery)
                .limit(limitQuery)
                .count((err, result) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Server Error',
                            data: []
                        });
                    } else {
                        res.status(200).send({
                            message: 'OK',
                            data: result
                        });
                    }
                });
        }
        else{
            Task.find()
                .where(whereQuery)
                .sort(sortQuery)
                .select(selectQuery)
                .skip(skipQuery)
                .limit(limitQuery)
                .exec((err, result) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Server Error',
                            data: []
                        });
                    } else {
                        res.status(200).send({
                            message: 'OK',
                            data: result
                        });
                    }
                });
        }
    });

    router.post('/', function (req, res) {
        var document = new Task({
            name: req.body.name,
            description: req.body.description,
            deadline: req.body.deadline,
            completed: req.body.completed,
            assignedUser: req.body.assignedUser,
            assignedUserName: req.body.assignedUserName,
        });
        document.save(function (err, document) {
            if (err) {
                res.status(500).send({
                    message: 'Server Error',
                    data: []
                });
            }
            else {
                res.status(201).send({
                    message: 'Created',
                    data: document
                });
            }
        });
    });

    router.get('/:id', function (req, res) {
        Task.findById(req.params.id, function (err, document) {
            if (err||!document) {
                res.status(404).send({
                    message: 'Not Found',
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'OK',
                    data: document
                });
            }
        });
    });

    router.put('/:id', function (req, res) {
        var query = { _id: req.params.id};
        Task.findOneAndUpdate(query, req.body, {new: true}, function (err, document){
            if (err) {
                if (err.name === "CastError") {
                    res.status(404).send({
                        message: 'Not Found',
                        data: []
                    });
                }
                else {
                    res.status(500).send({
                        message: 'Server Error',
                        data: []
                    });
                }
            }
            else {
                if (!document){
                    res.status(404).send({
                        message: 'Not Found',
                        data: []
                    });
                }
                else{
                    res.status(201).send({
                        message: 'Updated',
                        data: document
                    });
                }
            }
        });
    });

    router.delete('/:id', function (req, res) {
        Task.deleteOne({ _id: req.params.id}, function (err, document) {
            if (err) {
                res.status(404).send({
                    message: 'Not Found',
                    data: []
                });
            } else {
                if (document.deletedCount!=0){
                    res.status(200).send({
                        message: 'Deleted',
                        data: []
                    });
                }
                else {
                    res.status(404).send({
                        message: 'Not Found',
                        data: []
                    });
                }
            }
        });
    });

    module.exports = router;