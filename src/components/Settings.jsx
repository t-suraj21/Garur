import { useState } from 'react';
import { motion } from 'framer-motion';
import { speakText } from '../utils/voiceUtils';

const Settings = () => {
  const [settings, setSettings] = useState({
    voiceControl: {
      enabled: true,
      wakeWord: 'hey garur',
      autoStart: true,
      voiceFeedback: true,
      voiceSpeed: 1.0
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      animations: true,
      highContrast: false
    },
    notifications: {
      email: true,
      push: true,
      achievements: true,
      reminders: true,
      sound: true
    },
    privacy: {
      profileVisibility: 'public',
      showProgress: true,
      showAchievements: true,
      dataCollection: true
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
    speakText(`${setting} updated to ${value}`);
  };

  const SettingCard = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6 mb-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </motion.div>
  );

  const ToggleSwitch = ({ enabled, onChange, label }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          enabled ? 'bg-primary-500' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const SelectOption = ({ value, onChange, options, label }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border-gray-300 text-gray-700 focus:border-primary-500 focus:ring-primary-500"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const RangeSlider = ({ value, onChange, label, min, max, step }) => (
    <div className="py-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-500">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Customize your learning experience</p>
        </div>

        {/* Voice Control Settings */}
        <SettingCard title="Voice Control">
          <ToggleSwitch
            enabled={settings.voiceControl.enabled}
            onChange={(value) => handleSettingChange('voiceControl', 'enabled', value)}
            label="Enable Voice Control"
          />
          <ToggleSwitch
            enabled={settings.voiceControl.autoStart}
            onChange={(value) => handleSettingChange('voiceControl', 'autoStart', value)}
            label="Auto-start Voice Control"
          />
          <ToggleSwitch
            enabled={settings.voiceControl.voiceFeedback}
            onChange={(value) => handleSettingChange('voiceControl', 'voiceFeedback', value)}
            label="Voice Feedback"
          />
          <RangeSlider
            value={settings.voiceControl.voiceSpeed}
            onChange={(value) => handleSettingChange('voiceControl', 'voiceSpeed', value)}
            label="Voice Speed"
            min={0.5}
            max={2}
            step={0.1}
          />
        </SettingCard>

        {/* Appearance Settings */}
        <SettingCard title="Appearance">
          <SelectOption
            value={settings.appearance.theme}
            onChange={(value) => handleSettingChange('appearance', 'theme', value)}
            label="Theme"
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'system', label: 'System' }
            ]}
          />
          <SelectOption
            value={settings.appearance.fontSize}
            onChange={(value) => handleSettingChange('appearance', 'fontSize', value)}
            label="Font Size"
            options={[
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' }
            ]}
          />
          <ToggleSwitch
            enabled={settings.appearance.animations}
            onChange={(value) => handleSettingChange('appearance', 'animations', value)}
            label="Enable Animations"
          />
          <ToggleSwitch
            enabled={settings.appearance.highContrast}
            onChange={(value) => handleSettingChange('appearance', 'highContrast', value)}
            label="High Contrast Mode"
          />
        </SettingCard>

        {/* Notification Settings */}
        <SettingCard title="Notifications">
          <ToggleSwitch
            enabled={settings.notifications.email}
            onChange={(value) => handleSettingChange('notifications', 'email', value)}
            label="Email Notifications"
          />
          <ToggleSwitch
            enabled={settings.notifications.push}
            onChange={(value) => handleSettingChange('notifications', 'push', value)}
            label="Push Notifications"
          />
          <ToggleSwitch
            enabled={settings.notifications.achievements}
            onChange={(value) => handleSettingChange('notifications', 'achievements', value)}
            label="Achievement Alerts"
          />
          <ToggleSwitch
            enabled={settings.notifications.reminders}
            onChange={(value) => handleSettingChange('notifications', 'reminders', value)}
            label="Study Reminders"
          />
          <ToggleSwitch
            enabled={settings.notifications.sound}
            onChange={(value) => handleSettingChange('notifications', 'sound', value)}
            label="Sound Effects"
          />
        </SettingCard>

        {/* Privacy Settings */}
        <SettingCard title="Privacy">
          <SelectOption
            value={settings.privacy.profileVisibility}
            onChange={(value) => handleSettingChange('privacy', 'profileVisibility', value)}
            label="Profile Visibility"
            options={[
              { value: 'public', label: 'Public' },
              { value: 'friends', label: 'Friends Only' },
              { value: 'private', label: 'Private' }
            ]}
          />
          <ToggleSwitch
            enabled={settings.privacy.showProgress}
            onChange={(value) => handleSettingChange('privacy', 'showProgress', value)}
            label="Show Learning Progress"
          />
          <ToggleSwitch
            enabled={settings.privacy.showAchievements}
            onChange={(value) => handleSettingChange('privacy', 'showAchievements', value)}
            label="Show Achievements"
          />
          <ToggleSwitch
            enabled={settings.privacy.dataCollection}
            onChange={(value) => handleSettingChange('privacy', 'dataCollection', value)}
            label="Allow Data Collection"
          />
        </SettingCard>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary-500 text-white rounded-xl py-3 font-medium shadow-md hover:shadow-lg transition-shadow"
          onClick={() => {
            speakText('Settings saved successfully');
            // Add save logic here
          }}
        >
          Save Changes
        </motion.button>
      </div>
    </div>
  );
};

export default Settings; 