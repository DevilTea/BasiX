class Rectangle extends PolygonBody {
    constructor(x, y, width, height) {
        super(x, y)
        this.originalVertices.push(new Vector(x - width / 2, y - height / 2))
        this.originalVertices.push(new Vector(x + width / 2, y - height / 2))
        this.originalVertices.push(new Vector(x + width / 2, y + height / 2))
        this.originalVertices.push(new Vector(x - width / 2, y + height / 2))
        this.currentVertices = [...this.originalVertices]
        this.previousVertices = [...this.originalVertices]
    }
}