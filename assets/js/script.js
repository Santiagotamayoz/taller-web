const registeredUsers = [{userid: 1, username: "prueba1", password: "prueba1" }];
var gastos = [];
var user;
var userLoggedId;

function registerUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Expresiones regulares
  const usernameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  registeredUsers.forEach((e) => {
    if (username == e.username) {
      alert(
        "El usuario " +
          username +
          " ya existe en la base de datos intente registrase con otro."
      );
    } else {
      if (username && password) {
        if (!username.match(usernameRegex)) {
          alert("El nombre de usuario no es válido. Debe contener solo letras y espacios, con un máximo de 40 caracteres.");
        } else if (!password.match(passwordRegex)) {
          alert("La contraseña no es válida. Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.");
        } else {
          // Guarda los usuarios registrados en un array (esto debe ser mejorado con una base de datos)
          let lastUserId = registeredUsers[registeredUsers.length-1].userid
          registeredUsers.push({userid: lastUserId + 1 ,username: username, password: password });

          // Limpia los campos de registro
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";

          // Muestra el formulario de inicio de sesión
          document.getElementById("register-form").style.display = "none";
          document.getElementById("login-form").style.display = "block";
        }
      } else {
        alert("Por favor, complete todos los campos de registro.");
      }
    }
  });
}


function loginButtonClick() {
  // Muestra el formulario de inicio de sesión
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function loginUser() {
  const loginUsername = document.getElementById("login-username").value;
  const loginPassword = document.getElementById("login-password").value;

  // Verifica si el usuario y contraseña coinciden con los registrados
  user = registeredUsers.find(
    (u) => u.username === loginUsername && u.password === loginPassword
  );

  if (user) {
    document.getElementById("login-username").value = ""
    document.getElementById("login-password").value = ""
    // Muestra el control de gastos
    document.getElementById("login-form").style.display = "none";
    document.getElementById("menu-principal").style.display = "block";
  } else {
    alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    document.getElementById("login-username").value = ""
    document.getElementById("login-password").value = ""
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";

  }
}

function registrarGasto() {
  document.getElementById("menu-principal").style.display = "none";
  document.getElementById("menu-crear-gasto").style.display = "block";
}

function regresarMenuDesdeRegistroGastos() {
  document.getElementById("menu-principal").style.display = "block";
  document.getElementById("menu-crear-gasto").style.display = "none";
}

function registrarGastoButton() {
  const descripcion = document.getElementById("descripcion").value;
  const valor = document.getElementById("valor").value;
  const categoria = document.getElementById("categorias").value;
  userLoggedId = user.userid;

  gastos.push({userid: userLoggedId , descripcion: descripcion, valor: valor, categoria: categoria});
  document.getElementById("descripcion").value = ""
  document.getElementById("valor").value = ""
}

function listarGastos() {
  const tabla = document.querySelector("#menu-listar-gastos table tbody");
  tabla.innerHTML = '';
  document.getElementById("menu-principal").style.display = "none";
  document.getElementById("menu-listar-gastos").style.display = "block";

  let gastosFiltrados = gastos.filter((g) => g.userid == userLoggedId)
  console.log(gastos);

  gastosFiltrados.forEach((gasto) => {
    const fila = document.createElement("tr");

    const categoriaTD = document.createElement("td");
    categoriaTD.textContent = gasto.categoria;
    fila.appendChild(categoriaTD);

    const descripcionTD = document.createElement("td");
    descripcionTD.textContent = gasto.descripcion;
    fila.appendChild(descripcionTD);

    const valorTD = document.createElement("td");
    valorTD.textContent = gasto.valor;
    fila.appendChild(valorTD);
    tabla.appendChild(fila);
  });
}

let cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", cerrarSesionF);
function cerrarSesionF() {
document.getElementById("menu-principal").style.display = "none";
document.getElementById("register-form").style.display = "block";
}

let registrarNuevo = document.getElementById("registro-nuevo")
registrarNuevo.addEventListener("click",registrarNuevoF)
function registrarNuevoF(){
  document.getElementById("menu-listar-gastos").style.display = "none";
  document.getElementById("menu-principal").style.display = "block"
}