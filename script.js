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

  const studentApplicationForm = document.getElementById("studentApplicationForm");

  if (studentApplicationForm) {
    const inputs = studentApplicationForm.querySelectorAll("input, select, textarea");

    inputs.forEach(input => {
      input.addEventListener("input", function () {
        if (this.classList.contains("input-error")) {
          this.classList.remove("input-error");
        }
      });
    });

    studentApplicationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      inputs.forEach(input => {
        const value = input.value.trim();

        if (input.hasAttribute("required") && value === "") {
          input.classList.add("input-error");
          isValid = false;
        } else if (input.type === "email" && !emailRegex.test(value)) {
          input.classList.add("input-error");
          isValid = false;
        } else {
          input.classList.remove("input-error");
        }
      });

      if (!isValid) {
        alert("Please complete all required fields correctly before submitting.");
        return;
      }

      const formData = new FormData(studentApplicationForm);
      const applicant = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        gender: formData.get("gender"),
        dob: formData.get("dob"),
        nationality: formData.get("nationality"),
        nationalId: formData.get("nationalId"),
        address: formData.get("address"),
        program: formData.get("program"),
        intake: formData.get("intake"),
        school: formData.get("school"),
        academicBackground: formData.get("academicBackground")
      };

      const existingApplications = JSON.parse(localStorage.getItem("bugemaStudentApplications") || "[]");
      existingApplications.push(applicant);
      localStorage.setItem("bugemaStudentApplications", JSON.stringify(existingApplications));

      alert("Your application has been submitted successfully.");
      studentApplicationForm.reset();
      window.location.href = "applications.html";
    });
  }

  const applicationsTable = document.getElementById("applicationsTable");
  const applicationsBody = document.getElementById("applicationsBody");

  if (applicationsTable && applicationsBody) {
    const applications = JSON.parse(localStorage.getItem("bugemaStudentApplications") || "[]");

    if (applications.length > 0) {
      applicationsBody.innerHTML = applications.map(applicant => `
        <tr>
          <td>${applicant.firstName} ${applicant.lastName}</td>
          <td>${applicant.email}</td>
          <td>${applicant.program}</td>
          <td>${applicant.intake}</td>
          <td>${applicant.phone}</td>
        </tr>
      `).join("");
    }
  }

});