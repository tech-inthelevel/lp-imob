'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ContactModal } from '@/components/ContactModal';

interface ContactModalValue {
  /** Open the contact modal. `source` is sent to analytics (which CTA opened it). */
  open: (source?: string) => void;
  close: () => void;
}

const ContactModalContext = createContext<ContactModalValue | null>(null);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>(undefined);

  const open = useCallback((s?: string) => {
    setSource(s);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<ContactModalValue>(() => ({ open, close }), [open, close]);

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal isOpen={isOpen} onClose={close} source={source} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal(): ContactModalValue {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return ctx;
}
