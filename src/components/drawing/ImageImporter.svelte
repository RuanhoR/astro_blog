<script>
	import { i18n } from "../../i18n/translation";
	import Key from "../../i18n/i18nKey";

	function handleImageChange(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const image = e.target.result;
				window.dispatchEvent(new CustomEvent('imageImport', { detail: image }));
			};
			reader.readAsDataURL(file);
		}
	}
</script>

<div class="image-importer">
	<label>{i18n(Key.imageImport)}</label>
	<input type="file" accept="image/*" on:change={handleImageChange} />
</div>

<style>
	.image-importer {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>