class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static getUnitVector(vector) {
        let magnitude = Vector.getMagnitude(vector)
        return new Vector(vector.x / magnitude, vector.y / magnitude)
    }

    static getMagnitude(vector) {
        return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
    }

    static getOpposite(vector) {
        return new Vector(-vector.x, -vector.y)
    }

    static add(vectorA, vectorB) {
        return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y)
    }

    static subtract(vectorA, vectorB) {
        return new Vector(vectorA.x - vectorB.x, vectorA.y - vectorB.y)
    }

    static scale(vector, scalarMultiple) {
        return new Vector(scalarMultiple * vector.x, scalarMultiple * vector.y)
    }

    static dotProduct(vectorA, vectorB) {
        return vectorA.x * vectorB.x + vectorA.y * vectorB.y
    }

    static isEqual(vectorA, vectorB) {
        return (vectorA.x === vectorB.x && vectorA.y === vectorB.y)
    }

    static isParallel(vectorA, vectorB) {
        let unitVectorA = Vector.getUnitVector(vectorA)
        let unitVectorB = Vector.getUnitVector(vectorB)
        return (Math.abs(unitVectorA.x) === Math.abs(unitVectorB.x) && Math.abs(unitVectorA.y) === Math.abs(unitVectorB.y))
    }
}