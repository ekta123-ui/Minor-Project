import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/msalConfig";

const ALLOWED_DOMAIN = "krmu.edu.in";

function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msLoading, setMsLoading] = useState(false);

  const navigate = useNavigate();
  const { instance } = useMsal();

  // ── Email / password login ───────────────────────────────────────
  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("Please enter email and password"); return; }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "student");
        localStorage.setItem("email", data.student.email);
        localStorage.setItem("name", data.student.name);
        navigate("/student", { replace: true });
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  // ── Microsoft Outlook login ──────────────────────────────────────
  const handleMicrosoftLogin = async () => {
    setError("");
    setMsLoading(true);
    try {
      const response = await instance.loginPopup({
        ...loginRequest,
        prompt: "login",
        domain_hint: ALLOWED_DOMAIN,
      });

      const userEmail = response.account.username;
      const userName  = response.account.name || response.account.username.split("@")[0];

      // Frontend domain check
      if (!userEmail.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`)) {
        setError(`Only @${ALLOWED_DOMAIN} college accounts are allowed. e.g. 2501940029@krmu.edu.in`);
        setMsLoading(false);
        return;
      }

      // Send to backend — saves student + logs to admin dashboard
      const res = await fetch("http://localhost:5000/api/student/microsoft-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, name: userName }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "student");
        localStorage.setItem("email", data.student.email);
        localStorage.setItem("name", data.student.name);
        // ✅ Go directly to Student Dashboard
        navigate("/student", { replace: true });
      } else {
        setError(data.error || "Microsoft login failed. Please try again.");
      }
    } catch (err) {
      if (err?.errorCode === "user_cancelled") {
        setError("Login cancelled.");
      } else {
        setError("Microsoft login failed. Please try again.");
      }
    }
    setMsLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        .sl-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }
        .sl-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          pointer-events: none;
          animation: sl-pulse 4s ease-in-out infinite;
        }
        .sl-ring1 { width:600px;height:600px;border-color:#c8102e18;top:50%;left:50%;transform:translate(-50%,-50%); }
        .sl-ring2 { width:400px;height:400px;border-color:#c8102e12;top:50%;left:50%;transform:translate(-50%,-50%);animation-delay:1s; }
        .sl-ring3 { width:220px;height:220px;border-color:#c8102e1a;top:50%;left:50%;transform:translate(-50%,-50%);animation-delay:2s; }
        @keyframes sl-pulse {
          0%,100%{opacity:0.5;transform:translate(-50%,-50%) scale(1);}
          50%{opacity:1;transform:translate(-50%,-50%) scale(1.04);}
        }

        .sl-card {
          position:relative;z-index:1;
          width:100%;max-width:900px;
          display:grid;grid-template-columns:1fr 1.1fr;
          background:#111;border:1px solid #1e1e1e;border-radius:4px;
          overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,0.6);
          animation:sl-appear 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @media(max-width:700px){.sl-card{grid-template-columns:1fr;}.sl-visual{display:none!important;}}
        @keyframes sl-appear{from{opacity:0;transform:scale(0.96) translateY(16px);}to{opacity:1;transform:scale(1) translateY(0);}}

        .sl-visual {
          position:relative;background:#0d0d0d;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          padding:48px 36px;border-right:1px solid #1a1a1a;overflow:hidden;
        }
        .sl-visual-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 60%,#c8102e18,transparent 60%);}
        .sl-avatar-ring{position:relative;z-index:1;width:120px;height:120px;border:2px solid #c8102e;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:28px;}
        .sl-avatar-img{width:90px;height:90px;object-fit:contain;}
        .sl-stat-row{position:relative;z-index:1;display:flex;gap:20px;margin-bottom:32px;}
        .sl-stat{text-align:center;background:#161616;border:1px solid #222;padding:14px 20px;border-radius:2px;min-width:80px;}
        .sl-stat-num{font-family:'Playfair Display',serif;font-size:24px;font-weight:900;color:#c8102e;}
        .sl-stat-label{font-size:11px;color:#444;margin-top:2px;letter-spacing:1px;}
        .sl-quote{position:relative;z-index:1;font-size:13px;color:#555;text-align:center;line-height:1.7;font-style:italic;max-width:220px;border-top:1px solid #1e1e1e;padding-top:24px;}
        .sl-quote::before{content:'"';font-family:'Playfair Display',serif;font-size:48px;color:#c8102e33;line-height:0;position:absolute;top:30px;left:0;}

        .sl-form-side{padding:52px 44px;display:flex;flex-direction:column;justify-content:center;}
        .sl-eyebrow{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c8102e;font-weight:500;margin-bottom:10px;}
        .sl-title{font-family:'Playfair Display',serif;font-size:40px;font-weight:900;color:#fff;line-height:1.1;margin-bottom:28px;}

        /* Outlook button */
        .sl-ms-btn {
          width:100%;display:flex;align-items:center;justify-content:center;gap:12px;
          padding:13px;background:#141414;border:1px solid #2a2a2a;border-radius:2px;
          color:#ccc;font-family:'DM Sans',sans-serif;font-size:14px;
          cursor:pointer;transition:border-color 0.2s,background 0.2s;margin-bottom:10px;
        }
        .sl-ms-btn:hover:not(:disabled){border-color:#c8102e66;background:#1a1a1a;color:#fff;}
        .sl-ms-btn:disabled{opacity:0.6;cursor:not-allowed;}

        .sl-domain-hint{
          text-align:center;font-size:11px;color:#3a3a3a;
          margin-bottom:20px;padding:7px 12px;
          background:#0e0e0e;border-radius:2px;border:1px solid #1e1e1e;line-height:1.6;
        }
        .sl-domain-hint span{color:#c8102e;font-weight:600;font-size:12px;}
        .sl-domain-hint small{display:block;color:#2e2e2e;margin-top:2px;font-size:10px;}

        .sl-sep{display:flex;align-items:center;gap:12px;margin-bottom:20px;}
        .sl-sep-line{flex:1;height:1px;background:#1e1e1e;}
        .sl-sep-text{font-size:11px;color:#3a3a3a;letter-spacing:1px;}

        .sl-field{margin-bottom:20px;}
        .sl-label{display:block;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#444;margin-bottom:8px;}
        .sl-input{width:100%;background:#0d0d0d;border:0;border-bottom:1px solid #222;padding:12px 0;color:#fff;font-family:'DM Sans',sans-serif;font-size:16px;outline:none;transition:border-color 0.2s;box-sizing:border-box;}
        .sl-input:focus{border-bottom-color:#c8102e;}
        .sl-input::placeholder{color:#2a2a2a;}

        .sl-pw-wrap{position:relative;}
        .sl-pw-wrap .sl-input{padding-right:36px;}
        .sl-eye{position:absolute;right:0;top:50%;transform:translateY(-50%);cursor:pointer;color:#444;background:none;border:none;padding:0;transition:color 0.2s;}
        .sl-eye:hover{color:#c8102e;}

        .sl-error{font-size:13px;color:#ff4d4d;background:#ff4d4d11;border:1px solid #ff4d4d22;padding:10px 14px;border-radius:2px;margin-bottom:20px;display:flex;align-items:center;gap:8px;}

        .sl-btn{width:100%;padding:15px;background:#c8102e;color:#fff;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;letter-spacing:3px;text-transform:uppercase;border:none;border-radius:2px;cursor:pointer;transition:background 0.2s,transform 0.15s;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:8px;}
        .sl-btn:hover:not(:disabled){background:#a50d26;transform:translateY(-1px);}
        .sl-btn:disabled{opacity:0.5;cursor:not-allowed;}

        .sl-spinner{width:16px;height:16px;border:2px solid #fff4;border-top-color:#fff;border-radius:50%;animation:sl-spin 0.7s linear infinite;}
        @keyframes sl-spin{to{transform:rotate(360deg);}}

        .sl-footer{margin-top:24px;font-size:14px;color:#3a3a3a;}
        .sl-footer a{color:#c8102e;text-decoration:none;font-weight:500;}
        .sl-footer a:hover{text-decoration:underline;}
      `}</style>

      <div className="sl-root">
        <div className="sl-ring sl-ring1" />
        <div className="sl-ring sl-ring2" />
        <div className="sl-ring sl-ring3" />

        <div className="sl-card">
          {/* VISUAL */}
          <div className="sl-visual">
            <div className="sl-visual-bg" />
            <div className="sl-avatar-ring">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Student" className="sl-avatar-img" />
            </div>
            <div className="sl-stat-row">
              <div className="sl-stat">
                <div className="sl-stat-num">2K+</div>
                <div className="sl-stat-label">Students</div>
              </div>
              <div className="sl-stat">
                <div className="sl-stat-num">50+</div>
                <div className="sl-stat-label">Courses</div>
              </div>
            </div>
            <p className="sl-quote">
              Education is the most powerful weapon which you can use to change the world.
            </p>
          </div>

          {/* FORM */}
          <div className="sl-form-side">
            <p className="sl-eyebrow">Student Portal</p>
            <h1 className="sl-title">Student<br />Login</h1>

            {/* ✅ Outlook button */}
            <button className="sl-ms-btn" onClick={handleMicrosoftLogin} disabled={msLoading || loading}>
              {msLoading ? (
                <><div className="sl-spinner" style={{ borderTopColor: "#ccc" }} /> Connecting…</>
              ) : (
                <>
                  <img src="https://img.icons8.com/color/48/microsoft.png" alt="Microsoft" style={{ width: 20 }} />
                  Continue with Outlook
                </>
              )}
            </button>

            <div className="sl-domain-hint">
              Only <span>@{ALLOWED_DOMAIN}</span> college accounts accepted
              <small>e.g. 2501940029@krmu.edu.in</small>
            </div>

            <div className="sl-sep">
              <div className="sl-sep-line" />
              <span className="sl-sep-text">or sign in manually</span>
              <div className="sl-sep-line" />
            </div>

            <div className="sl-field">
              <label className="sl-label">Email Address</label>
              <input
                type="email" className="sl-input"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <div className="sl-field">
              <label className="sl-label">Password</label>
              <div className="sl-pw-wrap">
                <input
                  type={showPassword ? "text" : "password"} className="sl-input"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button className="sl-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && <div className="sl-error">⚠ {error}</div>}

            <button className="sl-btn" onClick={handleLogin} disabled={loading || msLoading}>
              {loading ? <><div className="sl-spinner" /> Logging In</> : "Log In"}
            </button>

            <p className="sl-footer">
              No account? <Link to="/signup">Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentLogin;
;
