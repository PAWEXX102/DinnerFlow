"use client";
import useAuthentication from "@/hooks/useAuthentication";
import WeekHandler from "@/components/WeekHandler";
import Welcome from "@/components/Welcome";
import QrCode from "@/components/QrCode";

const Profile = () => {
  useAuthentication();
  return (
    <div className=" pt-32 mx-[6%] flex flex-col gap-y-20 bg-white">
      <section>
        <Welcome />
      </section>
      <section>
        <h1 className=" font-semibold sm:text-4xl text-3xl mb-5 text-slate-500">Menu 🍛</h1>
        <WeekHandler />
      </section>
      <section className=" mb-10">
        <h1 className=" font-semibold sm:text-4xl text-3xl mb-5 text-slate-500">QrCode </h1>
        <QrCode />
      </section>
    </div>
  );
};

export default Profile;
