import Link from "next/link";

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

interface DoctorDetailProps {
  doctor: Doctor;
  state: string;
  cityorzip: string;
  specialization: string;
  decodedSpecialization: string;
  displayName: string;
  stateData: any;
}

export default function DoctorDetail({ 
  doctor, 
  state, 
  cityorzip, 
  specialization, 
  decodedSpecialization, 
  displayName, 
  stateData 
}: DoctorDetailProps) {
  const isZipCode = /^\d{5}$/.test(cityorzip);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {doctor.user.namePrefix} {doctor.user.firstName} {doctor.user.lastName}
              {doctor.user.nameSuffix && `, ${doctor.user.nameSuffix}`}
            </h1>
            <p className="text-xl mt-2 opacity-90">
              {doctor.user.credential} specializing in {decodedSpecialization.toLowerCase()} in {displayName}, {stateData?.name}
            </p>
            <p className="text-sm mt-1 opacity-75">
              NPI: {doctor.npi}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
              <p className="text-sm font-medium">Provider Type</p>
              <p className="text-lg font-bold">{doctor.entityTypeCode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Specializations */}
        {doctor.providerTaxonomies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Specializations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctor.providerTaxonomies.map((taxonomy, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {taxonomy.taxonomy.classification}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {taxonomy.taxonomy.definition}
                  </p>
                  {taxonomy.providerLicenseNumber && (
                    <p className="text-sm text-blue-600">
                      License: {taxonomy.providerLicenseNumber}
                      {taxonomy.providerLicenseNumberStateCode && ` (${taxonomy.providerLicenseNumberStateCode})`}
                    </p>
                  )}
                  {taxonomy.taxonomy.specialization && (
                    <p className="text-sm text-blue-600 mt-1">{taxonomy.taxonomy.specialization}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practice Locations */}
        {doctor.addresses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Practice Locations</h2>
            <div className="space-y-4">
              {doctor.addresses.map((address, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {address.addressType === 'PRIMARY' ? 'Primary Location' : `${address.addressType} Location`}
                      </h3>
                      <div className="space-y-1 text-gray-600">
                        <p>{address.firstLineAddress}</p>
                        {address.secondLineAddress && <p>{address.secondLineAddress}</p>}
                        <p>{address.cityName}, {address.stateName} {address.postalCodeNew}</p>
                        {address.telephoneNumber && (
                          <p className="text-blue-600">
                            📞 <a href={`tel:${address.telephoneNumber}`}>{address.telephoneNumber}</a>
                          </p>
                        )}
                        {address.faxNumber && (
                          <p className="text-gray-500">
                            📠 {address.faxNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Provider Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium">{doctor.user.genderCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sole Proprietor:</span>
                <span className="font-medium">{doctor.user.isSoleProprietor ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Enumeration Date:</span>
                <span className="font-medium">{new Date(doctor.enumerationDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="font-medium">{new Date(doctor.lastUpdateDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Credentials</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Primary Credential:</span>
                <span className="font-medium">{doctor.user.credential}</span>
              </div>
              {doctor.user.otherCredential && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Other Credentials:</span>
                  <span className="font-medium">{doctor.user.otherCredential}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${state}/${cityorzip}/${specialization}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              ← Back to Doctors List
            </Link>
            <Link
              href={`/${state}/${cityorzip}`}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              ← Back to Specializations
            </Link>
            <Link
              href={`/${state}`}
              className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              ← Back to {stateData?.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 