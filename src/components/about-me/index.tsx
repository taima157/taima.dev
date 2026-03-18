export function AboutMe() {
  return (
    <section className="w-full flex flex-col gap-5">
      <div className={`font-mono text-sm flex flex-col gap-2 text-stone-400`}>
        <span>{"->"} systems development student</span>
        <span>{"->"} java developer (some react knowledge)</span>
        <span>{"->"} 23 years old, animes and games</span>
      </div>

      <p className="text-md">
        I&apos;m a Java developer who likes exploring new technologies and
        trying out different tools. I&apos;ve been studying programming for a
        little over three years and have knowledge with TypeScript, Python,
        React, and React Native as well.
      </p>
    </section>
  );
}
