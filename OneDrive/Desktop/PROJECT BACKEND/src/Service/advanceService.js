// advanceService.js
import { poolRequest, sql } from '../Utils/dbConnect.js';
import { v4 as uuidv4 } from 'uuid';

export const createAdvanceService = async (EmployeeID, Amount) => {
    try {
        const AdvanceID = uuidv4(); // Generate UUID for AdvanceID

        const query = `
            INSERT INTO Advance (AdvanceID, EmployeeID, Amount)
            VALUES (@AdvanceID, @EmployeeID, @Amount)
        `;
        await poolRequest()
            .input("AdvanceID", sql.VarChar, AdvanceID)
            .input("EmployeeID", sql.VarChar, EmployeeID)
            .input("Amount", sql.Decimal(10, 2), Amount)
            .query(query);

        return "Advance created successfully";
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};

export const getAllAdvancesService = async () => {
    try {
        const query = `
            SELECT * FROM Advance
        `;
        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};

export const getAdvanceByIdService = async (advanceId) => {
    try {
        const query = `
            SELECT * FROM Advance WHERE AdvanceID = @AdvanceID
        `;
        const result = await poolRequest()
            .input('AdvanceID', sql.VarChar, advanceId)
            .query(query);

        if (result.recordset.length === 0) return null;
        return result.recordset[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};

export const deleteAdvanceService = async (advanceId) => {
    try {
        const query = `
            DELETE FROM Advance WHERE AdvanceID = @AdvanceID
        `;
        await poolRequest()
            .input('AdvanceID', sql.VarChar, advanceId)
            .query(query);

        return "Advance deleted successfully";
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};
