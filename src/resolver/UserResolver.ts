import User from "../entity/User";

// Provide resolver functions for your schema fields
export const resolvers = {
    Query: {
        getUser: async (_: any, args: any) => {
            const {id} = args;

            return await User.findOne({where: {id: id}});
        }
    },
    Mutation: {
        addUser: async (_: any, args: any) => {
            try {
                const user = User.create({
                    firstName: args.user.firstName,
                    lastName: args.user.lastName,
                    username: args.user.username,
                    password: args.user.password
                });
                console.log(user);
                return await user.save();
            } catch (error) {
                return null;
            }
        }
    }
};