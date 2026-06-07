import * as z from "zod";

const date = new Date();
const dateYear = date.getFullYear();

export const formSchema = z.object({
    name: z.string().trim().regex(
        /^[\p{L}' -]+$/u,
        "Only letters, accents, apostrophes and spaces are allowed"
    ),
    email: z.email("Email is invalid"),
    day: z.string().min(1, "Day is required").refine((val) => {
        const num = Number(val);
        return !isNaN(num) && Number.isInteger(num) && num > 0 && num <= 31;
        },
        { message: "Day must be an integer between 1 and 31" }
    ),
    month: z.string().min(1, "Month is required").refine((val) => {
        const num = Number(val);
        return !isNaN(num) && Number.isInteger(num) && num > 0 && num <= 12;
        },
        { message: "Month must be an integer between 1 and 12" }
    ),
    year: z.string().min(1, "Year is required").refine((val) => {
        const num = Number(val);
        return !isNaN(num) && Number.isInteger(num) && num >= dateYear && num <= dateYear + 1;
        },
        { message: `Year must be ${dateYear} or ${dateYear + 1}` }
    ),
    hour: z.string().min(1, "Hour is required").refine((val) => {
        const num = Number(val);
        return !isNaN(num) && Number.isInteger(num) && num <= 12;
        },
        { message: "Hour must be an integer between 0 and 12" }
    ),
    minute: z.string().min(1, "Minute is required").refine((val) => {
        const num = Number(val);
        return !isNaN(num) && Number.isInteger(num) && num <= 59;
        },
        { message: "Minute must be an integer between 0 and 59" }
    ),
    drop: z.enum(["AM", "PM"], "Drop shoud be 'AM' or 'PM'"),
    numberOfPerson: z.int("Specify the number of guest").min(1).max(10)
})