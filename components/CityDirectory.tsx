"use client";

import { useState, useEffect, Key } from 'react';
import { Search, ArrowRight, Users, MapPin, Building, Phone } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './ImageWithFallback';
import { useRouter } from 'next/navigation';

interface CityDetail {
  name: string;
  slug: string;
  state: string;
  description: string;
  population: string;
  hospitals: string[];
  doctorCount: number;
  image: string;
}

interface CityDirectoryProps {
  state: { name: string; key: string };
  searchParam?: { page?: string; search?: string };
  citiesData: {
    cities: { name: string; slug: string }[];
    pagination: { currentPage: number; totalPages: number; totalItems?: number; itemsPerPage: number } | null
  };
}

export default function CityDirectory({ state, searchParam, citiesData }: CityDirectoryProps) {
  const [cityDetails, setCityDetails] = useState<{ [key: string]: CityDetail }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // const cityDetails: { [key: string]: CityDetail } = {
  //   'San Antonio': {
  //     name: 'San Antonio',
  //     state: 'TX',
  //     description: 'San Antonio is a major city in south-central Texas with a rich colonial heritage. It is known for the Alamo, vibrant culture, and a strong healthcare network.',
  //     population: '1,547,200',
  //     hospitals: [
  //       'Methodist Hospital',
  //       'Baptist Medical Center',
  //       'University Hospital',
  //       'CHRISTUS Santa Rosa Hospital',
  //       'St. Luke’s Baptist Hospital',
  //       'Northeast Baptist Hospital',
  //     ],
  //     doctorCount: 3250,
  //     image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  //   },
  // };

  // const filteredCities = Object.entries(cityDetails).filter(([name, details]) =>
  //   name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   details.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   details.hospitals.some(hospital =>
  //     hospital.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );
const enrichedCities: CityDetail[] = citiesData.cities.map((city, index) => ({
    ...city,
    state: state.name,
    description: `${city.name} is one of the major cities in ${state.name}, offering advanced healthcare and facilities.`,
    population: new Intl.NumberFormat("en-US").format(500000 + index * 100000), // dummy population
    hospitals: [
      `${city.name} General Hospital`,
      `${city.name} Medical Center`,
      `${city.name} Community Hospital`,
      `${city.name} Specialty Clinic`,
    ],
    doctorCount: 1000 + index * 200, // dummy doctor count
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  }));

  const filteredCities = enrichedCities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!citiesData || !citiesData.cities) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-600">No city data available.</p>
      </div>
    );
  }

  const featuredCities = ['Orlando', 'Miami', 'Tampa'];
const stateSlug = state.name.toLowerCase().replace(/\s+/g, '-');
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading cities...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Healthcare by Location</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find top-rated doctors and medical facilities in your area. Explore healthcare options across Florida's major cities.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search cities, hospitals, or areas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 text-lg"
          />
        </div>
      </div>

      {/* Featured Cities */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8">Featured Healthcare Destinations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(enrichedCities).map(([cityName, city]) => {
            if (!city) return null;

            return (
              <Card
                key={cityName}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden group"
                onClick={() => router.push(`/${stateSlug}/${city.slug}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={city.image}
                    alt={`${city.name}, ${city.state}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{city.name}</h3>
                    <p className="text-sm opacity-90">{city.state}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 line-clamp-2">{city.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{city.doctorCount} doctors available</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-primary" />
                      <span>{city.hospitals.length} major hospitals</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Population: {city.population}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* All Cities */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">All Healthcare Locations</h2>
          <p className="text-muted-foreground">
            {filteredCities.length} {filteredCities.length === 1 ? 'city' : 'cities'} found
          </p>
        </div>

        <div className="grid gap-6">
          {filteredCities.map((city) => (
            <Card
               key={city.slug}
              className="cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => router.push(`/${stateSlug}/${city.slug}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={city.image}
                        alt={`${city.name}, ${city.state}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-primary mb-1">
                          {city.name}, {city.state}
                        </h3>
                        <p className="text-muted-foreground mb-3">{city.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Healthcare Stats:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{city.doctorCount} doctors available</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Building className="h-4 w-4 text-primary" />
                            <span>{city.hospitals.length} major hospitals</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Population: {city.population}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Major Hospitals:</h4>
                        <div className="space-y-1">
                          {city.hospitals.slice(0, 3).map((hospital, index) => (
                            <p key={index} className="text-sm text-muted-foreground">
                              {hospital}
                            </p>
                          ))}
                          {city.hospitals.length > 3 && (
                            <p className="text-xs text-primary">
                              +{city.hospitals.length - 3} more facilities
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No cities found matching your search.</p>
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
            <h3 className="text-2xl font-semibold mb-4">Expand Your Practice?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our growing network and connect with patients in your area. Claim your free profile today.
            </p>
            <Button
              onClick={() => window.dispatchEvent(new CustomEvent('show-join-modal'))}
              className="bg-primary hover:bg-primary/90"
            >
              <Phone className="h-4 w-4 mr-2" />
              Join Our Network
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}