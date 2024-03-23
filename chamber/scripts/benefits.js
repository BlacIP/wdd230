document.addEventListener("DOMContentLoaded", function() {
  // Benefits data for each membership level
  const benefitsData = {
    NP: {
      benefits: ["Special events", "Training opportunities", "Event discounts"],
      costImplication: "No cost for NP Membership."
    },
    Bronze: {
      benefits: ["Chamber representation with the Government", "Invitation to exclusive CEO Roundtable events", 
      "10% discount on 30-days banner Ad", "Participation in International Trade Fair", "Display of Company logo on Chamber website",
      "LCCI Loyalty card- discount on a range of selected merchant services"],
      costImplication: "Cost implication- N320,000 for initial registration and N200,000 for subsequent annual subscription."
    },
    Silver: {
      benefits: ["Chamber representation with the Government", "Invitation to exclusive CEO Roundtable events",
       "10% discount on 30-days banner Ad", "Participation in International Trade Fair", 
       "Display of Company logo on Chamber website", "LCCI Loyalty card- discount on a range of selected merchant services"],
      costImplication: "Cost implication- N515,000 for initial registration and N300,000 for subsequent annual subscription."
    },
    Gold: { 
      benefits: ["Accessibility to researched industry information relevant to the specific area of business.",
     "Access to partners for investment opportunities across economic sectors.",
      "Opportunity to facilitate trade dialogues and enhanced advocacy on specific issues relating to the specific industry.",
       "Advocacy for structural input to help shape government policy direction as relates to industry.",
      "Access to network and associate within and beyond industry and market players.",
      "30% Discount on Facility Rentals (Exclusive of tax).", 
      "20% Discount on Training Courses (Group Discount).",
      "20% Advertisement (Newsletter and Website)",
      "Invitation to RoundTable Business Events.",
      "Display of logos on Chamber’s website.",
      "B2B networking with foreign delegates.",
      "10% Discount at the Lagos International trade Fair (LITF)"],
      costImplication: "Cost implication - N2,000,000 for initial registration and subsequent annual subscription."
 
  }
  };

  function updateBenefits() {
    const membershipLevel = document.getElementById("membershipLevel").value;
    const benefitsContainer = document.getElementById("benefitsContainer");
    const selectedLevelData = benefitsData[membershipLevel];
  
    // Hide benefits container if no membership level is selected
    if (!selectedLevelData) {
      benefitsContainer.style.display = "none";
      return; 
    }
  
    // Clear previous benefits
    benefitsContainer.innerHTML = "";
  
    // Display benefits
    const benefitsTitle = document.createElement("h2");
    benefitsTitle.textContent = `${membershipLevel} Membership Benefits`; 
    benefitsContainer.appendChild(benefitsTitle);
  
    const ul = document.createElement("ul");
    selectedLevelData.benefits.forEach(benefit => {
      const li = document.createElement("li");
      li.textContent = benefit;
      ul.appendChild(li);
    });
    benefitsContainer.appendChild(ul);
  
    // Add cost implication at the end
    const costImplication = document.createElement("p");
    costImplication.textContent = selectedLevelData.costImplication;
    costImplication.classList.add("cost-implication");
    benefitsContainer.appendChild(costImplication);
  
    // Show benefits container
    benefitsContainer.style.display = "block";
  }
  


  // Event listener to update benefits when membership level changes
  document.getElementById("membershipLevel").addEventListener("change", updateBenefits);

  // Initial update of benefits
  updateBenefits();
});


function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');

  if (emailInput.validity.valid) {
      emailError.style.display = 'none';
  } else {
      emailError.style.display = 'inline';
  }
}

    // Load the Lottie animation
    var animation = bodymovin.loadAnimation({
        container: document.getElementById('lottieAnimation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'images/success.json' 
    });


// Set the value of the hidden input field to the current date/time in milliseconds
document.addEventListener("DOMContentLoaded", function() {
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    timestampInput.value = Date.now();
  }
});
