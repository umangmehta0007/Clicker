
export default function assert(value: boolean, message: string): asserts value{
    if(!value){
        throw new AssertionError(message);
    }
}

class AssertionError extends Error{

    constructor(message: string){
        super(message);
    }
}