"use client"

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import style from "./css/home.module.css";

// ICONS
const divide = "/icons/pattern-divide.svg"
const line = "/icons/pattern-lines.svg";

// IMAGES
const enjoyPlaceMob = "/enjoyable-place-mobile@2x.jpg";
const enjoyPlaceTablet = "/enjoyable-place-tablet@2x.jpg";
const localSourceDesk = "/locally-sourced-desktop.jpg";
const localSourceTab = "/locally-sourced-tablet.jpg";
const salmonMob = "/salmon-mobile.jpg";
const beefMob = "/beef-mobile@2x.jpg";
const chocolateMob = "/chocolate-mobile@2x.jpg";

const familyGatheringDesktop = "/family-gathering-desktop.jpg";
const familyGatheringTablet = "/family-gathering-tablet.jpg";
const familyGatheringMobile = "/family-gathering-mobile.jpg";

const specEventDesk = "/special-events-desktop.jpg";
const specEventTab = "/special-events-tablet.jpg";
const spectEventMob = "/special-events-mobile.jpg";

const socEventDesk = "/social-events-desktop.jpg";
const socEventTab = "/social-events-tablet.jpg";
const socEventMob = "/social-events-mobile.jpg";


export default function Home() {
  const [active, setActive] = useState<'family' | 'social' | 'special'>('family');

  return (
    <main className={style.main}>
      <section className={style.heroSection}>
        <Header />
        <div className={style.heroSectionBody} >
          <h1>Exquisite dining since 1989</h1>
          <p>Experience our seasonal menu in beautiful country surroundings. Eat the freshest 
              produce from the comfort of our farmhouse.
          </p>
          <Link className={style.actionBtn} href="/reservation">BOOK A TABLE</Link>
        </div>
      </section>

      <section className={style.one}>
        <div className={style.pros}>
            <div className={style.illus}>
                <Image fill className={`${style.img} ${style.mob}`} src={enjoyPlaceMob} alt="water flows" />
                <Image fill className={`${style.img} ${style.tablet}`} src={enjoyPlaceTablet} alt="water flows" />
            </div>
            <div className={style.text}>
                <Image width="70" height="7" src={divide} alt="divide icon" />
                <h2>Enjoyable place for all the family</h2>
                <p>Our relaxed surroundings make dining with us a great experience for everyone. We 
                    can even arrange a tour of the farm before your meal.
                </p>
            </div>
        </div>
        <div className={style.pros}>
            <div className={style.illus}>
                <Image className={`${style.img} ${style.mob}`} fill src={localSourceDesk} alt="the touch of the kitchen lead" />
                <Image className={`${style.img} ${style.tablet}`} fill src={localSourceTab} alt="the touch of the kitchen lead" />
                <div className={style.pattern}>
                  <Image fill src={line} alt="brown lines for design" />
                </div>
            </div>
            <div className={style.text}>
                <Image width="70" height="7" src={divide} alt="divide icon" />
                <h2>The most locally sourced food</h2>
                <p>
                  {"All our ingredients come directly from our farm or local fishery. So you be sure that you're eating the freshest, most sustainable food."}
                </p>
            </div>
        </div>
      </section>
      <section className={style.two}>
          <div className={style.text}>
              <Image width="70" height="7" src={divide} alt="divide icon" />
              <h1>A few highlights from our menu</h1>
              <p>
                {"We cater for all dietary requirements, but here's a glimpse at some of our diner's favourites. Our menu is revamped every season."}
              </p>
          </div>
          <div className={style.menu}>
              <div className={style.menuItem}>
                  <div className={style.img}>
                    <Image fill src={salmonMob} alt="" />
                  </div>
                  <div className={style.text}>
                      <h2>Seared Salmon Fillet</h2>
                      <p>Our locally sourced salmon served with a refreshing buckwheat summer salad.</p>
                  </div>
              </div>
              <div className={style.menuItem}>
                  <div className={style.img}>
                    <Image fill src={beefMob} alt="" />
                  </div>
                  <div className={style.text}>
                      <h2>Rosemary Filet Mignon</h2>
                      <p>Our prime beef served to your taste with a delicious choice of seasonal sides.</p>
                  </div>
              </div>
              <div className={style.menuItem}>
                  <div className={style.img}>
                    <Image fill src={chocolateMob} alt="" />
                  </div>
                  <div className={style.text}>
                      <h2>Summer Fruit Chocolate Mousse</h2>
                      <p>Creamy mousse combined with summer fruits and dark chocolate shavings.</p>
                  </div>
              </div>
          </div>
      </section>
      <section className={style.three}>
          <div className={style.illus}>
              <div className={style.pattern} >
                <Image fill src={line} alt="brown lines for design" />
              </div>
              <Image fill className={`${style.img} ${style.family} ${active == "family" && style.active} ${style.desk}`} src={familyGatheringDesktop} alt="" />
              <Image fill className={`${style.img} ${style.family} ${active == "family" && style.active} ${style.tablet}`} src={familyGatheringTablet} alt="" />
              <Image fill className={`${style.img} ${style.family} ${active == "family" && style.active} ${style.mob}`} src={familyGatheringMobile} alt="" />
              <Image fill className={`${style.img} ${style.special} ${active == "special" && style.active} ${style.desk}`} src={specEventDesk} alt="" />
              <Image fill className={`${style.img} ${style.special} ${active == "special" && style.active} ${style.tablet}`} src={specEventTab} alt="" />
              <Image fill className={`${style.img} ${style.special} ${active == "special" && style.active} ${style.mob}`} src={spectEventMob} alt="" />
              <Image fill className={`${style.img} ${style.social} ${active == "social" && style.active} ${style.desk}`} src={socEventDesk} alt="" />
              <Image fill className={`${style.img} ${style.social} ${active == "social" && style.active} ${style.tablet}`} src={socEventTab} alt="" />
              <Image fill className={`${style.img} ${style.social} ${active == "social" && style.active} ${style.mob}`} src={socEventMob} alt="" />
          </div>

          <div className={style.details}>
            <div>
              <h1 className={style.detailsTitle}>
                <div className={`${style.family} ${active == "family" && style.active}`} >Family Gathering</div>
                <div className={`${style.special} ${active == "special" && style.active}`} >Special Events</div>
                <div className={`${style.social} ${active == "social" && style.active}`} >Social Events</div>
              </h1>
              <div className={style.paragraph}>
                <p className={`${style.family} ${active == "family" && style.active}`} style={{"--count": "0"}as React.CSSProperties}>
                {"We love catering for entire families. So please bring everyone along a special meal with your loved ones. We'll provide a memorable experience for all."}
                </p>
                <p className={`${style.special} ${active == "special" && style.active}`} style={{"--count": "1"}as React.CSSProperties}>
                {"Wheter it's a romantic dinner or special date you're celebrating with others we'll look after you. We'll be sure to mark your special date with an unforgettable meal."}
                </p>
                <p className={`${style.social} ${active == "social" && style.active}`} style={{"--count": "2"}as React.CSSProperties}>
                {"Are you looking to have a larger social event? No problem! We're more than happy to cater for big parties. We'll work with you to make your event a hit with everyone."}
                </p>
              </div>
              <Link className={style.actionBtnDark} href="/reservation">BOOK A TABLE</Link>
            </div>

            <ul className={style.ul}>
              <li className={`${style.family} ${active == "family" && style.active}`}>
                  <span className={style.indicator}></span>
                  <span className={style.text} onClick={() => {
                    if(active != "family") {  setActive("family") }
                  }}>FAMILY GATHERING</span>
              </li>
              <li className={`${style.special} ${active == "special" && style.active}`}>
                  <span className={style.indicator}></span>
                  <span className={style.text} onClick={() => {
                    if(active != "special") {  setActive("special") }
                  }} >SPECIAL EVENTS</span>
              </li>
              <li className={`${style.social} ${active == "social" && style.active}`}>
                  <span className={style.indicator}></span>
                  <span className={style.text} onClick={() => {
                    if(active != "social") {  setActive("social") }
                  }} >SOCIAL EVENTS</span>
              </li>
            </ul>
          </div>
      </section>
      
      <section className={style.four}>
        <div>
          <h1>Ready to make a reservation?</h1>
          <Link className={style.actionBtn} href="/reservation">BOOK A TABLE</Link>
        </div>
          
      </section>
    </main>
  );
}
