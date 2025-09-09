import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className="w-full rounded-3xl p-4 border overflow-hidden relative">
      <style>
        {`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-bg {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        `}
      </style>
      <div className="flex justify-between">
        <div className='flex justify-center items-center gap-3'>
        {/* Profile Image Skeleton */}
            <div className="w-20 h-20 rounded-full bg-gray-200 shimmer-bg">
                
            </div>
        <div className='flex flex-col gap-2'>
        {/* Username Skeleton */}
        <div className="mt-3 h-4 w-32 rounded-lg bg-gray-200 shimmer-bg"></div>
        {/*Email Skeleton */}
        <div className="mt-2 h-3 w-48 rounded-lg bg-gray-200 shimmer-bg"></div>
        {/* Bio Skeleton */}
        <div className="mt-2 h-3 w-48 rounded-lg bg-gray-200 shimmer-bg"></div>
        <div className='mt-2 h-3 w-20 rounded-xl bg-gray-200 '></div>
        </div>

        </div>
        <div className='h-10 w-20 rounded-md bg-gray-200 shimmer-bg'>

        </div>
        </div>
        </div>
  );
};

export default ProfileSkeleton;
