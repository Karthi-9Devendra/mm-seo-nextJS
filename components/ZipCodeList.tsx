import { getStates } from "@/data/db";
import { getPaginatedZipCodes } from "@/data/zipcodes";
import ZipCodeFilter from "./ZipCodeFilter";

type ZipCodeListProps = { 
  state: string;
  searchParams?: Promise<{ page?: string; search?: string }>;
};

export default async function ZipCodeList({ state, searchParams }: ZipCodeListProps) {
  const states = await getStates() as any[];
  const stateData = states.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === state);
  let zipCodesData: any = { zipCodes: [], pagination: null };
  
  try {
    if (stateData?.key) {
      const params = await searchParams;
      const page = parseInt(params?.page || '1');
      const search = params?.search || '';
      
      // Use static zip codes data instead of database query
      zipCodesData = getPaginatedZipCodes(stateData.key, page, 20, search);
    }
  } catch (error) {
    console.error('Failed to fetch zip codes:', error);
    zipCodesData = { zipCodes: [], pagination: null };
  }

  const params = await searchParams;
  const search = params?.search || '';

  return <ZipCodeFilter 
    zipCodes={zipCodesData.zipCodes} 
    state={state} 
    pagination={zipCodesData.pagination}
    searchTerm={search}
    totalCount={zipCodesData.pagination?.totalItems}
  />;
} 