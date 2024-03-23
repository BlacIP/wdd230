const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets); 
    displayProphets(data.prophets);
  }

  const displayProphets = (prophets) => {
    const container = document.getElementById("cards");
  
    container.innerHTML = "";
  
    prophets.forEach(prophet => {
      // Create card elements
      const card = document.createElement("section");
  
      const fullName = document.createElement("h2");
      fullName.textContent = `${prophet.name} ${prophet.lastname}`;
  
      const portrait = document.createElement("img");
      portrait.setAttribute("src", prophet.imageurl);
      portrait.setAttribute("alt", `${prophet.name} ${prophet.lastname}`);
      portrait.setAttribute("loading", "lazy");
      portrait.setAttribute("width", "340"); 
      portrait.setAttribute("height", "440"); 

      const birthdate = document.createElement("p");
      birthdate.textContent = `Birthdate: ${prophet.birthdate}`;

      const death = document.createElement("p");
      death.textContent = `Death: ${prophet.death}`;

      const birthplace = document.createElement("p");
      birthplace.textContent = `Birthplace: ${prophet.birthplace}`;

      const numOfChildren = document.createElement("p");
      numOfChildren.textContent = `Number of Children: ${prophet.numofchildren}`;
  
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthdate);
    card.appendChild(death);
    card.appendChild(birthplace);
    card.appendChild(numOfChildren);

    // Append card to container
    container.appendChild(card);
    });
  }
  
  
  
  
  getProphetData();
  