import { z } from "zod";

// make sure to use zod for validation otherwise return proper error response
const diseaseSchema = z.object({
  diseaseName: z.string().min(1, "Enter the name of the disease").max(255),
});

const medicationSchema = z.object({
    medicationName: z.string().min(1, "Enter the name of the medication").max(255),
    status: z.string().min(1, "Enter the status of the medication").max(255),
    dosage: z.string().min(1, "Enter the dosage of the medication").max(255),
    frequency: z.string().min(1, "Enter the frequency of the medication").max(255),
    prescribingPhysician: z.string().min(1, "Enter the prescribing physician").max(255),
    startDate: z.string().min(1, "Enter the start date of the medication"),
    endDate: z.string().optional(),
});

const medicalHistorySchema = z.object({
    historyName: z.string(),
    description: z.string().optional(),
    userId: z.string().min(1, "Enter the user id"),
});


export const measurementSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  measurementType: z.enum(['weight', 'blood_pressure_systolic', 'blood_pressure_diastolic', 'BMI'], { message: 'Invalid measurement type' }),
  measurementValue: z.number().min(0, { message: 'Measurement value must be a positive number' }),
  measurementUnit: z.string().min(1, { message: 'Measurement unit is required' }),
  measuredOn: z.string().refine(value => {
    // Attempt to parse the string into a Date object
    const parsedDate = new Date(value);
    // Check if parsing was successful and the result is a valid date
    return !isNaN(parsedDate.getTime());
  }, {
    message: 'Measured on must be a valid date string',
  }),
});


export { diseaseSchema, medicationSchema, medicalHistorySchema };