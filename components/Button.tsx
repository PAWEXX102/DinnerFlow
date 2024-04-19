'use client';
import { motion } from "framer-motion";
import { ButtonProp } from "@/types/ButtonTypes";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";


const LinkButton = ({ label, className, href, onClick }: ButtonProp) => {
  const router = useRouter();
  const currentPath = usePathname();

  const handleClick = () => {
    if (currentPath === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href && href !== '') {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={className}
      onClick={handleClick}
    >
      {label}
    </motion.button>
  );
};
export { LinkButton };
