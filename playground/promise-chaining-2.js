require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('5f1be88aae2531301b86d95b').then(() => {
// 	return Task.countDocuments({ completed: false})
// }).then((result) => {
// 	console.log(result)
// }).catch((e) => {
// 	console.log(e)
// })

const deleteTaskAndCount = async (id) => {
	await Task.findByIdAndRemove(id)
	const count = await Task.countDocuments({ completed: false })
	return count
}

deleteTaskAndCount('5f1be8d582a89730d3da2dca').then((count) => {
	console.log(count)
}).catch((e) => {
	console.log(e)
})