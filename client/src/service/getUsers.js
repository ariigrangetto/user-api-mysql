const API_URL = import.meta.env.VITE_PATH_URL;

export default async function getUsers() {
  try {
    const result = await fetch(`${API_URL}/`);
    if (!result.ok) {
      throw new Error("Error fetching data");
    }

    const data = await result.json();

    return data.users;
  } catch (error) {
    console.error("Error fetching: " + error.message);
    throw new Error("Error fetching");
  }
}
