export class Validator {
	constructor(
		statusNodeSelector = ".form__status",
		statusErrorModifier = "form--error"
	) {
		this.statusNodeSelector = statusNodeSelector;
		this.statusErrorModifier = statusErrorModifier;
		this.validatorType = {
			name: this._nameValidator,
			email: this._emailValidator,
			message: this._messageValidator,
		};
	}

	validate(id, type) {
		const node = document.getElementById(id);
		const value = node.value.trim();
		const result = this.validatorType[type](value);
		const parent = node.parentNode;
		const statusNode = parent.querySelector(this.statusNodeSelector);
		return this._render(result, statusNode);
	}

	_render(result, statusNode) {
		const alreadyContainsStatus = statusNode.classList.contains(
			this.statusErrorModifier
		);
		if (result !== "OK" && !alreadyContainsStatus) {
			statusNode.textContent = result;
			statusNode.classList.add(this.statusErrorModifier);
		} else if (result !== "OK" && alreadyContainsStatus) {
			statusNode.textContent = result;
		} else if (result === "OK" && alreadyContainsStatus) {
			statusNode.textContent = "";
			statusNode.classList.remove(this.statusErrorModifier);
		}
		return result;
	}

	_nameValidator(value) {
		if (!value) {
			return "Обязательно для заполнения";
		}
		if (/^\s|\s$/.test(value)) {
			return "Нельзя начинать или заканчивать пробелами";
		}
		if (value.length < 2) {
			return "Слишком короткое";
		}
		if (value.length > 50) {
			return "Слишком длинное";
		}
		if (/\d/.test(value)) {
			return "Имя не должно содержать цифры";
		}
		if (!/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/.test(value)) {
			return "Недопустимые символы";
		}
		if (value.split(" ").length > 1) {
			return "Введите только одно имя";
		}
		return "OK";
	}

	_emailValidator(value) {
		const invalidFormat = "Формат некорректный.";
		if (!value) {
			return "Email не может быть пустым.";
		}
		if (!value.includes("@") || !value.includes(".")) {
			return invalidFormat;
		}
		const { 0: localPart, 1: domain } = value.split("@");
		if (localPart.length > 64) {
			return "Слишком длинное локальное имя";
		}
		if (domain.length > 255) {
			return "Слишком длинное доменное имя";
		}
		if (/^\./.test(domain) || /\.$/.test(domain) || /\.{2,}/.test(domain)) {
			return invalidFormat;
		}
		const emailRegex =
			/^(?:"[^\"]+"|[a-zA-Z0-9._%+-]+)@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(value)) {
			return invalidFormat;
		}
		return "OK";
	}

	_messageValidator(value) {
		const minLen = 10;
		const maxLen = 500;
		if (!value) {
			return "Поле не может быть пустым.";
		}
		if (value.length < minLen) {
			return `Сообщение не может быть короче ${minLen} символов.`;
		}
		if (value.length > maxLen) {
			return `Сообщение не может быть длиннее ${maxLen} символов.`;
		}

		const forbiddenCharsRegex = /[<>]/;
		if (forbiddenCharsRegex.test(value)) {
			return "Текст содержит недопустимые символы.";
		}
		return "OK";
	}
}
