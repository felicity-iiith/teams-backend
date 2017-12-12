import koaRouter from "koa-joi-router";

import * as ctrl from "../controllers/user";

const Joi = koaRouter.Joi;
const router = koaRouter();
router.prefix("/users");

const routes = [
  {
    method: "get",
    path: "/:id",
    handler: ctrl.get,
    meta: {
      swagger: {
        summary: "Get User Info",
        description: `Note: \nSensitive data can only be viewed by the \`corresponding user\` or \`Admin\`.`,
        tags: ["users"]
      }
    },
    validate: {
      params: {
        id: Joi.number()
      }
    }
  }
];

router.route(routes);
export default router;
