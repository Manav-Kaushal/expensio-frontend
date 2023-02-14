import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  sx?: string;
};

const Card = ({ header, footer, children, sx, ...props }: CardProps) => {
  return (
    <div
      className={`overflow-hidden bg-white rounded shadow-lg ${sx}`}
      {...props}
    >
      {header && (
        <div className="p-3 bg-gray-200 border-b border-gray-300">{header}</div>
      )}
      <div className="p-3">{children}</div>
      {footer && (
        <div className="p-3 bg-gray-200 border-t border-gray-300">{footer}</div>
      )}
    </div>
  );
};

export default Card;
