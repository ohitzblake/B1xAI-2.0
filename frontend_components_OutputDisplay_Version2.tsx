import React from 'react';

interface Props {
  code: string;
  loading: boolean;
  error?: string;
  onDownload?: () => void;
}

const OutputDisplay: React.FC<Props> = ({ code, loading, error, onDownload }) => {
  return (
    <div className="mt-4">
      {loading && <div>Generating code...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {code && (
        <>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{code}</pre>
          {onDownload && (
            <button className="mt-2 bg-green-600 text-white rounded px-4 py-2" onClick={onDownload}>
              Download as ZIP
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default OutputDisplay;