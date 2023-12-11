class Device{
  id: number;
  name: string;
  description: string;
  state: boolean;
  type: number;
  lastupdate: Date;
}

class Sensor{
  id: number;
  name: string;
  description: string;
  range: number;
  measure: number;
  unit: string;
  lastupdate: Date;  
}