<script>
	import { i18n } from "../../i18n/translation";
	import Key from "../../i18n/i18nKey";

	export let selectedColor = '#000000';

	function handleColorChange(event) {
		const color = event.target.value;
		window.dispatchEvent(new CustomEvent('colorChange', { detail: color }));
	}
</script>

<div class="color-picker">
	<label>{i18n(Key.colorPicker)}</label>
	<input type="color" value={selectedColor} on:change={handleColorChange} />
</div>

<style>
	.color-picker {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}
	label {
		font-weight: bold;
		color: #333;
		font-size: 0.9rem;
	}
	input[type="color"] {
		width: 50px;
		height: 50px;
		border: 2px solid #ccc;
		border-radius: 4px;
		cursor: pointer;
	}
	input[type="color"]:hover {
		border-color: #007acc;
	}
</style>