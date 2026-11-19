import { useMemo, useState } from 'react';
import { ArrowRight, Bookmark, BriefcaseBusiness, GraduationCap, Menu, Search, Sparkles, Users, Wrench, X } from 'lucide-react';

const opportunities = [
  { id: 1, type: 'Jobs', title: 'Junior Customer Support Assistant', org: 'Example opportunity', location: 'Nairobi / Hybrid', deadline: 'Demo listing', description: 'A sample entry showing how a verified job listing will appear on YouthConnect.', tags: ['Entry level', 'Communication'], featured: true },
  { id: 2, type: 'Scholarships', title: 'Undergraduate Scholarship Listing', org: 'Example opportunity', location: 'Kenya', deadline: 'Demo listing', description: 'A sample scholarship card. Replace this with a real opportunity and its official application link.', tags: ['Undergraduate', 'Education'], featured: false },
  { id: 3, type: 'Internships', title: 'Digital Marketing Internship', org: 'Example opportunity', location: 'Remote', deadline: 'Demo listing', description: 'A sample internship listing for demonstrating search, filters and saved items.', tags: ['Internship', 'Digital skills'], featured: true },
  { id: 4, type: 'Skills', title: 'Introduction to Web Development', org: 'Example learning resource', location: 'Online', deadline: 'Self-paced', description: 'A sample skills resource. Add a trusted course provider and link before publishing.', tags: ['Beginner', 'Technology'], featured: false },
  { id: 5, type: 'Jobs', title: 'Community Outreach Assistant', org: 'Example opportunity', location: 'Mombasa', deadline: 'Demo listing', description: 'A sample entry for a community-facing role. This is not a live vacancy.', tags: ['Community', 'Entry level'], featured: false },
  { id: 6, type: 'Scholarships', title: 'Technical Training Bursary', org: 'Example opportunity', location: 'Kenya', deadline: 'Demo listing', description: 'A sample listing to demonstrate the scholarships category.', tags: ['TVET', 'Training'], featured: false },
];

const categories = [
  { name: 'All', icon: Sparkles, note: 'Every opportunity' },
  { name: 'Jobs', icon: BriefcaseBusiness, note: 'Start your career' },
  { name: 'Internships', icon: Users, note: 'Gain experience' },
  { name: 'Scholarships', icon: GraduationCap, note: 'Fund your education' },
  { name: 'Skills', icon: Wrench, note: 'Learn something new' },
];

