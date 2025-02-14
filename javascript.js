document.addEventListener("DOMContentLoaded", () => {
    const skillForm = document.getElementById("skill-form");
    const skillList = document.getElementById("skill-list");

    function loadSkills() {
        const savedSkills = JSON.parse(localStorage.getItem("skills")) || [];
        skillList.innerHTML = "";
        savedSkills.forEach((skill, index) => {
            addSkillToList(skill, index);
        });
    }

    function addSkillToList(skill, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            ${skill.name} - ${skill.progress} 
            <button class="delete-btn" onclick="deleteSkill(${index})">X</button>
        `;
        skillList.appendChild(li);
    }

    skillForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const skillName = document.getElementById("skill").value;
        const progress = document.getElementById("progress").value;
        const careerGoal = document.getElementById("career-goal").value;
        const resources = document.getElementById("resources").value;

        const newSkill = { name: skillName, progress, careerGoal, resources };

        const savedSkills = JSON.parse(localStorage.getItem("skills")) || [];
        savedSkills.push(newSkill);
        localStorage.setItem("skills", JSON.stringify(savedSkills));

        addSkillToList(newSkill, savedSkills.length - 1);

        skillForm.reset();
    });

    window.deleteSkill = function (index) {
        let savedSkills = JSON.parse(localStorage.getItem("skills")) || [];
        savedSkills.splice(index, 1);
        localStorage.setItem("skills", JSON.stringify(savedSkills));
        loadSkills();
    };

    loadSkills();
});





document.addEventListener("DOMContentLoaded", () => {
    const skillCategory = document.getElementById("skill-category");
    const getGuidanceBtn = document.getElementById("get-guidance");
    const guidanceContainer = document.getElementById("guidance-container");

    // Structured Learning Paths
    const guidanceData = {
        technical: {
            title: "🚀 Technical Skills Guidance",
            beginner: "Start with basics: HTML, CSS, JavaScript.",
            intermediate: "Learn frameworks: React, Node.js, Python.",
            advanced: "Build projects & contribute to open source.",
            resources: [
                { name: "FreeCodeCamp", url: "https://www.freecodecamp.org/" },
                { name: "CS50 by Harvard", url: "https://cs50.harvard.edu/" }
            ],
            careerAdvice: "Gain experience through internships & coding challenges."
        },
        soft: {
            title: "🗣 Soft Skills Development",
            beginner: "Improve communication & teamwork.",
            intermediate: "Learn conflict resolution & leadership.",
            advanced: "Master public speaking & negotiation.",
            resources: [
                { name: "TED Talks", url: "https://www.ted.com/talks" },
                { name: "MindTools", url: "https://www.mindtools.com/" }
            ],
            careerAdvice: "Join leadership programs & practice speaking engagements."
        },
        life: {
            title: "🌱 Life Skills Enhancement",
            beginner: "Manage time effectively & build habits.",
            intermediate: "Develop financial literacy & resilience.",
            advanced: "Master self-discipline & strategic thinking.",
            resources: [
                { name: "LifeHack", url: "https://www.lifehack.org/" },
                { name: "Healthline", url: "https://www.healthline.com/nutrition" }
            ],
            careerAdvice: "Read personal development books & practice self-improvement."
        }
    };

    getGuidanceBtn.addEventListener("click", () => {
        const category = skillCategory.value;
        const guidance = guidanceData[category];

        // Generate Guidance HTML
        guidanceContainer.innerHTML = `
            <h4 class="guidance-title">${guidance.title}</h4>
            <ul class="guidance-list">
                <li><strong>Beginner:</strong> ${guidance.beginner}</li>
                <li><strong>Intermediate:</strong> ${guidance.intermediate}</li>
                <li><strong>Advanced:</strong> ${guidance.advanced}</li>
            </ul>
            <h4>📘 Learning Resources:</h4>
            <ul class="guidance-list">
                ${guidance.resources.map(resource => <li><a href="${resource.url}" target="_blank">${resource.name}</a></li>).join("")}
            </ul>
            <h4>💼 Career Advice:</h4>
            <p>${guidance.careerAdvice}</p>
        `;
    });
});
// Store poll results
let pollResults = {
    jobs: 0,
    mentalHealth: 0,
    education: 0,
    technology: 0
};

// Function to vote
function vote(option) {
    pollResults[option] += 1; // Increment count
    updatePollResults();
}

// Function to update results visually
function updatePollResults() {
    let totalVotes = Object.values(pollResults).reduce((a, b) => a + b, 0);

    for (let option in pollResults) {
        let percentage = totalVotes > 0 ? (pollResults[option] / totalVotes) * 100 : 0;
        document.getElementById(`bar-${option}`).style.width = percentage + "%";
        document.getElementById(`bar-${option}`).textContent = Math.round(percentage) + "%";
    }
}



// List of mentors with new details
const mentors = [
    { name: "Amit Sharma", bio: "Software Engineer at Google with 7+ years of experience.", img: "boy1.webp", category: "technical", availability: "available", rating: 4.8, sessions: 120, successRate: "95%" },
    { name: "Neha Verma", bio: "Public Speaking & Leadership Coach, TEDx Speaker.", img: "girl.jpg", category: "soft", availability: "busy", rating: 4.7, sessions: 80, successRate: "90%" },
    { name: "Rahul Singh", bio: "Life Coach & Personal Development Expert.", img: "boy1.webp", category: "life", availability: "available", rating: 4.9, sessions: 140, successRate: "97%" },
];

// Function to display mentors
function displayMentors(filteredMentors = mentors) {
    const mentorList = document.getElementById("mentorList");
    mentorList.innerHTML = "";

    filteredMentors.forEach(mentor => {
        const mentorCard = `
            <div class="mentor-card">
                <img src="${mentor.img}" alt="${mentor.name}">
                <h3>${mentor.name}</h3>
                <p class="mentor-bio">${mentor.bio}</p>
                <div class="mentor-stats">⭐ ${mentor.rating} | Sessions: ${mentor.sessions} | Success: ${mentor.successRate}</div>
                <div class="mentor-availability">${mentor.availability === "available" ? "✅ Available Now" : "⛔ Busy"}</div>
                <div class="mentor-buttons">
                    <button class="book-session" onclick="bookSession('${mentor.name}')">📅 Book Session</button>
                    <button class="chat-mentor" onclick="chatMentor('${mentor.name}')">💬 Chat</button>
                    <button class="apply-mentorship" onclick="applyMentorship('${mentor.name}')">📩 Apply</button>
                </div>
            </div>
        `;
        mentorList.innerHTML += mentorCard;
    });
}

// Filter function
function filterMentors() {
    const selectedCategory = document.getElementById("skillFilter").value;
    const selectedAvailability = document.getElementById("availabilityFilter").value;

    let filteredMentors = mentors;

    if (selectedCategory !== "all") {
        filteredMentors = filteredMentors.filter(mentor => mentor.category === selectedCategory);
    }
    if (selectedAvailability !== "all") {
        filteredMentors = filteredMentors.filter(mentor => mentor.availability === selectedAvailability);
    }

    displayMentors(filteredMentors);
}

// Load mentors on page load
displayMentors();


document.getElementById("customContactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents actual form submission

    const name = document.getElementById("customName").value.trim();
    const email = document.getElementById("customEmail").value.trim();
    const message = document.getElementById("customMessage").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("⚠ Please fill in all fields!");
        return;
    }

    if (!validateCustomEmail(email)) {
        alert("⚠ Please enter a valid email address!");
        return;
    }

    alert(`✅ Message Sent Successfully!
📝 Name: ${name}
📧 Email: ${email}
📩 Message: ${message}`);
    
    document.getElementById("customContactForm").reset(); // Clear form
});

// Email Validation
function validateCustomEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}