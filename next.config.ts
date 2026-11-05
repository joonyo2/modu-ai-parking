import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  // 운영 서버에서는 /trafficmap 폴더에 올린다.
  basePath: isProduction ? "/trafficmap" : "",
};

export default nextConfig;
