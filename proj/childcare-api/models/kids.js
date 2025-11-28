class Kids {
    constructor(id, teacher, name, address) {
        this.id = Math.round(Math.random() * 1000)
        this.teacher = teacher
        this.name = name
        this.address = address
    }
}

export default Kids