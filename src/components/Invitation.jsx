import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { shareInvitation } from '../utils/share';

export default function Invitation({ name, type, onShare }) {
  const teacher = type === 'teacher';

  const getNameSize = (name) => {
    const length = name.trim().length;

    if (length <= 7) {
      return 'text-6xl md:text-8xl';
    }

    if (length <= 10) {
      return 'text-5xl md:text-7xl';
    }

    if (length <= 13) {
      return 'text-4xl md:text-6xl';
    }

    if (length <= 16) {
      return 'text-3xl md:text-5xl';
    }

    return 'text-2xl md:text-4xl';
  };

  const share = async () => {
    const r = await shareInvitation(name, type);
    onShare(r);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl text-center"
      >
        <p className="text-xs tracking-[.3em] uppercase text-[#d9b76c]">
          An invitation, made especially for you
        </p>

        <h2
          className={`serif mt-6 leading-tight ${getNameSize(name)}`}
        >
          Welcome,{' '}
          <span className="italic text-[#d9b76c] break-words">
            {name}.
          </span>
        </h2>

        <p className="max-w-2xl mx-auto mt-10 text-lg leading-8 text-white/50">
          {teacher
            ? `Today is not just a celebration. It is a small way of saying thank you to those who have made a difference in our journey.`
            : `You are warmly invited to join us as we celebrate the people who have guided, inspired and shaped our journey.`}
        </p>

        <div className="mt-14 border-y border-white/10 py-10">
          <p className="text-[10px] tracking-[.4em] uppercase text-white/35">
            Department of Computer Applications - MCA
          </p>

          <h3 className="serif text-5xl md:text-7xl mt-4 text-[#f2dfad]">
            Teachers' Day 2026
          </h3>
        </div>

        <button
          onClick={share}
          className="focus-ring mt-10 inline-flex items-center gap-2 text-xs tracking-[.2em] uppercase text-white/50 hover:text-[#d9b76c]"
        >
          <Share2 size={15} />
          Share Invitation
        </button>
      </motion.div>
    </section>
  );
}
