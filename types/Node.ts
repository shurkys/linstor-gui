export enum NodeType {
  Controller = 'Controller',
  Satellite = 'Satellite',
  Combined = 'Combined',
  Auxiliary = 'Auxiliary',
  Openflex_Target = 'Openflex_Target',
}

export enum SatelliteEncryptionType {
  Plain = 'Plain',
  SSL = 'SSL',
}

enum ConnectionStatus {
  OFFLINE = 'OFFLINE',
  CONNECTED = 'CONNECTED',
  ONLINE = 'ONLINE',
  VERSION_MISMATCH = 'VERSION_MISMATCH',
  HOSTNAME_MISMATCH = 'HOSTNAME_MISMATCH',
  FULL_SYNC_FAILED = 'FULL_SYNC_FAILED',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  UNKNOWN = 'UNKNOWN',
}

enum ProviderKind {
  DISKLESS = 'DISKLESS',
  LVM = 'LVM',
  LVM_THIN = 'LVM_THIN',
  ZFS = 'ZFS',
  ZFS_THIN = 'ZFS_THIN',
  OPENFLEX_TARGET = 'OPENFLEX_TARGET',
  FILE = 'FILE',
  FILE_THIN = 'FILE_THIN',
  SPDK = 'SPDK',
  // Add other provider kinds as needed
}

enum LayerType {
  DRBD = 'DRBD',
  LUKS = 'LUKS',
  STORAGE = 'STORAGE',
  NVME = 'NVME',
  WRITECACHE = 'WRITECACHE',
  CACHE = 'CACHE',
  OPENFLEX = 'OPENFLEX',
  // Add other layer types as needed
}

interface NetInterface {
  name: string;
  address: string;
  satellite_port: number;
  satellite_encryption_type: SatelliteEncryptionType;
  is_active: boolean;
  uuid: string;
}

interface Properties {
  [key: string]: string;
}

export interface Node {
  name: string;
  type: NodeType;
  flags: string[];
  props: Properties;
  net_interfaces: NetInterface[];
  connection_status: ConnectionStatus;
  uuid: string;
  storage_providers: ProviderKind[];
  resource_layers: LayerType[];
  unsupported_providers: { [key: string]: string };
  unsupported_layers: { [key: string]: string };
}