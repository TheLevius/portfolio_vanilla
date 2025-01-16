import { Elysia, t } from "elysia";
import nodemailer from "nodemailer";
import { join } from "path";
import { staticPlugin } from "@elysiajs/static";
import { cors } from "@elysiajs/cors";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT);
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

const app = new Elysia().use(cors()).use(
	staticPlugin({
		prefix: "/",
		assets: join(__dirname, "dist"),
	})
);

app.get("/", () => Bun.file(join(__dirname, "dist", "index.html")));
app.post("/feedback", async (ctx) => ctx.body, {
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
	// 		await transporter.sendMail({
	// 			from: `"Website Contact" <${process.env.EMAIL_USER}>`,
	// 			to: process.env.EMAIL_USER,
	// 			subject: `New message from ${name}`,
	// 			text: `You received a new message from ${name} (${email}):\n\n${message}`,
	// 		});
});

app.listen(port, () => {
	console.log(`server listen on port ${port}`);
});
