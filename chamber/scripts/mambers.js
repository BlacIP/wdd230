document.addEventListener("DOMContentLoaded", function() {
    const gridViewContainer = document.getElementById("gridViewContainer");
    const listViewContainer = document.getElementById("listViewContainer");
    const gridViewBtn = document.getElementById("grid-view");
    const tileViewBtn = document.getElementById("tile-view");
    const baseURL = "https://blacip.github.io/wdd230/";
    const linksURL = "https://blacip.github.io/wdd230/chamber/data/members.json";
  
    let isCardView = true;
  
    // Function to toggle between card and list view
    function toggleView() {
      isCardView = !isCardView;
      renderMembers();
    }
  
    // Event listener for view switch dropdown items
    gridViewBtn.addEventListener("click", () => {
      isCardView = true;
      renderMembers();
      closeDropdown();
    });
  
    tileViewBtn.addEventListener("click", () => {
      isCardView = false;
      renderMembers();
      closeDropdown();
    });

    // Function to close the dropdown menu
    function closeDropdown() {
      document.getElementById("dropdown-content").classList.remove("show");
    }

    // Event listener to close dropdown when clicking outside of it
    document.body.addEventListener("click", function(event) {
      if (!event.target.matches('.dropbtn')) {
        closeDropdown();
      }
    });
  
    // Fetch members data from JSON
    function fetchMembers() {
      return fetch(linksURL)
        .then(response => response.json());
    }
  
    // Function to render members based on current view
    function renderMembers() {
      fetchMembers().then(data => {
        // Clear existing content
        gridViewContainer.innerHTML = "";
        listViewContainer.innerHTML = "";
  
        // Loop through members data
        data.members.forEach(member => {
          if (isCardView) {
            renderMemberCard(member);
          } else {
            renderMemberListItem(member);
          }
        });
      })
      .catch(error => console.error("Error fetching members data:", error));
    }
  
    // Function to render member card in grid view
    function renderMemberCard(member) {
      const memberCard = document.createElement("div");
      memberCard.classList.add("member-card");
  
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("image-container");
      const image = document.createElement("img");
      image.src = `${baseURL}${member.image}`;
      image.alt = `${member.name} Logo`;
      image.classList.add("member-image");
      imageDiv.appendChild(image);
  
      memberCard.innerHTML = `
        <h2>${member.name}</h2>
        ${imageDiv.outerHTML}
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${member.membership_level}</p>
        <p>${member.other_information}</p>
      `;
  
      gridViewContainer.appendChild(memberCard);
    }
  
    // Function to render member list item in list view
    function renderMemberListItem(member) {
      const memberListItem = document.createElement("div");
      memberListItem.classList.add("list-item");
  
      const imageInfo = document.createElement("div");
      imageInfo.classList.add("image-info");
  
      const memberInfo = document.createElement("div");
      memberInfo.classList.add("member-info");
  
      memberInfo.innerHTML = `
        <strong>${member.name}</strong> <br> ${member.address}, Phone: ${member.phone}, Website: <a href="${member.website}" target="_blank">${member.website}</a>, <br> <strong>Membership Level:</strong> ${member.membership_level}
      `;
  
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      const image = document.createElement("img");
      image.src = `${baseURL}${member.image}`;
      image.alt = `${member.name} Logo`;
      image.classList.add("member-logo");
      imageContainer.appendChild(image);
  
      const addInfoContainer = document.createElement("div");
      addInfoContainer.classList.add("add-info");
      addInfoContainer.textContent = member.other_information; // Assuming there's a property named "additional_info" in the member object
  
      imageInfo.appendChild(memberInfo);
      imageInfo.appendChild(imageContainer);
  
      memberListItem.appendChild(imageInfo);
      memberListItem.appendChild(addInfoContainer);
  
      listViewContainer.appendChild(memberListItem);
    }
  
    // Initial render
    renderMembers();
});

