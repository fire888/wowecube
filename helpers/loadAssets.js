
var THREE = null
var manager = null// new THREE.LoadingManager();
var cubeTextureLoader =  null // new THREE.CubeTextureLoader(manager);
var loader = null

const resourses = {}

const loadAssets = (T, GLTFLoader) => {
    THREE = T
    manager = new THREE.LoadingManager();
    cubeTextureLoader = new THREE.CubeTextureLoader(manager);
    loader = new GLTFLoader(manager)

    return new Promise(resolve => {
        load() 
        //resolve(resourses)
        manager.onLoad = () => resolve(resourses)
    })
} 


function load() {
    cubeTextureLoader.load(
    [
        'assets/skybox/px.jpg', 
        'assets/skybox/nx.jpg', 
        'assets/skybox/py.jpg', 
        'assets/skybox/ny.jpg', 
        'assets/skybox/pz.jpg', 
        'assets/skybox/nz.jpg'
    ],
    function ( texture ) {
        resourses.skyboxTexture = texture;
    },
    undefined,
    function ( err ) {
        console.error( 'An error happened.' );
    });


    loader.load('assets/avatar.glb',
        function ( gltf ) {
            console.log('!!!!!!!!!!',gltf)
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