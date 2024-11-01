"use client"
import React from 'react';

interface LayeredBorderDivProps {
  children: React.ReactNode;
}

const LayeredBorderDiv: React.FC<LayeredBorderDivProps> = ({ children }) => {
  return (
    <div className="relative p-8">
      <div className="relative border-custom">
        {children}
      </div>
      <style jsx>{`
        .border-custom {
          position: relative;
          padding: 20px;
        }
        
        .border-custom::before {
          content: '';
          position: absolute;
          inset: -4px; /* Total border width */
          border: 1px solid #8B4513; /* First brown layer */
          z-index: 1;
        }

        .border-custom::after {
          content: '';
          position: absolute;
          inset: -3px; /* Offset for second layer */
          border: 1px solid black; /* Black layer */
          z-index: 2;
        }

        .border-custom {
          border: 0.5px solid #8B4513; /* Third brown layer */
        }

        .border-custom > * {
          position: relative;
          border: 0.5px solid black; /* Fourth black layer */
          padding: 16px;
          z-index: 3;
        }
      `}</style>
    </div>
  );
};

// Example usage
const ExamplePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <LayeredBorderDiv>
        <div>
          <h2 className="text-xl font-bold">Content Title</h2>
          <p>This is the content inside the layered border div.</p>
        </div>
      </LayeredBorderDiv>
    </div>
  );
};

export default ExamplePage;