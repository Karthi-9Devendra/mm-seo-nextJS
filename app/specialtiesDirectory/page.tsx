"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState, useMemo } from "react";

const specialties: Record<string, {
  name: string;
  description: string;
  icon: React.ReactNode;
  doctorCount: number;
  commonConditions: string[];
}> = {
  Cardiology: {
    name: "Cardiology",
    description: "Heart and blood vessel disorders.",
    icon: "❤️",
    doctorCount: 42,
    commonConditions: ["Hypertension", "Arrhythmia", "Heart Failure", "Coronary Artery Disease", "Valve Disease"],
  },
  // Add more specialties as needed
};

const specialtiesList = Object.entries(specialties);

const page = () => {
  const router = useRouter();
  const Users = null;
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSpecialties = useMemo(
    () =>
      specialtiesList.filter(([_, specialty]) =>
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialty.commonConditions.some((c) =>
          c.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [searchTerm]
  );

    function onSpecialtySelect(specialtyName: string) {
        window.dispatchEvent(new CustomEvent('navigate-to-specialty', { detail: { specialty: specialtyName } }));
    }

    return(
         <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Medical Specialties</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find the right medical specialist for your health needs. Browse our comprehensive directory of medical specialties and connect with board-certified physicians.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search specialties, conditions, or treatments..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 text-lg"
          />
        </div>
      </div>

      {/* Featured Specialties */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Featured Specialties</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSpecialties.map(([specialtyName, specialty]) => {
            return (
              <Card 
                key={specialtyName}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20"
                onClick={() => {
                  router.push(`/specialties`);
                //   onSpecialtySelect?.(specialtyName);
                  window.dispatchEvent(new CustomEvent('navigate-to-specialty', { detail: { specialty: specialtyName } }));
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{specialty.icon}</div>
                  <h3 className="font-semibold mb-2">{specialty.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{specialty.description}</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-primary">
                    {/* <Users className="h-4 w-4" /> */}
                    <span>{specialty.doctorCount} doctors</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Specialties */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">All Specialties</h2>
          <p className="text-muted-foreground">
            {/* {filteredSpecialties.length} {filteredSpecialties.length === 1 ? 'specialty' : 'specialties'} found */}
          </p>
        </div>

        <div className="grid gap-6">
          {filteredSpecialties.map(([specialtyName, specialty]) => (
            <Card 
              key={specialtyName}
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => {
                onSpecialtySelect?.(specialtyName);
                window.dispatchEvent(new CustomEvent('navigate-to-specialty', { detail: { specialty: specialtyName } }));
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      {specialty.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">{specialty.name}</h3>
                        <p className="text-muted-foreground mb-4">{specialty.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Common Conditions Treated:</h4>
                        <div className="flex flex-wrap gap-2">
                          {specialty.commonConditions.slice(0, 4).map((condition, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                          {specialty.commonConditions.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{specialty.commonConditions.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {/* <Users className="h-4 w-4" /> */}
                          <span>{specialty.doctorCount} doctors available</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSpecialties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No specialties found matching your search.</p>
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-primary/5 to-cyan/5 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4">Can't Find Your Specialty?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our directory is constantly growing. If you're a medical professional looking to join our network, we'd love to have you.
            </p>
            <Button 
              onClick={() => window.dispatchEvent(new CustomEvent('show-join-modal'))}
              className="bg-primary hover:bg-primary/90"
            >
              Join Our Network
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    )

}

export default page;