import { Link as LinkIcon } from "@mui/icons-material";
import Link from "next/link";

type SocialIconProps = {
  url: string;
  name: string;
};

export function SocialIcon({ url, name }: SocialIconProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex font-semibold gap-2 items-center border-b border-transparent hover:border-zinc-300 transition-colors duration-200"
    >
      <span className="text-sm text-zinc-300">{name}</span>

      <LinkIcon className="text-zinc-500" style={{ fontSize: 18 }} />
    </Link>
  );
}
