# Porción — mock nutricional 3D

Web estática en HTML, CSS y JavaScript con Three.js 0.160.1 incluido. Sin React, cuentas, backend, instalación de paquetes ni conexión a internet.

## Probar

1. Descomprime el ZIP y abre una terminal en la carpeta `porcion`.
2. Con Python 3 instalado, ejecuta:

   ```sh
   python3 -m http.server 8000 --bind 127.0.0.1
   ```

3. Abre http://localhost:8000 en Chrome, Edge, Firefox o Safari reciente, con WebGL habilitado.
4. Para detenerlo, pulsa Ctrl+C en la terminal.

Este servidor solo entrega archivos estáticos. No procesa datos ni necesita un backend. No abras `index.html` con doble clic: los módulos JavaScript requieren HTTP. También puedes servir la carpeta con la extensión Live Server de VS Code o subir su contenido a cualquier alojamiento estático.

## Uso

- Elige entre arroz, pollo, brócoli, papa y zanahoria; introduce de 1 a 500 g enteros y pulsa **Añadir**.
- Cada alimento aparece una vez. Ajusta sus gramos con el deslizador o el campo numérico de **En tu plato**. Los nutrientes y el volumen 3D cambian inmediatamente al deslizar o introducir una cantidad válida.
- Arrastra el plato para girar. Usa la rueda o pellizca con dos dedos para acercar. Los botones permiten girar, acercar, alejar y restablecer la cámara con teclado.
- Usa × para quitar un alimento, **Limpiar** para vaciar el plato y **Cargar ejemplo** para reemplazarlo por arroz 100 g, pollo 150 g y brócoli 80 g.
- La página empieza vacía y no guarda datos al recargar.

## Aproximaciones del mock

Todos los pesos corresponden a alimentos cocidos, sin aceite añadido; pollo sin piel y papa sin piel. `nutrition.js` contiene valores ilustrativos por 100 g, no una tabla clínica validada. Los totales se calculan como valor por 100 g × gramos / 100, sumando sin redondear y redondeando solo al mostrar. Las barras reflejan la proporción de energía de los macronutrientes con factores 4/4/9, no metas diarias; pueden diferir de las calorías declaradas por redondeo y fibra.

Las figuras son geométricas y aproximadas, sin calibración física de densidades, cocción, forma o tamaño real del plato. Cada dimensión escala con la raíz cúbica de los gramos, por lo que el volumen aumenta proporcionalmente. Cantidades altas pueden superponerse; no hay simulación de apilamiento ni colisiones. Este prototipo no mide una porción real ni sustituye la validación del nutricionista.

Ejemplo comprobable: arroz 100 g + pollo 150 g + brócoli 80 g = 405,5 kcal; 51,12 g proteínas; 33,96 g carbohidratos; 6,02 g grasas; 330 g totales.

## Archivos

- `index.html`: interfaz.
- `styles.css`: diseño adaptable a escritorio y móvil.
- `app.js`: selección, cantidades y actualización de la interfaz.
- `nutrition.js`: catálogo y cálculo nutricional.
- `scene.js`: plato, alimentos geométricos, iluminación y cámara.
- `vendor/`: Three.js, OrbitControls y licencia MIT.

Documentación técnica: https://threejs.org/manual/pages/installation.html y https://threejs.org/docs/pages/OrbitControls.html
