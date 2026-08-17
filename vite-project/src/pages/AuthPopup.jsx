import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { API_ROOT } from "../config/api";

/**
 * AuthPopup — Microsoft MSAL redirect landing page.
 * After Microsoft login, the user lands here.
 * We read the MSAL account, send it to the backend, then redirect to /student.
 */
const AuthPopup = () => {
    const { accounts, instance } = useMsal();
    const navigate = useNavigate();

    useEffect(() => {
        const handleMicrosoftLogin = async () => {
            // MSAL may still be processing the redirect — wait briefly
            if (accounts.length === 0) return;

            const account = accounts[0];
            const name  = account.name  || account.username;
            const email = account.username; // always the UPN/email

            try {
                const res = await fetch(`${API_ROOT}/students/microsoft-login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email }),
                });

                const data = await res.json();

                if (res.ok && data.student) {
                    // Store student info in sessionStorage for the dashboard
                    sessionStorage.setItem("student", JSON.stringify(data.student));
                    navigate("/student", { replace: true });
                } else {
                    console.error("Microsoft login backend error:", data);
                    navigate("/student-login", { replace: true });
                }
            } catch (err) {
                console.error("Microsoft login failed:", err);
                navigate("/student-login", { replace: true });
            }
        };

        handleMicrosoftLogin();
    }, [accounts, navigate]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            fontFamily: "sans-serif",
            background: "#0f172a",
            color: "#fff"
        }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
            <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
                Completing Microsoft sign-in…
            </p>
        </div>
    );
};

export default AuthPopup;