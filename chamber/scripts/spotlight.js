const baseURL = "https://blacip.github.io/wdd230/";
const linksURL = "https://blacip.github.io/wdd230/chamber/data/members.json";


// Fetch data from the JSON file
fetch(linksURL)
  .then(response => response.json())
  .then(data => {
    // Filter members with silver or gold status
    const silverGoldMembers = data.members.filter(member => member.membership_level === "Silver" || member.membership_level === "Gold");
    
    // Randomly select three members to display
    const randomMembers = [];
    while (randomMembers.length < 3) {
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
        const h2 = card.querySelector('h2');
        h2.innerHTML = `<span class="logo" style="background-image: url(${baseURL}${member.image})"></span> ${member.name}`;
        card.querySelector('p').innerHTML = `
          "${member.other_information}" <br>
          ${member.address} <br> 
          <a href="tel:${member.phone}"> ${member.phone} </a>
          <br><a href="${member.website.replace('https://', 'www.')}">${member.website.replace('https://', 'www.')}</a>`;
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
