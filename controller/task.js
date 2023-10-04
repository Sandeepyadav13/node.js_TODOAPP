import ErrorHandler from "../middlewares/error .js";
import { Task } from "../models/task.js";

export const newtask = async (req, res, next) => {
try {
    const { title, descripation } = req.body;
    await Task.create({
        title,
        descripation,
        user: req.user,
    });
    res.status(201).json({
        success: true,
        message: "Task Add Successfully",
    });
} catch (error) {
    next(error);
}
};

export const getMyTask = async (req, res, next) => {
try {
    const userid = req.user._id;
    const task = await Task.find({ user: userid });
    res.status(200).json({
        success: true,
        task,
    });
} catch (error) {
    next(error);
}
};

export const updateTask = async (req, res, next) => {
try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return next(new ErrorHandler("Task Not Found",404));
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
        success: true,
        message: "Task Update",
    });
} catch (error) {
    next(error);
}
};

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return next (new ErrorHandler("Task Not Found",404));

    task.isCompleted = !task.isCompleted;
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "Task Delete",
    });
    } catch (error) {
       next(error) ;
    }
}; 