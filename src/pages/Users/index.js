import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Menu,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import TextFieldInput from "../../components/TextFieldInput";
import ButtonComponent from "../../components/Button";
import {
  DELETE_ERROR_MESSAGE,
  STATUS,
  rolesList,
} from "../../config/constants";
import AddUser from "./addEditUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedUser, userList } from "../../middleware/user";
import Loading from "../../components/Loading";
import { Toastify } from "../../config/toastify";
import { updateUserRequest, userDeleteRequest } from "../../slices/user.slice";
import _ from "lodash";
import { DeleteModal } from "../../components/Modal";
import ListUser from "./ListUser";
import LocalStorageService from "../../helper/localStorage-services";
import Title from "../../components/Title";
import "../../index.css";
import FiterBadgeComponent from "../../components/FilterBadge";

const Users = () => {
  const dispatch = useDispatch();
  const {
    users,
    status,
    updateStatus,
    usersList,
    userLoading,
    error,
    deleteStatus,
    deleteMessage,
  } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(2);
  const [page, setPage] = useState(0);
  const [selectedRecord, setSelectedRecord] = useState([]);

  let userObject = {
    offset: page,
    limit: 10,
    search_text: search,
    role: role,
    isActive: isActive,
  };

  useEffect(() => {
    if (deleteStatus) {
      Toastify.success("Utente eliminato con successo!");
      dispatch(userList(userObject));
      dispatch(userDeleteRequest());
      setSelectedRecord([]);
    }
    if (deleteMessage) {
      Toastify.error(DELETE_ERROR_MESSAGE);
    }
  }, [deleteStatus, deleteMessage]);

  useEffect(() => {
    dispatch(userList(userObject));
    dispatch(updateUserRequest());
    if (status) {
      setIsUserModal(false);
      dispatch(userList(userObject));
      Toastify.success("Utente aggiunto con successo!");
    }
    if (updateStatus) {
      setIsUserModal(false);
      dispatch(userList(userObject));
      Toastify.success("Utente aggiornato con successo!");
    }
  }, [status, updateStatus]);

  const handleSelectRole = (event) => {
    if (event.target.value === "All") {
      userObject.role = "";
      setRole("");
    } else {
      userObject.role = event.target.value;
      setRole(event.target.value);
    }
    dispatch(userList(userObject));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilter = (e) => {
    setIsActive(e.target.value);
    setAnchorEl(null);
    if (role === "All") {
      userObject.role = "";
    }
    userObject.isActive = e.target.value;
    dispatch(userList(userObject));
  };

  const [isUserModal, setIsUserModal] = React.useState(false);
  const handleOpenUserModal = () => setIsUserModal(true);

  const [userId, setUserId] = useState(null);

  const handleEditDetails = (id, status) => {
    setUserId(id);
    setIsUserModal(status);
  };

  const handleDebounce = async (value) => {
    try {
      userObject.search_text = value;
      await dispatch(userList(userObject));
    } catch (error) {
      console.log(error);
    }
  };

  const delayedSearch = useCallback(_.debounce(handleDebounce, 2000), []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    delayedSearch(e.target.value);
  };

  const handlePagination = (event, page) => {
    setPage(page - 1);
    userObject.offset = page - 1;
    dispatch(userList(userObject));
  };

  const [isDelete, setIsDelete] = useState(false);

  const handleSelectedDelete = () => {
    setIsDelete(true);
  };
  const handleDelete = () => {
    dispatch(deleteSelectedUser({ userIds: selectedRecord }));
    setIsDelete(false);
  };

  return (
    <>
      <AddUser
        id={userId}
        setUserId={() => setUserId(null)}
        open={isUserModal}
        onClose={() => {
          setIsUserModal(!isUserModal);
          setUserId(null);
        }}
      />
      <DeleteModal
        open={isDelete}
        close={() => setIsDelete(false)}
        handleDelete={handleDelete}
      />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#F7F8FA",
        }}
      >
        <Title title={t("common.user")} />
        <Box sx={{ typography: "body1", marginTop: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    {t("common.role")}
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={role}
                    label={t("common.role")}
                    onChange={handleSelectRole}
                  >
                    <MenuItem value="All">
                      <span style={{ fontFamily: "roboto-regular" }}>
                        {t("common.all")}
                      </span>
                    </MenuItem>
                    {rolesList.map((o, i) => {
                      return (
                        <MenuItem key={i} value={o.value}>
                          <span style={{ fontFamily: "roboto-regular" }}>
                            {o.title}
                          </span>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box ml={1}>
                <TextFieldInput
                  size="small"
                  placeholder={t("common.search")}
                  sx={{ width: "220px", fontFamily: "roboto-regular" }}
                  value={search}
                  onChange={(e) => handleSearch(e)}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <ButtonComponent
                startIcon={<DeleteIcon />}
                variant="outlined"
                size="medium"
                disabled={selectedRecord?.length < 1}
                sx={{
                  color: "#FC7540",
                  fontFamily: "roboto-medium",
                  borderColor: "#FC7540",
                }}
                onClick={handleSelectedDelete}
              >
                {t("common.delete")}
              </ButtonComponent>
              <ButtonComponent
                startIcon={<Add />}
                variant="contained"
                size="medium"
                color="secondary"
                onClick={handleOpenUserModal}
              >
                {t("common.user")}
              </ButtonComponent>

              <IconButton sx={{ ml: 1 }} onClick={handleClick}>
                <FilterAltOutlinedIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => handleFilter({ target: { value: 2 } })}
                >
                  {STATUS.TUTTI}{" "}
                  <FiterBadgeComponent
                    bgColorBadge="badge1.main"
                    badgeTextColor="badge1Text"
                    content={users?.allUsersCount ? users?.allUsersCount : "0"}
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => handleFilter({ target: { value: 1 } })}
                >
                  {STATUS.ACTTIVI}
                  <FiterBadgeComponent
                    bgColorBadge="badge2.main"
                    badgeTextColor="badge2Text"
                    content={
                      users?.activeUsersCount ? users?.activeUsersCount : "0"
                    }
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => handleFilter({ target: { value: 0 } })}
                >
                  {STATUS.INACTTIVI}
                  <FiterBadgeComponent
                    bgColorBadge="badge3.main"
                    badgeTextColor="badge3Text"
                    content={
                      users?.inactiveUsersCount
                        ? users?.inactiveUsersCount
                        : "0"
                    }
                  />
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>

        {userLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              width: "100%",
            }}
          >
            <Loading />
          </Box>
        ) : (
          <ListUser
            errorMessage={error ? error : ""}
            selectedRecord={setSelectedRecord}
            isProfile={false}
            sendEditModalData={handleEditDetails}
            handelAddEditModal="1"
            headCells={[
              {
                id: "name",
                numeric: false,
                disablePadding: false,
                label: t("common.headCells.name"),
              },
              {
                id: "role",
                numeric: false,
                disablePadding: false,
                label: t("common.role"),
              },
              {
                id: "status",
                numeric: false,
                disablePadding: false,
                label: t("common.headCells.status"),
              },
            ]}
            rows={!userLoading && userList.length > 0 && usersList}
          />
        )}

        <Box sx={{ my: "20px", display: "flex", justifyContent: "end" }}>
          <Stack spacing={2}>
            <Pagination
              count={users?.totalPages}
              variant="outlined"
              shape="rounded"
              color="secondary"
              onChange={handlePagination}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Users;
