export interface DashboardData {
    websiteInventory: {
        liveWebsites: {
            total: number;
            newSites: number;
            activePercentage: number;
        };
        templateLibrary: {
            total: number;
            topCategories: string[];
        };
    };
    performanceAnalytics: {
        websiteTraffic: {
            overallMetrics: {
                totalVisits: number;
                uniqueVisitors: number;
                trafficSources: {
                    organic: number;
                };
                deviceBreakdown: {
                    desktop: number;
                };
            };
            timeSeriesData: {
                labels: string[];
                datasets: any[];
            };
        };
        issueTracking: {
            issueStatus: {
                total: number;
                resolved: number;
            };
            severityBreakdown: {
                critical: number;
            };
            resolutionTimeline: {
                average: string;
            };
        };
    };
    userEngagement: {
        interactionMetrics: {
            averageSessionDuration: string;
            totalVisits: number;
        };
        downloadActivity: Array<{
            type: string;
            percentage: number;
            color: string;
        }>;
    };
    systemMonitoring: {
        notifications: {
            recent: Array<{
                id: string;
                type: string;
                icon: string;
                message: string;
                timestamp: string;
                priority: string;
            }>;
        };
        healthMetrics: {
            uptime: string;
            responseTime: string;
            serverLoad: string;
            criticalAlerts: number;
        };
        userSatisfaction: {
            recommendationRate: number;
            overallRating: number;
        };
    };
    recentActivity: Array<{
        id: string;
        type: string;
        name: string;
        status: string;
    }>;
    componentManagement: {
        uiElements: {
            total: number;
            newElements: number;
            mostUsedElements: string[];
        };
        packages: {
            total: number;
            responseRate: number;
            types: string[];
        };
    };
}
