import { SocialIcon } from "../social-icon";

export function Social() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <h2 className="lowercase font-mono text-zinc-500 text-md">Social</h2>

      <div className="flex gap-x-8 gap-y-2 flex-wrap">
        <SocialIcon url="https://github.com/taima157" name="github" />
        <SocialIcon url="https://x.com/taima1212kyo" name="twitter" />
        <SocialIcon url="mailto:gustavotaima18@gmail.com" name="e-mail" />
      </div>
    </section>
  );
}
