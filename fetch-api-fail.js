const errorStatusEl = document.getElementById("error-status");
const errorMessageEl = document.getElementById("error-message");

const showFailCase = async () => {
  try {
    const response = await fetch("https://dummyjson.com/userss");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    errorStatusEl.textContent = `Error: ${error.message}`;
    errorStatusEl.className = "status error";
    errorMessageEl.textContent = "The request failed because the API URL is invalid.";
  }
};

showFailCase();
