import "normalize.css";
import "./style.css";
import "./menu/menu.scss";
import "./burger/burger.scss";
import "./button/button.scss";
import "./bullet/bullet.scss";
import "./hero/hero.scss";
import "./holder/holder.scss";
import "./section/section.scss";
import "./card/card.scss";
import "./features/features.scss";
import "./socials/socials.scss";
import "./form/form.scss";

import {
	nameValidator,
	emailValidator,
	messageValidator,
	agreeValidator,
} from "./form/validators";
(() => {
	function toggleMenu() {
		const menuContainer = document.querySelector("#menu");
		const overlay = document.querySelector("#overlay");
		menuContainer.classList.toggle("menu--active");
		overlay.classList.toggle("overlay--active");
	}

	function closeMenu() {
		const menuContainer = document.querySelector("#menu");
		const overlay = document.querySelector("#overlay");
		menuContainer.classList.remove("menu--active");
		overlay.classList.remove("overlay--active");
	}
	document.getElementById("burger").addEventListener("click", toggleMenu);
	document.getElementById("closer").addEventListener("click", closeMenu);
	document.getElementById("overlay").addEventListener("click", closeMenu);

	const feedbackForm = document.getElementById("feedback-form");

	const handleForm = (e) => {
		e.stopPropagation();
		e.preventDefault();
		const formNode = e.target;
		const statusNodeSelector = ".form__status";
		const modifier = {
			statusError: "form--error",
		};

		const checkers = new Map([
			["feedback-name", { validate: nameValidator, name: "name" }],
			["feedback-email", { validate: emailValidator, name: "email" }],
			["feedback-message", { validate: messageValidator, name: "message" }],
			["feedback-agree", { validate: agreeValidator, name: "agree" }],
		]);

		let errorCount = 0;
		checkers.forEach((value, id) => {
			const element = formNode.elements[id];
			const result = value.validate(element);
			if (result !== "OK") {
				errorCount += 1;
			}
			const renderNode = element.parentNode.querySelector(statusNodeSelector);
			render(renderNode, result, modifier);
		});

		if (errorCount === 0) {
			console.info("Валидация формы прошла успешно");
			const dataNames = ["name", "email", "message"];

			sendJSON(formNode, dataNames);
		} else {
			console.info("Ошибка валидации формы");
		}
	};

	feedbackForm.addEventListener("submit", handleForm);
})();

async function sendJSON(formNode, dataNames) {
	const formData = new FormData(formNode);
	const data = dataNames.reduce((data, name) => {
		data[name] = formData.get(name);
		return data;
	}, {});

	const response = await fetch(`/api/feedback`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	}).catch(console.error);

	if (response.ok) {
		formNode.reset();
	}
}

function render(renderNode, result, { statusError }) {
	const containsStatus = renderNode.classList.contains(statusError);

	if (result !== "OK" && !containsStatus) {
		renderNode.textContent = result;
		renderNode.classList.add(statusError);
	} else if (result !== "OK" && containsStatus) {
		renderNode.textContent = result;
	} else if (result === "OK" && containsStatus) {
		renderNode.textContent = "";
		renderNode.classList.remove(statusError);
	}
	return result;
}
