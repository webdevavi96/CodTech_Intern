const url = import.meta.env.VITE_AUTH_URL;

export const registerUser = async (formData) => {
  try {
    const res = await fetch(`${url}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyOtp = async (formData, username) => {
  try {
    const res = await fetch(`${url}/verify_otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, username }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return res;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (formData) => {
  try {
    const res = await fetch(`${url}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(res.message);

    return data;
  } catch (error) {
    console.log("somethin", error);
    throw new Error(error);
  }
};

export const logout = async (user) => {
  const res = await fetch(`${url}/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await res.json();

  return data;
};
