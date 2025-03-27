'use client';

import { useEffect, useState } from 'react';

interface RenderCounterProps {
  className?: string;
  formState: Record<string, any>;
}

export function RenderCounter({ className = "", formState }: RenderCounterProps) {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(count => count + 1);
  }, [formState]);

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg border border-gray-200 min-w-[200px] ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Form Renders</h3>
      <div className="text-3xl font-bold text-blue-600 mb-3">{renderCount}</div>
      <div className="text-sm text-gray-500">
        Dirty Fields: {Object.keys(formState.dirtyFields || {}).length}
      </div>
    </div>
  );
}
