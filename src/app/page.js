"use client"
import React from 'react';
import Papa from 'papaparse';
import {useState,useEffect} from 'react';
import Table from './table.js';
import Chart from './chart.js';
// import PopOver from './popover.js';

export default function App() {
    const [ text, setText ] = useState([]);
    const [ fullData, setFullData ] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/salaries.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value); 
      const results = Papa.parse(csv, { header: true });
      setFullData(results.data);
      const year_count={};
      results.data.map((item) => { 
      const value = item.work_year;
      year_count[value] = year_count[value] ? year_count[value] + 1 : 1;
    });
    const datas=[];
    for (var key in year_count)
      {
        const data={'Year':key,'Number_of_total_jobs':year_count[key],'Average_salary':0};
        let salary = 0;
        results.data.map((item) => {
          if(key == item.work_year && !isNaN(item.salary_in_usd))
              salary=salary+Number(item.salary_in_usd);
        });
        data.Average_salary=(salary/data.Number_of_total_jobs).toFixed(2);
        datas.push(data);
      }
      setText(datas);
    };
    fetchData();
  }, []);
  

  if(!Array.isArray(text))
    return (<p>No data available</p>);
    return (
      <div className="relative overflow-x-auto flex flex-col justify-center items-center m-32">
        <Table data={text} fullData={fullData}/>
        <Chart chartData={text}/>
        {/* <PopOver/> */}
      </div>
      );
}