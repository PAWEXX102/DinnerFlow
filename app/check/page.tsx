"use client";
import { useSearchParams } from "next/navigation";
import { checkUserPaid, getUserData } from "@/Backend/fetch";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Check() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [paid, setPaid] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [qrData, setQrData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      const qrData = JSON.parse(decodeURIComponent(data as string));
      setQrData(qrData);
      console.log("QR Data:", qrData);
      checkUserPaid(qrData.userId).then((response) => {
        setPaid(response);
      });
      getUserData(qrData.userId).then((response) => {
        setUser(response);
      });
      setInterval(() => {
      setLoading(false);
      }, 100);
    }
  }, [data]);

  return (
    <div className=" pt-20 items-center h-svh flex text-center justify-center">
      {!loading && (
        <div className=" items-center text-center flex justify-center flex-col gap-y-10">
          {paid ? (
            <h1 className="text-2xl px-4 font-bold text-green-500">
              Obiad został pomyślnie odebrany
            </h1>
          ) : (
            <h1 className="text-2xl px-4 font-bold text-red-500">
              Użytkownik nie dokonał płatności albo już odebrał obiad
            </h1>
          )}
          {paid ? (
            <Image
              src="/double-check.gif"
              width={300}
              height={100}
              alt="Checkmark"
            />
          ) : (
            <Image src="/xmark.gif" width={300} height={100} alt="Xmark" />
          )}
          <div className=" flex flex-col gap-y-4">
            <div className=" flex justify-center gap-x-2 text-center items-center">
              <h1 className=" font-bold text-lg">Informacje o uczniu</h1>
              <Image
                src="/information.png"
                width={30}
                height={20}
                alt="Student"
              />
            </div>
            <div className=" text-start font-medium">
              <p>
                <span className=" text-blue-500">ID:</span> {qrData.userId}
              </p>
              <p>
                <span className=" text-blue-500">Imię:</span> {user?.name}
              </p>
              <p>
                <span className=" text-blue-500">Nazwisko:</span>{" "}
                {user?.surname}
              </p>
              <p>
                <span className=" text-blue-500">Klasa:</span> {user?.class}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
