(() => {

        // Custom cursor tracking
        const cursorImg = document.getElementById('cursor-img');



        // --- MOTION AVATAR AUDIO CONTEXT ---
        let avatarAudioCtx = null;

        // ==========================================
        // PROTOTYPE 2: MOTION AVATAR SYNTH
        // ==========================================
        const avatarCanvas = document.getElementById('avatar-canvas');
        const avatarCtx = avatarCanvas.getContext('2d');
        const avatarActivateBtn = document.getElementById('avatar-activate-btn');
        const avatarWorkspace = document.getElementById('avatar-workspace');
        const soundHelpBtn = document.getElementById('sound-help-btn');
        const soundFlowPopup = document.getElementById('sound-flow-popup');

        let avatarInitialized = false;

        if (soundHelpBtn && soundFlowPopup) {
            function setSoundFlowOpen(isOpen) {
                soundHelpBtn.classList.toggle('active', isOpen);
                soundFlowPopup.classList.toggle('active', isOpen);
                soundFlowPopup.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
            }

            ['pointerdown', 'mousedown', 'touchstart'].forEach(eventName => {
                soundHelpBtn.addEventListener(eventName, (e) => e.stopPropagation());
                soundFlowPopup.addEventListener(eventName, (e) => e.stopPropagation());
            });

            soundHelpBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                setSoundFlowOpen(!soundFlowPopup.classList.contains('active'));
            });

            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') setSoundFlowOpen(false);
            });
        }

        const randomBtn = document.getElementById('random-btn');
        let randomMovementActive = false;

        if (randomBtn) {
            randomBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                randomMovementActive = !randomMovementActive;
                randomBtn.classList.toggle('active', randomMovementActive);
                if (randomMovementActive) {
                    randomBtn.style.background = 'rgba(153, 220, 27, 0.18)';
                    randomBtn.style.color = '#ffffff';
                } else {
                    randomBtn.style.background = 'rgba(153, 220, 27, 0.05)';
                    randomBtn.style.color = 'var(--accent-neon)';
                    resetPosture();
                }
                if (avatarAudioCtx && avatarAudioCtx.state === 'suspended') {
                    avatarAudioCtx.resume();
                }
            });
        }

        const spinBtn = document.getElementById('spin-btn');
        let spinActive = false;
        let spinAngle = 0.0;

        if (spinBtn) {
            spinBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                spinActive = !spinActive;
                spinBtn.classList.toggle('active', spinActive);
                if (spinActive) {
                    spinBtn.style.background = 'rgba(95, 168, 211, 0.18)';
                    spinBtn.style.color = '#ffffff';
                } else {
                    spinBtn.style.background = 'rgba(95, 168, 211, 0.05)';
                    spinBtn.style.color = '#5fa8d3';
                    spinAngle = 0.0;
                }
                if (avatarAudioCtx && avatarAudioCtx.state === 'suspended') {
                    avatarAudioCtx.resume();
                }
            });
        }

        const caBtn = document.getElementById('ca-btn');
        let caSoundActive = false;
        let caDensityHold = 0;
        let caColumnActivityHold = 0;

        if (caBtn) {
            caBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                caSoundActive = !caSoundActive;
                caBtn.classList.toggle('active', caSoundActive);
                caBtn.style.color = caSoundActive ? '#ffffff' : '#fe4164';
                caGrid.fill(0);
                caNextGrid.fill(0);
                caIdleTicks = 0;
                caDensityHold = 0;
                caColumnActivityHold = 0;
                caColumn = 0;
                caLastStepTime = 0;
                if (caSoundActive) {
                    caSeedBand(0, 11, 28, 0);
                    caDensityHold = caGrid.reduce((sum, cell) => sum + cell, 0) / caGrid.length;
                    caColumnActivityHold = 0.35;
                }
                if (avatarAudioCtx && avatarAudioCtx.state === 'suspended') {
                    avatarAudioCtx.resume();
                }
            });
        }

        function deactivateRandomMovement() {
            if (randomMovementActive) {
                randomMovementActive = false;
                if (randomBtn) {
                    randomBtn.classList.remove('active');
                    randomBtn.style.background = 'rgba(153, 220, 27, 0.05)';
                    randomBtn.style.color = 'var(--accent-neon)';
                }
            }
        }

        function makeDistortionCurve(amount) {
            const k = typeof amount === 'number' ? amount : 50;
            const n_samples = 44100;
            const curve = new Float32Array(n_samples);
            const deg = Math.PI / 180;
            for (let i = 0; i < n_samples; ++i) {
                const x = (i * 2) / n_samples - 1;
                curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
            }
            return curve;
        }

        let avatarCarrier;
        let avatarModulator;
        let avatarModGain;
        let avatarSubBass;
        let avatarNoiseNode;
        let avatarNoiseFilter;
        let avatarNoiseHighpass;
        let avatarNoiseGain;
        let avatarFilter;
        let avatarHighpass;
        let avatarWaveshaper;
        let avatarMainGain;
        let avatarPanner;
        let avatarDelay;
        let avatarDelayFeedback;
        let avatarDroneGain;

        let arpeggioJoints = [];
        const caRows = 12;
        const caCols = 16;
        let caGrid = new Uint8Array(caRows * caCols);
        let caNextGrid = new Uint8Array(caRows * caCols);
        let caColumn = 0;
        let caLastStepTime = 0;
        let caIdleTicks = 0;

        function caIndex(row, col) {
            return row * caCols + ((col + caCols) % caCols);
        }

        function caSeedBand(rowStart, rowEnd, amount, centerCol = caColumn) {
            for (let i = 0; i < amount; i++) {
                const row = rowStart + Math.floor(Math.random() * (rowEnd - rowStart + 1));
                const col = centerCol + Math.floor(Math.random() * 5) - 2;
                caGrid[caIndex(row, col)] = 1;
            }
        }

        function caCountNeighbors(row, col) {
            let count = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    const rr = row + dy;
                    if (rr < 0 || rr >= caRows) continue;
                    count += caGrid[caIndex(rr, col + dx)];
                }
            }
            return count;
        }

        function caEvolve() {
            for (let row = 0; row < caRows; row++) {
                for (let col = 0; col < caCols; col++) {
                    const idx = caIndex(row, col);
                    const alive = caGrid[idx] === 1;
                    const neighbors = caCountNeighbors(row, col);
                    caNextGrid[idx] = (alive && (neighbors === 2 || neighbors === 3)) || (!alive && neighbors === 3) ? 1 : 0;
                }
            }
            const swap = caGrid;
            caGrid = caNextGrid;
            caNextGrid = swap;
        }

        function caHasLife() {
            return caGrid.some(cell => cell === 1);
        }

        function initAvatarAudio() {
            if (avatarAudioCtx) return;
            avatarAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

            avatarCarrier = avatarAudioCtx.createOscillator();
            avatarModulator = avatarAudioCtx.createOscillator();
            avatarModGain = avatarAudioCtx.createGain();

            avatarSubBass = avatarAudioCtx.createOscillator();
            avatarSubBass.type = 'sine';
            avatarSubBass.frequency.setValueAtTime(55, avatarAudioCtx.currentTime); 

            const bufferSize = 2 * avatarAudioCtx.sampleRate;
            const noiseBuffer = avatarAudioCtx.createBuffer(1, bufferSize, avatarAudioCtx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            avatarNoiseNode = avatarAudioCtx.createBufferSource();
            avatarNoiseNode.buffer = noiseBuffer;
            avatarNoiseNode.loop = true;

            avatarNoiseFilter = avatarAudioCtx.createBiquadFilter();
            avatarNoiseFilter.type = 'bandpass';
            avatarNoiseFilter.frequency.setValueAtTime(600, avatarAudioCtx.currentTime);
            avatarNoiseFilter.Q.setValueAtTime(4.0, avatarAudioCtx.currentTime);

            avatarNoiseHighpass = avatarAudioCtx.createBiquadFilter();
            avatarNoiseHighpass.type = 'highpass';
            avatarNoiseHighpass.frequency.setValueAtTime(900, avatarAudioCtx.currentTime);
            avatarNoiseHighpass.Q.setValueAtTime(0.9, avatarAudioCtx.currentTime);

            avatarNoiseGain = avatarAudioCtx.createGain();
            avatarNoiseGain.gain.setValueAtTime(0, avatarAudioCtx.currentTime);

            avatarWaveshaper = avatarAudioCtx.createWaveShaper();
            avatarWaveshaper.curve = makeDistortionCurve(35);
            avatarWaveshaper.oversample = '4x';

            avatarFilter = avatarAudioCtx.createBiquadFilter();
            avatarFilter.type = 'lowpass';
            avatarFilter.Q.setValueAtTime(2.0, avatarAudioCtx.currentTime);

            avatarHighpass = avatarAudioCtx.createBiquadFilter();
            avatarHighpass.type = 'highpass';
            avatarHighpass.frequency.setValueAtTime(28, avatarAudioCtx.currentTime);
            avatarHighpass.Q.setValueAtTime(0.7, avatarAudioCtx.currentTime);

            avatarDelay = avatarAudioCtx.createDelay(1.0);
            avatarDelayFeedback = avatarAudioCtx.createGain();
            avatarDelay.delayTime.setValueAtTime(0.3, avatarAudioCtx.currentTime);
            avatarDelayFeedback.gain.setValueAtTime(0.35, avatarAudioCtx.currentTime);

            avatarMainGain = avatarAudioCtx.createGain();
            avatarMainGain.gain.setValueAtTime(0, avatarAudioCtx.currentTime);

            avatarPanner = avatarAudioCtx.createStereoPanner();
            avatarPanner.pan.setValueAtTime(0.0, avatarAudioCtx.currentTime);

            avatarModulator.connect(avatarModGain);
            avatarModGain.connect(avatarCarrier.frequency);

            avatarCarrier.connect(avatarWaveshaper);
            
            const mixerNode = avatarAudioCtx.createGain();
            
            // Gain nodes to keep continuous drone elements soft and balanced (set to 30% volume)
            avatarDroneGain = avatarAudioCtx.createGain();
            const subBassVolumeGain = avatarAudioCtx.createGain();
            avatarDroneGain.gain.setValueAtTime(0.30, avatarAudioCtx.currentTime);
            subBassVolumeGain.gain.setValueAtTime(0.30, avatarAudioCtx.currentTime);
            
            avatarWaveshaper.connect(avatarDroneGain);
            avatarDroneGain.connect(mixerNode);
            avatarSubBass.connect(subBassVolumeGain);
            subBassVolumeGain.connect(mixerNode);
            
            avatarNoiseNode.connect(avatarNoiseFilter);
            avatarNoiseFilter.connect(avatarNoiseHighpass);
            avatarNoiseHighpass.connect(avatarNoiseGain);
            avatarNoiseGain.connect(mixerNode);

            mixerNode.connect(avatarFilter);
            avatarFilter.connect(avatarHighpass);
            avatarHighpass.connect(avatarMainGain);

            avatarMainGain.connect(avatarPanner);
            avatarPanner.connect(avatarAudioCtx.destination);

            avatarMainGain.connect(avatarDelay);
            avatarDelay.connect(avatarDelayFeedback);
            avatarDelayFeedback.connect(avatarDelay);
            avatarDelay.connect(avatarAudioCtx.destination);

            // Continuous "haunted" FM drone synth carrier configuration
            avatarCarrier.type = 'sawtooth';
            avatarModulator.type = 'sine';
            avatarCarrier.frequency.setValueAtTime(110, avatarAudioCtx.currentTime);
            avatarModulator.frequency.setValueAtTime(55, avatarAudioCtx.currentTime);
            avatarModGain.gain.setValueAtTime(0, avatarAudioCtx.currentTime);

            avatarCarrier.start();
            avatarModulator.start();
            avatarSubBass.start();
            avatarNoiseNode.start();

            // Initialize arpeggio joints tracking for all 12 interactive nodes (with stepIndex tracking)
            arpeggioJoints = [
                { name: 'head',          lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.headDragX**2 + state.headDragY**2), getX: () => state.headDragX, getY: () => state.headDragY, pos: () => ({ x: headX, y: headY }) },
                { name: 'leftHand',      lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.lHandDragX**2 + state.lHandDragY**2), getX: () => state.lHandDragX, getY: () => state.lHandDragY, pos: () => ({ x: leftHand.x, y: leftHand.y }) },
                { name: 'rightHand',     lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.rHandDragX**2 + state.rHandDragY**2), getX: () => state.rHandDragX, getY: () => state.rHandDragY, pos: () => ({ x: rightHand.x, y: rightHand.y }) },
                { name: 'leftFoot',      lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.lFootDragX**2 + state.lFootDragY**2), getX: () => state.lFootDragX, getY: () => state.lFootDragY, pos: () => ({ x: leftFoot.x, y: leftFoot.y }) },
                { name: 'rightFoot',     lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.rFootDragX**2 + state.rFootDragY**2), getX: () => state.rFootDragX, getY: () => state.rFootDragY, pos: () => ({ x: rightFoot.x, y: rightFoot.y }) },
                { name: 'pelvis',        lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.pelvisDragX**2 + state.pelvisDragY**2), getX: () => state.pelvisDragX, getY: () => state.pelvisDragY, pos: () => ({ x: pelvisX, y: pelvisY }) },
                { name: 'shoulderLeft',  lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.lShoulderDragX**2 + state.lShoulderDragY**2), getX: () => state.lShoulderDragX, getY: () => state.lShoulderDragY, pos: () => ({ x: shoulderLeft.x, y: shoulderLeft.y }) },
                { name: 'shoulderRight', lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.rShoulderDragX**2 + state.rShoulderDragY**2), getX: () => state.rShoulderDragX, getY: () => state.rShoulderDragY, pos: () => ({ x: shoulderRight.x, y: shoulderRight.y }) },
                { name: 'leftElbow',     lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.lElbowDragX**2 + state.lElbowDragY**2), getX: () => state.lElbowDragX, getY: () => state.lElbowDragY, pos: () => ({ x: leftElbow.x, y: leftElbow.y }) },
                { name: 'rightElbow',    lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.rElbowDragX**2 + state.rElbowDragY**2), getX: () => state.rElbowDragX, getY: () => state.rElbowDragY, pos: () => ({ x: rightElbow.x, y: rightElbow.y }) },
                { name: 'leftKnee',      lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.lKneeDragX**2 + state.lKneeDragY**2), getX: () => state.lKneeDragX, getY: () => state.lKneeDragY, pos: () => ({ x: leftKnee.x, y: leftKnee.y }) },
                { name: 'rightKnee',     lastTime: 0, stepIndex: 0, getVal: () => Math.sqrt(state.rKneeDragX**2 + state.rKneeDragY**2), getX: () => state.rKneeDragX, getY: () => state.rKneeDragY, pos: () => ({ x: rightKnee.x, y: rightKnee.y }) }
            ];
        }

        function playSynthPluck(freq, tension, time, jointX, type) {
            if (!avatarAudioCtx) return;
            
            // Defensive validation to prevent Web Audio exceptions
            const safeFreq = (isNaN(freq) || freq <= 0 || !isFinite(freq)) ? 440 : freq;
            const safeTension = (isNaN(tension) || tension < 0) ? 0 : Math.min(1.0, tension);
            const safeTime = (isNaN(time) || time < 0) ? avatarAudioCtx.currentTime : time;
            
            // 1. Create detuned carriers for premium analog chorus width
            const osc1 = avatarAudioCtx.createOscillator();
            const osc2 = avatarAudioCtx.createOscillator();
            
            // 2. Create sub oscillator for heavy low anchor
            const sub = avatarAudioCtx.createOscillator();
            
            // 3. Create dynamic low-pass filter per voice for subtractive filter envelope sweep
            const voiceFilter = avatarAudioCtx.createBiquadFilter();
            voiceFilter.type = 'lowpass';
            
            const oscGain = avatarAudioCtx.createGain();
            const panner = avatarAudioCtx.createStereoPanner();
            
            // Apply detuning to fat-up the sound
            osc1.detune.setValueAtTime(-9, safeTime);
            osc2.detune.setValueAtTime(9, safeTime);
            
            let decay = 0.15 + (1.0 - safeTension) * 0.35;
            
            if (type === 'hand') {
                // Bright, fat analog lead pluck (detuned sawtooth + triangle)
                osc1.type = 'sawtooth';
                osc2.type = 'triangle';
                
                let playFreq = safeFreq;
                if (safeTension > 0.35 && Math.random() < safeTension * 0.22) {
                    const glitches = [0.5, 2.0, 1.33, 4.0];
                    playFreq = safeFreq * glitches[Math.floor(Math.random() * glitches.length)];
                }
                osc1.frequency.setValueAtTime(playFreq, safeTime);
                osc2.frequency.setValueAtTime(playFreq, safeTime);
                
                sub.type = 'sine';
                sub.frequency.setValueAtTime(playFreq * 0.5, safeTime);
                
                // Dynamic Filter envelope sweep (rises with tension, sweeps down on note-on)
                const peakCutoff = 1800 + (safeTension * 2200);
                voiceFilter.frequency.setValueAtTime(peakCutoff, safeTime);
                voiceFilter.frequency.exponentialRampToValueAtTime(320, safeTime + 0.18);
                voiceFilter.Q.setValueAtTime(4.0, safeTime);
                
                // Dynamic stutter gate envelopes (Ableton-style note choke)
                if (safeTension > 0.40 && Math.random() < safeTension * 0.20) {
                    decay = 0.015; // choked click/glitch
                }
                
                oscGain.gain.setValueAtTime(0, safeTime);
                oscGain.gain.linearRampToValueAtTime(0.26, safeTime + 0.003); // loud chimes
                oscGain.gain.exponentialRampToValueAtTime(0.001, safeTime + decay);
            } 
            else if (type === 'leg') {
                // Heavy detuned analog bass pluck (sawtooth + triangle)
                osc1.type = 'sawtooth';
                osc2.type = 'triangle';
                
                const playFreq = safeFreq * 0.5; // octave drop
                osc1.frequency.setValueAtTime(playFreq, safeTime);
                osc2.frequency.setValueAtTime(playFreq, safeTime);
                
                sub.type = 'sine';
                sub.frequency.setValueAtTime(playFreq * 0.5, safeTime);
                
                // Punchy low-frequency sweep
                voiceFilter.frequency.setValueAtTime(950, safeTime);
                voiceFilter.frequency.exponentialRampToValueAtTime(75, safeTime + 0.26);
                voiceFilter.Q.setValueAtTime(3.0, safeTime);
                
                decay = 0.22 + (1.0 - safeTension) * 0.55; // long warm decay
                oscGain.gain.setValueAtTime(0, safeTime);
                oscGain.gain.linearRampToValueAtTime(0.38, safeTime + 0.006); // louder deep bass
                oscGain.gain.exponentialRampToValueAtTime(0.001, safeTime + decay);
            } 
            else {
                // Resonant mid-range bell tine pad (dual triangle carriers)
                osc1.type = 'triangle';
                osc2.type = 'triangle';
                
                osc1.frequency.setValueAtTime(safeFreq, safeTime);
                osc2.frequency.setValueAtTime(safeFreq, safeTime);
                
                sub.type = 'sine';
                sub.frequency.setValueAtTime(safeFreq * 0.5, safeTime);
                
                // Soft bell-like filter sweep
                voiceFilter.frequency.setValueAtTime(1400, safeTime);
                voiceFilter.frequency.exponentialRampToValueAtTime(180, safeTime + 0.20);
                voiceFilter.Q.setValueAtTime(2.0, safeTime);
                
                decay = 0.18 + (1.0 - safeTension) * 0.35;
                oscGain.gain.setValueAtTime(0, safeTime);
                oscGain.gain.linearRampToValueAtTime(0.32, safeTime + 0.004); // louder mid bells
                oscGain.gain.exponentialRampToValueAtTime(0.001, safeTime + decay);
            }
            
            // Dynamic Spatial Panning based on joint X coordinate
            const panVal = Math.max(-1.0, Math.min(1.0, (jointX / renderWidth) * 2.0 - 1.0));
            panner.pan.setValueAtTime(panVal, safeTime);
            
            // Audio node routing
            osc1.connect(voiceFilter);
            osc2.connect(voiceFilter);
            sub.connect(oscGain);
            
            voiceFilter.connect(oscGain);
            oscGain.connect(panner);
            panner.connect(avatarFilter);
            
            // Start and schedule stop
            osc1.start(safeTime);
            osc2.start(safeTime);
            sub.start(safeTime);
            
            osc1.stop(safeTime + decay + 0.1);
            osc2.stop(safeTime + decay + 0.1);
            sub.stop(safeTime + decay + 0.1);
        }

        let lastImpactTime = 0;

        function triggerBassImpact(time) {
            if (!avatarAudioCtx) return;
            
            const osc = avatarAudioCtx.createOscillator();
            const gain = avatarAudioCtx.createGain();
            
            // Sub bass pitch drop (sine kick thump)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(90, time);
            osc.frequency.exponentialRampToValueAtTime(32, time + 0.18);
            
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.35, time + 0.005);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.40);
            
            osc.connect(gain);
            gain.connect(avatarFilter);
            
            osc.start(time);
            osc.stop(time + 0.45);
        }

        function triggerGlitchClick(time) {
            if (!avatarAudioCtx) return;
            
            const osc = avatarAudioCtx.createOscillator();
            const gain = avatarAudioCtx.createGain();
            
            osc.type = 'sine';
            const pitch = 2200 + Math.random() * 4500; // high frequency static clicks
            osc.frequency.setValueAtTime(pitch, time);
            
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.05, time + 0.001);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.012);
            
            osc.connect(gain);
            gain.connect(avatarFilter);
            
            osc.start(time);
            osc.stop(time + 0.02);
        }

        const state = {
            neckAngle: 0.0,
            spineAngle: 0.0,
            leftArmOffset: 0.0,
            rightArmOffset: 0.0,
            leftLegOffset: 0.0,
            rightLegOffset: 0.0,
            
            headDragX: 0.0, headDragY: 0.0,
            lHandDragX: 0.0, lHandDragY: 0.0,
            rHandDragX: 0.0, rHandDragY: 0.0,
            lFootDragX: 0.0, lFootDragY: 0.0,
            rFootDragX: 0.0, rFootDragY: 0.0,
            pelvisDragX: 0.0, pelvisDragY: 0.0,
            lShoulderDragX: 0.0, lShoulderDragY: 0.0,
            rShoulderDragX: 0.0, rShoulderDragY: 0.0,
            lElbowDragX: 0.0, lElbowDragY: 0.0,
            rElbowDragX: 0.0, rElbowDragY: 0.0,
            lKneeDragX: 0.0, lKneeDragY: 0.0,
            rKneeDragX: 0.0, rKneeDragY: 0.0,
            activeCount: 0,
            wobbleSpeed: 1.0
        };

        const keysState = {
            Digit1: false, Digit2: false, Digit3: false, Digit4: false, Digit5: false, Digit6: false,
            ShiftLeft: false, ShiftRight: false
        };

        const keyHoldTimes = { Digit1: 0.0, Digit2: 0.0, Digit3: 0.0, Digit4: 0.0, Digit5: 0.0, Digit6: 0.0 };

        function getExtremeMultiplier() {
            return (keysState.ShiftLeft || keysState.ShiftRight) ? 1.75 : 1.0;
        }

        window.addEventListener('keydown', (e) => {
            if (e.code in keysState) {
                deactivateRandomMovement();
                keysState[e.code] = true;
                highlightKeyTags();
            }

            if (e.code === 'KeyR') {
                deactivateRandomMovement();
                resetPosture();
            }

            if (avatarAudioCtx && avatarAudioCtx.state === 'suspended') {
                avatarAudioCtx.resume();
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code in keysState) {
                keysState[e.code] = false;
                highlightKeyTags();
            }
        });

        function resetPosture() {
            state.neckAngle = 0;
            state.spineAngle = 0;
            state.leftArmOffset = 0;
            state.rightArmOffset = 0;
            state.leftLegOffset = 0;
            state.rightLegOffset = 0;
            
            state.headDragX = 0; state.headDragY = 0;
            state.lHandDragX = 0; state.lHandDragY = 0;
            state.rHandDragX = 0; state.rHandDragY = 0;
            state.lFootDragX = 0; state.lFootDragY = 0;
            state.rFootDragX = 0; state.rFootDragY = 0;
            state.pelvisDragX = 0; state.pelvisDragY = 0;
            state.lShoulderDragX = 0; state.lShoulderDragY = 0;
            state.rShoulderDragX = 0; state.rShoulderDragY = 0;
            state.lElbowDragX = 0; state.lElbowDragY = 0;
            state.rElbowDragX = 0; state.rElbowDragY = 0;
            state.lKneeDragX = 0; state.lKneeDragY = 0;
            state.rKneeDragX = 0; state.rKneeDragY = 0;
        }

        function highlightKeyTags() {
            const t1 = document.getElementById('tag-1');
            const t2 = document.getElementById('tag-2');
            const t3 = document.getElementById('tag-3');
            const t4 = document.getElementById('tag-4');
            const t5 = document.getElementById('tag-5');
            const t6 = document.getElementById('tag-6');
            const ts = document.getElementById('tag-shift');

            if (t1) t1.classList.toggle('active', keysState.Digit1);
            if (t2) t2.classList.toggle('active', keysState.Digit2);
            if (t3) t3.classList.toggle('active', keysState.Digit3);
            if (t4) t4.classList.toggle('active', keysState.Digit4);
            if (t5) t5.classList.toggle('active', keysState.Digit5);
            if (t6) t6.classList.toggle('active', keysState.Digit6);
            if (ts) ts.classList.toggle('active', keysState.ShiftLeft || keysState.ShiftRight);
        }

        const numHairStrands = 14; 
        const hairStrandLength = 15; 
        const hairPoints = [];
        for (let s = 0; s < numHairStrands; s++) {
            const strand = [];
            for (let i = 0; i < hairStrandLength; i++) {
                strand.push({ x: 375, y: 150, px: 375, py: 150 });
            }
            hairPoints.push(strand);
        }

        let headX = 375, headY = 150;
        let pelvisX = 375, pelvisY = 320;
        let leftHand = { x: 325, y: 280 };
        let rightHand = { x: 425, y: 280 };
        let leftFoot = { x: 345, y: 440 };
        let rightFoot = { x: 405, y: 440 };

        let shoulderLeft = { x: 355, y: 180 };
        let shoulderRight = { x: 395, y: 180 };
        let leftElbow = { x: 335, y: 220 };
        let rightElbow = { x: 415, y: 220 };
        let leftKnee = { x: 345, y: 380 };
        let rightKnee = { x: 405, y: 380 };

        const draggedJoints = new Map();

        function findDragTarget(e) {
            if (!avatarInitialized) return null;
            const rect = avatarCanvas.getBoundingClientRect();
            const mx = (e.clientX - rect.left) * (renderWidth / rect.width);
            const my = (e.clientY - rect.top) * (renderHeight / rect.height);

            const targets = [
                { name: 'head', x: headX, y: headY },
                { name: 'leftHand', x: leftHand.x, y: leftHand.y },
                { name: 'rightHand', x: rightHand.x, y: rightHand.y },
                { name: 'leftFoot', x: leftFoot.x, y: leftFoot.y },
                { name: 'rightFoot', x: rightFoot.x, y: rightFoot.y },
                { name: 'pelvis', x: pelvisX, y: pelvisY },
                { name: 'shoulderLeft', x: shoulderLeft.x, y: shoulderLeft.y },
                { name: 'shoulderRight', x: shoulderRight.x, y: shoulderRight.y },
                { name: 'leftElbow', x: leftElbow.x, y: leftElbow.y },
                { name: 'rightElbow', x: rightElbow.x, y: rightElbow.y },
                { name: 'leftKnee', x: leftKnee.x, y: leftKnee.y },
                { name: 'rightKnee', x: rightKnee.x, y: rightKnee.y }
            ];

            let minDist = 35; 
            let targetJoint = null;
            for (let t of targets) {
                let dist = Math.sqrt((mx - t.x)**2 + (my - t.y)**2);
                if (dist < minDist) {
                    minDist = dist;
                    targetJoint = t.name;
                    deactivateRandomMovement();
                }
            }
            return targetJoint;
        }

        function dragSelectedJoint(e) {
            const draggedJoint = draggedJoints.get(e.pointerId);
            if (!draggedJoint) return false;
            const rect = avatarCanvas.getBoundingClientRect();
            const mx = (e.clientX - rect.left) * (renderWidth / rect.width);
            const my = (e.clientY - rect.top) * (renderHeight / rect.height);

            if (draggedJoint === 'head') {
                state.headDragX += mx - headX;
                state.headDragY += my - headY;
            } else if (draggedJoint === 'leftHand') {
                state.lHandDragX += mx - leftHand.x;
                state.lHandDragY += my - leftHand.y;
            } else if (draggedJoint === 'rightHand') {
                state.rHandDragX += mx - rightHand.x;
                state.rHandDragY += my - rightHand.y;
            } else if (draggedJoint === 'leftFoot') {
                state.lFootDragX += mx - leftFoot.x;
                state.lFootDragY += my - leftFoot.y;
            } else if (draggedJoint === 'rightFoot') {
                state.rFootDragX += mx - rightFoot.x;
                state.rFootDragY += my - rightFoot.y;
            } else if (draggedJoint === 'pelvis') {
                state.pelvisDragX += mx - pelvisX;
                state.pelvisDragY += my - pelvisY;
            } else if (draggedJoint === 'shoulderLeft') {
                state.lShoulderDragX += mx - shoulderLeft.x;
                state.lShoulderDragY += my - shoulderLeft.y;
            } else if (draggedJoint === 'shoulderRight') {
                state.rShoulderDragX += mx - shoulderRight.x;
                state.rShoulderDragY += my - shoulderRight.y;
            } else if (draggedJoint === 'leftElbow') {
                state.lElbowDragX += mx - leftElbow.x;
                state.lElbowDragY += my - leftElbow.y;
            } else if (draggedJoint === 'rightElbow') {
                state.rElbowDragX += mx - rightElbow.x;
                state.rElbowDragY += my - rightElbow.y;
            } else if (draggedJoint === 'leftKnee') {
                state.lKneeDragX += mx - leftKnee.x;
                state.lKneeDragY += my - leftKnee.y;
            } else if (draggedJoint === 'rightKnee') {
                state.rKneeDragX += mx - rightKnee.x;
                state.rKneeDragY += my - rightKnee.y;
            }
            return true;
        }

        avatarCanvas.addEventListener('pointerdown', (e) => {
            moveCursor(e);
            const targetJoint = findDragTarget(e);
            if (targetJoint) {
                draggedJoints.set(e.pointerId, targetJoint);
                avatarCanvas.setPointerCapture(e.pointerId);
                cursorImg.classList.add('pressed');
                e.preventDefault();
            }
        });

        avatarCanvas.addEventListener('pointermove', (e) => {
            moveCursor(e);
            if (dragSelectedJoint(e)) e.preventDefault();
        });

        function releaseDraggedJoint(e) {
            if (e && draggedJoints.has(e.pointerId) && avatarCanvas.hasPointerCapture(e.pointerId)) {
                avatarCanvas.releasePointerCapture(e.pointerId);
            }
            if (e) draggedJoints.delete(e.pointerId);
            if (draggedJoints.size === 0) cursorImg.classList.remove('pressed');
        }

        avatarCanvas.addEventListener('pointerup', releaseDraggedJoint);
        avatarCanvas.addEventListener('pointercancel', releaseDraggedJoint);

        let renderWidth = 750;
        let renderHeight = 468;
        let statePulse = 0;

        avatarActivateBtn.addEventListener('click', () => {
            initAvatarAudio();
            avatarActivateBtn.style.display = 'none';
            avatarWorkspace.style.display = 'block';
            avatarInitialized = true;
            resizeAvatarCanvas();
            requestAnimationFrame(avatarUpdateLoop);
        });

        function resizeAvatarCanvas() {
            const rect = avatarCanvas.getBoundingClientRect();
            renderWidth = rect.width;
            renderHeight = rect.height;
            avatarCanvas.width = renderWidth;
            avatarCanvas.height = renderHeight;
        }
        window.addEventListener('resize', resizeAvatarCanvas);

        function avatarUpdateLoop() {
            if (avatarInitialized) {
                const rate = 0.04;
                const decay = 0.08;
                const maxVal = 1.0;
                const extremeMultiplier = getExtremeMultiplier();
                if (randomMovementActive) {
                    const time = statePulse * 0.25; 
                    state.neckAngle = 0.3 + Math.sin(time * 0.7) * 0.45;
                    state.spineAngle = 0.38 + Math.cos(time * 0.5) * 0.42;
                    state.leftArmOffset = 0.35 + Math.sin(time * 0.8) * 0.38;
                    state.rightArmOffset = 0.35 + Math.cos(time * 0.9) * 0.38;
                    state.leftLegOffset = 0.4 + Math.cos(time * 0.6) * 0.45;
                    state.rightLegOffset = 0.4 + Math.sin(time * 0.75) * 0.45;

                    state.headDragX = Math.sin(time * 0.4) * 85;
                    state.headDragY = Math.cos(time * 0.3) * 55 - 20;
                    state.lHandDragX = Math.sin(time * 0.6) * 95;
                    state.lHandDragY = Math.cos(time * 0.7) * 75;
                    state.rHandDragX = Math.cos(time * 0.5) * 95;
                    state.rHandDragY = Math.sin(time * 0.65) * 75;
                    state.lFootDragX = Math.sin(time * 0.45) * 85;
                    state.lFootDragY = Math.cos(time * 0.55) * 85;
                    state.rFootDragX = Math.cos(time * 0.4) * 85;
                    state.rFootDragY = Math.sin(time * 0.55) * 85;
                    state.pelvisDragX = Math.sin(time * 0.3) * 55;
                    state.pelvisDragY = Math.cos(time * 0.35) * 40;
                } else {
                    const numKeysHeld = (keysState.Digit1?1:0) + (keysState.Digit2?1:0) + (keysState.Digit3?1:0) + (keysState.Digit4?1:0) + (keysState.Digit5?1:0) + (keysState.Digit6?1:0);

                    if (keysState.Digit1) {
                        keyHoldTimes.Digit1 = Math.min(keyHoldTimes.Digit1 + 0.007, 1.0);
                        const amp = (1.0 + keyHoldTimes.Digit1 * 1.5) * extremeMultiplier;
                        state.neckAngle = Math.min(state.neckAngle + rate, maxVal * amp) + Math.sin(statePulse * 0.7) * 0.03 * amp;
                    } else {
                        keyHoldTimes.Digit1 = Math.max(keyHoldTimes.Digit1 - 0.03, 0.0);
                        state.neckAngle = Math.max(state.neckAngle - decay, 0.0);
                    }

                    if (keysState.Digit2) {
                        keyHoldTimes.Digit2 = Math.min(keyHoldTimes.Digit2 + 0.007, 1.0);
                        const amp = (1.0 + keyHoldTimes.Digit2 * 1.5) * extremeMultiplier;
                        state.leftLegOffset = Math.min(state.leftLegOffset + rate, maxVal * amp) + Math.cos(statePulse * 0.6) * 0.04 * amp;
                    } else {
                        keyHoldTimes.Digit2 = Math.max(keyHoldTimes.Digit2 - 0.03, 0.0);
                        state.leftLegOffset = Math.max(state.leftLegOffset - decay, 0.0);
                    }

                    if (keysState.Digit3) {
                        keyHoldTimes.Digit3 = Math.min(keyHoldTimes.Digit3 + 0.007, 1.0);
                        const amp = (1.0 + keyHoldTimes.Digit3 * 1.5) * extremeMultiplier;
                        state.rightLegOffset = Math.min(state.rightLegOffset + rate, maxVal * amp) + Math.sin(statePulse * 0.6) * 0.04 * amp;
                    } else {
                        keyHoldTimes.Digit3 = Math.max(keyHoldTimes.Digit3 - 0.03, 0.0);
                        state.rightLegOffset = Math.max(state.rightLegOffset - decay, 0.0);
                    }

                    if (keysState.Digit4) {
                        keyHoldTimes.Digit4 = Math.min(keyHoldTimes.Digit4 + 0.007, 1.0);
                        const amp = (1.0 + keyHoldTimes.Digit4 * 1.5) * extremeMultiplier;
                        state.leftArmOffset = Math.min(state.leftArmOffset + rate, maxVal * amp) + Math.sin(statePulse * 0.8) * 0.04 * amp;
                    } else {
                        keyHoldTimes.Digit4 = Math.max(keyHoldTimes.Digit4 - 0.03, 0.0);
                        state.leftArmOffset = Math.max(state.leftArmOffset - decay, 0.0);
                    }

                    if (keysState.Digit5) {
                        keyHoldTimes.Digit5 = Math.min(keyHoldTimes.Digit5 + 0.007, 1.0);
                        const amp = (1.0 + keyHoldTimes.Digit5 * 1.5) * extremeMultiplier;
                        state.rightArmOffset = Math.min(state.rightArmOffset + rate, maxVal * amp) + Math.cos(statePulse * 0.8) * 0.04 * amp;
                    } else {
                        keyHoldTimes.Digit5 = Math.max(keyHoldTimes.Digit5 - 0.03, 0.0);
                        state.rightArmOffset = Math.max(state.rightArmOffset - decay, 0.0);
                    }

                    if (keysState.Digit6) {
                        keyHoldTimes.Digit6 = Math.min(keyHoldTimes.Digit6 + 0.007, 1.0);
                        const amp = (1.0 + keyHoldTimes.Digit6 * 1.5) * extremeMultiplier;
                        state.spineAngle = Math.min(state.spineAngle + rate, maxVal * amp) + Math.cos(statePulse * 0.5) * 0.03 * amp;
                    } else {
                        keyHoldTimes.Digit6 = Math.max(keyHoldTimes.Digit6 - 0.03, 0.0);
                        state.spineAngle = Math.max(state.spineAngle - decay, 0.0);
                    }

                    if (numKeysHeld >= 2) {
                        const dancePulse = statePulse * 0.85;
                        state.pelvisDragX += Math.sin(dancePulse) * 0.8;
                        state.pelvisDragY += Math.cos(dancePulse * 0.8) * 0.5;

                        if (keysState.Digit2 && keysState.Digit4) {
                            state.lHandDragX += Math.sin(dancePulse) * 1.6;
                            state.lFootDragY += Math.cos(dancePulse * 1.1) * 1.6;
                        }
                        if (keysState.Digit3 && keysState.Digit5) {
                            state.rHandDragX += Math.cos(dancePulse) * 1.6;
                            state.rFootDragY += Math.sin(dancePulse * 1.1) * 1.6;
                        }
                        if (keysState.Digit2 && keysState.Digit3) {
                            state.lFootDragX += Math.sin(dancePulse) * 1.8;
                            state.rFootDragX -= Math.sin(dancePulse) * 1.8;
                        }
                        if (keysState.Digit4 && keysState.Digit5) {
                            state.lHandDragX += Math.sin(dancePulse) * 2.0;
                            state.lHandDragY += Math.cos(dancePulse) * 1.2;
                            state.rHandDragX -= Math.sin(dancePulse) * 2.0;
                            state.rHandDragY += Math.cos(dancePulse) * 1.2;
                        }
                        if (keysState.Digit1 && keysState.Digit6) {
                            state.headDragY += Math.sin(dancePulse * 0.5) * 2.2;
                        }
                    }

                    if (draggedJoints.size === 0) {
                        state.headDragX *= 0.92; state.headDragY *= 0.92;
                        state.lHandDragX *= 0.92; state.lHandDragY *= 0.92;
                        state.rHandDragX *= 0.92; state.rHandDragY *= 0.92;
                        state.lFootDragX *= 0.92; state.lFootDragY *= 0.92;
                        state.rFootDragX *= 0.92; state.rFootDragY *= 0.92;
                        state.pelvisDragX *= 0.92; state.pelvisDragY *= 0.92;
                        state.lShoulderDragX *= 0.92; state.lShoulderDragY *= 0.92;
                        state.rShoulderDragX *= 0.92; state.rShoulderDragY *= 0.92;
                        state.lElbowDragX *= 0.92; state.lElbowDragY *= 0.92;
                        state.rElbowDragX *= 0.92; state.rElbowDragY *= 0.92;
                        state.lKneeDragX *= 0.92; state.lKneeDragY *= 0.92;
                        state.rKneeDragX *= 0.92; state.rKneeDragY *= 0.92;
                    }
                }

                const maxDragDist = 120 * extremeMultiplier;
                state.headDragX = Math.max(Math.min(state.headDragX, maxDragDist), -maxDragDist);
                state.headDragY = Math.max(Math.min(state.headDragY, maxDragDist), -maxDragDist);
                state.lHandDragX = Math.max(Math.min(state.lHandDragX, maxDragDist), -maxDragDist);
                state.lHandDragY = Math.max(Math.min(state.lHandDragY, maxDragDist), -maxDragDist);
                state.rHandDragX = Math.max(Math.min(state.rHandDragX, maxDragDist), -maxDragDist);
                state.rHandDragY = Math.max(Math.min(state.rHandDragY, maxDragDist), -maxDragDist);
                state.lFootDragX = Math.max(Math.min(state.lFootDragX, maxDragDist), -maxDragDist);
                state.lFootDragY = Math.max(Math.min(state.lFootDragY, maxDragDist), -maxDragDist);
                state.rFootDragX = Math.max(Math.min(state.rFootDragX, maxDragDist), -maxDragDist);
                state.rFootDragY = Math.max(Math.min(state.rFootDragY, maxDragDist), -maxDragDist);
                state.pelvisDragX = Math.max(Math.min(state.pelvisDragX, maxDragDist), -maxDragDist);
                state.pelvisDragY = Math.max(Math.min(state.pelvisDragY, maxDragDist), -maxDragDist);
                state.lShoulderDragX = Math.max(Math.min(state.lShoulderDragX, maxDragDist), -maxDragDist);
                state.lShoulderDragY = Math.max(Math.min(state.lShoulderDragY, maxDragDist), -maxDragDist);
                state.rShoulderDragX = Math.max(Math.min(state.rShoulderDragX, maxDragDist), -maxDragDist);
                state.rShoulderDragY = Math.max(Math.min(state.rShoulderDragY, maxDragDist), -maxDragDist);
                state.lElbowDragX = Math.max(Math.min(state.lElbowDragX, maxDragDist), -maxDragDist);
                state.lElbowDragY = Math.max(Math.min(state.lElbowDragY, maxDragDist), -maxDragDist);
                state.rElbowDragX = Math.max(Math.min(state.rElbowDragX, maxDragDist), -maxDragDist);
                state.rElbowDragY = Math.max(Math.min(state.rElbowDragY, maxDragDist), -maxDragDist);
                state.lKneeDragX = Math.max(Math.min(state.lKneeDragX, maxDragDist), -maxDragDist);
                state.lKneeDragY = Math.max(Math.min(state.lKneeDragY, maxDragDist), -maxDragDist);
                state.rKneeDragX = Math.max(Math.min(state.rKneeDragX, maxDragDist), -maxDragDist);
                state.rKneeDragY = Math.max(Math.min(state.rKneeDragY, maxDragDist), -maxDragDist);

                const activeSum = state.neckAngle + state.spineAngle + state.leftArmOffset + state.rightArmOffset + state.leftLegOffset + state.rightLegOffset;
                const dragDistSum = 
                    Math.sqrt(state.headDragX**2 + state.headDragY**2) +
                    Math.sqrt(state.lHandDragX**2 + state.lHandDragY**2) +
                    Math.sqrt(state.rHandDragX**2 + state.rHandDragY**2) +
                    Math.sqrt(state.lFootDragX**2 + state.lFootDragY**2) +
                    Math.sqrt(state.rFootDragX**2 + state.rFootDragY**2) +
                    Math.sqrt(state.pelvisDragX**2 + state.pelvisDragY**2) +
                    Math.sqrt(state.lShoulderDragX**2 + state.lShoulderDragY**2) +
                    Math.sqrt(state.rShoulderDragX**2 + state.rShoulderDragY**2) +
                    Math.sqrt(state.lElbowDragX**2 + state.lElbowDragY**2) +
                    Math.sqrt(state.rElbowDragX**2 + state.rElbowDragY**2) +
                    Math.sqrt(state.lKneeDragX**2 + state.lKneeDragY**2) +
                    Math.sqrt(state.rKneeDragX**2 + state.rKneeDragY**2);
                
                const normTension = Math.min((activeSum * 0.18 + dragDistSum * 0.0025), 1.0);

                statePulse += 0.015;

                if (avatarAudioCtx) {
                    const now = avatarAudioCtx.currentTime;

                    function getPostureTension(name) {
                        if (name === 'head') return Math.abs(state.neckAngle) * 2.0;
                        if (name === 'pelvis' || name === 'shoulderLeft' || name === 'shoulderRight') return Math.abs(state.spineAngle) * 2.0;
                        if (name === 'leftHand' || name === 'leftElbow') return Math.abs(state.leftArmOffset) * 2.0;
                        if (name === 'rightHand' || name === 'rightElbow') return Math.abs(state.rightArmOffset) * 2.0;
                        if (name === 'leftFoot' || name === 'leftKnee') return Math.abs(state.leftLegOffset) * 2.0;
                        if (name === 'rightFoot' || name === 'rightKnee') return Math.abs(state.rightLegOffset) * 2.0;
                        return 0;
                    }

                    function getJointRole(name) {
                        if (name.includes('Hand') || name.includes('Elbow')) return 'hand';
                        if (name.includes('Foot') || name.includes('Knee')) return 'leg';
                        if (name === 'head') return 'head';
                        return 'spine';
                    }

                    function getJointTension(j) {
                        const dragDist = j.getVal();
                        return Math.min(1.0, Math.max(dragDist / 80.0, getPostureTension(j.name)));
                    }

                    const roleTensions = arpeggioJoints.reduce((roles, j) => {
                        const role = getJointRole(j.name);
                        roles[role] = Math.max(roles[role], getJointTension(j));
                        return roles;
                    }, { hand: 0, leg: 0, head: 0, spine: 0 });
                    const wholeBodyDensity = Math.min(1.0, activeSum * 0.12 + dragDistSum * 0.0018);
                    const tempoDensity = 0.65 + wholeBodyDensity * 0.70;
                    caDensityHold *= 0.96;
                    caColumnActivityHold *= 0.88;
                    let caDensity = caSoundActive ? Math.max(caDensityHold, caGrid.reduce((sum, cell) => sum + cell, 0) / caGrid.length) : 0;
                    let caColumnActivity = caSoundActive ? caColumnActivityHold : 0;

                    // 1. Dynamic Key Scaling: count active joints (displaced by drag or keyboard posture keys)
                    let activeCount = 0;
                    arpeggioJoints.forEach(j => {
                        let isJointActive = false;
                        
                        // Check mouse drag displacement
                        if (j.getVal() > 8.0) {
                            isJointActive = true;
                        }
                        
                        // Check keyboard posture key displacements
                        if (getPostureTension(j.name) > 0.05) isJointActive = true;
                        
                        if (isJointActive) activeCount++;
                    });
                    state.activeCount = activeCount;

                    // 2. Select Scale Pool based on activeCount (live chord progression logic - 12-tone ranges)
                    let scalePool = [
                        146.83, 164.81, 174.61, 196.00, 220.00, 261.63, 
                        293.66, 329.63, 349.23, 392.00, 440.00, 523.25
                    ]; // D minor (D3 to C5)
                    
                    if (activeCount >= 3 && activeCount <= 5) {
                        scalePool = [
                            196.00, 220.00, 233.08, 293.66, 329.63, 349.23, 
                            392.00, 440.00, 466.16, 587.33, 659.25, 698.46
                        ]; // G minor (G3 to F5)
	                    } else if (activeCount >= 6) {
	                        scalePool = [
	                            220.00, 246.94, 261.63, 293.66, 329.63, 392.00, 
	                            440.00, 493.88, 523.25, 587.33, 659.25, 783.99
	                        ]; // A minor (A3 to G5)
	                    }

	                    const rawIndex = Math.floor((activeSum * 1.5 + dragDistSum * 0.015));
	                    const scaleNoteIndex = isNaN(rawIndex) ? 0 : Math.max(0, Math.min(scalePool.length - 1, rawIndex));

		                    // 3. Schedule notes either directly from joints or through the cellular automata grid.
		                    if (!caSoundActive) {
		                    arpeggioJoints.forEach((j, idx) => {
		                        const tension = getJointTension(j);
		                        if (tension <= 0.05) return;
	                        const jointRole = getJointRole(j.name);
	                        const jointType = jointRole === 'leg' ? 'leg' : (jointRole === 'hand' ? 'hand' : 'body');
	                        let interval;
	                        let mults;
	                        if (jointRole === 'leg') {
	                            // Legs = slow bass/sub punctuation.
	                            interval = (0.72 + Math.pow(1.0 - tension, 2.0) * 1.65) / tempoDensity;
	                            mults = [0.5, 0.75, 1.0, 0.5, 1.25, 0.75];
	                        } else if (jointType === 'hand') {
	                            // Hands = melodic arpeggio.
	                            interval = (0.15 + Math.pow(1.0 - tension, 2.0) * 1.05) / tempoDensity;
                            // Up & Down: climbing to high harmonics, then walking back down
                            mults = [1.0, 1.5, 2.0, 2.5, 3.0, 2.5, 2.0, 1.5];
                            
                            // High tension Randomization (Ableton "Random" mode)
                            if (tension > 0.65) {
                                const randomMults = [1.0, 1.5, 2.0, 2.5, 3.0, 4.0];
                                const randIdx = Math.floor(Math.random() * randomMults.length);
                                mults = [randomMults[randIdx]];
                            }
                        } 
	                        else {
	                            // Spine/head = chord/root pulses.
	                            interval = (0.80 + Math.pow(1.0 - tension, 2.0) * 2.40) / tempoDensity;
                            // Pulsating chord swells
                            mults = [1.0, 1.2, 1.5, 1.25];
                        }

                        if (now - j.lastTime > interval) {
                            let baseFreq = scalePool[idx % scalePool.length];
                            if (jointRole === 'leg') {
                                baseFreq = (scalePool[scaleNoteIndex] || scalePool[0]) * 0.5;
                            } else if (jointRole === 'spine') {
                                baseFreq = scalePool[scaleNoteIndex] || scalePool[0];
                            }
                            const freq = baseFreq * mults[j.stepIndex % mults.length];
                            j.stepIndex++;

                            const visualPos = j.pos();
	                            playSynthPluck(freq, tension, now, visualPos.x, jointType);
	                            j.lastTime = now;
	                        }
	                    });
	                    } else {
		                        const seedAmount = Math.max(1, Math.floor(wholeBodyDensity * 5));
		                        if (roleTensions.hand > 0.06) caSeedBand(0, 5, seedAmount + Math.floor(roleTensions.hand * 5));
		                        if (roleTensions.spine > 0.06) caSeedBand(4, 8, seedAmount + Math.floor(roleTensions.spine * 4));
		                        if (roleTensions.leg > 0.06) caSeedBand(8, 11, seedAmount + Math.floor(roleTensions.leg * 5));
		                        if (roleTensions.head > 0.08 && Math.random() < roleTensions.head * 0.65) caSeedBand(0, 11, 1);
		                        if (!caHasLife() && wholeBodyDensity > 0.03) caSeedBand(0, 11, 18);

	                        if (wholeBodyDensity > 0.04) {
	                            caIdleTicks = 0;
	                        } else {
	                            caIdleTicks++;
	                            if (caIdleTicks > 24) caGrid.fill(0);
	                        }

	                        const caInterval = 0.11 + (1.0 - wholeBodyDensity) * 0.22;
	                        if ((caHasLife() || wholeBodyDensity > 0.04) && now - caLastStepTime > caInterval) {
	                            caEvolve();
	                            caColumn = (caColumn + 1) % caCols;
	                            caLastStepTime = now;

	                            const liveRows = [];
	                            for (let row = 0; row < caRows; row++) {
	                                if (!caGrid[caIndex(row, caColumn)]) continue;
	                                liveRows.push(row);
	                                const pitchRow = caRows - 1 - row;
	                                const baseFreq = scalePool[pitchRow % scalePool.length] * (row < 3 ? 2.0 : 1.0);
	                                const rowRole = row < 6 ? 'hand' : (row < 9 ? 'body' : 'leg');
	                                const rowTension = Math.max(0.12, wholeBodyDensity, rowRole === 'leg' ? roleTensions.leg : roleTensions.hand);
	                                playSynthPluck(baseFreq, Math.min(1, rowTension), now, (caColumn / (caCols - 1)) * renderWidth, rowRole);
	                            }
		                            caColumnActivity = liveRows.length / caRows;
		                            caDensity = caGrid.reduce((sum, cell) => sum + cell, 0) / caGrid.length;
		                            caColumnActivityHold = Math.max(caColumnActivityHold, caColumnActivity);
		                            caDensityHold = Math.max(caDensityHold, caDensity);

	                            if (liveRows.length >= 3) {
	                                const root = scalePool[scaleNoteIndex] || scalePool[0];
	                                playSynthPluck(root * 0.5, Math.min(1, caColumnActivity + 0.25), now, renderWidth * 0.25, 'leg');
	                                playSynthPluck(root, Math.min(1, caColumnActivity + 0.15), now + 0.015, renderWidth * 0.50, 'body');
	                                playSynthPluck(root * 1.5, Math.min(1, caColumnActivity + 0.10), now + 0.03, renderWidth * 0.75, 'hand');
	                            }
	                        }
	                    }

                    // Modulation and filter updates (FM drone carrier + filters)
                    const trembleFreqMod = 1.0 + (normTension > 0.75 ? Math.sin(statePulse * 48) * (normTension - 0.75) * 0.02 : 0.0);
                    
	                    // Snapped drone base pitch: spine chooses the chord/root.
	                    const spineRootIndex = Math.max(0, Math.min(scalePool.length - 1, Math.floor(roleTensions.spine * (scalePool.length - 1))));
	                    let targetFreq = (scalePool[spineRootIndex] || scalePool[0]) * 0.5 * trembleFreqMod;
		                    
		                    // Continuous Oscillator Glitch (erratic pitch jumps/jitters under mechanical strain)
	                    const glitchChance = roleTensions.head * 0.18 + wholeBodyDensity * 0.08 + (caSoundActive ? caDensity * 0.22 : 0);
		                    if (normTension > 0.40 && Math.random() < glitchChance) {
		                        const jitterMults = [0.5, 2.0, 1.5, 0.75, 1.0, 1.25];
		                        targetFreq *= jitterMults[Math.floor(Math.random() * jitterMults.length)];
	                    }
                    
                    // FM TIMBRE MORPHING (Odd harmonic glassy bells vertically, fifths/subs growls horizontally)
		                    const dragXTotal = arpeggioJoints.reduce((acc, j) => acc + Math.abs(j.getX()), 0);
		                    const dragYTotal = arpeggioJoints.reduce((acc, j) => acc + Math.abs(j.getY()), 0);
		                    const ratioBlend = dragYTotal / (dragXTotal + dragYTotal + 0.1);
	                    const fmRatio = 1.2 + roleTensions.head * 4.2 + roleTensions.spine * 0.8 + ratioBlend * 0.2 + (caSoundActive ? caDensity * 3.0 : 0);
			                    
	                    const targetModIdx = 8 + roleTensions.head * 140 + roleTensions.spine * 45 + (caSoundActive ? caColumnActivity * 180 : 0);
		                    
		                    // RHYTHMIC FILTER WOBBLE (LFO wobbles faster/deeper as tension spikes)
	                    const wobbleSpeed = 1.0 + wholeBodyDensity * 16.0 + (caSoundActive ? caDensity * 18.0 : 0); // 1Hz to 35Hz
			                    state.wobbleSpeed = wobbleSpeed;
	                    const wobbleDepth = roleTensions.head * 520 + wholeBodyDensity * 180 + (caSoundActive ? caColumnActivity * 780 : 0);
	                    const targetCutoff = 420 + roleTensions.head * 1800 + roleTensions.hand * 450 + (caSoundActive ? caDensity * 1700 : 0);
			                    const modulatedCutoff = Math.max(200, targetCutoff + Math.sin(statePulse * wobbleSpeed) * wobbleDepth);
			                    
	                    const targetNoise = 0.01 + roleTensions.head * 0.18 + wholeBodyDensity * 0.04 + (caSoundActive ? caDensity * 0.20 : 0);

		                    // Rhythmic Gate on the Sawtooth FM Drone (oscillates volume like a trance/techno gate)
	                    const gateSpeed = 3.0 + wholeBodyDensity * 15.0 + (caSoundActive ? caColumnActivity * 18.0 : 0); // speeds up with whole-body density
	                    const gateStep = Math.floor(statePulse * gateSpeed) % 8;
	                    const gatePattern = [1, 0, 1, 1, 0, 1, 0, 1]; // syncopated rhythmic pattern
	                    // Leveled gating: peak at 0.35, dips to a baseline floor of 0.15 (more level/constant presence)
		                    const targetDroneGain = gatePattern[gateStep]
		                        ? 0.18 + roleTensions.spine * 0.25
		                        : 0.08 + roleTensions.spine * 0.10;
                    if (avatarDroneGain) {
                        avatarDroneGain.gain.setTargetAtTime(targetDroneGain, avatarAudioCtx.currentTime, 0.012);
                    }

                    // Modulate the continuous FM drone
                    avatarCarrier.frequency.setTargetAtTime(targetFreq, avatarAudioCtx.currentTime, 0.08);
                    avatarModulator.frequency.setTargetAtTime(targetFreq * fmRatio, avatarAudioCtx.currentTime, 0.15);
                    avatarModGain.gain.setTargetAtTime(targetModIdx * fmRatio * 1.5, avatarAudioCtx.currentTime, 0.15);

	                    const subBassFreq = 38 + roleTensions.leg * 55 + roleTensions.spine * 14 + (caSoundActive ? caDensity * 35 : 0);
		                    avatarSubBass.frequency.setTargetAtTime(subBassFreq, avatarAudioCtx.currentTime, 0.1);

                    avatarFilter.frequency.setTargetAtTime(modulatedCutoff, avatarAudioCtx.currentTime, 0.05);
                    avatarFilter.Q.setTargetAtTime(1.5 + normTension * 5.0, avatarAudioCtx.currentTime, 0.08);

                    avatarNoiseFilter.frequency.setTargetAtTime(600 + (normTension * 500), avatarAudioCtx.currentTime, 0.15);
                    const highpassCutoff = 28 + roleTensions.head * 125 + wholeBodyDensity * 45 + (caSoundActive ? caDensity * 120 : 0);
                    const noiseHighpassCutoff = 650 + roleTensions.head * 1900 + wholeBodyDensity * 420 + (caSoundActive ? caColumnActivity * 1600 : 0);
                    avatarHighpass.frequency.setTargetAtTime(highpassCutoff, avatarAudioCtx.currentTime, 0.12);
                    avatarHighpass.Q.setTargetAtTime(0.7 + roleTensions.head * 0.9, avatarAudioCtx.currentTime, 0.12);
                    avatarNoiseHighpass.frequency.setTargetAtTime(noiseHighpassCutoff, avatarAudioCtx.currentTime, 0.08);
                    avatarNoiseGain.gain.setTargetAtTime(targetNoise * 0.3, avatarAudioCtx.currentTime, 0.05);

	                    const mainGain = 0.055 + wholeBodyDensity * 0.12 + roleTensions.leg * 0.04 + (caSoundActive ? caDensity * 0.055 : 0);
                    avatarMainGain.gain.setTargetAtTime(mainGain, avatarAudioCtx.currentTime, 0.08);
                    
                    // TAPE DELAY PITCH WARPING (Delay time oscillates on active tension, bending delay buffer pitch)
	                    const targetDelayTime = caSoundActive
	                        ? 0.08 + (1.0 - caColumnActivity) * 0.18 + Math.sin(statePulse * 3.0) * (caDensity * 0.05)
	                        : 0.2 + (1.0 - normTension) * 0.2 + Math.sin(statePulse * 1.5) * (normTension * 0.04);
                    avatarDelay.delayTime.setTargetAtTime(targetDelayTime, avatarAudioCtx.currentTime, 0.2);
                    
	                    const delayFeedback = caSoundActive
	                        ? (caDensity > 0.02 ? 0.18 + caDensity * 0.55 : 0.03)
	                        : (normTension > 0.05 ? 0.12 + normTension * 0.32 : 0.03);
	                    avatarDelayFeedback.gain.setTargetAtTime(delayFeedback, avatarAudioCtx.currentTime, 0.1);

                    const panVal = Math.sin(statePulse * 0.4) * 0.35;
                    avatarPanner.pan.setTargetAtTime(panVal, avatarAudioCtx.currentTime, 0.15);

                    // 5. Trigger microscopic digital static crackles scaling with tension
	                    if (normTension > 0.25) {
	                        const crackleChance = roleTensions.head * 0.16 + wholeBodyDensity * 0.05 + (caSoundActive ? caDensity * 0.18 : 0);
	                        if (Math.random() < crackleChance) {
	                            triggerGlitchClick(now);
	                        }
                    }
                }

                drawAvatarFrame(normTension);
            }
            requestAnimationFrame(avatarUpdateLoop);
        }

        function drawAvatarFrame(normTension) {
            avatarCtx.fillStyle = 'rgba(4, 4, 4, 0.25)';
            avatarCtx.fillRect(0, 0, renderWidth, renderHeight);

            let shiverX = 0;
            let shiverY = 0;
            if (normTension > 0.75) {
                const shiverMag = (normTension - 0.75) * 5;
                shiverX = (Math.random() - 0.5) * shiverMag;
                shiverY = (Math.random() - 0.5) * shiverMag;
            }

            avatarCtx.save();
            if (spinActive) {
                spinAngle += 0.015;
                avatarCtx.translate(renderWidth / 2, 0);
                avatarCtx.scale(Math.cos(spinAngle), 1.0);
                avatarCtx.translate(-renderWidth / 2, 0);
            }

            pelvisX = renderWidth * 0.38 + shiverX + state.pelvisDragX;
            pelvisY = renderHeight / 2 + 65 + shiverY + state.pelvisDragY;
            const pelvis = { x: pelvisX, y: pelvisY };

            const spineSegments = 16;
            const spinePoints = [];
            const spineBendAmount = state.spineAngle;

            for (let i = 0; i <= spineSegments; i++) {
                const ratio = i / spineSegments;
                const segmentHeight = 165 * ratio;

                let spineFlex = 0.0;
                let xOffset = spineFlex;
                let yOffset = -segmentHeight;

                if (spineBendAmount > 0) {
                    const angle = ratio * Math.PI * 0.45 * spineBendAmount;
                    xOffset = spineFlex + Math.sin(angle) * (60 * spineBendAmount);
                    yOffset = -Math.cos(angle) * (60 * spineBendAmount) - (165 * (1 - spineBendAmount) * ratio);
                }

                const scoliosisLeft = -Math.sin(ratio * Math.PI) * 16.0;
                xOffset += scoliosisLeft;
                xOffset += Math.sin(statePulse * 1.2 + ratio * Math.PI) * 0.8;

                spinePoints.push({
                    x: pelvis.x + xOffset + state.headDragX * ratio,
                    y: pelvis.y + yOffset + state.headDragY * ratio,
                    ratio: ratio
                });
            }

            const headBase = spinePoints[spinePoints.length - 1];

            let headAngle = state.neckAngle * 0.6;
            if (spineBendAmount > 0) headAngle -= 0.3 * spineBendAmount;

            headX = headBase.x + Math.sin(headAngle) * 20;
            headY = headBase.y - Math.cos(headAngle) * 20;

            const shouldersCenter = spinePoints[13];
            const shoulderWidth = 20;
            shoulderLeft = {
                x: shouldersCenter.x - Math.cos(headAngle) * shoulderWidth + state.lShoulderDragX,
                y: shouldersCenter.y - Math.sin(headAngle) * shoulderWidth + state.lShoulderDragY
            };
            shoulderRight = {
                x: shouldersCenter.x + Math.cos(headAngle) * shoulderWidth + state.rShoulderDragX,
                y: shouldersCenter.y + Math.sin(headAngle) * shoulderWidth + state.rShoulderDragY
            };

            const leftPoints = [];
            const rightPoints = [];
            for (let i = 0; i < spinePoints.length; i++) {
                const pt = spinePoints[i];
                let dx, dy;
                if (i === 0) {
                    dx = spinePoints[1].x - spinePoints[0].x;
                    dy = spinePoints[1].y - spinePoints[0].y;
                } else if (i === spinePoints.length - 1) {
                    dx = spinePoints[i].x - spinePoints[i-1].x;
                    dy = spinePoints[i].y - spinePoints[i-1].y;
                } else {
                    dx = spinePoints[i+1].x - spinePoints[i-1].x;
                    dy = spinePoints[i+1].y - spinePoints[i-1].y;
                }
                const len = Math.sqrt(dx*dx + dy*dy) || 1;
                const nx = -dy / len;
                const ny = dx / len;
                
                const ratio = pt.ratio;
                let w = 10;
                if (ratio > 0.8) {
                    w = 4.5 + (1.0 - ratio) * 8;
                } else if (ratio > 0.45) {
                    const chestRatio = (ratio - 0.45) / 0.35;
                    w = 8.5 + Math.sin(chestRatio * Math.PI) * 4.5;
                } else {
                    const hipRatio = ratio / 0.45;
                    w = 7.5 + (1.0 - Math.sin(hipRatio * Math.PI)) * 2.5;
                }
                
                leftPoints.push({ x: pt.x + nx * w, y: pt.y + ny * w });
                rightPoints.unshift({ x: pt.x - nx * w, y: pt.y - ny * w });
            }

            avatarCtx.strokeStyle = 'rgba(238, 198, 176, 0.03)';
            avatarCtx.lineWidth = 7;
            avatarCtx.lineCap = 'round';
            avatarCtx.beginPath();
            avatarCtx.moveTo(pelvis.x, pelvis.y);
            for (let i = 1; i < spinePoints.length; i++) {
                avatarCtx.lineTo(spinePoints[i].x, spinePoints[i].y);
            }
            avatarCtx.stroke();

            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            avatarCtx.lineWidth = 1.0;
            avatarCtx.beginPath();
            avatarCtx.moveTo(pelvis.x, pelvis.y);
            for (let i = 1; i < spinePoints.length; i++) {
                avatarCtx.lineTo(spinePoints[i].x, spinePoints[i].y);
            }
            avatarCtx.stroke();

            avatarCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            for (let i = 0; i < spinePoints.length; i++) {
                const pt = spinePoints[i];
                avatarCtx.beginPath();
                avatarCtx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
                avatarCtx.fill();
            }

            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            avatarCtx.lineWidth = 1.0;
            avatarCtx.beginPath();
            avatarCtx.moveTo(shoulderLeft.x, shoulderLeft.y);
            avatarCtx.lineTo(shoulderRight.x, shoulderRight.y);
            avatarCtx.stroke();

            const armLQAngle = state.leftArmOffset * 1.3;
            const armREAngle = state.rightArmOffset * 1.3;
            const legLAAngle = state.leftLegOffset * 2.3;
            const legRDAngle = state.rightLegOffset * 2.3;

            let targetLeftElbow = { x: shoulderLeft.x - 22 + Math.sin(armLQAngle)*15, y: shoulderLeft.y + 30 + Math.cos(armLQAngle)*10 };
            leftHand = { x: shoulderLeft.x - 25 + Math.sin(armLQAngle)*25 + state.lHandDragX, y: shoulderLeft.y + 65 + Math.cos(armLQAngle)*20 + state.lHandDragY };
            leftElbow = getElbowKneePos(shoulderLeft, leftHand, 30, 35, targetLeftElbow);
            leftElbow.x += state.lElbowDragX;
            leftElbow.y += state.lElbowDragY;

            let targetRightElbow = { x: shoulderRight.x + 22 - Math.sin(armREAngle)*15, y: shoulderRight.y + 30 + Math.cos(armREAngle)*10 };
            rightHand = { x: shoulderRight.x + 25 - Math.sin(armREAngle)*25 + state.rHandDragX, y: shoulderRight.y + 65 + Math.cos(armREAngle)*20 + state.rHandDragY };
            rightElbow = getElbowKneePos(shoulderRight, rightHand, 30, 35, targetRightElbow);
            rightElbow.x += state.rElbowDragX;
            rightElbow.y += state.rElbowDragY;

            let targetLeftKnee = { 
                x: pelvis.x - 16 - Math.sin(legLAAngle) * 35, 
                y: pelvis.y + 40 - Math.sin(legLAAngle * 0.9) * 45 
            };
            leftFoot = { 
                x: pelvis.x - 18 - Math.sin(legLAAngle) * 75 + state.lFootDragX, 
                y: pelvis.y + 110 - Math.sin(legLAAngle * 0.95) * 105 + state.lFootDragY 
            };
            leftKnee = getElbowKneePos(pelvis, leftFoot, 54, 58, targetLeftKnee);
            leftKnee.x += state.lKneeDragX;
            leftKnee.y += state.lKneeDragY;

            let targetRightKnee = { 
                x: pelvis.x + 16 + Math.sin(legRDAngle) * 35, 
                y: pelvis.y + 40 - Math.sin(legRDAngle * 0.9) * 45 
            };
            rightFoot = { 
                x: pelvis.x + 18 + Math.sin(legRDAngle) * 75 + state.rFootDragX, 
                y: pelvis.y + 110 - Math.sin(legRDAngle * 0.95) * 105 + state.rFootDragY 
            };
            rightKnee = getElbowKneePos(pelvis, rightFoot, 54, 58, targetRightKnee);
            rightKnee.x += state.rKneeDragX;
            rightKnee.y += state.rKneeDragY;

            const hairSourceX = headX;
            const hairSourceY = headY - 11;
            for (let s = 0; s < numHairStrands; s++) {
                const strand = hairPoints[s];
                const attachX = hairSourceX + (s - numHairStrands / 2) * 1.5;
                const attachY = hairSourceY + Math.abs(s - numHairStrands / 2) * 0.7;

                strand[0].x = attachX;
                strand[0].y = attachY;

                for (let i = 1; i < hairStrandLength; i++) {
                    const node = strand[i];
                    const vx = (node.x - node.px) * 0.85;
                    const vy = (node.y - node.py) * 0.85;

                    node.px = node.x;
                    node.py = node.y;

                    node.x += vx;
                    node.y += vy + 0.16; 
                }

                const targetLinkDist = 6.8;
                for (let i = 1; i < hairStrandLength; i++) {
                    const n1 = strand[i-1];
                    const n2 = strand[i];
                    const dx = n2.x - n1.x;
                    const dy = n2.y - n1.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist > 1) {
                        const diff = targetLinkDist - dist;
                        const percent = (diff / dist) * 0.5;
                        n2.x += dx * percent;
                        n2.y += dy * percent;
                    }
                }
            }

            function drawHairLayer(fromStrand, toStrand) {
                avatarCtx.strokeStyle = 'rgba(215, 202, 172, 0.65)';
                avatarCtx.lineWidth = 1.3;
                avatarCtx.shadowBlur = 0;
                for (let s = fromStrand; s < toStrand; s++) {
                    const strand = hairPoints[s];
                    avatarCtx.beginPath();
                    avatarCtx.moveTo(strand[0].x, strand[0].y);
                    for (let i = 1; i < hairStrandLength; i++) {
                        const waveOffset = Math.sin(i * 1.0 - statePulse * 1.5 + s) * 1.2;
                        avatarCtx.lineTo(strand[i].x + waveOffset, strand[i].y);
                    }
                    avatarCtx.stroke();
                }
            }

            drawHairLayer(0, 7);

            drawVolumetricLimb(shoulderLeft, leftElbow, leftHand, 5.5, 4.5, 3.5, true);
            drawVolumetricLimb(shoulderRight, rightElbow, rightHand, 5.5, 4.5, 3.5, false);
            drawVolumetricLimb(pelvis, leftKnee, leftFoot, 9.0, 7.5, 5.0, true);
            drawVolumetricLimb(pelvis, rightKnee, rightFoot, 9.0, 7.5, 5.0, false);

            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            avatarCtx.lineWidth = 1.6;
            for (let r = 5; r <= 11; r++) {
                const ribPt = spinePoints[r];
                const widthDist = (24 - Math.abs(8 - r) * 2.5);
                
                avatarCtx.beginPath();
                avatarCtx.arc(ribPt.x - widthDist/2, ribPt.y, widthDist/2, -Math.PI*0.1 + headAngle, Math.PI*0.9 + headAngle);
                avatarCtx.stroke();
                
                avatarCtx.beginPath();
                avatarCtx.arc(ribPt.x + widthDist/2, ribPt.y, widthDist/2, Math.PI*0.1 + headAngle, Math.PI*1.1 + headAngle);
                avatarCtx.stroke();
            }

            avatarCtx.fillStyle = '#080808';
            avatarCtx.strokeStyle = 'rgba(255,255,255,0.7)';
            avatarCtx.lineWidth = 1.2;
            avatarCtx.beginPath();
            avatarCtx.ellipse(headX, headY, 10, 13, headAngle, 0, Math.PI * 2);
            avatarCtx.fill();
            avatarCtx.stroke();

            const eyeOffsetSpacing = 3.2;
            const eyeXLeft = headX - Math.cos(headAngle) * eyeOffsetSpacing;
            const eyeYLeft = headY - Math.sin(headAngle) * eyeOffsetSpacing;
            const eyeXRight = headX + Math.cos(headAngle) * eyeOffsetSpacing;
            const eyeYRight = headY + Math.sin(headAngle) * eyeOffsetSpacing;

            function drawAlmondEye(x, y) {
                avatarCtx.save();
                avatarCtx.translate(x, y);
                avatarCtx.rotate(headAngle);
                
                avatarCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                avatarCtx.beginPath();
                avatarCtx.ellipse(0, 0, 3.0, 1.4, 0, 0, Math.PI*2);
                avatarCtx.fill();
                
                avatarCtx.fillStyle = '#5fa8d3'; // blue iris
                avatarCtx.beginPath();
                avatarCtx.arc(0, 0, 1.0, 0, Math.PI*2);
                avatarCtx.fill();

                avatarCtx.fillStyle = '#080808';
                avatarCtx.beginPath();
                avatarCtx.arc(0, 0, 0.5, 0, Math.PI*2);
                avatarCtx.fill();
                
                avatarCtx.restore();
            }

            drawAlmondEye(eyeXLeft, eyeYLeft);
            drawAlmondEye(eyeXRight, eyeYRight);

            drawHairLayer(7, 14);

            // Helper to check active status of each joint for coloring
            function isJointActive(name) {
                let dragVal = 0;
                if (name === 'head') dragVal = Math.sqrt(state.headDragX**2 + state.headDragY**2);
                else if (name === 'pelvis') dragVal = Math.sqrt(state.pelvisDragX**2 + state.pelvisDragY**2);
                else if (name === 'shoulderLeft') dragVal = Math.sqrt(state.lShoulderDragX**2 + state.lShoulderDragY**2);
                else if (name === 'shoulderRight') dragVal = Math.sqrt(state.rShoulderDragX**2 + state.rShoulderDragY**2);
                else if (name === 'leftElbow') dragVal = Math.sqrt(state.lElbowDragX**2 + state.lElbowDragY**2);
                else if (name === 'rightElbow') dragVal = Math.sqrt(state.rElbowDragX**2 + state.rElbowDragY**2);
                else if (name === 'leftHand') dragVal = Math.sqrt(state.lHandDragX**2 + state.lHandDragY**2);
                else if (name === 'rightHand') dragVal = Math.sqrt(state.rHandDragX**2 + state.rHandDragY**2);
                else if (name === 'leftKnee') dragVal = Math.sqrt(state.lKneeDragX**2 + state.lKneeDragY**2);
                else if (name === 'rightKnee') dragVal = Math.sqrt(state.rKneeDragX**2 + state.rKneeDragY**2);
                else if (name === 'leftFoot') dragVal = Math.sqrt(state.lFootDragX**2 + state.lFootDragY**2);
                else if (name === 'rightFoot') dragVal = Math.sqrt(state.rFootDragX**2 + state.rFootDragY**2);

                if (dragVal > 8.0) return true;

                // Check keyboard posture displacements
                if (name === 'head' && Math.abs(state.neckAngle) > 0.05) return true;
                if (name === 'pelvis' && Math.abs(state.spineAngle) > 0.05) return true;
                if ((name === 'shoulderLeft' || name === 'shoulderRight') && Math.abs(state.spineAngle) > 0.05) return true;
                if ((name === 'leftHand' || name === 'leftElbow') && Math.abs(state.leftArmOffset) > 0.05) return true;
                if ((name === 'rightHand' || name === 'rightElbow') && Math.abs(state.rightArmOffset) > 0.05) return true;
                if ((name === 'leftFoot' || name === 'leftKnee') && Math.abs(state.leftLegOffset) > 0.05) return true;
                if ((name === 'rightFoot' || name === 'rightKnee') && Math.abs(state.rightLegOffset) > 0.05) return true;

                return false;
            }

            const joints = [
                { name: 'head', x: headX, y: headY },
                { name: 'pelvis', x: pelvis.x, y: pelvis.y },
                { name: 'shouldersCenter', x: shouldersCenter.x, y: shouldersCenter.y },
                { name: 'shoulderLeft', x: shoulderLeft.x, y: shoulderLeft.y },
                { name: 'shoulderRight', x: shoulderRight.x, y: shoulderRight.y },
                { name: 'leftElbow', x: leftElbow.x, y: leftElbow.y },
                { name: 'rightElbow', x: rightElbow.x, y: rightElbow.y },
                { name: 'leftKnee', x: leftKnee.x, y: leftKnee.y },
                { name: 'rightKnee', x: rightKnee.x, y: rightKnee.y },
                { name: 'leftHand', x: leftHand.x, y: leftHand.y },
                { name: 'rightHand', x: rightHand.x, y: rightHand.y },
                { name: 'leftFoot', x: leftFoot.x, y: leftFoot.y },
                { name: 'rightFoot', x: rightFoot.x, y: rightFoot.y }
            ];

            for (let node of joints) {
                if (node) {
                    const active = isJointActive(node.name);
                    const trackerRadius = 4.5 + Math.sin(statePulse * 3.5) * 1.0;

                    avatarCtx.strokeStyle = active ? 'rgba(254, 65, 100, 0.85)' : 'rgba(95, 168, 211, 0.55)';
                    avatarCtx.lineWidth = 0.8;
                    avatarCtx.beginPath();
                    avatarCtx.arc(node.x, node.y, trackerRadius, 0, Math.PI * 2);
                    avatarCtx.stroke();

                    avatarCtx.fillStyle = active ? '#fe4164' : 'rgba(255, 255, 255, 0.8)';
                    avatarCtx.beginPath();
                    avatarCtx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
                    avatarCtx.fill();

                    avatarCtx.strokeStyle = active ? 'rgba(254, 65, 100, 0.45)' : 'rgba(95, 168, 211, 0.3)';
                    avatarCtx.beginPath();
                    avatarCtx.moveTo(node.x - trackerRadius * 1.4, node.y);
                    avatarCtx.lineTo(node.x + trackerRadius * 1.4, node.y);
                    avatarCtx.moveTo(node.x, node.y - trackerRadius * 1.4);
                    avatarCtx.lineTo(node.x, node.y + trackerRadius * 1.4);
                    avatarCtx.stroke();
                }
            }

            const setupScale = 0.90;
            const setupShiftX = renderWidth * 0.035;
            const setupShiftY = -renderHeight * 0.035;
            const setupAnchorX = renderWidth * 0.80;
            const setupAnchorY = renderHeight * 0.68;
            const transformSetupPoint = (x, y) => ({
                x: setupShiftX + setupAnchorX + (x - setupAnchorX) * setupScale,
                y: setupShiftY + setupAnchorY + (y - setupAnchorY) * setupScale
            });

            avatarCtx.save();
            avatarCtx.translate(setupShiftX, setupShiftY);
            avatarCtx.translate(setupAnchorX, setupAnchorY);
            avatarCtx.scale(setupScale, setupScale);
            avatarCtx.translate(-setupAnchorX, -setupAnchorY);

            // 1. Draw the Sitting User (Vishnoi) - Positioned on the Right, Facing Left
            // Pelvis
            const pelvisUserX = renderWidth * 0.90;
            const pelvisUserY = renderHeight * 0.72;
            
            // Spine points
            const spineUserSegments = 10;
            const spineUserPoints = [];
            for (let i = 0; i <= spineUserSegments; i++) {
                const ratio = i / spineUserSegments;
                // Leaning forward slightly towards the desk (to the left)
                const sx = pelvisUserX - (ratio * 12);
                const sy = pelvisUserY - (ratio * 75);
                spineUserPoints.push({ x: sx, y: sy });
            }
            
            const shouldersUser = spineUserPoints[spineUserPoints.length - 1];
            const headUserX = shouldersUser.x - 3;
            const headUserY = shouldersUser.y - 14;
            
            // Draw sitting spine
            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            avatarCtx.lineWidth = 1.0;
            avatarCtx.beginPath();
            avatarCtx.moveTo(pelvisUserX, pelvisUserY);
            for (let i = 1; i < spineUserPoints.length; i++) {
                avatarCtx.lineTo(spineUserPoints[i].x, spineUserPoints[i].y);
            }
            avatarCtx.stroke();
            
            // Draw head (bigger)
            avatarCtx.fillStyle = '#080808';
            avatarCtx.strokeStyle = 'rgba(255,255,255,0.45)';
            avatarCtx.lineWidth = 1.0;
            avatarCtx.beginPath();
            avatarCtx.ellipse(headUserX, headUserY, 10, 13, -0.1, 0, Math.PI * 2);
            avatarCtx.fill();
            avatarCtx.stroke();
            
            // Draw almond eyes for the user (like her)
            const eyeSpacingUser = 3.2;
            const eyeXLeftUser = headUserX - Math.cos(-0.1) * eyeSpacingUser;
            const eyeYLeftUser = headUserY - Math.sin(-0.1) * eyeSpacingUser;
            const eyeXRightUser = headUserX + Math.cos(-0.1) * eyeSpacingUser;
            const eyeYRightUser = headUserY + Math.sin(-0.1) * eyeSpacingUser;

            function drawUserAlmondEye(x, y) {
                avatarCtx.save();
                avatarCtx.translate(x, y);
                avatarCtx.rotate(-0.1);
                
                avatarCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                avatarCtx.beginPath();
                avatarCtx.ellipse(0, 0, 3.0, 1.4, 0, 0, Math.PI*2);
                avatarCtx.fill();
                
                avatarCtx.fillStyle = '#6b3f1d'; // brown iris
                avatarCtx.beginPath();
                avatarCtx.arc(0, 0, 1.0, 0, Math.PI*2);
                avatarCtx.fill();

                avatarCtx.fillStyle = '#080808';
                avatarCtx.beginPath();
                avatarCtx.arc(0, 0, 0.5, 0, Math.PI*2);
                avatarCtx.fill();
                
                avatarCtx.restore();
            }

            drawUserAlmondEye(eyeXLeftUser, eyeYLeftUser);
            drawUserAlmondEye(eyeXRightUser, eyeYRightUser);
            
            // Draw brown medium hair for Vishnoi (scaled to bigger head)
            avatarCtx.strokeStyle = 'rgba(110, 60, 30, 0.9)'; // Brown
            avatarCtx.lineWidth = 1.6;
            for (let angle = Math.PI * 0.7; angle < Math.PI * 2.3; angle += 0.15) {
                // Short/medium hair falling down
                const hx1 = headUserX + Math.cos(angle) * 9;
                const hx2 = headUserX + Math.cos(angle) * 13;
                const hy1 = headUserY + Math.sin(angle) * 11;
                const hy2 = headUserY + Math.sin(angle) * 16;
                avatarCtx.beginPath();
                avatarCtx.moveTo(hx1, hy1);
                avatarCtx.lineTo(hx2, hy2);
                avatarCtx.stroke();
            }
            
            // Keyboard center and dimensions (shifted right, tilted)
            const kX = renderWidth * 0.80;
            const kY = renderHeight * 0.69;
            const floorY = renderHeight * 0.88;

            // Define tilted Wedge-shaped Synth Corners
            // Bottom face
            const bFL = { x: kX - 38, y: kY + 14 }; // front-left bottom
            const bFR = { x: kX + 38, y: kY - 18 }; // front-right bottom
            const bBL = { x: kX - 44, y: kY + 6 };  // back-left bottom
            const bBR = { x: kX + 32, y: kY - 26 }; // back-right bottom
            
            // Top face (sloped surface)
            const tFL = { x: bFL.x, y: bFL.y - 4 };  // front-left top
            const tFR = { x: bFR.x, y: bFR.y - 4 };  // front-right top
            const tBL = { x: bBL.x, y: bBL.y - 12 }; // back-left top
            const tBR = { x: bBR.x, y: bBR.y - 12 }; // back-right top

            // Draw arms reaching to synth keys (hands rest on the keys)
            const handUserX = tFL.x + (tFR.x - tFL.x) * 0.5 + 5;
            const handUserY = tFL.y + (tFR.y - tFL.y) * 0.5 - 2;
            const elbowUserX = (shouldersUser.x + handUserX) / 2 + 10;
            const elbowUserY = Math.max(shouldersUser.y, handUserY) + 12;
            
            // User Limb
            drawVolumetricLimb({x: shouldersUser.x, y: shouldersUser.y}, {x: elbowUserX, y: elbowUserY}, {x: handUserX, y: handUserY}, 3.5, 3.0, 2.0, false);
            
            // Draw legs (sitting style)
            const kneeUserX = pelvisUserX - 35;
            const kneeUserY = pelvisUserY;
            const footUserX = kneeUserX;
            const footUserY = pelvisUserY + 45;
            drawVolumetricLimb({x: pelvisUserX, y: pelvisUserY}, {x: kneeUserX, y: kneeUserY}, {x: footUserX, y: footUserY}, 6.0, 5.0, 3.5, false);

            // 2. Draw Setup (Vertical Stand, Synth in 3D projection, and separate Camera closer to synth)
            // Legs straight down (not crossing)
            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            avatarCtx.lineWidth = 2.0;

            const topL = { x: kX - 25, y: kY + 12 };
            const topR = { x: kX + 25, y: kY - 8 };
            
            const leftLegHeight = floorY - topL.y;
            const floorYRight = floorY - leftLegHeight * 0.3;

            // Leg 1: topL vertical to floor
            avatarCtx.beginPath();
            avatarCtx.moveTo(topL.x, topL.y);
            avatarCtx.lineTo(topL.x, floorY);
            avatarCtx.stroke();

            // Leg 2: topR vertical to floorYRight (shorter by 30% of left leg height for perspective)
            avatarCtx.beginPath();
            avatarCtx.moveTo(topR.x, topR.y);
            avatarCtx.lineTo(topR.x, floorYRight);
            avatarCtx.stroke();

            // Feet bars on floor
            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            avatarCtx.lineWidth = 1.6;
            avatarCtx.beginPath();
            avatarCtx.moveTo(topL.x - 8, floorY + 2);
            avatarCtx.lineTo(topL.x + 8, floorY - 2);
            avatarCtx.moveTo(topR.x - 8, floorYRight + 2);
            avatarCtx.lineTo(topR.x + 8, floorYRight - 2);
            avatarCtx.stroke();

            // Synth side and back panels
            avatarCtx.fillStyle = '#121212';
            avatarCtx.strokeStyle = 'rgba(255,255,255,0.35)';
            avatarCtx.lineWidth = 1.0;
            
            // Back face
            avatarCtx.beginPath();
            avatarCtx.moveTo(bBR.x, bBR.y);
            avatarCtx.lineTo(bBL.x, bBL.y);
            avatarCtx.lineTo(tBL.x, tBL.y);
            avatarCtx.lineTo(tBR.x, tBR.y);
            avatarCtx.closePath();
            avatarCtx.fill();
            avatarCtx.stroke();

            // Left side
            avatarCtx.beginPath();
            avatarCtx.moveTo(bBL.x, bBL.y);
            avatarCtx.lineTo(bFL.x, bFL.y);
            avatarCtx.lineTo(tFL.x, tFL.y);
            avatarCtx.lineTo(tBL.x, tBL.y);
            avatarCtx.closePath();
            avatarCtx.fill();
            avatarCtx.stroke();

            // Right side
            avatarCtx.beginPath();
            avatarCtx.moveTo(bBR.x, bBR.y);
            avatarCtx.lineTo(bFR.x, bFR.y);
            avatarCtx.lineTo(tFR.x, tFR.y);
            avatarCtx.lineTo(tBR.x, tBR.y);
            avatarCtx.closePath();
            avatarCtx.fill();
            avatarCtx.stroke();

            // Top sloped synth panel
            avatarCtx.fillStyle = '#1a1a1a';
            avatarCtx.beginPath();
            avatarCtx.moveTo(tFL.x, tFL.y);
            avatarCtx.lineTo(tFR.x, tFR.y);
            avatarCtx.lineTo(tBR.x, tBR.y);
            avatarCtx.lineTo(tBL.x, tBL.y);
            avatarCtx.closePath();
            avatarCtx.fill();
            avatarCtx.stroke();

            // Draw skewed keyboard keys (sloped along perspective)
            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
            avatarCtx.lineWidth = 0.8;
            const keySteps = 12;
            for (let k = 0; k <= keySteps; k++) {
                const r = k / keySteps;
                // front point
                const fx = tFL.x + (tFR.x - tFL.x) * r;
                const fy = tFL.y + (tFR.y - tFL.y) * r;
                // back point (keys terminate 60% of the way up the sloped surface)
                const bx = fx + (tBL.x - tFL.x) * 0.60;
                const by = fy + (tBL.y - tFL.y) * 0.60;
                
                avatarCtx.beginPath();
                avatarCtx.moveTo(fx, fy);
                avatarCtx.lineTo(bx, by);
                avatarCtx.stroke();
            }

            // Draw a retro green hacker terminal monitor next to the user (facing left) - ENLARGED
            const mx = renderWidth * 0.77; // Shifted left to prevent overlapping programmer's face
            const my = renderHeight * 0.54;

            // Draw monitor stand
            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            avatarCtx.lineWidth = 1.6;
            avatarCtx.beginPath();
            avatarCtx.moveTo(mx, my + 23);
            avatarCtx.lineTo(mx, my + 33);
            avatarCtx.moveTo(mx - 12, my + 33);
            avatarCtx.lineTo(mx + 12, my + 33);
            avatarCtx.stroke();

            // Draw monitor bezel
            avatarCtx.fillStyle = '#0f0f0f';
            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            avatarCtx.lineWidth = 1.2;
            avatarCtx.fillRect(mx - 32, my - 23, 64, 46);
            avatarCtx.strokeRect(mx - 32, my - 23, 64, 46);

            // Draw green terminal screen
            avatarCtx.fillStyle = '#010d02';
            avatarCtx.fillRect(mx - 28, my - 19, 56, 38);

            // Draw hacker-style scrolling metrics in bright green Matrix color
            avatarCtx.fillStyle = '#39ff14';
            avatarCtx.font = '7.2px monospace';
            avatarCtx.textAlign = 'left';
            
            const lScale = caSoundActive ? 'CA' : (state.activeCount < 3 ? 'Dm' : (state.activeCount <= 5 ? 'Gm' : 'Am'));
            const blink = Math.floor(statePulse * 2.5) % 2 === 0 ? '▉' : '';

            // Separate all rows cleanly to prevent overlapping
            avatarCtx.fillText(`TENS: ${Math.round(normTension * 100)}%`, mx - 24, my - 12);
            avatarCtx.fillText(`ACTV: ${state.activeCount}/12`, mx - 24, my - 5);
            avatarCtx.fillText(`KEY : ${lScale}`, mx - 24, my + 2);
            avatarCtx.fillText(`WOB : ${state.wobbleSpeed.toFixed(1)}Hz`, mx - 24, my + 9);
            
            // Draw a subtle line divider and prompt
            avatarCtx.fillStyle = 'rgba(57, 255, 20, 0.4)';
            avatarCtx.fillRect(mx - 28, my + 11, 56, 0.5); // Divider line
            avatarCtx.fillStyle = '#39ff14';
            avatarCtx.fillText(`@angelvish:~${blink}`, mx - 24, my + 17); // Prompt row

            // 4. Draw free-floating animated bar plot on top of the synth
            const numBars = 5;
            const barFillColor = normTension > 0.45 ? 'rgba(254, 65, 100, 0.85)' : 'rgba(153, 220, 27, 0.85)';
            const barGlowColor = normTension > 0.45 ? '#fe4164' : '#99DC1B';
            
            for (let i = 0; i < numBars; i++) {
                const r = 0.25 + 0.5 * (i / (numBars - 1)); // space them out along back edge
                const bx = tBL.x + (tBR.x - tBL.x) * r;
                const by = tBL.y + (tBR.y - tBL.y) * r - 4; // Float slightly above back edge

                // Calculate animated height: ambient noise at default, exponential scaling at extremes (spiking taller)
                const waveVal = Math.sin(statePulse * (8 + i * 2.2) + (i * 0.5)) * 0.5 + 0.5;
                const baseNoise = 2.0 + waveVal * 8.0; // 2.0 to 10.0px ambient noise
                const expTension = Math.pow(normTension, 2.0); // quadratic response
                const barHeight = baseNoise + (expTension * 250); // scaled up tension response (doubled height range)

                // Draw the glowing bar
                avatarCtx.save();
                avatarCtx.fillStyle = barFillColor;
                avatarCtx.shadowColor = barGlowColor;
                avatarCtx.shadowBlur = 5;
                avatarCtx.fillRect(bx - 1.2, by - barHeight, 2.2, barHeight);
                avatarCtx.restore();
            }

            // Camera on tripod standing SEPARATELY closer to the synth
            const tripodBaseX = renderWidth * 0.71;
            const tripodBaseY = renderHeight * 0.78;
            const cameraY = renderHeight * 0.54;

            // Tripod legs
            avatarCtx.strokeStyle = 'rgba(255,255,255,0.25)';
            avatarCtx.lineWidth = 1.2;
            avatarCtx.beginPath();
            avatarCtx.moveTo(tripodBaseX, cameraY + 15);
            avatarCtx.lineTo(tripodBaseX - 12, tripodBaseY + 12);
            avatarCtx.moveTo(tripodBaseX, cameraY + 15);
            avatarCtx.lineTo(tripodBaseX + 12, tripodBaseY + 12);
            avatarCtx.moveTo(tripodBaseX, cameraY + 15);
            avatarCtx.lineTo(tripodBaseX, tripodBaseY + 12);
            avatarCtx.stroke();

            // Camera head pointing left towards the figure
            avatarCtx.fillStyle = '#0f0f0f';
            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            avatarCtx.lineWidth = 1.2;
            avatarCtx.beginPath();
            avatarCtx.rect(tripodBaseX - 8, cameraY - 6, 16, 12);
            avatarCtx.fill();
            avatarCtx.stroke();
            avatarCtx.beginPath();
            avatarCtx.rect(tripodBaseX - 14, cameraY - 3, 6, 6);
            avatarCtx.fill();
            avatarCtx.stroke();

            // Red LED
            avatarCtx.fillStyle = '#fe4164';
            avatarCtx.beginPath();
            avatarCtx.arc(tripodBaseX - 4, cameraY - 2, 0.9, 0, Math.PI * 2);
            avatarCtx.fill();

            // Cable from camera back to the synth input port (3D curve)
            avatarCtx.strokeStyle = 'rgba(255,255,255,0.12)';
            avatarCtx.lineWidth = 1.2;
            avatarCtx.beginPath();
            avatarCtx.moveTo(tripodBaseX, cameraY + 6);
            avatarCtx.quadraticCurveTo((tripodBaseX + tBL.x)/2, cameraY + 45, tBL.x, tBL.y);
            avatarCtx.stroke();

            const cameraLensScreen = transformSetupPoint(tripodBaseX - 11, cameraY);
            avatarCtx.restore();

            // 3. Draw Fiber Optic Wires from contortionist joints to camera
            const cameraLensX = cameraLensScreen.x;
            const cameraLensY = cameraLensScreen.y;
            
            const trackingJoints = [
                { x: pelvis.x, y: pelvis.y, dx: state.pelvisDragX, dy: state.pelvisDragY },
                { x: shoulderLeft.x, y: shoulderLeft.y, dx: state.lShoulderDragX, dy: state.lShoulderDragY },
                { x: shoulderRight.x, y: shoulderRight.y, dx: state.rShoulderDragX, dy: state.rShoulderDragY },
                { x: leftElbow.x, y: leftElbow.y, dx: state.lElbowDragX, dy: state.lElbowDragY },
                { x: rightElbow.x, y: rightElbow.y, dx: state.rElbowDragX, dy: state.rElbowDragY },
                { x: leftKnee.x, y: leftKnee.y, dx: state.lKneeDragX, dy: state.lKneeDragY },
                { x: rightKnee.x, y: rightKnee.y, dx: state.rKneeDragX, dy: state.rKneeDragY },
                { x: leftHand.x, y: leftHand.y, dx: state.lHandDragX, dy: state.lHandDragY },
                { x: rightHand.x, y: rightHand.y, dx: state.rHandDragX, dy: state.rHandDragY },
                { x: leftFoot.x, y: leftFoot.y, dx: state.lFootDragX, dy: state.lFootDragY },
                { x: rightFoot.x, y: rightFoot.y, dx: state.rFootDragX, dy: state.rFootDragY },
                { x: headX, y: headY, dx: state.headDragX, dy: state.headDragY }
            ];

            function getQuadraticBezierPoint(t, p0, p1, p2) {
                const oneMinusT = 1 - t;
                return {
                    x: oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x,
                    y: oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y
                };
            }

            trackingJoints.forEach((joint, idx) => {
                const p0 = { x: joint.x, y: joint.y };
                const p2 = { x: cameraLensX, y: cameraLensY };
                // Control point creates a sagging wire
                const midX = (p0.x + p2.x) / 2;
                const midY = Math.max(p0.y, p2.y) + 30 + (idx * 4);
                const p1 = { x: midX, y: midY };
                
                // Speed depends on displacement
                const stretch = Math.sqrt(joint.dx*joint.dx + joint.dy*joint.dy);
                const speedMult = 1.0 + (stretch * 0.12);
                
                // A joint is considered "activated" if its displacement is high
                const isActivated = stretch > 1.5;
                const pulseColor = isActivated ? '#fe4164' : 'rgba(120, 120, 120, 0.8)';
                const wireColor = isActivated ? 'rgba(254, 65, 100, 0.25)' : 'rgba(255, 255, 255, 0.05)';
                const wireWidth = isActivated ? 1.2 : 0.8;

                // Draw thin background wire
                avatarCtx.strokeStyle = wireColor;
                avatarCtx.lineWidth = wireWidth;
                avatarCtx.beginPath();
                avatarCtx.moveTo(p0.x, p0.y);
                avatarCtx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
                avatarCtx.stroke();
                
                // Flowing particles
                const numPulses = 3;
                for (let p = 0; p < numPulses; p++) {
                    const offset = p / numPulses;
                    const t = (statePulse * speedMult * 0.18 + offset) % 1.0;
                    
                    const pt = getQuadraticBezierPoint(t, p0, p1, p2);
                    
                    avatarCtx.fillStyle = pulseColor;
                    avatarCtx.beginPath();
                    avatarCtx.arc(pt.x, pt.y, 1.4, 0, Math.PI * 2);
                    avatarCtx.fill();
                    
                    const prevT = Math.max(0, t - 0.03);
                    const prevPt = getQuadraticBezierPoint(prevT, p0, p1, p2);
                    avatarCtx.strokeStyle = pulseColor;
                    avatarCtx.lineWidth = 0.8;
                    avatarCtx.globalAlpha = 0.35;
                    avatarCtx.beginPath();
                    avatarCtx.moveTo(pt.x, pt.y);
                    avatarCtx.lineTo(prevPt.x, prevPt.y);
                    avatarCtx.stroke();
                    avatarCtx.globalAlpha = 1.0;
                }
            });

            avatarCtx.restore();
        }

        function getElbowKneePos(start, end, len1, len2, defaultJointPos) {
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist >= (len1 + len2)) {
                const ratio = len1 / dist;
                return {
                    x: start.x + dx * ratio,
                    y: start.y + dy * ratio
                };
            }

            const cosAngle = (len1*len1 + dist*dist - len2*len2) / (2 * len1 * dist);
            if (isNaN(cosAngle) || cosAngle > 1 || cosAngle < -1) return defaultJointPos;
            
            const angleToTarget = Math.atan2(dy, dx);
            const angleOffset = Math.acos(cosAngle);

            const defDx = defaultJointPos.x - start.x;
            const defDy = defaultJointPos.y - start.y;
            const crossProduct = dx * defDy - dy * defDx;
            const side = crossProduct >= 0 ? 1 : -1;

            const finalAngle = angleToTarget + (angleOffset * side);
            return {
                x: start.x + Math.cos(finalAngle) * len1,
                y: start.y + Math.sin(finalAngle) * len1
            };
        }

        function drawVolumetricLimb(start, joint, end, radStart, radJoint, radEnd, isLeft) {
            avatarCtx.lineCap = 'round';
            avatarCtx.lineJoin = 'round';

            avatarCtx.save();
            avatarCtx.shadowBlur = 12;
            avatarCtx.shadowColor = 'rgba(0, 0, 0, 0.85)';

            function drawFleshSegment(pA, pB, rA, rB) {
                avatarCtx.beginPath();
                avatarCtx.moveTo(pA.x, pA.y);
                avatarCtx.lineTo(pB.x, pB.y);
                avatarCtx.strokeStyle = 'rgba(238, 198, 176, 0.03)';
                avatarCtx.lineWidth = (rA + rB) * 0.45;
                avatarCtx.lineCap = 'round';
                avatarCtx.stroke();
            }

            drawFleshSegment(start, joint, radStart * 1.5, radJoint * 1.5);
            drawFleshSegment(joint, end, radJoint * 1.5, radEnd * 1.5);
            avatarCtx.restore();

            avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            avatarCtx.lineWidth = 1.0;

            avatarCtx.beginPath();
            avatarCtx.moveTo(start.x, start.y);
            avatarCtx.lineTo(joint.x, joint.y);
            avatarCtx.stroke();

            avatarCtx.beginPath();
            avatarCtx.moveTo(joint.x, joint.y);
            avatarCtx.lineTo(end.x, end.y);
            avatarCtx.stroke();

            const isArm = radStart < 8.0;
            
            const dx = end.x - joint.x;
            const dy = end.y - joint.y;
            const len = Math.sqrt(dx*dx + dy*dy) || 1;
            const ux = dx / len;
            const uy = dy / len;
            const nx = -uy;
            const ny = ux;

            if (isArm) {
                avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
                avatarCtx.lineWidth = 0.5;
                
                const numFingers = 5;
                for (let f = 0; f < numFingers; f++) {
                    const angleSpread = 0.7;
                    const angle = ((f / (numFingers - 1)) - 0.5) * angleSpread;
                    
                    const rx = ux * Math.cos(angle) - uy * Math.sin(angle);
                    const ry = ux * Math.sin(angle) + uy * Math.cos(angle);
                    
                    const f1 = { x: end.x + rx * 8, y: end.y + ry * 8 };
                    
                    const sideFactor = isLeft ? 1 : -1;
                    const r2x = rx * Math.cos(0.3 * sideFactor) - ry * Math.sin(0.3 * sideFactor);
                    const r2y = rx * Math.sin(0.3 * sideFactor) + ry * Math.cos(0.3 * sideFactor);
                    const f2 = { x: f1.x + r2x * 8, y: f1.y + r2y * 8 };

                    avatarCtx.beginPath();
                    avatarCtx.moveTo(end.x, end.y);
                    avatarCtx.lineTo(f1.x, f1.y);
                    avatarCtx.lineTo(f2.x, f2.y);
                    avatarCtx.stroke();
                    
                    avatarCtx.fillStyle = '#5fa8d3';
                    avatarCtx.beginPath();
                    avatarCtx.arc(f2.x, f2.y, 0.8, 0, Math.PI*2);
                    avatarCtx.fill();
                }
            } else {
                avatarCtx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
                avatarCtx.lineWidth = 0.5;
                
                const numToes = 5;
                const dir = isLeft ? -1 : 1;
                for (let t = 0; t < numToes; t++) {
                    const toeSpread = 8.0;
                    const offset = ((t / (numToes - 1)) - 0.5) * toeSpread;
                    
                    const toeBaseX = end.x + nx * dir * offset;
                    const toeBaseY = end.y + ny * dir * offset;
                    
                    const toeEndX = toeBaseX + ux * 8;
                    const toeEndY = toeBaseY + uy * 8;

                    avatarCtx.beginPath();
                    avatarCtx.moveTo(end.x, end.y);
                    avatarCtx.lineTo(toeBaseX, toeBaseY);
                    avatarCtx.lineTo(toeEndX, toeEndY);
                    avatarCtx.stroke();

                    avatarCtx.fillStyle = '#5fa8d3';
                    avatarCtx.beginPath();
                    avatarCtx.arc(toeEndX, toeEndY, 0.8, 0, Math.PI*2);
                    avatarCtx.fill();
                }
            }
        }
    
})();
