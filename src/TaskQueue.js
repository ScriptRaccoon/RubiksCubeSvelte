export class TaskQueue {
    constructor(fun, taskInversion) {
        this.queue = [];
        this.executing = false;
        this.fun = fun;
        this.delay = 100;
        this.history = [];
        this.taskInversion = taskInversion;
    }

    clearHistory() {
        this.history = [];
    }

    add(task, save = true) {
        this.queue.push(task);
        if (save) this.history.push(task);
        if (!this.executing) {
            this.executing = true;
            this.execute();
        }
    }

    undo() {
        if (this.executing || this.history.length == 0) return;
        const task = this.history.pop();
        const invertedTask = this.taskInversion(task);
        this.add(invertedTask, false);
    }

    async execute() {
        if (this.queue.length > 0) {
            const task = this.queue.shift();
            await this.fun(task);
            setTimeout(() => {
                this.execute();
            }, this.delay);
        } else {
            this.executing = false;
        }
    }
}
