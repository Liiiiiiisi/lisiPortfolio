'use client';

interface InteractiveComponentProps {
  name?: string;
  children?: React.ReactNode;
}

export default function InteractiveComponent({ name, children }: InteractiveComponentProps) {
  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {name && (
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {name}
        </h3>
      )}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
      {!children && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          Interactive component placeholder: {name || 'unnamed'}
        </p>
      )}
    </div>
  );
}

