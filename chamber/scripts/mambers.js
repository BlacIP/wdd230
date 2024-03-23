document.addEventListener("DOMContentLoaded", function() {
    const cardViewBtn = document.getElementById("cardViewBtn");
    const listViewBtn = document.getElementById("listViewBtn");
    const membersContainer = document.getElementById("membersContainer");
    const baseURL = "https://blacip.github.io/wdd230/";
    const linksURL = "https://blacip.github.io/wdd230/chamber/data/members.json";
  
    let isCardView = true;
  
    // Function to toggle between card and list view
    function toggleView() {
      isCardView = !isCardView;
      renderMembers();
    }
  
    // Event listeners for view switch buttons
    cardViewBtn.addEventListener("click", toggleView);
    listViewBtn.addEventListener("click", toggleView);
  
    // Fetch members data from JSON
    function fetchMembers() {
      return fetch(linksURL)
        .then(response => response.json());
    }
  
    // Function to render members based on current view
    function renderMembers() {
      fetchMembers().then(data => {
        // Clear existing content
        membersContainer.innerHTML = "";
  
        // Loop through members data
        data.members.forEach(member => {
          if (isCardView) {
            // Create member card
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");
  
            // Populate member card with data
            memberCard.innerHTML = `
              <h2>${member.name}</h2>
              <p><strong>Address:</strong> ${member.address}</p>
              <p><strong>Phone:</strong> ${member.phone}</p>
              <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
              <img src="${baseURL}images/${member.image}" alt="${member.name} Logo">
              <p><strong>Membership Level:</strong> ${member.membership_level}</p>
              <p>${member.other_information}</p>
            `;
  
            // Append member card to container
            membersContainer.appendChild(memberCard);
          } else {
            // Create line item list
            const memberListItem = document.createElement("li");
            memberListItem.innerHTML = `
              <strong>${member.name}</strong> - ${member.address}, Phone: ${member.phone}, Website: <a href="${member.website}" target="_blank">${member.website}</a>, Membership Level: ${member.membership_level}
            `;
  
            // Append member line item to container
            membersContainer.appendChild(memberListItem);
          }
        });
      })
      .catch(error => console.error("Error fetching members data:", error));
    }
  
    // Initial render
    renderMembers();
  });
  