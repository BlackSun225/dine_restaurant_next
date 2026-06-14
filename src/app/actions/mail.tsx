"use server"

import transporter from "@/lib/mailer";
import { formSchema } from "../utils/constants";
import { setAppointment } from "@/lib/appointment";
import path from "path";
import * as z from "zod";

// send me a mail containing the customer needs
export async function sendAppointmentMail(validatedData: {
    email: string;
    name: string;
    day: string;
    month: string;
    year: string;
    hour: string;
    minute: string;
    numberOfPerson: number;
    drop: "AM" | "PM";
}) {

    try {
        const actionCheck = formSchema.safeParse(validatedData);
        if (!actionCheck.success) {
            return { status: false, error: z.flattenError(actionCheck.error).fieldErrors };
        }

        console.log(`Sending email to ${actionCheck.data.email}...`);
        const data = actionCheck.data;
        const dateToSend = new Date(`${data.year}-${data.month}-${data.day} ${data.drop == "AM" ? data.hour : Number(data.hour) + 12}:${data.minute}`);
        console.log("picked date : ", dateToSend)

        const appointment = setAppointment(
            dateToSend.toISOString(),
            data.numberOfPerson.toString(),
            data.email,
            data.name
        );

        const imagePath = path.join(process.cwd(), "public", "locally-sourced-tablet.jpg");
        console.log("image path : ", imagePath);
        const mailOptions = {
            from: "Chris Doudjo Yohanan Fousseni <yohananchris@outlook.com>",
            to: data.email,
            replyTo: "yohananchris@outlook.com",
            subject: "Restaurant dine booking",
            cci: "yohananchris@outlook",
            attachments: [
                {
                    filename: "locally-sourced-tablet.jpg",
                    path: imagePath,
                    cid: "meal@maisondoudjo-dine.com"
                }
            ],
            icalEvent: {
                filename: "appointment.ics",
                method: "REQUEST",
                content: appointment?.toString()
            },
            html: `
            <html>
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Aladin&family=Glass+Antiqua&display=swap" rel="stylesheet">
                </head>
                <body>
                    <main style="max-width:600px;margin:0 auto;" >
                        <img src="cid:meal@maisondoudjo-dine.com" style="width:100%;" alt="dine restaurant" />
                        <h1 style="text-align:center;" >Dine Restaurant</h1> 
                        <p>You booked a table for ${data.numberOfPerson}, you can add this event in your calendar since your reservation has been registered.</p>
                        <p>See you soon, have a good day.</p>
                        <h2 style="font-family:'Glass Antiqua',Georgia,serif;font-size:24px;text-align:center;background:black;color:ivory;padding:1.5rem;letter-spacing:2px;" >
                            MAISON DOUDJO
                        </h2>
                    </main>
                </body>
            </html>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Result sending customer mail :', result);

        return { status: true, error: null };
    } catch (err) {
        console.error('Error sending email:', err);
        return {
            status: false,
            error: err instanceof Error ? err.message : "Unknown error occurred"
        };
    }
}