class Teacher {
    constructor(name, kids) {
        this.id = Math.round(Math.random() * 1000)
        this.name = name
        this.kids = kids
    }
}

export default Teacher