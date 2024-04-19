'use client'

import { LinkButton } from "@/components/Button";
import InputField from "@/components/InputField";
import { PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { motion, useAnimate } from "framer-motion";
import { auth } from "@/services/firebase";
import { loginValidation } from "@/validationSchema/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";
import Image from "next/image";

const Login = () => {
  const [scope, animate] = useAnimate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = loginValidation();
  const router = useRouter();
  useAuthentication();
  const submitForm = (values: any) => {
    console.log("Login form values", values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((response) => {
        if (values.email === 'admin@gmail.com' && values.password === 'admin123') {
          router.push('/admin');
        } else{
          router.push(PROFILE_ROUTE);
        }
      })
      .catch((e) => {
        console.log("Login Error ", e.message);
        alert("Please try Again");
      });
  };

  const handleAnimation = async () => {
    window.scrollTo(0,0);
    animate("#TextInfo", {
      x: 300,
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" },
    });

    animate("#Login", {
      x: "25%",
      opacity: 0,
      transition: { duration: .5, ease: "easeInOut" },
    });
    await animate("#Register", {
      x: "-80%",
      transition: { duration: 1, ease: "easeInOut" },
    });
    router.push(REGISTER_ROUTE);
  };

  return (
    <div
      ref={scope}
      className={`flex pt-32 sm:pt-0 flex-col sm:flex-row justify-center text-center items-center gap-y-20`}
    >
      <motion.div
        initial={{ x: "25%", opacity: 0}}
        animate={{ x: "0%", opacity: 1}}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1}}
        id="Login"
        className="items-center text-center md:w-[60%] sm:w-[65%] w-[90%] justify-center flex flex-col"
      >
        <h1 className=" text-5xl font-bold mb-5 max-w-[40rem]">
          Zaloguj się do swojego konta za pomocą
        </h1>
        <div className=" flex mb-14 text-center items-center gap-x-2">
          <h1 className=" text-5xl font-bold text-neutral-500">DinnerID</h1>
          <Image src="/protection.png" alt="logo" width={50} height={50} />
        </div>
        <form
          onSubmit={handleSubmit(submitForm)}
          className=" lg:w-[40%] md:w-[60%] w-[80%] "
        >
          <InputField
            register={register}
            error={errors.email}
            type="text"
            placeholder="Email"
            name="email"
            className="my-2"
          />
          <InputField
            register={register}
            error={errors.password}
            type="password"
            placeholder="Password"
            name="password"
            className="mb-6"
          />
          <LinkButton
            label="Zaloguj się"
            className="bg-blue-500 text-white font-bold px-12 py-4 rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 border-[2px] border-white"
          />
        </form>
      </motion.div>
      <motion.div
        initial={{ x: "-70%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1}}
        id="Register"
        style={{ backgroundImage: `url('./LoginBg.png')` }}
        className="sm:w-[40%] w-full flex gap-y-10 items-center flex-col text-center justify-center h-screen bg-no-repeat bg-right bg-cover"
      >
        <motion.h1
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          id="TextInfo"
          className=" text-5xl text-white font-bold"
        >
          Nowy tutaj?
        </motion.h1>
        <motion.p
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          id="TextInfo"
          className=" text-white text-xl font-medium"
        >
          Załóż konto i odkryj potęcjał szkolnych stołówek
        </motion.p>
        <LinkButton
          onClick={handleAnimation}
          label="Zarejestruj się"
          className="bg-white w-max text-black font-bold px-12 py-4 rounded-lg hover:text-white hover:bg-black hover:border-black border-[2px] border-white"
        />
      </motion.div>
    </div>
  );
};

export default Login;
