"use client";

import { fetchRealTimeDataBase } from "@/Backend/fetch";
import { useEffect, useState } from "react";
import {LinkButton} from "./Button";

export const PricePlans = () => {
const [plans, setPlans] = useState<[string, number][]>([]);
useEffect(() => {
    fetchRealTimeDataBase('PricePlans').then((data:any) => {
        const arrayData: [string, number][] = Object.entries(data).map(([plan, price]) => [plan, Number(price)]);
        arrayData.sort((a: [string, number], b: [string, number]) => a[1] - b[1]);
        setPlans(arrayData);
    });
}, []);

  return (
    <>
      {plans.map(([plan, price], index) => (
        <div key={index} className=" border-[1px] rounded-xl border-neutral-200 lg:w-[50%] w-[100%]">
          <h1 className=" text-4xl font-medium py-4 rounded-t-xl text-white bg-blue-500">
            {plan}
          </h1>
          <p className=" font-semibold mt-10 text-6xl">{String(price) + "zł"}</p>
          <p className=" text-neutral-400 text-xl font-medium">Monthly</p>
            <LinkButton
                label="Kup Teraz"
                href="/"
                className=" bg-neutral-400 w-[80%] my-10 text-white font-bold py-3 rounded-lg hover:text-black hover:bg-white hover:border-black border-[2px] border-white"
            />
        </div>
      ))}
    </>
  );
};