<script>
	import { i18n } from "../../i18n/translation";
	import Key from "../../i18n/i18nKey";

	let selectedBrush = 'pen';

	const brushes = ['pen', 'marker', 'eraser'];

	function handleBrushClick(brush) {
		selectedBrush = brush;
		window.dispatchEvent(new CustomEvent('brushChange', { detail: brush }));
	}
</script>

<div class="brush-selector">
	<label>{i18n(Key.brushType)}</label>
	<div class="brushes">
		{#each brushes as brush}
			<button
				class="brush-btn {selectedBrush === brush ? 'active' : ''}"
				on:click={() => handleBrushClick(brush)}
			>
				{brush}
			</button>
		{/each}
	</div>
</div>

<style>
	.brush-selector {
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
	.brushes {
		display: flex;
		gap: 0.5rem;
	}
	.brush-btn {
		padding: 0.5rem 1rem;
		border: 2px solid #ccc;
		background: white;
		cursor: pointer;
		border-radius: 4px;
		font-size: 0.9rem;
		transition: all 0.2s;
	}
	.brush-btn:hover {
		border-color: #007acc;
		background: #f0f8ff;
	}
	.brush-btn.active {
		background: #007acc;
		color: white;
		border-color: #007acc;
	}
</style>