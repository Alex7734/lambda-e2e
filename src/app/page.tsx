import { AuthButtons } from "@/app/_components/AuthButtons";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import { MobileNav } from "@/app/_components/MobileNav";
import Image from "next/image";
import ContactForm from "@/app/_components/ContactForm";

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4 sm:py-6">
              <div className="flex items-center space-x-4 sm:space-x-8">
                <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    <Image
                      src="/logo.png"
                      alt="Lambda E2E"
                      width={32}
                      height={32}
                      className="w-8 h-8 sm:w-8 sm:h-8"
                      priority
                    />
                    <span>Lambda E2E</span>
                  </Link>
                </div>
                <nav className="hidden md:flex space-x-6">
                  <Link href="/" className="text-blue-600 font-medium">
                    Home
                  </Link>
                  <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                    FHE Demo
                  </Link>
                </nav>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden md:block">
                  <AuthButtons />
                </div>
                <MobileNav currentPath="/" />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              E2E Solutions
              <span className="text-blue-600"> at Scale</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Comprehensive mobile and web development and automation testing solutions for enterprise applications.
              <br />
              <span className="text-blue-600">Ship fast and secure.</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                prefetch
              >
                Try FHE Demo
              </Link>
              <a
                href="#solutions"
                className="border border-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              Comprehensive Security & Testing Solutions
            </h2>
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-700">
                  Lambda E2E specializes in end-to-end secure solutions for enterprise applications,
                  machine learning systems, and complex software architectures. We provide comprehensive
                  security testing, automation frameworks, and production-ready implementations.
                </p>
                <p className="text-base sm:text-lg text-gray-700">
                  Our research platform demonstrates cutting-edge technologies including advanced encryption,
                  ML security, privacy-preserving computation, and automated testing frameworks that
                  scale from development to production environments.
                </p>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-blue-600">Core Solutions</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="mt-1">Security & Privacy audits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="mt-1">E2E Testing mobile and web applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="mt-1">Out of the Box templates which scale to enterprise level</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div id="solutions" className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl mb-4 font-bold text-gray-900 text-center">
              Enterprise Solutions
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-green-600">🔐</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Security Audits</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Comprehensive security audits for applications, APIs, and infrastructure at enterprise scale.
                </p>
                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">Coming Soon</span>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-purple-600">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">E2E Testing</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Automated E2E and performance testing for mobile and web applications.
                </p>
                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">Coming Soon</span>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-100 sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-orange-600">⚡</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Out of the Box Solutions</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Mobile and web templates that can scale securely to enterprise level. Ship your app with confidence, <span className="font-bold">2x faster.</span>
                </p>
                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">Coming Soon</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-12 sm:mb-16">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Homomorphic Encryption Demo
                </h2>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">→</span>
                    <span className="mt-1.5">Real-time encryption and decryption</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">→</span>
                    <span className="mt-1.5">Secure computation on encrypted data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">→</span>
                    <span className="mt-1.5">Privacy-preserving voting systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">→</span>
                    <span className="mt-1.5">Full end to end encrytion process</span>
                  </li>
                </ul>
                <Link
                  href="/dashboard"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  prefetch
                >
                  Explore FHE Demo
                </Link>
              </div>
              <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-6 sm:p-8 rounded-lg border border-blue-100 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute top-12 right-8 w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-16 right-4 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
                </div>

                <div className="relative z-10">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-lg">5</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-lg">3</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600">Input Data</span>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center animate-bounce">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex items-center justify-between group">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 animate-pulse">
                          <span className="text-white font-bold text-sm">11</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 animate-pulse">
                          <span className="text-white font-bold text-sm">7</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600">Encrypted</span>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex items-center justify-between group">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 animate-bounce">
                          <span className="text-white font-bold text-xl">⚡</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Secure Computation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600">Processing</span>
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex items-center justify-between group pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-2xl">8</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-600">Result</span>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </main>
      </div>
    </HydrateClient>
  );
}
