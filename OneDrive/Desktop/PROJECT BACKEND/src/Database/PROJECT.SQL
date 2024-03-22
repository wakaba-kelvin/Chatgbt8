CREATE DATABASE PROJECTX
USE PROJECTX

CREATE TABLE Employees(
    EmployeeID VARCHAR(100) PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Address VARCHAR(255),
    BirthDate DATE,
    ContactInfo VARCHAR(20),
    Gender VARCHAR(10),
    Position VARCHAR(255),
    PhotoURL VARCHAR(255),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    HourlyRate DECIMAL(10,2),
    GrossPay DECIMAL(10,2),
    NHIFDeduction DECIMAL(10,2),
    NSSFDeduction DECIMAL(10,2),
    HELBDeduction DECIMAL(10,2),
    Role VARCHAR(20) NOT NULL DEFAULT 'Employee',
    ClockInTime TIME DEFAULT '08:00',
    ClockOutTime TIME DEFAULT '17:00',
);

SELECT * FROM Employees
DROP TABLE Employees


CREATE TABLE Attendance (
    RecordID VARCHAR(100) PRIMARY KEY,
    EmployeeID VARCHAR(100),
    ClockInTime TIME DEFAULT '08:00',
    ClockOutTime TIME DEFAULT '17:00',
    HoursWorked DECIMAL (10,2),
    Overtime DECIMAL (10,2),
    Rate DECIMAL(10,2),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID) ON DELETE CASCADE
);

SELECT * FROM Attendance
DROP TABLE Attendance

SELECT TR.RecordID, E.FirstName, E.LastName, TR.ClockInTime, TR.ClockOutTime, TR.HoursWorked, TR.Overtime
FROM Attendance TR
JOIN Employees E ON TR.EmployeeID = E.EmployeeID;

-----------------------------------------------------------
CREATE TABLE Payroll (
    PayrollID VARCHAR(100) PRIMARY KEY,
    EmployeeID VARCHAR(100),
    GrossPay DECIMAL(10,2),
    NHIFDeduction DECIMAL(10,2),
    NSSFDeduction DECIMAL(10,2),
    HELBDeduction DECIMAL(10,2),
    OvertimeBonus DECIMAL(10,2),
    Advance DECIMAL(10,2),
    NetPay DECIMAL(10,2),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID) ON DELETE CASCADE
);


SELECT * FROM Payroll
DROP TABLE Payroll

-----------------------------------------------------------------------
CREATE TABLE Advance(
    AdvanceID VARCHAR(100) PRIMARY KEY,
    EmployeeID VARCHAR(100),
    Amount DECIMAL(10,2),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID) ON DELETE CASCADE
);

SELECT * FROM Advance
DROP TABLE Advance

-----------------------------------------
CREATE TABLE Schedule (
    ScheduleID VARCHAR(100) PRIMARY KEY,
    EmployeeID VARCHAR(100),
    OnLeave BIT DEFAULT 0, 
    LeaveDays INT DEFAULT 0 ,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID) ON DELETE CASCADE
);

SELECT * FROM Schedule
DROP TABLE Schedule