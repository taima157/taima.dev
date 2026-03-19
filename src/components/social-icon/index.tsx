import Link from "next/link";

type SocialIconProps = {
  url: string;
  name: string;
  icon: React.ReactNode;
};

export function SocialIcon({ url, name, icon }: SocialIconProps) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <div className="border border-white/4 flex gap-2 items-center rounded-md bg-white/4 p-2">
        {icon}
        <span className="text-sm font-medium text-zinc-300">{name}</span>
      </div>
    </Link>
  );
}
