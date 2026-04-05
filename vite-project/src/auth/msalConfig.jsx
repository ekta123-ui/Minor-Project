export const msalConfig = {
    auth: {
        clientId: "20f70d5c-de30-4329-98c2-6432221a33d9",
        authority: "https://login.microsoftonline.com/38fd5a4b-955f-455a-9ad2-d2daa5a4e4d0",
        redirectUri: "http://localhost:5173/auth-popup" // ✅ correct
    }
};

export const loginRequest = {
    scopes: ["User.Read", "email", "profile"]
};

