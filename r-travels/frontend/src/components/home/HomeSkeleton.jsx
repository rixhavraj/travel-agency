import React from 'react';

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-background w-full overflow-hidden">
      {/* Hero Section Skeleton */}
      <div className="relative h-[90vh] min-h-[600px] bg-secondary/20 flex items-center justify-center animate-pulse">
        <div className="container mx-auto px-4 z-10 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-24 h-6 bg-white/10 rounded-full mb-4"></div>
          <div className="w-3/4 max-w-4xl h-16 md:h-24 bg-white/10 rounded-2xl"></div>
          <div className="w-1/2 max-w-2xl h-6 md:h-8 bg-white/10 rounded-lg"></div>
          <div className="flex gap-4 mt-8">
            <div className="w-40 h-14 bg-white/10 rounded-full"></div>
            <div className="w-40 h-14 bg-white/10 rounded-full hidden sm:block"></div>
          </div>
        </div>
      </div>

      {/* Smart Booking Widget Skeleton */}
      <div className="relative z-20 -mt-16 sm:-mt-24 mb-16 container mx-auto px-4 md:px-8">
        <div className="bg-secondary/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 bg-white/5 rounded-xl border border-white/5"></div>
            ))}
            <div className="h-14 bg-accent/20 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* Feature / AI Planner Skeleton */}
      <div className="container mx-auto px-4 md:px-8 py-16 lg:py-24 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="w-32 h-6 bg-white/10 rounded"></div>
            <div className="w-full h-12 bg-white/10 rounded-lg"></div>
            <div className="w-3/4 h-12 bg-white/10 rounded-lg"></div>
            <div className="w-full h-24 bg-white/5 rounded-xl mt-6"></div>
            <div className="w-40 h-12 bg-accent/20 rounded-full mt-4"></div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="aspect-square max-h-[500px] w-full bg-secondary/30 rounded-full border border-white/10"></div>
          </div>
        </div>
      </div>

      {/* Destinations Skeleton */}
      <div className="container mx-auto px-4 md:px-8 py-16 lg:py-24 animate-pulse">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-32 h-6 bg-white/10 rounded mb-4"></div>
          <div className="w-64 h-12 bg-white/10 rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-secondary/20 rounded-3xl border border-white/5"></div>
          ))}
        </div>
      </div>

      {/* Tour Packages Skeleton */}
      <div className="bg-primary py-24 animate-pulse">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-4">
              <div className="w-32 h-6 bg-white/10 rounded"></div>
              <div className="w-72 h-12 bg-white/10 rounded-lg"></div>
            </div>
            <div className="flex gap-4 hidden md:flex">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5"></div>
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[450px] bg-secondary/40 rounded-3xl border border-white/10">
                <div className="h-60 bg-white/5 rounded-t-3xl"></div>
                <div className="p-6 space-y-4">
                  <div className="w-24 h-4 bg-white/10 rounded"></div>
                  <div className="w-full h-8 bg-white/10 rounded"></div>
                  <div className="w-2/3 h-8 bg-white/10 rounded"></div>
                  <div className="flex gap-2">
                    <div className="w-16 h-6 bg-white/5 rounded"></div>
                    <div className="w-20 h-6 bg-white/5 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
