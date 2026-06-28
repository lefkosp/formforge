/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: {
    unoptimized: true,
  },
  webpack: (config: any) => {
    config.module.rules.push({
      resourceQuery: /raw/, // *.ts?raw
      type: "asset/source",
    });

    return config;
  },
};

export default nextConfig;
