import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import MobileBottomNav from './components/layout/MobileBottomNav'
import Footer from './components/layout/Footer'
import BackToTop from './components/ui/BackToTop'
import Toast from './components/ui/Toast'

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'))
const Programs = lazy(() => import('./pages/Programs'))
const Search = lazy(() => import('./pages/Search'))
const Bookmarks = lazy(() => import('./pages/Bookmarks'))
const Progress = lazy(() => import('./pages/Progress'))
const Updates = lazy(() => import('./pages/Updates'))
const Compare = lazy(() => import('./pages/Compare'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))
const SuggestProgram = lazy(() => import('./pages/SuggestProgram'))
const KeyboardShortcuts = lazy(() => import('./pages/KeyboardShortcuts'))

// School
const SchoolHub = lazy(() => import('./pages/school/SchoolHub'))
const SEEHome = lazy(() => import('./pages/school/SEEHome'))
const BLEHome = lazy(() => import('./pages/school/BLEHome'))
const Class9Home = lazy(() => import('./pages/school/Class9Home'))
const NEBHome = lazy(() => import('./pages/school/NEBHome'))

// Entrance
const EntranceHub = lazy(() => import('./pages/entrance/EntranceHub'))
const IOEHome = lazy(() => import('./pages/entrance/IOEHome'))
const IOESubject = lazy(() => import('./pages/entrance/IOESubject'))
const IOEChapter = lazy(() => import('./pages/entrance/IOEChapter'))
const CEEHub = lazy(() => import('./pages/entrance/CEEHub'))
const CEEExamDetail = lazy(() => import('./pages/entrance/CEEExamDetail'))
const CSITHome = lazy(() => import('./pages/entrance/CSITHome'))
const KUCATHome = lazy(() => import('./pages/entrance/KUCATHome'))
const CMATHome = lazy(() => import('./pages/entrance/CMATHome'))
const PUEntranceHome = lazy(() => import('./pages/entrance/PUEntranceHome'))

// Bachelor
const BachelorHub = lazy(() => import('./pages/bachelor/BachelorHub'))
const ProgramDetail = lazy(() => import('./pages/bachelor/ProgramDetail'))

// Competitive
const CompetitiveHub = lazy(() => import('./pages/competitive/CompetitiveHub'))
const CompetitiveExamDetail = lazy(() => import('./pages/competitive/CompetitiveExamDetail'))

// Engineering
const EngineeringHub = lazy(() => import('./pages/engineering/EngineeringHub'))
const EngineeringUniversity = lazy(() => import('./pages/engineering/EngineeringUniversity'))
const EngineeringCourse = lazy(() => import('./pages/engineering/EngineeringCourse'))
const EngineeringSemester = lazy(() => import('./pages/engineering/EngineeringSemester'))

// Shared generic pages (new data-driven system)
const GenericSubjectPage = lazy(() => import('./pages/Shared/SubjectPage'))
const GenericChapterPage = lazy(() => import('./pages/Shared/ChapterPage'))

// Smart resolver: picks Subject vs Chapter page based on URL
function CategoryResolver({ category }) {
  const loc = useLocation()
  const lastSeg = loc.pathname.split('/').filter(Boolean).pop()
  if (lastSeg && lastSeg.startsWith('ch-')) {
    return <GenericChapterPage category={category} />
  }
  return <GenericSubjectPage category={category} />
}

// Features
const NotesPage = lazy(() => import('./features/notes/pages/NotesPage'))
const PlannerPage = lazy(() => import('./features/planner/pages/PlannerPage'))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent"></div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-page text-txt-primary">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1 pt-16 pb-20 md:pb-0">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />

              {/* School */}
              <Route path="/school" element={<SchoolHub />} />
              <Route path="/school/see" element={<SEEHome />} />
              <Route path="/school/ble-8" element={<BLEHome />} />
              <Route path="/school/class-9" element={<Class9Home />} />
              <Route path="/school/:gradeId" element={<NEBHome />} />
              {/* School deep links: subject and chapter */}
              <Route path="/school/*" element={<CategoryResolver category="school" />} />

              {/* Entrance */}
              <Route path="/entrance" element={<EntranceHub />} />
              <Route path="/entrance/ioe" element={<IOEHome />} />
              <Route path="/entrance/ioe/:subjectId" element={<IOESubject />} />
              <Route path="/entrance/ioe/:subjectId/:chapterId" element={<IOEChapter />} />
              <Route path="/entrance/cee" element={<CEEHub />} />
              <Route path="/entrance/cee/:examId" element={<CEEExamDetail />} />
              <Route path="/entrance/csit" element={<CSITHome />} />
              <Route path="/entrance/kucat" element={<KUCATHome />} />
              <Route path="/entrance/cmat" element={<CMATHome />} />
              <Route path="/entrance/pu" element={<PUEntranceHome />} />
              {/* Entrance deep links: subject and chapter */}
              <Route path="/entrance/*" element={<CategoryResolver category="entrance" />} />

              {/* Engineering */}
              <Route path="/engineering" element={<EngineeringHub />} />
              <Route path="/engineering/:universityId" element={<EngineeringUniversity />} />
              <Route path="/engineering/:universityId/:courseId" element={<EngineeringCourse />} />
              <Route path="/engineering/:universityId/:courseId/semester/:semesterNum" element={<EngineeringSemester />} />
              {/* Engineering deep links: branch/subject/chapter */}
              <Route path="/engineering/*" element={<CategoryResolver category="engineering" />} />

              {/* Bachelor */}
              <Route path="/bachelor" element={<BachelorHub />} />
              <Route path="/bachelor/:programId" element={<ProgramDetail />} />
              {/* Bachelor deep links: semester/year, subject, chapter */}
              <Route path="/bachelor/*" element={<CategoryResolver category="bachelor" />} />

              {/* Competitive */}
              <Route path="/competitive" element={<CompetitiveHub />} />
              <Route path="/competitive/:examId" element={<CompetitiveExamDetail />} />
              {/* Competitive deep links: subject and chapter */}
              <Route path="/competitive/*" element={<CategoryResolver category="competitive" />} />

              {/* Utility pages */}
              <Route path="/search" element={<Search />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/about" element={<About />} />
              <Route path="/suggest" element={<SuggestProgram />} />
              <Route path="/shortcuts" element={<KeyboardShortcuts />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/planner" element={<PlannerPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <MobileBottomNav />
        <BackToTop />
        <Toast />
      </div>
    </BrowserRouter>
  )
}
