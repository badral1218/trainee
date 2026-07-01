const statusEl = document.getElementById("status");
const usersListEl = document.getElementById("users-list");

let users = [];
let loading = true;
let error = null;

const renderUsers = () => {
  if (loading) {
    statusEl.textContent = "Loading users...";
    statusEl.className = "status loading";
    usersListEl.innerHTML = "";
    return;
  }

  if (error) {
    statusEl.textContent = `Error: ${error}`;
    statusEl.className = "status error";
    usersListEl.innerHTML = "";
    return;
  }

  statusEl.textContent = `Success: loaded ${users.length} users`;
  statusEl.className = "status success";

  usersListEl.innerHTML = users
    .map(
      (user) => `
        <li>
          <strong>${user.firstName} ${user.lastName}</strong> — ${user.email}
        </li>
      `
    )
    .join("");
};

const getUsers = async () => {
  try {
    loading = true;
    error = null;
    renderUsers();

    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    users = data.users || [];
  } catch (err) {
    console.error("Error fetching users:", err);
    error = err.message || "Something went wrong";
  } finally {
    loading = false;
    renderUsers();
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", getUsers);
} else {
  getUsers();
}


