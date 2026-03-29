import BoringAvatar from "boring-avatars";
import { Avatar } from "@mui/material";
import { KEEPER_COLOR } from "@constants/keeperTheme";

interface FallbackAvatarProps {
  className?: string;
  fallbackSeed?: string;
  fallbackColors?: string[];
}

const FallbackAvatar = ({ className, fallbackSeed }: FallbackAvatarProps) => {
  return (
    <Avatar className={className}>
      <BoringAvatar
        size="100%"
        name={fallbackSeed}
        variant="beam"
        colors={FALLBACK_COLORS}
      />
    </Avatar>
  );
};

export default FallbackAvatar;

const FALLBACK_COLORS = [
  KEEPER_COLOR.pointBlue,
  "#6EF3FB",
  "#8EF7FC",
  "#B2FAFD",
  "#D7FCFE",
];
