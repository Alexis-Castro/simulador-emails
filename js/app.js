
// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');


// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
    
    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    

    // Reinicia el formulario
    btnReset.addEventListener('click', resetFormulario)


    // Enviar Email
    btnEnviar.addEventListener('click', enviarEmail);

}



// Funciones

function validarFormulario(e) {

    if (e.target.value.length > 0) {

        // Elimina el error
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {
        // Expresion regular

        if (regEx.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    }

    if (regEx.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } 

}


function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'bg-red-200', 'text-red-800', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

}


// Enviar el email
function enviarEmail(e) {
    e.preventDefault();

    // Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    // Despues de 3 segundos ocultar el spinner y mostrar mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        // mensaje que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();   // eliminar el mensaje de exito
            resetFormulario();
        }, 4000);
    }, 3000);


    // setTimeout, ejecuta el codigo despues del tiempo dado
    // setInterval, ejecuta el codigo cada tiempo dado, bucle
}


// Funcion que resetea el formulario
function resetFormulario() {
    formulario.reset();
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')

}