import { useEffect, useRef } from 'react';

const AudioPlayer = ({ weirdnessLevel, isActive }) => {
  const audioContextRef = useRef();
  const oscillatorRef = useRef();
  const gainNodeRef = useRef();

  useEffect(() => {
    if (!isActive) return;

    // Create audio context if it doesn't exist
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;

    // Resume audio context if needed (for autoplay policies)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    // Clean up previous oscillator
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }

    // Clean up previous gain node
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
    }

    // Create new audio nodes based on weirdness level
    const createAudioForLevel = (level) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();

      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;

      switch (level) {
        case 0: // Normal - no sound
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          break;

        case 1: // Slightly weird - subtle ambient
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
          break;

        case 2: // Weird - mysterious tones
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 2);
          gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
          break;

        case 3: // Very weird - distorted sounds
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
          // Add frequency modulation
          oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 1);
          oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 2);
          gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
          
          filterNode.type = 'lowpass';
          filterNode.frequency.setValueAtTime(800, audioContext.currentTime);
          break;

        case 4: // Nightmare - chaotic noise
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(40, audioContext.currentTime);
          // Rapidly changing frequency for chaos
          for (let i = 0; i < 10; i++) {
            const time = audioContext.currentTime + (i * 0.2);
            const freq = 40 + Math.random() * 200;
            oscillator.frequency.setValueAtTime(freq, time);
          }
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          
          filterNode.type = 'highpass';
          filterNode.frequency.setValueAtTime(200, audioContext.currentTime);
          break;

        default:
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      }

      // Connect the audio graph
      if (level >= 3) {
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
      } else {
        oscillator.connect(gainNode);
      }
      
      gainNode.connect(audioContext.destination);

      // Start the oscillator
      oscillator.start();

      // Stop after a reasonable duration to prevent infinite audio
      oscillator.stop(audioContext.currentTime + 5);
    };

    createAudioForLevel(weirdnessLevel);

    // Cleanup function
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (e) {
          // Oscillator might already be stopped
        }
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
    };
  }, [weirdnessLevel, isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AudioPlayer; 