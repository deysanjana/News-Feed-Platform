let apiKey="83b860ad718e4222b07d2a8eb1226eb4";
//API Used: http://newsapi.org/s/india-news-api
const optionsContainer = document.querySelector(".options-container");
// "in" stands for India
const country = "in";
const options = ["General","Entertainment","Health","Science","Sports","Technology","Business"];
const container = document.querySelector(".container");

//Requests per day
let requestURL;

//Create cards from data
const generateUI = (articles) => {
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = 
        `<div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            <div class="news-description">
                ${item.description || item.content || ""}
            </div>
            <button class="button"><a href="${item.url}" target="_blank" >Read More</a></button>
        </div>`;
        container.appendChild(card);
    }
};

//News API Call
const getNews = async () => {
    container.innerHTML = ""; 
    try {
        let response = await fetch(requestURL); 
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let data = await response.json(); 
        generateUI(data.articles); 
    } catch (error) {
        alert("Data unavailable at the moment. Please try again later");
        console.error("Fetch error: ", error); 
    }
};

//Category Selection
const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    e.target.classList.add("active");
    getNews();
};

//Options Buttons
const createOptions = () => {
    for (let i of options) {
        optionsContainer.innerHTML += 
        `<button class="option ${i == "general" ? "active" : ""}" onclick="selectCategory(event,'${i}')">${i}</button>`;
      }
    };
    
const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
};

window.onload = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
};
