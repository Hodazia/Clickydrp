'use client'

import React from 'react'

export default function MobilePreviewSkeleton() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[340px] h-[720px] md:w-[360px] md:h-[740px] rounded-[2.5rem] border-[10px] border-black/90 shadow-2xl overflow-hidden bg-black/5">
        <div className="absolute inset-[10px] rounded-[2rem] overflow-hidden bg-gray-100">
          <div className="absolute inset-0 animate-pulse">
            <div className="h-40 bg-gray-200" />
            <div className="p-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gray-300" />
              <div className="mt-3 h-4 w-40 mx-auto bg-gray-300 rounded" />
              <div className="mt-2 h-3 w-56 mx-auto bg-gray-200 rounded" />
              <div className="mt-5 space-y-3">
                <div className="h-12 w-full bg-gray-200 rounded-xl" />
                <div className="h-12 w-full bg-gray-200 rounded-xl" />
                <div className="h-12 w-full bg-gray-200 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


