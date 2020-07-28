require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5f1b1a83768deb49a9b04387', { age: 1 }).then((user) => {
// 	console.log(user)
// 	return User.countDocuments({ age: 1 })
// }).then((result) => {
// 	console.log(result)
// }).catch((e) => {
// 	console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age })
	const count = await User.countDocuments({ age })
	return count
}

updateAgeAndCount('5f1b1a83768deb49a9b04387', 2).then((count) => {
	console.log(count)
}).catch((e) => {
	console.log(e)
})