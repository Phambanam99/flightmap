export interface Flight {
  id: string;
  name: string;
  imageUrl: string;
  flightNumber: string;
  airline: string;
  position: {
    lat: number;
    lng: number;
  };
  type: string;
  speed: number;
  altitude: number;
  heading: number;
}
