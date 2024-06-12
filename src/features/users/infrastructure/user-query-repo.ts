import {ObjectId} from "mongodb";
import {UserModel} from "../domain/User.entity";

export type UserViewType = {
    email: string;
    login: string;
    id: string;
}

export const userQueryRepository = {
    async getUsers(): Promise<UserViewType[]> {
        const results = await UserModel.find();

        return results.map((result)=> ({
            email: result.email,
            login: result.login,
            id: result._id.toString(),
        }))
    },

    async getUser(id: string): Promise<UserViewType | null> {
        const result = await UserModel.findOne({ _id: new ObjectId(id) });

        if(!result) {
            return null
        }

        return {
            email: result.email,
            login: result.login,
            id: result._id.toString(),
        }
    },
};