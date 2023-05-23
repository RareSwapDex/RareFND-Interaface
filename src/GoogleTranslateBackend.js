class GoogleTranslateBackend {
	constructor(options) {
		this.options = options;
	}

	read(language, namespace, callback) {
		const apiKey = process.env.REACT_APP_CLOUD_TRANSLATION_API; // Replace with your API key
		const sourceLanguage = this.options.defaultLanguage;
		const targetLanguage = language;
		const sourceTexts = Object.values(
			this.options.resources[sourceLanguage][namespace]
		);

		const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
		const requestBody = {
			q: sourceTexts,
			target: targetLanguage,
			source: sourceLanguage,
			format: "text",
		};

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		})
			.then((response) => response.json())
			.then((data) => {
				const translatedTexts = data.data.translations.map(
					(t) => t.translatedText
				);
				const translationObject = {};
				Object.keys(this.options.resources[sourceLanguage][namespace]).forEach(
					(key, index) => {
						translationObject[key] = translatedTexts[index];
					}
				);
				callback(null, translationObject);
			})
			.catch((error) => {
				callback(error, null);
			});
	}
}

export default GoogleTranslateBackend;
