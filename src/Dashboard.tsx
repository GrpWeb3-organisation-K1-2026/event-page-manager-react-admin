import { useGetList, Title, useRedirect } from "react-admin";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const COLORS = {
  indigo: { main: "#5b6ef5", bg: "rgba(91,110,245,0.08)", border: "rgba(91,110,245,0.2)" },
  emerald: { main: "#22d3a0", bg: "rgba(34,211,160,0.08)", border: "rgba(34,211,160,0.2)" },
  violet: { main: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)" },
  orange: { main: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)" },
  amber: { main: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
};

interface StatCardProps {
  label: string;
  value?: number;
  icon: React.ElementType;
  color: keyof typeof COLORS;
  resource: string;
}

const StatCard = ({ label, value, icon: Icon, color, resource }: StatCardProps) => {
  const redirect = useRedirect();
  const c = COLORS[color];
  return (
    <Card
      onClick={() => redirect(`/${resource}`)}
      sx={{
        background: "#0c1120",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px",
        cursor: "pointer",
        transition: "border-color 0.2s, transform 0.15s",
        "&:hover": {
          borderColor: c.border,
          transform: "translateY(-2px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        },
      }}
    >
      <CardContent sx={{ p: "20px !important" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ width: 44, height: 44, borderRadius: "12px", background: c.bg, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon sx={{ fontSize: 22, color: c.main }} />
          </Box>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: c.main, boxShadow: `0 0 10px ${c.main}` }} />
        </Box>
        <Typography sx={{ color: "#f1f5f9", fontSize: 32, fontWeight: 800, letterSpacing: "-1.5px", fontFamily: "Inter, sans-serif", lineHeight: 1 }}>
          {value ?? "—"}
        </Typography>
        <Typography sx={{ color: "#6b7280", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", mt: 0.5, fontFamily: "Inter, sans-serif" }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

const QuickAction = ({ label, description, color, onClick }: { label: string; description: string; color: keyof typeof COLORS; onClick: () => void }) => {
  const c = COLORS[color];
  return (
    <Box onClick={onClick} sx={{
      background: "#0c1120",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "14px",
      p: "16px 20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "border-color 0.2s, background 0.2s",
      "&:hover": { borderColor: c.border, background: c.bg },
    }}>
      <Box>
        <Typography sx={{ color: "#f1f5f9", fontSize: 13, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{label}</Typography>
        <Typography sx={{ color: "#6b7280", fontSize: 11, fontFamily: "Inter, sans-serif", mt: 0.25 }}>{description}</Typography>
      </Box>
      <Typography sx={{ color: c.main, fontSize: 16 }}>→</Typography>
    </Box>
  );
};

export const Dashboard = () => {
  const redirect = useRedirect();
  const { total: events } = useGetList("events", { pagination: { page: 1, perPage: 1 } });
  const { total: sessions } = useGetList("sessions", { pagination: { page: 1, perPage: 1 } });
  const { total: speakers } = useGetList("speakers", { pagination: { page: 1, perPage: 1 } });
  const { total: rooms } = useGetList("rooms", { pagination: { page: 1, perPage: 1 } });
  const { total: questions } = useGetList("questions", { pagination: { page: 1, perPage: 1 } });

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, fontFamily: "Inter, sans-serif", maxWidth: 1100, margin: "0 auto" }}>
      <Title title="Dashboard — EventSync" />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');`}</style>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3a0", boxShadow: "0 0 8px #22d3a0" }} />
          <Typography sx={{ color: "#22d3a0", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", fontFamily: "Inter, sans-serif" }}>
            Admin Console
          </Typography>
        </Box>
        <Typography sx={{ color: "#f1f5f9", fontSize: { xs: 24, md: 30 }, fontWeight: 800, letterSpacing: "-1px", fontFamily: "Inter, sans-serif" }}>
          Dashboard
        </Typography>
        <Typography sx={{ color: "#6b7280", fontSize: 13, fontFamily: "Inter, sans-serif", mt: 0.5 }}>
          Manage your events, sessions, speakers and more.
        </Typography>
      </Box>

      <Box sx={{ height: 1, background: "linear-gradient(90deg, transparent, #5b6ef5, #22d3a0, transparent)", mb: 4, borderRadius: 1 }} />

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard label="Events" value={events} icon={EventIcon} color="indigo" resource="events" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard label="Sessions" value={sessions} icon={VideoLabelIcon} color="emerald" resource="sessions" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard label="Speakers" value={speakers} icon={GroupIcon} color="violet" resource="speakers" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard label="Rooms" value={rooms} icon={MeetingRoomIcon} color="orange" resource="rooms" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard label="Questions" value={questions} icon={QuestionAnswerIcon} color="amber" resource="questions" />
        </Grid>
      </Grid>

      <Typography sx={{ color: "#4b5563", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", fontFamily: "Inter, sans-serif", mb: 2 }}>
        Quick actions
      </Typography>
      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={6} md={4}>
          <QuickAction label="Create new event" description="Add a conference, workshop or meetup" color="indigo" onClick={() => redirect("/events/create")} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <QuickAction label="Add a session" description="Schedule a talk or panel" color="emerald" onClick={() => redirect("/sessions/create")} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <QuickAction label="Add a speaker" description="Create a public speaker profile" color="violet" onClick={() => redirect("/speakers/create")} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <QuickAction label="Create a room" description="Add a venue or conference room" color="orange" onClick={() => redirect("/rooms/create")} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <QuickAction label="View all questions" description="Browse audience questions by session" color="amber" onClick={() => redirect("/questions")} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <QuickAction label="Open public site" description="See the public-facing EventSync app" color="indigo" onClick={() => window.open("http://localhost:3000", "_blank")} />
        </Grid>
      </Grid>
    </Box>
  );
};