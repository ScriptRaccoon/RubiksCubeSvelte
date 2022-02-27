export class TaskQueue {
    constructor(fun) {
        this.queue = [];
        this.executing = false;
        this.fun = fun;
    }

    add(task) {
        this.queue.push(task);
        if (!this.executing) {
            this.executing = true;
            this.execute();
        }
    }

    async execute() {
        if (this.queue.length > 0) {
            const task = this.queue.shift();
            await this.fun(task);
            this.execute();
        } else {
            this.executing = false;
        }
    }
}
