import { Vector3 } from 'three';

export default class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static random(range) {
        const rand = (n) => Math.floor(Math.random() * n) + 1;
        return new Vector(rand(range), rand(range), rand(range))
    }

    add (vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    invert () {
        return new Vector(-this.x, -this.y, -this.z);
    }

    scale (factor) {
        return new Vector(this.x * factor, this.y * factor, this.z * factor);
    }

    subtract (vector) {
        return this.add(vector.invert());
    }

    dot (vector) {
        return this.x * vector.x + this.y * vector.y + this.z + vector.z;
    }

    rk4 (h, fn) {
        const k1 = fn(this).scale(h),
            k2 = fn(this.add(k1.scale(0.5))).scale(h),
            k3 = fn(this.add(k2.scale(0.5))).scale(h),
            k4 = fn(this.add(k3)).scale(h);
        return this.add((k1.add(k2.scale(2)).add(k3.scale(2)).add(k4)).scale(1 / 6));
    }

    toString() {
        return `(${ this.x.toFixed(2) }, ${ this.y.toFixed(2) }, ${ this.z.toFixed(2) })`;
    }

    toVector3() {
        return new Vector3(this.x, this.y, this.z);
    }
}