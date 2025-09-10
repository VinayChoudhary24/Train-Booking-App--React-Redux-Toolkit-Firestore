// Train seat pricing model
export interface TrainPrice {
  [key: string]: number; // e.g., "1A": 3500, "2A": 2200
}

// Train structure
export interface Train {
  train_number: string;
  train_name: string;
  departure_time: string;
  arrival_time: string;
  source: string;
  destination: string;
  days_of_operation: string[] | string; // ["Mon", "Wed"] OR "Daily"
  price: TrainPrice;
}

// Search parameters entered by the user
export interface SearchParams {
  from: string;
  to: string;
  date: string;
  travelClass: string;
  quota: string;
}

// Filter model (expandable in future)
// export interface Filters {
//   travelClass: Record<string, boolean>;
//   trainType: Record<string, boolean>;
//   departureTime: Record<string, boolean>;
// }

// Slice state model
export interface TrainState {
  trains: Train[];
  filteredTrains: Train[];
  recentSearches: Train[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedTrain: any;
  searchParams: SearchParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any;
  loading: boolean;
  error: string | null;
}
