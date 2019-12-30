require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5e08c99ee0efe225f9be0a77').then(task => {
//     console.log('Document removed', task);
//     return Task.countDocuments({ completed: false });
// }).then(count => {
//     console.log('Number of document with incomplete task', count);
// }).catch(err => {
//     console.log(err);
// })

const deleteTaskAndCount = async (id, taskCompletedFlag) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ taskCompletedFlag });
    return {
        task,
        count
    }
}

deleteTaskAndCount('5e0864ff8002f61f0b05f25a', false).then(taskObj => {
    console.log(taskObj.task);
    console.log(taskObj.count);
}).catch(err => {
    console.log(err);
});