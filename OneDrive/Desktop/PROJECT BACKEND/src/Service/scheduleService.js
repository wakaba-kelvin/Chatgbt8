import { poolRequest, sql } from '../Utils/dbConnect.js'; // Assuming this is your database connection module
import { v4 as uuidv4 } from 'uuid';


export const createScheduleService = async (EmployeeID, OnLeave, LeaveDays) => {
    try {
        const ScheduleID = uuidv4();
        const leaveStatus = OnLeave ? 1 : 0; // Convert OnLeave boolean value to bit (0 or 1)
        const query = `
            INSERT INTO Schedule (ScheduleID, EmployeeID, OnLeave, LeaveDays)
            VALUES (@ScheduleID, @EmployeeID, @OnLeave, @LeaveDays)
        `;

        await poolRequest()
            .input('ScheduleID', sql.VarChar(100), ScheduleID)
            .input('EmployeeID', sql.VarChar(100), EmployeeID)
            .input('OnLeave', sql.Bit, leaveStatus) // Use leaveStatus instead of OnLeave
            .input('LeaveDays', sql.Int, LeaveDays)
            .query(query);

        return { ScheduleID, EmployeeID, OnLeave, LeaveDays }; // Return created schedule details
    } catch (error) {
        throw error;
    }
};


export const getScheduleByIDService = async (scheduleID) => {
    try {
        const query = `
            SELECT * FROM Schedule
            WHERE ScheduleID = @ScheduleID
        `;
        const result = await poolRequest()
            .input('ScheduleID', sql.VarChar(100), scheduleID)
            .query(query);
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};

export const updateScheduleService = async (scheduleID, employeeID, onLeave, leaveDays) => {
    try {
        const query = `
            UPDATE Schedule
            SET EmployeeID = @EmployeeID, OnLeave = @OnLeave, LeaveDays = @LeaveDays
            WHERE ScheduleID = @ScheduleID
        `;
        await poolRequest()
            .input('ScheduleID', sql.VarChar(100), scheduleID)
            .input('EmployeeID', sql.VarChar(100), employeeID)
            .input('OnLeave', sql.Bit, onLeave)
            .input('LeaveDays', sql.Int, leaveDays)
            .query(query);
    } catch (error) {
        throw error;
    }
};

export const deleteScheduleService = async (scheduleID) => {
    try {
        const query = `
            DELETE FROM Schedule
            WHERE ScheduleID = @ScheduleID
        `;
        await poolRequest()
            .input('ScheduleID', sql.VarChar(100), scheduleID)
            .query(query);
    } catch (error) {
        throw error;
    }
};
