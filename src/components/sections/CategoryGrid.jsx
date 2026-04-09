import { categories } from '../../data/programs'
import ProgramCard from '../ui/ProgramCard'

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-txt-primary mb-3">
          Browse by Category
        </h2>
        <p className="text-txt-secondary max-w-xl mx-auto">
          Explore syllabi organized across school, high school, bachelor, engineering, entrance, and competitive exam categories
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <ProgramCard key={cat.id} program={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
