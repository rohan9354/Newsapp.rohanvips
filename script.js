const api_key="239a99bf482e47e58c8642a0fd052f19";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchnews("technology"));

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apiKey=${api_key}`);
    const data= await res.json();
    binddata(data.articles);
}
function binddata(articles){
    const cardscontainer=document.getElementById("cardscontainer");
    const newscardtemplate=document.getElementById("template-news-card");

    cardscontainer.innerHTML="";

    articles.forEach((article)=>{
        if (!article.urlToImage) return;

        const cardclone=newscardtemplate.content.cloneNode(true);
        filldataincards(cardclone,article);
        cardscontainer.appendChild(cardclone);
    })
}
function filldataincards(cardclone,article){
    const newsimg=cardclone.querySelector(".news-img");
    const newstitle=cardclone.querySelector(".news-title");
    const newssource=cardclone.querySelector(".news-source");
    const newsdes=cardclone.querySelector(".news-desc");

    newsimg.src=article.urlToImage;
    newstitle.innerHTML=`${article.title.slice(0,60)}...`;
    newsdes.innerHTML=`${article.description.slice(0,150)}...`;

    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {timeZone: "Asia/Jakarta"})
    

    newssource.innerHTML=`${article.source.name} · ${date}`;
    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}
let selectednav=null;
function onNavItemClick(id){
    fetchnews(id);
    const navItem=document.getElementById("id");
    selectednav?.classList.remove("active");
    selectednav=navItem;
    selectednav.classList.add("active");
}
const searchButton =document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query =searchText.value;
    if(!query) return;
    fetchnews(query);
    selectednav?.classList.remove("active");
    selectednav=null;
})