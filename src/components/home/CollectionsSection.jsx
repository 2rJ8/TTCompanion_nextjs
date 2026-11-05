import { ArrowRight } from 'lucide-react'
import CollectionCard from './CollectionCard'
import { collections } from '../../data/collections'

export default function CollectionsSection() {
  return (
    <section className="collections-showcase" id="collections">
      <div className="container">
        <div className="section-header-row collections-header"><div><span className="eyebrow">Listas que inspiran</span><h2 className="font-display-section">Colecciones de la comunidad</h2><p>Rutas curadas para descubrir tu próxima obsesión.</p></div><a className="button button-outline button-small" href="#games">Explorar colecciones <ArrowRight className="icon--sm" aria-hidden="true" /></a></div>
        <div className="collections-grid">{collections.map((collection) => <CollectionCard collection={collection} key={collection[0]} />)}</div>
      </div>
    </section>
  )
}
