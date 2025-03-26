
import React, { useState, useEffect } from 'react';
import WeeklyComparisonChart from '../components/WeeklyComparisonChart';
import ExactReplicaChart from '../components/ExactReplicaChart';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="w-full bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">ECharts Magic Visuals</h1>
              <p className="text-sm text-gray-500 mt-1">Beautiful data visualizations with precision</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="min-h-[500px] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading visualizations...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <section>
              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">Weekly A/B Comparison</h2>
                  <p className="text-gray-500">Exact replica of the reference visualization</p>
                </div>
                <ExactReplicaChart 
                  title="Daily Performance Metrics" 
                  subtitle="Comparison of A/B metrics by day of the week" 
                />
              </div>
            </section>
            
            <section className="mt-12">
              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800">Enhanced Visualization</h2>
                  <p className="text-gray-500">The same data with improved visual aesthetics</p>
                </div>
                <WeeklyComparisonChart 
                  title="Enhanced Weekly Performance" 
                  subtitle="A more refined version of the comparison chart" 
                />
              </div>
            </section>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              <p>© 2023 ECharts Magic Visuals. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">Elegantly visualizing your data</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
