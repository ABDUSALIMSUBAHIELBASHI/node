// Base URL of the backend API
const API_URL = "http://localhost:5000/api";

// ------------------ PASSWORD VISIBILITY TOGGLE ------------------

// Helper function to toggle password visibility
function togglePasswordVisibility(inputId, buttonId, iconId) {
  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);
  const icon = document.getElementById(iconId);
  
  if (button) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      
      // Toggle eye icon (show/hide)
      if (isPassword) {
        icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24\"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
      } else {
        icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
      }
    });
  }
}

// Initialize password toggles for both register and login
togglePasswordVisibility("password", "togglePasswordRegister", "eyeIconRegister");
togglePasswordVisibility("password", "togglePasswordLogin", "eyeIconLogin");

// ------------------ REGISTER ------------------

// Get the register button from the DOM
const registerBtn = document.getElementById("registerBtn");

// Check if the register button exists to avoid errors
if (registerBtn) {
  // Add a click event listener to the register button
  registerBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get the firstName, lastName, email and password values from input fields and trim whitespace
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Simple validation: if any required field is empty, show an alert
    if (!firstName || !lastName || !email || !password) return alert("First name, last name, email and password are required");

    try {
      // Send a POST request to the backend to register the user
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST", // HTTP method
        headers: { "Content-Type": "application/json" }, // JSON content type
        body: JSON.stringify({ firstName, lastName, email, password }), // Send all fields as JSON
      });

      // Parse the JSON response
      const data = await res.json();

      // Show a message from the server (success or error)
      alert(data.message);

      // If registration is successful, redirect to login page
      if (res.ok) window.location.href = "login.html";
    } catch (err) {
      console.error(err); // Log error in console
      alert("Server error"); // Show generic error to user
    }
  });
}

// ------------------ LOGIN ------------------

// Get the login button from the DOM
const loginBtn = document.getElementById("loginBtn");

// Check if login button exists
if (loginBtn) {
  // Add a click event listener to the login button
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent form submission

    // Get email and password values from input fields
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate input
    if (!email || !password) return alert("Email and password are required");

    try {
      // Send POST request to login endpoint
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Parse JSON response
      const data = await res.json();

      // If login failed, show server message
      if (!res.ok) return alert(`❌ ${data.message || 'Login failed'}`);

      // Store JWT token in local storage for authenticated requests
      localStorage.setItem("token", data.token);
      
      console.log('✅ Login successful, token stored');

      // Redirect to dashboard page
      window.location.href = "dashboard.html";
    } catch (err) {
      console.error('Login error:', err); // Log error
      alert('❌ Server error!\n\nMake sure the backend is running:\n1. cd backend\n2. npm install\n3. node server.js\n\nBackend should be on: http://localhost:5000');
    }
  });
}

// ------------------ DASHBOARD ------------------

// Get the add name button
const addNameBtn = document.getElementById("addNameBtn");

// If the button exists, attach event listeners
if (addNameBtn) {
  addNameBtn.addEventListener("click", addName); // Add new name
  document.getElementById("logoutBtn")?.addEventListener("click", logout); // Logout button
  window.addEventListener("DOMContentLoaded", loadNames); // Load names when page is loaded
}

// ------------------ HELPER ------------------

// Helper function to get token from localStorage
function getToken() {
  return localStorage.getItem("token"); // Returns JWT token
}

// ------------------ LOAD NAMES ------------------

