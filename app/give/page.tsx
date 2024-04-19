"use client";

import { useState, useEffect } from "react";
import { getUsersPerName, getClass, getUserData, GiveGift } from "@/Backend/fetch";
import { LinkButton } from "@/components/Button";
import { AuthContext } from "@/provider/AuthProvider";
import { Select, SelectItem, Input, Skeleton } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import Image from "next/image";

export default function GiveDinner() {
  const { user }: any = AuthContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [serach, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [Currentclas, setCurrentClas] = useState("");
  const [classes, setClasses] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [usersLoaded, setUsersLoaded] = useState(false);

  const UserInfo = user.user;

  useEffect(() => {
    if (serach.length <= 0) {
      getUsersPerName(UserInfo.uid, Currentclas).then((response) => {
        setUsers(response);
        setUsersLoaded(true);
      });
    } else {
      console.log("Search", serach);
      getUsersPerName(UserInfo.uid, Currentclas, serach).then((response) => {
        setUsers(response);
        setUsersLoaded(true);
      });
    }
    getClass().then((response) => {
      setClasses(response);
    });
    getUserData(UserInfo.uid).then((response) => {
      setCurrentUser(response);
    });
    setUsersLoaded(false);
  }, [Currentclas, serach]);

  const handleGift = async (user: any) => {
    await GiveGift(user.id).then((response: boolean) => {
      if (response) {
        onOpen();
      }
    });
  };

  return (
    <main className="pt-32 mx-[6%] flex flex-col gap-y-20">
      <div className=" flex items-center gap-x-4 w-full justify-between">
        <h1 className=" text-5xl font-bold ">Podaruj komuś swój obiad </h1>
        <Image src="/gift-box.png" alt="GiftBox" width={100} height={500} />
      </div>
      <div className=" flex flex-col gap-y-4">
        <div className=" py-5 flex flex-wrap gap-3 justify-center shadow-custom rounded-xl items-center text-center rounded-t-xl">
          <Input
            type="text"
            label="Imię"
            placeholder="Wpisz imię"
            variant="bordered"
            className=" sm:max-w-[20rem] max-w-[20rem] rounded-xl font-medium"
            onChange={(e: any) => setSearch(e.target.value)}
          />
          <Select
            placeholder="Podaj klasę"
            label="Klasa"
            variant="bordered"
            onChange={(e) => setCurrentClas(e.target.value)}
            className=" font-medium sm:max-w-[10rem] max-w-[20rem] rounded-xl"
          >
            {classes &&
              classes.map((clas) => (
                <SelectItem key={clas} value={clas} className=" font-medium">
                  {clas}
                </SelectItem>
              ))}
          </Select>
        </div>
        <Skeleton
          isLoaded={usersLoaded}
          className={` ${
            users.length > 0 ? "shadow-custom" : ""
          } rounded-xl text-center`}
        >
          {users.length <= 0 ? (
            <p className=" text-3xl font-bold pt-20">
              Aby oddać komuś swój obiad, podaj jego imię
            </p>
          ) : (
            users.map((user, index) => {
              return (
                <div
                  key={index}
                  className=" border-2 m-3 rounded-lg flex items-center justify-between sm:p-5 p-3"
                >
                  <div className="sm:text-center items-start sm:items-center flex sm:flex-row flex-col gap-x-3">
                    <div className=" flex sm:gap-x-4 gap-x-1 text-center">
                      <h1 className=" sm:text-2xl text-lg font-bold">
                        {user.name}
                      </h1>
                      <h1 className="sm:text-2xl text-lg font-bold text-balance overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {user.surname}
                      </h1>
                    </div>
                    <p className=" sm:text-xl font-medium text-gray-400">
                      {user.class}
                    </p>
                  </div>
                  <LinkButton
                    label="Podaruj"
                    onClick={() => handleGift(user)}
                    className=" bg-blue-500 text-white font-bold sm:px-12 sm:py-4 px-9 py-3 rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 border-[2px] border-white"
                  />
                </div>
              );
            })
          )}
        </Skeleton>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-lg gap-1 text-green-400">
                Obiad został podarowany pomyślnie!
              </ModalHeader>
              <ModalBody className=" items-center">
                <Image
                  src="/double-check.gif"
                  alt="GiftBox"
                  width={300}
                  height={500}
                />
              </ModalBody>
              <ModalFooter>
                <LinkButton
                  label="Zamknij"
                  onClick={onClose}
                  className=" bg-red-500 text-white font-bold px-9 py-3 rounded-lg hover:text-red-500 hover:bg-white hover:border-red-500 border-[2px] border-white"
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
