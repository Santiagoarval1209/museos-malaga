document.addEventListener("DOMContentLoaded", () => {
    const map = L.map('map').setView([36.72017599, -4.41744497], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Definir el icono personalizado para los marcadores
    const museumIcon = L.icon({
        iconUrl: '/images/museum.png',  // Ruta del icono personalizado
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
                        html: `
                            <p><a href="${museo.web}" target="_blank">Visita: ${museo.web || 'No disponible'}</a></p>
                        `,
                        confirmButtonText: 'OK',
                        showCloseButton: true,
                        imageUrl: "/images/museum.png", // Solo muestra el icono personalizado
                        imageWidth: 100,
                        imageHeight: 100,
                        imageAlt: "Museo Icono"
                    });
                });
            });
        });
});
