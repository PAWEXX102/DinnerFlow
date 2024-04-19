import QRCode from "qrcode.react";
import { AuthContext } from "@/provider/AuthProvider";
import { LinkButton } from "./Button";
import { useMediaQuery } from "react-responsive";

export default function QrCode() {
  const { user }: any = AuthContext();
  const userInfo = user.user;

  const qrData = {
    userId: userInfo.uid,
  };

  const url = "192.168.100.115:3000/check";
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const qrValue = `${url}?data=${encodeURIComponent(JSON.stringify(qrData))}`;

  return (
    <div className=" bg-white shadow-custom py-20 rounded-xl flex flex-col items-center justify-center text-center">
      <h1 className=" sm:text-4xl text-3xl font-bold mb-10 px-20">Odbierz swój obiad</h1>
      <QRCode size={isMobile ? 150:250} value={qrValue} />
      <h1 className=" sm:text-3xl text-2xl font-bold mt-20 px-20">Albo, oddaj go komuś innemu</h1>
      <LinkButton
        label="Oddaj obiad"
        className=" bg-black font-bold mt-10 text-white px-9 py-4 rounded-lg hover:text-black hover:bg-white hover:border-black border-[2px] border-black"
        href="/give"
      />
    </div>
  );
}
