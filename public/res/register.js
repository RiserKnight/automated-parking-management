const registerForm = document.getElementById("register-form");
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const regNo = document.getElementById("regNo").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const pass = document.getElementById("password").value;
    const cpass = document.getElementById("cpassword").value;
    if(pass!=cpass)alert("Password does not match");

    try {
        const res = await fetch('/register', { 
            method: 'POST', 
            body: JSON.stringify({ name,regNo,email,contact, pass}),
            headers: {'Content-Type': 'application/json'}
          });
          const data = await res.json();
          if(data.code=="201")
          {
            alert("Registration Successful");
            location.assign('/');
          }
          else if(data.code=="200")alert("Email Already Exists");
          else alert("Internal Server Error");
    } catch (error) {
        console.log(error);
    }
  });