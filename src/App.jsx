import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import AudioPlayer from './AudioPlayer';

// Content generators for different weirdness levels
const contentGenerators = {
  normal: [
    () => ({ type: 'text', content: 'Hello, world! 👋' }),
    () => ({ type: 'text', content: 'Welcome to this perfectly normal website.' }),
    () => ({ type: 'image', content: './image/catImage1.jpg', alt: 'A cute cat' }),
    () => ({ type: 'image', content: './image/catImage2.avif', alt: 'Another adorable cat' }),
    () => ({ type: 'image', content: './image/catImag3.avif', alt: 'Yet another lovely cat' }),
    () => ({ type: 'text', content: 'Have a wonderful day!' }),
    () => ({ type: 'text', content: 'Look at these adorable cats! 🐱' }),
    () => ({ type: 'image', content: 'https://picsum.photos/400/300?random=1', alt: 'A nice landscape' }),
  ],
  
  slightlyWeird: [
    () => ({ type: 'text', content: 'The cat knows something you don\'t...' }),
    () => ({ type: 'glitchText', content: 'H3LL0 W0RLD' }),
    () => ({ type: 'image', content: 'https://picsum.photos/400/300?random=2&blur=1', alt: 'Something blurry' }),
    () => ({ type: 'text', content: 'Time moves differently here.' }),
    () => ({ type: 'question', content: 'Do you remember why you started scrolling?' }),
  ],
  
  weird: [
    () => ({ type: 'glitchText', content: 'TH3 V01D C4LLS' }),
    () => ({ type: 'distortedImage', content: 'https://picsum.photos/400/300?random=3', alt: 'Reality bending' }),
    () => ({ type: 'question', content: 'What color was your childhood bedroom?' }),
    () => ({ type: 'text', content: '01001000 01100101 01101100 01110000' }),
    () => ({ type: 'audio', content: 'static' }),
    () => ({ type: 'floatingText', content: 'Nothing is real' }),
  ],
  
  veryWeird: [
    () => ({ type: 'glitchText', content: '̴̭̈T̷̰̾H̴̰̄E̵̯̾ ̶̰̏W̵̱̌A̷̰̾L̴̰̄L̵̯̾S̶̰̏ ̶̱̌A̷̰̾R̴̰̄E̵̯̾ ̶̰̏Ḇ̶̌R̷̰̾Ḛ̴̄A̵̯̾K̶̰̏Ǐ̶̱N̷̰̾Ḡ̴̰' }),
    () => ({ type: 'question', content: 'Why do you still have ten fingers?' }),
    () => ({ type: 'countdown', content: Math.floor(Math.random() * 100) }),
    () => ({ type: 'matrix', content: '数字雨' }),
    () => ({ type: 'audio', content: 'whispers' }),
    () => ({ type: 'mirror', content: 'You are being watched' }),
  ],
  
  nightmare: [
    () => ({ type: 'void', content: '████████████████████████' }),
    () => ({ type: 'glitchText', content: 'Y̶̰̾O̵̯̾Ṵ̶̏ ̶̱̌S̷̰̾H̴̰̄O̵̯̾Ṵ̶̏Ḻ̶̌D̷̰̾N̴̰̄\'T̵̯̾ ̶̰̏Ḇ̶̌Ḛ̷̾ ̴̰̄H̵̯̾Ḛ̶̏Ṟ̶̌Ḛ̷̾' }),
    () => ({ type: 'question', content: 'How deep have you gone?' }),
    () => ({ type: 'coordinates', content: `${Math.random().toFixed(6)}, ${Math.random().toFixed(6)}` }),
    () => ({ type: 'audio', content: 'screaming' }),
    () => ({ type: 'error', content: 'REALITY.EXE HAS STOPPED WORKING' }),
    () => ({ type: 'backwards', content: '.ecno saw siht sa lamron sa' }),
  ]
};

const WeirdnessLevels = {
  NORMAL: 0,
  SLIGHTLY_WEIRD: 1,
  WEIRD: 2,
  VERY_WEIRD: 3,
  NIGHTMARE: 4
};

