import { useState } from "react";
import { useLogin, useNotify } from "react-admin";

function EventSyncLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5b6ef5" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="lg2" x1="34" y1="0" x2="0" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3a0" />
          <stop offset="100%" stopColor="#5b6ef5" />
        </linearGradient>
      </defs>
      <rect width="34" height="34" rx="10" fill="#0c1120" />
      <path d="M6 17 Q6 8 17 8 Q23 8 27 14" stroke="url(#lg1)" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M28 17 Q28 26 17 26 Q11 26 7 20" stroke="url(#lg2)" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M23.5 11 L27 14 L23 16.5" stroke="url(#lg1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M10.5 23 L7 20 L11 17.5" stroke="url(#lg2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="17" cy="17" r="2.8" fill="#22d3a0" />
      <circle cx="17" cy="17" r="2.8" fill="#22d3a0" opacity="0.35">
        <animate attributeName="r" values="2.8;5;2.8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ username, password });
    } catch {
      notify("Invalid credentials", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#030711", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Inter, sans-serif", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif !important; background: #030711 !important; }
        .es-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:12px 16px; color:#f1f5f9; font-size:14px; font-family:Inter,sans-serif; outline:none; transition:border-color 0.2s,background 0.2s; box-sizing:border-box; }
        .es-input:focus { border-color:rgba(91,110,245,0.5); background:rgba(91,110,245,0.06); }
        .es-input::placeholder { color:#374151; }
        .es-btn { width:100%; background:linear-gradient(135deg,#5b6ef5,#7c3aed); color:#fff; border:none; border-radius:12px; padding:13px; font-size:15px; font-weight:600; font-family:Inter,sans-serif; cursor:pointer; transition:opacity 0.2s,transform 0.15s; letter-spacing:-0.2px; }
        .es-btn:hover:not(:disabled) { opacity:0.88; transform:translateY(-1px); }
        .es-btn:disabled { opacity:0.45; cursor:not-allowed; }
        .es-label { display:block; font-size:11px; font-weight:600; color:#6b7280; margin-bottom:7px; letter-spacing:0.8px; text-transform:uppercase; }
      `}</style>

      <div style={{ position:"absolute", width:600, height:600, background:"radial-gradient(circle, rgba(91,110,245,0.16) 0%, transparent 70%)", top:-200, left:-150, filter:"blur(130px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:400, height:400, background:"radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)", top:"40%", right:-100, filter:"blur(120px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:350, height:350, background:"radial-gradient(circle, rgba(34,211,160,0.08) 0%, transparent 70%)", bottom:"5%", left:"30%", filter:"blur(120px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize:"80px 80px", maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)" }} />

      <div style={{ width:"100%", maxWidth:420, padding:"0 20px", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ display:"inline-flex", marginBottom:16 }}><EventSyncLogo size={52} /></div>
          <h1 style={{ color:"#f1f5f9", fontSize:30, fontWeight:800, letterSpacing:"-1.2px", margin:"0 0 6px", fontFamily:"Inter, sans-serif" }}>EventSync</h1>
          <p style={{ color:"#4b5563", fontSize:13, margin:0 }}>Administration console</p>
        </div>

        <div style={{ background:"rgba(12,17,32,0.85)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"32px 28px", backdropFilter:"blur(20px)" }}>
          <div style={{ height:1, background:"linear-gradient(90deg, transparent, #5b6ef5, #22d3a0, transparent)", marginBottom:28 }} />
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:16 }}>
              <label className="es-label">Username</label>
              <input className="es-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" autoComplete="username" required />
            </div>
            <div style={{ marginBottom:24 }}>
              <label className="es-label">Password</label>
              <input className="es-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required />
            </div>
            <button className="es-btn" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in →"}</button>
          </form>
          <p style={{ textAlign:"center", color:"#1f2937", fontSize:12, marginTop:20, marginBottom:0 }}>Restricted to event organizers</p>
        </div>
      </div>
    </div>
  );
};