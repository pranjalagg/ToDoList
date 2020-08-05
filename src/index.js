const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
// 	if (req.method === 'GET') {
// 		res.send('GET requests are disabled')
// 	} else {
// 		next()
// 	}
// })

// app.use((req, res, next) => {
// 	res.status(503).send('The site is under maintainance, please try after sometime')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log('Server is up and running on port ' + port)
})

// const Task = require('./models/task')

const main = async () => {
	// const task = await Task.findById('5f29b2d6e6e7001f813ea714')
	// await task.populate('owner').execPopulate()
	// console.log(task.owner)

	const user = await User.findById('5f29b211d43d961e36b89575')
	await user.populate('tasks').execPopulate()
	console.log(user.tasks)
}

main()