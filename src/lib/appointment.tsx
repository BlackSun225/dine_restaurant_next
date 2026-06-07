import ical, { ICalCalendarMethod } from 'ical-generator';


//to be able to cancel or update appointment, i need the uId linked with the email, so i have to keep it in database
const sequence = 0;

export function setAppointment(isoDateString: string, numberOfPerson: string, customerEmail: string, customerName: string) {
  try {
    const appointment = ical({name: "Dine restaurant booking"});
    appointment.method(ICalCalendarMethod.REQUEST);
    appointment.timezone("Africa/Abidjan");

    const startDate = new Date(isoDateString);
    const endDate = new Date(isoDateString);
    endDate.setTime(startDate.getTime() +  3600 * 1000); //so the appointment last one hour

    appointment.createEvent({
        start: startDate,
        end: endDate, 
        summary: `A Table for ${numberOfPerson} at Dine Restaurant`,
        description: `Your reservation for ${numberOfPerson} person(s) at Dine Restaurant is registered. 
        Accept the request to add it to your calender. 
        We look forward to hosting you!`,
        location: "Abidjan, Cocody",
        // Organizer is required for ICalCalendarMethod.REQUEST invites
        organizer: {
        name: "Maison Doudjo - Christ Doudjo Fousseni",
        email: "yohananchris@outlook.com",
        },
        // Attendee with rsvp: true is required for the user to get RSVP buttons
        attendees: [
        {
            name: customerName,
            email: customerEmail,
            rsvp: true,
        }
        ],
        // Initialize sequence to 0 (default for new events)
        sequence: 0,
    });

    return appointment;
  }catch(error) {
    console.error("Appointment : ", error);
  }
}



