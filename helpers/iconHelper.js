import { AiFillGold } from "react-icons/ai";
import {
  FaCheck,
  FaHourglass,
  FaMedal,
  FaPlusSquare,
  FaTrophy,
} from "react-icons/fa";
import { BsTrophyFill } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import {
  HiAdjustments,
  HiExclamationCircle,
  HiFolderAdd,
  HiLightningBolt,
  HiLocationMarker,
  HiOutlineViewList,
  HiPencilAlt,
  HiShieldCheck,
  HiStar,
  HiTicket,
  HiViewBoards,
  HiViewGrid,
  HiViewList,
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
    case "phaseactivate":
      return <HiViewList />;
    case "sidebartitle":
      return <HiOutlineViewList />;
    case "view":
      return <HiExclamationCircle />;
    case "unlockedonly":
      return <HiShieldCheck />;
    case "pinnedonly":
      return <HiStar />;
    default:
      return <AiFillGold />;
  }
};
