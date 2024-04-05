let darkMode = localStorage.getItem("darkMode");

const colorName = document.querySelector(".colorMode p");
const colorIcon = document.querySelector(".colorMode path");
const originalAttribute = colorIcon.getAttribute("d");

//Social SVG
const socialSvg = document.querySelectorAll(".social__link path");
const websiteSvg = document.querySelector(".social__link:nth-child(3) g");

const enabledarkMode = () => {
  document.body.classList.add("darkMode");

  colorName.textContent = "Light";
  colorIcon.setAttribute(
    "d",
    "M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"
  );

  socialSvg.forEach((svg) => {
    svg.style.fill = "#FFF";
  });
  websiteSvg.style.fill = "#FFF";

  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkMode");

  // Reset styles to default mode
  colorName.textContent = "Dark";
  colorName.style.color = "";
  colorIcon.setAttribute("d", originalAttribute);

  // Reset SVG fills to default
  socialSvg.forEach((svg) => {
    svg.style.removeProperty("fill");
  });
  websiteSvg.style.removeProperty("fill");

  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enabledarkMode();
}

const colorMode = document.querySelector(".colorMode");

colorMode.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enabledarkMode();
  } else {
    disableDarkMode();
  }
});
