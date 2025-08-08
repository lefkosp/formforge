/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any) => {
    config.module.rules.push({
      resourceQuery: /raw/, // *.ts?raw
      type: "asset/source",
    });

    return config;
  },
};

export default nextConfig;
