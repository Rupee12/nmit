import { faculty } from '../data/faculty';
import { motion } from 'framer-motion';

export default function FacultyGallery() {
  return (
    <section className="px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[.3em] uppercase text-[#d9b76c]">With gratitude</p>
        <h2 className="serif text-6xl md:text-8xl mt-4">The people behind our journey</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {faculty.map((f, i) => (
            <motion.article
              key={f.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: Math.min(i * 0.05, 0.25) }}
              whileHover={{ y: -8 }}
              className="glass rounded-3xl p-7 text-center overflow-hidden"
            >
              <div className="mx-auto w-40 h-40 md:w-44 md:h-44 rounded-full overflow-hidden ring-1 ring-white/15 shadow-2xl bg-white/5">
                <img
                  loading="lazy"
                  src={f.photo}
                  alt={`${f.name}, ${f.designation}`}
                  className="w-full h-full object-cover object-center transition duration-700"
                />
              </div>

              <div className="pt-7">
                <p className="text-[10px] uppercase tracking-[.22em] text-[#d9b76c]">
                  {f.designation}
                </p>
                <h3 className="serif text-2xl md:text-3xl mt-2 leading-tight">{f.name}</h3>
                <p className="text-sm text-white/45 mt-4 leading-6">{f.message}</p>
              </div>
            </motion.article>
          ))}
        </div>

        
      </div>
    </section>
  );
}
