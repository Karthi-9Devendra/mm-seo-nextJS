import CityList from './CityList';
import ZipCodeList from './ZipCodeList';

interface StateTabsProps {
  state: string;
  activeTab?: 'cities' | 'zipcodes';
  searchParams?: Promise<{ tab?: string; page?: string }>;
}

export default function StateTabs({ state, activeTab = 'cities', searchParams }: StateTabsProps) {
  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          <a
            href={`/${state}?tab=cities`}
            className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'cities'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Cities
          </a>
          <a
            href={`/${state}?tab=zipcodes`}
            className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'zipcodes'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Zip Codes
          </a>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'cities' && <CityList state={state} searchParams={searchParams} />}
        {activeTab === 'zipcodes' && <ZipCodeList state={state} searchParams={searchParams} />}
      </div>
    </div>
  );
} 