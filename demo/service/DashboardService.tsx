import { DashboardData } from '@/types/dashboard';

export const DashboardService = {
    getDashboardData(): Promise<DashboardData> {
        // Try to get from localStorage first
        const savedData = localStorage.getItem('dashboardData');
        if (savedData) {
            return Promise.resolve(JSON.parse(savedData) as DashboardData);
        }

        // If no localStorage data, fetch from JSON file
        return fetch('/demo/data/dashboard.json', {
            headers: { 'Cache-Control': 'no-cache' },
        })
            .then((res) => res.json())
            .then((d) => d as DashboardData);
    },

    updateDashboardData(data: DashboardData) {
        const saveData = { data };
        localStorage.setItem('dashboardData', JSON.stringify(saveData));
        return Promise.resolve(data);
    },
};
