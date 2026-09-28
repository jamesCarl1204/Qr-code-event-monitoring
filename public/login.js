const registerAccount = document.getElementById('register-here')
const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('register-form')
const backTologinBtn = document.getElementById('back-to-login-btn')
const registerBtn = document.querySelector('#reg-submit')


const idErr = document.querySelector('#stud-id-err')
const emailErr = document.querySelector('#reg-email-err')
const passwordErr = document.querySelector('#reg-pword-err')
const confirmErr = document.querySelector('#confirm-err')
const loginErr = document.querySelector('#log-error')

registerAccount.addEventListener('click', (e) => {
    loginForm.style.display = "none";
    registerForm.style.display = "flex"
})

backTologinBtn.addEventListener('click', (e) => {
    registerForm.style.display = "none"
    loginForm.style.display = "flex"
})

registerForm.addEventListener('submit', async (e) => {
    
    e.preventDefault() 

    const studentId = document.querySelector("#student-id").value
    const name = document.querySelector("#reg-name").value
    const middleName = document.querySelector("#reg-middlename").value
    const lastName = document.querySelector("#reg-lname").value
    const email = document.querySelector("#reg-email").value
    const password= document.querySelector("#reg-password").value
    const confirmPassword= document.querySelector("#reg-confirm").value
    
    try {
        
    const response =  await fetch('/register', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            studentId: studentId,
            name: name,
            middleName: middleName,
            lastName: lastName,
            email: email,
            password:password,
            confirmPassword: confirmPassword
        })
    })
    const data = await response.json()

        idErr.textContent = '';
        emailErr.textContent = '';
        passwordErr.textContent = '';
        confirmErr.textContent = ''
    if(data.errors) {

        data.errors.forEach(err => {
            if(err.path === 'studentId') idErr.textContent = err.msg
            if(err.path === 'email') emailErr.textContent = err.msg
            if(err.path === 'password') passwordErr.textContent =err.msg
            if(err.path === 'confirmPassword') confirmErr.textContent = err.msg

        })
    }
    
} catch(err) {
    console.log(err);
   
}
        
})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.querySelector('#login-email').value
    const password = document.querySelector('#login-password').value

    const response = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email: email, password: password})
    })

    const data = await response.json()

    if(!data.success) {
       loginErr.textContent = data.msg
       return
    } else {
        window.location.href = data.redirect
    }
    

})
