import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Grid
} from "@mui/material";

import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

function App() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            Inventory Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Products
                </Typography>

                <Typography variant="h4">
                  📦
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Customers
                </Typography>

                <Typography variant="h4">
                  👤
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Orders
                </Typography>

                <Typography variant="h4">
                  🛒
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Tabs
            value={tab}
            onChange={(e, value) => setTab(value)}
            centered
          >
            <Tab label="Products" />
            <Tab label="Customers" />
            <Tab label="Orders" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 3 }}>
          {tab === 0 && <Products />}
          {tab === 1 && <Customers />}
          {tab === 2 && <Orders />}
        </Box>

      </Container>
    </>
  );
}

export default App;