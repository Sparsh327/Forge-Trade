import { createRouter } from "@/lib/create-app";
import * as handlers from "./auth.handler";
import * as routes from "./auth.routes";

export const router = createRouter()
  .openapi(routes.signup, handlers.signup)
  .openapi(routes.login, handlers.login)
  .openapi(routes.loginViaGoogle, handlers.loginViaGoogle)
  .openapi(routes.updateUser, handlers.updateUser);

export default router;
