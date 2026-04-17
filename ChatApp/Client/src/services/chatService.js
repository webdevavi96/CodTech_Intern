const chatUrl = import.meta.env.VITE_USERS_URL;

export const fetchChat = async (userId, page = 1) => {
  try {
    if (!userId) return;

    const query = {
      page: page,
      limit: 20,
      sortBy: "createdAt",
      sortType: "dsc",
    };

    const queryString = new URLSearchParams(query).toString();

    const res = await fetch(`${chatUrl}/${userId}/?${queryString}`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.error(res);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("fetching chats error: ", error);
  }
};
