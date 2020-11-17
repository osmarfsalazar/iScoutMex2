// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyCY8ZE1LzKI7FXSwDtEj43mttKNpuhpwOY",
    authDomain: "gestor-de-datos-de-futbol-mx.firebaseapp.com",
    databaseURL: "https://gestor-de-datos-de-futbol-mx.firebaseio.com",
    projectId: "gestor-de-datos-de-futbol-mx",
    storageBucket: "gestor-de-datos-de-futbol-mx.appspot.com",
    messagingSenderId: "822170602705",
    appId: "1:822170602705:web:30a2496937645f396649f0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

//Login google
$('#loginG').click(function () {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {

        console.log(result.user);
        //  $('#root').append("<img src='"+result.user.photoURL+"'/>")
        //   $('#root').append("<img stc='"+)
        guardarDatos(result.user);
        console.log('Se pudo acceder');
        window.location.href='perfil.html'

    });
})

// Login with Facebook
$('#loginF').click(function () {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log(result);
        guardarDatos(result.user);
        console.log('Se pudo acceder');
        window.location.href='scout.html'
    })
        .catch(err => {
            console.log(err);
        })
})

// Login correo
$('#ingresar').click(function () {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {
            console.log('Credenciales correctas, ¡bienvenido!');
            window.location.href='perfil.html'
        })
        .catch(function (error) {
            console.log(error);
            alert(error.message);
        });
})

// Registro correo
$('#registrarse').click(function () {
    const email = document.getElementById("signup-email-reg").value;
    const password = document.getElementById("signup-password-reg").value;
    // const rol = document.getElementById("signup-rol-reg").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (result) {
            let usuario = {
                uid: result.user.uid,
                nombre: result.user.email,
                email: result.user.email,
                // Rol:rol,
                img: "https://graph.facebook.com/3498960506864413/picture",
            }
            db.collection("users").doc(result.user.uid).set(usuario)
            console.log('Usuario nuevo registrado');
            alert('Usuario nuevo registrado');
        })
        .catch(function (error) {
            console.error(error)
            alert(error.message);
        });
})

$('#logout').click(function () {
// function cerrar(){
    firebase.auth().signOut()
        .then(function(){
            console.log('Salir');
            alert('Salir');
        })
        .catch(function(error){
            console.log(error);
        });
})

//Revisamos si ya se inició sesión
/*
$('#ingresar').click(function (){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href='iniciaSesion.html'
        } else {
            // User is signed out.
            // ...
        }
    });
})
* */
//bd
function guardarDatos(user) {
    let usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        img: user.photoURL,
        // Rol: rol
    }
    db.collection("users").doc(user.uid).set(usuario)
}

//update realtime
db.collection("users").onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        $('#root').append("<img src='" + doc.data().img + "' alt='imagen usuario'/>")
    });
})



