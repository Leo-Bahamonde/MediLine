document.getElementById("icon-menu").addEventListener("click", mostrar_menu);

function mostrar_menu(){
    document.getElementById("move-content").classList.toggle('move-container-all');
    document.getElementById("show-menu").classList.toggle('show-lateral');
};     


/* BOTONES */

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const loginCheck = user =>{
  if(user){
    loggedInLinks.forEach(link => link.style.display = "block");
    loggedOutLinks.forEach(link => link.style.display = "none");
  }else{
    loggedInLinks.forEach(link => link.style.display = "none");
    loggedOutLinks.forEach(link => link.style.display = "block");
  }
}

/*FIN BOTONES */

/* REGISTRAR USUARIO */
const sinupForm = document.getElementById("sinup-form");

sinupForm.addEventListener("submit", e=>{
    e.preventDefault();

    const email= document.getElementById("singup-email").value;
    const password= document.getElementById("singup-password").value;

   auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredential =>{
            sinupForm.reset();
            $('#singupModal').modal('hide')
            console.log("Registrado exitosamente");
        })
})
/* FIN REGISTRAR USUARIO */

/*INICIAR SESION */
const singinForm = document.getElementById("login-form");

singinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email= document.getElementById("login-email").value;
    const password= document.getElementById("login-password").value;

    auth
         .signInWithEmailAndPassword(email,password)
         .then(userCredential =>{

             singinForm.reset();

             $('#singinModal').modal('hide')
    });
});
/*FIN INICIAR SESION */

/* CERRAR SESION */

const logout = document.getElementById("logout");
logout.addEventListener("click", (e) =>{
    e.preventDefault();
    auth.signOut().then(()=>{
    });
});
/* FIN CERRAR SESION */

// Posts
const postList = document.querySelector('.posts');
const setupPosts = data => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const post = doc.data();
      const p = `
      <p class=''>
        <h5>${post.title}</h5>
        <p>${post.otroCampo}</p>
      </p>
    `;
      html += p;
    })
    postList.innerHTML = html;
  } else {
    postList.innerHTML = '<h4> Registrate o inicia sesion para ver el contenido</h4>';
  }
};


//lista de cambios 
auth.onAuthStateChanged(user => {
    if (user) {
      console.log("Te inisiaste correctamente");
      fs.collection("posts")
        .get()
        .then((snapshot) => {
          setupPosts(snapshot.docs);
           loginCheck(user); 
        })
    } else {
      console.log("--Cerraste sesion-- Registrate o inicia sesion para ver el contenido");
      setupPosts([]);
       loginCheck(user); 
    }
  });

  /* INICIO SESION CON GOOGLE */

const googleBoton = document.getElementById("googleLogin");
googleBoton.addEventListener("click", e =>{
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
  .then(result =>{
    console.log("Exito al iniciar sesion con Google");

    signupForm.reset();

    $('·#signinModal').modal('hide')
  })
  .catch(err =>{
    console.log(err);
  })
}
) 
  /*FIN INICIO SESION CON GOOGLE */

   const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", e => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
  .then(result => {
    console.log("Inicio con Google exitoso");
    //cleaner
    singinForm.reset();
    //clese the modal
    $('#singinModal').modal('hide')
    
  })
  .catch(err => {
    console.log(err);
  })
});