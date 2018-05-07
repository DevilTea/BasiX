class PolygonBody extends Body {
    constructor(x, y, radius, sideQuantity) {
        super(x, y)
        let deltaAngle = 2 * Math.PI / sideQuantity
        for(let i = 0; i < sideQuantity; i++) {
            this.originalVertices.push(new Vector(x + radius * Math.cos(deltaAngle * i), y + radius * Math.sin(deltaAngle * i)))
        }
        this.originalVertices.forEach((vertex) => {
            this.predictionVertices.push(Vector.copy(vertex))
            this.currentVertices.push(Vector.copy(vertex))
            this.previousVertices.push(Vector.copy(vertex))
        })
    }
}