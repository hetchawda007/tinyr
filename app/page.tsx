"use client"
import { Button } from "@/components/ui/button";
import { poppinsregular } from "@/fonts/fonts";
import React, { useState, useEffect } from "react";
import { MdContentCopy, MdCheck, MdLink, MdAnalytics, MdSecurity, MdSpeed, MdTrendingUp, MdQrCode, MdShare, MdTimer } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { createlink } from "./Useractions/Linkactions";
import Link from "next/link";

export default function Home() {

  const [url, setUrl] = useState<string>("");
  const [shorturl, setShortUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const link = await createlink({ url });
      setShortUrl(link.shortUrl);
    } catch (error) {
      console.error("Error creating link:", error);
    } finally {
      setLoading(false);
    }
  }

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${shorturl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }

  const resetForm = () => {
    setUrl("");
    setShortUrl("");
    setCopied(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-500/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-500/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-indigo-500/30 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-500/30 rounded-full animate-bounce" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className={`container mx-auto px-6 pt-20 pb-32 relative ${poppinsregular.className}`}>
          {/* Main Hero Content */}
          <div className={`text-center max-w-5xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Animated Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-transform duration-300">
              <MdLink className="w-4 h-4 mr-2 animate-pulse" />
              ✨ The Ultimate URL Shortener Experience
            </div>

            {/* Main Heading with enhanced animation */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-300% block">
                Shorten URLs.
              </span>
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300% block" style={{ animationDelay: '0.5s' }}>
                Amplify Impact.
              </span>
              <span className="text-gray-900 dark:text-white block transform hover:scale-105 transition-transform duration-300">
                Go Viral. 🚀
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-medium">
              Transform your long, complex URLs into powerful, shareable links that
              <span className="text-blue-600 dark:text-blue-400 font-semibold"> drive engagement</span>,
              <span className="text-purple-600 dark:text-purple-400 font-semibold"> provide insights</span>, and
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> boost your brand</span>.
            </p>

            {/* Enhanced URL Shortener Form */}
            {!shorturl ? (
              <div className="max-w-3xl mx-auto transform hover:scale-[1.02] transition-all duration-300">
                <div className="relative">
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl"></div>

                  <form onSubmit={handlesubmit} className="relative flex flex-col lg:flex-row gap-4 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50">
                    <div className="flex-1 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl"></div>
                      <Input
                        value={url}
                        onChange={handlechange}
                        autoComplete="off"
                        required
                        className="relative h-16 text-lg border-2 border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:border-blue-500 dark:focus:border-blue-400 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm placeholder:text-gray-400 font-medium shadow-inner focus:shadow-lg transition-all duration-300"
                        type="url"
                        placeholder="✨ Paste your long URL here and watch the magic happen..."
                        suppressHydrationWarning
                      />
                    </div>
                    {!loading ? (
                      <Button
                        type="submit"
                        className="h-16 px-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center">
                          <MdLink className="w-5 h-5 mr-2" />
                          Shorten URL
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="h-16 px-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-2xl text-lg relative overflow-hidden"
                      >
                        <div className="flex items-center">
                          <svg aria-hidden="true" role="status" className="inline w-6 h-6 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                          </svg>
                          Creating Magic...
                        </div>
                      </Button>
                    )}
                  </form>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto transform animate-fadeIn">
                <div className="relative">
                  {/* Success glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-blue-400/30 to-purple-400/30 rounded-3xl blur-xl animate-pulse"></div>

                  <div className="relative p-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/50">
                    <div className="text-center mb-10">
                      <div className="relative w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <MdCheck className="w-10 h-10 text-white animate-bounce" />
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping opacity-20"></div>
                      </div>
                      <h2 className="text-4xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        🎉 Success! Your Link is Ready!
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">
                        Your link has been shortened and is ready to conquer the world
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="relative p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-blue-900/20 rounded-2xl border border-gray-200/50 dark:border-gray-600/50">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">Original URL:</p>
                        <p className="text-gray-800 dark:text-gray-200 break-all bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl border shadow-inner font-mono text-sm">{url}</p>
                      </div>

                      <div className="relative p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 rounded-2xl border-2 border-blue-200/50 dark:border-blue-700/50">
                        <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wide flex items-center">
                          <MdLink className="w-4 h-4 mr-2" />
                          Your Shortened URL:
                        </p>
                        <div className="flex items-center gap-4 bg-white/90 dark:bg-gray-800/90 p-5 rounded-xl border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
                          <code className="flex-1 text-lg font-bold font-mono text-blue-800 dark:text-blue-300 break-all">
                            {typeof window !== 'undefined' ? `${window.location.origin}/${shorturl}` : `/${shorturl}`}
                          </code>
                          <Button
                            onClick={copyToClipboard}
                            variant="outline"
                            size="lg"
                            className="flex-shrink-0 border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 transform hover:scale-105"
                          >
                            {copied ?
                              <MdCheck className="h-5 w-5 text-green-600 animate-pulse" /> :
                              <MdContentCopy className="h-5 w-5 text-blue-600" />
                            }
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-4">
                        <Button
                          onClick={resetForm}
                          variant="outline"
                          className="flex-1 h-14 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                        >
                          <MdLink className="w-5 h-5 mr-2" />
                          Create Another Link
                        </Button>
                        <Link href="/dashboard" className="flex-1">
                          <Button className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                            <MdAnalytics className="w-5 h-5 mr-2" />
                            View Dashboard
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
              ✨ Premium Features
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Sujo</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium">
              Powerful features designed to make link management simple, effective, and incredibly rewarding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-blue-200/50 dark:border-blue-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <MdSpeed className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lightning Fast ⚡</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Generate shortened URLs in milliseconds with our optimized global infrastructure and edge computing.</p>
            </div>

            <div className="group text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-purple-200/50 dark:border-purple-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <MdAnalytics className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Smart Analytics 📊</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Track clicks, monitor performance, and gain deep insights into your audience engagement patterns.</p>
            </div>

            <div className="group text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-green-200/50 dark:border-green-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <MdSecurity className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Secure & Reliable 🔒</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Enterprise-grade security ensures your links are protected with SSL encryption and fraud detection.</p>
            </div>

            <div className="group text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-red-200/50 dark:border-red-800/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
              <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <MdQrCode className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">QR Codes & More 📱</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Generate custom QR codes, branded links, and social media optimized sharing options.</p>
            </div>
          </div>

          {/* Additional Features Row */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="group text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 hover:shadow-lg transition-all duration-300">
              <MdTrendingUp className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Real-time Tracking</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Monitor link performance with live analytics and instant notifications.</p>
            </div>

            <div className="group text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300">
              <MdShare className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Social Integration</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Seamlessly share across all social platforms with optimized previews.</p>
            </div>

            <div className="group text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300">
              <MdTimer className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Expiration Control</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Set custom expiration dates and automatic link deactivation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative py-24 overflow-hidden">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient bg-300%"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Ready to Transform
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Your Links? 🚀
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Join <span className="font-bold text-white">50,000+ users</span> who trust Sujo for their link shortening needs.
              Start building your digital empire today!
            </p>

            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
              <Link href="/login">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-xl px-12 py-4 h-auto rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 border-0 group">
                  <span className="flex items-center">
                    🎯 Get Started Free
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold text-xl px-12 py-4 h-auto rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  📊 View Dashboard
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-blue-100 text-sm font-medium">
              <div className="flex items-center">
                <MdCheck className="w-5 h-5 mr-2 text-green-300" />
                No Credit Card Required
              </div>
              <div className="flex items-center">
                <MdSecurity className="w-5 h-5 mr-2 text-green-300" />
                100% Secure & Private
              </div>
              <div className="flex items-center">
                <MdSpeed className="w-5 h-5 mr-2 text-green-300" />
                Instant Setup
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="py-16 bg-gray-900 dark:bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                Sujo
              </h3>
              <p className="text-gray-400 text-lg font-medium">The Ultimate URL Shortener Experience</p>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-sm">
                © 2025 Sujo. Made with ❤️ for the internet. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}