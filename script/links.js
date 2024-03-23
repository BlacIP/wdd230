const baseURL = "https://blacip.github.io/wdd230/";
const linksURL = "https://blacip.github.io/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    console.log(data); 
    displayLinks(data.lessons); 
  }


function displayLinks(lessons) {
  const menu = document.getElementById("activityLinks");
  
  menu.innerHTML = "";
  
  
  const list = document.createElement("ul")
  lessons.forEach(lesson => {
    const weekNum = lesson.lesson;
    const links = lesson.links;

    const weekItem = document.createElement("li");
    const weekText = document.createTextNode(`Week ${weekNum}: `);
    weekItem.appendChild(weekText);

    const linksContainer = document.createElement("span");

    links.forEach((link, index) => {

      const anchor = document.createElement("a");
      anchor.href = link.url.startsWith("http") ? link.url : baseURL + link.url;
      anchor.textContent = link.title;
      linksContainer.appendChild(anchor);

      if (index < links.length - 1) {
        const separator = document.createTextNode(" | ");
        linksContainer.appendChild(separator);
      }
    });

    
    weekItem.appendChild(linksContainer);
    list.appendChild(weekItem);
  });

  menu.appendChild(list);
}

getLinks();
