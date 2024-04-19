import { getFirebaseImageURL } from "@/Backend/fetch";
import { useState, useEffect } from "react";
import { useMemo } from "react";

function getDayOfWeek(timestamp: number) {
  const date = new Date(timestamp * 1000);

  const day = date.getDay();

  const days = ["Nd", "Pn", "Wt", "Śr", "Czw", "Pt", "So"];

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
      className=" border-2 w-44 h-44 flex flex-col justify-between text-center bg-center bg-cover bg-no-repeat rounded-xl border-black"
    >
      <div
        className=" flex justify-between px-4 pt-2 pb-2 text-center bg-cover bg-center bg-no-repeat items-center rounded-t-lg"
      >
        <h1 className=" font-medium text-xl text-black">{dish.Name}</h1>
        <div className=" text-black text-xl font-medium">
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
