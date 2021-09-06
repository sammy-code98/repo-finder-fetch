const form = document.querySelector("#search");
const profileImg = document.querySelector(".profile-img");
const username = document.querySelector(".username");
const followers = document.querySelector("#followers");
const repos = document.querySelector("#repositories_data");
const following = document.querySelector("#following");
const overlay = document.querySelector(".overlay");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearFields();
  const usname = form.elements.usname.value;
  form.elements.usname.value = null;
  form.elements.usname.focus();
  makeCall(usname);
});

const makeCall = (usname) => {
  const API = `https://api.github.com/users/${usname}`;
  fetch(API)
    .then((res) => res.json())
    // .then((data) => console.log(data));
    .then((data) => {
      if (data.message) throw Error();
      createImage(data.avatar_url);

      // this function renders data
      renderData({
        name: data.login,
        followers: data.followers,
        following: data.following,
        repos: data.public_repos,
      });
      error_overlay.style.visibility = "hidden";
    })
    .catch((e) => {
      console.error("user not found");
    });
};
// destructure the params in the renderData function
const renderData = ({ name, followers, following, repos }) => {
  username.innerText = name;
  repos.innerText = `${repos} Public Repositories`;
  followers.innerText = `${followers} Followers`;
  following.innerText = `${following} Following`;
  removeSkeleton();
};

const removeSkeleton = () => {
  profileImg.classList.remove("loading");
  username.classList.remove("loading");
  followers.parentElement.classList.remove("loading");
  repos.parentElement.classList.remove("loading");
  following.parentElement.classList.remove("loading");
};
const createImage = (src) => {
  const img = new Image();
  img.classList.add("img");
  img.src = src;
  img.alt = "Hello";
  profileImg.appendChild(img);
};

const enableOverlay = () => {
  const src = "https://i.ibb.co/N3cmDhB/Img.png";
  createImage(src);
  error_overlay.style.visibility = "visible";
};

const clearFields = () => {
    profileImg.innerHTML = null;
    username.innerHTML = null;
    followers.innerHTML = null;
    following.innerHTML = null;
    repos.innerHTML = null;
    addSkeleton();
  };
  const addSkeleton = () => {
    profileImg.classList.add("loading");
    username.classList.add("loading");
    followers.parentElement.classList.add("loading");
    repos.parentElement.classList.add("loading");
    following.parentElement.classList.add("loading");
  };