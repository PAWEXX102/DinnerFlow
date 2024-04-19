import { useEffect } from "react";
import { db, firestore } from "@/services/firebase";
import { get, ref } from "firebase/database";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { storage } from "@/services/firebase";
import { query, where } from "firebase/firestore";

export const fetchFirestoreCollection = async (RefName: string) => {
  const querySnapshot = await getDocs(collection(firestore, RefName));
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

export const fetchFirestoreDoc = async (RefName: string, docName: string) => {
  const docSnap = await getDoc(doc(firestore, RefName, docName));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
};

export const getUserData = async (uid: any) => {
  const docSnap = await getDoc(doc(firestore, "users", uid));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
};

export async function getFirebaseImageURL(element: string) {
  const imageRef = storageRef(storage, "Dishes/" + element);

  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error getting document:", error);
    return "";
  }
}

export const checkUserPaid = async (uid: string): Promise<boolean> => {
  const docSnap = await getDoc(doc(firestore, "users", uid));
  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.usedDate && data.paidDate) {
      const usedDate = new Date(data.usedDate.toDate().setHours(0, 0, 0, 0));
      const paidDate = new Date(data.paidDate.toDate().setHours(0, 0, 0, 0));
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (
        usedDate.getTime() < currentDate.getTime() &&
        paidDate.getTime() >= currentDate.getTime()
      ) {
        setTimeout(async () => {
          await updateDoc(doc(firestore, "users", uid), {
            usedDate: Timestamp.fromDate(new Date()),
          });
        }, 1000);
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error("No Used Date or Paid Date!");
    }
  } else {
    throw new Error("No User Data!");
  }
};

export const updateDocument = async (
  documnt: string,
  uid: string,
  data: any
) => {
  await updateDoc(doc(firestore, documnt, uid), data);
};

export const getUsersPerName = async (
  userUid: any,
  clas: string,
  name?: string
) => {
  let quer;
  if (clas === "Wszystkie") {
    quer = collection(firestore, "users");
  } else {
    quer = query(collection(firestore, "users"), where("class", "==", clas));
  }

  const querySnapshot = await getDocs(quer);
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    if (
      doc.id !== userUid &&
      (!name || doc.data().name.toLowerCase().includes(name.toLowerCase()))
    ) {
      data.push({ id: doc.id, ...doc.data() });
    }
  });
  return data;
};

export const getClassNumber = async () => {
  const docSnapshot = await getDoc(
    doc(firestore, "class", "29GwAdXa7tNjOTcnB39A")
  );
  const data: any[] = [];
  if (docSnapshot.exists()) {
    const classes = docSnapshot.data().Numbers;
    classes.forEach((classItem: any) => {
      data.push(classItem);
    });
  }
  return data;
};

export const NewDish = async (value: any) => {
  const docRef = await collection(firestore, "Menu");
  await addDoc(docRef, value);
};

export const GiveGift = async (uid: string) => {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  const giftDate = docSnap.data()?.Gift?.toDate();
  const currentDate = new Date();
  const normalizedGiftDate = new Date(2000, giftDate.getMonth(), giftDate.getDate());
  const normalizedCurrentDate = new Date(2000, currentDate.getMonth(), currentDate.getDate());
  console.log(normalizedGiftDate, normalizedCurrentDate);
  if (normalizedGiftDate < normalizedCurrentDate) {
    await updateDoc(docRef, {
      Gift: Timestamp.fromDate(new Date()),
    });
    return true;
  }else{
    return false;
  }
};

export const CheckGift = async (uid: string) => {
  const docRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(docRef);
  const giftDate = docSnap.data()?.Gift?.toDate();
  const currentDate = new Date();
  const normalizedGiftDate = new Date(2000, giftDate.getMonth(), giftDate.getDate());
  const normalizedCurrentDate = new Date(2000, currentDate.getMonth(), currentDate.getDate());
  console.log(normalizedGiftDate, normalizedCurrentDate);
  if (normalizedGiftDate >= normalizedCurrentDate) {
    return true;
  }else{
    return false;
  }
}
