// types/ResourceWithVolumes.ts
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

interface DrbdVolumeDefinition {
    resource_name_suffix: string;
    volume_number: number;
    minor_number: number;
}

interface DrbdVolume {
    drbd_volume_definition: DrbdVolumeDefinition;
    device_path: string;
    backing_device: string;
    meta_disk: string;
    allocated_size_kib: number;
    usable_size_kib: number;
    disk_state: string;
    ext_meta_stor_pool: string | null;
}

interface DrbdResource {
    drbd_resource_definition: DrbdResourceDefinitionLayer;
    node_id: number;
    peer_slots: number;
    al_stripes: number;
    al_size: number;
    flags: string[];
    drbd_volumes: DrbdVolume[];
}

interface ResourceLayer {
    children: any[]; // Replace 'any' with the appropriate type
    resource_name_suffix: string;
    type: 'DRBD' | 'LUKS' | 'STORAGE' | 'NVME' | 'WRITECACHE' | 'CACHE' | 'BCACHE' | 'OPENFLEX';
    drbd?: DrbdResource;
}

interface LUKSVolume {
    volume_number: number;
    device_path: string;
    backing_device: string;
    allocated_size_kib: number;
    usable_size_kib: number;
    disk_state: string;
    opened: boolean;
}

interface LUKSResource {
    luks_volumes: LUKSVolume[];
}

interface StorageVolume {
    volume_number: number;
    device_path: string;
    allocated_size_kib: number;
    usable_size_kib: number;
    disk_state: string;
}

interface StorageResource {
    storage_volumes: StorageVolume[];
}

interface NVMEVolume {
    volume_number: number;
    device_path: string;
    backing_device: string;
    allocated_size_kib: number;
    usable_size_kib: number;
    disk_state: string;
}

interface NVMEResource {
    nvme_volumes: NVMEVolume[];
}

interface OpenflexVolume {
    volume_number: number;
    device_path: string;
    allocated_size_kib: number;
    usable_size_kib: number;
    disk_state: string;
}

interface OpenflexResourceDefinitionLayer {
    resource_name_suffix: string;
    nqn: string;
}

interface OpenflexResource {
    openflex_resource_definition: OpenflexResourceDefinitionLayer;
    openflex_volumes: OpenflexVolume[];
}

interface WritecacheVolume {
    volume_number: number;
    device_path: string;
    device_path_cache: string;
    allocated_size_kib: number;
    usable_size_kib: number;
    disk_state: string;
}

interface WritecacheResource {
    writecache_volumes: WritecacheVolume[];
}

interface CacheVolume {
    volume_number: number;
    device_path: string;
    device_path_cache: string;
    device_meta_cache: string;
    allocated_size_kib: number;
    usable_size_kib: number;
    disk_state: string;
}

interface CacheResource {
    cache_volumes: CacheVolume[];
}

interface BCacheVolume {
    volume_number: number;
    device_path: string;
    device_path_cache: string;
    allocated_size_kib: number;
    usable_size_kib: number;
    disk_state: string;
}

interface BCacheResource {
    bcache_volumes: BCacheVolume[];
}

interface ResourceState {
    in_use: boolean;
}

interface VolumeLayer {
    type: 'DRBD' | 'LUKS' | 'STORAGE' | 'NVME' | 'WRITECACHE' | 'CACHE' | 'BCACHE' | 'OPENFLEX';
    data: DrbdVolume | LUKSVolume | StorageVolume | NVMEVolume | WritecacheVolume | CacheVolume | BCacheVolume | OpenflexVolume;
}

interface Volume {
    volume_number: number;
    storage_pool_name: string;
    provider_kind: 'DISKLESS' | 'LVM' | 'LVM_THIN' | 'ZFS' | 'ZFS_THIN' | 'OPENFLEX_TARGET' | 'FILE' | 'FILE_THIN' | 'SPDK';
    device_path: string;
    allocated_size_kib: number;
    usable_size_kib: number;
    props: Properties;
    flags: string[];
    state: VolumeState;
    layer_data_list: VolumeLayer[];
    uuid: string;
    reports: ApiCallRc[];
}

interface ResourceWithVolumes {
    name: string;
    node_name: string;
    props: Properties;
    flags: string[];
    layer_object: ResourceLayer;
    state: ResourceState;
    uuid: string;
    create_timestamp: number;
    volumes: Volume[];
    shared_name: string;
}

interface ApiCallRc {
    ret_code: number;
    message: string;
    cause: string;
    details: string;
    correction: string;
    error_report_ids: string[];
    obj_refs: Record<string, string>;
}

interface Properties {
    description: string;
    [key: string]: string;
}

interface VolumeState {
    disk_state: string;
}

export default ResourceWithVolumes;
