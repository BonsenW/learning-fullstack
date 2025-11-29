class Task {
    constructor(title, description) {
        this.id = Math.round(Math.random() * 10000)
        this.title = title
        this.description = description

        const currentTime = new Date()
        this.createdTime = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()}`
    }
}

export default Task