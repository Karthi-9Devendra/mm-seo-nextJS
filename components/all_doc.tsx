"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Phone, Star, Users } from "lucide-react";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const mockDoctors = [
  {
    id: 1,
    name: "John Doe",
    title: "MD",
    boardCertified: true,
    specialty: "Cardiology",
    rating: 4.8,
    reviewCount: 32,
    availableAppointments: true,
    yearsExperience: 12,
    location: {
      city: "New York",
      state: "NY",
      address: "123 Main St, New York, NY 10001"
    },
    insuranceAccepted: ["Aetna", "Blue Cross", "Cigna", "United"],
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  // Add more mock doctors as needed
];

const specialties = ["Cardiology", "Dermatology", "Pediatrics"];
const cities = ["New York", "Los Angeles", "Chicago"];

const alldoc = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all-specialties");
  const [selectedCity, setSelectedCity] = useState("all-cities");
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState(mockDoctors);

  useEffect(() => {
    setLoading(true);
    // Simulate filtering
    let filtered = mockDoctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "all-specialties" ||
        doctor.specialty === selectedSpecialty;
      const matchesCity =
        selectedCity === "all-cities" ||
        doctor.location.city === selectedCity;
      return matchesSearch && matchesSpecialty && matchesCity;
    });
    setDoctors(filtered);
    setLoading(false);
  }, [searchTerm, selectedSpecialty, selectedCity]);

    return(
     <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Find the Right Doctor for You</h1>
        <p className="text-muted-foreground">
          Search through our comprehensive directory of board-certified physicians
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by doctor name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-specialties">All Specialties</SelectItem>
              {specialties.map(specialty => (
                <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-cities">All Cities</SelectItem>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {doctors.length} {doctors.length === 1 ? 'doctor' : 'doctors'} found
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="grid gap-6">
        {doctors.map(doctor => (
          <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Doctor Image */}
                <div className="flex-shrink-0">
                  <img
                    src={doctor.imageUrl}
                    alt={`Dr. ${doctor.name}`}
                    className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&size=128&background=random`;
                    }}
                  />
                </div>

                {/* Doctor Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h3 className="text-primary">{doctor.name} {doctor.title}</h3>
                      {doctor.boardCertified && (
                        <Badge variant="secondary" className="w-fit">Board Certified</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{doctor.specialty}</p>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{doctor.rating}</span>
                        <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
                      </div>
                      {doctor.availableAppointments && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Available Appointments
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.yearsExperience} years in practice</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.location.city}, {doctor.location.state}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.insuranceAccepted.length} insurance plans accepted</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Location:</span> {doctor.location.address}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Insurance:</span> {doctor.insuranceAccepted.slice(0, 3).join(', ')}
                        {doctor.insuranceAccepted.length > 3 && ` +${doctor.insuranceAccepted.length - 3} more`}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button 
                      onClick={() => {
                        // Trigger custom event for navigation
                        window.dispatchEvent(new CustomEvent('navigate-to-doctor', { detail: { doctorId: doctor.id } }));
                      }}
                      className="flex-1 sm:flex-none"
                    >
                      View Profile
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Office
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {doctors.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No doctors found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setSelectedSpecialty('all-specialties');
              setSelectedCity('all-cities');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
    )
}

export default alldoc;