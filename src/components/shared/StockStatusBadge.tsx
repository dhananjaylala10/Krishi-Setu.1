import React from 'react';
import type { StockStatus, Language } from '../../types';
import { getStockBadgeConfig } from '../../utils/formatters';

interface StockStatusBadgeProps {
  status: StockStatus;
  language: Language;
  className?: string;
}

export const StockStatusBadge: React.FC<StockStatusBadgeProps> = ({
  status,
  language,
  className = '',
}) => {
  const config = getStockBadgeConfig(status, language);

  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap inline-flex items-center gap-1.5 ${config.className} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {config.isSevere && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dotColor.split(' ')[0]}`}></span>
      </span>
      <span>{config.label}</span>
    </span>
  );
};
