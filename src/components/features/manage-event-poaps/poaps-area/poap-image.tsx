// react

// imports
import { Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { FC } from "react";

// types
import { Poap } from "./types";

type PoapImageProps = {
  poap: Poap;
  index: number;
  onShowPoapDetails: (poap: Poap) => void;
};

const PoapImage: FC<PoapImageProps> = ({ poap, index, onShowPoapDetails }) => {
  return (
    <Tooltip content={poap.name} placement="top" showArrow>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.1,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="aspect-square cursor-pointer"
        onClick={() => onShowPoapDetails(poap)}
      >
        <div className="w-full h-full relative">
          {/* wrapper with hover-revealed spacing */}
          <div className="w-full h-full rounded-full ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-neutral-800 transition-all duration-300 hover:p-1 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40">
            <motion.img
              src={(poap.animationUrl || poap.imageUrl)!}
              alt={poap.name}
              className="w-full h-full object-cover rounded-full"
              whileHover={{ filter: "brightness(1.05)" }}
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </Tooltip>
  );
};

export default PoapImage;
