document.addEventListener("DOMContentLoaded", () => {
    const map = L.map('map').setView([36.72017599, -4.41744497], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Definir el icono personalizado
    const museumIcon = L.icon({
        iconUrl: '/images/museum.png',  // Ruta de la imagen
        iconSize: [40, 40],  // Tamaño del icono
        iconAnchor: [20, 40],  // Punto de anclaje del icono
        popupAnchor: [0, -35]  // Punto de anclaje del popup
    });

    fetch('/javascripts/museos.json')
        .then(response => response.json())
        .then(data => {
            data.features.forEach(museo => {
                const marker = L.marker([museo.lat, museo.lng], { icon: museumIcon }).addTo(map);
                marker.bindPopup(`<b>${museo.nombre}</b>`).on('click', () => {
                    Swal.fire({
                        title: museo.nombre,
                        text: museo.web ? `Visita: ${museo.web}` : 'Web no disponible',
                        imageUrl: museo.imagen,
                        imageWidth: 400,
                        imageAlt: museo.nombre,
                        confirmButtonText: 'OK'
                    });
                });
            });
        });
});
