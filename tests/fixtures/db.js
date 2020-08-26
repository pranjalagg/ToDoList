const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
	_id: userOneId,
	name: 'TestUserName',
	email: 'testusername@website.com',
	password: 'HighSecurityPass',
	tokens: [{
		token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
	}]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
	_id: userTwoId,
	name: 'Pranjal',
	email: 'admin@website.com',
	password: 'FakePass_-',
	tokens: [{
		token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
	}]
}

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Dummy Task 1',
	completed: true,
	owner: userOneId
}

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Dummy Task 2',
	completed: false,
	owner: userTwoId
}

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Dummy Task 3',
	completed: false,
	owner: userOneId
}


const setupDatabase = async () => {
	await User.deleteMany()
	await Task.deleteMany()
	await new User(userOne).save()
	await new User(userTwo).save()
	await new Task(taskOne).save()
	await new Task(taskTwo).save()
	await new Task(taskThree).save()
}

module.exports = {
	userOneId,
	userOne,
	userTwoId,
	userTwo,
	taskOne,
	taskTwo,
	taskThree,
	setupDatabase
}