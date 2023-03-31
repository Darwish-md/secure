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
    <div>
<div>Dashboard</div>
    <div>
        <div className='flex flex-row'>
        <div> <BarChart /></div>
        <div className='mt-20'><PieChart /></div>
        </div>
        <div><Heatmap /></div>
    </div>
    </div>
  )
}
