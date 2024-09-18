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
      label: "Dashboard",
      path: ROUTES_URL.DASHBOARD,
      icon: <SpaceDashboardIcon />,
    },
    {
      label: "Prducts",
      path: ROUTES_URL.PRODUCT,
      icon: <AccountCircleIcon />,
    },
  ];


  return {
    defaultActiveTab,
  };
};

export default MenuList;
