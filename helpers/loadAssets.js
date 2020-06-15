
let THREE, manager, cubeTextureLoader, loaderGLB
const resourses = {}

const loadAssets = (T) => {
    THREE = T
    manager = new THREE.LoadingManager();
    cubeTextureLoader = new THREE.CubeTextureLoader(manager);
    loaderGLB = new THREE.GLTFLoader(manager)

    load() 

    return new Promise(resolve => manager.onLoad = () => resolve(resourses))
} 


function load() {
    cubeTextureLoader.load(
    [
        'assets/skybox/px.jpg', 
        'assets/skybox/nx.jpg', 
        'assets/skybox/py.jpg', 
        'assets/skybox/ny.jpg', 
        'assets/skybox/pz.jpg', 
        'assets/skybox/nz.jpg',
    ],
    function ( texture ) {
        resourses.skyboxTexture = texture;
    },
    undefined,
    function ( err ) {
        console.error( 'An error happened.' );
    });


    loaderGLB.load('assets/avatar.glb',
        function ( gltf ) {
            resourses.mask = gltf.scene.children[0];
            
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' );
            console.log(error);
        }
    );
} 


module.exports = loadAssets;