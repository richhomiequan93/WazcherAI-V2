import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  // The unlisted data room and its files stay out of search engines.
  async headers() {
    return [
      { source: '/dataroom', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] },
      { source: '/dataroom/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] },
    ];
  },
  outputFileTracingIncludes: {
    '/llms.txt': ['./citora-sync.mjs'],
  },
  webpack(config, { isServer }) {
    if (isServer) {
      // Keep citora-sync.mjs unbundled so import.meta.url stays correct for its integrity check
      const prev = Array.isArray(config.externals)
        ? config.externals
        : config.externals
        ? [config.externals]
        : [];
      config.externals = [
        ...prev,
        ({ request }: { request?: string }, callback: (err?: Error | null, result?: string) => void) => {
          if (request?.includes('citora-sync')) {
            return callback(null, `module ${request}`);
          }
          callback();
        },
      ];
    }
    return config;
  },
};

export default nextConfig;
