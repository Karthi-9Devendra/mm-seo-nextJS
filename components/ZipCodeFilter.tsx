'use client';

import { useState } from 'react';

interface ZipCode {
  code: string;
  city: string;
  slug: string;
}

interface ZipCodeFilterProps {
  zipCodes: ZipCode[];
  state: string;
  searchTerm?: string;
  totalCount?: number;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export default function ZipCodeFilter({ zipCodes, state, pagination, totalCount, searchTerm: initialSearchTerm = '' }: ZipCodeFilterProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  // Use server-side search, so no client-side filtering needed
  const filteredZipCodes = zipCodes;

  return (
    <div>

      
      {/* Search Filter */}
      <div className="mb-6 max-w-md mx-auto">
        <div className="relative">
          <form method="get" className="w-full">
            <input
              type="text"
              name="search"
              placeholder={`Search in ${totalCount || zipCodes.length} zip codes...`}
              defaultValue={searchTerm}
              className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
            />
            <input type="hidden" name="tab" value="zipcodes" />
            <input type="hidden" name="page" value="1" />
          </form>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchTerm && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <a
                href={`/${state}?tab=zipcodes&page=1`}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredZipCodes.map((zip, index) => (
          <a
            key={`${zip.code}-${index}`}
            href={`/${state}/${zip.code}`}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 hover:border-blue-200"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                {zip.code}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {zip.city}
              </p>
            </div>
          </a>
        ))}
      </div>

      {filteredZipCodes.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500">No zip codes found matching "{searchTerm}"</p>
          <a
            href={`/${state}?tab=zipcodes&page=1`}
            className="mt-2 text-blue-600 hover:text-blue-800 underline"
          >
            Clear search
          </a>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            {pagination.currentPage > 1 && (
              <a
                href={`/${state}?tab=zipcodes&page=${pagination.currentPage - 1}${searchTerm ? `&search=${searchTerm}` : ''}`}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                Previous
              </a>
            )}
            
            <span className="px-3 py-2 text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            {pagination.currentPage < pagination.totalPages && (
              <a
                href={`/${state}?tab=zipcodes&page=${pagination.currentPage + 1}${searchTerm ? `&search=${searchTerm}` : ''}`}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                Next
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 