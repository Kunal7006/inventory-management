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
      <AppBar
        position="static"
        sx={{
          background:
            "linear-gradient(90deg, #1976d2, #42a5f5)"
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            📦 Inventory Management System
          </Typography>

          <Typography variant="body1">
            FastAPI • React • PostgreSQL
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          {/* Products Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              onClick={() => setTab(0)}
              sx={{
                minWidth: 220,
                textAlign: "center",
                background: "#E3F2FD",
                borderRadius: 3,
                boxShadow: 4,
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8
                }
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  Products
                </Typography>

                <Typography variant="h3">
                  📦
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Customers Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              onClick={() => setTab(1)}
              sx={{
                minWidth: 220,
                textAlign: "center",
                background: "#E8F5E9",
                borderRadius: 3,
                boxShadow: 4,
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8
                }
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  Customers
                </Typography>

                <Typography variant="h3">
                  👤
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Orders Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              onClick={() => setTab(2)}
              sx={{
                minWidth: 220,
                textAlign: "center",
                background: "#FFF3E0",
                borderRadius: 3,
                boxShadow: 4,
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8
                }
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  Orders
                </Typography>

                <Typography variant="h3">
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
            textColor="inherit"
            indicatorColor="secondary"
            sx={{
              "& .MuiTab-root": {
                fontSize: "16px",
                fontWeight: "bold",
                color: "#555",
              },
              "& .Mui-selected": {
                color: "#1976d2",
              }
            }}
          >
            <Tab label="📦 Products" />
            <Tab label="👥 Customers" />
            <Tab label="🛒 Orders" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 3 }}>
          {tab === 0 && <Products />}
          {tab === 1 && <Customers />}
          {tab === 2 && <Orders />}
        </Box>

        <Box
          sx={{
            mt: 8,
            py: 3,
            textAlign: "center",
            borderTop: "1px solid #ddd",
            color: "#666"
          }}
        >
          <Typography variant="body1">
            Inventory Management System
          </Typography>

          <Typography variant="body2">
            Built with React, FastAPI & PostgreSQL
          </Typography>

          <Typography variant="caption">
            © 2026 All Rights Reserved
          </Typography>
        </Box>

      </Container>
    </>
  );
}

export default App;