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
    MdShare,
    MdQrCode
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

    useEffect(() => {
        fetchData();
    }, []);

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
            <div className="container mx-auto py-8 px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Manage your shortened links and track their performance
                            </p>
                        </div>
                        <div className="flex gap-3 mt-4 lg:mt-0">
                            <Button 
                                onClick={fetchData} 
                                variant="outline" 
                                className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            >
                                <MdRefresh className="w-4 h-4 mr-2" />
                                Refresh
                            </Button>
                            <Link href="/">
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    <MdAdd className="w-4 h-4 mr-2" />
                                    Create New Link
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Links</p>
                                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{stats.totalLinks}</p>
                            </div>
                            <div className="p-3 bg-blue-600 rounded-2xl">
                                <MdLink className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Total Clicks</p>
                                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{stats.totalClicks.toLocaleString()}</p>
                            </div>
                            <div className="p-3 bg-purple-600 rounded-2xl">
                                <MdAnalytics className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-600 dark:text-green-400 text-sm font-medium">This Week</p>
                                <p className="text-3xl font-bold text-green-700 dark:text-green-300">{stats.recentLinks}</p>
                            </div>
                            <div className="p-3 bg-green-600 rounded-2xl">
                                <MdTrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 border-orange-200 dark:border-orange-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Avg. Clicks</p>
                                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">
                                    {stats.totalLinks > 0 ? Math.round(stats.totalClicks / stats.totalLinks) : 0}
                                </p>
                            </div>
                            <div className="p-3 bg-orange-600 rounded-2xl">
                                <MdVisibility className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Create Form */}
                <Card className="p-6 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <MdAdd className="w-6 h-6 mr-2 text-blue-600" />
                        Quick Create Link
                    </h2>
                    <form onSubmit={handleCreateLink} className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                type="url"
                                placeholder="Paste your URL here..."
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                className="h-12 text-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={creatingLink || !newUrl.trim()}
                            className="h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold disabled:opacity-50"
                        >
                            {creatingLink ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Creating...
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

                {/* Links Table */}
                <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                            <MdAnalytics className="w-6 h-6 mr-2 text-purple-600" />
                            Your Links ({links.length})
                        </h2>
                    </div>

                    {links.length === 0 ? (
                        <div className="text-center py-12">
                            <MdLink className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No links yet</h3>
                            <p className="text-gray-500 dark:text-gray-500">Create your first short link to get started!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Original URL</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Short Link</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Clicks</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Created</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {links.map((link) => (
                                        <tr key={link._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="py-4 px-4">
                                                {editingId === link._id ? (
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            type="url"
                                                            value={editUrl}
                                                            onChange={(e) => setEditUrl(e.target.value)}
                                                            className="text-sm"
                                                            placeholder="Enter new URL"
                                                        />
                                                        <Button
                                                            onClick={() => handleUpdateLink(link._id)}
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700"
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
                                                        >
                                                            <MdClose className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="max-w-xs">
                                                        <p className="text-sm text-gray-900 dark:text-gray-100 truncate" title={link.url}>
                                                            {link.url}
                                                        </p>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="font-mono text-blue-600 dark:text-blue-400">
                                                        {link.shortUrl}
                                                    </Badge>
                                                    <Button
                                                        onClick={() => copyToClipboard(link.shortUrl, link._id)}
                                                        size="sm"
                                                        variant="ghost"
                                                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                    >
                                                        {copiedId === link._id ? (
                                                            <MdCheck className="w-4 h-4 text-green-600" />
                                                        ) : (
                                                            <MdContentCopy className="w-4 h-4 text-gray-500" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                        {link.clicks.toLocaleString()}
                                                    </span>
                                                    {link.clicks > 0 && (
                                                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                            Active
                                                        </Badge>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {formatDate(link.createdAt)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        onClick={() => {
                                                            setEditingId(link._id);
                                                            setEditUrl(link.url);
                                                        }}
                                                        size="sm"
                                                        variant="ghost"
                                                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                        disabled={editingId === link._id}
                                                    >
                                                        <MdEdit className="w-4 h-4 text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            window.open(`/${link.shortUrl}`, '_blank');
                                                        }}
                                                        size="sm"
                                                        variant="ghost"
                                                        className="hover:bg-green-50 dark:hover:bg-green-900/20"
                                                    >
                                                        <MdShare className="w-4 h-4 text-green-600" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDeleteLink(link._id)}
                                                        size="sm"
                                                        variant="ghost"
                                                        className="hover:bg-red-50 dark:hover:bg-red-900/20"
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
                    )}
                </Card>

                {/* Top Performing Links */}
                {stats.topLinks.length > 0 && (
                    <Card className="p-6 mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                            <MdTrendingUp className="w-6 h-6 mr-2 text-orange-600" />
                            Top Performing Links
                        </h2>
                        <div className="grid gap-4">
                            {stats.topLinks.map((link, index) => (
                                <div
                                    key={link._id}
                                    className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-xl border border-orange-200 dark:border-orange-800"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-8 h-8 bg-orange-600 text-white rounded-full font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100 truncate max-w-xs">
                                                {link.url}
                                            </p>
                                            <p className="text-sm text-orange-600 dark:text-orange-400 font-mono">
                                                /{link.shortUrl}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                            {link.clicks.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">clicks</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
