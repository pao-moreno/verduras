document.addEventListener("DOMContentLoaded", function() {
    const imagenesNoEncontradas = [];

    fetch("datos.json")
        .then(response => response.json())
        .then(data => {
            const dataContainer = document.getElementById("data-container");

            data[0].data.forEach(item => {
                const imageContainer = document.createElement("div");
                imageContainer.className = "image-item";
                
                const imageName = document.createElement("p");
                imageName.textContent = item.nom_variedad;

                const image = document.createElement("img");
                image.src = `fotos/${item.nom_file}.png`;
                image.alt = `Imagen ${item.nom_variedad} no encontrada`;

                image.onerror = function() {
                    imagenesNoEncontradas.push(item.nom_file);
                    actualizarParrafo();
                };

                image.style.width = "300px";
                image.style.height = "300px";

                imageContainer.appendChild(image);
                imageContainer.appendChild(imageName);
                dataContainer.appendChild(imageContainer);
            });

            function actualizarParrafo() {
                const parrafoImagenesNoEncontradas = document.getElementById("imagenes-no-encontradas");
                parrafoImagenesNoEncontradas.textContent = "Imágenes no encontradas: " + imagenesNoEncontradas.join(", ");
            }
        })
        .catch(error => console.error("Error al cargar los datos:", error));
});
