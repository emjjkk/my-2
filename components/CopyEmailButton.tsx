'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hi@emjjkk.tech');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      id="copy-email-btn"
      onClick={copyEmail}
      title="Copy Email Address"
      className="p-1 hover:opacity-100 opacity-60 transition-opacity cursor-pointer inline-flex items-center justify-center"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
