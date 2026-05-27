import Image from "next/image";
import Link from "next/link";

import style from "@/app/css/header.module.css";

const logo = "/logo.svg";


export default function Header() {

    return (
        <header className={style.header}>
            <Link className={style.logo} href="/">
                <Image fill src={logo} alt="dine restaurant logo" />
            </Link>
        </header>
    );
}