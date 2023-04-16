import { AiFillGold } from "react-icons/ai";
import {
  FaCheck,
  FaHourglass,
  FaMedal,
  FaPlusSquare,
  FaTrophy,
} from "react-icons/fa";
import { TbRefresh, TbRefreshDot } from "react-icons/tb";
import {
  HiExclamationCircle,
  HiEye,
  HiFolderAdd,
  HiLightningBolt,
  HiOutlineQuestionMarkCircle,
  HiQuestionMarkCircle,
  HiShieldCheck,
  HiStar,
  HiTicket,
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
      return <HiOutlineQuestionMarkCircle />;
    case "view":
      return <HiExclamationCircle />;
    case "unlockedonly":
      return <HiShieldCheck />;
    case "pinnedonly":
      return <HiStar />;
    case "phase":
      return <HiQuestionMarkCircle />;
    case "level":
      return <HiStar />;
    case "eye":
      return <HiEye />;
    default:
      return <AiFillGold />;
  }
};
