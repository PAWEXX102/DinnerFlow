import { getFirebaseImageURL } from "@/Backend/fetch";
import { useState, useEffect } from "react";
import { useMemo } from "react";

function getDayOfWeek(timestamp: number) {
  const date = new Date(timestamp * 1000);

  const day = date.getDay();

  const days = ["N", "P", "W", "Ś", "C", "P", "S"];

  return days[day];
}

async function getImage() {
  const image = await getFirebaseImageURL("rosół.jpg");
  console.log(image);
  return image;
}

export default function DishCard({ dish }: { dish: any }) {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    async function getImage() {
      const image = await getFirebaseImageURL(dish.Name + ".jpg");
      setImageURL(image);
    }

    getImage();
  }, []);

  return (
    <div
      className=" border-2 w-[20rem] h-[20rem] flex flex-col justify-between text-center bg-center bg-cover bg-no-repeat rounded-xl border-black"
      style={{ backgroundImage: `url('${imageURL}')` }}
    >
      <div
        style={{ backgroundImage: `url('./Shadow1.png')` }}
        className=" flex justify-between px-2 pt-2 pb-2 text-center bg-cover bg-center bg-no-repeat items-center rounded-t-lg"
      >
        <h1 className=" font-medium text-xl text-neutral-100">{dish.Name}</h1>
        <div className=" text-white bg-blue-400 size-10 text-center font-semibold  rounded-lg border-2 border-blue-800 text-2xl items-center flex justify-center">
          {getDayOfWeek(dish.Time.seconds)}
        </div>
      </div>
      <div
        className=" bg-cover bg-center bg-no-repeat rotate-180 rounded-t-xl"
        style={{ backgroundImage: `url('./Shadow1.png')` }}
      ></div>
    </div>
  );
}
