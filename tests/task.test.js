const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
	userOneId,
	userOne,
	userTwoId,
	userTwo,
	taskOne,
	taskTwo,
	setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
	const response = await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 'From Test Suite'
		})
		.expect(201)
	const task = await Task.findById(response.body._id)
	expect(task).not.toBeNull()
	expect(task.completed).toEqual(false)
})

test('Should fetch all user tasks', async () => {
	const response = await request(app)
		.get('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200)
	expect(response.body.length).toBe(2)
})

test('Should not delete other user\'s task', async () => {
	await request(app)
		.delete('/tasks/' + taskOne._id)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send()
		.expect(404)

	const task = await Task.findById(taskOne._id)
	expect(task).not.toBeNull()
})

test('Should delete user task', async () => {
	await request(app)
		.delete(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200)
})

test('Should not delete task if unauthenticated', async () => {
	await request(app)
		.delete(`/task/${taskOne._id}`)
		.send()
		.expect(404)
})

test('Should not update other user\'s task', async () => {
	await request(app)
		.patch(`/tasks/${taskTwo._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			completed: true
		})
		.expect(404)

})

test("Should fetch user task by ID", async () => {
	await request(app)
		.get('/tasks/' + taskTwo._id)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send()
		.expect(200)
})

test('Should not fetch other user\'s task by ID', async () => {
	await request(app)
		.get(`/tasks/${userTwo._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(404)
})