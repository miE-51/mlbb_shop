
export interface DiamondPackage {
  id: string;
  name: string;
  price: number;
  icon?: string;
}

export interface OrderData {
  mlbbId: string;
  serverId: string;
  package: string;
  screenshot: File | null;
  timestamp: string;
}

export interface AppState {
  view: 'shop' | 'terms' | 'success';
  loading: boolean;
  error: string | null;
}
