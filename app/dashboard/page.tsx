"use client"
import React, { useState, useEffect } from 'react';
import { poppinsregular } from '@/fonts/fonts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    MdContentCopy,
    MdDelete,
    MdEdit,
    MdLink,
    MdAnalytics,
    MdTrendingUp,
    MdVisibility,
    MdAdd,
    MdCheck,
    MdClose,
    MdRefresh,
    MdQrCode,
    MdFilterList,
    MdSearch,
    MdDownload,
    MdBarChart,
    MdTimeline,
    MdLocationOn,
    MdDevices,
    MdCalendarToday,
    MdAutoGraph,
    MdStar,
    MdOpenInNew,
} from 'react-icons/md';
import { createlink, getAllLinks, deleteLink, updateLink, getLinkStats } from '../Useractions/Linkactions';
import Link from 'next/link';

interface LinkData {
    _id: string;
    url: string;
    shortUrl: string;
    clicks: number;
    createdAt: string;
    updatedAt: string;
}

interface Stats {
    totalLinks: number;
    totalClicks: number;
    recentLinks: number;
    topLinks: Array<{
        _id: string;
        url: string;
        shortUrl: string;
        clicks: number;
    }>;
}

export default function Dashboard() {
    const [links, setLinks] = useState<LinkData[]>([]);
    const [filteredLinks, setFilteredLinks] = useState<LinkData[]>([]);
    const [stats, setStats] = useState<Stats>({
        totalLinks: 0,
        totalClicks: 0,
        recentLinks: 0,
        topLinks: []
    });
    const [loading, setLoading] = useState(true);
    const [newUrl, setNewUrl] = useState('');
    const [creatingLink, setCreatingLink] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editUrl, setEditUrl] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'date' | 'clicks' | 'url'>('date');
    const [filterBy, setFilterBy] = useState<'all' | 'active' | 'inactive'>('all');
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const [selectedLinks, setSelectedLinks] = useState<Set<string>>(new Set());
    const [showAnalytics, setShowAnalytics] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterAndSortLinks();
    }, [links, searchTerm, sortBy, filterBy]);

    const filterAndSortLinks = () => {
        let filtered = [...links];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(link =>
                link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply activity filter
        if (filterBy !== 'all') {
            filtered = filtered.filter(link => {
                if (filterBy === 'active') return link.clicks > 0;
                if (filterBy === 'inactive') return link.clicks === 0;
                return true;
            });
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'clicks':
                    return b.clicks - a.clicks;
                case 'url':
                    return a.url.localeCompare(b.url);
                case 'date':
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

        setFilteredLinks(filtered);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [linksData, statsData] = await Promise.all([
                getAllLinks(),
                getLinkStats()
            ]);
            setLinks(linksData);
            setStats(statsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUrl.trim()) return;

        setCreatingLink(true);
        try {
            await createlink({ url: newUrl });
            setNewUrl('');
            await fetchData(); // Refresh data
        } catch (error) {
            console.error('Error creating link:', error);
        } finally {
            setCreatingLink(false);
        }
    };

    const handleDeleteLink = async (id: string) => {
        try {
            await deleteLink(id);
            await fetchData(); // Refresh data
        } catch (error) {
            console.error('Error deleting link:', error);
        }
    };

    const handleUpdateLink = async (id: string) => {
        if (!editUrl.trim()) return;

        try {
            await updateLink(id, editUrl);
            setEditingId(null);
            setEditUrl('');
            await fetchData(); // Refresh data
        } catch (error) {
            console.error('Error updating link:', error);
        }
    };

    const copyToClipboard = async (shortUrl: string, id: string) => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 ${poppinsregular.className}`}>
                <div className="container mx-auto py-8 px-4">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your dashboard...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 ${poppinsregular.className}`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto py-8 px-4 relative">
                {/* Enhanced Header */}
                <div className="mb-8">
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mb-8">
                        <div className="mb-6 xl:mb-0">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                                    <MdAnalytics className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                        Dashboard
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                                        Manage your links and track performance
                                    </p>
                                </div>
                            </div>

                            {/* Quick Stats Bar */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span>{stats.totalLinks} Total Links</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span>{stats.totalClicks.toLocaleString()} Total Clicks</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                    <span>{stats.recentLinks} This Week</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                onClick={fetchData}
                                variant="outline"
                                className="hover:bg-blue-50 dark:hover:bg-blue-900/20 border-2"
                            >
                                <MdRefresh className="w-4 h-4 mr-2" />
                                Refresh
                            </Button>
                            <Button
                                onClick={() => setShowAnalytics(!showAnalytics)}
                                variant="outline"
                                className="hover:bg-purple-50 dark:hover:bg-purple-900/20 border-2"
                            >
                                <MdBarChart className="w-4 h-4 mr-2" />
                                Analytics
                            </Button>
                            <Link href="/">
                                <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl">
                                    <MdAdd className="w-4 h-4 mr-2" />
                                    Create New Link
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="group p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-900/50 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wide">Total Links</p>
                                <p className="text-4xl font-black text-blue-700 dark:text-blue-300 mb-2">{stats.totalLinks}</p>
                                <div className="flex items-center text-xs text-blue-600/70">
                                    <MdTrendingUp className="w-3 h-3 mr-1" />
                                    <span>+{stats.recentLinks} this week</span>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="p-4 bg-blue-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <MdLink className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute inset-0 bg-blue-400 rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
                            </div>
                        </div>
                    </Card>

                    <Card className="group p-6 bg-gradient-to-br from-purple-50 via-purple-100 to-pink-100 dark:from-purple-950/50 dark:to-pink-900/50 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-600 dark:text-purple-400 text-sm font-bold uppercase tracking-wide">Total Clicks</p>
                                <p className="text-4xl font-black text-purple-700 dark:text-purple-300 mb-2">{stats.totalClicks.toLocaleString()}</p>
                                <div className="flex items-center text-xs text-purple-600/70">
                                    <MdAutoGraph className="w-3 h-3 mr-1" />
                                    <span>Engagement rate: {stats.totalLinks > 0 ? ((stats.totalClicks / stats.totalLinks) * 100).toFixed(1) : 0}%</span>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="p-4 bg-purple-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <MdAnalytics className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute inset-0 bg-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
                            </div>
                        </div>
                    </Card>

                    <Card className="group p-6 bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-900/50 border-green-200 dark:border-green-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-600 dark:text-green-400 text-sm font-bold uppercase tracking-wide">Top Performer</p>
                                <p className="text-4xl font-black text-green-700 dark:text-green-300 mb-2">
                                    {stats.topLinks.length > 0 ? stats.topLinks[0].clicks : 0}
                                </p>
                                <div className="flex items-center text-xs text-green-600/70">
                                    <MdStar className="w-3 h-3 mr-1" />
                                    <span>Best performing link</span>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="p-4 bg-green-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <MdTrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute inset-0 bg-green-400 rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
                            </div>
                        </div>
                    </Card>

                    <Card className="group p-6 bg-gradient-to-br from-orange-50 via-orange-100 to-red-100 dark:from-orange-950/50 dark:to-red-900/50 border-orange-200 dark:border-orange-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-600 dark:text-orange-400 text-sm font-bold uppercase tracking-wide">Avg. Performance</p>
                                <p className="text-4xl font-black text-orange-700 dark:text-orange-300 mb-2">
                                    {stats.totalLinks > 0 ? Math.round(stats.totalClicks / stats.totalLinks) : 0}
                                </p>
                                <div className="flex items-center text-xs text-orange-600/70">
                                    <MdTimeline className="w-3 h-3 mr-1" />
                                    <span>Clicks per link</span>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="p-4 bg-orange-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <MdVisibility className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute inset-0 bg-orange-400 rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Enhanced Quick Create Form */}
                <Card className="p-8 mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center">
                            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mr-3">
                                <MdAdd className="w-6 h-6 text-white" />
                            </div>
                            Quick Create Link
                        </h2>
                        <Badge className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 dark:from-green-900/30 dark:to-blue-900/30 dark:text-green-400">
                            <MdQrCode className="w-3 h-3 mr-1" />
                            QR Code Ready
                        </Badge>
                    </div>
                    <form onSubmit={handleCreateLink} className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl"></div>
                            <Input
                                type="url"
                                placeholder="🌐 Paste your URL here (https://example.com)..."
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                className="relative h-14 text-lg border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl shadow-inner focus:shadow-lg transition-all duration-300"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={creatingLink || !newUrl.trim()}
                            className="h-14 px-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
                        >
                            {creatingLink ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Creating Magic...
                                </>
                            ) : (
                                <>
                                    <MdAdd className="w-5 h-5 mr-2" />
                                    Create Link
                                </>
                            )}
                        </Button>
                    </form>
                </Card>

                {/* Enhanced Filters and Controls */}
                <Card className="p-6 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    placeholder="🔍 Search links..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-12 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
                                />
                            </div>

                            {/* Sort */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'date' | 'clicks' | 'url')}
                                className="h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400"
                            >
                                <option value="date">📅 Sort by Date</option>
                                <option value="clicks">📊 Sort by Clicks</option>
                                <option value="url">🔗 Sort by URL</option>
                            </select>

                            {/* Filter */}
                            <select
                                value={filterBy}
                                onChange={(e) => setFilterBy(e.target.value as 'all' | 'active' | 'inactive')}
                                className="h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400"
                            >
                                <option value="all">📋 All Links</option>
                                <option value="active">🔥 Active Links</option>
                                <option value="inactive">😴 Inactive Links</option>
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={() => setViewMode(viewMode === 'table' ? 'grid' : 'table')}
                                variant="outline"
                                className="h-12 px-4 border-2"
                            >
                                {viewMode === 'table' ? <MdBarChart className="w-5 h-5" /> : <MdFilterList className="w-5 h-5" />}
                            </Button>
                            {selectedLinks.size > 0 && (
                                <Button
                                    onClick={() => {
                                        selectedLinks.forEach(id => handleDeleteLink(id));
                                        setSelectedLinks(new Set());
                                    }}
                                    variant="outline"
                                    className="h-12 px-4 border-2 border-red-200 text-red-600 hover:bg-red-50"
                                >
                                    <MdDelete className="w-5 h-5 mr-2" />
                                    Delete ({selectedLinks.size})
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Enhanced Links Management */}
                <Card className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center">
                            <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl mr-3">
                                <MdAnalytics className="w-6 h-6 text-white" />
                            </div>
                            Your Links ({filteredLinks.length}/{links.length})
                        </h2>
                        {filteredLinks.length > 0 && (
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="border-2"
                                    onClick={() => {
                                        const data = filteredLinks.map(link => ({
                                            'Short URL': `${window.location.origin}/${link.shortUrl}`,
                                            'Original URL': link.url,
                                            'Clicks': link.clicks,
                                            'Created': formatDate(link.createdAt)
                                        }));
                                        const csv = [
                                            Object.keys(data[0]).join(','),
                                            ...data.map(row => Object.values(row).join(','))
                                        ].join('\n');
                                        const blob = new Blob([csv], { type: 'text/csv' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = 'links-export.csv';
                                        a.click();
                                    }}
                                >
                                    <MdDownload className="w-4 h-4 mr-2" />
                                    Export CSV
                                </Button>
                            </div>
                        )}
                    </div>

                    {filteredLinks.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MdLink className="w-16 h-16 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-3">
                                {searchTerm || filterBy !== 'all' ? 'No matching links found' : 'No links yet'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-500 text-lg mb-6">
                                {searchTerm || filterBy !== 'all'
                                    ? 'Try adjusting your search or filters'
                                    : 'Create your first short link to get started!'
                                }
                            </p>
                            {(!searchTerm && filterBy === 'all') && (
                                <Link href="/">
                                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3">
                                        <MdAdd className="w-5 h-5 mr-2" />
                                        Create Your First Link
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ) : viewMode === 'table' ? (
                        <div className="overflow-x-auto rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                checked={selectedLinks.size === filteredLinks.length && filteredLinks.length > 0}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedLinks(new Set(filteredLinks.map(link => link._id)));
                                                    } else {
                                                        setSelectedLinks(new Set());
                                                    }
                                                }}
                                                className="rounded"
                                            />
                                        </th>
                                        <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-gray-300">Original URL</th>
                                        <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-gray-300">Short Link</th>
                                        <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-gray-300">Performance</th>
                                        <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-gray-300">Created</th>
                                        <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLinks.map((link, index) => (
                                        <tr key={link._id} className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/10 dark:hover:to-purple-900/10 transition-all duration-300 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-700/50'}`}>
                                            <td className="py-4 px-6">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLinks.has(link._id)}
                                                    onChange={(e) => {
                                                        const newSelected = new Set(selectedLinks);
                                                        if (e.target.checked) {
                                                            newSelected.add(link._id);
                                                        } else {
                                                            newSelected.delete(link._id);
                                                        }
                                                        setSelectedLinks(newSelected);
                                                    }}
                                                    className="rounded"
                                                />
                                            </td>
                                            <td className="py-4 px-6">
                                                {editingId === link._id ? (
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            type="url"
                                                            value={editUrl}
                                                            onChange={(e) => setEditUrl(e.target.value)}
                                                            className="text-sm h-10"
                                                            placeholder="Enter new URL"
                                                        />
                                                        <Button
                                                            onClick={() => handleUpdateLink(link._id)}
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700 h-10"
                                                        >
                                                            <MdCheck className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                setEditingId(null);
                                                                setEditUrl('');
                                                            }}
                                                            size="sm"
                                                            variant="outline"
                                                            className="h-10"
                                                        >
                                                            <MdClose className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="max-w-xs">
                                                        <p className="text-sm text-gray-900 dark:text-gray-100 truncate font-medium" title={link.url}>
                                                            {link.url}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {new URL(link.url).hostname}
                                                        </p>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-3 py-2 rounded-xl">
                                                        <Badge variant="outline" className="font-mono text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-600">
                                                            {link.shortUrl}
                                                        </Badge>
                                                        <Button
                                                            onClick={() => copyToClipboard(link.shortUrl, link._id)}
                                                            size="sm"
                                                            variant="ghost"
                                                            className="hover:bg-blue-200 dark:hover:bg-blue-800/30 h-8 w-8 p-0"
                                                        >
                                                            {copiedId === link._id ? (
                                                                <MdCheck className="w-4 h-4 text-green-600" />
                                                            ) : (
                                                                <MdContentCopy className="w-4 h-4 text-blue-600" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                            {link.clicks.toLocaleString()}
                                                        </span>
                                                        <span className="text-sm text-gray-500">clicks</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {link.clicks > 0 ? (
                                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs">
                                                                🔥 Active
                                                            </Badge>
                                                        ) : (
                                                            <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-xs">
                                                                😴 Inactive
                                                            </Badge>
                                                        )}
                                                        {link.clicks > (stats.totalClicks / stats.totalLinks) && (
                                                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs">
                                                                ⭐ Top
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {formatDate(link.createdAt).split(',')[0]}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatDate(link.createdAt).split(',')[1]}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        onClick={() => {
                                                            setEditingId(link._id);
                                                            setEditUrl(link.url);
                                                        }}
                                                        size="sm"
                                                        variant="ghost"
                                                        className="hover:bg-blue-100 dark:hover:bg-blue-900/30 h-10 w-10 p-0"
                                                        disabled={editingId === link._id}
                                                        title="Edit URL"
                                                    >
                                                        <MdEdit className="w-4 h-4 text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            window.open(`/${link.shortUrl}`, '_blank');
                                                        }}
                                                        size="sm"
                                                        variant="ghost"
                                                        className="hover:bg-green-100 dark:hover:bg-green-900/30 h-10 w-10 p-0"
                                                        title="Open Link"
                                                    >
                                                        <MdOpenInNew className="w-4 h-4 text-green-600" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDeleteLink(link._id)}
                                                        size="sm"
                                                        variant="ghost"
                                                        className="hover:bg-red-100 dark:hover:bg-red-900/30 h-10 w-10 p-0"
                                                        title="Delete Link"
                                                    >
                                                        <MdDelete className="w-4 h-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        // Grid View
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredLinks.map((link) => (
                                <Card key={link._id} className="p-6 bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 truncate mb-2" title={link.url}>
                                                {link.url}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="font-mono text-blue-600 dark:text-blue-400">
                                                    {link.shortUrl}
                                                </Badge>
                                                <Button
                                                    onClick={() => copyToClipboard(link.shortUrl, link._id)}
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    {copiedId === link._id ? (
                                                        <MdCheck className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <MdContentCopy className="w-4 h-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selectedLinks.has(link._id)}
                                            onChange={(e) => {
                                                const newSelected = new Set(selectedLinks);
                                                if (e.target.checked) {
                                                    newSelected.add(link._id);
                                                } else {
                                                    newSelected.delete(link._id);
                                                }
                                                setSelectedLinks(newSelected);
                                            }}
                                            className="rounded"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                                {link.clicks.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-gray-500">Clicks</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {formatDate(link.createdAt).split(',')[0]}
                                            </div>
                                            <div className="text-xs text-gray-500">Created</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1">
                                            {link.clicks > 0 ? (
                                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs">
                                                    🔥 Active
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-xs">
                                                    😴 Inactive
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            <Button
                                                onClick={() => {
                                                    setEditingId(link._id);
                                                    setEditUrl(link.url);
                                                }}
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                            >
                                                <MdEdit className="w-4 h-4 text-blue-600" />
                                            </Button>
                                            <Button
                                                onClick={() => window.open(`/${link.shortUrl}`, '_blank')}
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                            >
                                                <MdOpenInNew className="w-4 h-4 text-green-600" />
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteLink(link._id)}
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                            >
                                                <MdDelete className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </Card>

                {/* Enhanced Analytics Section */}
                {showAnalytics && stats.topLinks.length > 0 && (
                    <Card className="p-8 mt-8 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30 dark:from-gray-800 dark:via-purple-950/30 dark:to-indigo-950/30 backdrop-blur-xl border border-purple-200/50 dark:border-purple-700/50 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center">
                                <div className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl mr-3">
                                    <MdTrendingUp className="w-6 h-6 text-white" />
                                </div>
                                Performance Analytics
                            </h2>
                            <Button
                                onClick={() => setShowAnalytics(false)}
                                variant="outline"
                                className="border-2"
                            >
                                <MdClose className="w-4 h-4 mr-2" />
                                Close
                            </Button>
                        </div>

                        {/* Top Performers */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <MdStar className="w-5 h-5 mr-2 text-yellow-500" />
                                Top Performing Links
                            </h3>
                            <div className="grid gap-4">
                                {stats.topLinks.slice(0, 5).map((link, index) => (
                                    <div
                                        key={link._id}
                                        className="group flex items-center justify-between p-6 bg-gradient-to-r from-orange-50/80 via-yellow-50/80 to-red-50/80 dark:from-orange-950/30 dark:via-yellow-950/30 dark:to-red-950/30 rounded-2xl border-2 border-orange-200/50 dark:border-orange-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-black text-lg shadow-lg">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-900 dark:text-gray-100 truncate max-w-md mb-1">
                                                    {link.url}
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <Badge variant="outline" className="font-mono text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-600">
                                                        {link.shortUrl}
                                                    </Badge>
                                                    <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                                                        <MdAnalytics className="w-4 h-4" />
                                                        <span>{((link.clicks / stats.totalClicks) * 100).toFixed(1)}% of total traffic</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-orange-600 dark:text-orange-400 mb-1">
                                                {link.clicks.toLocaleString()}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                                <MdTimeline className="w-4 h-4 mr-1" />
                                                clicks
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Insights */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-2xl border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center gap-3 mb-3">
                                    <MdLocationOn className="w-6 h-6 text-blue-600" />
                                    <h4 className="font-bold text-gray-900 dark:text-white">Most Popular Domain</h4>
                                </div>
                                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                    {links.length > 0 ? new URL(links.reduce((prev, current) =>
                                        (prev.clicks > current.clicks) ? prev : current
                                    ).url).hostname : 'N/A'}
                                </p>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-2xl border border-green-200 dark:border-green-700">
                                <div className="flex items-center gap-3 mb-3">
                                    <MdCalendarToday className="w-6 h-6 text-green-600" />
                                    <h4 className="font-bold text-gray-900 dark:text-white">Most Active Day</h4>
                                </div>
                                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                                    Today
                                </p>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-2xl border border-purple-200 dark:border-purple-700">
                                <div className="flex items-center gap-3 mb-3">
                                    <MdDevices className="w-6 h-6 text-purple-600" />
                                    <h4 className="font-bold text-gray-900 dark:text-white">Success Rate</h4>
                                </div>
                                <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                                    {stats.totalLinks > 0 ? (((links.filter(l => l.clicks > 0).length / stats.totalLinks) * 100).toFixed(1)) : 0}%
                                </p>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
