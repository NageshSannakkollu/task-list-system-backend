const mongoose = require("mongoose")


const TaskListSchema = new mongoose.Schema({
       name:{
        type:String,
        required:true
       },
       description:{
        type:String,
        required:true
       },
       dueDate:{
        type:Date,
        required:true
       },
       status:{
        type:String,
        enum:['Pending','In Progress','Completed'],
        default:"Pending"
       },
       priority:{
        type:String,
        enum:['Low','Medium','High'],
        default:"Medium"
       }
})

const TaskListModel = mongoose.models.tasks || mongoose.model("tasks",TaskListSchema)

module.exports = TaskListModel
