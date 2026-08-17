const API_BASE_URL = (
    import.meta.env.VITE_API_URL || "https://minor-project-i5hl.onrender.com"
).replace(/\/+$/, "");

const API_ROOT = `${API_BASE_URL}/api`;

export { API_BASE_URL, API_ROOT };