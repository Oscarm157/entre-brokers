"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedProgress } from "./animated-progress";
import { StepQueBusca } from "./steps/step-que-busca";
import { StepDondePrecio } from "./steps/step-donde-precio";
import { StepCaracteristicas } from "./steps/step-caracteristicas";
import { StepDetalles } from "./steps/step-detalles";
import type { SolicitudForm } from "./use-solicitud-form";

const TOTAL_STEPS = 4;

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    filter: "blur(4px)",
  }),
};

const stepTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

interface WizardShellProps {
  form: SolicitudForm;
}

export function WizardShell({ form }: WizardShellProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  function goNext() {
    if (!form.canAdvance(currentStep)) return;
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  function renderStep() {
    switch (currentStep) {
      case 0: return <StepQueBusca form={form} />;
      case 1: return <StepDondePrecio form={form} />;
      case 2: return <StepCaracteristicas form={form} />;
      case 3: return <StepDetalles form={form} />;
      default: return null;
    }
  }

  const isLastStep = currentStep === TOTAL_STEPS - 1;
  const canProceed = form.canAdvance(currentStep);

  return (
    <div className="mt-10">
      <AnimatedProgress currentStep={currentStep} />

      {/* Error banner */}
      <AnimatePresence>
        {form.error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-8 rounded-2xl bg-urgent/8 px-5 py-4 text-sm text-urgent"
          >
            {form.error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step content */}
      <div className="relative min-h-[380px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={stepTransition}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <motion.div
        className="mt-12 flex items-center justify-between pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          {currentStep > 0 ? (
            <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                variant="ghost"
                onClick={goBack}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Atrás
              </Button>
            </motion.div>
          ) : (
            <div />
          )}
        </div>
        <div>
          {isLastStep ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                disabled={!canProceed || form.loading}
                onClick={form.handleSubmit}
                className="h-12 gap-2 rounded-xl bg-gold-gradient px-10 text-base font-semibold text-white shadow-gold hover:opacity-90"
              >
                {form.loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Publicar Solicitud
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.02, x: 3 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                disabled={!canProceed}
                onClick={goNext}
                className="h-12 gap-2 rounded-xl bg-gold-gradient px-10 text-base font-semibold text-white shadow-gold hover:opacity-90"
              >
                Siguiente
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
