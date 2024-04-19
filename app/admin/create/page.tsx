"use client";
import { getFirebaseImageURL, getUserData } from "@/Backend/fetch";
import { useEffect, useState } from "react";
import { fetchFirestoreCollection } from "@/Backend/fetch";
import Image from "next/image";
import {
  onSnapshot,
  collection,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import Link from "next/link";
import { firestore } from "@/services/firebase";
import React from "react";
import { Input } from "@nextui-org/react";
import { Calendar } from "@nextui-org/react";
import { LinkButton } from "@/components/Button";
import { menuValidation } from "@/validationSchema/menu";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();

  const [menu, setMenu] = useState<any>([]);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Time, setTime] = useState("");

  useEffect(() => {
    fetchFirestoreCollection("Menu").then((response) => {
      setMenu(response);
    });
  });

  const handleNew = async () => {
    const collectionRef = collection(firestore, "menu");
    const payload = {
      Name,
      Description,
      Time: Timestamp.fromDate(new Date(Time)),
    };
    await addDoc(collectionRef, payload);
    console.log("The new ID is:");
    router.push("/admin");
  };

  return (
    <div className="pt-32 mx-[6%] gap-y-20 bg-white">
      <h1 className="text-7xl font-bold text-blue-500 mb-10">Hello</h1>
      <p className="text-neutral-400 text-xl">Utwórz nowy obiad</p>
      <form>
        <div className="flex flex-row  justify-center bg-gray-100 rounded-xl">
          <div className="flex flex-col py-5 px-8 w-[60%]">
            <label htmlFor="Name" className="ml-2 font-medium text-sm">
              Nazwa dania
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="bg-white mt-3 ml-2 rounded-md py-2 px-4 border border-gray-400"
              placeholder="Nazwa dania"
            />
            <label htmlFor="Description" className="ml-2 font-medium text-sm">
              Opis dania
            </label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              name="Description"
              placeholder="Opis dania"
              className="bg-white mt-3 ml-2 rounded-md py-2 px-4 border border-gray-400"
            />
            <label className="ml-2 font-medium text-sm">Podaj datę</label>
            <input
              onChange={(e) => setTime(e.target.value)}
              type="date"
              name=""
              id=""
              className="bg-white mt-3 ml-2 rounded-md py-2 px-4 border border-gray-400"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            href='/admin'
            className="bg-gray-300 text-white px-3 py-2 rounded-xl mt-2 mr-2 text-md hover:bg-gray-200"
          >
            Wróć
          </Link>
          <button
            onClick={() => handleNew()}
            className="bg-blue-500 text-white px-3 py-3 rounded-xl mt-2 text-md hover:bg-white hover:text-blue-500 border-gray-200 border-2 text-bold"
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
};
export default Admin;
