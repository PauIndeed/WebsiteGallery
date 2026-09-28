document.addEventListener("DOMContentLoaded", () => { 
    // Se queda 'escuchando' hasta que el documento HTML esté completamente cargado y listo para ser manipulado. 
    // Una vez que esto sucede, se ejecuta la función que contiene toda la lógica de traducción y carrusel.

    // ----------------------------------------------------
    // LÓGICA DE TRADUCCIÓN GLOBAL
    // ----------------------------------------------------
        const currentLang = localStorage.getItem("preferred-lang") || "es"; 
        // Intenta obtener el idioma preferido del usuario mediante localStorage. Si no hay ninguno, se aplica por defecto el español "es" y se guarda en currentLang.
        setLanguage(currentLang); // Llama a setLanguage, y le pasa el idioma actual para actualizar todos los textos.
        
        const langButtons = document.querySelectorAll(".btn-lang"); // Busca todos los elementos con clase ".btn-lang" y los guarda en una lista llamada langButtons.
        langButtons.forEach(button => { // Recorre todos los elementos encontrados de variable button
            button.addEventListener("click", () => { // Se queda 'escuchando', y cuando se hace click, ejecuta lo de abajo
                const selectedLang = button.getAttribute("data-lang"); // Va al botón y lee su atributo data-lang. Luego, guarda la información en selectedLang (es, o en.)
                localStorage.setItem("preferred-lang", selectedLang); // Mediante localStorage, guarda o actualiza el idioma que el usuario selecciona.
                setLanguage(selectedLang); // Vuelve a llamar a setLanguage, pasándole el nuevo idioma seleccionado para actualizar todos los textos.
            });
        });

        // Función para actualizar los textos, placeholders e innerHTML según el idioma seleccionado.
    function setLanguage(lang) {
        document.documentElement.lang = lang; // Actualiza el atributo lang de la etiqueta <html> del/los documento/s 

        const pageTitle = document.querySelector("title[data-es][data-en]");
        if (pageTitle) {
            const newTitle = pageTitle.getAttribute(`data-${lang}`);
            if (newTitle !== null) {
                document.title = newTitle;
            }
        }

        const elements = document.querySelectorAll(".traductor"); // Busca todos los elementos con la clase "traductor"
        
        elements.forEach(element => { // Recorre todos los elementos encontrados de variable element
            const tagName = element.tagName; // Guarda el tipo de etiqueta que es

            // 1. Si el elemento es un INPUT o un TEXTAREA, traducimos su atributo 'placeholder'
            if (tagName === "INPUT" || tagName === "TEXTAREA") { // Si el elemento es una caja de texto, o un input
                const newPlaceholder = element.getAttribute(`data-${lang}-placeholder`); // Busca el atributo 'data-{lang}-placeholder' que corresponde al idiona
                if (newPlaceholder !== null) { // Si el atributo existe
                    element.setAttribute("placeholder", newPlaceholder); // Actualiza el atributo 'placeholder' con el nuevo texto, ya traducido
                }
            } 
            // 2. Si es cualquier otro elemento (H1, H2, P, A, etc.), traducimos usando innerHTML
            else { // Si es cualquier otro elemento
                const newText = element.getAttribute(`data-${lang}`); // Busca el atributo con el texto del idioma 'data-{lang}' correspondiente al idioma
                if (newText !== null) { // Si existe el atributo
                    element.innerHTML = newText; // Actualiza el contenido con el nuevo texto, ya traducidoExpl
                }
            }
        });
    }
});