import { AiFillGold } from "react-icons/ai";
import {
  FaCheck,
  FaHourglass,
  FaMedal,
  FaPlusSquare,
  FaTrophy,
} from "react-icons/fa";
import { BsTrophyFill } from "react-icons/bs";
import {
  TbAB,
  TbArrowsMaximize,
  TbCircle,
  TbDialpad,
  TbPlus,
  TbRefresh,
} from "react-icons/tb";
import {
  HiColorSwatch,
  HiFolderAdd,
  HiLightningBolt,
  HiTicket,
  HiViewBoards,
} from "react-icons/hi";

export const getIcon = (type, color) => {
  switch (type) {
    case "trophy":
      return <FaTrophy />;
    case "xp":
      return <HiLightningBolt />;
    case "medal":
      return <FaMedal />;
    case "ongoing":
      return <FaHourglass style={{ fontSize: "1.4rem" }} />;
    case "achievement":
      return <HiFolderAdd />;
    case "completed":
      return <FaCheck />;
    case "refresh":
      return <TbRefresh />;
    case "add":
      return <FaPlusSquare />;
    default:
      return <AiFillGold />;
  }
};
