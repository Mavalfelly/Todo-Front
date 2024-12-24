import { jwtDecode } from "jwt-decode";

const BACKEND_URL = import.meta.env.VITE_BACK_URL;

export const register = async (formData) => {
    try {
        const res = await fetch(`${BACKEND_URL}/user/register/`, {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify(formData)
        })
        const json = await res.json();
        if(json.error){
            throw new Error(json.error)
        }
    }catch(err){
        throw new Error(err)
    }
}


export const getUser = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        
        const user = jwtDecode(token);
        return user;
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};


export const signin = async (formData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/user/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorDetails = await res.json();
        throw new Error(errorDetails.detail || "Authentication failed");
      }
  
      const json = await res.json();
      localStorage.setItem("token", json.access);
      return json;
    } catch (err) {
      console.error("Error during sign-in:", err);
      throw err;
    }
  };
  

export const signout = () => {
    localStorage.removeItem('token');
}