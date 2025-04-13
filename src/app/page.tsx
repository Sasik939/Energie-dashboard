'use client';

import { useState, useEffect } from 'react';
import {
  BoltIcon,
  FireIcon,
  BeakerIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  HomeIcon,
  DeviceTabletIcon
} from '@heroicons/react/24/outline';
import EnergyChart from '@/components/EnergyChart';
import EnergyMetric from '@/components/EnergyMetric';
import DeviceControl from '@/components/DeviceControl';
import SettingsPanel from '@/components/SettingsPanel';

// Types
interface EnergyData {
  electricity: {
    daily: number[];
    monthly: number[];
    yearly: number[];
    current: number;
    unit: string;
    cost: number;
  };
  gas: {
    daily: number[];
    monthly: number[];
    yearly: number[];
    current: number;
    unit: string;
    cost: number;
  };
  water: {
    daily: number[];
    monthly: number[];
    yearly: number[];
    current: number;
    unit: string;
    cost: number;
  };
}

interface Device {
  id: number;
  name: string;
  type: string;
  status: string;
  consumption: number;
}

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

export default function Home() {
  // State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'devices' | 'settings'>('dashboard');
  const [timeRange, setTimeRange] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [energyData, setEnergyData] = useState<EnergyData | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch energy data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch energy data
        const energyResponse = await fetch('/api/energy');
        const energyData = await energyResponse.json();
        setEnergyData(energyData);

        // Fetch devices
        const devicesResponse = await fetch('/api/devices');
        const devicesData = await devicesResponse.json();
        setDevices(devicesData);

        // Fetch settings
        const settingsResponse = await fetch('/api/settings');
        const settingsData = await settingsResponse.json();
        setSettings(settingsData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle device toggle
  const handleDeviceToggle = async (deviceId: number) => {
    try {
      const response = await fetch('/api/devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deviceId, action: 'toggle' }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the device in the local state
        setDevices(devices.map(device =>
          device.id === deviceId
            ? { ...device, status: device.status === 'on' ? 'off' : 'on' }
            : device
        ));
      }
    } catch (error) {
      console.error('Error toggling device:', error);
    }
  };

  // Handle settings save
  const handleSaveSettings = async (newSettings: Settings) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSettings),
      });

      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);

        // If energy saving mode was toggled, send request to energy API
        if (settings && settings.energySavingMode !== newSettings.energySavingMode) {
          await fetch('/api/energy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ savingMode: newSettings.energySavingMode }),
          });
        }
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  // Get time range labels
  const getTimeLabels = () => {
    if (timeRange === 'daily') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    } else if (timeRange === 'monthly') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    } else {
      return ['2019', '2020', '2021', '2022', '2023'];
    }
  };

  if (loading || !energyData || !settings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Energy Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`${
                activeTab === 'devices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <DeviceTabletIcon className="h-5 w-5 mr-2" />
              Devices
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Cog6ToothIcon className="h-5 w-5 mr-2" />
              Settings
            </button>
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Time Range Selector */}
            <div className="mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setTimeRange('daily')}
                  className={`${
                    timeRange === 'daily'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } px-4 py-2 rounded-md text-sm font-medium`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setTimeRange('monthly')}
                  className={`${
                    timeRange === 'monthly'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } px-4 py-2 rounded-md text-sm font-medium`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setTimeRange('yearly')}
                  className={`${
                    timeRange === 'yearly'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } px-4 py-2 rounded-md text-sm font-medium`}
                >
                  Yearly
                </button>
              </div>
            </div>

            {/* Energy Metrics */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              <EnergyMetric
                title="Electricity"
                value={energyData.electricity.current}
                unit={energyData.electricity.unit}
                icon={<BoltIcon className="h-6 w-6" />}
                change={5.2}
                cost={energyData.electricity.cost}
              />
              <EnergyMetric
                title="Gas"
                value={energyData.gas.current}
                unit={energyData.gas.unit}
                icon={<FireIcon className="h-6 w-6" />}
                change={-2.1}
                cost={energyData.gas.cost}
              />
              <EnergyMetric
                title="Water"
                value={energyData.water.current}
                unit={energyData.water.unit}
                icon={<BeakerIcon className="h-6 w-6" />}
                change={1.8}
                cost={energyData.water.cost}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <EnergyChart
                title="Electricity Consumption"
                data={energyData.electricity[timeRange]}
                labels={getTimeLabels()}
                type="line"
                color="rgb(59, 130, 246)"
                unit={energyData.electricity.unit}
              />
              <EnergyChart
                title="Gas Consumption"
                data={energyData.gas[timeRange]}
                labels={getTimeLabels()}
                type="line"
                color="rgb(239, 68, 68)"
                unit={energyData.gas.unit}
              />
              <EnergyChart
                title="Water Consumption"
                data={energyData.water[timeRange]}
                labels={getTimeLabels()}
                type="line"
                color="rgb(16, 185, 129)"
                unit={energyData.water.unit}
              />
              <EnergyChart
                title="Consumption Comparison"
                data={[
                  energyData.electricity[timeRange][energyData.electricity[timeRange].length - 1],
                  energyData.gas[timeRange][energyData.gas[timeRange].length - 1],
                  energyData.water[timeRange][energyData.water[timeRange].length - 1] / 10, // Scaled for better visualization
                ]}
                labels={['Electricity', 'Gas', 'Water (÷10)']}
                type="bar"
                color="rgb(99, 102, 241)"
                unit="units"
              />
            </div>
          </div>
        )}

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Connected Devices</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {devices.map((device) => (
                <DeviceControl
                  key={device.id}
                  device={device}
                  onToggle={handleDeviceToggle}
                />
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <SettingsPanel settings={settings} onSave={handleSaveSettings} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Energy Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
