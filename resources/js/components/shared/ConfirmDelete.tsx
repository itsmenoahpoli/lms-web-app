import React from "react";
import { Modal } from "antd";

export const ConfirmDelete: React.FC<{
  onConfirmFn: () => void;
}> = (props) => {
  const [modal, context] = Modal.useModal();

  return <>{context}</>;
};
