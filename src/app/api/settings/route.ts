import { NextResponse } from 'next/server';

// Mock settings data
let settings = {
  theme: 'light',
  notifications: true,
  energySavingMode: false,
  targetConsumption: {
    electricity: 350, // kWh per month
    gas: 800, // m³ per month
    water: 3700 // L per month
  }
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  const data = await request.json();
  
  // Update settings with the provided data
  settings = { ...settings, ...data };
  
  return NextResponse.json({ 
    success: true, 
    message: 'Settings updated successfully',
    settings
  });
}
