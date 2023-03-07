const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = catchError(async(req, res) => {
    const users = await User.findAll();
    return res.json(users)
});
const create = catchError(async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({...req.body, password: hashedPassword});
    return res.status(201).json(user)
});
const getOne = catchError(async(req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id)
    return res.json(user)
});
const logedUser = catchError(async(req, res) => {
    const user = req.user
    return res.json(user)
});
const login = catchError(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email:email }})
    if(!user) return res.status(401).json({message: "Invalid Credentials"})
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.status(401).json({message: "Invalid Credentials"})

    const token = jwt.sign(
		{ user }, 
		process.env.TOKEN_SECRET, 
		{ expiresIn: '1d' }
    )
    return res.json({user, token})
});
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id:id }});
    return res.sendStatus(204);
});
const update = catchError(async(req, res) => {
    const { id } = req.params;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.update({...req.body, password: hashedPassword},{ where: { id: id }, returning: true });
    return res.json(user)
});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logedUser
}