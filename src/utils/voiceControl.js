import { speakText } from './voiceUtils';

class VoiceControl {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.wakeWord = 'hey garur';
    this.commands = {
      'open library': () => this.navigateTo('/library'),
      'open dashboard': () => this.navigateTo('/dashboard'),
      'open profile': () => this.navigateTo('/profile'),
      'open settings': () => this.navigateTo('/settings'),
      'help': () => this.speakHelp(),
      'stop': () => this.stopListening(),
    };
  }

  initialize() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.setupRecognition();
    } else {
      console.error('Speech recognition not supported');
    }
  }

  setupRecognition() {
    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript.toLowerCase())
        .join('');

      if (transcript.includes(this.wakeWord)) {
        this.handleWakeWord();
      } else if (this.isListening) {
        this.processCommand(transcript);
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.stopListening();
    };

    this.recognition.onend = () => {
      if (this.isListening) {
        this.recognition.start();
      }
    };
  }

  handleWakeWord() {
    this.isListening = true;
    speakText('Yes, how can I help you?');
    this.recognition.start();
  }

  processCommand(transcript) {
    for (const [command, action] of Object.entries(this.commands)) {
      if (transcript.includes(command)) {
        action();
        break;
      }
    }
  }

  navigateTo(path) {
    speakText(`Navigating to ${path}`);
    window.location.href = path;
  }

  speakHelp() {
    const helpText = 'Here are the available commands: ' + 
      Object.keys(this.commands).join(', ');
    speakText(helpText);
  }

  startListening() {
    if (this.recognition) {
      this.recognition.start();
      speakText('Voice control activated. Say "Hey Garur" to begin.');
    }
  }

  stopListening() {
    this.isListening = false;
    if (this.recognition) {
      this.recognition.stop();
      speakText('Voice control deactivated');
    }
  }
}

export const voiceControl = new VoiceControl(); 