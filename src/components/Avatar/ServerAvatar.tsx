import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { getServerImgUrl } from "@utils/converter";
import FallbackAvatar from "./FallbackAvatar";

interface ServerAvatarProps {
  className?: string;
  thumbnailPath?: string | null;
  fallbackSeed?: string;
}

const ServerAvatar = ({
  className,
  thumbnailPath,
  fallbackSeed,
}: ServerAvatarProps) => {
  if (!thumbnailPath) {
    return <FallbackAvatar className={className} fallbackSeed={fallbackSeed} />;
  }

  return (
    <Avatar
      className={className}
      src={thumbnailPath ? getServerImgUrl(thumbnailPath) : ""}
    />
  );
};

export default ServerAvatar;
