import moment from "moment";

export const formatDate = (date: string, format?: "MMMM DD, YYYY") => {
  return moment(date).format(format);
};
