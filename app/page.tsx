"use client";

import { LOGIN_ROUTE, PROFILE_ROUTE } from "@/constants/routes";
import { Benefits } from "@/constants";
import { LinkButton } from "@/components/Button";
import { PricePlans } from "@/components/PricePlans";
import { Services } from "@/constants";
import FooterButtons from "@/components/FooterButtons";
import { useMediaQuery } from "react-responsive";
import AnimationOpacity, {
  AnimationSlideY,
  AnimationSlideX,
} from "@/Animation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/services/firebase";

export default function Home() {
  const isSmallDevice = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <main className=" lg:w-[60%] w-[90%] items-center mx-auto text-center pt-[6rem] pb-10">
      <AnimationOpacity>
        <section
          style={{ backgroundImage: `url('./Bg.png')` }}
          className=" bg-no-repeat bg-contain bg-center h-max flex flex-col justify-center items-center gap-6"
        >
          <h1 className=" text-5xl font-bold">Witamy w Dinner Flow</h1>
          <p className=" font-bold text-5xl text-neutral-600 mx-auto h-max max-w-[20rem]">
            Przyszłość obiadów szkolnych
          </p>
          <p className="md:max-w-[40rem] font-medium text-neutral-400">
            W DinnerFlow z pasją pragniemy zrewolucjonizować sposób, w jaki
            uczniowie cieszą się szkolnymi obiadami. Nasza innowacyjna aplikacja
            umożliwia uczniom łatwe i szybkie zamawianie posiłków, płacenie za
            nie za pomocą płatności zbliżeniowych, a nawet udostępnianie
            posiłków znajomym. Naszą misją jest zapewnienie uczniom płynnego,
            wygodnego i bezpiecznego doświadczenia, przy jednoczesnym wspieraniu
            poczucia wspólnoty i przyjemności w porze lunchu.
          </p>
          <LinkButton
            label="Zacznij Teraz"
            href={auth.currentUser ? PROFILE_ROUTE : LOGIN_ROUTE}
            className=" bg-blue-500 text-white font-bold px-12 py-4 rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 border-[2px] border-white"
          />
        </section>
      </AnimationOpacity>
      <AnimationOpacity>
        <section className=" border-2 mt-20 border-black rounded-xl flex flex-col md:flex-row gap-20 justify-center p-10">
          {Benefits.map((benefit, index) => (
            <div key={index}>
              <h1 className=" text-xl font-bold mb-8 text-neutral-600">
                {benefit.Title}
              </h1>
              <p className=" font-medium">{benefit.Description}</p>
            </div>
          ))}
        </section>
      </AnimationOpacity>
      <AnimationSlideY>
        <section className=" mt-20" id="Services">
          <h1 className=" text-4xl mb-10 font-bold text-center mt-20">
            Nasze Usługi Obejmują
          </h1>
          <div className="flex md:flex-row flex-col gap-10">
            {Services.map((service, index) => (
              <div
                key={index}
                className=" border-2 mt-10 border-black flex flex-col rounded-xl gap-5 items-center text-center p-10"
              >
                <Image
                  src={service.Image}
                  alt="service"
                  width={100}
                  height={100}
                />
                <h1 className=" text-xl font-bold mb-8 text-neutral-600">
                  {service.Title}
                </h1>
                <p className=" font-medium">{service.Description}</p>
              </div>
            ))}
          </div>
        </section>
      </AnimationSlideY>
      {isSmallDevice ? (
        <AnimationSlideY>
          <section className=" bg-blue-50/75 rounded-xl lg:p-20 p-14 mt-20 text-center">
            <h1 className=" lg:text-6xl md:text-5xl text-3xl font-medium mb-8 text-neutral-700">
              Brzmi interesująco? Zapisz się
            </h1>
            <LinkButton
              label="Zacznij Teraz"
              href={LOGIN_ROUTE}
              className=" bg-blue-500 text-white font-bold px-12 py-4 rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 border-[2px] border-white"
            />
          </section>
        </AnimationSlideY>
      ) : (
        <AnimationSlideX>
          <section className=" bg-blue-50/75 rounded-xl lg:p-20 p-14 mt-20 text-center">
            <h1 className=" lg:text-6xl md:text-5xl text-3xl font-medium mb-8 text-neutral-700">
              Brzmi interesująco? Zapisz się
            </h1>
            <LinkButton
              label="Zacznij Teraz"
              href={auth.currentUser ? PROFILE_ROUTE : LOGIN_ROUTE}
              className=" bg-blue-500 text-white font-bold px-12 py-4 rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 border-[2px] border-white"
            />
          </section>
        </AnimationSlideX>
      )}
      <AnimationOpacity>
        <footer className=" flex justify-between gap-5 mt-20">
          <div>
            <h1 className=" text-3xl font-bold text-left mb-4">Dinner Flow</h1>
            <FooterButtons />
          </div>
          <div>
            <h1 className=" font-bold mb-3">Usługi</h1>
            <ul className=" flex flex-col">
              {Services.map((service, index) => (
                <Link
                  href={"#Services"}
                  className=" py-1 md:text-start text-center hover:text-blue-500 duration-150"
                  key={index}
                >
                  {service.Title}
                </Link>
              ))}
            </ul>
          </div>
          <div className="w-[15rem]">
            <h1 className=" font-bold mb-4 text-start">
              Akceptujemy wszystkie głowne karty kredytowe, co umozliwia szybką
              i łatwą płatność
            </h1>
            <Image src="/cards.png" alt="cards" width={200} height={100} />
          </div>
        </footer>
      </AnimationOpacity>
    </main>
  );
}
