"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { useStore } from "@/store/globalStore";
import { useFormik } from "formik";

export const AddBarberShops = () => {
  const [showBbsModal, setShowbbsModal] = useState(false);
  const barbershopCreateForm = useFormik({
    initialValues: {
      name: "",
      schedule: "",
      barbers: [],
    },
    onSubmit(values) {
      console.log(values);
    },
  });
  const barberShops = useStore((state) => state.barberShops);

  console.log(barberShops);

  const handleClose = () => setShowbbsModal(false);

  return (
    <div>
      <div>
        <Button onClick={() => setShowbbsModal(true)}>
          Barbershop Əlavə et
        </Button>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ad</TableCell>
                <TableCell align="right">İş saatları</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {barberShops.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>ASd</TableCell>
                </TableRow>
              ) : (
                barberShops.map((bs) => (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {bs.name}
                    </TableCell>
                    <TableCell align="right">{bs.name}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal
        open={showBbsModal}
        onClose={handleClose}
        onConfirm={() => {
          console.log(1);
        }}
      ></Modal>
    </div>
  );
};
