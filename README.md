# The Infinite Scroll of Increasing Weirdness

> *Scroll down into the digital abyss. It starts normal... but how deep will you go?*

## 🌀 What is this?

An experimental webpage that starts off completely normal but gradually descends into digital madness the further you scroll. Perfect for creating mysterious, TikTok-friendly content that leaves viewers questioning reality.

## 🎭 The Weirdness Levels

### Level 0: Normal
- Cute cat pictures
- Friendly greetings
- Pleasant landscapes
- Everything as it should be...

### Level 1: Slightly Weird
- Subtle animations start
- Questions about reality
- Blurred images
- Something feels... off

### Level 2: Weird
- Glitching text appears
- Images become distorted
- Floating elements
- Binary messages
- Reality starts to bend

### Level 3: Very Weird
- Matrix-style effects
- Countdown timers to nowhere
- Mirror effects
- Haunting questions
- Colors shift unnaturally

### Level 4: Nightmare
- Screen flickers
- Text becomes unreadable
- Error messages from the void
- Backwards text
- Complete visual chaos

## 🔊 Audio Experience

Toggle the audio button to experience procedural soundscapes that match each weirdness level:
- **Normal**: Silence
- **Slightly Weird**: Subtle ambient tones
- **Weird**: Mysterious frequency sweeps
- **Very Weird**: Distorted sawtooth waves
- **Nightmare**: Chaotic digital noise

## 🛠️ Technical Features

- **IntersectionObserver**: Detects when user approaches bottom
- **Progressive Weirdness**: Content becomes more bizarre as you scroll
- **CSS Animations**: Glitch effects, distortions, and reality-bending animations
- **Web Audio API**: Procedural audio generation for atmospheric effects
- **Responsive Design**: Works on mobile for TikTok-style vertical scrolling

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## 📱 TikTok Content Ideas

1. **The Descent**: Record a fast scroll-through showing the progression from normal to nightmare
2. **Reaction Video**: Film people's faces as they scroll deeper
3. **Challenge**: "How deep can you go?" - see who can scroll the furthest
4. **Behind the Scenes**: Show the different weirdness levels and effects
5. **Audio On/Off**: Compare the experience with and without sound

## 🎨 Customization

Want to add your own weirdness? Edit the `contentGenerators` object in `src/App.jsx`:

```javascript
const contentGenerators = {
  yourLevel: [
    () => ({ type: 'yourType', content: 'Your weird content' }),
    // Add more generators...
  ]
};
```

## ⚠️ Warning

This website may cause:
- Existential questioning
- Temporary reality dissociation
- Uncontrollable urge to keep scrolling
- Digital madness
- Loss of time perception

*Scroll responsibly.*

## 🔧 Built With

- **React** - For dynamic content generation
- **Vite** - Lightning fast development
- **CSS3** - Advanced animations and effects
- **Web Audio API** - Procedural sound generation
- **IntersectionObserver** - Infinite scroll detection

## 📄 License

MIT License - Feel free to create your own weird worlds!

---

*"In the depths of the scroll, we find not just content, but the fragments of our digital souls."*
