<script>
	import { i18n } from "../../i18n/translation";
	import Key from "../../i18n/i18nKey";

	let selectedShape = 'free';

	const shapes = ['line', 'rectangle', 'circle', 'free'];

	function handleShapeClick(shape) {
		selectedShape = shape;
		window.dispatchEvent(new CustomEvent('shapeChange', { detail: shape }));
	}
</script>

<div class="shape-selector">
	<label>{i18n(Key.shape)}</label>
	<div class="shapes">
		{#each shapes as shape}
			<button
				class="shape-btn {selectedShape === shape ? 'active' : ''}"
				on:click={() => handleShapeClick(shape)}
			>
				{shape}
			</button>
		{/each}
	</div>
</div>

<style>
	.shape-selector {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.shapes {
		display: flex;
		gap: 0.5rem;
	}
	.shape-btn {
		padding: 0.5rem;
		border: 1px solid #ccc;
		background: white;
		cursor: pointer;
	}
	.shape-btn.active {
		background: #007acc;
		color: white;
	}
</style>