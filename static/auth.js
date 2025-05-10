let registerForm = document.querySelector(".register form")

registerForm?.addEventListener("submit", (e)=>{
    e.preventDefault()
    let data = new FormData(e.target)
    let login = data.get("login")
    let password = data.get("password")
    let passwordR = data.get("passwordR")
    if(password != passwordR){
        alert("Ty typiy paroly ne odnakovi")
        return
    }
    if(password.length < 2 || login.lenth < 2){
        alert("login or parrol too korotki, write bilshi")
        return
    }
    fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({login, password})
    }).then((res)=>res.json()).then(res=>{
        window.location = "/login"
    })
})
let loginForm = document.querySelector(".login form")

loginForm?.addEventListener("submit", (e)=>{
    e.preventDefault()
    let data = new FormData(e.target)
    let login = data.get("login")
    let password = data.get("password")
    if(password.length < 2 || login.lenth < 2){
        alert("login or parrol too korotki, write bilshi")
        return
    }
    fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({login, password})
    }).then((res)=>res.json()).then(res=>{
        if(res.status == "ok"){
            document.cookie = "token=" + res.token
            window.location = "/"  
        }
    })
})