import { NextResponse } from 'next/server';

// Mock devices data
const devices = [
  { id: 1, name: 'Living Room Lights', type: 'light', status: 'on', consumption: 60 },
  { id: 2, name: 'Kitchen Lights', type: 'light', status: 'off', consumption: 40 },
  { id: 3, name: 'Bedroom Lights', type: 'light', status: 'off', consumption: 30 },
  { id: 4, name: 'TV', type: 'appliance', status: 'on', consumption: 120 },
  { id: 5, name: 'Refrigerator', type: 'appliance', status: 'on', consumption: 150 },
  { id: 6, name: 'Washing Machine', type: 'appliance', status: 'off', consumption: 500 },
  { id: 7, name: 'Air Conditioner', type: 'hvac', status: 'off', consumption: 1000 },
  { id: 8, name: 'Heating System', type: 'hvac', status: 'on', consumption: 1500 },
];

export async function GET() {
  return NextResponse.json(devices);
}

export async function POST(request: Request) {
  const data = await request.json();
  
  // In a real application, this would control actual devices
  // For now, we'll just update our mock data and return it
  if (data.deviceId && data.action) {
    const deviceIndex = devices.findIndex(device => device.id === data.deviceId);
    
    if (deviceIndex !== -1) {
      if (data.action === 'toggle') {
        devices[deviceIndex].status = devices[deviceIndex].status === 'on' ? 'off' : 'on';
      }
      
      return NextResponse.json({ 
        success: true, 
        message: `Device ${devices[deviceIndex].name} is now ${devices[deviceIndex].status}`,
        device: devices[deviceIndex]
      });
    }
  }
  
  return NextResponse.json({ 
    success: false, 
    message: 'Invalid device or action'
  }, { status: 400 });
}
