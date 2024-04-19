import { NotificationType } from "@/types/NotificationTypes";
import { NotificationAnimation } from "@/Animation";
import Image from "next/image";

export const Notification = ({ message, type }: NotificationType) => {
    return (
        <NotificationAnimation>
            <div className={`absolute z-50 top-0 left-0 right-0 mx-auto rounded-md bg-white border-black border-2 w-max text-center`}>
                <div className={`flex items-center gap-x-3 justify-center px-6 py-3`}>
                    <Image src={`/${type}.png`} alt={type} width={50} height={20} />
                    <p className={`text-black text-xl font-semibold ml-2`}>{message}</p>
                </div>
            </div>
        </NotificationAnimation>
    );
};