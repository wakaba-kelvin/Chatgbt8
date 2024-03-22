import { poolRequest, sql } from '../Utils/dbConnect.js';
import { v4 as uuidv4 } from 'uuid';

///////////////////////////////////////////////////////////////////////////////////
export const createPayrollService = async (EmployeeID) => {
    try {
        const PayrollID = uuidv4(); // Generate UUID for PayrollID

        // Get deductions and gross pay for the employee
        const { NHIFDeduction, NSSFDeduction, HELBDeduction, GrossPay: EmployeeGrossPay, FirstName, LastName } = await getMonies(EmployeeID);

        // Get overtime and rate for the employee
        const { Overtime, Rate } = await getOvertimeAndRate(EmployeeID);
        
        // Get advance amount for the employee
        const { Amount } = await getAdvanceAmount(EmployeeID);
        
        // Calculate Overtime Bonus
        const OvertimeBonus = Overtime > 0 ? Overtime * Rate : 0;

        // Calculate Net Pay
        const NetPay = EmployeeGrossPay - NHIFDeduction - NSSFDeduction - HELBDeduction + OvertimeBonus - Amount;

        // Insert payroll record into the database
        const query = `
            INSERT INTO Payroll (PayrollID, EmployeeID, GrossPay, NHIFDeduction, NSSFDeduction, HELBDeduction, OvertimeBonus, Advance, NetPay)
            VALUES (@PayrollID, @EmployeeID, @GrossPay, @NHIFDeduction, @NSSFDeduction, @HELBDeduction, @OvertimeBonus, @Advance, @NetPay)
        `;
        await poolRequest()
            .input('PayrollID', sql.VarChar, PayrollID)
            .input('EmployeeID', sql.VarChar, EmployeeID)
            .input('GrossPay', sql.Decimal(10, 2), EmployeeGrossPay)
            .input('NHIFDeduction', sql.Decimal(10, 2), NHIFDeduction)
            .input('NSSFDeduction', sql.Decimal(10, 2), NSSFDeduction)
            .input('HELBDeduction', sql.Decimal(10, 2), HELBDeduction)
            .input('OvertimeBonus', sql.Decimal(10, 2), OvertimeBonus)
            .input('Advance', sql.Decimal(10, 2), Amount)
            .input('NetPay', sql.Decimal(10, 2), NetPay)
            .query(query);

        // Return the inserted payroll record along with employee details
        return { PayrollID, EmployeeID, GrossPay: EmployeeGrossPay, NHIFDeduction, NSSFDeduction, HELBDeduction, OvertimeBonus, Advance: Amount, NetPay, FirstName, LastName };
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};

export const generateAllPayrolls = async () => {
    try {
        const generatedPayrolls = []; // Array to store generated payroll records

        // Get all employee IDs
        const employeeIDs = await getAllEmployeeIDs();

        // Loop over each employee ID and create payroll
        for (const EmployeeID of employeeIDs) {
            const payrollRecord = await createPayrollService(EmployeeID);
            generatedPayrolls.push(payrollRecord); // Push each generated payroll record into the array
        }

        // Return the generated payroll records
        return generatedPayrolls;
    } catch (error) {
        console.error("Error generating payrolls:", error);
        throw error;
    }
};




// Function to get all employee IDs
const getAllEmployeeIDs = async () => {
    try {
        const query = `
            SELECT EmployeeID
            FROM Employees
        `;
        const result = await poolRequest().query(query);
        return result.recordset.map(row => row.EmployeeID);
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};



// Function to get overtime and rate for an employee from the Attendance table
const getOvertimeAndRate = async (EmployeeID) => {
    try {
        const query = `
            SELECT A.Overtime, E.HourlyRate AS Rate
            FROM Attendance A
            INNER JOIN Employees E ON A.EmployeeID = E.EmployeeID
            WHERE A.EmployeeID = @EmployeeID
        `;
        const result = await poolRequest()
            .input('EmployeeID', sql.VarChar, EmployeeID)
            .query(query);

        if (result.recordset.length === 0) {
            return { Overtime: 0, Rate: 0 };
        }

        return result.recordset[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};


// Function to get advance amount
const getAdvanceAmount = async (EmployeeID) => {
    try {
        const query = `
            SELECT Amount
            FROM Advance
            WHERE EmployeeID = @EmployeeID
        `;
        const result = await poolRequest()
            .input('EmployeeID', sql.VarChar, EmployeeID)
            .query(query);

        if (result.recordset.length === 0) {
            return { Amount: 0 }; // Return advance amount as an object
        }

        return { Amount: result.recordset[0].Amount }; // Return advance amount as an object
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

// function to get monies
// function to get monies
const getMonies = async (EmployeeID) => {
    try {
        const query = `
            SELECT NHIFDeduction, NSSFDeduction, HELBDeduction, GrossPay, FirstName, LastName
            FROM Employees
            WHERE EmployeeID = @EmployeeID
        `;
        const result = await poolRequest()
            .input('EmployeeID', sql.VarChar, EmployeeID)
            .query(query);

        if (result.recordset.length === 0) {
            return { NHIFDeduction: 0, NSSFDeduction: 0, HELBDeduction: 0, GrossPay: 0, FirstName: null, LastName: null };
        }

        return result.recordset[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}


// Service for getting all payroll records along with employee names
export const getAllPayrollsService = async () => {
    try {
        const query = `
            SELECT p.*, e.FirstName, e.LastName
            FROM Employees p
            JOIN Employees e ON p.EmployeeID = e.EmployeeID
        `;
        const result = await poolRequest().query(query);
        return result.recordset;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};




// Service for getting a payroll record by ID
export const getPayrollByIdService = async (payrollId) => {
    try {
        const query = `
            SELECT p.*, e.FirstName, e.LastName
            FROM Payroll p
            INNER JOIN Employees e ON p.EmployeeID = e.EmployeeID
            WHERE p.PayrollID = @PayrollID
        `;
        const result = await poolRequest()
            .input('PayrollID', sql.VarChar, payrollId)
            .query(query);

        if (result.recordset.length === 0) return null;
        return result.recordset[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};


// Service for deleting a payroll record by ID
export const deletePayrollService = async (payrollId) => {
    try {
        const query = `
            DELETE FROM Payroll WHERE PayrollID = @PayrollID
        `;
        await poolRequest()
            .input('PayrollID', sql.VarChar, payrollId)
            .query(query);

        return "Payroll record deleted successfully";
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
};
