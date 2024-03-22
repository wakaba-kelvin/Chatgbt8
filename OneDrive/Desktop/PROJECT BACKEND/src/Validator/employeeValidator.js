import joi from 'joi';

export const employeeValidator = (employee) => {
    const registerEmployeeSchema = joi.object({
        FirstName: joi.string().required(),
        LastName: joi.string().required(),
        Email: joi.string().email().required(),
        Password: joi.string().min(4).required(),
        Address: joi.string(),
        BirthDate: joi.date(),
        ContactInfo: joi.string(),
        Gender: joi.string(),
        Position: joi.string(),
        PhotoURL: joi.string(),
        HourlyRate: joi.number().precision(2),
        GrossPay: joi.number().precision(2),
        NHIFDeduction: joi.number().precision(2),
        NSSFDeduction: joi.number().precision(2),
        HELBDeduction: joi.number().precision(2),
        NetPay: joi.number().precision(2),
        Role: joi.string(),
        ClockInTime: joi.string(),
        ClockOutTime: joi.string(),
        HoursWorked: joi.number().precision(2),
        Overtime: joi.number().precision(2)
    });
    return registerEmployeeSchema.validate(employee);
};


export const employeeLoginValidator = (employee) => {
    const employeeLoginValidatorSchema = joi.object({
        Email: joi.string().required(),
        Password: joi.string().min(4).required(),
    });
    return employeeLoginValidatorSchema.validate(employee);
}
