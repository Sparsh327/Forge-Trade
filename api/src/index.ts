import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import indexRoute from "./routes/index.route";
import authRoute from "./routes/auth/auth.index";

const app = createApp();
const routes = [indexRoute, authRoute];
configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
