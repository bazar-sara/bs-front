'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

export type TransactionType = 'charge' | 'purchase' | 'refund' | 'withdrawal';

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
};

export type Wallet = {
  balance: number;
  transactions: Transaction[];
};

type WalletContextProps = {
  wallet: Wallet | null;
  isLoading: boolean;
  chargeWallet: (amount: number) => Promise<void>;
  deductWallet: (amount: number, description: string) => Promise<boolean>;
  getTransactions: () => Transaction[];
  refreshWallet: () => void;
};

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

type WalletProviderProps = {
  children: ReactNode;
  userId: string | null;
};

export const WalletProvider = ({ children, userId }: WalletProviderProps) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadWallet = useCallback(() => {
    if (!userId || typeof window === 'undefined') {
      setWallet(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const storedWallet = localStorage.getItem(`wallet_${userId}`);
      if (storedWallet) {
        const parsedWallet = JSON.parse(storedWallet);
        setWallet({
          ...parsedWallet,
          transactions: parsedWallet.transactions.map((t: Transaction) => ({
            ...t,
            date: new Date(t.date),
          })),
        });
      } else {
        const initialWallet: Wallet = {
          balance: 0,
          transactions: [],
        };
        setWallet(initialWallet);
        localStorage.setItem(`wallet_${userId}`, JSON.stringify(initialWallet));
      }
    } catch (error) {
      console.error('Error loading wallet:', error);
      setWallet({ balance: 0, transactions: [] });
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  const saveWallet = useCallback(
    (updatedWallet: Wallet) => {
      if (!userId || typeof window === 'undefined') return;
      localStorage.setItem(`wallet_${userId}`, JSON.stringify(updatedWallet));
      setWallet(updatedWallet);
    },
    [userId]
  );

  const chargeWallet = useCallback(
    async (amount: number) => {
      if (!wallet || amount <= 0) {
        throw new Error('مبلغ نامعتبر است');
      }

      const newTransaction: Transaction = {
        id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'charge',
        amount,
        description: 'شارژ کیف پول',
        date: new Date(),
        status: 'completed',
      };

      const updatedWallet: Wallet = {
        balance: wallet.balance + amount,
        transactions: [newTransaction, ...wallet.transactions],
      };

      saveWallet(updatedWallet);
    },
    [wallet, saveWallet]
  );

  const deductWallet = useCallback(
    async (amount: number, description: string): Promise<boolean> => {
      if (!wallet) {
        throw new Error('کیف پول یافت نشد');
      }

      if (amount <= 0) {
        throw new Error('مبلغ نامعتبر است');
      }

      if (wallet.balance < amount) {
        return false;
      }

      const newTransaction: Transaction = {
        id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'purchase',
        amount: -amount,
        description,
        date: new Date(),
        status: 'completed',
      };

      const updatedWallet: Wallet = {
        balance: wallet.balance - amount,
        transactions: [newTransaction, ...wallet.transactions],
      };

      saveWallet(updatedWallet);
      return true;
    },
    [wallet, saveWallet]
  );

  const getTransactions = useCallback((): Transaction[] => {
    return wallet?.transactions || [];
  }, [wallet]);

  const refreshWallet = useCallback(() => {
    loadWallet();
  }, [loadWallet]);

  const value: WalletContextProps = {
    wallet,
    isLoading,
    chargeWallet,
    deductWallet,
    getTransactions,
    refreshWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

