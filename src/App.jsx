import React from "react"
import Nav from "./components/Nav"
import TimeTrackingProjectOverview from "./pages/TimeTrackingProjectOverview/TimeTrackingProjectOverview"
import Footer from "./components/Footer"

export default function App() {
  return (
    <main>
      <Nav />
      <TimeTrackingProjectOverview />
      <Footer />
      <div className="blur-circle circle-1"></div>
      <div className="blur-circle circle-2"></div>
    </main>
  )
}