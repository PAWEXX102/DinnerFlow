"use client";
import { AuthContext } from "@/provider/AuthProvider";
import { useEffect, useState } from "react";
import { fetchFirestoreCollection, getUserData } from "@/Backend/fetch";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/services/firebase";
import { Skeleton } from "@nextui-org/react";

export default function Welcome() {
  const { user }: any = AuthContext();
  const [userData, setUserData] = useState<any>({});
  const [randomSentence, setRandomSentence] = useState<any>({});
  const [dinnerAvailable, setDinnerAvailable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const userInfo = user.user;
  useEffect(() => {
    getUserData(userInfo.uid).then((response) => {
      setUserData(response);
      setLoading(false);
    });
    async function fetchSentences() {
      const sentences = await fetchFirestoreCollection("proverbs");
      const randomSentence =
        sentences[Math.floor(Math.random() * sentences.length)];
      setRandomSentence(randomSentence);
    }

    async function CheckDinner() {
      const docSnap = await getDoc(doc(firestore, "users", userInfo.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.usedDate && data.paidDate) {
          const usedDate = new Date(
            data.usedDate.toDate().setHours(0, 0, 0, 0)
          );
          const paidDate = new Date(
            data.paidDate.toDate().setHours(0, 0, 0, 0)
          );
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          if (
            usedDate.getTime() < currentDate.getTime() &&
            paidDate.getTime() >= currentDate.getTime()
          ) {
            setDinnerAvailable(true);
          } else {
            setDinnerAvailable(false);
          }
        } else {
          throw new Error("No Used Date or Paid Date!");
        }
      } else {
        throw new Error("No User Data!");
      }
    }
    fetchSentences();
    CheckDinner();
  }, []);
  return (
    <>
      <Skeleton isLoaded={!loading} className=" w-max">
        <h1 className=" font-semibold sm:text-5xl text-4xl mb-2">
          Smacznego Obiadu{" "}
          <span className=" text-blue-500">{userData && userData.name} </span>
          🙂
        </h1>
      </Skeleton>
      <Skeleton isLoaded={!loading} className=" w-[50%] h-10">
        <p className=" sm:text-xl w-max text-lg bg-transparent text-neutral-400">
          &quot;{randomSentence && randomSentence.title}&quot;
        </p>
      </Skeleton>
      <Skeleton isLoaded={!loading} className=" w-max h-20">
        <div className=" flex items-center text-center gap-x-2">
          {dinnerAvailable ? (
            <>
              <h1 className=" text-green-500 font-medium sm:text-2xl text-xl mt-5">
                Obiad Dostępny
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#10B981"
                className="w-8 h-8 mt-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </>
          ) : (
            <>
              <h1 className=" text-red-500 font-medium sm:text-2xl text-xl mt-5">
                Obiad niedostępny
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#EF4444"
                className="w-8 h-8 mt-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </>
          )}
        </div>
      </Skeleton>
    </>
  );
}
