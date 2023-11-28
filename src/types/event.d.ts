interface FormData {
  startEvent: string;
  endEvent: string;
  name: string;
  tags: { name: string }[];
  castings: { name: string }[];
  hosts: { name: string }[];
  place: string;
  category: string;
  isAdult: string;
  availablePurchaseTime: string;
  normalPrice: number;
  premiumPrice: number;
  saleDegree: number;
  isSpecialA: boolean;
  isSpecialB: boolean;
  isSpecialC: boolean;
  thumbnailUrl: string;
  imageUrls: string[];
}

interface ImageFormSubmitValue {
  thumbNailImage: File;
  eventImages: File[];
}
