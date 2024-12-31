'use client';
import { Button } from '@/components/Button/Button';
import ColorPicker from '@/components/ColorPicker/ColorPicker';
import InputNumber from '@/components/InputNumber/InputNumber';
import { InputText } from '@/components/InputText/InputText';
import { Panel } from '@/components/Panel/Panel';
import { Toast, ToastRef } from '@/components/Toast/Toast';
import { DashboardService } from '@/demo/service/DashboardService';
import { DashboardData } from '@/types/dashboard';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function DashboardEditPage() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const toast = useRef<ToastRef>(null);

    const loadDashboardData = useCallback(async () => {
        try {
            const data = await DashboardService.getDashboardData();
            setDashboardData(data);
        } catch (error) {
            showErrorToast('Error loading dashboard data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);

    const showSuccessToast = (message: string) => {
        toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: message,
            life: 3000,
        });
    };

    const showErrorToast = (message: string) => {
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000,
        });
    };

    const updateWebsiteInventory = (section: keyof DashboardData['websiteInventory'], field: string, value: number | string) => {
        if (!dashboardData) return;
        // console.log(section, field, value);
    };

    const updateDownloadActivity = (index: number, field: keyof DashboardData['userEngagement']['downloadActivity'][0], value: string | number) => {
        if (!dashboardData) return;
        // console.log(index, field, value);
    };

    const handleSaveChanges = async () => {
        if (!dashboardData) return;

        try {
            setLoading(true);
            showSuccessToast('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving changes:', error);
            showErrorToast('Error saving changes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="card p-d-flex p-jc-center p-ai-center" style={{ height: '400px' }}>
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
            </div>
        );
    }

    if (!dashboardData) {
        return <div className="card p-d-flex p-jc-center p-ai-center">Error loading dashboard data</div>;
    }

    return (
        <div className="dashboardEditContainer">
            <Toast ref={toast} />

            <div className="flex justify-content-between align-items-center mb-5">
                <h1 className="pageTitle">Edit Dashboard Data</h1>
                <Button label="Save Changes" icon="pi pi-save" onClick={handleSaveChanges} severity="success" />
            </div>

            <Panel header="Website Inventory" className="mb-4" toggleable>
                <div className="overviewGrid">
                    <div className="overviewGroup">
                        <h3>Live Websites</h3>
                        <div className="inputGroup">
                            <span className="p-float-label">
                                <InputNumber
                                    id="total-websites"
                                    value={dashboardData.websiteInventory.liveWebsites.total}
                                    onValueChange={(e: number | null) => updateWebsiteInventory('liveWebsites', 'total', e ?? 0)}
                                    min={0}
                                />
                                <label htmlFor="total-websites">Total Websites</label>
                            </span>

                            <span className="p-float-label">
                                <InputNumber
                                    id="new-sites"
                                    value={dashboardData.websiteInventory.liveWebsites.newSites}
                                    onValueChange={(e: number | null) => updateWebsiteInventory('liveWebsites', 'newSites', e ?? 0)}
                                />
                                <label htmlFor="new-sites">New Sites</label>
                            </span>

                            <span className="p-float-label">
                                <InputNumber
                                    id="active-percentage"
                                    value={dashboardData.websiteInventory.liveWebsites.activePercentage}
                                    onValueChange={(e: number | null) => updateWebsiteInventory('liveWebsites', 'activePercentage', e ?? 0)}
                                    mode="decimal"
                                />
                                <label htmlFor="active-percentage">Active Percentage</label>
                            </span>
                        </div>
                    </div>

                    <div className="overviewGroup">
                        <h3>Template Library</h3>
                        <div className="inputGroup">
                            <span className="p-float-label">
                                <InputNumber
                                    id="total-templates"
                                    value={dashboardData.websiteInventory.templateLibrary.total}
                                    onValueChange={(e: number | null) => updateWebsiteInventory('templateLibrary', 'total', e ?? 0)}
                                />
                                <label htmlFor="total-templates">Total Templates</label>
                            </span>
                        </div>
                    </div>
                </div>
            </Panel>

            <Panel header="Download Activity" className="mb-4" toggleable>
                <div className="grid">
                    {dashboardData.userEngagement.downloadActivity.map((item, index) => (
                        <div key={index} className="col-12 md:col-6 lg:col-3">
                            <div className="downloadActivityItem">
                                <h3>Activity {index + 1}</h3>
                                <div className="inputGroup">
                                    <span className="p-float-label">
                                        <InputText
                                            id={`type-${index}`}
                                            value={item.type}
                                            onChange={(e) => updateDownloadActivity(index, 'type', e.target.value)}
                                        />
                                        <label htmlFor={`type-${index}`}>Type</label>
                                    </span>

                                    <span className="p-float-label">
                                        <InputNumber
                                            id={`percentage-${index}`}
                                            value={item.percentage}
                                            onValueChange={(e: number | null) => updateDownloadActivity(index, 'percentage', e ?? 0)}
                                            mode="decimal"
                                            min={0}
                                            max={100}
                                        />
                                        <label htmlFor={`percentage-${index}`}>Percentage</label>
                                    </span>

                                    <ColorPicker value={item.color} onChange={(e: { value: string }) => updateDownloadActivity(index, 'color', e.value)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>
        </div>
    );
}
