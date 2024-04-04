//Avatar
const left = document.querySelector(".left");
const resultImg = document.createElement("img");

//Name and login
const middle = document.querySelector(".middle");
const resultName = document.createElement("h1");
const resultLogin = document.createElement("h3");

//Bio
const bio = document.querySelector(".bio");
const resultBio = document.createElement("p");

//Creation date
const right = document.querySelector(".right");
const creationDate = document.createElement("p");

// Repositories and followers
const repos = document.querySelector(".repos");
const nbRepos = document.createElement("h1");
const followers = document.querySelector(".followers");
const nbfollowers = document.createElement("h1");
const following = document.querySelector(".following");
const nbfollowing = document.createElement("h1");

//Social informations
const city = document.querySelector(".location");
const cityLife = document.createElement("p");
const citySvg = document.querySelector(".link:nth-child(1) path");

const twitter = document.querySelector(".twitter");
const twitterAccount = document.createElement("a");
const twitterSvg = document.querySelector(".link:nth-child(2) path");

const website = document.querySelector(".website");
const personalWebsite = document.createElement("a");
const websiteSvg = document.querySelector(".link:nth-child(3) g");

const company = document.querySelector(".company");
const companyName = document.createElement("a");
const companySvg = document.querySelector(".link:nth-child(4) path");

function searchUser(username) {
  fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      //Avatar
      resultImg.src = data.avatar_url;
      resultImg.alt = "Profile avatar";
      left.appendChild(resultImg);

      //Name and login
      resultName.innerText = data.name;
      resultLogin.innerText = `@${data.login}`;

      middle.appendChild(resultName);
      middle.appendChild(resultLogin);

      //Bio
      if (data.bio === null) {
        resultBio.innerText = "This profile has no bio";
        resultBio.style.opacity = 0.5;
      } else {
        resultBio.style.opacity = 1;
        resultBio.innerText = data.bio;
      }
      bio.appendChild(resultBio);

      //Creation date
      const joinDate = new Date(data.created_at);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const dateFormat = `${joinDate.getDate()} ${
        months[joinDate.getMonth()]
      } ${joinDate.getFullYear()}`;
      creationDate.innerText = `Joined ${dateFormat}`;

      right.appendChild(creationDate);

      // Repositories and followers
      nbRepos.innerText = data.public_repos;
      repos.appendChild(nbRepos);

      nbfollowers.innerText = data.followers;
      followers.appendChild(nbfollowers);

      nbfollowing.innerText = data.following;
      following.appendChild(nbfollowing);

      // For position
      if (data.location === null) {
        cityLife.innerText = "Not Available";
        cityLife.style.opacity = 0.5;
        citySvg.style.opacity = 0.5;
      } else {
        cityLife.style.opacity = 1;
        citySvg.style.opacity = 1;
        cityLife.innerText = data.location;
      }
      city.appendChild(cityLife);

      // For twitterAccount
      if (data.twitter_username === null) {
        twitterAccount.innerText = "Not Available";
        twitterAccount.removeAttribute("href");
        twitterAccount.style.opacity = 0.5;
        twitterSvg.style.opacity = 0.5;
      } else {
        twitterAccount.style.opacity = 1;
        twitterSvg.style.opacity = 1;
        twitterAccount.innerText = `@${data.twitter_username}`;
        twitterAccount.href = `https://twitter.com/${data.twitter_username}`;
        twitterAccount.target = "_blank";
      }
      twitter.appendChild(twitterAccount);

      // For personalWebsite
      if (data.blog === null || data.blog === "") {
        personalWebsite.innerText = "Not Available";
        personalWebsite.removeAttribute("href");
        personalWebsite.style.opacity = 0.5;
        websiteSvg.style.opacity = 0.5;
      } else {
        personalWebsite.style.opacity = 1;
        websiteSvg.style.opacity = 1;
        const personalWebsiteShort = data.blog.split("/")[2];
        personalWebsite.innerText = personalWebsiteShort;
        personalWebsite.href = data.blog;
        personalWebsite.target = "_blank";
      }
      website.appendChild(personalWebsite);

      // For companyName
      if (data.company === null) {
        companyName.innerText = "Not Available";
        companyName.removeAttribute("href");
        companyName.style.opacity = 0.5;
        companySvg.style.opacity = 0.5;
      } else {
        companyName.style.opacity = 1;
        companySvg.style.opacity = 1;
        const companyNameWithoutAt = data.company.split("@")[1];
        companyName.innerText = data.company;
        companyName.href = `https://github.com/${companyNameWithoutAt}`;
        companyName.target = "_blank";
      }
      company.appendChild(companyName);
    });
}

window.onload = searchUser("cyrilebl");

const searchBtn = document.querySelector("button");
const input = document.getElementById("textInput");

searchBtn.addEventListener("click", () => {
  searchUser(input.value);
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchUser(input.value);
  }
});

// Dark Mode
const colorMode = document.querySelector(".colorMode");
let isDefaultMode = true;

colorMode.addEventListener("click", () => {
  const colorName = document.querySelector(".colorMode p");
  const colorIcon = document.querySelector(".colorMode path");
  const root = document.documentElement.style;

  if (isDefaultMode) {
    colorName.textContent = "Light";
    colorIcon.setAttribute(
      "d",
      "M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"
    );
    colorIcon.setAttribute("fill", "#FFF");

    root.setProperty("--background", "rgb(20, 29, 47)");
    root.setProperty("--component-background", "rgb(30, 42, 71)");
    root.setProperty("--title", "rgb(255, 255, 255)");
    root.setProperty("--text", "rgb(255, 255, 255)");
    root.setProperty("--third", "rgb(255, 255, 255)");
    root.setProperty("--shadow", "none");
    root.setProperty("--bigShadow", "none");
    root.setProperty("--colorMode", "rgb(144, 164, 212)");

    citySvg.style.fill = "#FFF";
    twitterSvg.style.fill = "#FFF";
    websiteSvg.style.fill = "#FFF";
    companySvg.style.fill = "#FFF";

    isDefaultMode = false;
  } else {
    // Reset styles to default mode
    colorName.textContent = "Dark";
    colorName.style.color = "";
    colorIcon.setAttribute(
      "d",
      "M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z"
    ); // Reset path data to default
    colorIcon.setAttribute("fill", "#697C9A");

    // Reset root styles to default
    root.removeProperty("--background");
    root.removeProperty("--component-background");
    root.removeProperty("--title");
    root.removeProperty("--text");
    root.removeProperty("--third");
    root.removeProperty("--shadow");
    root.removeProperty("--bigShadow");
    root.removeProperty("--colorMode");

    // Reset SVG fills to default
    citySvg.style.removeProperty("fill");
    twitterSvg.style.removeProperty("fill");
    websiteSvg.style.removeProperty("fill");
    companySvg.style.removeProperty("fill");

    isDefaultMode = true;
  }
});
