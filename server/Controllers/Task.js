import Task from "../models/Task.js";
import dayjs from "dayjs";
export const CreateTask = async (req, res, next) => {
  try {
    const { id } = req.user;
    const completetionDate = new Date(req.body.date);
    const task = new Task({ ...req.body, userId: id, date: completetionDate });
    const saveTask = await task.save();
    return res.status(201).json({ task: saveTask });
  } catch (err) {
    next(err);
  }
};

export const UpdateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate( id , {...req.body}, {new: true})
    return res.status(201).json({task})
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const {id} = req.params
    const task = await Task.findById(id)
    return res.status(201).json({task})
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const type =  req.query?.type
    const day = req.query?.day
    const {id} = req.user
    var min , max
    if(day === 'today') {
      min = dayjs().format('YYYY-MM-DD')
      max = dayjs().format('YYYY-MM-DD')
    }
    else if(day === 'seven') {
      min = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
      max = dayjs().format('YYYY-MM-DD')
    }
    else if(day === 'thirty') {
      min = dayjs().subtract(30, 'day').format('YYYY-MM-DD')
      max = dayjs().format('YYYY-MM-DD')
    }
    if(type) {
     var tasks = await Task.find({userId: id , type , ...(day && {date: {$lte : new Date(max), $gte: new Date(min)} })})
    }
    else {
    var tasks = await Task.find({userId: id , ...(day && {date: {$lte : new Date(max), $gte: new Date(min)} }) })
    }
    return res.status(201).json({tasks})
  } catch (err) {
    next(err);
  }
};
