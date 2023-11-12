import {MyContext} from "../index";
import {GraphQLError} from "graphql";

export default function AuthGuard(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const context: MyContext = args[0];
        if (!context.authorized) {
            throw new GraphQLError("Not authorized");
        }
        return originalMethod.apply(this, args);
    };

    return descriptor;
}