function App() {
  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('yck-saved') || '[]'));
  const [showSaved, setShowSaved] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const visible = useMemo(() => opportunities.filter(item => {
    const categoryMatch = active === 'All' || item.type === active;
    const searchText = `${item.title} ${item.org} ${item.location} ${item.tags.join(' ')}`.toLowerCase();
    return categoryMatch && searchText.includes(query.toLowerCase()) && (!showSaved || saved.includes(item.id));
  }), [active, query, saved, showSaved]);

  function toggleSaved(id) {
    const next = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id];
    setSaved(next);
    localStorage.setItem('yck-saved', JSON.stringify(next));
  }

  function chooseCategory(name) {
    setActive(name);
    setShowSaved(false);
    setMobileMenu(false);
    document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="site-shell">
      <div className="announcement">A community-powered starting point for Kenya's next generation <span>Built for opportunity</span></div>
      <header className="header">
        <a className="brand" href="#" aria-label="YouthConnect Kenya home">
          <span className="brand-mark"><Users size={21} /></span>
          <span>YouthConnect <b>Kenya</b><small>OPPORTUNITY STARTS HERE</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation">{mobileMenu ? <X /> : <Menu />}</button>
        <nav className={mobileMenu ? 'nav open' : 'nav'}>
          <a href="#opportunities" onClick={() => setMobileMenu(false)}>Explore</a>
          <a href="#how-it-works" onClick={() => setMobileMenu(false)}>How it works</a>
          <a href="#about" onClick={() => setMobileMenu(false)}>About</a>
          <button className="saved-nav" onClick={() => { setShowSaved(!showSaved); setActive('All'); document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <Bookmark size={16} /> Saved ({saved.length})
          </button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span></span> YOUR FUTURE, WITH MORE POSSIBILITIES</div>
            <h1>Your next opportunity<br /><em>starts right here.</em></h1>
            <p>Discover jobs, internships, scholarships and practical learning resources curated to help young people across Kenya move forward.</p>
            <a className="primary-btn" href="#opportunities">Explore opportunities <ArrowRight size={18} /></a>
            <div className="hero-proof"><div className="avatar-stack"><i>J</i><i>A</i><i>M</i><i>+</i></div><span>Made to connect ambition with opportunity</span></div>
          </div>
          <div className="hero-art" aria-label="Illustration of a young person planning their future">
            <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
            <div className="art-card card-top"><span className="mini-icon green"><GraduationCap size={19}/></span><span><b>Learn & grow</b><small>Build new skills</small></span></div>
            <div className="person-illustration"><div className="sun"></div><div className="person-head"></div><div className="person-body"></div><div className="laptop"></div></div>
            <div className="art-card card-bottom"><span className="mini-icon orange"><BriefcaseBusiness size={18}/></span><span><b>Find your path</b><small>Take the next step</small></span></div>
            <div className="floating-star">✦</div>
          </div>
          <div className="hero-bottom"><span>OPPORTUNITIES FOR EVERY AMBITION</span><span>KENYA&nbsp; • &nbsp;OPEN TO ALL</span></div>
        </section>

        <section className="category-section" aria-label="Opportunity categories">
          <div className="section-heading"><div><span className="eyebrow">FIND YOUR DIRECTION</span><h2>What are you looking for?</h2></div><p>Start with a category that matches your goals.</p></div>
          <div className="category-grid">
            {categories.slice(1).map(({ name, icon: Icon, note }) => <button className={`category-card ${active === name ? 'selected' : ''}`} key={name} onClick={() => chooseCategory(name)}><span className="category-icon"><Icon size={22}/></span><b>{name}</b><small>{note}</small><ArrowRight className="category-arrow" size={17}/></button>)}
          </div>
        </section>

        <section className="opportunities-section" id="opportunities">
          <div className="section-heading opportunities-heading"><div><span className="eyebrow">TAKE THE NEXT STEP</span><h2>{showSaved ? 'Your saved opportunities' : 'Explore opportunities'}</h2><p>Search the listings and find something that fits your goals.</p></div><div className="listing-count">{visible.length} <span>sample listings</span></div></div>
          <div className="search-panel">
            <div className="search-box"><Search size={19}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search jobs, skills, location..." aria-label="Search opportunities"/></div>
            <div className="filter-row">{categories.map(c => <button key={c.name} className={active === c.name ? 'filter active' : 'filter'} onClick={() => {setActive(c.name); setShowSaved(false);}}>{c.name}</button>)}</div>
          </div>
          <div className="demo-notice"><span>ⓘ</span> These are demonstration listings, not live vacancies. Replace them with verified opportunities before sharing this site publicly.</div>
          {visible.length ? <div className="opportunity-grid">{visible.map(item => <article className="opportunity-card" key={item.id}><div className="card-meta"><span className={`type-pill ${item.type.toLowerCase()}`}>{item.type}</span><button className={`bookmark ${saved.includes(item.id) ? 'is-saved' : ''}`} onClick={() => toggleSaved(item.id)} aria-label={saved.includes(item.id) ? 'Remove saved opportunity' : 'Save opportunity'}><Bookmark size={18} fill={saved.includes(item.id) ? 'currentColor' : 'none'}/></button></div><h3>{item.title}</h3><p className="org">{item.org}</p><p className="description">{item.description}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="card-footer"><span>⌖ {item.location}</span><span>{item.deadline}</span></div></article>)}</div> : <div className="empty-state"><Search size={28}/><h3>No opportunities found</h3><p>Try another search or category. If you have not saved anything yet, explore all listings.</p><button className="text-btn" onClick={() => {setQuery('');setActive('All');setShowSaved(false);}}>Show all opportunities</button></div>}
        </section>

        <section className="how-section" id="how-it-works"><div className="how-intro"><span className="eyebrow">SIMPLE BY DESIGN</span><h2>Small steps.<br/><em>Big possibilities.</em></h2><p>YouthConnect is designed to make opportunity discovery easier and more accessible.</p></div><div className="steps"><div className="step"><span>01</span><div><b>Explore</b><p>Browse opportunities by type, interest or location.</p></div></div><div className="step"><span>02</span><div><b>Save</b><p>Keep interesting listings together so you can return to them.</p></div></div><div className="step"><span>03</span><div><b>Take action</b><p>Use the official details supplied by each opportunity provider to apply.</p></div></div></div></section>
        <section className="cta-section" id="about"><div><span className="eyebrow">BUILT FOR COMMUNITY IMPACT</span><h2>Opportunity should be easier to find.</h2><p>We're building a shared starting point for young people, educators, employers and community organizations.</p></div><a href="https://github.com/" target="_blank" rel="noreferrer" className="light-btn">Contribute on GitHub <ArrowRight size={17}/></a></section>
      </main>
      <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><Users size={19}/></span><span>YouthConnect <b>Kenya</b><small>OPPORTUNITY STARTS HERE</small></span></a><p>© {new Date().getFullYear()} YouthConnect Kenya. Community project starter.</p><span>Built with purpose in Kenya 🇰🇪</span></footer>
    </div>
  );
}
export default App;
