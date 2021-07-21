// La función traverseDomAndCollectElements es usada para recorrer (navegar a través)
// el arbol del DOM completo y recolectar los elementos especificos deseados por el usuario.
// Una manera natural de escribir estas funciones es usando recursión.
// Toma dos parametros: matchFunc y startEl.

// 1) startEl: es el elemento del arbol del DOM donde la busqueda comenzará.
// Si startEl es undefined, la busqueda comienza en document.body.

// 2) matchFunc: la función generada por nuestro matchFunctionMaker..
// Testea si un elemento dado matchea con el selector o no,
// y por lo tanto si deberia ser recolectado o no.

var traverseDomAndCollectElements = function (matchFunc, startEl) {
    var resultSet = [];

    if (typeof startEl === "undefined") {
      startEl = document.body;
    }


    // Recorre el árbol del DOM y recolecta elementos que matcheen en resultSet(ARRAY)
    // usa matchFunc para identificar elementos que matcheen.

    // .children: Cada elemento en el DOM (incluyendo document.body) tienen una propiedad children que es
    // un array-like object de todos los children de ese elemento. Vas a necesitar esto mientras recorramos el arbol.

    // TU CÓDIGO AQUÍ
    if (!matchFunc) matchFunc = matchFunctionMaker;

    if (matchFunc(startEl)) resultSet.push(startEl);

    for (var i = 0; i < startEl.children.length; i++) {
      var result = traverseDomAndCollectElements(matchFunc, startEl.children[i]);

      resultSet = [...resultSet, ...result];       // <----------------- SPREAD OPERATOR
    }
    return resultSet;
  };

  // ---------------------------------------------------------------------------------------------------------------

  var selectorTypeMatcher = function (selector) {
    // Detecta y devuelve el tipo de selector.
    // devuelve uno de estos tipos: id, class, tag.class, tag.
    // selectorTypeMatcher(selector): esta función recibe un selector (ej: '#id'), y devolverá
    // un string con los distintos tipos de selectores ('id', 'class', etc) según el input.

    // tu código aquí
    if (selector[0] === "#") return "id"; // Si el primer caracter del selector es "#". Debería devolver 'id'.
    if (selector[0] === ".") return "class"; // Si el primer caracter del selector es ".". Debería devolver 'class'.
    for (var i = 0; i < selector.length; i++) {
      if (selector[i] === ".") return "tag.class";
    }
    return "tag";
  };

  // NOTA SOBRE LA FUNCIÓN MATCH ------------------------------------------------------------------------------------
  // recuerda, la función matchFunction devuelta toma un elemento como un
  // parametro y devuelve true/false dependiendo si el elemento
  // matchea el selector.

  // matchFunctionMaker(selector): esta función va a usar a la selectorTypeMatcher,
  // y en base a eso va a devolver una función que sirve para encontrar los elementos según el tipo de selector.
  // Por ejemplo, si el selector es de tipo clase, la función va a buscar en la propiedad class de los elementos.

  var matchFunctionMaker = function (selector) {
    const selectorType = selectorTypeMatcher(selector);
    let matchFunction;

    if (selectorType === "id") {
      //Concateno el '#' por que el.id me devuelve un string con el nombre del id.
      matchFunction = function (el) {
        return "#" + el.id === selector ? true : false;        // <-------------- OPERADOR TERNARIO
      };

    } else if (selectorType === "class") {
      matchFunction = function (el) {
        // Si tuviese + de 1 clase itero sobre el array classList y voy comparando.
        if (el.classList.length > 1) {
          for (let i = 0; i < el.classList.length; i++) {
            if ("." + el.classList[i] === selector) {
              return true;
            }
          }
        }
        // Si tiene una sola clase no entra al IF de arriba y simplemente compara.
        return "." + el.className === selector ? true : false;         // <------------ OPERADOR TERNARIO
      };

    } else if (selectorType === "tag.class") {
      matchFunction = function (el) {
        // Con split separo por punto, arr será un arreglo de la forma ['tag','class'].
        let arr = selector.split(".");

        // Pregunto si el TAG del elemento coincide con la posición 0 de arr.
        if (el.tagName.toLowerCase() === arr[0]) {
          // Pregunto si tiene mas de una clase.
          if (el.classList.length > 1) {
            for (let i = 0; i < el.classList.length; i++) {
              // Me fijo si alguna clase matchea con la posición 1 de arr.
              if (el.classList[i] === arr[1]) return true;
            }
          }
          // Si solo tiene una clase comparo.
          if (el.className === arr[1]) return true;
        }
     // Si el tag no coincide directamente retorno false.
        return false;
      };

    } else if (selectorType === "tag") {
      matchFunction = function (el) {
        return el.tagName.toLowerCase() === selector.toLowerCase() ? true : false;  // <----- OPERADOR TERNARIO
      };
    }
    return matchFunction;
  };



  var $ = function (selector) {
    var elements;
    var selectorMatchFunc = matchFunctionMaker(selector);
    elements = traverseDomAndCollectElements(selectorMatchFunc);
    return elements;
  };
