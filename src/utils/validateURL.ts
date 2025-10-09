function isTrustedLink(link: string, trustedDomains: string[], exactOnly = true): boolean {
  if (typeof link !== 'string' || !Array.isArray(trustedDomains)) return false;

  try {
    const url = new URL(link.trim());
    return trustedDomains.some((domain) =>
      exactOnly ? url.hostname === domain : url.hostname === domain || url.hostname.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

export default isTrustedLink;
