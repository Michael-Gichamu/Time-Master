import React from "react"
import Nav from "./components/Nav"
import TimeTrackingProjectOverview from "./pages/TimeTrackingProjectOverview/TimeTrackingProjectOverview"

export default function App() {
  return (
    <main>
      <Nav />
      <TimeTrackingProjectOverview />
      <div className="blur-circle circle-1"></div>
      <div className="blur-circle circle-2"></div>
    </main>
  )
}