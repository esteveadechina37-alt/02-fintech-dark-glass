export type BalancePoint = {
  day: string;
  balance: number;
};

export type CryptoAsset = {
  name: string;
  symbol: string;
  price: string;
  change: number;
  icon: "bitcoin" | "ethereum" | "solana";
  iconBackground: string;
  iconColor: string;
};

export type Account = {
  id: string;
  name: string;
  detail: string;
  balance: number;
  icon: "wallet" | "piggy-bank" | "chart";
  tone: "violet" | "emerald" | "blue";
};

export type Transaction = {
  id: string;
  name: string;
  detail: string;
  amount: number;
  direction: "incoming" | "outgoing";
  icon: "store" | "car" | "salary" | "music" | "shopping" | "transfer" | "coffee" | "video";
};

export type Investment = {
  id: string;
  name: string;
  symbol: string;
  value: string;
  change: number;
  icon: "bitcoin" | "ethereum" | "stocks";
  color: "orange" | "indigo" | "emerald";
  history: number[];
};

export type CardTheme = "violet" | "gold" | "emerald" | "dark";
