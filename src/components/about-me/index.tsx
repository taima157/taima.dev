export function AboutMe() {
  return (
    <section className="w-full flex flex-col gap-5">
      <ul
        className={`font-mono text-sm flex flex-col gap-2 text-zinc-500 list-disc list-inside`}
      >
        <li>systems development student</li>
        <li>java developer (some react knowledge)</li>
        <li>23 years old, animes and games</li>
      </ul>

      <p className="text-md">
        I&apos;m a Java developer who likes exploring new technologies and
        trying out different tools. I&apos;ve been studying programming for a
        little over three years and have knowledge with TypeScript, Python,
        React, and React Native as well.
      </p>
    </section>
  );
}
