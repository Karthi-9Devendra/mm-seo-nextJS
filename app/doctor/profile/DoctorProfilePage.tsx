"use client";

import { AppointmentBooking } from "@/components/appointmentBook";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dummyDoctor } from "@/data/dummyDoctorData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Separator } from "@radix-ui/react-context-menu";
import { ArrowLeft, Star, Phone, MapPin, Award, GraduationCap, Building, ChevronDown, ChevronUp, Loader2, Clock, Shield, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";


interface DoctorProfileData {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  boardCertified: boolean;
  professionalScore: number;
  npiNumber: string;
  imageUrl: string;
  location: {
    city: string;
    state: string;
    address: string;
    zipCode: string;
  };
  about: string;
  insuranceAccepted: string[];
  affiliatedHospitals: string[];
  education: {
    medicalSchool: string;
    residency: string;
    fellowship?: string;
  };
  phoneNumber: string;
  availableAppointments: boolean;
}

const commonQuestions = [
  {
    question: 'Q: Where does Dr. Kelly Forman practice?',
    answer: 'A: Dr. Kelly Forman practices at SuperMed - Orlando.'
  },
  {
    question: 'Q: How can I make an appointment with Dr. Kelly Forman?',
    answer: 'A: Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    question: 'Q: Why do patients visit Dr. Kelly Forman?',
    answer: 'A: Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    question: 'Q: What are patients visit about Dr. Kelly Forman?',
    answer: 'A: Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    question: 'Q: What is Dr. Kelly Forman education and qualifications?',
    answer: 'A: Lorem ipsum is simply dummy text of the printing and typesetting industry.'
  }
];

export default function DoctorProfilePage({ doctorId }:{ doctorId: string }) {
  const [doctor, setDoctor] = useState<DoctorProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedEducation, setExpandedEducation] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Check authentication status


  // Fetch doctor data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDoctor(dummyDoctor);
      setLoading(false);
    }, 500); // simulate loading
  }, [doctorId]);

  const handleBookAppointment = () => {
    if (!user) {
      // Redirect to sign up/sign in
      window.dispatchEvent(new CustomEvent('show-auth-modal'));
      return;
    }
    setShowBooking(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading doctor profile...</span>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error || 'Doctor not found'}</p>
          <Button onClick={() => window.dispatchEvent(new CustomEvent('navigate-back'))}>
            Back to Directory
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => window.dispatchEvent(new CustomEvent('navigate-back'))}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Directory
      </Button>

      {/* Doctor Header Card */}
      <Card className="mb-8 overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <ImageWithFallback
                    src={doctor.imageUrl}
                    alt={`Dr. ${doctor.name}`}
                    className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0 border-4 border-white shadow-lg"
                  />
                  {doctor.boardCertified && (
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
                        {doctor.name} {doctor.title}
                      </h1>
                      <p className="text-lg text-muted-foreground mb-2">{doctor.specialty}</p>
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="font-medium">{doctor.rating}</span>
                        <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      {doctor.availableAppointments && (
                        <Button 
                          onClick={handleBookAppointment} 
                          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2"
                        >
                          Book an Appointment
                        </Button>
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
                    <p className="font-medium">{doctor.yearsExperience}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Shield className="h-4 w-4 text-muted-foreground mr-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">Board Certified?</p>
                    <p className="font-medium">{doctor.boardCertified ? 'Yes' : 'No'}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="h-4 w-4 text-muted-foreground mr-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">Professional score</p>
                    <p className="font-medium">{doctor.professionalScore}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Stethoscope className="h-4 w-4 text-muted-foreground mr-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">NPI Number</p>
                    <p className="font-medium">{doctor.npiNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{doctor.about}</p>
            </CardContent>
          </Card>

          {/* Professional Education */}
          <Card>
            <CardHeader>
              <Collapsible open={expandedEducation} onOpenChange={setExpandedEducation}>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Professional Education
                  </CardTitle>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {expandedEducation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Affiliated Hospitals</h4>
                      <p className="text-muted-foreground">{doctor.affiliatedHospitals[0]}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Medical School</h4>
                      <p className="text-muted-foreground">{doctor.education.medicalSchool}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Residency</h4>
                      <p className="text-muted-foreground">{doctor.education.residency}</p>
                    </div>
                    
                    {doctor.education.fellowship && (
                      <div>
                        <h4 className="font-medium mb-2">Fellowship</h4>
                        <p className="text-muted-foreground">{doctor.education.fellowship}</p>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </CardHeader>
          </Card>

          {/* Location Map */}
          <Card>
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-3 gap-6 p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm">SuperMed | Headquarters</h4>
                    <p className="text-sm text-muted-foreground">
                      Exit ramp Street<br />
                      Palm Beach, FL 33157
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">SuperMed | Headquarters</h4>
                    <p className="text-sm text-muted-foreground">
                      Exit ramp Street<br />
                      Palm Beach, FL 33157
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">SuperMed | Headquarters</h4>
                    <p className="text-sm text-muted-foreground">
                      Exit ramp Street<br />
                      Palm Beach, FL 33157
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  {/* Map placeholder */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center border">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-4 text-cyan-500" />
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm">Map showing doctor locations</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Common questions & answers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {commonQuestions.map((qa, index) => (
                <div key={index}>
                  <h4 className="font-medium mb-2">{qa.question}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{qa.answer}</p>
                  {index < commonQuestions.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Insurance Plans */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Insurance plans accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {doctor.insuranceAccepted.map((insurance, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-3 py-1">
                    {insurance}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Info Cards */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Years in practice</h4>
                  <p className="text-2xl font-bold">{doctor.yearsExperience}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Board Certified?</h4>
                  <p className="text-lg font-medium">{doctor.boardCertified ? 'Yes' : 'No'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Professional score</h4>
                  <p className="text-2xl font-bold">{doctor.professionalScore}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">NPI Number</h4>
                  <p className="text-lg font-medium">{doctor.npiNumber}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Office Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SuperMed | Pediatric Unit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Orlando Hospital<br />
                  Orlando, Florida<br />
                  (D) 555 555-5555
                </p>
              </div>
              
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                {doctor.phoneNumber}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {showBooking && (
        <AppointmentBooking
          doctor={doctor}
          user={user}
          onClose={() => setShowBooking(false)}
          onSuccess={() => {
            setShowBooking(false);
            // Show success message
            window.dispatchEvent(new CustomEvent('show-toast', { 
              detail: { message: 'Appointment booked successfully!' } 
            }));
          }}
        />
      )}
    </div>
  );
}