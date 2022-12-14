const { addMinutes, isAfter } = require('date-fns');
const adminAttendance = require('../models/AdminAttendence');
const error = require('../utils/error');

const getEnable = async(req, res, next) =>{
    try{
        const running = await adminAttendance.findOne({status: 'RUNNING'})
        if (running) {
            throw error("Already Running", 400);
        }

        const attendance = new adminAttendance();
        await attendance.save();
        res.status(201).json({message:'Success', attendance});
    }catch(err){
        next(err);
    }
}
const getDisable = async(req, res, next) =>{
    try{
        const running = await adminAttendance.findOne({status: 'RUNNING'});
        if (!running) {
            throw error("Not Running", 400);
        }

        running.status = "COMPLETED";
        await running.save();
        

        return res.status(200).json(running);
    }catch(err){
        next(err);
    }
}

const getStatus = async(req, res, next) =>{
    try{
        const running = await adminAttendance.findOne({status: 'RUNNING'});
        if (!running) {
            throw error("Not Running", 400);
        }

        const started = addMinutes(new Date(running.createdAt), running.timeLimit);
        if (isAfter(new Date(), started)) {
            running.status = "COMPLETED";
            await running.save();
        }

        return res.status(200).json(running);
    }catch(err){
        next(err);
    }
}

module.exports = {
    getEnable,
    getDisable,
    getStatus,
}