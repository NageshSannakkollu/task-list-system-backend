const DBConnection = require("../config/db");
const TaskListModel = require("../model/TaskModel")

const createTaskRoute = async(req,res) => {

    try {
        const {name,description,dueDate,status,priority} = req.body;
        const createTask = {
            name:name,
            description:description,
            dueDate:dueDate,
            status:status,
            priority:priority
        }
        await DBConnection();
        const checkTaskName = await TaskListModel.findOne({name:createTask.name})
        if (checkTaskName === null){
          await TaskListModel.create(createTask)
          .then(() => {
            res.status(200).json({message:"Task Created Successfully"})
          }).catch((error) => {
            console.log({message:error})
          })
        }else{
          res.send({message:"Already exists"})
        }
      
      }catch(err){
        console.log(err)
    }
}

const getAllTasks = async(req,res) => {
  await DBConnection();
  const getTasks = await TaskListModel.find()
  res.status(200).json(getTasks)
}

const getTaskById = async(req,res) => {
  const {id} = req.params;
  await DBConnection();
  const getTaskDetails = await TaskListModel.findById({_id:id})
  // console.log(getTaskDetails)
  res.status(200).json(getTaskDetails)
}

const updateTask = async(req,res)=> {
  const {id} = req.params;
  const {name,description,dueDate,status,priority} = req.body;
  await DBConnection();
  const updateTask = await TaskListModel.findByIdAndUpdate({_id:id},{name,description,dueDate,status,priority})
  res.status(200).json({message:"Task Updated Successfully"})
}

const deleteTask = async(req,res) => {
  const{id} = req.params;
  await DBConnection();
  const checkDeleteId = await TaskListModel.findById({_id:id})
  if(checkDeleteId !== undefined){
    await TaskListModel.findByIdAndDelete({_id:id})
    res.status(200).json({message:"Task deleted Successfully"})
  }
  else{
    res.status(400).json({message:"Invalid Task Id,Please provide Valid Id"})
  }
}


module.exports = {createTaskRoute,getAllTasks,getTaskById,updateTask,deleteTask}