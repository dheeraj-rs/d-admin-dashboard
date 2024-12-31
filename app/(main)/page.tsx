'use client';
import Chart from '@/components/Chart/Chart';
import { MenuRef } from '@/components/Menu/Menu';
import { DashboardService } from '@/demo/service/DashboardService';
import { DashboardData } from '@/types/dashboard';
import { ChartOptions } from 'chart.js';
import { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../../layout/context/layoutContext';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const menu1 = useRef<MenuRef>(null);
    const menu2 = useRef<MenuRef>(null);
    const [lineOptions, setLineOptions] = useState<ChartOptions>({});
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    },
                },
                y: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        DashboardService.getDashboardData().then((data) => setDashboardData(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    if (!dashboardData) {
        return <div>Loading dashboard data...</div>;
    }

    const websiteData = dashboardData.websiteInventory.liveWebsites;
    const performanceData = dashboardData.performanceAnalytics.websiteTraffic;
    const userEngagement = dashboardData.userEngagement;
    const systemNotifications = dashboardData.systemMonitoring.notifications.recent;

    return (
        <div className="grid p-2">
            {/* Website Inventory Overview */}
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Live Websites</span>
                            <div className="text-900 font-medium text-xl">{websiteData.total}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-globe text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{websiteData.newSites} new </span>
                    <span className="text-500">Active: {websiteData.activePercentage}%</span>
                </div>
            </div>
            {/* Performance Metrics */}
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total Visits</span>
                            <div className="text-900 font-medium text-xl">{performanceData.overallMetrics.totalVisits.toLocaleString()}</div>
                        </div>
                        <div
                            className="flex align-items-center justify-content-center bg-orange-100 border-round"
                            style={{ width: '2.5rem', height: '2.5rem' }}
                        >
                            <i className="pi pi-chart-line text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{performanceData.overallMetrics.uniqueVisitors.toLocaleString()} </span>
                    <span className="text-500">Unique Visitors</span>
                </div>
            </div>
            {/* User Engagement */}
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Avg. Session</span>
                            <div className="text-900 font-medium text-xl">{userEngagement.interactionMetrics.averageSessionDuration}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <i className="pi pi-clock text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{userEngagement.interactionMetrics.totalVisits.toLocaleString()} </span>
                    <span className="text-500">Total Interactions</span>
                </div>
            </div>
            {/* System Notifications */}
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Notifications</span>
                            <div className="text-900 font-medium text-xl">{systemNotifications.length}</div>
                        </div>
                        <div
                            className="flex align-items-center justify-content-center bg-purple-100 border-round"
                            style={{ width: '2.5rem', height: '2.5rem' }}
                        >
                            <i className="pi pi-bell text-purple-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{systemNotifications.filter((n) => n.priority === 'high').length} High Priority </span>
                    <span className="text-500">Recent Alerts</span>
                </div>
            </div>
            {/* Trending Section */}
            <div className="col-12">
                <div className="card p-0 ">
                    <div className="grid m-0">
                        {/* Website Categories */}
                        <div className="col-12 md:col-6 lg:col-3 p-3">
                            <div
                                className="surface-0 shadow-1 p-3 border-round-xl hover:shadow-3 transition-duration-200 cursor-pointer h-full"
                                style={{ minHeight: '8rem' }}
                            >
                                <div className="flex justify-content-between mb-3">
                                    <div
                                        className="flex align-items-center justify-content-center bg-blue-50 border-round-xl"
                                        style={{ width: '2.5rem', height: '2.5rem' }}
                                    >
                                        <i className="pi pi-bookmark text-blue-500 text-xl" />
                                    </div>
                                    <div className="flex flex-column align-items-end">
                                        <span className="text-500 font-medium">Top Categories</span>
                                        <span className="text-700 text-sm">{dashboardData.websiteInventory.templateLibrary.total} Templates</span>
                                    </div>
                                </div>
                                <div className="text-900 font-medium text-xl mb-2">
                                    {dashboardData.websiteInventory.templateLibrary.topCategories.slice(0, 2).join(', ')}
                                </div>
                                <div className="flex align-items-center">
                                    <i className="pi pi-arrow-up text-green-500 mr-2" />
                                    <span className="text-green-500 font-medium text-sm">Growing Categories</span>
                                </div>
                            </div>
                        </div>

                        {/* Traffic Sources */}
                        <div className="col-12 md:col-6 lg:col-3 p-3">
                            <div
                                className="surface-0 shadow-1 p-3 border-round-xl hover:shadow-3 transition-duration-200 cursor-pointer h-full"
                                style={{ minHeight: '8rem' }}
                            >
                                <div className="flex justify-content-between mb-3">
                                    <div
                                        className="flex align-items-center justify-content-center bg-green-50 border-round-xl"
                                        style={{ width: '2.5rem', height: '2.5rem' }}
                                    >
                                        <i className="pi pi-chart-bar text-green-500 text-xl" />
                                    </div>
                                    <div className="flex flex-column align-items-end">
                                        <span className="text-500 font-medium">Traffic Source</span>
                                        <span className="text-700 text-sm">{performanceData.overallMetrics.trafficSources.organic}% Organic</span>
                                    </div>
                                </div>
                                <div className="text-900 font-medium text-xl mb-2">Organic Search</div>
                                <div className="flex align-items-center">
                                    <i className="pi pi-arrow-up text-green-500 mr-2" />
                                    <span className="text-green-500 font-medium text-sm">Leading Channel</span>
                                </div>
                            </div>
                        </div>

                        {/* Device Usage */}
                        <div className="col-12 md:col-6 lg:col-3 p-3">
                            <div
                                className="surface-0 shadow-1 p-3 border-round-xl hover:shadow-3 transition-duration-200 cursor-pointer h-full"
                                style={{ minHeight: '8rem' }}
                            >
                                <div className="flex justify-content-between mb-3">
                                    <div
                                        className="flex align-items-center justify-content-center bg-purple-50 border-round-xl"
                                        style={{ width: '2.5rem', height: '2.5rem' }}
                                    >
                                        <i className="pi pi-desktop text-purple-500 text-xl" />
                                    </div>
                                    <div className="flex flex-column align-items-end">
                                        <span className="text-500 font-medium">Device Usage</span>
                                        <span className="text-700 text-sm">{performanceData.overallMetrics.deviceBreakdown.desktop}% Desktop</span>
                                    </div>
                                </div>
                                <div className="text-900 font-medium text-xl mb-2">Desktop Dominant</div>
                                <div className="flex align-items-center">
                                    <i className="pi pi-desktop text-purple-500 mr-2" />
                                    <span className="text-purple-500 font-medium text-sm">Primary Platform</span>
                                </div>
                            </div>
                        </div>

                        {/* User Satisfaction */}
                        <div className="col-12 md:col-6 lg:col-3 p-3">
                            <div
                                className="surface-0 shadow-1 p-3 border-round-xl hover:shadow-3 transition-duration-200 cursor-pointer h-full"
                                style={{ minHeight: '8rem' }}
                            >
                                <div className="flex justify-content-between mb-3">
                                    <div
                                        className="flex align-items-center justify-content-center bg-orange-50 border-round-xl"
                                        style={{ width: '2.5rem', height: '2.5rem' }}
                                    >
                                        <i className="pi pi-star-fill text-orange-500 text-xl" />
                                    </div>
                                    <div className="flex flex-column align-items-end">
                                        <span className="text-500 font-medium">Satisfaction</span>
                                        <span className="text-700 text-sm">
                                            {dashboardData.systemMonitoring.userSatisfaction.recommendationRate}% Recommended
                                        </span>
                                    </div>
                                </div>
                                <div className="text-900 font-medium text-xl mb-2">{dashboardData.systemMonitoring.userSatisfaction.overallRating}/5.0</div>
                                <div className="flex align-items-center">
                                    <i className="pi pi-thumbs-up text-orange-500 mr-2" />
                                    <span className="text-orange-500 font-medium text-sm">High Satisfaction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Left Column */}
            <div className="col-12 lg:col-6">
                {/* Download Activity */}
                <div className="card">
                    <h5>Download Activity</h5>
                    <ul className="list-none p-0 m-0 download-activity">
                        {userEngagement.downloadActivity.map((activity, index) => (
                            <li key={index} className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">{activity.type}</span>
                                </div>
                                <div className="mt-2 md:mt-0 flex align-items-center w-full">
                                    <div className="surface-300 border-round overflow-hidden w-full" style={{ height: '8px' }}>
                                        <div className={`bg-${activity.color}-500 h-full`} style={{ width: `${activity.percentage}%` }} />
                                    </div>
                                    <span className={`text-${activity.color}-500 ml-3 font-medium`}>{activity.percentage}%</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recent Activity */}
                <div className="card">
                <h5>Recent Activity</h5>
                    <ul className="list-none p-0 m-0 recent-activity">
                        {dashboardData.recentActivity.map((activity) => (
                            <li key={activity.id} className="flex align-items-center py-2 border-bottom-1 surface-border mb-3">
                                <div
                                    className={`w-3rem h-3rem flex align-items-center justify-content-center bg-${
                                        activity.type === 'website' ? 'blue' : 'green'
                                    }-100 border-circle mr-3 flex-shrink-0`}
                                >
                                    <i
                                        className={`pi ${activity.type === 'website' ? 'pi-globe' : 'pi-image'} text-xl text-${
                                            activity.type === 'website' ? 'blue' : 'green'
                                        }-500`}
                                    />
                                </div>
                                <div>
                                    <span className="text-900 font-medium">{activity.name}</span>
                                    <div className="text-600 text-sm">
                                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} | {activity.status}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Right Column */}
            <div className="col-12 lg:col-6">
                {/* Performance Analytics */}
                <div className="card">
                    <h5>Performance Analytics</h5>
                    <Chart type="line" data={performanceData.timeSeriesData} options={lineOptions} />
                </div>

                {/* Notifications */}
                <div className="card">
                <h5>System Notifications</h5>
                    <ul className="p-0 m-0 list-none system-notifications">
                        {systemNotifications.map((notification) => (
                            <li key={notification.id} className="flex align-items-center py-2 border-bottom-1 surface-border">
                                <div
                                    className={`w-3rem h-3rem flex align-items-center justify-content-center bg-${
                                        notification.type === 'Error' ? 'red' : 'blue'
                                    }-100 border-circle mr-3 flex-shrink-0`}
                                >
                                    <i className={`pi ${notification.icon} text-xl text-${notification.type === 'Error' ? 'red' : 'blue'}-500`} />
                                </div>
                                <span className="text-900 line-height-3">
                                    {notification.message}
                                    <span className="text-700 block text-sm">{new Date(notification.timestamp).toLocaleString()}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Issue Tracking Overview */}
            <div className="col-12">
                <div className="card">
                    <h5>Issue Tracking Overview</h5>
                    <div className="grid">
                        {/* Issue Status */}
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="surface-0 shadow-2 p-3 border-round">
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Total Issues</span>
                                        <div className="text-900 font-medium text-xl">{dashboardData.performanceAnalytics.issueTracking.issueStatus.total}</div>
                                    </div>
                                    <div
                                        className="flex align-items-center justify-content-center bg-red-100 border-round"
                                        style={{ width: '2.5rem', height: '2.5rem' }}
                                    >
                                        <i className="pi pi-exclamation-circle text-red-500 text-xl" />
                                    </div>
                                </div>
                                <span className="text-green-500 font-medium">
                                    {dashboardData.performanceAnalytics.issueTracking.issueStatus.resolved} Resolved{' '}
                                </span>
                            </div>
                        </div>

                        {/* Critical Issues */}
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="surface-0 shadow-2 p-3 border-round">
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Critical Issues</span>
                                        <div className="text-900 font-medium text-xl">
                                            {dashboardData.performanceAnalytics.issueTracking.severityBreakdown.critical}
                                        </div>
                                    </div>
                                    <div
                                        className="flex align-items-center justify-content-center bg-yellow-100 border-round"
                                        style={{ width: '2.5rem', height: '2.5rem' }}
                                    >
                                        <i className="pi pi-bolt text-yellow-500 text-xl" />
                                    </div>
                                </div>
                                <span className="text-500">
                                    Average Resolution: {dashboardData.performanceAnalytics.issueTracking.resolutionTimeline.average}
                                </span>
                            </div>
                        </div>

                        {/* System Health */}
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="surface-0 shadow-2 p-3 border-round">
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">System Uptime</span>
                                        <div className="text-900 font-medium text-xl">{dashboardData.systemMonitoring.healthMetrics.uptime}</div>
                                    </div>
                                    <div
                                        className="flex align-items-center justify-content-center bg-green-100 border-round"
                                        style={{ width: '2.5rem', height: '2.5rem' }}
                                    >
                                        <i className="pi pi-check-circle text-green-500 text-xl" />
                                    </div>
                                </div>
                                <span className="text-500">Response Time: {dashboardData.systemMonitoring.healthMetrics.responseTime}</span>
                            </div>
                        </div>

                        {/* Server Load */}
                        <div className="col-12 md:col-6 lg:col-3">
                            <div className="surface-0 shadow-2 p-3 border-round">
                                <div className="flex justify-content-between mb-3">
                                    <div>
                                        <span className="block text-500 font-medium mb-3">Server Load</span>
                                        <div className="text-900 font-medium text-xl">{dashboardData.systemMonitoring.healthMetrics.serverLoad}</div>
                                    </div>
                                    <div
                                        className="flex align-items-center justify-content-center bg-purple-100 border-round"
                                        style={{ width: '2.5rem', height: '2.5rem' }}
                                    >
                                        <i className="pi pi-server text-purple-500 text-xl" />
                                    </div>
                                </div>
                                <span className="text-500">Critical Alerts: {dashboardData.systemMonitoring.healthMetrics.criticalAlerts}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
