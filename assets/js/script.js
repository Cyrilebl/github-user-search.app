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
const repos = document.querySelector(".activity__data:nth-child(1)");
const nbRepos = document.createElement("h2");
const followers = document.querySelector(".activity__data:nth-child(2)");
const nbfollowers = document.createElement("h2");
const following = document.querySelector(".activity__data:nth-child(3)");
const nbfollowing = document.createElement("h2");

//Social informations
const city = document.querySelector(".social__link:nth-child(1)");
const cityLife = document.createElement("p");
const citySvg = document.querySelector(".social__link:nth-child(1) path");

const twitter = document.querySelector(".social__link:nth-child(2)");
const twitterAccount = document.createElement("a");
const twitterSvg = document.querySelector(".social__link:nth-child(2) path");

const website = document.querySelector(".social__link:nth-child(3)");
const personalWebsite = document.createElement("a");
const websiteSvg = document.querySelector(".social__link:nth-child(3) g");

const company = document.querySelector(".social__link:nth-child(4)");
const companyName = document.createElement("a");
const companySvg = document.querySelector(".social__link:nth-child(4) path");

const errorMessage = document.querySelector(".error");

async function fetchUser(username) {
  errorMessage.style.display = "none";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const parsedResponse = await response.json();

    if (!response.ok) {
      return (errorMessage.style.display = "block");
    }

    return updateDOM(parsedResponse);
  } catch (err) {
    return console.log(err);
  }
}

// Updates DOM with new user data
function updateDOM(data) {
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
    const personalWebsiteShort = data.blog.split("/")[2].split(".app")[0];
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
}

window.onload = fetchUser("cyrilebl");

const searchBtn = document.querySelector("button");
const input = document.getElementById("textInput");

searchBtn.addEventListener("click", () => {
  fetchUser(input.value);
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchUser(input.value);
  }
});
