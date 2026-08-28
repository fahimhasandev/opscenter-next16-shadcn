export type OperationStep = 1 | 2 | 3;

type Props = {
  currentStep: OperationStep;
  disabled: boolean;
  onChange: (step: OperationStep) => void;
};

const STEPS = [
  ["Targets", "Environment & servers"],
  ["Parameters", "Configure settings"],
  ["Review", "Verify & run"],
] as const;

export function OperationStepper({ currentStep, disabled, onChange }: Props) {
  return (
    <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800 lg:px-6">
      <div className="grid grid-cols-3 gap-1 sm:gap-4">
        {STEPS.map(([title, subtitle], index) => {
          const step = (index + 1) as OperationStep;
          const active = currentStep === step;
          const completed = currentStep > step;

          return (
            <button
              key={title}
              disabled={disabled}
              onClick={() => (completed || active) && onChange(step)}
              className={`flex min-w-0 items-center gap-2 rounded-lg p-2 text-left sm:gap-3 ${
                active ? "bg-indigo-50 dark:bg-indigo-950/30" : ""
              }`}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold ${
                  active
                    ? "bg-indigo-600 text-white"
                    : completed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {step}
              </span>
              <span>
                <span className="block text-sm font-medium">{title}</span>
                <span className="hidden text-xs text-slate-500 sm:block">{subtitle}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
