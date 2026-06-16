'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { HERO_SLIDES } from '../model/constants/home.constants';

const AUTO_ADVANCE_MS = 4500;

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, AUTO_ADVANCE_MS);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const activeSlide = HERO_SLIDES[activeIndex];

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-slate-950 p-6 shadow-2xl shadow-slate-950/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(148,163,184,0.28),transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.82),rgba(15,23,42,0.98))]" />

      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
              Fleet showcase
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Administrative-grade vehicle presentation
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            {activeIndex + 1}/{HERO_SLIDES.length}
          </div>
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.image}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0"
              exit={{ opacity: 0, scale: 1.04 }}
              initial={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <Image
                alt={activeSlide.title}
                className="h-full w-full object-cover"
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 1024px) 100vw, 40vw"
                src={activeSlide.image}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06),rgba(15,23,42,0.65))]" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.title}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-2"
              exit={{ opacity: 0, y: 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <h3 className="text-2xl font-semibold text-white">
                {activeSlide.title}
              </h3>
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                {activeSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-2">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.title}
                  aria-label={`Show slide ${index + 1}: ${slide.title}`}
                  className={`h-2.5 rounded-full transition ${
                    isActive
                      ? 'w-10 bg-white'
                      : 'w-2.5 bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
