const baseURL = "https://blacip.github.io/wdd230/";
const linksURL = "https://blacip.github.io/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    const data = await response.json();
    displayLinks(data); 
}

function displayLinks(weeks) {
  const menu = document.getElementById("activityLinks");
  
  // Clear existing content
  menu.innerHTML = "";
  
  // Loop through each week
  weeks.forEach(week => {
    const weekNum = week.lesson;
    const links = week.links;

    // Create list item for week
    const weekItem = document.createElement("li");
    weekItem.textContent = `Week ${weekNum}:`;

    // Create nested unordered list for links
    const linkList = document.createElement("ul");

    // Loop through each link
    links.forEach(link => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = baseURL + link.url;
      anchor.textContent = link.title;
      listItem.appendChild(anchor);
      linkList.appendChild(listItem);
    });

    // Append nested list to week item
    weekItem.appendChild(linkList);

    // Append week item to menu
    menu.appendChild(weekItem);
  });
}




getLinks();

  