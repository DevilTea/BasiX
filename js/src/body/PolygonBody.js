BasiX.PolygonBody = class PolygonBody extends BasiX.Body {
    constructor(x, y, radius, sideQuantity) {
        super(x, y)
        let deltaAngle = 2 * Math.PI / sideQuantity
        for(let i = 0; i < sideQuantity; i++) {
            this.originalVertices.push(new BasiX.Vector(radius * Math.cos(deltaAngle * i), -radius * Math.sin(deltaAngle * i)))
        }
        this.originalVertices.forEach((vertex) => {
            this.predictVertices.push(BasiX.Vector.copy(vertex))
            this.currentVertices.push(BasiX.Vector.copy(vertex))
            this.previousVertices.push(BasiX.Vector.copy(vertex))
        })
    }
}