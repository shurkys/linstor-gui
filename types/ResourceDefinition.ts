// types/ResourceDefinition.ts
interface DrbdResourceDefinitionLayer {
    resource_name_suffix: string;
    peer_slots: number;
    al_stripes: number;
    al_stripe_size_kib: number;
    port: number;
    transport_type: string;
    secret: string;
    down: boolean;
}

interface OpenflexResourceDefinitionLayer {
    resource_name_suffix: string;
    nqn: string;
}

interface ResourceDefinitionLayer {
    type: 'DRBD' | 'LUKS' | 'STORAGE' | 'NVME' | 'WRITECACHE' | 'CACHE' | 'BCACHE' | 'OPENFLEX';
    data: DrbdResourceDefinitionLayer | OpenflexResourceDefinitionLayer;
}

interface VolumeDefinitionLayer {
    type: 'DRBD' | 'LUKS' | 'STORAGE' | 'NVME' | 'WRITECACHE' | 'CACHE' | 'BCACHE' | 'OPENFLEX';
    data: {
        resource_name_suffix: string;
        volume_number: number;
        minor_number: number;
    };
}

interface Properties {
    description: string;
    [key: string]: string;
}

interface VolumeDefinition {
    volume_number: number;
    size_kib: number;
    props: Properties;
    flags: string[];
    layer_data: VolumeDefinitionLayer[];
    uuid: string;
}

interface ResourceDefinition {
    drbd_port: number;
    drbd_secret: string;
    drbd_peer_slots: number;
    drbd_transport_type: string;
    name: string;
    external_name: string;
    props: Properties;
    flags: string[];
    layer_data: ResourceDefinitionLayer[];
    uuid: string;
    resource_group_name: string;
    volume_definitions: VolumeDefinition[];
}

export default ResourceDefinition;
