import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper'

export default function NotFound() {
  return (
    <PageWrapper>
      <Helmet>
        <title>404 — Page Not Found | SyllabusNepal</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="font-display text-6xl font-bold text-accent mb-2">404</h1>
        <p className="text-xl text-txt-primary mb-2">Page Not Found</p>
        <p className="text-txt-muted mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </PageWrapper>
  )
}
