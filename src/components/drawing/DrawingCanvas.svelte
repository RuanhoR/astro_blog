<script>
	import { i18n } from "../../i18n/translation";
	import Key from "../../i18n/i18nKey";

	export let width = 800;
	export let height = 600;
	export let backgroundColor = '#ffffff';

	let svgElement;
	let isDrawing = false;
	let currentPath = null;
	let currentShape = 'free';
	let currentBrush = 'pen';
	let currentColor = '#000000';
	let startX = 0, startY = 0;
	let currentX = 0, currentY = 0;

	// Listen for events
	window.addEventListener('colorChange', (e) => {
		currentColor = e.detail;
	});
	window.addEventListener('brushChange', (e) => {
		currentBrush = e.detail;
	});
	window.addEventListener('shapeChange', (e) => {
		currentShape = e.detail;
	});
	window.addEventListener('imageImport', (e) => {
		const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
		img.setAttribute('href', e.detail);
		img.setAttribute('width', '200');
		img.setAttribute('height', '200');
		svgElement.appendChild(img);
	});

	function startDrawing(x, y) {
		isDrawing = true;
		startX = x;
		startY = y;
		currentX = x;
		currentY = y;

		if (currentShape === 'free') {
			currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			currentPath.setAttribute('stroke', currentBrush === 'eraser' ? backgroundColor : currentColor);
			currentPath.setAttribute('stroke-width', currentBrush === 'marker' ? '5' : '2');
			currentPath.setAttribute('fill', 'none');
			currentPath.setAttribute('d', `M ${startX} ${startY}`);
			svgElement.appendChild(currentPath);
		}
	}

	function draw(x, y) {
		if (!isDrawing) return;
		currentX = x;
		currentY = y;

		if (currentShape === 'free' && currentPath) {
			const d = currentPath.getAttribute('d') + ` L ${x} ${y}`;
			currentPath.setAttribute('d', d);
		}
	}

	function stopDrawing() {
		if (!isDrawing) return;
		isDrawing = false;

		if (currentShape !== 'free') {
			let element = null;
			const width = Math.abs(startX - currentX);
			const height = Math.abs(startY - currentY);

			switch (currentShape) {
				case 'rectangle':
					element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
					element.setAttribute('x', Math.min(startX, currentX));
					element.setAttribute('y', Math.min(startY, currentY));
					element.setAttribute('width', width);
					element.setAttribute('height', height);
					element.setAttribute('stroke', currentColor);
					element.setAttribute('fill', 'none');
					break;
				case 'circle':
					element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
					element.setAttribute('cx', startX);
					element.setAttribute('cy', startY);
					element.setAttribute('r', Math.sqrt(width**2 + height**2));
					element.setAttribute('stroke', currentColor);
					element.setAttribute('fill', 'none');
					break;
				case 'line':
					element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
					element.setAttribute('x1', startX);
					element.setAttribute('y1', startY);
					element.setAttribute('x2', currentX);
					element.setAttribute('y2', currentY);
					element.setAttribute('stroke', currentColor);
					break;
			}
			if (element) {
				svgElement.appendChild(element);
			}
		}

		currentPath = null;
	}

	function handleMouseDown(e) {
		const rect = svgElement.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		startDrawing(x, y);
	}

	function handleMouseMove(e) {
		const rect = svgElement.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		draw(x, y);
	}

	function handleTouchStart(e) {
		e.preventDefault();
		const touch = e.touches[0];
		const rect = svgElement.getBoundingClientRect();
		startX = touch.clientX - rect.left;
		startY = touch.clientY - rect.top;
		startDrawing(startX, startY);
	}

	function handleTouchMove(e) {
		e.preventDefault();
		const touch = e.touches[0];
		const rect = svgElement.getBoundingClientRect();
		const x = touch.clientX - rect.left;
		const y = touch.clientY - rect.top;
		draw(x, y);
	}

	function clearCanvas() {
		while (svgElement.firstChild) {
			svgElement.removeChild(svgElement.firstChild);
		}
	}

	function saveImage() {
		const serializer = new XMLSerializer();
		const svgString = serializer.serializeToString(svgElement);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			const link = document.createElement('a');
			link.download = 'drawing.png';
			link.href = canvas.toDataURL();
			link.click();
		};
		img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
	}
</script>

<div class="drawing-canvas">
	<svg bind:this={svgElement} {width} {height} style="background: {backgroundColor};" role="application" aria-label="Drawing canvas"
		on:mousedown={handleMouseDown}
		on:mousemove={handleMouseMove}
		on:mouseup={stopDrawing}
		on:mouseleave={stopDrawing}
		on:touchstart={handleTouchStart}
		on:touchmove={handleTouchMove}
		on:touchend={stopDrawing}
	>
		<!-- Drawing elements will be added here -->
	</svg>
	<div class="controls">
		<button on:click={clearCanvas}>{i18n(Key.clearCanvas)}</button>
		<button on:click={saveImage}>{i18n(Key.saveImage)}</button>
	</div>
</div>

<style>
	.drawing-canvas {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	.controls {
		display: flex;
		gap: 1rem;
	}
	button {
		padding: 0.5rem 1rem;
		background: #007acc;
		color: white;
		border: none;
		cursor: pointer;
	}
	button:hover {
		background: #005a99;
	}
</style>