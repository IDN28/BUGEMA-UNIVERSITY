// script.js - Client-Side Validation & Form Handling

document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Mobile Menu Navigation
  const navLinks = document.getElementById("navLinks");

  window.showMenu = function () {
    if (navLinks) {
      navLinks.style.right = "0";
    }
  };

  window.hideMenu = function () {
    if (navLinks) {
      navLinks.style.right = "-200px";
    }
  };

  // 2. Form Submission Handling with Custom Validation
  const registrationForm = document.getElementById("registrationForm");

  if (registrationForm) {
    // Select all inputs and select boxes inside the form
    const inputs = registrationForm.querySelectorAll("input, select");

    // Clear red error highlight on live typing/selection
    inputs.forEach(input => {
      input.addEventListener("input", function () {
        if (this.classList.contains("input-error")) {
          this.classList.remove("input-error");
        }
      });
    });

    registrationForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent default page refresh

      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate each input field
      inputs.forEach(input => {
        const value = input.value.trim();

        // Check empty required fields
        if (input.hasAttribute("required") && value === "") {
          input.classList.add("input-error");
          isValid = false;
        } 
        // Validate specific email format
        else if (input.type === "email" && !emailRegex.test(value)) {
          input.classList.add("input-error");
          isValid = false;
        } 
        // Clear error if valid
        else {
          input.classList.remove("input-error");
        }
      });

      // Stop submission if any field is invalid
      if (!isValid) {
        return;
      }

      // Submit form data via AJAX if validation passes
      const form = event.target;
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert("Registration successful! Details have been sent.");
          form.reset(); // Clear form fields
        } else {
          alert("There was an issue submitting your registration. Please try again.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("Unable to reach the server. Check your connection.");
      }
    });
  }

});