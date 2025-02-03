"use client";

import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center my-24">
      <div className="w-12 h-12 border-4 border-[#B88E2F] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
