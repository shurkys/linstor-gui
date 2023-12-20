// ./types/Snapshot.ts

interface Properties {
    description: string;
}

interface SnapshotVolumeDefinition {
    volume_number: number;
    size_kib: number;
}

interface SnapshotNode {
    snapshot_name: string;
    node_name: string;
    create_timestamp: number;
    flags: string[];
    uuid: string;
}

export interface Snapshot {
    name: string;
    resource_name: string;
    nodes: string[];
    props: Properties;
    flags: string[];
    volume_definitions: SnapshotVolumeDefinition[];
    uuid: string;
    snapshots: SnapshotNode[];
}
