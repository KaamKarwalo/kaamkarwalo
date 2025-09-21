// 📍 Get Current Location
async function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const googleLink = `https://www.google.com/maps?q=${lat},${lng}`;
        const locEl = document.getElementById("regLocation");
        if (locEl) locEl.value = googleLink;
        alert("📍 Location captured successfully!");
      },
      (error) => {
        console.error(error);
        alert("❌ Unable to fetch location. Please allow GPS access.");
      }
    );
  } else {
    alert("❌ Geolocation is not supported in this browser.");
  }
}

// 📍 Generate Unique User ID
function generateUniqueId() {
  return "UID-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

// 📍 Register User
// async function registerUser() {
//   // preferred selectors (IDs). If missing, use fallbacks inside the modals.
//   const userId = $("#uniqueId").val() ? $("#uniqueId").val().trim() : "";
//   const role = $("#userRole").val() ? $("#userRole").val().trim() : $("#registerModal select").val() || "";
//   const name = $("#regName").val() ? $("#regName").val().trim() : $("#registerModal input[placeholder='Name *']").val() || "";
//   const email = $("#regEmail").val() ? $("#regEmail").val().trim() : $("#registerModal input[type='email']").val() || "";
//   const phone = $("#regPhone").val() ? $("#regPhone").val().trim() : $("#registerModal input[placeholder*='Mobile']").val() || "";
//   const password = $("#registerModal input[type='password']").first().val() ? $("#registerModal input[type='password']").first().val().trim() : "";
//   const workerType = role === "worker" ? ($("#workerType").val() ? $("#workerType").val().trim() : "") : "";
//   const city = $("#regCity").val() ? $("#regCity").val().trim() : $("#registerModal input[placeholder*='City']").val() || "";
//   const district = $("#regDistrict").val() ? $("#regDistrict").val().trim() : $("#registerModal input[placeholder*='District']").val() || "";
//   const state = $("#regState").val() ? $("#regState").val().trim() : $("#registerModal input[placeholder*='State']").val() || "";
//   const address = $("#regAddress").val() ? $("#regAddress").val().trim() : $("#registerModal input[placeholder*='Full Address']").val() || "";
//   const location = $("#regLocation").val() ? $("#regLocation").val().trim() : $("#registerModal input[placeholder*='Google Map']").val() || "";

//   if (!userId || !role || !name || !phone || !password || !city || !district || !state) {
//     alert("Please fill all required fields");
//     return;
//   }
//   if (role === "worker" && !workerType) {
//     alert("Please select a worker type");
//     return;
//   }

//   const data = {
//     userId, role, name, email, phone, password,
//     workerType, city, district, state, address, location
//   };

//   try {
//     const res = await fetch("https://kaamkarwalo-backend.onrender.com/api/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     const result = await res.json();
//     if (res.ok) {
//       alert(result.message || "Registered!");
//       $("#registerModal").addClass("hidden");
//       $("#registerModal input").val("");
//     } else {
//       alert(result.error || "Registration failed.");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// }

async function registerUser() {
  const userId = $("#uniqueId").val().trim();
  const role = $("#userRole").val().trim();
  const name = $("#regName").val().trim();
  const email = $("#regEmail").val().trim();
  const phone = $("#regPhone").val().trim();
  const password = $("#regPassword").val().trim();
  const workerType = role === "worker" ? $("#workerType").val().trim() : "";
  const city = $("#regCity").val().trim();
  const district = $("#regDistrict").val().trim();
  const state = $("#regState").val().trim();
  const address = $("#regAddress").val().trim();
  const location = $("#regLocation").val().trim();

  if (!userId || !role || !name || !phone || !password || !city || !district || !state) {
    alert("Please fill all required fields");
    return;
  }
  if (role === "worker" && !workerType) {
    alert("Please select a worker type");
    return;
  }

  const data = { userId, role, name, email, phone, password, workerType, city, district, state, address, location };

  try {
    // Show spinner
    $("#loadingOverlay").removeClass("hidden");

    const res = await fetch("https://kaamkarwalo-backend.onrender.com/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert(result.message || "Registered!");
      $("input, select").val("");
    } else {
      alert(result.error || "Registration failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    // Always hide spinner after request completes
    $("#loadingOverlay").addClass("hidden");
  }
}

// 📍 Login User
async function loginUser() {
  // prefer IDs but fallback to modal inputs if IDs missing
  const phone = $("#loginPhone").val() ? $("#loginPhone").val().trim() : ($("#loginModal input[type='text']").val() || "").trim();
  const password = $("#loginPassword").val() ? $("#loginPassword").val().trim() : ($("#loginModal input[type='password']").val() || "").trim();

  if (!phone || !password) {
    alert("Enter phone and password");
    return;
  }

  $("#loadingOverlay").removeClass("hidden"); // Show spinner

  try {
    const res = await fetch("https://kaamkarwalo-backend.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    const result = await res.json();
    if (res.ok) {
      const user = result.user;
      if (user.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(user));
        window.location.href = "admin.html";
      } else if (user.role === "customer") {
        localStorage.setItem("customer", JSON.stringify(user));
        window.location.href = "customer-home.html";
      } else if (user.role === "worker") {
        localStorage.setItem("worker", JSON.stringify(user));
        window.location.href = "worker-page.html";
      }
    } else {
      alert(result.error || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    $("#loadingOverlay").addClass("hidden"); // always hide
  }
}

// 📍 Setup header text + visibility (run after header.html is loaded)
function setupHeaderButtons() {
  const loginBtn = $("#loginBtn, #loginBtnMobile");
  const registerBtn = $("#registerBtn, #registerBtnMobile");
  const logoutBtn = $("#logoutBtn, #logoutBtnMobile");

  if (localStorage.getItem("admin")) {
    loginBtn.text("Go to Admin Panel").off("click").on("click", () => window.location.href = "admin.html");
    registerBtn.hide();
    logoutBtn.show();
  } else if (localStorage.getItem("customer")) {
    loginBtn.text("Go to Customer Page").off("click").on("click", () => window.location.href = "customer-home.html");
    registerBtn.hide();
    logoutBtn.show();
  } else if (localStorage.getItem("worker")) {
    loginBtn.text("Go to Worker Page").off("click").on("click", () => window.location.href = "worker-page.html");
    registerBtn.hide();
    logoutBtn.show();
  } else {
    // ensure click handlers exist (delegation covers this too)
    loginBtn.text("Login");
    registerBtn.show();
    logoutBtn.hide();
  }
}

// Delegated event handlers (works for elements loaded later)
$(document).on("click", "#menuToggle", function () {
  $("#navMenu").toggleClass("hidden");
});

$(document).on("click", "#loginBtn, #loginBtnMobile", function (e) {
  e.preventDefault();
  $("#loginModal").removeClass("hidden").addClass("flex");
});

$(document).on("click", "#registerBtn, #registerBtnMobile", function (e) {
  e.preventDefault();
  $("#registerModal").removeClass("hidden").addClass("flex");
});

$(document).on("click", "#logoutBtn, #logoutBtnMobile", function (e) {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "index.html";
});

// Form submit buttons (delegated)
$(document).on("click", "#loginSubmit", function (e) {
  e.preventDefault();
  loginUser();
});

$(document).on("click", "#submitRegister", function (e) {
  e.preventDefault();
  registerUser();
});

// userRole change (delegated)
$(document).on("change", "#userRole", function () {
  const role = $(this).val();
  if ($("#uniqueId").length) $("#uniqueId").val(generateUniqueId());
  else $("#registerModal input[placeholder='User ID']").val(generateUniqueId());
  if (role === "worker") {
    $("#workerType").removeClass("hidden");
  } else {
    $("#workerType").addClass("hidden");
  }
});

// 📍 Close Welcome Video
function closeWelcomeVideo() {
  const modal = document.getElementById("welcomeVideoModal");
  const iframe = document.getElementById("welcomeVideoFrame");
  if (modal) modal.style.display = "none";
  if (iframe) iframe.src = "";
  const video = document.getElementById("welcomeVideo");
  if (video) video.pause();
}

// 📍 On Load show welcome video (safe)
window.onload = function () {
  const modal = document.getElementById("welcomeVideoModal");
  if (modal) modal.style.display = "flex";
};

// 📍 Load external HTML parts
$(function () {
  // load header then setup state (delegated handlers already cover clicks)
  $("#header").load("header.html", function () {
    setupHeaderButtons();
  });

  $("#content").load("home.html");
  $("#footer").load("footer.html");
  $("#modals").load("modals.html", function () {
    // setupHeaderButtons might also need to run in case modals.html contains the login/register markup used for fallbacks
    setupHeaderButtons();
  });
  $("#hero").load("hero.html");
});
