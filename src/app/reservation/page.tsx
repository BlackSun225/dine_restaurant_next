"use client"

import Image from "next/image";
import Link from "next/link";
import style from "@/app/css/reservation.module.css"

import { useState } from "react";

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

    return (
        <section className={style.main} >
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
                        // event.currentTarget.value;
                    }}>
                        <input value={formState.name} 
                            onChange={(event) => {
                                setFormState(prev => ({...prev, name: formatName(event.target.value)}))
                            }} 
                            type="text" name="name" id="name" placeholder="Name" 
                        />
                        <input onChange={event => setFormState(prev => ({...prev, email: event.target.value}))} 
                            type="email" name="email" id="email" placeholder="Email" 
                        />
                        <div className={style.pick} id="date">
                            <span>Pick a date</span>
                            <div>
                                <input onChange={event => setFormState(prev => ({...prev, month: event.target.value}))}
                                 type="number" name="month" id="month" min="1" max="12" placeholder="MM" />
                                <input onChange={event => setFormState(prev => ({...prev, month: event.target.value}))} 
                                type="number" name="day" id="day" min="1" max="31" placeholder="DD" />
                                <input onChange={event => setFormState(prev => ({...prev, year: event.target.value}))}  
                                 type="number" name="year" id="year" placeholder="YYYY" />
                            </div>
                        </div>
                        <div className={style.pick} id="time" >
                            <span>Pick a time</span>
                            <div>
                                <input onChange={event => setFormState(prev => ({...prev, hour: event.target.value}))}
                                 type="number" name="hour" id="hour" min="1" max="12" placeholder="09" />
                                <input onChange={event => setFormState(prev => ({...prev, minute: event.target.value}))}
                                 type="number" name="minute" id="minute" min="0" max="59" placeholder="00" />
            
                                <label htmlFor="dropTest" className={style.selectDrop} >
                                    <input id="dropTest" type="checkbox" />
                                    <div className={style.dropVal}>
                                        <span>{formState.drop}</span>
                                        <Image width="15" height="8" src={arrowIcon} alt="arrow icon" />
                                    </div>
                                    <ul className={style.dropMenu}>
                                        <li onClick={() => {
                                            console.log("AM clicked")
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
                        <span className={style.actionBtnDark}> MAKE A RESERVATION </span>
                    </form>
                    <div className={style.illus}>
                        <Image fill alt="six lines aligned vertically for decoration" src={lines} />
                    </div>
                </div>
            </section>
        </section>
    );
}