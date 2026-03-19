import { Email, GitHub, X } from "@mui/icons-material";
import { SocialIcon } from "../social-icon";

export function Social() {
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="lowercase font-mono text-zinc-500 text-md">Social</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
        <SocialIcon
          url="https://github.com/taima157"
          name="github"
          icon={<GitHub fontSize="small" />}
        />
        <SocialIcon
          url="https://x.com/taima1212kyo"
          name="twitter"
          icon={<X fontSize="small" />}
        />
        <SocialIcon
          url="mailto:gustavotaima18@gmail.com"
          name="e-mail"
          icon={<Email fontSize="small" />}
        />
      </div>
    </section>
  );
}
