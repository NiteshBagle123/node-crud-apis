require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5e08c7cf586a6c247f1851a9', { age: 1 }).then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 1})
// }).then(userAge => {
//     console.log(userAge);
// }).catch(err => {
//     console.log('Error', err);
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments( { age });
    return {
        user,
        count
    }
}

updateAgeAndCount('5e08c7cf586a6c247f1851a9', 1).then(obj => {
    console.log('User data', obj.user);
    console.log('User count', obj.count);
}).catch(err => {
    console.log(err);
});