
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { UserSettings } from '../types';

const SettingsScreen: React.FC = () => {
  const { settings, dispatch } = useAppContext();

  const handleSettingChange = (key: keyof UserSettings, value: boolean | number) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } });
  };
  
  const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; label: string }> = ({ checked, onChange, label }) => (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-gray-700">{label}</span>
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className="block bg-gray-200 w-14 h-8 rounded-full"></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${checked ? 'transform translate-x-6 bg-indigo-600' : ''}`}></div>
      </div>
    </label>
  );

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">設定</h1>

      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">表示設定</h2>
        <div>
          <label htmlFor="font-size" className="block mb-2 text-sm font-medium text-gray-900">
            文字サイズ ({Math.round(settings.font_size_scale * 100)}%)
          </label>
          <input
            id="font-size"
            type="range"
            min="0.8"
            max="1.5"
            step="0.1"
            value={settings.font_size_scale}
            onChange={(e) => handleSettingChange('font_size_scale', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow space-y-4 divide-y">
        <h2 className="text-lg font-semibold text-gray-700 pb-2">学習設定</h2>
        <div className="pt-4">
          <ToggleSwitch 
            label="効果音"
            checked={settings.sound_effects_enabled}
            onChange={(val) => handleSettingChange('sound_effects_enabled', val)}
          />
        </div>
        <div className="pt-4">
          <ToggleSwitch 
            label="時間制限モード"
            checked={settings.time_limit_mode_enabled}
            onChange={(val) => handleSettingChange('time_limit_mode_enabled', val)}
          />
        </div>
        <div className="pt-4">
          <ToggleSwitch 
            label="間違えた問題を優先出題"
            checked={settings.prioritize_wrong_questions}
            onChange={(val) => handleSettingChange('prioritize_wrong_questions', val)}
          />
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 space-y-2">
        <p>
          <a href="#" className="underline">利用規約</a> | <a href="#" className="underline">プライバシーポリシー</a>
        </p>
        <p>バージョン 1.0.0</p>
      </div>
    </div>
  );
};

export default SettingsScreen;
