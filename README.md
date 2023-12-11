# reactForm
 
## POSSIBLE TESTS

* Todo se renderiza ✅
* Al (focus) de cada input mostrar error de required ✅
* todo input sea minuscula o majuscula se transforma a mayuscula ✅
* Al escribir en input id ha de empezar por un numero ✅
* Al escribir en cualquier input menos id ha de empezar por una letra ✅
* user input max 10 digits ✅
* al primer renderizado, input Country innerhtml must be set country ✅
* el input user no puede contener el input name ✅
* al click a boton clear, limpiar todos los imputs ✅
* submit deshabilitado si algun campo falla ✅
* submit y todo bien, pantalla muestra info recollida ✅
* submit deshabilitado si algun campo falla ❌ (Preguntar si minim de caracterrs en cada input)

### MANUAL TESTS
* al cambiar contry, criterios de error de id cambia ✅

### DESCRIPCION INICIAL


  This app will show a Registry Form for the user to complete.
  The form is formed by, and referenced in this document as:

  - 1 "user" input field
  - 1 "name" input field
  - 1 "surname" input field
  - 1 "country" select component
  - 1 "user_id" (shown with an "ID" label) input field
  - 1 "submit" button which will send input data (henceforth referenced as 'data') previously validated to the server
    - 1 "Spain" button which will change the value from the "submit" input
    - 1 "Korea" button which will change the value from the "submit" input
  - 1 "clear" button which will erase the 'data' written by the user

  Each field will be allowed to the user to be written with romanized characters.