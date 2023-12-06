import {validationResult} from "express-validator";
import {addUser, deleteUserById, fetchAllUsers, fetchUserById, updateUserById} from "../models/user-model.mjs";

const postUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // details about errors:
      console.log(errors.array())
      return res.status(400).json({message: 'invalid input fields'});
    }
    const newUserId = await addUser(req.body);
    res.status(201).json({message: 'user added', user_id: newUserId});
};


// Following functions are just stubs at the moment

const getUsers = async (req, res) => {
    const result = await fetchAllUsers();
    res.json(result);
};

const getUserById = async (req, res) => {
    console.log(req.params);
    const userId = req.params.id;
    const result = await fetchUserById(userId);
    res.json(result[0]);
};

const putUser = async (req, res) => {
    const updateFields = req.body;
    const userId = req.params.id;
    const result = await updateUserById(userId, updateFields);
    res.json(result[0]);
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const result = await deleteUserById(userId);
    res.json(result[0]);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
