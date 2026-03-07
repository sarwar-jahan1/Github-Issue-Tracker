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

const issueCount = document.getElementById('issueCount');
const cardsContainer = document.getElementById('cardsContainer');

let allIssues = [];

const buttons = [allButton, openButton, closedButton];

function setActiveButton(activeBtn){
    buttons.forEach(btn=>{
        btn.classList.remove("bg-blue-600","text-white");
    });

    activeBtn.classList.add("bg-blue-600","text-white");
}

allButton.addEventListener("click", () => {
    setActiveButton(allButton);
    displayCards(allIssues);
});

openButton.addEventListener("click", () => {
    setActiveButton(openButton);

    const openIssues = allIssues.filter(issue => issue.status === "open");
    displayCards(openIssues);
});

closedButton.addEventListener("click", () => {
    setActiveButton(closedButton);

    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    displayCards(closedIssues);
});

async function loadCards() {

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allIssues = data.data;

    displayCards(allIssues);

    setActiveButton(allButton); 
}


function displayCards(issues) {

    cardsContainer.innerHTML = "";

    issueCount.innerText = issues.length;

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


        let borderColor = "";

        if(issue.status==="open"){
            borderColor="border-green-500";
        }else{
            borderColor="border-purple-500";
        }


        card.className = `bg-white rounded-lg shadow border-t-4 ${borderColor}`;

        card.innerHTML = `
    <div class="p-5 flex flex-col flex-1">

        <div class="flex justify-end mb-3">
            <span class="${priorityColor} text-xs px-3 py-1 rounded-full font-semibold">
                ${issue.priority}
            </span>
        </div>

        <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[56px]">
            ${issue.title}
        </h3>

        <p class="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
            ${issue.description}
        </p>

        <div class="flex gap-2 mb-4">
            <span class="border bg-red-200 border-red-300 text-red-500 px-3 py-1 text-xs rounded-full">
                <i class="fa-solid fa-bug"></i> BUG
            </span>

            <span class="border bg-yellow-100 border-yellow-400 text-yellow-600 px-3 py-1 text-xs rounded-full">
                <i class="fa-regular fa-life-ring"></i> HELP WANTED
            </span>
        </div>

    </div>

    <div class="border-t px-5 py-3 text-sm text-gray-500 mt-auto">
        <p>#${issue.id} by ${issue.author}</p>
        <p>${issue.updatedAt}</p>
    </div>
    `;

        cardsContainer.appendChild(card);
    });

}

loadCards();