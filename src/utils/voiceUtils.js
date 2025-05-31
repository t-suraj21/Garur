// Speech Synthesis (Text to Speech)
export const speakText = (text, options = {}) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Default options
  utterance.lang = options.lang || 'en-IN';
  utterance.rate = options.rate || 1;
  utterance.pitch = options.pitch || 1;
  utterance.volume = options.volume || 1;

  // Cancel any ongoing speech
  synth.cancel();
  
  return new Promise((resolve) => {
    utterance.onend = resolve;
    synth.speak(utterance);
  });
};

// Speech Recognition (Speech to Text)
export const listenVoice = (onResult, options = {}) => {
  const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
  
  recognition.lang = options.lang || 'en-IN';
  recognition.continuous = options.continuous || false;
  recognition.interimResults = options.interimResults || false;
  
  recognition.onstart = () => {
    console.log('Voice recognition started');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Voice recognition error:', event.error);
  };

  recognition.onend = () => {
    console.log('Voice recognition ended');
  };

  recognition.start();
  return recognition;
};

// Command Parser
export const parseCommand = (command) => {
  const lowerCommand = command.toLowerCase();
  
  // Navigation commands
  if (lowerCommand.includes('go to') || lowerCommand.includes('open')) {
    if (lowerCommand.includes('home')) return { type: 'navigation', path: '/' };
    if (lowerCommand.includes('library')) return { type: 'navigation', path: '/library' };
    if (lowerCommand.includes('test')) return { type: 'navigation', path: '/tests' };
  }

  // Reading commands
  if (lowerCommand.includes('read')) {
    const classMatch = lowerCommand.match(/class\s+(\d+)/i);
    const subjectMatch = lowerCommand.match(/(science|math|english|hindi)/i);
    const chapterMatch = lowerCommand.match(/chapter\s+(\d+)/i);

    if (classMatch && subjectMatch && chapterMatch) {
      return {
        type: 'reading',
        class: classMatch[1],
        subject: subjectMatch[1],
        chapter: chapterMatch[1]
      };
    }
  }

  // Test commands
  if (lowerCommand.includes('start test')) {
    return { type: 'test', action: 'start' };
  }
  if (lowerCommand.includes('next question')) {
    return { type: 'test', action: 'next' };
  }

  return { type: 'unknown', command };
};

// Stop all speech
export const stopSpeaking = () => {
  window.speechSynthesis.cancel();
};

// Stop listening
export const stopListening = (recognition) => {
  if (recognition) {
    recognition.stop();
  }
};
