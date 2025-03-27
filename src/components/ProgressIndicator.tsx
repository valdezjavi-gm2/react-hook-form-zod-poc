interface ProgressIndicatorProps {
  currentStep: number;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center ${
              currentStep === 1
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            1
          </div>
          <div
            className={`ml-2 text-sm font-medium ${
              currentStep === 1 ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Account Info
          </div>
        </div>
        <div className="flex-1 mx-4 h-0.5 bg-gray-200">
          <div
            className={`h-full bg-blue-600 transition-all duration-300 ${
              currentStep === 2 ? "w-full" : "w-0"
            }`}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`rounded-full h-8 w-8 flex items-center justify-center ${
              currentStep === 2
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            2
          </div>
          <div
            className={`ml-2 text-sm font-medium ${
              currentStep === 2 ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Additional Info
          </div>
        </div>
      </div>
    </div>
  );
}
