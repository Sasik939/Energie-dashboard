import { NextResponse } from 'next/server';

// Mock energy data
const energyData = {
  electricity: {
    daily: [10, 12, 15, 13, 14, 11, 9],
    monthly: [320, 350, 400, 380, 360, 340, 330, 310, 290, 300, 320, 340],
    yearly: [3800, 4100, 4300, 4200, 4000],
    current: 14.5,
    unit: 'kWh',
    cost: 4.2, // cost per kWh
  },
  gas: {
    daily: [25, 28, 30, 27, 26, 24, 22],
    monthly: [800, 850, 900, 880, 860, 840, 820, 800, 780, 790, 810, 830],
    yearly: [9500, 10000, 10200, 10100, 9800],
    current: 26.8,
    unit: 'm³',
    cost: 1.8, // cost per m³
  },
  water: {
    daily: [120, 125, 130, 128, 126, 122, 118],
    monthly: [3700, 3800, 3900, 3850, 3800, 3750, 3700, 3650, 3600, 3650, 3700, 3750],
    yearly: [44000, 45000, 46000, 45500, 44500],
    current: 125.5,
    unit: 'L',
    cost: 0.05, // cost per L
  }
};

export async function GET() {
  return NextResponse.json(energyData);
}

// Handle energy saving mode toggle
export async function POST(request: Request) {
  const data = await request.json();
  
  // In a real application, this would interact with actual systems
  // For now, we'll just return a success message with the received data
  return NextResponse.json({ 
    success: true, 
    message: `Energy saving mode ${data.savingMode ? 'activated' : 'deactivated'}`,
    data
  });
}
