import React, { useState, useMemo } from 'react';

const SortableTable = ({ data = [] ,fullData = []}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isRotated, setIsRotated] = useState(false);
  const [jobTitles, setjobTitles] = useState(false);
  const [activeYear, setActiveYear] = useState();

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  const hasData = data.length > 0;
  const keys = hasData ? Object.keys(data[0]) : [];

  const sortedData = useMemo(() => {
    if (!hasData || !sortConfig.key) {
      return data;
    }

    const sortedItems = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedItems;
  }, [data, sortConfig, hasData]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    toggleRotation();
  };

  const getClassNamesFor = (key) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === key ? sortConfig.direction : undefined;
  };
  

  const rowTable = (item) => {
    // console.log(item,fullData);
    setActiveYear(item.Year);
    const year_filter = fullData.filter((data) => {
      return item.Year === data.work_year;
    });
    const job_titles={};
      year_filter.map((item) => { 
      const value = item.job_title;
      job_titles[value] = job_titles[value] ? job_titles[value] + 1 : 1;
    });
    setjobTitles(job_titles);
    // console.log(job_titles);
    
  };

  return (
    <div>
      {!hasData ? (
        <p>No data available</p>
      ) : (
        <div>
        
        <div className="flex flex-col ">
          <p className="text-xl mb-10">Table to show year, count and average salary</p>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {keys.map((key) => (
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group" key={key}>
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 cursor-pointer ${
        isRotated ? "rotate-180" : "rotate-0"
      }
           `}
                      onClick={() => requestSort(key)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span
                      className="cursor-pointer pl-1"
                      onClick={() => requestSort(key)}
                    >
                      {key}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                {keys.map((key) => (
                  <td key={key} onClick={() => rowTable(item)} className="px-6 py-4">{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {/* {jobTitles &&(
          <div className="flex flex-col pt-10">
          <p className="text-xl mb-10">Table for year {activeYear}</p>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Job Title
                </th>
                <th scope="col" class="px-6 py-3">
                    number of jobs
                </th>
            </tr>
        </thead>
        <tbody>
            {!jobTitles ? (
        <p>No data available</p>
      ) : (jobTitles?.map((element) => {
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {element}
                </th>
                <td class="px-6 py-4">
                    {element}
                </td>
            </tr>
            }))};
            
        </tbody>
    </table>
    </div>
)} */}
        </div>
      )}
    </div>
  );
};



export default SortableTable;
