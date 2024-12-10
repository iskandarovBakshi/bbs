"use client";
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import AddHomeIcon from "@mui/icons-material/AddHome";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { useEffect, useState } from "react";
import { AddBarberShops } from "./AddBarberShops";
import { AddServices } from "./AddServices";
import { useIsMounted } from "@/hooks/useIsMounted";

const drawerWidth = 240;

enum BarberShops {
  barbershops = "barbershops",
  services = "services",
}

export function AdminPanel() {
  const [activeMenu, setActiveMenu] = useState(BarberShops.barbershops);
  const [render, setRender] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    setTimeout(() => {
      if (isMounted()) {
        setRender(true);
      }
    }, 200);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Barbershop Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[
              {
                menuTitle: "Barbershop-lar",
                Icon: AddHomeIcon,
                menuValue: BarberShops.barbershops,
              },
              {
                menuTitle: "Xidmətlər",
                Icon: CleaningServicesIcon,
                menuValue: BarberShops.services,
              },
            ].map((menu) => (
              <ListItem key={menu.menuTitle} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActiveMenu(menu.menuValue);
                  }}
                  selected={activeMenu === menu.menuValue}
                  disableRipple
                >
                  <ListItemIcon>
                    {menu.Icon ? <menu.Icon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={menu.menuTitle} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {activeMenu === BarberShops.barbershops && render && <AddBarberShops />}
        {activeMenu === BarberShops.services && render && <AddServices />}
      </Box>
    </Box>
  );
}
