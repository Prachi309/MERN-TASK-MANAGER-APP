const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const TaskSchema= new Schema({
    taskname:{
        type: String,
        required:true
    },
    isDone:{
        type: Boolean,
        
    }
});
const TaskModel= mongoose.model('todos',TaskSchema);
module.exports= TaskModel;