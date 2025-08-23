"use client";
import { useState } from 'react';
import { DoctorProfileData, dummyDoctor } from '../data/dummyDoctorData';
import { ArrowLeft, Star, Phone, MapPin, Calendar, Award, GraduationCap, Building, ChevronDown, ChevronUp, Loader2, Clock, Shield, Stethoscope } from 'lucide-react';
// Import your UI components as needed
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
const commonQuestions = [
  {
    question: 'Q: Where does Dr. Kelly Forman practice?',
    answer: 'A: Dr. Kelly Forman practices at SuperMed - Orlando.'
  },
  {
    question: 'Q: How can I make an appointment with Dr. Kelly Forman?',
    answer: 'A: You can book an appointment online or call the office.'
  },
  {
    question: 'Q: Why do patients visit Dr. Kelly Forman?',
    answer: 'A: For pediatric care, checkups, and consultations.'
  },
  {
    question: 'Q: What are patients visit about Dr. Kelly Forman?',
    answer: 'A: General pediatric concerns and wellness.'
  },
  {
    question: 'Q: What is Dr. Kelly Forman education and qualifications?',
    answer: 'A: Harvard Medical School, Johns Hopkins Hospital, Boston Children\'s Hospital.'
  }
];
interface DoctorDetailProps {
  doctor: Doctor;
  state: string;
  cityorzip: string;
  specialization: string;
  decodedSpecialization: string;
  displayName: string;
  stateData: any;
}

export default function DoctorDetailDemo(
    {
  doctor, 
  state, 
  cityorzip, 
  specialization, 
  decodedSpecialization, 
  displayName, 
  stateData 
    }: DoctorDetailProps

) {
  const [doctordummy] = useState<DoctorProfileData>(dummyDoctor);
  const [expandedEducation, setExpandedEducation] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
    const isZipCode = /^\d{5}$/.test(cityorzip);
    const fullname = `${doctor.user.firstName} ${doctor.user.middleName ? doctor.user.middleName + ' ' : ''}${doctor.user.lastName}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back Button */}
      <button className="mb-6 flex items-center" onClick={() => window.history.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Directory
      </button>

      {/* Doctor Header Card */}
      <div className="mb-8 overflow-hidden rounded-lg shadow bg-gradient-to-r from-blue-50 to-cyan-50 p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={doctordummy.imageUrl}
                alt={`Dr. ${doctor.user.firstName}${doctor.user.middleName} ${doctor.user.lastName}`}
                className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0 border-4 border-white shadow-lg"
              />
              {doctordummy.boardCertified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                  <Shield className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-3xl font-bold text-primary mb-1">
                    {fullname} {doctor.user.credential}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-2"> {doctor.user.credential} specializing in {decodedSpecialization.toLowerCase()} in {displayName}, {stateData?.name}</p>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(doctordummy.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-medium">{doctordummy.rating}</span>
                    <span className="text-muted-foreground">({doctordummy.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  {doctordummy.availableAppointments && (
                    <button 
                      onClick={() => setShowBooking(true)} 
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded"
                    >
                      Book an Appointment
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                </div>
                <p className="text-sm text-muted-foreground">Years in practice</p>
                <p className="font-medium">{doctordummy.yearsExperience}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Shield className="h-4 w-4 text-muted-foreground mr-1" />
                </div>
                <p className="text-sm text-muted-foreground">Board Certified?</p>
                <p className="font-medium">{doctordummy.boardCertified ? 'Yes' : 'No'}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Award className="h-4 w-4 text-muted-foreground mr-1" />
                </div>
                <p className="text-sm text-muted-foreground">Professional score</p>
                <p className="font-medium">{doctordummy.professionalScore}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Stethoscope className="h-4 w-4 text-muted-foreground mr-1" />
                </div>
                <p className="text-sm text-muted-foreground">NPI Number</p>
                <p className="font-medium">{doctor.npi}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">{doctordummy.about}</p>
          </div>

          {/* Professional Education */}
          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                <span className="text-lg font-semibold">Professional Education</span>
              </div>
              <button onClick={() => setExpandedEducation((v) => !v)} className="p-2">
                {expandedEducation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
            {expandedEducation && (
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Affiliated Hospitals</h4>
                  <p className="text-muted-foreground">{doctordummy.affiliatedHospitals.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Medical School</h4>
                  <p className="text-muted-foreground">{doctordummy.education.medicalSchool}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Residency</h4>
                  <p className="text-muted-foreground">{doctordummy.education.residency}</p>
                </div>
                {doctordummy.education.fellowship && (
                  <div>
                    <h4 className="font-medium mb-2">Fellowship</h4>
                    <p className="text-muted-foreground">{doctordummy.education.fellowship}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Location Map */}
          <div className="bg-white rounded-lg shadow">
            <div className="grid lg:grid-cols-3 gap-6 p-6">
              <div className="space-y-4">
                {doctor.addresses.map((address, index) => (
    

                <div key={index}>
                   {address.addressType === 'PRIMARY' ? 'Primary Location' : `${address.addressType} Location`}
                  {/* <p className="text-sm text-muted-foreground">
                    Exit ramp Street<br />
                    Palm Beach, FL 33157
                  </p> */}
                  <p className="text-sm text-muted-foreground" >{address.firstLineAddress}</p>
                        {address.secondLineAddress && <p>{address.secondLineAddress}</p>}
                        <p className="text-sm text-muted-foreground">{address.cityName}, {address.stateName} {address.postalCodeNew}</p>
                </div>
                ))};
              </div>
              <div className="lg:col-span-2">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center border">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-cyan-500" />
                    <p className="font-medium">Interactive Map</p>
                    <p className="text-sm">Map showing doctor locations</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 border rounded p-2 flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </button>
                  
                  <button className="flex-1 border rounded p-2 flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Directions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Common Questions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Common questions & answers</h2>
            <div className="space-y-6">
              {commonQuestions.map((qa, index) => (
                <div key={index}>
                  <h4 className="font-medium mb-2">{qa.question}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{qa.answer}</p>
                  {index < commonQuestions.length - 1 && <hr className="mt-6" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Insurance Plans */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Insurance plans accepted</h3>
            <div className="flex flex-wrap gap-2">
              {doctordummy.insuranceAccepted.map((insurance, index) => (
                <span key={index} className="border rounded px-3 py-1 text-xs">
                  {insurance}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Years in practice</h4>
              <p className="text-2xl font-bold">{doctordummy.yearsExperience}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Board Certified?</h4>
              <p className="text-lg font-medium">{doctordummy.boardCertified ? 'Yes' : 'No'}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <h4 className="font-medium text-sm text-muted-foreground mb-1">Professional score</h4>
              <p className="text-2xl font-bold">{doctordummy.professionalScore}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <h4 className="font-medium text-sm text-muted-foreground mb-1">NPI Number</h4>
              <p className="text-lg font-medium">{doctor.npi}</p>
            </div>
          </div>

          {/* Office Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">SuperMed | Pediatric Unit</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Orlando Hospital<br />
                  Orlando, Florida<br />
                  (D) 555 555-5555
                </p>
              </div>
              <button className="w-full border rounded p-2 flex items-center justify-center">
                <Phone className="h-4 w-4 mr-2" />
                {doctor.addresses[0]?.telephoneNumber }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal (dummy) */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
            <p className="mb-4">Booking for {fullname}</p>
            <button onClick={() => setShowBooking(false)} className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
