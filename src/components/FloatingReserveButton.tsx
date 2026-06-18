"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type FloatingReserveButtonProps = {
  visible: boolean;
  onClick: () => void;
};

export function FloatingReserveButton({ visible, onClick }: FloatingReserveButtonProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          variants={{
            hidden: { y: 96, opacity: 0, transition: { duration: 0.22, ease: "easeIn" } },
            visible: {
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 320, damping: 28, delay: 0.65 },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.button
            type="button"
            onClick={onClick}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-card)] px-6 py-3.5 text-sm font-bold tracking-wide text-[color:var(--text-main)] shadow-[0_12px_40px_oklch(0.18_0.008_60/0.18)] backdrop-blur-xl transition-colors hover:border-[color:var(--accent-vermillion)] hover:text-[color:var(--accent-vermillion)]"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              y: {
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              },
            }}
          >
            Reserve now
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
