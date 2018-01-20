import koaRouter from "koa-joi-router";

import * as ctrl from "../controllers/team";
import retrieveContest from "../middleware/retrieveContest";
import retrieveTeam from "../middleware/retrieveTeam";

const Joi = koaRouter.Joi;
const router = koaRouter();
router.prefix("/teams");

const routes = [
  {
    method: "get",
    path: "/:contest/",
    handler: [retrieveContest, retrieveTeam, ctrl.getInfo],
    validate: {
      params: {
        contest: Joi.string().token()
      }
    },
    meta: {
      swagger: {
        summary: "Get Contest Info",
        description:
          "Get Contest Info, including max team size and current team status",
        tags: ["teams"]
      }
    }
  },
  {
    method: "get",
    path: "/:contest/invites",
    handler: [ctrl.getInvites],
    validate: {
      params: {
        contest: Joi.string().token()
      }
    },
    meta: {
      swagger: {
        summary: "Get Invites",
        description: "Get invites for a particular contest",
        tags: ["teams"]
      }
    }
  },
  {
    method: "post",
    path: "/:contest",
    handler: [retrieveContest, retrieveTeam, ctrl.createTeam],
    validate: {
      params: {
        contest: Joi.string().token()
      },
      type: "form",
      body: {
        teamname: Joi.string().token()
      }
    },
    meta: {
      swagger: {
        summary: "Create New Team",
        tags: ["teams"]
      }
    }
  },
  {
    method: "get",
    path: "/:contest/invite/:uoe",
    handler: [retrieveContest, retrieveTeam, ctrl.inviteMember],
    validate: {
      params: {
        contest: Joi.string().token(),
        uoe: Joi.alternatives().try(Joi.string().email(), Joi.string().token())
      }
    },
    meta: {
      swagger: {
        summary: "Invite a member",
        tags: ["teams"]
      }
    }
  },
  {
    method: "get",
    path: "/:contest/accept_invite/:inviteId",
    handler: [ctrl.acceptInvite],
    validate: {
      params: {
        contest: Joi.string().token(),
        inviteId: Joi.number()
      }
    },
    meta: {
      swagger: {
        summary: "Accept a invite",
        tags: ["teams"]
      }
    }
  }
];

router.route(routes);
export default router;
