import React from 'react';

interface EnergyMetricProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  change?: number;
  cost?: number;
}

const EnergyMetric: React.FC<EnergyMetricProps> = ({ 
  title, 
  value, 
  unit, 
  icon,
  change,
  cost
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="text-blue-500">{icon}</div>
      </div>
      <div className="mt-2">
        <div className="flex items-end">
          <p className="text-2xl font-bold">{value}</p>
          <p className="ml-1 text-gray-600">{unit}</p>
        </div>
        
        {change !== undefined && (
          <div className={`mt-1 text-sm ${change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last period
          </div>
        )}
        
        {cost !== undefined && (
          <div className="mt-1 text-sm text-gray-600">
            Estimated cost: ${(value * cost).toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnergyMetric;
