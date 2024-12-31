// FileUpload.tsx
import React, { ChangeEvent, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { Toast, ToastRef } from '../Toast/Toast';
interface FileUploadProps {
    mode?: 'basic' | 'advanced';
    name?: string;
    url?: string;
    onUpload?: (event: { files: File[] }) => void;
    multiple?: boolean;
    accept?: string;
    maxFileSize?: number;
    chooseLabel?: string;
    className?: string;
}

// Icon Components
const PlusIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 5v14m-7-7h14" />
    </svg>
);

interface IconProps {
    className?: string;
}

const UploadIcon = ({ className }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
);

const XIcon = ({ className }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const FileIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8m-6-6l6 6m-6-6v6h6" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 6L9 17l-5-5" />
    </svg>
);

const isImageFile = (file: File) => {
    return file.type.startsWith('image/');
};

const FileUpload = ({
    mode = 'advanced',
    name,
    url,
    onUpload,
    multiple = false,
    accept,
    maxFileSize,
    chooseLabel = 'Choose File',
    className = '',
}: FileUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toastRef = useRef<ToastRef>(null);
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === 'dragenter' || e.type === 'dragover');
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        if (files && files.length > 0) {
            handleFiles(files);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            handleFiles(files);
        }
    };

    const handleFiles = async (files: File[]) => {
        if (uploading) return;

        try {
            if (maxFileSize) {
                const validFiles = files.filter((file) => file.size <= maxFileSize);
                if (validFiles.length !== files.length) {
                    toastRef.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'File size exceeds maximum limit',
                        life: 3000,
                    });
                    return;
                }
            }

            setSelectedFiles(files);
        } catch (error) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to process files',
                life: 3000,
            });
        }
    };

    const uploadFiles = async () => {
        if (uploading || selectedFiles.length === 0) return;
        setUploading(true);

        try {
            if (!url) {
                throw new Error('Upload URL is required');
            }

            const formData = new FormData();
            selectedFiles.forEach((file) => {
                formData.append(name || 'file', file);
            });

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toastRef.current?.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Files uploaded successfully',
                    life: 3000,
                });
                onUpload?.({ files: selectedFiles });
                setSelectedFiles([]);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'File upload failed',
                life: 3000,
            });
        } finally {
            setUploading(false);
            onUpload?.({ files: selectedFiles });
            setSelectedFiles([]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const renderBasicUpload = () => {
        if (uploadSuccess) {
            return (
                <Button disabled className="button button--success w-40">
                    <CheckIcon />
                    Success!
                </Button>
            );
        }

        if (uploading) {
            return (
                <Button disabled className="button button--primary w-40">
                    <UploadIcon className="w-4 h-4 animate-spin" />
                    Uploading...
                </Button>
            );
        }

        if (selectedFiles.length > 0) {
            const fileName = selectedFiles[0].name;
            const truncatedName = fileName.length > 15 ? fileName.substring(0, 15) + '...' : fileName;

            return (
                <Button onClick={handleBasicUpload} className="button button--primary w-40 flex items-center justify-center gap-2">
                    <UploadIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{truncatedName}</span>
                </Button>
            );
        }

        return (
            <Button onClick={() => fileInputRef.current?.click()} className="button button--primary w-40 flex items-center justify-center gap-2">
                <UploadIcon className="w-4 h-4 flex-shrink-0" />
                {chooseLabel}
            </Button>
        );
    };

    const handleBasicUpload = async () => {
        if (uploading || selectedFiles.length === 0) return;
        setUploading(true);
        setUploadSuccess(false);

        try {
            const formData = new FormData();
            selectedFiles.forEach((file) => {
                formData.append(name || 'file', file);
            });

            if (!url) {
                throw new Error('Upload URL is required');
            }

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setUploadSuccess(true);
                toastRef.current?.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'File uploaded successfully',
                    life: 3000,
                });
                onUpload?.({ files: selectedFiles });

                setTimeout(() => {
                    setSelectedFiles([]);
                    setUploadSuccess(false);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                }, 1500);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'File upload failed',
                life: 3000,
            });
        } finally {
            setUploading(false);
            setSelectedFiles([]);
            setUploadSuccess(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const renderFileList = () => {
        return selectedFiles.map((file, index) => (
            <div key={index} className="file-upload__file">
                <div className="file-upload__file-info">
                    {isImageFile(file) ? (
                        <div className="file-upload__file-preview">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="file-upload__file-image"
                                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                            />
                        </div>
                    ) : (
                        <div className="file-upload__file-info-icon">
                            <FileIcon />
                        </div>
                    )}
                    <div className="file-upload__file-info-details">
                        <span className="name">{file.name}</span>
                        <span className="size">{Math.round(file.size / 1024)} KB</span>
                    </div>
                </div>
                <div className="file-upload__file-status">
                    <span className="badge">{uploading ? 'Uploading...' : 'Pending'}</span>
                    {!uploading && (
                        <button onClick={() => removeFile(index)} className="file-upload__remove-btn" type="button" aria-label="Remove file">
                            <XIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        ));
    };

    return (
        <div className={`file-upload ${mode === 'basic' ? 'file-upload--basic' : ''}`}>
            <Toast ref={toastRef} />
            {mode === 'advanced' && (
                <div className="file-upload__actions">
                    <Button onClick={() => fileInputRef.current?.click()} className="button button--secondary w-24">
                        <PlusIcon />
                        Choose
                    </Button>
                    <Button onClick={uploadFiles} disabled={selectedFiles.length === 0 || uploading} className="button button--primary w-24">
                        <UploadIcon className="animate-spin" />
                        {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                    <Button onClick={() => setSelectedFiles([])} disabled={selectedFiles.length === 0} className="button button--secondary w-24">
                        <XIcon className="w-3 h-3" />
                        Clear
                    </Button>
                </div>
            )}

            <div
                className={`file-upload__dropzone ${dragActive ? 'file-upload__dropzone--active' : ''} ${
                    mode === 'basic' ? 'file-upload__dropzone--basic' : ''
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input ref={fileInputRef} type="file" onChange={handleChange} className="hidden" multiple={multiple} accept={accept} />

                {mode === 'basic' ? (
                    renderBasicUpload()
                ) : (
                    <div className="file-upload__content">
                        {selectedFiles.length > 0 ? (
                            renderFileList()
                        ) : (
                            <div className="file-upload__placeholder">
                                <p>Drag and drop files here or</p>
                                <button onClick={() => fileInputRef.current?.click()} className="file-upload__browse" type="button">
                                    browse
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
