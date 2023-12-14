class Device{
  id: number;
  name: string;
  description: string;
  state: boolean;
  lastchange: Date;
}

class Sensor{
  id: number;
  name: string;
  description: string;
  measure: number;
  unit: string;
  lastupdate: Date;  
}