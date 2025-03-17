export interface Vessel {
  id: string;
  name: string;
  type: string;
  position: {
    lat: number;
    lng: number;
  };
  speed: number;
  heading: number;
}
