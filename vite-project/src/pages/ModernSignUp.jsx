import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/msalConfig";
import { Eye, EyeOff } from "lucide-react";

const ALLOWED_DOMAIN = "krmu.edu.in";

function ModernSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msLoading, setMsLoading] = useState(false);

  const navigate = useNavigate();
  const { instance } = useMsal();

  // ── Microsoft Outlook signup/login ───────────────────────────────
  const handleMicrosoftLogin = async () => {
    setError("");
    setMsLoading(true);

    try {
      const result = await instance.loginPopup({
        ...loginRequest,
        prompt: "select_account",
        domain_hint: ALLOWED_DOMAIN,
      });

      // FIX: set active account immediately
      instance.setActiveAccount(result.account);

      const userEmail =
        result.account?.username ||
        result.account?.idTokenClaims?.preferred_username ||
        "";

      const userName =
        result.account?.name ||
        userEmail.split("@")[0];

      // Frontend domain check
      if (!userEmail?.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`)) {
        setError(`Only @${ALLOWED_DOMAIN} college accounts are allowed. e.g. 2501940029@krmu.edu.in`);
        setMsLoading(false);
        return;
      }

      // Send to backend
      const res = await fetch("http://localhost:5000/api/students/microsoft-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail.toLowerCase(), name: userName }),
      });

      const data = await res.json();

      if (res.ok) {
        // FIX: server returns data.student object
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "student");
        localStorage.setItem("email", data.student.email);
        localStorage.setItem("name", data.student.name);
        navigate("/student", { replace: true });
      } else {
        setError(data.error || "Microsoft login failed. Please try again.");
      }

    } catch (err) {
      console.error("Microsoft login error:", err);
      if (err?.errorCode === "user_cancelled") {
        setError("Login cancelled.");
      } else {
        setError("Microsoft login failed. Please try again.");
      }
    }

    setMsLoading(false);
  };

  // ── Normal registration ──────────────────────────────────────────
  const handleRegister = async () => {
    setError("");

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    // Basic email format check
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/students/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // FIX: server now returns data.student object
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "student");
        localStorage.setItem("email", data.student.email);
        localStorage.setItem("name", data.student.name);
        navigate("/student", { replace: true });
      } else {
        setError(data.error || "Registration failed.");
      }

    } catch (err) {
      console.error("Register error:", err);
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        .su-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
        }
        @media (max-width: 768px) {
          .su-root { grid-template-columns: 1fr; }
          .su-left { display: none !important; }
        }

        .su-left {
          position: relative; overflow: hidden;
          background: #0f0f0f;
          display: flex; flex-direction: column; justify-content: center;
          padding: 60px; gap: 0;
        }
        .su-left-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover; opacity: 0.2;
        }
        .su-left-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(200deg, #0a0a0a 0%, #c8102e22 50%, #0a0a0a 100%);
        }
        .su-left-content { position: relative; z-index: 1; }
        .su-step-list { list-style: none; padding: 0; margin: 0; margin-top: 40px; }
        .su-step-list li {
          display: flex; align-items: flex-start; gap: 16px;
          padding: 18px 0; border-bottom: 1px solid #1a1a1a;
          animation: su-fadeUp 0.5s ease both;
        }
        .su-step-list li:nth-child(1) { animation-delay: 0.1s; }
        .su-step-list li:nth-child(2) { animation-delay: 0.2s; }
        .su-step-list li:nth-child(3) { animation-delay: 0.3s; }
        @keyframes su-fadeUp {
          from { opacity:0; transform:translateY(10px); }
          to { opacity:1; transform:translateY(0); }
        }
        .su-step-num {
          width: 28px; height: 28px; border: 1px solid #c8102e;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; color: #c8102e; flex-shrink: 0; font-weight: 500;
        }
        .su-step-label { font-size: 14px; color: #777; font-weight: 300; line-height: 1.5; }
        .su-step-label strong { color: #ccc; font-weight: 500; display: block; margin-bottom: 2px; }

        .su-left-tag {
          display: inline-block; background: #c8102e; color: #fff;
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          padding: 6px 14px; margin-bottom: 20px;
        }
        .su-left-title {
          font-family: 'Playfair Display', serif; font-size: 46px;
          font-weight: 900; color: #fff; line-height: 1.1;
        }
        .su-left-title span { color: #c8102e; }

        .su-right {
          display: flex; align-items: center; justify-content: center;
          padding: 48px 32px; background: #0a0a0a;
          overflow-y: auto;
        }
        .su-form-wrap {
          width: 100%; max-width: 380px;
          animation: su-slideIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes su-slideIn {
          from { opacity:0; transform:translateY(24px); }
          to { opacity:1; transform:translateY(0); }
        }

        .su-header { margin-bottom: 36px; }
        .su-eyebrow {
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          color: #c8102e; font-weight: 500; margin-bottom: 10px;
        }
        .su-title {
          font-family: 'Playfair Display', serif; font-size: 38px;
          font-weight: 900; color: #fff; line-height: 1.1;
        }

        .su-ms-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          padding: 13px; background: #141414;
          border: 1px solid #2a2a2a; border-radius: 2px;
          color: #ccc; font-family: 'DM Sans', sans-serif; font-size: 14px;
          cursor: pointer; transition: border-color 0.2s, background 0.2s; margin-bottom: 10px;
        }
        .su-ms-btn:hover:not(:disabled) { border-color: #c8102e44; background: #1a1a1a; color: #fff; }
        .su-ms-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .su-domain-hint {
          text-align: center; font-size: 11px; color: #3a3a3a;
          margin-bottom: 22px; padding: 8px 12px;
          background: #0e0e0e; border-radius: 2px; border: 1px solid #1e1e1e;
          line-height: 1.6;
        }
        .su-domain-hint span { color: #c8102e; font-weight: 600; font-size: 12px; }
        .su-domain-hint small { display: block; color: #2e2e2e; margin-top: 2px; font-size: 10px; }

        .su-sep {
          display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
        }
        .su-sep-line { flex: 1; height: 1px; background: #1e1e1e; }
        .su-sep-text { font-size: 12px; color: #3a3a3a; letter-spacing: 1px; }

        .su-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }

        .su-field { margin-bottom: 16px; }
        .su-label {
          display: block; font-size: 11px; font-weight: 500;
          letter-spacing: 2px; text-transform: uppercase; color: #444; margin-bottom: 7px;
        }
        .su-input {
          width: 100%; background: #111; border: 1px solid #222; border-radius: 2px;
          padding: 12px 14px; color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 15px; outline: none; transition: border-color 0.2s; box-sizing: border-box;
        }
        .su-input:focus { border-color: #c8102e; }
        .su-input::placeholder { color: #2e2e2e; }

        .su-pw-wrap { position: relative; }
        .su-pw-wrap .su-input { padding-right: 46px; }
        .su-eye {
          position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          cursor: pointer; color: #444; background: none; border: none; padding: 0;
          transition: color 0.2s;
        }
        .su-eye:hover { color: #c8102e; }

        .su-error {
          font-size: 13px; color: #ff4d4d;
          background: #ff4d4d11; border: 1px solid #ff4d4d22;
          padding: 10px 14px; border-radius: 2px; margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }

        .su-btn {
          width: 100%; padding: 15px; background: #c8102e; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
          letter-spacing: 3px; text-transform: uppercase; border: none; border-radius: 2px;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .su-btn:hover:not(:disabled) { background: #a50d26; transform: translateY(-1px); }
        .su-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .su-spinner {
          width: 16px; height: 16px; border: 2px solid #fff4;
          border-top-color: #fff; border-radius: 50%;
          animation: su-spin 0.7s linear infinite;
        }
        @keyframes su-spin { to { transform: rotate(360deg); } }

        .su-footer {
          margin-top: 24px; text-align: center; font-size: 14px; color: #3a3a3a;
        }
        .su-footer a { color: #c8102e; text-decoration: none; font-weight: 500; }
        .su-footer a:hover { text-decoration: underline; }
      `}</style>

      <div className="su-root">
        {/* LEFT */}
        <div className="su-left">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900"
            alt=""
            className="su-left-img"
          />
          <div className="su-left-overlay" />
          <div className="su-left-content">
            <span className="su-left-tag">Cola App</span>
            <h2 className="su-left-title">Start Your<br /><span>Journey.</span></h2>
            <ul className="su-step-list">
              <li>
                <span className="su-step-num">01</span>
                <span className="su-step-label">
                  <strong>Create your account</strong>
                  Fill in your basic details to get started.
                </span>
              </li>
              <li>
                <span className="su-step-num">02</span>
                <span className="su-step-label">
                  <strong>Access your dashboard</strong>
                  Explore courses, resources and your profile.
                </span>
              </li>
              <li>
                <span className="su-step-num">03</span>
                <span className="su-step-label">
                  <strong>Start learning</strong>
                  Dive into your personalized experience.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT */}
        <div className="su-right">
          <div className="su-form-wrap">
            <div className="su-header">
              <p className="su-eyebrow">New Account</p>
              <h1 className="su-title">Create<br />Account</h1>
            </div>

            {/* Microsoft Outlook button */}
            <button
              className="su-ms-btn"
              onClick={handleMicrosoftLogin}
              disabled={msLoading || loading}
            >
              {msLoading ? (
                <><div className="su-spinner" style={{ borderTopColor: "#ccc" }} /> Connecting…</>
              ) : (
                <>
                  <img
                    src="https://img.icons8.com/color/48/microsoft.png"
                    alt="Microsoft"
                    style={{ width: 20 }}
                  />
                  Continue with Outlook
                </>
              )}
            </button>

            <div className="su-domain-hint">
              Only <span>@{ALLOWED_DOMAIN}</span> college accounts are accepted
              <small>e.g. 2501940029@krmu.edu.in</small>
            </div>

            <div className="su-sep">
              <div className="su-sep-line" />
              <span className="su-sep-text">or register manually</span>
              <div className="su-sep-line" />
            </div>

            <div className="su-row">
              <div>
                <label className="su-label">First</label>
                <input
                  type="text" className="su-input"
                  value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                />
              </div>
              <div>
                <label className="su-label">Last</label>
                <input
                  type="text" className="su-input"
                  value={lastName} onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                />
              </div>
            </div>

            <div className="su-field">
              <label className="su-label">Email</label>
              <input
                type="email" className="su-input"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              />
            </div>

            <div className="su-field">
              <label className="su-label">Password</label>
              <div className="su-pw-wrap">
                <input
                  type={showPassword ? "text" : "password"} className="su-input"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                />
                <button className="su-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && <div className="su-error">⚠ {error}</div>}

            <button
              className="su-btn"
              onClick={handleRegister}
              disabled={loading || msLoading}
            >
              {loading
                ? <><div className="su-spinner" /> Creating Account</>
                : "Create Account"
              }
            </button>

            <p className="su-footer">
              Have an account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModernSignUp;
