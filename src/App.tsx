import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { HomePage } from './pages/HomePage'
import { IndustriesIndexPage } from './pages/IndustriesIndexPage'
import { IndustryDetailPage } from './pages/IndustryDetailPage'
import { MaterialsPage } from './pages/MaterialsPage'
import { ProcessPage } from './pages/ProcessPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { QuotePage } from './pages/QuotePage'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/industries" element={<IndustriesIndexPage />} />
        <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/quote" element={<QuotePage />} />
      </Route>
    </Routes>
  )
}
