const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  changeTaskCheckbox,
  deleteTask,
  deleteAllTasks,
} = require("../controllers/task-controller");

router.get("/tasks", getAllTasks);
router.post("/tasks", createNewTask);
router.patch("/tasks/:_id/text", changeTaskInfo);
router.patch("/tasks/:_id/checkbox", changeTaskCheckbox);
router.delete("/tasks/:_id", deleteTask);
router.delete("/tasks", deleteAllTasks);

module.exports = router;
