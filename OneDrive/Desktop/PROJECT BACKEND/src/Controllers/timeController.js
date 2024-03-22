import { getTimeByEmployeeIDService , updateTimeService, getTimeService, createTimeService } from '../Service/timeService.js';

export const updateTime = async (req, res) => {
    const timeDetails = {
        EmployeeID: req.body.EmployeeID,
        ClockInTime: req.body.ClockInTime,
        ClockOutTime: req.body.ClockOutTime,
        Rate: req.body.Rate // New addition
    };

    try {
        const result = await updateTimeService(timeDetails.EmployeeID, timeDetails.ClockInTime, timeDetails.ClockOutTime, timeDetails.Rate);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getTimeByEmployeeID = async (req, res) => {
    const { employeeID } = req.params;

    try {
        const time = await getTimeByEmployeeIDService(employeeID);
        if (!time) {
            return res.status(404).json({ message: 'Time not found for the specified employee ID' });
        }
        res.status(200).json(time);
    } catch (error) {
        console.error("Error getting time by employee ID:", error);
        res.status(500).json({ error: error.message });
    }
};

// Controller for creating time records
export const createTime = async (req, res) => {
    const employeeDetails = {
        EmployeeID: req.body.EmployeeID,
        ClockInTime: req.body.ClockInTime,
        ClockOutTime: req.body.ClockOutTime,
        Rate: req.body.Rate // New addition
    };

    try {
        const result = await createTimeService(employeeDetails.EmployeeID, employeeDetails.ClockInTime, employeeDetails.ClockOutTime, employeeDetails.Rate);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller for getting time records
export const getTime = async (req, res) => {
    try {
        const time = await getTimeService();
        if(time.length === 0){
            res.status(404).json({ message: 'Time not found' });
        } else {
            res.status(200).json(time);
        }
    } catch (error) {
        return error;
    }
}