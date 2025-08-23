import SpecializationList from "../../../components/SpecializationList";
import { getStates } from "@/data/db";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    state: string;
    cityorzip: string;
  }>;
  searchParams?: Promise<{ page?: string; search?: string }> | undefined;
}

export default async function CityOrZipPage({ params, searchParams }: { params: Promise<PageProps['params']>, searchParams?: Promise<PageProps['searchParams']> }) {
  const { state, cityorzip } = await params;
  const states = await getStates() as any[];
  const stateData = states.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === state);
  
  // Check if the parameter is a zip code (numeric)
  const isZipCode = /^\d{5}$/.test(cityorzip);
  
  // For cities, create city data from URL parameter
  const cityData = isZipCode ? null : {
    name: cityorzip.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: cityorzip
  };
  
  if (!state || !cityorzip) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
            <Link href={`/${state}`} className="text-blue-600 hover:text-blue-800">
              Return to State
            </Link>
          </div>
        </div>
      </main>
    );
  }



  const displayName = isZipCode ? `Zip Code ${cityorzip}` : cityData?.name || cityorzip;
  const pageTitle = isZipCode 
    ? `Specialities for Zip Code ${cityorzip}`
    : `Specialities in ${displayName}`;
  const pageDescription = isZipCode
    ? `Choose a specialization to find doctors in ${stateData?.name || state}, zip code ${cityorzip}.`
    : `Find doctors by specialization`;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href={`/${state}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {stateData?.name || state.charAt(0).toUpperCase() + state.slice(1)}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">
              {isZipCode ? `Zip: ${cityorzip}` : cityData?.name || cityorzip}
            </span>
          </div>
        </nav>
        {/* <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{pageTitle}</h1>
          <p className="text-xl text-gray-600">{pageDescription}</p>
        </div> */}
        <SpecializationList state={state} city={cityorzip} searchParams={searchParams} />
      </div>
    </main>
  );
}