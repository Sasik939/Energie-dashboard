import React, { useState } from 'react';

interface Settings {
  theme: string;
  notifications: boolean;
  energySavingMode: boolean;
  targetConsumption: {
    electricity: number;
    gas: number;
    water: number;
  };
}

interface SettingsPanelProps {
  settings: Settings;
  onSave: (settings: Settings) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = useState<Settings>(settings);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof Settings],
          [child]: type === 'number' ? Number(value) : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : type === 'number' 
            ? Number(value) 
            : value
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Theme</label>
          <select
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="notifications"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="notifications" className="text-gray-700">
            Enable Notifications
          </label>
        </div>
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="energySavingMode"
            name="energySavingMode"
            checked={formData.energySavingMode}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="energySavingMode" className="text-gray-700">
            Energy Saving Mode
          </label>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Target Consumption</h3>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-gray-700 mb-1">Electricity (kWh)</label>
              <input
                type="number"
                name="targetConsumption.electricity"
                value={formData.targetConsumption.electricity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Gas (m³)</label>
              <input
                type="number"
                name="targetConsumption.gas"
                value={formData.targetConsumption.gas}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Water (L)</label>
              <input
                type="number"
                name="targetConsumption.water"
                value={formData.targetConsumption.water}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsPanel;
