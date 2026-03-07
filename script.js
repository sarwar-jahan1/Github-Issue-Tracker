// Login(index) page
function login(){
    const userName=document.getElementById('username').value;
    const password=document.getElementById('password').value;
    if(userName==='admin' && password==='admin123'){
        window.location.href = "home.html";
    }else{
        alert('Invalid username or password');
    }
}

// Home Page
const allButton = document.getElementById('all');
const openButton = document.getElementById('open');
const closedButton = document.getElementById('closed');
const cardsContainer = document.getElementById('cardsContainer');

let allIssues = [];

allButton.addEventListener("click", () => {
    displayCards(allIssues);
});

openButton.addEventListener("click", () => {
    const openIssues = allIssues.filter(issue => issue.status === "open");
    displayCards(openIssues);
});

closedButton.addEventListener("click", () => {
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    displayCards(closedIssues);
});


async function loadCards() {

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allIssues = data.data;
    displayCards(allIssues);
}


function displayCards(issues) {

    cardsContainer.innerHTML = "";

    issues.forEach(issue => {

        const card = document.createElement("div");

        let priorityColor = "";

        if (issue.priority === "high") {
            priorityColor = "text-red-500 bg-red-100";
        }
        else if (issue.priority === "low") {
            priorityColor = "text-gray-600 bg-gray-100";
        }
        else {
            priorityColor = "text-[#F59E0B] bg-[#FFF6D1]";
        }
        // Status color

        let borderColor="";

        if(issue.status==='open'){
            borderColor="border-green-500";
        }else{
            borderColor="border-purple-500";
        }

        card.className = `bg-white rounded-lg shadow border-t-4 ${borderColor}`;

        card.innerHTML = `
        <div class="p-5 flex-1">

            <div class="flex justify-end mb-3">
                <span class="${priorityColor} text-xs px-3 py-1 rounded-full font-semibold">
                    ${issue.priority}
                </span>
            </div>

            <h3 class="text-lg font-semibold text-gray-800 mb-2">
                ${issue.title}
            </h3>

            <p class="text-gray-500 text-sm mb-4 line-clamp-2">
                ${issue.description}
            </p>

            <div class="flex gap-2 mb-4">

                <span class="border bg-red-200 border-red-300 text-red-500 px-3 py-1 text-xs rounded-full">
                    <i class="fa-solid fa-bug"></i>
                    BUG
                </span>

                <span class="border bg-yellow-100 border-yellow-400 text-yellow-600 px-3 py-1 text-xs rounded-full">
                    <i class="fa-regular fa-life-ring"></i>
                    HELP WANTED
                </span>

            </div>

        </div>

        <div class="border-t px-5 py-3 text-sm text-gray-500">
            <p>#${issue.id} by ${issue.author}</p>
            <p>${issue.updatedAt}</p>
        </div>
        `;
        cardsContainer.appendChild(card);
    });
}
loadCards();