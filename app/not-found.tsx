'use client';
import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center max-w-screen-lg w-full p-4" style={{
                        borderRadius: '26px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%)',
                    }}>
                <div className="surface-card py-8 px-5 sm:px-8 w-full md:w-4/5 lg:w-3/4 flex flex-column align-items-center shadow-2 border-round-2xl">
                    <span className="text-primary font-bold text-4xl mb-2">404</span>
                    <h1 className="text-900 font-bold text-3xl sm:text-4xl md:text-5xl mb-4">Not Found</h1>
                    <p className="text-600 text-lg mb-6 text-center">The requested resource is not available</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        <Link href="/" className="flex p-4 border-round-lg hover:surface-hover transition-colors transition-duration-150">
                            <span className="flex justify-content-center align-items-center bg-cyan-100 border-round h-3rem w-3rem">
                                <i className="pi pi-table text-cyan-600 text-2xl"></i>
                            </span>
                            <div className="ml-3">
                                <span className="text-900 font-medium block mb-2">Documentation</span>
                                <span className="text-600 text-sm">View user guides</span>
                            </div>
                        </Link>

                        <Link href="/" className="flex p-4 border-round-lg hover:surface-hover transition-colors transition-duration-150">
                            <span className="flex justify-content-center align-items-center bg-orange-100 border-round h-3rem w-3rem">
                                <i className="pi pi-question-circle text-orange-600 text-2xl"></i>
                            </span>
                            <div className="ml-3">
                                <span className="text-900 font-medium block mb-2">Support Center</span>
                                <span className="text-600 text-sm">Get help and resources</span>
                            </div>
                        </Link>

                        <Link href="/" className="flex p-4 border-round-lg hover:surface-hover transition-colors transition-duration-150">
                            <span className="flex justify-content-center align-items-center bg-indigo-100 border-round h-3rem w-3rem">
                                <i className="pi pi-home text-indigo-600 text-2xl"></i>
                            </span>
                            <div className="ml-3">
                                <span className="text-900 font-medium block mb-2">Return Home</span>
                                <span className="text-600 text-sm">Back to main page</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