function App() {
  const [content, setContent] = useState([]);
  const [weirdnessLevel, setWeirdnessLevel] = useState(WeirdnessLevels.NORMAL);
  const [isLoading, setIsLoading] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const observerRef = useRef();
  const loadingRef = useRef();

  const getWeirdnessKey = (level) => {
    switch (level) {
      case WeirdnessLevels.NORMAL: return 'normal';
      case WeirdnessLevels.SLIGHTLY_WEIRD: return 'slightlyWeird';
      case WeirdnessLevels.WEIRD: return 'weird';
      case WeirdnessLevels.VERY_WEIRD: return 'veryWeird';
      case WeirdnessLevels.NIGHTMARE: return 'nightmare';
      default: return 'normal';
    }
  };

  const generateContent = useCallback((level, count = 3) => {
    const key = getWeirdnessKey(level);
    const generators = contentGenerators[key];
    const newContent = [];
    
    for (let i = 0; i < count; i++) {
      const generator = generators[Math.floor(Math.random() * generators.length)];
      newContent.push({
        id: Date.now() + Math.random(),
        ...generator(),
        weirdnessLevel: level
      });
    }
    
    return newContent;
  }, []);

  const loadMoreContent = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newContent = generateContent(weirdnessLevel);
      setContent(prev => [...prev, ...newContent]);
      
      // Increase weirdness every 10 items
      if (content.length > 0 && content.length % 10 === 0) {
        setWeirdnessLevel(prev => Math.min(prev + 1, WeirdnessLevels.NIGHTMARE));
      }
      
      setIsLoading(false);
    }, Math.random() * 200 + 100); // Much faster loading (100-300ms)
  }, [content.length, weirdnessLevel, generateContent, isLoading]);

  useEffect(() => {
    // Initialize with some normal content
    setContent(generateContent(WeirdnessLevels.NORMAL, 5));
  }, [generateContent]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreContent();
        }
      },
      { threshold: 0.3 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreContent]);

  const renderContent = (item) => {
    const baseClass = `content-item level-${item.weirdnessLevel}`;
    
    switch (item.type) {
      case 'text':
        return <p className={baseClass}>{item.content}</p>;
      
      case 'glitchText':
        return <div className={`${baseClass} glitch`} data-text={item.content}>{item.content}</div>;
      
      case 'image':
        return <img className={`${baseClass} content-image`} src={item.content} alt={item.alt} />;
      
      case 'distortedImage':
        return <img className={`${baseClass} content-image distorted`} src={item.content} alt={item.alt} />;
      
      case 'question':
        return <div className={`${baseClass} question`}>{item.content}</div>;
      
      case 'floatingText':
        return <div className={`${baseClass} floating`}>{item.content}</div>;
      
      case 'countdown':
        return <div className={`${baseClass} countdown`}>{item.content}</div>;
      
      case 'matrix':
        return <div className={`${baseClass} matrix`}>{'01'.repeat(50)}</div>;
      
      case 'mirror':
        return <div className={`${baseClass} mirror`}>{item.content}</div>;
      
      case 'void':
        return <div className={`${baseClass} void`}>{item.content}</div>;
      
      case 'coordinates':
        return <div className={`${baseClass} coordinates`}>COORDINATES: {item.content}</div>;
      
      case 'error':
        return <div className={`${baseClass} error`}>{item.content}</div>;
      
      case 'backwards':
        return <div className={`${baseClass} backwards`}>{item.content}</div>;
      
      case 'audio':
        return <div className={`${baseClass} audio-indicator`}>♪ {item.content} ♪</div>;
      
      default:
        return <div className={baseClass}>{item.content}</div>;
    }
  };

  const getWeirdnessDescription = () => {
    switch (weirdnessLevel) {
      case WeirdnessLevels.NORMAL: return 'Everything is normal';
      case WeirdnessLevels.SLIGHTLY_WEIRD: return 'Something feels off...';
      case WeirdnessLevels.WEIRD: return 'Reality is bending';
      case WeirdnessLevels.VERY_WEIRD: return 'The void stares back';
      case WeirdnessLevels.NIGHTMARE: return 'There is no escape';
      default: return '';
    }
  };

  return (
    <div className={`app weirdness-${weirdnessLevel}`}>
      <AudioPlayer weirdnessLevel={weirdnessLevel} isActive={audioEnabled} />
      
      <div className="weirdness-indicator">
        <div className="level-bar">
          <div 
            className="level-fill" 
            style={{ width: `${(weirdnessLevel / WeirdnessLevels.NIGHTMARE) * 100}%` }}
          />
        </div>
        <span className="level-text">{getWeirdnessDescription()}</span>
        <button 
          className="audio-toggle"
          onClick={() => setAudioEnabled(!audioEnabled)}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            fontSize: '12px',
            background: audioEnabled ? '#ff6b6b' : '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔊 {audioEnabled ? 'ON' : 'OFF'}
        </button>
      </div>
      
      <div className="content-container">
        {content.map((item) => (
          <div key={item.id} className="content-wrapper">
            {renderContent(item)}
          </div>
        ))}
        
        <div ref={loadingRef} className="loading-trigger">
          {isLoading && <div className="loading">Loading more weirdness...</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
