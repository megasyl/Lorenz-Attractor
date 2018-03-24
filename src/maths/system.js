import Vector from './vector';

export default class LorenzSystem {
    constructor(id) {
        this.id = id;
        this.sigma = 10;
        this.rho = 28;
        this.beta = 8 / 3;
        this.delta = 0.01;

        this.initialPosition = new Vector.random(100);
        this.currentPosition = this.initialPosition;
        this.previousPosition = this.initialPosition;
        this.time = 0;
    }

    process() {
        this.previousPosition = this.currentPosition;
        // Vector.rk4 uses Runge-Kutta method
        this.currentPosition = this.currentPosition.rk4(this.delta, (p) => this.calculateNextVector(p));
        this.time += this.delta;
    }

    calculateNextVector(position) {
        return new Vector(
            this.sigma * (position.y - position.x),
            position.x * (this.rho - position.z) - position.y,
            position.x * position.y - (this.beta * position.z)
        );
    }
}