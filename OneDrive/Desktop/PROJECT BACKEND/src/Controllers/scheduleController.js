// controllers/scheduleController.js

import { createScheduleService, getScheduleByIDService, updateScheduleService, deleteScheduleService } from '../Service/scheduleService.js';

export const createSchedule = async (req, res) => {
    const { EmployeeID, OnLeave, LeaveDays } = req.body;

    try {
        const result = await createScheduleService(EmployeeID, OnLeave, LeaveDays);
        res.status(201).json({ message: 'Schedule created successfully', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getScheduleByID = async (req, res) => {
    try {
        const scheduleID = req.params.scheduleID;
        const schedule = await getScheduleByIDService(scheduleID);
        if (!schedule) {
            res.status(404).json({ message: 'Schedule not found' });
        } else {
            res.status(200).json(schedule);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSchedule = async (req, res) => {
    try {
        const scheduleID = req.params.scheduleID;
        const { employeeID, onLeave, leaveDays } = req.body;
        await updateScheduleService(scheduleID, employeeID, onLeave, leaveDays);
        res.status(200).json({ message: 'Schedule updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSchedule = async (req, res) => {
    try {
        const scheduleID = req.params.scheduleID;
        await deleteScheduleService(scheduleID);
        res.status(200).json({ message: 'Schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
