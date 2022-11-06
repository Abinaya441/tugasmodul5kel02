import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IconButton, List, Paper, Typography } from "@mui/material";
import ListItemUser from "./components/ListItemProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddCircle } from "@mui/icons-material";
import AddUserDialog from "./components/AddProductDialog";

const BASE_API_URL = `https://dummyjson.com`;

function App() {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function getProducts() {
      await axios
        .get(`${BASE_API_URL}/products/category/smartphones`)
        .then((res) => {
          const responseData = res.data.products;
          setProducts(responseData);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }

    getProducts();
  }, []);


  const handleDeleteProducts = (id, idx) => {
    async function delProducts() {
      await axios
        .delete(`${BASE_API_URL}/products/${id}`)
        .then((res) => {
          let arr = products;
          if (idx !== -1) {
            arr.splice(idx, 1)
          }
          setProducts([...arr]);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        })
    }

    delProducts();
  };



  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="App">
      <div className="list-container">
        <div className="list-title-wrapper">
          <Typography variant="h4">List Smartphones</Typography>
          <IconButton onClick={openDialog}>
            <AddCircle />
          </IconButton>
        </div>
        <Paper elevation={2} style={{ maxHeight: "700px", overflow: "auto" }}>
          <List>
            {products.map((d, idx) => (
              <ListItemUser
                key={d.id}
                image={d.thumbnail}
                primaryText={`$${d.price} ${d.title}`}
                secondaryText={`${d.description}`}
                onDelete={() => handleDeleteProducts(d.id, idx)}
              />
            ))}
            {newProducts.map((d) => (
              <ListItemUser
                key={d.id}
                image={d.thumbnail}
                primaryText={`$${d.price} ${d.title}`}
                secondaryText={`${d.description}`}
              />
            ))}
          </List>
        </Paper>
      </div>
      {isDialogOpen && (
        <AddUserDialog
          open={isDialogOpen}
          onClose={closeDialog}
          products={newProducts}
          setProducts={setNewProducts}
        />
      )}
    </div>
  );
}

export default App;
