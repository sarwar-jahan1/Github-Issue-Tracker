function login(){
    const userName=document.getElementById('username').value;
    const password=document.getElementById('password').value;
    if(userName==='admin' && password==='admin123'){
        location.href = "index.html";
    }else{
        alert('Invalid username or password');
    }
}