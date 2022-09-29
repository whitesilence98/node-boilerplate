import {apiBuilder} from "utils/api-builder.util";

import UserModel from "./user.model";

export const find = async ({queryParams, routeParams}: any) => {
   return await apiBuilder(UserModel.find(routeParams), queryParams, ["name"]);
};
