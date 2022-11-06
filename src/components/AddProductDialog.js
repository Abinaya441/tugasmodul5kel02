import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const BASE_API_URL = `https://dummyjson.com`;

function AddProductsDialog({ open, onClose, products, setProducts }) {
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    axios
      .post(`${BASE_API_URL}/products/add`, {
        price: price,
        title: title,
        description: description,
        thumbnail: 'https://seeklogo.com/images/S/steam-logo-73274B19E3-seeklogo.com.png',
        category: "smartphones"
      })
      .then((res) => {
        setProducts([...products, res.data]);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          padding: "8px 20px"
        }}
      >
        <TextField
          name="price"
          label="Price ($USD)"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <TextField
          name="title"
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          name="description"
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductsDialog;
