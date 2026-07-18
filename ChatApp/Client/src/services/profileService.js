const url = import.meta.env.VITE_AUTH_URL;

export const updateProfile = async (formData) => {
  if (!formData) return;

  try {
    const res = await fetch(`${url}/update-profile`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.log(res);
      return;
    }

    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateAvatar = async (avatar) => {
  if (!avatar) return;
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const res = await fetch(`${url}/uploadAvatar`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      console.log(res);
      return;
    }
    const data = await res.json();
    return data?.data;
  } catch (err) {
    console.error(err);
    return;
  }
};
