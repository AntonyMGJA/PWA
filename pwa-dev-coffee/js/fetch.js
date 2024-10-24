const container = document.querySelector("#container");

const showBlog = () => {
  let output = "";
  fetch('https://reqres.in/api/users')
  .then(resp => resp.json()) // Transformar la respuesta en JSON
  .then(resp => { 
      const users = resp.data; // Acceder a los datos de los usuarios
      
      users.forEach(({ first_name, avatar, last_name, email }) => {
          output += `
              <div class="card">
                  <img class="card--avatar" src="${avatar}" alt="Avatar of ${first_name}" />
                  <h2 class="card--title">${first_name} ${last_name}</h2>
                  <p class="card--email">${email}</p>
                  <a class="card--link" href="#">Contact</a>
              </div>
          `;
      });
      
      container.innerHTML = output; // Insertar el contenido generado en el contenedor
  })
  .catch((e) => console.error("Error fetching users:", e)); // Manejo de errores
};

document.addEventListener("DOMContentLoaded", showBlog);

//if ("serviceWorker" in navigator) {
 // window.addEventListener("load", function() {
  //  navigator.serviceWorker
    //  .register("http://localhost/serviceWorker.js")
     // .then(res => console.log("service worker registered"))
     // .catch(err => console.log("service worker not registered", err));
 // });
//}
if ("serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker
    .register("/serviceWorker.js")
    .then(function (registration) {
      console.log("Service worker registration succeeded:", registration);
    })
    .catch(function (error) {
      console.log("Service worker registration failed:", error);
    });
} else {
  console.log("Service workers are not supported.");
}