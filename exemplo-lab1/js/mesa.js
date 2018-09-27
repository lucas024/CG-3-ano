/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var geometry, material, mesh;

var hinge = new THREE.Object3D();
var axis = new THREE.Vector3()
var cadeira = new THREE.Object3D();
var pauCadeira = new THREE.Object3D();

var xCadeiraOriginal = 0, yCadeiraOriginal=0;
function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(10, 10, 100, 15);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(200, 20, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addBaseCandeiro(obj, x ,y, z){
    geometry = new THREE.CylinderGeometry(15, 15, 10, 5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x-20, y+2, z-85);
    obj.add(mesh);
}

function addBracoBase(obj, x ,y, z){
    geometry = new THREE.CylinderGeometry(2, 2, 100, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x-20, y+2, z-85);

    hinge.position.x = x;
    hinge.position.y = y-25;
    hinge.position.z = z-46;

    
    geometry = new THREE.CubeGeometry(6, 6, 6);
    hingeMesh = new THREE.Mesh(geometry, material);
    hingeMesh.position.set(x, y+2, z);
    hinge.add(hingeMesh);

    hinge.rotation.set(Math.PI /3,0,0);
    
    mesh.add(hinge);
    obj.add(mesh);



    addBracoHinge(hinge, x, y, z);
    

}

function addBracoHinge(obj, x, y, z){
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    
    geometry = new THREE.CylinderGeometry(2, 2, 100, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+52, z);
    

    obj.add(mesh);
}


function createTable(x, y, z) {
    'use strict';
    
    var table = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
   
    addTableTop(table, 0, 25, 0);
    addTableLeg(table, -80, -15, -30);
    addTableLeg(table, -80, -15, 30);
    addTableLeg(table, 80, -15, 30);
    addTableLeg(table, 80, -15, -30);
    
    scene.add(table);
    
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}
function createCandeiro(x, y, z) {
    
    var candeiro = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });

    addBaseCandeiro(candeiro,0 ,0, 0);
    addBracoBase(candeiro, 0, 50, 0);
    
    scene.add(candeiro);

    candeiro.position.x=x;
    candeiro.position.y=y;
    candeiro.position.z=z;
    

}
function addBaseCadeira(obj,x,y,z){
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    geometry = new THREE.CubeGeometry(40, 2, 40);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+20, z);

    obj.add(mesh);

}
function addPauCadeira(obj,x,y,z){
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.CylinderGeometry(3, 3,50,20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+30, z);

    pauCadeira.add(mesh);
    obj.add(pauCadeira);

}
function createChair(x,y,z){
    material = new THREE.MeshBasicMaterial({ color: 0x0fffff, wireframe: true });

    cadeira.position.set(x,y,z);
    
    addBaseCadeira(cadeira,x,y,z);
    addPauCadeira(cadeira,x,y,z);
    scene.add(cadeira);
}
function moveCadeiraEsquerda(){
    cadeira.position.set(xCadeiraOriginal-1,0,40);
    xCadeiraOriginal=xCadeiraOriginal-1;
}
function moveCadeiraDireita(){
    cadeira.position.set(xCadeiraOriginal+1,0,40);
    xCadeiraOriginal=xCadeiraOriginal+1;
}
function moveCadeiraCima(){
    pauCadeira.position.set(0,yCadeiraOriginal+1,40);
    yCadeiraOriginal=yCadeiraOriginal+1;
}
function moveCadeiraBaixo(){
    if(yCadeiraOriginal>0){
    pauCadeira.position.set(0,yCadeiraOriginal-1,40);
    yCadeiraOriginal=yCadeiraOriginal-1;
    }
    else yCadeiraOriginal=0;
    
}
function createFloor(x,y,z){
    var floor = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00fff8, wireframe: true });
    
    geometry = new THREE.CubeGeometry(400, 2, 250);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    floor.add(mesh);

    scene.add(floor);

    floor.position.x=x;
    floor.position.y=y;
    floor.position.z=z;
    
    

}
function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    

    scene.add(new THREE.AxisHelper(10));
    
    createFloor(0,0,0);
    createTable(0, 65, 0);
    createCandeiro(-10, 5 , 0)
    createChair(0,0,40);
}

function createCamera() {
    var width = window.innerWidth;
	var height = window.innerHeight;

	console.log("Width:", width);
	console.log("Height:", height);

	camera = new THREE.OrthographicCamera(width / -4, width / 4, height / 4, height / -4, 1, 10000);

	// Normal
	camera.position.set(500, 200, 500);
	camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.key) {
    case '1': 
        camera.position.set(500,200,500);
        camera.lookAt(scene.position);
        break;
    case '2':
        camera.position.set(0,500,0);
        camera.lookAt(scene.position);       
        break;
    
    case '3':
        camera.position.set(0,0,500);
        camera.lookAt(scene.position);       
        break;
    case 'ArrowLeft':
        moveCadeiraEsquerda();
        break;
    case 'ArrowRight':
        moveCadeiraDireita();
        break;
    
    case 'ArrowUp':
        moveCadeiraCima();
        break;
    case 'ArrowDown':
        moveCadeiraBaixo();
        break;
    }
    render();
}

function onClick(){
    camera.position.set(0,500,0);
    camera.lookAt(scene.position); 
}
function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCamera();
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keypress", onKeyDown);
    
    
}

