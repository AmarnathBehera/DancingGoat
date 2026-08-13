import React, { useCallback, useState } from 'react';
import { Button, ButtonColor, ButtonSize } from '@kentico/xperience-admin-components';
import { usePageCommandProvider } from '@kentico/xperience-admin-base';

/** Copy of C# DownloadExportClientProperties class. */
interface DownloadExportClientProperties {
    fileName: string;
}

export const DownloadExportTableCellComponent = (props: DownloadExportClientProperties) => {
    const { executeCommand } = usePageCommandProvider();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Determines the MIME type based on file extension
     */
    const getMimeType = (fileName: string): string => {
        const ext = fileName.split('.').pop()?.toLowerCase();

        const mimeTypes: Record<string, string> = {
            'csv': 'text/csv',
            'json': 'application/json',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'xls': 'application/vnd.ms-excel',
            'pdf': 'application/pdf',
            'txt': 'text/plain',
            'xml': 'application/xml'
        };

        return mimeTypes[ext || ''] || 'application/octet-stream';
    };

    /**
     * Click handler for export download button with loading state and error handling
     */
    const handleExportDownload = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Fetch Base64 encoded file content
            const base64 = await executeCommand<string, string>("GetBase64String", props.fileName);

            if (!base64) {
                throw new Error('Failed to retrieve file content');
            }

            // Get appropriate MIME type
            const mime = getMimeType(props.fileName);

            // Create download link and trigger download
            const href = `data:${mime};base64,${base64}`;
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = href;
            link.download = props.fileName;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Optional: Log successful download
            console.log(`File downloaded successfully: ${props.fileName}`);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to download file. Please try again.';
            setError(errorMessage);
            console.error('Download error:', err);

            // Optional: Show error to user (you might want to use a toast/notification component)
            alert(`Error: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [props.fileName, executeCommand]);

    return (
        <Button
            icon='xp-arrow-down-line'
            color={ButtonColor.Quinary}
            size={ButtonSize.S}
            borderless={true}
            disabled={isLoading}
            title={isLoading ? 'Downloading...' : 'Download export file'}
            onClick={() => handleExportDownload()}
        />
    );
};

export default DownloadExportTableCellComponent;
