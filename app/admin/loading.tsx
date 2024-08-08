import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-100">
    <div className=" cursor-pointer overflow-hidden text-black p-8 ">
    <Loader2 className="mr-2 h-16 w-16 animate-spin" /> 
    </div>
  </div>
  );
}















