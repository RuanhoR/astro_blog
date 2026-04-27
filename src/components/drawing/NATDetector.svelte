<script>
	import { i18n } from "../../i18n/translation";
	import Key from "../../i18n/i18nKey";

	let natResult = '';

	async function detectNAT() {
		try {
			const pc = new RTCPeerConnection({ iceServers: [] });
			let natType = 'Unknown';

			pc.onicecandidate = (event) => {
				if (event.candidate) {
					const candidate = event.candidate.candidate;
					if (candidate.includes('srflx')) {
						natType = 'Symmetric NAT';
					} else if (candidate.includes('host')) {
						natType = 'No NAT';
					} else {
						natType = 'Full Cone NAT';
					}
				}
			};

			pc.createDataChannel('test');
			const offer = await pc.createOffer();
			await pc.setLocalDescription(offer);

			// Wait a bit for ICE candidates
			setTimeout(() => {
				natResult = `NAT Type: ${natType}`;
				window.dispatchEvent(new CustomEvent('natResult', { detail: natType }));
				pc.close();
			}, 2000);
		} catch (error) {
			natResult = 'Error detecting NAT';
		}
	}
</script>

<div class="nat-detector">
	<label>{i18n(Key.natDetection)}</label>
	<button on:click={detectNAT}>{i18n(Key.natDetection)}</button>
	<div>{natResult}</div>
</div>

<style>
	.nat-detector {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>