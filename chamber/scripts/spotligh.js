const baseURL = "https://blacip.github.io/wdd230/";
const linksURL = "https://blacip.github.io/wdd230/chamber/data/members.json";


// Fetch data from the JSON file
fetch(linksURL)
  .then(response => response.json())
  .then(data => {
    // Filter members with silver or gold status
    const silverGoldMembers = data.members.filter(member => member.membership_level === "Silver" || member.membership_level === "Gold");
    
    // Randomly select members to display
    const randomMembers = [];
    while (randomMembers.length < 2) {
      const randomIndex = Math.floor(Math.random() * silverGoldMembers.length);
      if (!randomMembers.includes(randomIndex)) {
        randomMembers.push(randomIndex);
      }
    }

    // Update HTML with selected members
    randomMembers.forEach((index, i) => {
      const member = silverGoldMembers[index];
      const card = document.getElementById(`ad${i + 1}`);
      if (card) {
        card.innerHTML = `
          <h2>${member.name}</h2>
          <p>${member.other_information}<br>
          <a href="mailto:${member.email}">${member.email}</a><br>
          <a href="tel:${member.phone}">${member.phone}</a><br>
          <a href="${member.website}">Website</a></p>
        `;
        card.style.backgroundImage = `url(${baseURL}${member.image})`;
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));

  