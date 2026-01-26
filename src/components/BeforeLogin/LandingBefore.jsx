'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { LuArrowRight, LuCalendar, LuSquareCheck, LuChartBar, LuSlidersHorizontal, LuZap, LuLock, LuCheck } from "react-icons/lu";

export default function LandingBefore() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen overflow-x-hidden relative">
            {/* Grid Background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background-image:linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]"></div>

            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 h-16 backdrop-blur-md z-50 transition-all duration-300 ${scrolled ? ' shadow-lg shadow-blue-500/10' : ''
                }`}>
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg  flex items-center justify-center">
                            <span className="text-lg font-bold bg-yellow-200 rounded-sm p-1">M</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            MiniCal
                        </span>
                    </div>

                    <Link
                        href="/auth/login"
                        className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-yellow-200 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        Get Started Free
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6 pt-16">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 shadow-lg text-sm font-medium ">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></span>
                        Your productivity companion
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight">
                        <span className="block">Organize Your Day</span>
                        <span className="block">
                            Effortlessly
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                        A beautiful, minimal calendar-based task manager that helps you focus on what matters.
                        Plan your day, track your progress, and achieve your goals.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="/auth/login"
                            className="group px-8 py-4 rounded-xl text-lg font-bold bg-yellow-200 hover:bg-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                        >
                            Start Planning Now
                            <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                    </div>

                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Everything You Need to Stay Organized
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            Powerful features designed to help you manage your tasks with ease
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LuCalendar className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Calendar View</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Visualize your tasks on an intuitive calendar interface. See your entire month at a glance.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LuSquareCheck className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Priority Tasks</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Set priorities for your tasks and focus on what matters most. Never miss important deadlines.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LuChartBar className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Track Progress</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Monitor your productivity with detailed statistics. See how many tasks you complete each day.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LuSlidersHorizontal className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Customizable</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Personalize your experience with themes and settings that match your workflow.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LuZap className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Lightning Fast</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Built with modern technology for instant loading and smooth interactions.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LuLock className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Secure & Private</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Your data is encrypted and secure. We respect your privacy and never share your information.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="relative py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                Focus on What
                                <span className="block text-4xl md:text-5xl font-bold leading-tight">
                                    Really Matters
                                </span>
                            </h2>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                Stop juggling multiple apps and complicated systems. MiniCal gives you a clean,
                                distraction-free environment to plan your day and get things done.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-300 flex items-center justify-center flex-shrink-0 mt-1">
                                        <LuCheck className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Simple & Intuitive</h4>
                                        <p className="text-slate-400">No learning curve. Start organizing immediately.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-300 flex items-center justify-center flex-shrink-0 mt-1">
                                        <LuCheck className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Boost Productivity</h4>
                                        <p className="text-slate-400">Accomplish more with better task organization.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-300 flex items-center justify-center flex-shrink-0 mt-1">
                                        <LuCheck className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Stay Motivated</h4>
                                        <p className="text-slate-400">Track your progress and celebrate your wins.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-green-100 rounded-3xl blur-3xl"></div>
                            <div className="relative border border-white/10 rounded-3xl p-8 space-y-4">
                                <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10">
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    <div className="flex-1">
                                        <div className="h-3 bg-white/20 rounded w-3/4"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                    <div className="flex-1">
                                        <div className="h-3 bg-white/20 rounded w-2/3"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="flex-1">
                                        <div className="h-3 bg-white/20 rounded w-5/6"></div>
                                    </div>
                                </div>
                                <div className="mt-6 p-6 rounded-xl border border-black">
                                    <div className="text-lg mb-2">Today&apos;s Progress</div>
                                    <div className="text-3xl font-bold">90%</div>
                                    <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-9/10 bg-gradient-to-r from-green-200 to-green-500  rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8 px-6">
                <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
                    <p>© 2026 MiniCal.</p>
                </div>
            </footer>


        </div>
    );
}
