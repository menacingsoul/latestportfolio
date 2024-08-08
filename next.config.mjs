/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['picsum.photos','res.cloudinary.com'],
      },
      typescript:{
        ignoreBuildErrors:true,
      }
};

export default nextConfig;
