import { Elysia, t } from "elysia";
import { dirname, join } from "path";
import { staticPlugin } from "@elysiajs/static";
import { cors } from "@elysiajs/cors";

const port = process.env.PORT || "3000";
const projectRoot = dirname(Bun.main);
const staticRoot = join(projectRoot, "dist");
const app = new Elysia();
app.use(cors());
app.use(
	staticPlugin({
		prefix: "/",
		assets: staticRoot,
	})
);
const apiController = (app) => {
	app.post(
		"/feedback",
		async (ctx) => ({
			success: true,
			message: "Валидация прошла успешно, данные приняты",
			data: ctx.body,
		}),
		{
			body: t.Object({
				name: t.String({
					minLength: 2,
					maxLength: 50,
				}),
				email: t.String({
					minLength: 6,
					maxLength: 320,
					format: "email",
				}),
				message: t.String({
					minLength: 10,
					maxLength: 500,
				}),
			}),
		}
	);
	return app;
};
app.group("/api", apiController);
app.get("/", () => Bun.file(join(staticRoot, "index.html")));

app.listen(Number(port), () => {
	console.log(`server listen on port ${port}`);
});
