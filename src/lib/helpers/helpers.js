function domSelect(selector) {
	const elements = document.querySelectorAll(selector)
	return elements.length == 1 ? elements[0] : elements
}

function getSelectedRadioValue(fieldname) {
	const elements = $(`[name='${fieldname}']`)
	const selected = Array.from(elements).filter(radio => radio.checked)
	return selected.value
}

function domSelectAll(selector) {
	return document.querySelectorAll(selector)
}

export { domSelect, domSelectAll, getSelectedRadioValue }
