import moment from "moment";

// convert date to 10June 2025 format
export const formatDate = (dateString) => {
  return moment(dateString).format("D MMMM YYYY");
};

// First letter to uppercase
export const capitalizeFirstLetter = (string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
};
