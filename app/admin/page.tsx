"use client";

import { updatePassword, updateProfile } from "firebase/auth";
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
} from "firebase/firestore";
import Link from "next/link";
import { firestore } from "@/services/firebase";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { LinkButton } from "@/components/Button";

const Admin = () => {
  async function getImage() {
    const image = await getFirebaseImageURL("rosół.jpg");
    return image;
  }

  const [menu, setMenu] = useState<any>([]);

  useEffect(() => {
    fetchFirestoreCollection("menu").then((response) => {
      setMenu(response);
    });
  });

  const handleNew = async () => {
    const Name = prompt("Enter meal name:");
    const Description = prompt("ENter description");

    const collectionRef = collection(firestore, "menu");
    const payload = { Name, Description };

    if (Name == null || Description == null) {
      alert("Please fill in all fields");
    } else {
      const docRef = await addDoc(collectionRef, payload);
      console.log("The new ID is:" + docRef.id);
    }
  };

  const handleEdit = async (id: any) => {
    const Name = prompt("Enter meal name");
    const Description = prompt("Enter description");

    const docRef = doc(firestore, "menu", id);
    const payload = { Name, Description };
    if (Name == null || Description == null) {
      alert("Please fill in all fields");
    }
    setDoc(docRef, payload);
  };

  const handleDelete = async (id: any) => {
    const docRef = doc(firestore, "menu", id);
    await deleteDoc(docRef);
    onOpen();
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [serach, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [Currentclas, setCurrentClas] = useState("");
  const [classes, setClasses] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [modalType, setModalType] = useState(true);
  const router = useRouter();

  return (
    <div className="bg-white shadow-custom py-20 rounded-xl flex flex-col items-center justify-center text-center">
      <section>
        <h1 className=" font-semibold text-7xl">
          Witaj <span className=" text-blue-500">Adminie </span>
          🙂
        </h1>
        <p className=" text-2xl text-neutral-400">W czym możemy wam pomóc?</p>
      </section>
      <div>
        <h2>Add meal</h2>
        <div className="flex flex-center justify-center ">
          <input
            type="text"
            name="search"
            className="mt-3 mr-4 w-180 h-10 bg-white border border-gray-300 rounded-md black"
            placeholder=" Search meals..."
          ></input>
          <button
            onClick={() => router.push("/admin/create")}
            className="mt-3 bg-blue-500 text-white font-bold px-12 py-2 rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 border-[2px] border-white"
          >
            Add meal
          </button>
        </div>
        <h1 className="text-2xl py-2 px-4 ">My Meals</h1>

        {menu.map((menu: any, id: number) => (
          <div key={menu.id} className="flex justify-start">
            <div className="mt-3 py-5 px-8 bg-gray-300 rounded-lg mb-4 w-80 h-80 flex justify-between">
              <div className="flex justify-between">
                <div className="w-[80px] h-[80px]  rounded-xl mr-3 flex justify-start">
                  <Image src="/meal.png" alt='obiad' width={100} height={100} />
                </div>
                <div>
                  <h1 className="text-xl">{menu.Name}</h1>
                  <p className="text-gray-600 overflow-hidden flex ">
                    {menu.Description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div
                style={{ backgroundImage: `url('./edit.png')` }}
                className="w-10 h-10 rounded-xl ml-2 mt-4 bg-no-repeat bg-contain bg-center flex flex-col justify-center items-center gap-6"
              >
                <button
                  onClick={() => handleEdit(menu.id)}
                  className=" w-10 h-10 rounded-xl ml-2"
                />
              </div>

              <div
                style={{ backgroundImage: `url('./bin.png')` }}
                className="w-10 h-10 rounded-xl ml-2 mt-4 bf-no-repeat bg-contain bg-center flex flex-col justify-center items-center gap-6"
              >
                <button
                  onClick={() => handleDelete(menu.id)}
                  className="w-10 h-10 rounded-xl ml-2"
                />
              </div>
            </div>
          </div>
        ))}
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
                  ? "Udało się pomyślnie usunąc obiad!"
                  : "Nie udało się usunąć obiadu!"}
              </ModalHeader>
              <ModalBody className=" items-center">
                <Image
                  src={modalType ? "/bin-file.gif" : "/xmark.gif"}
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
    </div>
  );
};

export default Admin;
