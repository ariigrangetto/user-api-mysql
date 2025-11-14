const url = import.meta.env.VITE_PATH_URL;

export async function fetchUsers() {
  try {
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error("Error fetching data");
    }
    const data = result.json();
    return data.users;
  } catch (error) {
    console.error("Error fetching: " + error.message);
    throw new Error("Error fetching");
  }
}
