import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import indexRoute from "./routes/index.route";

const app = createApp();
const routes = [indexRoute];
configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
