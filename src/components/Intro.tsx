"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import {
  getIntroSeen,
  getIntroSeenOnServer,
  markIntroSeen,
  subscribeIntro,
} from "@/lib/intro";
import { usePrefersReducedMotion } from "@/lib/media";

/* ═══════════════════════════════════════════════════════════
   El hero espera a que la cortina se abra para animar.
   ═══════════════════════════════════════════════════════════ */

const IntroContext = createContext(true);

/** `true` cuando la página ya puede empezar a moverse. */
export function useIntroDone() {
  return useContext(IntroContext);
}

const WORDS = ["Pensar", "Experimentar", "Construir", "Transformar"];

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const seen = useSyncExternalStore(
    subscribeIntro,
    getIntroSeen,
    getIntroSeenOnServer,
  );
  const reduced = usePrefersReducedMotion();

  const playing = !seen && !reduced;

  useEffect(() => {
    if (!playing) return;
    // Nadie entra a mitad de página durante la intro.
    window.scrollTo(0, 0);
    lockScroll();
    return unlockScroll;
  }, [playing]);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={!playing}>
        <AnimatePresence>
          {playing && <Curtain key="curtain" onDone={markIntroSeen} />}
        </AnimatePresence>
        {children}
      </IntroContext.Provider>
    </MotionConfig>
  );
}

/* ═══════════════════════════════════════════════════════════
   La cortina
   ═══════════════════════════════════════════════════════════ */

function Curtain({ onDone }: { onDone: () => void }) {
  const count = useMotionValue(0);
  const readout = useTransform(count, (v) =>
    Math.round(v).toString().padStart(3, "0"),
  );
  const fill = useTransform(count, (v) => `${v}%`);

  const [wordIndex, setWordIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 1.9,
      ease: [0.5, 0, 0.2, 1],
      onComplete: () => {
        if (doneRef.current) return;
        doneRef.current = true;
        setLeaving(true);
        // La cortina tarda 0.95s en subir; recién entonces liberamos la página.
        window.setTimeout(onDone, 950);
      },
    });

    const cycle = window.setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      420,
    );

    return () => {
      controls.stop();
      window.clearInterval(cycle);
    };
  }, [count, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      animate={{ clipPath: leaving ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
      transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Cabecera */}
      <motion.div
        className="u-shell flex items-baseline justify-between pt-[var(--gut)]"
        animate={{ opacity: leaving ? 0 : 1, y: leaving ? -20 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="u-mono text-[var(--fg-soft)]">Fil Lab</span>
        <span className="u-mono text-[var(--fg-faint)]">Barcelona</span>
      </motion.div>

      {/* Palabra rotando */}
      <motion.div
        className="u-shell flex flex-1 items-center"
        animate={{ opacity: leaving ? 0 : 1, y: leaving ? -40 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="u-clip">
          <AnimatePresence mode="wait">
            <motion.p
              key={wordIndex}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
              className="u-display-tight text-bone"
              style={{ fontSize: "var(--t-h2)" }}
            >
              {WORDS[wordIndex]}
              <span className="u-dot" />
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Contador y barra */}
      <div className="u-shell pb-[var(--gut)]">
        <motion.div
          className="mb-4 flex items-end justify-between"
          animate={{ opacity: leaving ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="u-mono text-[var(--fg-faint)]">
            Cargando el laboratorio
          </span>
          <motion.span
            className="u-mono-num font-light leading-none text-bone"
            style={{ fontSize: "clamp(2rem,6vw,4.5rem)" }}
          >
            {readout}
          </motion.span>
        </motion.div>

        <div className="relative h-px w-full bg-[var(--hair)]">
          <motion.div
            className="absolute inset-y-0 left-0 bg-lime"
            style={{ width: fill }}
          />
        </div>
      </div>
    </motion.div>
  );
}
