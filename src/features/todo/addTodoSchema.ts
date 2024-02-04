import * as Yup from "yup";

// Add todo validation schema
export const addTodoSchema = Yup.object().shape({
    title: Yup.string().required("Title is required").trim(),
    trackingType: Yup
        .mixed()
        .oneOf(['daily', 'weekly'] as const)
        .defined("Tracking type is required"),
    timesPerWeek: Yup.number()
        .integer('Must be an integer')
        .min(1, 'Must be at least 1')
        .max(7, 'Must be at most 7'),
    daysPerWeek: Yup.array().min(1, "Select a day").nullable(),
});
