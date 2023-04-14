import React from 'react'
import BarChart from '../components/visualizations/BarChart'
import Heatmap from '../components/visualizations/HeatMap'
import PieChart from '../components/visualizations/PieChart'

export default function Dashboard() {
    // useEffect(() => {
    //     async function execute() {

    //     }
    // }, [])
  return (
    <div className="text-center">
<div className="text-4x1">Dashboard</div>
    <div>
        <div className='flex flex-row justify-around'>
        <BarChart />
        <PieChart />
        </div>
    </div>
    </div>
  )
}
