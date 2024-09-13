import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SubjectIcon from "@mui/icons-material/Subject";
import ROUTES_URL from "../../config/routes";
import { rolesList } from "../../config/constants";
import LocalStorageService from "../../helper/localStorage-services";
import { useTranslation } from "react-i18next";

const loggedUserDetails = LocalStorageService.getLoggedInUserDetails();

const MenuList = () => {
  const { t } = useTranslation();
  const defaultActiveTab = [
    {
      label: t("common.dashboard"),
      path: ROUTES_URL.DASHBOARD,
      icon: <SpaceDashboardIcon />,
    },
    {
      label: t("common.user"),
      path: ROUTES_URL.USER,
      icon: <AccountCircleIcon />,
      hidden: loggedUserDetails?.role === rolesList[3].value,
    },
  ];


  return {
    defaultActiveTab,
  };
};

export default MenuList;
