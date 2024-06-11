/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    output: "standalone",
};

export default nextConfig;
