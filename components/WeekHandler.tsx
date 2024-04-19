"use client";

import { startOfWeek, endOfWeek, addWeeks, format, set } from "date-fns";
import DishCard from "@/components/Dishes";
import { useState, useEffect } from "react";
import { LinkButton } from "./Button";
import { useAnimate } from "framer-motion";
import { fetchFirestoreCollection } from "@/Backend/fetch";

export default function WeekHandler() {
  const [scout, animate] = useAnimate();
  const [menu, setMenu] = useState<any>({});
  const [currentWeek, setCurrentWeek] = useState(0);
  const now = addWeeks(new Date(), currentWeek);
  const start = startOfWeek(now).getTime() / 1000;
  const end = endOfWeek(now).getTime() / 1000;

  const handleNextWeek = async () => {
    animate(scout.current, {
      x: 50,
      transition: {
        duration: 0.2,
      },
    });
    setTimeout(() => {
      setCurrentWeek((prev) => prev + 1);
    }, 100);
    setTimeout(() => {
      animate(scout.current, {
        x: 0,
        transition: {
          duration: 0.2,
        },
      });
    }, 200);
  };

  const handlePreviousWeek = async () => {
    animate(scout.current, {
      x: -50,
      transition: {
        duration: 0.2,
      },
    });
    setTimeout(() => {
      setCurrentWeek((prev) => prev - 1);
    }, 100);
    setTimeout(() => {
      animate(scout.current, {
        x: 0,
        transition: {
          duration: 0.2,
        },
      });
    }, 200);
  };

  useEffect(() => {
    fetchFirestoreCollection("menu").then((response) => {
      setMenu(response);
      console.log(response);
    });
  }, []);

  return (
    <div className=" flex flex-col shadow-custom p-5 sm:p-10 rounded-xl gap-y-[5rem]">
      <p className=" text-center text-lg font-bold sm:text-2xl text-neutral-900">
        📅 {format(start * 1000, "dd.MM.yyyy")} -{" "}
        {format(end * 1000, "dd.MM.yyyy")} 📅
      </p>
      <div
        className=" flex flex-wraw gap-40 items-center justify-center"
        ref={scout}
      >
        {menu &&
          (() => {
            const thisWeekDishes = Object.keys(menu).filter((key: string) => {
              const dishTime = menu[key].Time?.seconds;
              return dishTime >= start && dishTime <= end;
            });

            if (thisWeekDishes.length === 0) {
              return (
                <p className=" font-bold sm:text-3xl text-xl text-center text-neutral-500">
                  Ups! Wygląda na to, że kucharze są na wakacjach. Wróć za
                  chwilę, aby zobaczyć nowe dania na ten tydzień!
                </p>
              );
            }
            return thisWeekDishes.map((key: string, index: number) => (
              <DishCard key={index} dish={menu[key]} />
            ));
          })()}
      </div>
      <div className=" flex  flex-col-reverse gap-y-4 sm:flex-row justify-between">
        <LinkButton
          label="Poprzedni Tydzień"
          className=" bg-blue-500 text-white font-bold px-12 py-4 rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 border-[2px] border-white"
          onClick={handlePreviousWeek}
        />
        <LinkButton
          label="Następny Tydzień"
          className=" bg-blue-500 text-white font-bold px-12 py-4 rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 border-[2px] border-white"
          onClick={handleNextWeek}
        />
      </div>
    </div>
  );
}
