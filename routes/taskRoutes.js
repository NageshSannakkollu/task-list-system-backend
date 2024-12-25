const express = require("express")
const router = express.Router();

const {createTaskRoute,getAllTasks,getTaskById,updateTask,deleteTask} = require("../controller/taskController.js")

router.post("/tasks",createTaskRoute)
router.get("/tasks",getAllTasks)
router.get("/tasks/:id",getTaskById)
router.patch("/tasks/:id",updateTask)
router.delete("/tasks/:id",deleteTask)

module.exports = router;