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
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
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
    <div className="mt-8">
      <AnimatedProgress currentStep={currentStep} />

      {/* Error banner */}
      <AnimatePresence>
        {form.error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden rounded-lg border border-urgent/30 bg-urgent/10 px-4 py-3 text-sm text-urgent"
          >
            {form.error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step content */}
      <div className="relative min-h-[320px]">
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
      <div className="mt-10 flex items-center justify-between border-t border-border pt-6 pb-8">
        <div>
          {currentStep > 0 && (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button type="button" variant="outline" onClick={goBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Atrás
              </Button>
            </motion.div>
          )}
        </div>
        <div>
          {isLastStep ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                disabled={!canProceed || form.loading}
                onClick={form.handleSubmit}
                className="bg-gold-gradient text-white hover:opacity-90 shadow-gold font-semibold px-8"
              >
                {form.loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Publicar Solicitud
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                disabled={!canProceed}
                onClick={goNext}
                className="bg-gold-gradient text-white hover:opacity-90 shadow-gold font-semibold px-8"
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
