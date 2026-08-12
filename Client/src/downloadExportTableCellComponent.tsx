import React, { useCallback } from 'react';
import { Button, ButtonColor, ButtonSize } from '@kentico/xperience-admin-components';
import { usePageCommandProvider } from '@kentico/xperience-admin-base';

/** Copy of C# DownloadExportClientProperties class. */
interface DownloadExportClientProperties {
    fileName: string;
}

export const DownloadExportTableCellComponent = (props: DownloadExportClientProperties) => {
    const { executeCommand } = usePageCommandProvider();

    /**
     * Click handler for export download button.
     */
    const handleExportDownload = useCallback(async () => {
        const base64 = await executeCommand<string, string>("GetBase64String", props.fileName);

        // Determine MIME type from extension
        const ext = props.fileName.split('.').pop()?.toLowerCase();
        let mime = 'application/octet-stream';
        if (ext === 'csv') mime = 'text/csv';
        else if (ext === 'json') mime = 'application/json';
        else if (ext === 'xlsx') mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        const href = `data:${mime};base64,${base64}`;
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = href;
        link.download = props.fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [props.fileName, executeCommand]);

    return (
        <Button
            icon='xp-arrow-down-line'
            color={ButtonColor.Quinary}
            size={ButtonSize.S}
            borderless={true}
            onClick={() => handleExportDownload()} />
    );
};
