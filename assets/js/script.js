const result = document.getElementById("result");

const resultTop = document.querySelector(".result__top");

const left = document.querySelector(".left");
const resultImg = document.createElement("img");

const middle = document.querySelector(".middle");
const resultName = document.createElement("h1");
const resultLogin = document.createElement("h3");

const bio = document.querySelector(".bio");
const resultBio = document.createElement("p");

const right = document.querySelector(".right");
const creationDate = document.createElement("p");

const repos = document.querySelector(".repos");
const nbRepos = document.createElement("h1");
const followers = document.querySelector(".followers");
const nbfollowers = document.createElement("h1");
const following = document.querySelector(".following");
const nbfollowing = document.createElement("h1");

function searchUser(username) {
  fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      resultImg.src = data.avatar_url;
      resultName.innerText = data.name;
      resultLogin.innerText = `@${data.login}`;
      resultBio.innerText = data.bio;
      // Format date as Day / Month / Year
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
      nbRepos.innerText = data.public_repos;
      nbfollowers.innerText = data.followers;
      nbfollowing.innerText = data.following;

      left.appendChild(resultImg);
      middle.appendChild(resultName);
      middle.appendChild(resultLogin);
      bio.appendChild(resultBio);
      right.appendChild(creationDate);
      repos.appendChild(nbRepos);
      followers.appendChild(nbfollowers);
      following.appendChild(nbfollowing);
    });
}

window.onload = searchUser("cyrilebl");

const searchBtn = document.querySelector("button");

searchBtn.addEventListener("click", () => {
  const input = document.getElementById("textInput").value;

  searchUser(input);
});

searchBtn.addEventListener("keypress", () => {
  const input = document.getElementById("textInput").value;

  searchUser(input);
});
