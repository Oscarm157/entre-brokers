"use client";

// Viewport-triggered fade-up for section headings
export const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 28 },
  },
};

// Stagger container for card grids
export const staggerContainer = (staggerDelay = 0.1) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay, delayChildren: 0.15 },
  },
});

// Individual card entrance
export const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

// Hover elevation for cards
export const cardHover = {
  y: -4,
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
};

// Button micro-interactions
export const buttonHover = { scale: 1.03 };
export const buttonTap = { scale: 0.97 };

// Slide-in from left
export const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 28 },
  },
};

// Slide-in from right
export const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 28 },
  },
};

// Standard viewport trigger settings
export const viewportOnce = { once: true, margin: "-80px" as const };
