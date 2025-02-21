// URL base for API endpoints
const BASE_URL = 'http://127.0.0.1:5000';

// Get DOM elements
const getElements = () => ({
    contenido: document.querySelector('#contenido'),
    t1: document.querySelector('#t1'),
    t2: document.querySelector('#t2'),
    t3: document.querySelector('#t3'),
    opcion1: document.querySelector('#opcion1'),
    opcion2: document.querySelector('#opcion2'),
    opcion3: document.querySelector('#opcion3'),
    opcion4: document.querySelector('#opcion4')
});

// Build URL based on selected option
function buildUrl() {
    const { t1, t2, t3, opcion1, opcion2, opcion3, opcion4 } = getElements();
    
    if (opcion1.checked) return BASE_URL;
    if (opcion2.checked) return `${BASE_URL}/notas/${t1.value}/${t2.value}/${t3.value}`;
    if (opcion3.checked) return `${BASE_URL}/edades/${t1.value}`;
    if (opcion4.checked) return `${BASE_URL}/arreglos/${t1.value}/${t2.value}/${t3.value}`;
    return null;
}

// Main function to send data
async function enviar() {
    const { contenido } = getElements();
    const url = buildUrl();
    
    if (!url) {
        swal("Mensaje", "Seleccione una opción", "warning");
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw "Error en la llamada";
        
        const texto = await response.text();
        console.log(texto);
        contenido.innerHTML = texto;
    } catch (error) {
        console.log(error);
        swal({
            title: "Advertencia",
            text: error,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });
    }
}

// Helper function to set input states
function configureInputs({ t1Enabled = false, t2Enabled = false, t3Enabled = false, placeholders = ["", "", ""] }) {
    const { t1, t2, t3 } = getElements();
    const inputs = [
        { element: t1, enabled: t1Enabled, placeholder: placeholders[0] },
        { element: t2, enabled: t2Enabled, placeholder: placeholders[1] },
        { element: t3, enabled: t3Enabled, placeholder: placeholders[2] }
    ];

    inputs.forEach(({ element, enabled, placeholder }) => {
        element.disabled = !enabled;
        element.value = "";
        element.placeholder = placeholder;
    });
}

// Option handler functions
function opcion1() {
    configureInputs({
        t1Enabled: false,
        t2Enabled: false,
        t3Enabled: false,
        placeholders: ["", "", ""]
    });
}

function opcion2() {
    configureInputs({
        t1Enabled: true,
        t2Enabled: true,
        t3Enabled: true,
        placeholders: ["Nota 1", "Nota 2", "Nota 3"]
    });
}

function opcion3() {
    configureInputs({
        t1Enabled: true,
        t2Enabled: false,
        t3Enabled: false,
        placeholders: ["Edad", "", ""]
    });
}

function opcion4() {
    configureInputs({
        t1Enabled: true,
        t2Enabled: true,
        t3Enabled: true,
        placeholders: ["Valores permitidos", "Columnas", "Filas"]
    });
}