"use client";
import { LinkButton } from "@/components/Button";
import InputField from "@/components/InputField";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "@/constants/routes";
import useAuthentication from "@/hooks/useAuthentication";
import { motion, useAnimate } from "framer-motion";
import { auth } from "@/services/firebase";
import { registerValidation } from "@/validationSchema/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { firestore } from "@/services/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const GetUserData = async (values: any, ID: any) => {
  const docRef = doc(firestore, "users", ID);
  await setDoc(docRef, {
    name: values.name,
    surname: values.surname,
    class: values.class,
    email: values.email,
    password: values.password,
    Gift: Timestamp.fromDate(
      new Date(new Date().setDate(new Date().getDate() - 1))
    ),
    usedDate: Timestamp.fromDate(
      new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    ),
    paidDate: Timestamp.fromDate(
      new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    ),
  });
  console.log("Document written with ID: ", docRef.id);
};

const Register = () => {
  const [scope, animate] = useAnimate();
  const router = useRouter();
  useAuthentication();
  console.log("Register");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = registerValidation();
  const submitForm = async (values: any) => {
    console.log("Register form values", values);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((response) => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: values.name + " " + values.surname,
          });
          GetUserData(values, auth.currentUser.uid);
        }
        reset();
        router.push(PROFILE_ROUTE);
      })
      .catch((e) => {
        console.log("catch ", e.message);
        alert("Something went wrong please try again");
      });
  };

  const handleAnimation = async () => {
    window.scrollTo(0, 0);
    animate("#TextInfo", {
      x: 300,
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" },
    });

    animate("#Login", {
      x: "-25%",
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" },
    });
    setTimeout(() => {
      router.push(LOGIN_ROUTE);
    }, 300);
    animate("#Register", {
      x: "80%",
      transition: { duration: 1, ease: "easeInOut" },
    });
  };

  return (
    <div
      ref={scope}
      className={`flex pt-32 sm:pt-0 flex-col sm:flex-row-reverse justify-center text-center items-center gap-y-20`}
    >
      <motion.div
        initial={{ x: "-25%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
        id="Login"
        className="items-center text-center md:w-[60%] sm:w-[65%] w-[90%] justify-center flex flex-col"
      >
        <h1 className=" text-5xl font-bold mb-5 max-w-[40rem]">
          Załóż darmowe konto
        </h1>
        <div className=" flex mb-14 text-center items-center gap-x-2">
          <h1 className=" text-5xl font-bold text-neutral-500">DinnerID</h1>
          <Image src="/protection.png" alt="logo" width={50} height={50} />
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className=" lg:w-[40%] md:w-[60%] grid grid-flow-row text-center w-[80%] "
        >
          <InputField
            register={register}
            error={errors.name}
            type="text"
            placeholder="Name"
            name="name"
          />
          <InputField
            register={register}
            error={errors.surname}
            type="text"
            placeholder="Surname"
            name="surname"
          />
          <InputField
            register={register}
            error={errors.class}
            type="text"
            placeholder="Class"
            name="class"
          />
          <InputField
            register={register}
            error={errors.email}
            type="text"
            placeholder="Email"
            name="email"
          />
          <InputField
            register={register}
            error={errors.password}
            type="password"
            placeholder="Password"
            name="password"
          />
          <InputField
            register={register}
            error={errors.cnfPassword}
            type="password"
            placeholder="Confirm Password"
            name="cnfPassword"
          />

          <LinkButton
            label="Zarejestruj się"
            className="bg-blue-500 text-white font-bold px-12 mt-6 py-4 rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 border-[2px] border-white"
          />
        </form>
      </motion.div>
      <motion.div
        id="Register"
        initial={{ x: "70%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
        style={{ backgroundImage: `url('./LoginBg.png')` }}
        className="sm:w-[40%] w-full flex gap-y-10 items-center flex-col text-center justify-center h-screen bg-no-repeat bg-right bg-cover"
      >
        <motion.h1
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          id="TextInfo"
          className=" text-5xl text-white font-bold"
        >
          Jeden z nas?
        </motion.h1>
        <motion.p
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          id="TextInfo"
          className=" text-white text-xl font-medium"
        >
          Jeśli masz już konto, zaloguj się. Tęskniliśmy za tobą!
        </motion.p>
        <LinkButton
          label="Zaloguj się"
          onClick={handleAnimation}
          className="bg-white w-max text-black font-bold px-12 py-4 rounded-lg hover:text-white hover:bg-black hover:border-black border-[2px] border-white"
        />
      </motion.div>
    </div>
  );
};

export default Register;
