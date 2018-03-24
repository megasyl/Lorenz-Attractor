import {
    Scene,
    LineDashedMaterial,
    Geometry,
    Vector3,
    Color,
    Line,
    PerspectiveCamera,
    WebGLRenderer,
} from 'three';
import LorenzSystem from './maths/system';

export default class App {
    constructor(systemCount) {
        this.systemCount = systemCount;
        this.scene = new Scene();
        this.width = window.innerWidth * 0.95;
        this.height = window.innerHeight * 0.95;
        console.log(this.systems)
        this.mustRender = false;

        this.initialize();
    }

    static newColorizedMaterial(color) {
        return new LineDashedMaterial({
            linewidth: 1,
            color: color
        });
    }

    generateSystems() {
        const count = document.getElementById('count').value;
        const rand = () => (Math.floor(Math.random() * 100) + 1) / 100;
        this.systems = [];
        let systemDoms = '';
        for (let i = 0; i < count; i++) {
            const newMaterial = App.newColorizedMaterial(new Color(rand(), rand(), rand()));
            const newSystem = new LorenzSystem(i)
            this.systems.push({
                system: newSystem,
                material: newMaterial,
            });
            const colorBox = `<div id="color-box-${i}"class="color-box" style="background-color: #${newMaterial.color.getHexString()};"></div>`;
            systemDoms += `<span id="system-${i}">${colorBox}<span id="info-${i}"></span></span>`;
        }
        document.getElementById('systems').innerHTML = systemDoms;
    }


    initialize() {
        // Configure camera settings
        this.camera = new PerspectiveCamera(50, this.width / this.height, 0.1, 1000);
        this.camera.position.set(0, 0, 200);
        this.camera.lookAt(new Vector3(0, 0, 0));

        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xffffff, 1);

        document.body.appendChild(this.renderer.domElement);

        this.geometry = new Geometry();
        this.geometry.dynamic = true;

        this.renderer.render(this.scene, this.camera);
    }

    clearThree (){
        while(this.scene.children.length > 0){
            clearThree(this.scene.children[0])
            this.scene.remove(this.scene.children[0]);
        }
        if(this.scene.geometry) this.scene.geometry.dispose()
        if(this.scene.material) this.scene.material.dispose()
        if(this.scene.texture) this.scene.texture.dispose()
    }


    run () {
        while(this.scene.children.length > 0){
            this.scene.remove(this.scene.children[0]);
        }
        console.log('coucou');
        this.mustRender = true;

        this.generateSystems(this.systemCount);

        this.render();
    }

    stop () {
        this.mustRender = false;
    }

    render() {
        if (this.mustRender) {
            requestAnimationFrame(() => {
                this.render()
            });

            this.systems.forEach((element) => {
                console.log(element);
                element.system.process();

                const previous = element.system.previousPosition;
                const current = element.system.currentPosition;

                let geo = new Geometry();
                geo.vertices.push(previous.toVector3());
                geo.vertices.push(current.toVector3());

                this.scene.add(new Line(geo, element.material));

                const infoDOM = document.getElementById(`info-${element.system.id}`);
                infoDOM.innerHTML =
                    `-> initial : ${element.system.initialPosition.toString()} - current ${element.system.currentPosition.toString()}<br>`;
            });
            document.getElementById(`time`).innerHTML = this.systems[0].system.time;

            // Spin camera around the visualization
            const timer = new Date().getTime() * 0.0005;
            this.camera.position.x = Math.floor(Math.cos(timer) * 200);
            this.camera.position.z = Math.floor(Math.sin(timer) * 200);
            this.camera.lookAt(this.scene.position);

            this.renderer.render(this.scene, this.camera);
        }
    }
}