import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

export const copyToClipboard = (
  value: string,
  message: string | undefined = "Copied to clipboard!"
) => {
  try {
    copy(value);
    toast.success(message);
  } catch {
    toast.error("Failed to copy!");
  }
};
