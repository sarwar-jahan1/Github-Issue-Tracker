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
const loadingSpinner = document.getElementById("loadingSpinner");
const cardsContainer = document.getElementById("cardsContainer");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const allButton = document.getElementById("all");
const openButton = document.getElementById("open");
const closedButton = document.getElementById("closed");

const issueCount = document.getElementById("issueCount");

let allIssues = [];
let currentFilter = "all";

const buttons = [allButton, openButton, closedButton];


// loading
function showLoading(){
    loadingSpinner.classList.remove("hidden");
    cardsContainer.innerHTML = "";
}

function hideLoading(){
    loadingSpinner.classList.add("hidden");
}


// active button
function setActiveButton(activeBtn){
    buttons.forEach(btn=>{
        btn.classList.remove("bg-blue-600","text-white");
    });

    activeBtn.classList.add("bg-blue-600","text-white");
}


// search
searchBtn.addEventListener("click",()=>{
    applyFilters();
});

searchInput.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        applyFilters();
    }
});


// filter buttons
allButton.addEventListener("click",()=>{
    currentFilter="all";
    setActiveButton(allButton);
    applyFilters();
});

openButton.addEventListener("click",()=>{
    currentFilter="open";
    setActiveButton(openButton);
    applyFilters();
});

closedButton.addEventListener("click",()=>{
    currentFilter="closed";
    setActiveButton(closedButton);
    applyFilters();
});


// filter logic
function applyFilters(){

    showLoading();

    let filtered=[...allIssues];

    if(currentFilter==="open"){
        filtered=filtered.filter(issue=>issue.status==="open");
    }

    if(currentFilter==="closed"){
        filtered=filtered.filter(issue=>issue.status==="closed");
    }

    const searchText=searchInput.value.toLowerCase();

    if(searchText){
        filtered=filtered.filter(issue =>
            issue.title.toLowerCase().includes(searchText) ||
            issue.description.toLowerCase().includes(searchText)
        );
    }

    displayCards(filtered);

    hideLoading();
}


// fetch issues
async function loadCards(){

    showLoading();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allIssues = data.data;

    displayCards(allIssues);

    hideLoading();
    setActiveButton(allButton);
}


// open modal
function openIssueModal(issue){

const modalContent = document.getElementById("modalContent");

let priorityColor="";

if(issue.priority==="high"){
    priorityColor="bg-red-500 text-white";
}
else if(issue.priority==="medium"){
    priorityColor="bg-yellow-500 text-white";
}
else{
    priorityColor="bg-gray-500 text-white";
}

let statusColor="";

if(issue.status==="open"){
    statusColor="bg-green-100 text-green-700";
}
else{
    statusColor="bg-purple-100 text-purple-700";
}

modalContent.innerHTML = `
<h3 class="text-2xl font-bold mb-2">${issue.title}</h3>

<div class="flex items-center gap-3 text-sm text-gray-600 mb-4">

<span class="${statusColor} px-3 py-1 rounded-full font-medium">
${issue.status}
</span>

<span>•</span>

<p>Opened by ${issue.author}</p>

<span>•</span>

<p>${issue.updatedAt}</p>

</div>

<div class="flex gap-3 mb-4">

<span class="border border-red-300 text-red-500 px-3 py-1 text-xs rounded-full">
<i class="fa-solid fa-bug"></i> BUG
</span>

<span class="border border-yellow-400 text-yellow-600 px-3 py-1 text-xs rounded-full">
<i class="fa-regular fa-life-ring"></i> HELP WANTED
</span>

</div>

<p class="text-gray-600 mb-6">
${issue.description}
</p>

<div class="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-6">

<div>
<p class="text-sm text-gray-500">Assignee:</p>
<p class="font-semibold">${issue.author}</p>
</div>

<div>
<p class="text-sm text-gray-500">Priority:</p>
<span class="${priorityColor} px-3 py-1 text-xs rounded-full">
${issue.priority}
</span>
</div>

</div>

<div class="flex justify-end">
<button onclick="issueModal.close()" class="btn btn-primary">
Close
</button>
</div>
`;

document.getElementById("issueModal").showModal();

}


// display cards
function displayCards(issues){

    cardsContainer.innerHTML="";

    issueCount.innerText = issues.length;

    issues.forEach(issue=>{

        const card=document.createElement("div");

        let priorityColor="";

        if(issue.priority==="high"){
            priorityColor="text-red-500 bg-red-100";
        }
        else if(issue.priority==="low"){
            priorityColor="text-gray-600 bg-gray-100";
        }
        else{
            priorityColor="text-[#F59E0B] bg-[#FFF6D1]";
        }

        let borderColor="";

        if(issue.status==="open"){
            borderColor="border-green-500";
        }
        else{
            borderColor="border-purple-500";
        }

        card.className=`bg-white rounded-lg shadow border-t-4 ${borderColor} flex flex-col cursor-pointer`;

        card.innerHTML=`
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
        card.addEventListener("click",()=>{
            openIssueModal(issue);
        });

        cardsContainer.appendChild(card);
    });

}

loadCards();