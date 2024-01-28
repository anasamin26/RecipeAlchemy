import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
} from "react-icons/fi";
import { MdTitle } from "react-icons/md";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";

const DropdownRadioHelper = ({onTypeChange,onInputChange}) => {
  const [open, setOpen] = useState(false);
  const options=["Search By Ingredients","Search By Title"];
  const [selectedOption,setSelectedOption]=useState('Ingredients');
  return (
    <div className=" flex   justify-end bg-puprle-900">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-2 py-2 rounded-lg text-purple-50 bg-purple-500 hover:bg-purple-500 transition-colors"
        >
          <span className="font-medium text-sm">Search By {selectedOption}</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          <Option setOpen={setOpen} onInputChange={onInputChange} Icon={FiEdit} setSelectedOption={setSelectedOption} onTypeChange={onTypeChange} setSearchTitle={selectedOption} selection="Ingredients"  text={options[0]} />
          <Option setOpen={setOpen} onInputChange={onInputChange} setSelectedOption={setSelectedOption} Icon={MdTitle} onTypeChange={onTypeChange} selection="Title" text={options[1]} />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, Icon, setOpen,setSelectedOption,onInputChange,selection,onTypeChange }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => 
        {  
          onTypeChange(selection)
          setSelectedOption(selection)
          onInputChange(selection)
          setOpen(false)   
        }
      }
    
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-purple-100 text-pur-700 hover:text-purple-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default DropdownRadioHelper;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};