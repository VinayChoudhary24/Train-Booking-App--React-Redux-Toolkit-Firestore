export type Passenger = {
  name: string;
  age: string;
  gender: "Male" | "Female" | "Other";
  berth: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
};

export type BookingData = {
  // userId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trainDetails: null | any;
  passengers: Passenger[];
  contactInfo: ContactInfo;
  selectedClass: string;
  availableClasses: string[];
  classPrice: Record<string, number>;
};

export type BookingState = {
  currentBooking: BookingData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userBookings: any[];
  loading: boolean;
  error: string | null;
  bookingCreated: boolean;
  lastBookingId: string | null;
};
