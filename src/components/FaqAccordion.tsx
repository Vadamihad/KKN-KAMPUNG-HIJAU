import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface FaqAccordionProps {
  items: FAQItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>('faq-1'); // Default open first item

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq-accordion" className="space-y-4 max-w-3xl mx-auto">
      {items.map((item) => {
        const isOpen = openId === item.id;
        
        return (
          <div
            key={item.id}
            id={`faq-item-${item.id}`}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'border-brand-medium/50 bg-brand-light/25 shadow-sm'
                : 'border-border-soft bg-white hover:border-brand-primary'
            }`}
          >
            {/* Header / Question Button */}
            <button
              id={`btn-faq-${item.id}`}
              onClick={() => toggleItem(item.id)}
              className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 cursor-pointer"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-3">
                <HelpCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-200 ${
                  isOpen ? 'text-brand-primary' : 'text-neutral-light'
                }`} />
                <span className="font-display font-bold text-brand-deep text-sm sm:text-base leading-snug">
                  {item.question}
                </span>
              </div>
              <div className={`p-1 rounded-lg transition-transform duration-300 ${
                isOpen ? 'bg-brand-light text-brand-deep rotate-180' : 'bg-bg-light text-neutral-light'
              }`}>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </div>
            </button>

            {/* Answer Panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`answer-container-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-1 text-neutral-muted text-sm sm:text-base leading-relaxed pl-11">
                    <p className="whitespace-pre-line text-sm text-neutral-muted">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
