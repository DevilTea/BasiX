class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static assignBToA(vectorA, vectorB) {
        vectorA.x = vectorB.x
        vectorA.y = vectorB.y
    }

    static copy(vector) {
        return new Vector(vector.x, vector.y)
    }

    static getVectorAB(vertexA, vertexB) {
        return new Vector(vertexB.x - vertexA.x, vertexB.y - vertexA.y)
    }

    //取得向量的單位向量
    static getUnitVector(vector) {
        let magnitude = Vector.getMagnitude(vector)
        return magnitude === 0 ? new Vector(0, 0) : new Vector(vector.x / magnitude, vector.y / magnitude)
    }

    //取得向量的長度
    static getMagnitude(vector) {
        return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
    }

    //取得反向向量
    static getOpposite(vector) {
        return new Vector(-vector.x, -vector.y)
    }

    //兩向量相加
    static add(vectorA, vectorB) {
        return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y)
    }

    //兩向量相減
    static subtract(vectorA, vectorB) {
        return new Vector(vectorA.x - vectorB.x, vectorA.y - vectorB.y)
    }

    //向量縮放
    static scale(vector, scalarMultiple) {
        return new Vector(scalarMultiple * vector.x, scalarMultiple * vector.y)
    }

    //兩向量內積
    static dotProduct(vectorA, vectorB) {
        return vectorA.x * vectorB.x + vectorA.y * vectorB.y
    }

    //判斷是否為0向量
    static isZeroVector(vector) {
        return vector.x === 0 && vector.y === 0
    }

    //判斷兩向量是否相等
    static isEqual(vectorA, vectorB) {
        return (vectorA.x === vectorB.x && vectorA.y === vectorB.y)
    }

    //判斷兩向量是否平行
    static isParallel(vectorA, vectorB) {
        let unitVectorA = Vector.getUnitVector(vectorA)
        let unitVectorB = Vector.getUnitVector(vectorB)
        return (Math.abs(unitVectorA.x) === Math.abs(unitVectorB.x) && Math.abs(unitVectorA.y) === Math.abs(unitVectorB.y))
    }

    //取得A在B上的正射影
    static projectAOnB(vectorA, vectorB) {
        return Vector.scale(Vector.getUnitVector(vectorB), Vector.getProjectionAOnBLength(vectorA, vectorB))
    }

    //取得A在B上的正射影長
    static getProjectionAOnBLength(vectorA, vectorB) {
        return Vector.dotProduct(vectorA, Vector.getUnitVector(vectorB))
    }

    static getNormalL(vector) {
        return Vector.getUnitVector(new Vector(-vector.y, vector.x))
    }

    static getNormalR(vector) {
        return Vector.getUnitVector(new Vector(vector.y, -vector.x))
    }

    static rotate(vector, angle, origin) {
        angle = angle * Math.PI / 180
        let x = (vector.x - origin.x) * Math.cos(angle) - (vector.y - origin.y) * Math.sin(angle) + origin.x;
        let y = (vector.y - origin.y) * Math.cos(angle) + (vector.x - origin.x) * Math.sin(angle) + origin.y;
        return new Vector(x, y)
    }
}