let path = '/PWA-U2-T2/sw.js';
let url = window.location.href;

let zona = $('#zona');
let frontal = $('#frontal');
let posterior = $('#posterior');
let tomar_foto = $('#tomar_foto');

let foto_info = ""

const camera = new Camera(zona[0])

frontal.on('click', () => {
    foto_info = "Cámara Frontal";
    camera.frontal_on()
    .then( res => {
        if (!res) {
            alert('Error al iniciar la cámara');
        }
    })
})

posterior.on('click', () => {
    foto_info = "Cámara Posterior";
    camera.posterior_on()
    .then( res => {
        if (!res) {
            alert('Error al iniciar la cámara');
        }
    })
})

tomar_foto.on('click', () => {
    camera.apagar()
    let photo = camera.take_photo()
    let img = create_img_node(photo, foto_info)
    $('#photo_list').append(img)
})

function create_img_node(image, foto_info) {

    let card = $(`
    <div class="mx-auto py-5">
        <img class="mx-auto rounded" style="display: grid;" src="${image}">
        <p class="pt-3 text-center">${foto_info}</p>
    </div>
    `);

    return card;
}

if (navigator.serviceWorker) {
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
        path = '/sw.js'
    }
    navigator.serviceWorker.register(path)
}