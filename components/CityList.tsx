import { getStates } from "@/data/db";
import { getPaginatedCities } from "@/data/cities";
import CityFilter from "./CityFilter";
type CityListProps = { 
  state: string;
  searchParams?: Promise<{ page?: string; search?: string }>;
};

export default async function CityList({ state, searchParams }: CityListProps) {
  const states = await getStates() as any[];
  const stateData = states.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === state);
  let citiesData: any = { cities: [], pagination: null };
  
  try {
    if (stateData?.key) {
      const params = await searchParams;
      const page = parseInt(params?.page || '1');
      const search = params?.search || '';
      
      // Use static cities data instead of database query
      citiesData = await getPaginatedCities(stateData.key, page, 20, search);
    }
  } catch (error) {
    console.error('Failed to fetch cities:', error);
    citiesData = { cities: [], pagination: null };
  }

  const params = await searchParams;
  const search = params?.search || '';

  return <CityFilter 
    cities={citiesData.cities} 
    state={state} 
    pagination={citiesData.pagination} 
    searchTerm={search}
    totalCount={citiesData.pagination?.totalItems}
  />;
}