import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  featured: boolean;
  icon: string;
  color: string;
};

const starterProducts: Product[] = [
  { id: '1', name: 'Kopi Susu Gula Aren', category: 'Minuman', price: 18000, stock: 24, featured: true, icon: '☕', color: '#F3E6D5' },
  { id: '2', name: 'Croissant Butter', category: 'Roti & Kue', price: 22000, stock: 12, featured: true, icon: '🥐', color: '#F7E7C8' },
  { id: '3', name: 'Matcha Latte', category: 'Minuman', price: 24000, stock: 18, featured: true, icon: '🍵', color: '#E3EEDB' },
  { id: '4', name: 'Roti Cokelat', category: 'Roti & Kue', price: 15000, stock: 8, featured: false, icon: '🍞', color: '#F1E1D5' },
];

type AppContextValue = {
  username: string;
  products: Product[];
  signIn: (name: string) => void;
  signOut: () => void;
  addProduct: (product: Omit<Product, 'id' | 'featured' | 'icon' | 'color'>) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState(starterProducts);

  const value = useMemo<AppContextValue>(
    () => ({
      username,
      products,
      signIn: (name) => setUsername(name),
      signOut: () => setUsername(''),
      addProduct: (product) =>
        setProducts((current) => [
          {
            ...product,
            id: Date.now().toString(),
            featured: false,
            icon: '📦',
            color: '#E8EBE4',
          },
          ...current,
        ]),
    }),
    [products, username],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp harus digunakan di dalam AppProvider.');
  }
  return context;
}
