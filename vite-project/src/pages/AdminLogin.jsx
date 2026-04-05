import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("Please enter email and password"); return; }
    setLoading(true);
    try {
      // ✅ FIX 1: Correct endpoint — was /api/login, now /api/admin/login
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // ✅ FIX 2: Server returns data.admin, not data.role
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem("email", data.admin.email);
        localStorage.setItem("name", data.admin.name);
        navigate("/admin");
      } else {
        // ✅ FIX 3: Server sends "error" field, not "message"
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        .al-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .al-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }
        .al-orb1 { width: 500px; height: 500px; background: radial-gradient(circle, #c8102e44, transparent); top: -100px; right: -100px; }
        .al-orb2 { width: 350px; height: 350px; background: radial-gradient(circle, #8B000022, transparent); bottom: -50px; left: -80px; }

        .al-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(200,16,46,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(200,16,46,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .al-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          margin: 20px;
          padding: 48px 44px;
          background: #111111;
          border: 1px solid #222;
          border-radius: 4px;
          box-shadow: 0 0 0 1px #c8102e22, 0 40px 80px rgba(0,0,0,0.7);
          animation: al-slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes al-slideUp {
          from { opacity:0; transform: translateY(30px); }
          to   { opacity:1; transform: translateY(0); }
        }

        .al-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
        }
        .al-badge-icon {
          width: 40px; height: 40px;
          background: #c8102e;
          border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .al-badge-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c8102e;
        }

        .al-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .al-subtitle {
          font-size: 14px;
          color: #555;
          margin-bottom: 40px;
          font-weight: 300;
        }

        .al-field {
          margin-bottom: 20px;
        }
        .al-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 8px;
        }
        .al-input {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 2px;
          padding: 14px 16px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .al-input:focus { border-color: #c8102e; }
        .al-input::placeholder { color: #333; }

        .al-pw-wrap { position: relative; }
        .al-pw-wrap .al-input { padding-right: 48px; }
        .al-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          cursor: pointer; color: #444;
          background: none; border: none; padding: 0;
          transition: color 0.2s;
        }
        .al-eye:hover { color: #c8102e; }

        .al-error {
          font-size: 13px; color: #ff4d4d;
          margin-bottom: 20px; text-align: center;
          background: #ff4d4d11; padding: 10px; border-radius: 2px;
          border: 1px solid #ff4d4d22;
        }

        .al-btn {
          width: 100%;
          padding: 15px;
          background: #c8102e;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          margin-top: 8px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .al-btn:hover:not(:disabled) { background: #a50d26; transform: translateY(-1px); }
        .al-btn:active { transform: translateY(0); }
        .al-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .al-spinner {
          width: 16px; height: 16px; border: 2px solid #fff4; border-top-color: #fff;
          border-radius: 50%; animation: al-spin 0.7s linear infinite;
        }
        @keyframes al-spin { to { transform: rotate(360deg); } }

        .al-back {
          display: block; text-align: center;
          margin-top: 28px;
          font-size: 13px;
          color: #444;
          text-decoration: none;
          letter-spacing: 1px;
          transition: color 0.2s;
        }
        .al-back:hover { color: #c8102e; }

        .al-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #222, transparent);
          margin: 32px 0;
        }
      `}</style>

      <div className="al-root">
        <div className="al-grid" />
        <div className="al-bg-orb al-orb1" />
        <div className="al-bg-orb al-orb2" />

        <div className="al-card">
          <div className="al-badge">
            <div className="al-badge-icon">
              <ShieldCheck size={18} color="#fff" />
            </div>
            <span className="al-badge-text">Admin Portal</span>
          </div>

          <h1 className="al-title">Secure<br />Access</h1>
          <p className="al-subtitle">Administrator credentials required</p>

          <div className="al-field">
            <label className="al-label">Email Address</label>
            <input
              type="email"
              className="al-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
            />
          </div>

          <div className="al-field">
            <label className="al-label">Password</label>
            <div className="al-pw-wrap">
              <input
                type={showPassword ? "text" : "password"}
                className="al-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <button className="al-eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="al-error">⚠ {error}</div>}

          <button className="al-btn" onClick={handleLogin} disabled={loading}>
            {loading ? <><div className="al-spinner" /> Authenticating</> : "Authenticate"}
          </button>

          <div className="al-divider" />
          <Link to="/" className="al-back">← Return to Home</Link>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;

