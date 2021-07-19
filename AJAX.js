// // Tareas: Homework AJAX --
// // Escribe codigo en los archivos index.html y index.js para que la pagina tenga las siguientes funcionalidades:

// // Utiliza el evento click en un boton para hacer que al hacer click en el mismo aparezca en el DOM una lista
//  con todos los amigos que el servidor nos devolvera al hacer un GET a la ruta http://localhost:5000/amigos

// // Un campo de busqueda (input) que reciba el id de un amigo y un boton "buscar".
// Al hacer click en el boton, buscaremos el amigo que tiene ese id en el servidor, y lo mostraremos en el DOM.
//  Para conseguir los datos de un amigo en particular del servidor, puedes hacer un GET nuestro servidor
//   concatenando el id del amigo que queremos encontrar, Por ej: http://localhost:5000/amigos/1 le pediria
//   al servidor el amigo con id = 1

// // Un input que reciba el id de un amigo y un boton "borrar". Al hacer click en el boton, borraremos el
//  amigo del servidor haciendo un DELETE a nuestro servidor, concatenando el id del usuario que queremos borrar.
//  Por ej: http://localhost:5000/amigos/2 le pediria al servidor el amigo con id = 2

// // Recordatorio
// // Para manipular un elemento de html en con jquery debes usar $('#id-elemento') agregandole como
// arguemnto el id del elemento que quieres manipular



var showFriends = function () {
    // Muestro la lista de amigos
    $.get("http://localhost:5000/amigos/", function (data) {
      // VANILLA JAVASCRIPT      -------> Es hablar de JavaScript sin ningún tipo de framework o librería adicional
      // console.log(data);
      $("#lista").empty();          // Vacia la lista antes de llenarla
      data.forEach((amigo) => {
        $("#lista").append(
          "<li>" +
            amigo.name +
            '  <button onclick="deleteFriend(' +
            amigo.id +
            ')">X</button></li>'
        );
      });
    });
  };

  $("#boton").click(showFriends); // GET AJAX
  // console.log("Click en buscar")

  $("#search").click(function () {
    // console.log("Click en buscar");
    var id = $("#input").val(); // Guardo en ID lo que escriben en la casilla de buscar.
    // console.log(id); // muestro lo que escribieron en la casilla buscar
    if (id) {
      // Solo si ingreso un ID entra en el request
      $.get("http://localhost:5000/amigos/" + id, function (data) {
        $("#amigo").text("El amigo " + id + " es " + data.name + ".");
        $("#input").val("");
      });
    } else {
      alert("Debe ingresar un id");    // Aparece el alert si no ingreso un ID.
      $("#amigo").text("");
    }
  });

  var deleteFriend = function (idCruz) {
    // console.log("Click en delete")
    var id;
    if (typeof idCruz === "number") {
      id = idCruz;
    } else {
      id = $("#inputDelete").val();
    }
    if (id) {
      $.ajax({
        url: "http://localhost:5000/amigos/" + id,
        type: "DELETE",
        success: function () {
          // Do something with the result
          $("#sucess").text("El amigo " + id + " fue borrado");
          $("#inputDelete").val("");
          showFriends(); // Llamo la funcion que muestra la lista de amigos.
        },
      });
    } else {
      alert("Debe ingresar un id"); // Aparece el alert si no ingreso un ID.
    }
  };

  $("#delete").click(deleteFriend);
