import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import Footer from '../components/footer/footer'
import JobSection from '../components/JobSection/jobsDash'
import FreelancerSection from '../components/FLsection/FreeLancer'

const MainDashboard = () => {
  return (
    <div>
        <Dashboard />
        <FreelancerSection />
        <JobSection />
        <Footer />
    </div>
  )
}

export default MainDashboard