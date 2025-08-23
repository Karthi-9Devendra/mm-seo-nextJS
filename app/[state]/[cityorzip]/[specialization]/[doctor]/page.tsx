import React from 'react';
import { getStates } from "@/data/db";

import Link from "next/link";
import { Metadata } from "next";
import { getDoctorByNPI } from "@/data/db";
import DoctorDetail from "../../../../../components/DoctorDetail";
import DoctorDetailDemo from '@/components/DoctorDetailDemo';

type Doctor = {
  id: number;
  npi: number;
  entityTypeCode: string;
  enumerationDate: string;
  lastUpdateDate: string;
  certificationDate: string;
  user: {
    id: number;
    providerId: number;
    lastName: string;
    firstName: string;
    middleName: string;
    namePrefix: string;
    nameSuffix: string;
    credential: string;
    otherCredential: string | null;
    genderCode: string;
    isSoleProprietor: boolean;
  };
  addresses: Array<{
    id: number;
    providerId: number;
    addressType: string;
    firstLineAddress: string;
    secondLineAddress: string;
    cityName: string;
    stateName: string;
    postalCodeNew: string;
    countryCode: string;
    telephoneNumber: string;
    faxNumber: string;
  }>;
  providerTaxonomies: Array<{
    id: number;
    providerId: number;
    taxonomyId: number;
    providerLicenseNumber: string | null;
    providerLicenseNumberStateCode: string | null;
    healthcareProviderPrimaryTaxonomySwitch: boolean;
    taxonomy: {
      id: number;
      code: string;
      grouping: string;
      classification: string;
      specialization: string | null;
      definition: string;
      displayName: string;
      section: string;
    };
  }>;
};

interface PageProps {
  params: Promise<{
    state: string;
    cityorzip: string;
    specialization: string;
    doctor: string;
  }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: { params: Promise<PageProps['params']> }): Promise<Metadata> {
  const { state, cityorzip, specialization, doctor } = await params;
  // Convert kebab-case back to original format for database query
  const decodedSpecialization = specialization.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const states = await getStates() as any[];
  const stateData = states?.find((s: { name: string; key: string }) => s.name.toLowerCase().replace(/\s+/g, '-') === state);
  const isZipCode = /^\d{5}$/.test(cityorzip);
  const cityData = isZipCode ? null : {
    name: cityorzip.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: cityorzip
  };
  
  // Fetch doctor data for metadata
  let doctorData: Doctor | null = null;
  // Extract NPI from the doctor slug (it's the last part after the last hyphen)
  const npi = doctor.split('-').pop() || '';
  console.log('Doctor slug:', doctor, 'Extracted NPI:', npi);
  doctorData = await getDoctorByNPI(npi);

  const displayName = isZipCode ? `Zip Code ${cityorzip}` : cityData?.name || cityorzip;
  const title = doctorData 
    ? `${doctorData.user.namePrefix} ${doctorData.user.firstName} ${doctorData.user.lastName} - ${decodedSpecialization} in ${displayName}, ${stateData?.name}`
    : `${decodedSpecialization} Doctor in ${displayName}, ${stateData?.name}`;

  const description = doctorData
    ? `Find information about ${doctorData.user.namePrefix} ${doctorData.user.firstName} ${doctorData.user.lastName}, a ${decodedSpecialization.toLowerCase()} in ${displayName}, ${stateData?.name}. View practice locations, specialties, and contact information.`
    : `Find ${decodedSpecialization.toLowerCase()} doctors in ${displayName}, ${stateData?.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      locale: 'en_US',
      siteName: 'MedMatch Doctors',
      images: [
        {
          url: '/logo.png',
          width: 65,
          height: 60,
          alt: 'MedMatch Logo',
        },
      ],
    },
  };
}

export default async function DoctorPage({ params }: { params: Promise<PageProps['params']> }) {
  const { state, cityorzip, specialization, doctor } = await params;
  // Convert kebab-case back to original format for database query
  const decodedSpecialization = specialization.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const states = await getStates() as any[];
  const stateData = states?.find((s: { name: string; key: string }) => s.name.toLowerCase().replace(/\s+/g, '-') === state);
  const isZipCode = /^\d{5}$/.test(cityorzip);
  const cityData = isZipCode ? null : {
    name: cityorzip.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    slug: cityorzip
  };

  if (!state || !cityorzip || !specialization || !doctor) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
            <Link href={`/${state}/${cityorzip}/${specialization}`} className="text-blue-600 hover:text-blue-800">
              Return to Doctors List
            </Link>
          </div>
        </div>
      </main>
    );
  }



  let doctorData: Doctor | null = null;
  let error: string | null = null;

  try {
    // Extract NPI from the doctor slug (it's the last part after the last hyphen)
    const npi = doctor.split('-').pop() || '';
    console.log('Doctor slug:', doctor, 'Extracted NPI:', npi);
    doctorData = await getDoctorByNPI(npi);
    console.log('Doctor data found:', !!doctorData);
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred';
    console.error('Error fetching doctor:', err);
  }

  const displayName = isZipCode ? `Zip Code ${cityorzip}` : cityData?.name || cityorzip;
  console.log('Display Name:', displayName);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8" aria-label="Breadcrumb">
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
              {stateData?.name}
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href={`/${state}/${cityorzip}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {isZipCode ? `Zip: ${cityorzip}` : cityData?.name || cityorzip}
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              href={`/${state}/${cityorzip}/${specialization}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {decodedSpecialization}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">
              {doctorData ? `${doctorData.user.firstName} ${doctorData.user.lastName}` : 'Doctor Profile'}
            </span>
          </div>
        </nav>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Link 
              href={`/${state}/${cityorzip}/${specialization}/${doctor}`} 
              className="text-blue-600 hover:text-blue-800"
            >
              Try Again
            </Link>
          </div>
        ) : !doctorData ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Doctor profile not found.</p>
          </div>
        ) : (
          // <DoctorDetail
          //   doctor={doctorData}
          //   state={state}
          //   cityorzip={cityorzip}
          //   specialization={specialization}
          //   decodedSpecialization={decodedSpecialization}
          //   displayName={displayName}
          //   stateData={stateData}
          // />
          <DoctorDetailDemo
            doctor={doctorData}
            state={state}
            cityorzip={cityorzip}
            specialization={specialization}
            decodedSpecialization={decodedSpecialization}
            displayName={displayName}
            stateData={stateData}
          />
        )}
      </div>
    </main>
  );
} 