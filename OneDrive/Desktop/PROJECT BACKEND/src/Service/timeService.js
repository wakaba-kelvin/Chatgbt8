import { poolRequest, sql } from '../Utils/dbConnect.js';
import { v4 as uuidv4 } from 'uuid';

export const getTimeService = async () => {
    try {
        const query = `
            SELECT TR.RecordID, E.EmployeeID, E.FirstName, E.LastName, TR.ClockInTime, TR.ClockOutTime, TR.HoursWorked, TR.Overtime, TR.Rate
            FROM Attendance TR
            JOIN Employees E ON TR.EmployeeID = E.EmployeeID
        `;
        const result = await poolRequest().query(query);

        return result.recordset;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

export const getTimeByEmployeeIDService = async (employeeID) => {
    try {
        const query = `
            SELECT TR.RecordID, E.EmployeeID, E.FirstName, E.LastName, TR.ClockInTime, TR.ClockOutTime, TR.HoursWorked, TR.Overtime, TR.Rate
            FROM Attendance TR
            JOIN Employees E ON TR.EmployeeID = E.EmployeeID
            WHERE TR.EmployeeID = @EmployeeID
        `;
        const result = await poolRequest()
            .input('EmployeeID', sql.VarChar, employeeID)
            .query(query);

        return result.recordset;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};


// Service for updating time records
export const updateTimeService = async (EmployeeID, ClockInTime, ClockOutTime, Rate) => {
    try {
        const clockIn = new Date(`1970-01-01T${ClockInTime}`);
        const clockOut = new Date(`1970-01-01T${ClockOutTime}`);
        const HoursWorked = (clockOut - clockIn) / (1000 * 60 * 60); // milliseconds to hours

        let Overtime = 0;
        if (HoursWorked > 8) {
            Overtime = HoursWorked - 9;
        }

        const query = `
            UPDATE Attendance
            SET ClockInTime = @ClockInTime, ClockOutTime = @ClockOutTime, HoursWorked = @HoursWorked, Overtime = @Overtime, Rate = @Rate
            WHERE EmployeeID = @EmployeeID
        `;


        console.log("Query:", query); // Log the query
        console.log("Parameters:", { EmployeeID, ClockInTime, ClockOutTime, HoursWorked, Overtime }); // Log parameters

        await poolRequest()
            .input('EmployeeID', sql.VarChar, EmployeeID)
            .input('ClockInTime', sql.VarChar, ClockInTime)
            .input('ClockOutTime', sql.VarChar, ClockOutTime)
            .input('HoursWorked', sql.Decimal(10, 2), HoursWorked)
            .input('Overtime', sql.Decimal(10, 2), Overtime)
            .input('Rate', sql.Decimal(10, 2), Rate)
            .query(query);

        return "Time record updated successfully";
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};


export const createTimeService = async (EmployeeID, ClockInTime, ClockOutTime, Rate) => {
    try {
        const RecordID = uuidv4(); // Generate UUID for RecordID

        // Calculate hours worked
        const clockIn = new Date(`1970-01-01T${ClockInTime}`);
        const clockOut = new Date(`1970-01-01T${ClockOutTime}`);
        const HoursWorked = (clockOut - clockIn) / (1000 * 60 * 60); // milliseconds to hours

        // If hours worked is greater than 8, calculate overtime
        let Overtime = 0;
        if (HoursWorked > 8) {
            Overtime = HoursWorked - 9;
        }

        // Insert into the database
        const query = `
            INSERT INTO Attendance (RecordID, EmployeeID, ClockInTime, ClockOutTime, HoursWorked, Overtime, Rate)
            VALUES (@RecordID, @EmployeeID, @ClockInTime, @ClockOutTime, @HoursWorked, @Overtime, @Rate)
        `;

        console.log("Query:", query); // Log the query
        console.log("Parameters:", { RecordID, EmployeeID, ClockInTime, ClockOutTime, HoursWorked, Overtime }); // Log parameters
        await poolRequest()
            .input('RecordID', sql.VarChar, RecordID)
            .input('EmployeeID', sql.VarChar, EmployeeID)
            .input('ClockInTime', sql.VarChar, ClockInTime)
            .input('ClockOutTime', sql.VarChar, ClockOutTime)
            .input('HoursWorked', sql.Decimal(10, 2), HoursWorked)
            .input('Overtime', sql.Decimal(10, 2), Overtime)
            .input('Rate', sql.Decimal(10, 2), Rate)
            .query(query);

        return "Time record created successfully";
    } catch (error) {
        console.error("Database Error:", error); // Log database error
        return error;
    }
}







