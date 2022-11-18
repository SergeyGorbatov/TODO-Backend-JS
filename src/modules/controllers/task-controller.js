const Task = require("../../models/task");
const validationString = require("../../helpers/validations");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).send(allTasks);
  } catch (err) {
    res.status(400).send("Failed to get all tasks");
  }
};

const createNewTask = async (req, res) => {
  try {
    const text = await req.body.text;

    if (!req.body.hasOwnProperty("text") || !validationString(text)) {
      throw new Error();
    }

    const task = new Task({ text });
    const result = await task.save();
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send("Failed to create a task");
  }
};

const changeTaskInfo = async (req, res) => {
  try {
    const _id = await req.params._id;
    const text = await req.body.text;

    if (
      !req.params.hasOwnProperty("_id") ||
      _id === "" ||
      !req.body.hasOwnProperty("text") ||
      !validationString(text)
    ) {
      throw new Error();
    }

    const task = await Task.findOneAndUpdate(
      { _id },
      { $set: { text } },
      { new: true }
    );
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send("Failed to change a task");
  }
};

const changeTaskCheckbox = async (req, res) => {
  try {
    const _id = await req.params._id;
    const isCheck = await req.body.isCheck;

    if (
      !req.params.hasOwnProperty("_id") ||
      _id === "" ||
      !req.body.hasOwnProperty("isCheck") ||
      typeof isCheck !== "boolean"
    ) {
      throw new Error();
    }

    const task = await Task.findOneAndUpdate(
      { _id },
      { $set: { isCheck } },
      { new: true }
    );
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send("Failed to change a task");
  }
};

const deleteTask = async (req, res) => {
  try {
    const _id = req.params._id;

    if (!req.params.hasOwnProperty("_id") || _id === "") {
      throw new Error();
    }

    const result = await Task.deleteOne({ _id });
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send("Failed to delete task");
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const result = await Task.deleteMany({});
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send("Failed to delete tasks");
  }
};

module.exports = {
  getAllTasks,
  createNewTask,
  changeTaskInfo,
  changeTaskCheckbox,
  deleteTask,
  deleteAllTasks,
};
