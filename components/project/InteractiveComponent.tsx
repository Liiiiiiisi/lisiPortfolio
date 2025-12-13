'use client';

interface InteractiveComponentProps {
  name?: string;
  children?: React.ReactNode;
}

export default function InteractiveComponent({ name, children }: InteractiveComponentProps) {
  return (
    <div className="my-8 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl">
      {name && (
        <h3 className="text-lg font-semibold mb-4 text-white">
          {name}
        </h3>
      )}
      {children && (
        <div className="mt-4 text-white">
          {children}
        </div>
      )}
      {!children && (
        <p className="text-sm text-gray-400 italic">
          Interactive component placeholder: {name || 'unnamed'}
        </p>
      )}
    </div>
  );
}
