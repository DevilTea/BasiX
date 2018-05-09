BasiX.RectangleBody = class RectangleBody extends BasiX.Body {
    constructor(x, y, width, height) {
        super(x, y)
        this.originalVertices.push(new BasiX.Vector(-width / 2, -height / 2))
        this.originalVertices.push(new BasiX.Vector(width / 2, -height / 2))
        this.originalVertices.push(new BasiX.Vector(width / 2, height / 2))
        this.originalVertices.push(new BasiX.Vector(-width / 2, height / 2))
        this.originalVertices.forEach((vertex) => {
            this.predictVertices.push(BasiX.Vector.copy(vertex))
            this.currentVertices.push(BasiX.Vector.copy(vertex))
            this.previousVertices.push(BasiX.Vector.copy(vertex))
        })
    }
}