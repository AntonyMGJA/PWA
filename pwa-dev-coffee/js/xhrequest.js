const container = document.querySelector("#container");

const showUsers = () => {
  let output = "";
  const request = new XMLHttpRequest();
  
  request.open("GET", "https://reqres.in/api/users", true);

  // Cuando la solicitud esté completa y exitosa
  request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
          const respObj = JSON.parse(request.responseText); // Parsear el JSON
          const users = respObj.data; // Acceder a la propiedad 'data'

          users.forEach(({ first_name, avatar, last_name, email }) => {
              output += `
                  <div class="card">
                      <img class="card--avatar" src="${avatar}" alt="Avatar of ${first_name}" />
                      <h1 class="card--title">${first_name} ${last_name}</h1>
                      <p class="card--email">${email}</p>
                      <a class="card--link" href="#">Contact</a>
                  </div>
              `;
          });

          // Insertar el contenido generado en el contenedor
          container.innerHTML = output;
      } else {
          console.error("Error al obtener los usuarios.");
      }
  };

  // Manejo de errores de conexión
  request.onerror = () => {
      console.error("Ocurrió un error de conexión.");
  };

  // Enviar la solicitud
  request.send();
};

document.addEventListener("DOMContentLoaded", showUsers);

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