// Load names from backend and display them
async function loadNames() {
  const token = getToken(); // Get JWT token
  if (!token) return (window.location.href = "login.html"); // Redirect if not logged in

  try {
    // Fetch names from API with authorization header
    const res = await fetch(`${API_URL}/names`, {
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to load names");
    }

    const names = await res.json(); // Parse response JSON
    const ul = document.getElementById("namesList"); // Get the list element
    ul.innerHTML = ""; // Clear current list

    if (!names || names.length === 0) {
      ul.innerHTML = '<li style="text-align: center; color: #999; padding: 2rem;">No names saved yet. Add one above!</li>';
      return;
    }

    // Loop through names and create list items
    names.forEach((n) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-center p-2 border rounded"; // Tailwind CSS styles

      // Create span for name text
      const text = document.createElement("span");
      text.textContent = `${n.firstName} ${n.lastName || ""}`; // Display full name
      li.appendChild(text);

      // Create div for edit/delete buttons
      const actions = document.createElement("div");
      actions.className = "flex gap-2";

      // Edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "bg-yellow-400 text-white px-2 py-1 rounded";
      editBtn.addEventListener("click", () => editName(n._id, n.firstName, n.lastName));
      actions.appendChild(editBtn);

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "bg-red-500 text-white px-2 py-1 rounded";
      delBtn.addEventListener("click", () => deleteName(n._id));
      actions.appendChild(delBtn);

      li.appendChild(actions); // Append actions to li
      ul.appendChild(li); // Append li to ul
    });
  } catch (err) {
    console.error('Load names error:', err);
    const ul = document.getElementById("namesList");
    if (ul) {
      ul.innerHTML = `<li style="color: red; padding: 1rem;">❌ Error loading names: ${err.message}</li>`;
    }
  }
}


// ------------------ ADD NAME ------------------

// Function to add a new name
async function addName(e) {
  e.preventDefault(); // Prevent default form submission

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const token = getToken(); // Get token

  if (!token) {
    alert("Please log in first to save names");
    window.location.href = "login.html";
    return;
  }

  if (!firstName) {
    alert("❌ First name is required");
    return;
  }

  try {
    // Send POST request to add new name
    const res = await fetch(`${API_URL}/names`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Server response:', data);
      throw new Error(data.message || "Failed to add name"); 
    }

    // Show success message
    alert(`✅ Success! "${firstName} ${lastName}" has been added!`);

    // Clear input fields
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";

    // Reload names list
    await loadNames();
  } catch (err) {
    console.error('Add name error:', err);
    
    if (err.message.includes('Failed to fetch')) {
      alert('❌ Server error!\n\nMake sure the backend is running:\n1. cd backend\n2. npm install\n3. node server.js\n\nThen refresh this page.');
    } else {
      alert(`❌ Error: ${err.message}`);
    }
  }
}


// ------------------ EDIT & DELETE ------------------

// Edit name: prompts user to edit first and last name
function editName(id, firstName, lastName) {
  const newFirst = prompt("Edit First Name", firstName); // Prompt for first name
  if (newFirst === null) return; // Cancel if user presses cancel
  const newLast = prompt("Edit Last Name", lastName || ""); // Prompt for last name
  updateName(id, newFirst, newLast); // Call update function
}

// Update name on backend
async function updateName(id, firstName, lastName) {
  const token = getToken(); // Get JWT token
  try {
    // Send PUT request to update name
    const res = await fetch(`${API_URL}/names/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to update");
    }

    alert(`✅ Success! Name updated to "${firstName} ${lastName}"`);
    await loadNames(); // Reload list
  } catch (err) {
    console.error('Update error:', err);
    alert(`❌ Error: ${err.message}`);
  }
}

// Delete name from backend
async function deleteName(id) {
  if (!confirm("Are you sure you want to delete this name?")) return; // Ask for confirmation
  const token = getToken(); // Get JWT token
  try {
    // Send DELETE request
    const res = await fetch(`${API_URL}/names/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to delete");
    }

    alert("✅ Success! Name has been deleted");
    await loadNames(); // Reload list
  } catch (err) {
    console.error('Delete error:', err);
    alert(`❌ Error: ${err.message}`);
  }
}

// ------------------ LOGOUT ------------------

// Logout user: remove token and redirect to login
function logout(e) {
  e?.preventDefault(); // Prevent default action if event exists
  localStorage.removeItem("token"); // Remove token from storage
  window.location.href = "login.html"; // Redirect to login
}
