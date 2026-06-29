import { Admin, Resource, defaultDarkTheme } from "react-admin";
import { Layout } from "./Layout";
import { Dashboard } from "./Dashboard";
import { LoginPage } from "./LoginPage";
import { dataProvider } from "./dataProviders";
import { authProvider } from "./authProvider";

import { EventList } from "./resources/events/EventList";
import { EventCreate } from "./resources/events/EventCreate";
import { EventEdit } from "./resources/events/EventEdit";

import { SessionList } from "./resources/sessions/SessionList";
import { SessionCreate } from "./resources/sessions/SessionCreate";
import { SessionEdit } from "./resources/sessions/SessionEdit";

import { SpeakerList } from "./resources/speakers/SpeakersList";
import { SpeakerCreate } from "./resources/speakers/SpeakerCreate";
import { SpeakerEdit } from "./resources/speakers/SpeakerEdit";

import { RoomList } from "./resources/rooms/RoomList";
import { RoomCreate } from "./resources/rooms/RoomCreate";
import { RoomEdit } from "./resources/rooms/RoomEdit";

import { QuestionList } from "./resources/questions/QuestionList";

import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const darkTheme = {
  ...defaultDarkTheme,
  palette: {
    ...defaultDarkTheme.palette,
    mode: "dark" as const,
    primary: { main: "#5b6ef5", light: "#818cf8", dark: "#4338ca" },
    secondary: { main: "#22d3a0", light: "#34d399", dark: "#059669" },
    background: { default: "#030711", paper: "#0c1120" },
    text: { primary: "#f1f5f9", secondary: "#6b7280", disabled: "#374151" },
    divider: "rgba(255,255,255,0.07)",
    error: { main: "#ef4444" },
    warning: { main: "#f59e0b" },
    success: { main: "#22d3a0" },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h4: { fontWeight: 800, letterSpacing: "-0.5px" },
    h5: { fontWeight: 700, letterSpacing: "-0.3px" },
    h6: { fontWeight: 700 },
    body1: { fontSize: "14px" },
    body2: { fontSize: "13px" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", background: "#0c1120", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: "none", background: "#0c1120", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "Inter, sans-serif", fontSize: 13, padding: "12px 16px" },
        head: { color: "#6b7280", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.8px", background: "rgba(255,255,255,0.02)" },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: { "&:hover td": { background: "rgba(255,255,255,0.02)" }, "&:last-child td": { borderBottom: "none" } },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: { background: "linear-gradient(135deg, #5b6ef5, #7c3aed)", boxShadow: "none", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 13, borderRadius: 10, "&:hover": { background: "linear-gradient(135deg, #4f62e0, #6d30d0)", boxShadow: "none" } },
        outlined: { border: "1px solid rgba(255,255,255,0.12)", color: "#9ca3af", borderRadius: 10, fontFamily: "Inter, sans-serif", "&:hover": { border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.04)" } },
        text: { fontFamily: "Inter, sans-serif", fontSize: 13, color: "#6b7280", "&:hover": { background: "rgba(255,255,255,0.04)", color: "#f1f5f9" } },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": { background: "rgba(255,255,255,0.03)", borderRadius: 10, fontFamily: "Inter, sans-serif", fontSize: 14, "& fieldset": { borderColor: "rgba(255,255,255,0.08)" }, "&:hover fieldset": { borderColor: "rgba(255,255,255,0.15)" }, "&.Mui-focused fieldset": { borderColor: "#5b6ef5" } },
          "& .MuiInputLabel-root": { color: "#6b7280", fontFamily: "Inter, sans-serif", fontSize: 13, "&.Mui-focused": { color: "#5b6ef5" } },
          "& input, & textarea": { color: "#f1f5f9", fontFamily: "Inter, sans-serif" },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { background: "rgba(255,255,255,0.03)", borderRadius: 10, color: "#f1f5f9", fontFamily: "Inter, sans-serif", fontSize: 14, "& fieldset": { borderColor: "rgba(255,255,255,0.08)" }, "&:hover fieldset": { borderColor: "rgba(255,255,255,0.15)" }, "&.Mui-focused fieldset": { borderColor: "#5b6ef5 !important" } },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { background: "rgba(91,110,245,0.1)", border: "1px solid rgba(91,110,245,0.2)", color: "#818cf8", fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600, borderRadius: 6 },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: { background: "transparent", borderBottom: "1px solid rgba(255,255,255,0.06)" },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontFamily: "Inter, sans-serif", fontSize: 13, color: "#d1d5db", "&:hover": { background: "rgba(255,255,255,0.05)" }, "&.Mui-selected": { background: "rgba(91,110,245,0.1)", color: "#818cf8" } },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: { "& .MuiPaper-root": { background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)" } },
      },
    },
  },
};

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    layout={Layout}
    dashboard={Dashboard}
    loginPage={LoginPage}
    theme={darkTheme}
    title="EventSync Admin"
  >
    <Resource name="events" icon={EventIcon} list={EventList} create={EventCreate} edit={EventEdit} options={{ label: "Events" }} />
    <Resource name="sessions" icon={VideoLabelIcon} list={SessionList} create={SessionCreate} edit={SessionEdit} options={{ label: "Sessions" }} />
    <Resource name="speakers" icon={GroupIcon} list={SpeakerList} create={SpeakerCreate} edit={SpeakerEdit} options={{ label: "Speakers" }} />
    <Resource name="rooms" icon={MeetingRoomIcon} list={RoomList} create={RoomCreate} edit={RoomEdit} options={{ label: "Rooms" }} />
    <Resource name="questions" icon={QuestionAnswerIcon} list={QuestionList} options={{ label: "Questions" }} />
  </Admin>
);