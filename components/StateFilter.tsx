'use client';

import { useState } from 'react';

interface State {
  name: string;
  key: string;
}

interface StateFilterProps {
  states: State[];
}

export default function StateFilter({ states }: StateFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>

      
      {/* Search Filter */}
      <div className="mb-6 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder={`Search in ${states.length} states...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={() => setSearchTerm('')}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredStates.map((state) => {
          const slug = state.name.toLowerCase().replace(/\s+/g, '-');
          return (
            <a
              key={slug}
              href={`/${slug}`}
              className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 hover:border-blue-200"
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                  {state.name}
                </h2>
              </div>
            </a>
          );
        })}
      </div>

      {filteredStates.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500">No states found matching "{searchTerm}"</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-2 text-blue-600 hover:text-blue-800 underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
} 