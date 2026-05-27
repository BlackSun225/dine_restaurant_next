import Image from "next/image";
import Link from "next/link";

import style from "@/app/css/footer.module.css";

const logo = "/logo.svg";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <Link className={style.logo} href="/">
                <Image fill src={logo} alt="dine" />
            </Link>
            <div>
                <ul>
                    <li>MARTHWAITE, SEDBERGH</li>
                    <li>CUMBRIA</li>
                    <li>+00 44 123 4567</li>
                </ul>
                <ul>
                    <li>OPEN TIMES</li>
                    <li>MON - FRI: 09:00 AM - 10:00 PM</li>
                    <li>SAT - SUN: 09:00 AM - 11:30 PM</li>
                </ul>
            </div>
            <span className={style.blacksun225}></span>
        </footer>
    );
}