import React from 'react';

interface Device {
  id: number;
  name: string;
  type: string;
  status: string;
  consumption: number;
}

interface DeviceControlProps {
  device: Device;
  onToggle: (deviceId: number) => void;
}

const DeviceControl: React.FC<DeviceControlProps> = ({ device, onToggle }) => {
  const isOn = device.status === 'on';
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="font-medium text-gray-800">{device.name}</h3>
        <p className="text-sm text-gray-500">
          {device.consumption} W • {device.type}
        </p>
      </div>
      
      <button
        onClick={() => onToggle(device.id)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
          isOn ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default DeviceControl;
