export default class ApplicationError extends Error {
    constructor(public message: string) {
        super(message);
        this.name = "UnexpectedInput";
        this.stack = (<any> new Error()).stack;
    }
}