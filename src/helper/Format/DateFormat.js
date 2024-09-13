import dayjs from "dayjs";

export const DateFormat = ({ date }) => {
  return date && dayjs(date?.split("T")[0]).format("DD/MM/YYYY");
};
