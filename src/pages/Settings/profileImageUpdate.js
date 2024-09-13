/* eslint-disable react/no-children-prop */
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonComponent from "../../components/Button";
import { updateProfileInformation } from "../../middleware/auth";
import { FileUploader } from "react-drag-drop-files";
import { FILE_TYPES } from "../../config/constants";
import { UploadStyle } from "../../components/FileUpload";
import { useTranslation } from "react-i18next";

function ProfileImageUpdate({ id }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [newImageSrc, setNewImageSrc] = useState(null);

  let [fileError, setFileError] = useState("");
  const handleImageChange = (event) => {
    setNewImageSrc(event);
  };

  const handleUploadProfile = () => {
    const formData = new FormData();
    formData.append("profilePicture", newImageSrc);
    dispatch(updateProfileInformation(formData, id));
  };

  return (
    <Box>
      <Typography
        sx={{ fontSize: "24px", fontFamily: "roboto-bold", my: "20px" }}
      >
        {t("common.profileImage")}
      </Typography>

      <Box>
        <FileUploader
          multiple={false}
          handleChange={handleImageChange}
          types={FILE_TYPES}
          children={
            <UploadStyle srcImage={newImageSrc !== null ? newImageSrc : null} />
          }
          maxSize={10}
          onSizeError={(file) => setFileError(file)}
          onTypeError={(err) => setFileError(err)}
        />
      </Box>
      <Typography sx={{ color: "red" }}>{fileError}</Typography>
      <ButtonComponent
        variant="contained"
        color="secondary"
        onClick={handleUploadProfile}
        sx={{ color: "white", my: "20px" }}
      >
        {t("common.upload")}
      </ButtonComponent>
    </Box>
  );
}

export default ProfileImageUpdate;
