"use client";

import { useState } from "react";
import { GiveGift } from "@/Backend/fetch";
import { LinkButton } from "@/components/Button";
import { AuthContext } from "@/provider/AuthProvider";
import { Input } from "@nextui-org/react";
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
  const [search, setSearch] = useState("");
  const { user }: any = AuthContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState(true);

  const UserInfo = user.user;

  const handleGift = async (user: any) => {
    console.log("User", search);
    await GiveGift(search, UserInfo.uid).then((response: boolean) => {
      if (response) {
        setModalType(true);
      } else {
        setModalType(false);
      }
      setSearch("");
      onOpen();
    });
  };

  return (
    <main className="pt-32 mx-[6%] flex flex-col gap-y-20">
      <div className=" flex items-center gap-x-4">
        <h1 className=" text-5xl font-bold ">Podaruj komuś swój obiad </h1>
        <Image src="/gift-box.png" alt="GiftBox" width={100} height={500} />
      </div>
      <div className=" flex flex-col gap-y-4">
        <div className=" py-5 flex flex-wrap gap-3 justify-center shadow-custom rounded-xl items-center text-center rounded-t-xl">
          <Input
            type="email"
            label="Email"
            variant="bordered"
            value={search}
            className="max-w-[20rem]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <LinkButton
            label="Podaruj"
            onClick={() => handleGift(user)}
            className=" bg-blue-500 text-white font-bold px-12 w-[20rem] sm:w-[10rem] py-4 rounded-xl hover:text-blue-500 hover:bg-white hover:border-blue-500 border-[2px] border-white"
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className={`flex flex-col text-lg gap-1 ${
                  modalType ? "text-green-400" : "text-red-400"
                }`}
              >
                {modalType
                  ? "Udało się podarować obiad!"
                  : "Nie udało się podarować obiadu"}
              </ModalHeader>
              <ModalBody className=" items-center">
                <Image
                  src={modalType ? "/double-check.gif" : "/xmark.gif"}
                  alt="Information GIF"
                  width={300}
                  height={300}
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
