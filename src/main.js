import "normalize.css";
import "./style.css";
import "./button/button.scss";
import "./bullet/bullet.scss";
import "./hero/hero.scss";
import "./section/section.scss";
import "./card/card.scss";
import "./features/features.scss";
import "./socials/socials.scss";
import "./form/form.scss";
import { Validator } from "./form/form";
(() => {
	const feedbackForm = document.getElementById("feedback-form");
	const formCheckIds = new Map([
		["feedback-name", "name"],
		["feedback-email", "email"],
		["feedback-message", "message"],
	]);
	const formIds = Array.from(formCheckIds.keys());

	const feedbackValidator = new Validator();
	const handleForm = (e) => {
		e.stopPropagation();
		e.preventDefault();
		const validationResult = formIds.every(
			(id) => feedbackValidator.validate(id, formCheckIds.get(id)) === "OK"
		);

		if (validationResult) {
			console.info("Валидация формы прошла успешно");
			sendJSON(feedbackForm, formIds);
		} else {
			console.info("Ошибка валидации формы");
		}
	};
	feedbackForm.addEventListener("submit", handleForm);
})();

async function sendJSON(formNode, ids) {
	const formData = new FormData(formNode);
	const data = {};
	formData.forEach((value, key) => {
		data[key] = value;
	});

	const response = await fetch("http://localhost:3000/feedback", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	}).catch(console.error);

	if (response.ok) {
		ids.forEach((id) => {
			const node = formNode.querySelector(`#${id}`);
			node.value = "";
		});
	}
}
