// document.addEventListener("DOMContentLoaded", function () {
//   const hamburger = document.querySelector(".hamburger");
//   const navLinks = document.querySelector(".nav-links");
//   const dropdownSubs = document.querySelectorAll(".dropdown-sub > a");

//   // Toggle main menu
//   hamburger.addEventListener("click", function () {
//       navLinks.classList.toggle("show");
//   });

//   // Handle submenu clicks in mobile view
//   dropdownSubs.forEach((item) => {
//       item.addEventListener("click", function (e) {
//           e.preventDefault(); // Prevent default link behavior

//           const subMenu = this.nextElementSibling; // Get submenu
          
//           if (subMenu) {
//               // Close all other submenus before opening the clicked one
//               document.querySelectorAll(".sub-menu").forEach((menu) => {
//                   if (menu !== subMenu) {
//                       menu.classList.remove("show");
//                   }
//               });

//               // Toggle the clicked submenu
//               subMenu.classList.toggle("show");
//           }
//       });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const dropdownSubs = document.querySelectorAll(".dropdown-sub > a");

    // Toggle main menu
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });

    // Handle submenu clicks in mobile view
    dropdownSubs.forEach((item) => {
        item.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default link behavior

            const parentDropdown = this.parentElement; // Get parent .dropdown-sub

            // Close other open submenus
            document.querySelectorAll(".dropdown-sub").forEach((dropdown) => {
                if (dropdown !== parentDropdown) {
                    dropdown.classList.remove("active");
                }
            });

            // Toggle the clicked submenu
            parentDropdown.classList.toggle("active");
        });
    });
});

