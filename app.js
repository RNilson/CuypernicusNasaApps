// Función para inicializar cada escena
function initScene(canvasId, texturePath) {
    const canvas = document.querySelector(`#${canvasId}`);

    // Variables de control únicas para cada escena
    let mouseX = 0, mouseY = 0;
    let isMouseDown = false;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 4;

    // Crear la escena
    const scene = new THREE.Scene();

    // Crear la cámara
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    scene.add(camera);

    // Crear el renderizador
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);

    // Crear la geometría del planeta
    const earthgeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const earthmaterial = new THREE.MeshPhongMaterial({
        roughness: 0,
        metalness: 0,
        map: new THREE.TextureLoader().load(texturePath),
        bumpMap: new THREE.TextureLoader().load(texturePath),
        bumpScale: 0
    });

    const earthmesh = new THREE.Mesh(earthgeometry, earthmaterial);
    scene.add(earthmesh);

    // Luz ambiental
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientlight);

    // Luz puntual
    const pointerlight = new THREE.PointLight(0xffffff, 0.9);
    pointerlight.position.set(5, 3, 5);
    scene.add(pointerlight);

    // Estrellas de fondo
    const stargeometry = new THREE.SphereGeometry(80, 64, 64);
    const starmaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(texturePath),
        side: THREE.BackSide
    });
    const starmesh = new THREE.Mesh(stargeometry, starmaterial);
    scene.add(starmesh);

    // Animación
    const animate = () => {
        requestAnimationFrame(animate);

        if (isMouseDown) {
            earthmesh.rotation.y += (mouseX / windowHalfX * 0.5 - earthmesh.rotation.y) * 0.5;
            earthmesh.rotation.x += (mouseY / windowHalfY * 0.5 - earthmesh.rotation.x) * 0.5;
        }

        starmesh.rotation.y += 0.005;

        render();
    };

    const render = () => {
        renderer.render(scene, camera);
    };

    animate();

    // Event listeners para la interacción de ratón solo en este canvas
    canvas.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isMouseDown) {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        }
    });

    canvas.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
}

// Inicializa las tres escenas con movimiento independiente
window.onload = () => {
    initScene('c', 'Imagenes/KEPLER22B.png');  // Primera escena
    initScene('d', 'Imagenes/KEPLER22B.png');  // Segunda escena
    initScene('e', 'Imagenes/KEPLER22B.png');  // Tercera escena
    initScene('f', 'Imagenes/KEPLER22B.png');  // Tercera escena
    initScene('g', 'Imagenes/KEPLER22B.png');  // Tercera escena
};
