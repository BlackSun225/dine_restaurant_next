"use client"

import Image from "next/image";
import style from "@/app/css/reservation.module.css"
import { formSchema } from "../utils/constants";
import * as z from "zod";
import { sendAppointmentMail } from "../actions/mail";
import { ChangeEvent, useState } from "react";
import Header from "../components/Header";

const arrowIcon = "/icons/icon-arrow.svg";
const checkIcon = "/icons/icon-check.svg";
const plusIcon = "/icons/icon-plus.svg";
const minusIcon = "/icons/icon-minus.svg";
const lines = "/icons/pattern-lines.svg";


export default function Reservation() {

    const [formState, setFormState] = useState<{
        name: string,
        email: string,
        day: string,
        month: string,
        year: string,
        hour: string,
        minute: string,
        drop: "AM" | "PM",
        numberOfPerson: number
    }>({
        name: "",
        email: "",
        day: "",
        month: "",
        year: "",
        hour: "",
        minute: "",
        drop: "AM",
        numberOfPerson: 4
    })

    const [formStateError, setFormStateError] = useState<{
        name: string,
        email: string,
        day: string,
        month: string,
        year: string,
        hour: string,
        minute: string,
        drop: string,
        numberOfPerson: string
    }>({
        name: "",
        email: "",
        day: "",
        month: "",
        year: "",
        hour: "",
        minute: "",
        drop: "",
        numberOfPerson: ""
    })

    const [isLoading, setIsLoading] = useState(false);
    const [requestResult, setRequestResult] = useState<"success" | "error" | null>(null);

    function resetRequestResult() {
        setTimeout(() => {
            setRequestResult(null);
        }, 3500)
    }   

    async function submitForm(formStateCopy: typeof formState) {
        setIsLoading(true);
        setFormStateError({
            name: "",
            email: "",
            day: "",
            month: "",
            year: "",
            hour: "",
            minute: "",
            drop: "",
            numberOfPerson: ""
        });
        const submitResult = formSchema.safeParse({...formStateCopy});

        if(submitResult.success) {
            console.log("form validated successfully!!!")
            
            const result = await sendAppointmentMail(submitResult.data);

            console.log("result : ", result);
            setIsLoading(false);
            if(result.status) {
                setRequestResult("success");
            }else{
                setRequestResult("error");
            }
            resetRequestResult();
        }else{
            const errors = z.flattenError(submitResult.error).fieldErrors;
            const formStateErrorClone = {
                name: "",
                email: "",
                day: "",
                month: "",
                year: "",
                hour: "",
                minute: "",
                drop: "",
                numberOfPerson: ""
            };

            for(const key of Object.keys(errors) as Array<keyof typeof errors>) {
                formStateErrorClone[key] = errors[key]?.join("") || "";
            }
            setFormStateError(formStateErrorClone);
            setIsLoading(false);
        }
    }
    
    function formatName(val: string) {
        const nameRegexp = /([-'\s+])/;
        let result = val.split(nameRegexp);

        result = result.map(val => {
            if(!nameRegexp.test(val)) {
                val = val.slice(0,1).toUpperCase() + val.slice(1).toLowerCase();
            }
            
            return val;
        }); 

        return result.join('');
    }

    function formatStringNumberSoItHasTwoCharacters(event: ChangeEvent<HTMLInputElement> , str: string) {
        str = str.trim();
        if(str && (str.length > 2 || Number.parseInt(str) > Number.parseInt(event.target.max))) {
            return Number.parseInt(event.target.max).toString();
        }

        if(str && Number.parseInt(str) < Number.parseInt(event.target.min)) {
            return Number.parseInt(event.target.min).toString().padStart(2, "0");
        }

        return str.padStart(2, "0");
    }

    function formatYear(event: ChangeEvent<HTMLInputElement> , str: string) {
        str = str.trim();
        if(str && (str.length > 5 || Number.parseInt(str) > Number.parseInt(event.target.max))) {
            return Number.parseInt(event.target.max).toString();
        }
        if(str && (str.length < 4 || Number.parseInt(str) < Number.parseInt(event.target.min))) {
            return Number.parseInt(event.target.min).toString();
        }
        return str;

    }

    return (
        <section className={style.main} >
            <Header />
            <section className={style.section} >
                <div className={style.text}>
                    <h1>Reservations</h1>
                    <p>
                    {"We can't wait to host you. If you have any special requirements please feel free to call on the phone number below. We'll be happy to accomodate you."}
                    </p>
                </div>
                <div className={style.formWrapper}>
                    <form className={style.form} onSubmit={(event) => {
                        event.preventDefault();
                        submitForm({...formState});
                    }}>
                        <input value={formState.name} 
                            onChange={(event) => {
                                setFormState(prev => ({...prev, name: formatName(event.target.value)}))
                            }} 
                            type="text" name="name" id="name" placeholder="Name" required
                        />
                        {formStateError.name && <strong className={style.error}>{formStateError.name}</strong>}
                        <input value={formState.email}  onChange={event => setFormState(prev => ({...prev, email: event.target.value}))} 
                            type="email" name="email" id="email" placeholder="Email" required
                        />
                        {formStateError.email && <strong className={style.error}>{formStateError.email}</strong>}
                        <div className={style.pick} id="date">
                            <span>Pick a date</span>
                            <div>
                                <input required value={formState.month} onChange={event => {
                                    if(formState.day && Number(formState.day) > 29) {
                                        setFormState(prev => ({...prev, month: event.target.value, day: "29"}));
                                    }else{
                                        setFormState(prev => ({...prev, month: event.target.value}));
                                    }
                                }}
                                 onBlur={event => setFormState(prev => ({
                                    ...prev, 
                                    month: formatStringNumberSoItHasTwoCharacters(event, event.target.value)}))
                                }
                                 type="number" name="month" id="month" min="1" max="12" placeholder="MM" />
                                <input required value={formState.day} onChange={event => setFormState(prev => ({...prev, day: event.target.value}))}
                                    onBlur={event => setFormState(prev => ({
                                    ...prev, 
                                    day: formatStringNumberSoItHasTwoCharacters(event, event.target.value)}))} 
                                type="number" name="day" id="day" min="1" max={formState.month == "02" ? 29 : 31} placeholder="DD" />
                                <input required value={formState.year} onChange={event => setFormState(prev => ({...prev, year: event.target.value}))} 
                                onBlur={event => setFormState(prev => ({...prev, year: formatYear(event, event.target.value)}))}  
                                 type="number" name="year" id="year" min="2026" max="2027" placeholder="YYYY" />
                            </div>
                        </div>
                        {formStateError.month && <p className={style.error}>{formStateError.month}</p>}
                        {formStateError.day && <p className={style.error}>{formStateError.day}</p>}
                        {formStateError.year && <p className={style.error}>{formStateError.year}</p>}
                        <div className={style.pick} id="time" >
                            <span>Pick a time</span>
                            <div>
                                <input required value={formState.hour} onChange={event => setFormState(prev => ({...prev, hour: event.target.value}))}
                                 onBlur={event => setFormState(prev => ({
                                    ...prev, hour: formatStringNumberSoItHasTwoCharacters(event, event.target.value)}))}
                                 type="number" name="hour" id="hour" min={formState.drop == "AM" ? 8 : 1} max={formState.drop == "AM" ? 12 : 11} placeholder="09" />
                                <input required value={formState.minute} onChange={event => setFormState(prev => ({...prev, minute: event.target.value}))} 
                                onBlur={event => setFormState(prev => ({
                                    ...prev, minute: formatStringNumberSoItHasTwoCharacters(event, event.target.value)}))}
                                 type="number" name="minute" id="minute" min="0" max="59" placeholder="00" />
                                <label htmlFor="dropTest" className={style.selectDrop} >
                                    <input id="dropTest" type="checkbox" />
                                    <div className={style.dropVal}>
                                        <span>{formState.drop}</span>
                                        <Image width="15" height="8" src={arrowIcon} alt="arrow icon" />
                                    </div>
                                    <ul className={style.dropMenu}>
                                        <li onClick={() => {
                                            setFormState(prev => ({...prev, drop: "AM"}))
                                        }}  className={`${style.dropOption} ${formState.drop == "AM" && style.active}`} >
                                            <Image width="15" height="15" className={style.img} src={checkIcon} alt="check icon" />
                                            <span>AM</span>
                                        </li>
                                        <li onClick={() => setFormState(prev => ({...prev, drop: "PM"}))} className={`${style.dropOption} ${formState.drop == "PM" && style.active}`}>
                                            <Image width="15" height="15" className={style.img} src={checkIcon} alt="check icon" />
                                            <span>PM</span>
                                        </li>
                                    </ul>
                                </label>
                            </div>
                        </div>
                        {formStateError.hour && <strong className={style.error}>{formStateError.hour}</strong>}
                        {formStateError.minute && <strong className={style.error}>{formStateError.minute}</strong>}
                        {formStateError.drop && <strong className={style.error}>{formStateError.drop}</strong>}
                        <div className={style.numberOfPerson}>
                            <span onClick={() => {
                                if(formState.numberOfPerson > 1) {
                                    setFormState(prev => ({...prev, numberOfPerson: prev.numberOfPerson - 1}))
                                }
                            }} className={style.minus} >
                                <Image width="12" height="4" src={minusIcon} alt="minus icon" />
                            </span>
                            <div className={style.content} > {`${formState.numberOfPerson} people`}</div>
                            <span onClick={() => {
                                if(formState.numberOfPerson < 10) {
                                    setFormState(prev => ({...prev, numberOfPerson: prev.numberOfPerson + 1}))
                                }
                            }} className={style.plus} >
                                <Image width="12" height="12" src={plusIcon} alt="plus icon" />
                            </span>
                        </div>
                        {formStateError.numberOfPerson && <strong className={style.error}>{formStateError.numberOfPerson}</strong>}
                        {
                            !requestResult ? 
                            <button type={isLoading ? "button" : "submit"} className={style[isLoading ? "actionBtnDarkDisabled" : "actionBtnDark"]} disabled={isLoading} > 
                                <span>{isLoading ? "Processing request..." : "MAKE A RESERVATION"}</span>  
                                {isLoading && <span className={style.circle}></span>}  
                            </button>
                            :
                            requestResult == "success" ? <span className={style.success} >Mail sent ✅</span> 
                            :
                            <span className={style.error} >Error happened ⛔, check your internet connexion and retry.</span>
                        }

                    </form>
                    <div className={style.illus}>
                        <Image fill alt="six lines aligned vertically for decoration" src={lines} />
                    </div>
                </div>
            </section>
        </section>
    );
}