function domSelect(selector) {
	const elements = document.querySelectorAll(selector)
	return elements.length == 1 ? elements[0] : elements
}

function getSelectedRadioValue(fieldname) {
	let i, len, radio
	const elements = domSelect(`[name='${fieldname}']`)
	for (i = 0, len = elements.length; i < len; i++) {
		radio = elements[i]
		if (radio.checked) {
			return radio.value
		}
	}
}

function domSelectAll(selector) {
	return document.querySelectorAll(selector)
}

export { domSelect, domSelectAll, getSelectedRadioValue }
