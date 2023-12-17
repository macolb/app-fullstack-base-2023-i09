class Device{
  id: number;
  name: string;
  description: string;
  type: string;
  lastupdate: Date;
  proportional: number;    
  state: boolean;
  measure: number;    //In case of Device type = "sensor" 
  unit: string;       //In case of Device type = "sensor" 
}
