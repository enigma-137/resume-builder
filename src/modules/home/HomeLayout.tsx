import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';

const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'] });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'] });

const features = [
  {
    title: 'Fast, focused editing',
    description: 'Build and update your resume without setup overhead or account friction.',
  },
  {
    title: 'Multiple templates',
    description: 'Switch templates instantly while keeping your content and structure consistent.',
  },
  {
    title: 'Local-first data',
    description: 'Your resume state stays in the browser, giving you control over your content.',
  },
  {
    title: 'Export and import JSON',
    description: 'Move between devices or backup your progress with simple JSON files.',
  },
];

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: 'easeOut' as const },
};

const HomeLayout = () => {
  return (
    <div className={`${grotesk.className} bg-white text-black`}>
      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(circle at 20% 0%, #f3f3f3 0%, rgba(255,255,255,0) 40%), radial-gradient(circle at 85% 30%, #efefef 0%, rgba(255,255,255,0) 45%)',
        }}
      />

      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/3135/3135800.png"
              alt="X-Resume"
              width={34}
              height={34}
            />
            <span className={`${mono.className} text-sm tracking-[0.24em]`}>X-RESUME</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="https://github.com/enigma-137/resume-builder"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-black px-3 py-2 text-xs font-medium transition hover:bg-black hover:text-white md:px-4"
            >
              GitHub
            </a>
            <Link
              href="/builder"
              className="rounded-full bg-black px-3 py-2 text-xs font-medium text-white transition hover:opacity-85 md:px-4"
            >
              Open Builder
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-16 md:pb-20 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className={`${mono.className} mb-5 text-xs tracking-[0.2em] text-black/60`}>
              SINGLE PAGE RESUME BUILDER
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Build a sharp resume in minutes with a clean, distraction-free editor.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-black/70 md:text-lg">
              Create, customize, and export your resume with modern templates and local-first
              storage.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/builder"
                className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-85"
              >
                Start Building
              </Link>
              <a
                href="https://github.com/enigma-137/resume-builder"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-black px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
              >
                Contribute
              </a>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 overflow-hidden rounded-3xl border border-black/15 bg-white shadow-[0_28px_60px_rgba(0,0,0,0.08)]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div className="flex items-center gap-2 border-b border-black/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-black/35" />
              <span className="h-2.5 w-2.5 rounded-full bg-black/50" />
            </div>
            <div className="p-4 md:p-8">
              <Image
                src="/icons/image.png"
                alt="Resume preview"
                width={1180}
                height={760}
                className="h-auto w-full rounded-xl border border-black/10"
              />
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <motion.h2 className="text-3xl font-bold md:text-4xl" {...reveal}>
            Why this builder works
          </motion.h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="rounded-2xl border border-black/15 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
                {...reveal}
              >
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-black/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-y border-black/10 bg-black text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <motion.h2 className="text-3xl font-bold md:text-4xl" {...reveal}>
              Built in the open
            </motion.h2>
            <motion.p className="mt-4 max-w-2xl text-sm text-white/75 md:text-base" {...reveal}>
              The project is actively shaped by contributors and open-source maintainers. Explore
              the codebase, propose improvements, and add your own template.
            </motion.p>
            <motion.a
              href="https://github.com/enigma-137/resume-builder"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full border border-white px-5 py-2.5 text-sm font-medium transition hover:bg-white hover:text-black"
              {...reveal}
            >
              View Repository
            </motion.a>
          </div>
        </section>
        {/* 
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <motion.h2 className="text-3xl font-bold md:text-4xl" {...reveal}>
            Contributors
          </motion.h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {contributors.map((person) => (
              <motion.a
                key={person.name}
                href={person.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-black/15 p-4 text-center transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
                {...reveal}
              >
                <Image
                  src={person.avatar}
                  alt={person.name}
                  width={84}
                  height={84}
                  className="mx-auto rounded-full border border-black/20"
                />
                <p className="mt-3 text-sm font-semibold md:text-base">{person.name}</p>
                <p className="mt-1 text-xs opacity-70">{person.role}</p>
              </motion.a>
            ))}
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default HomeLayout;
