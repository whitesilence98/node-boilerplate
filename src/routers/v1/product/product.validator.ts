import {check} from "express-validator";

export const create = () => {
   return [
      check("name").isLength({min: 6, max: 20}).withMessage("Invalid Name"),
      check("image").isURL().withMessage("Not an URL"),
   ];
};
