// ./types/ErrorReport.ts

export interface ErrorReport {
    node_name: string;
    error_time: number;
    filename: string;
    text: string;
    module: string;
    version: string;
    peer: string;
    exception: string;
    exception_message: string;
    origin_file: string;
    origin_method: string;
    origin_line: number;
}
