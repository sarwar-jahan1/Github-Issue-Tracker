// Login page
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

const allButton=document.getElementById('all');
const cardsContainer=document.getElementById('cardsContainer');

allButton.addEventListener("click", loadCards);

async function loadCards(){
    cardsContainer.innerHTML = " ";

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayCards(data.data);
}

function displayCards(issues){

    issues.forEach(issue => {
    const card = document.createElement("div");
    let borderColor="";

    let priorityColor="";

    if(issue.priority==='high'){
        priorityColor="text-red-500";
        priorityColor="bg-red-100";
    }else if(issue.priority==='low'){
        priorityColor="text-gray-600";
        priorityColor="bg-gray-100";
    }
    else{
        priorityColor="text-[#F59E0B]";
        priorityColor="bg-[#FFF6D1]";
    }

    if(issue.status==='open'){
        borderColor="border-green-500";
    }else{
        borderColor="border-purple-500";
    }

    card.className =`bg-white rounded-lg shadow border-t-4 ${borderColor}`;
    card.innerHTML = `
    <div class="p-5 flex-1">
                    <div class="flex justify-end mb-3">
                        <span class=" ${priorityColor} text-xs px-3 py-1 rounded-full font-semibold">
                            ${issue.priority}
                        </span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2 ">
                        ${issue.title}
                    </h3>

                    <p class="text-gray-500 text-sm mb-4 line-clamp-2">${issue.description}</p>

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

                <div class=" border-t px-5 py-3 text-sm text-gray-500 ">
                    <p>#${issue.id} by ${issue.author}</p>
                    <p>${issue.updatedAt}</p>
                </div>

    `;

cardsContainer.appendChild(card);

});

}
loadCards();