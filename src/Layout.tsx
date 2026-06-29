import type { ReactNode } from "react";
import { Layout as RALayout, AppBar, TitlePortal, Menu } from "react-admin";
import { Typography, Box } from "@mui/material";

function EventSyncLogo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <defs>
        <linearGradient id="sbl1" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5b6ef5" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="sbl2" x1="34" y1="0" x2="0" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3a0" />
          <stop offset="100%" stopColor="#5b6ef5" />
        </linearGradient>
      </defs>
      <rect width="34" height="34" rx="10" fill="#0c1120" />
      <path d="M6 17 Q6 8 17 8 Q23 8 27 14" stroke="url(#sbl1)" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M28 17 Q28 26 17 26 Q11 26 7 20" stroke="url(#sbl2)" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M23.5 11 L27 14 L23 16.5" stroke="url(#sbl1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M10.5 23 L7 20 L11 17.5" stroke="url(#sbl2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="17" cy="17" r="2.8" fill="#22d3a0" />
    </svg>
  );
}

const CustomAppBar = () => (
  <AppBar sx={{
    background: "#0c1120 !important",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "none",
    "& .RaAppBar-toolbar": { minHeight: 56 },
  }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mr: 2 }}>
      <EventSyncLogo size={30} />
      <Typography sx={{
        color: "#f1f5f9",
        fontWeight: 800,
        fontSize: "1rem",
        letterSpacing: "-0.5px",
        fontFamily: "Inter, sans-serif",
        "& span": { color: "#5b6ef5" },
      }}>
        Event<span>Sync</span>
      </Typography>
    </Box>
    <TitlePortal sx={{ color: "#6b7280", fontSize: "13px", fontFamily: "Inter, sans-serif" }} />
  </AppBar>
);

const CustomMenu = () => (
  <Menu sx={{
    "& .RaMenu-root": { paddingTop: "8px" },
    "& .RaMenuItemLink-root": {
      color: "#6b7280",
      borderRadius: "10px",
      margin: "1px 8px",
      fontSize: "13px",
      fontFamily: "Inter, sans-serif",
      fontWeight: 500,
      "&:hover": { background: "rgba(255,255,255,0.05)", color: "#f1f5f9" },
      "&.RaMenuItemLink-active": {
        background: "rgba(91,110,245,0.12)",
        color: "#818cf8",
        borderLeft: "2px solid #5b6ef5",
        "& .MuiListItemIcon-root": { color: "#5b6ef5" },
      },
      "& .MuiListItemIcon-root": { color: "#4b5563", minWidth: 36 },
    },
  }}>
    <Menu.DashboardItem />
    <Menu.ResourceItem name="events" />
    <Menu.ResourceItem name="sessions" />
    <Menu.ResourceItem name="speakers" />
    <Menu.ResourceItem name="rooms" />
    <Menu.ResourceItem name="questions" />
  </Menu>
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout
    appBar={CustomAppBar}
    menu={CustomMenu}
    sx={{
      "& .RaLayout-content": { background: "#030711" },
      "& .RaSidebar-root": {
        background: "#0a0f1e",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      },
      "& .MuiDrawer-paper": {
        background: "#0a0f1e",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      },
    }}
  >
    {children}
  </RALayout>
);