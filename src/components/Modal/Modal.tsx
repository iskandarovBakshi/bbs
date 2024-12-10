import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { FC, ReactNode } from "react";

export const Modal: FC<{
  onClose?: () => void;
  onConfirm: () => void;
  open: boolean;
  children?: ReactNode;
}> = ({ onClose, open, children, onConfirm }) => {
  const handleClose = () => {
    onClose?.();
  };
  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Bagla</Button>
        <Button onClick={handleConfirm}>Əlavə et</Button>
      </DialogActions>
    </Dialog>
  );
};
