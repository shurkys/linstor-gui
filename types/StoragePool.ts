// ./types/StoragePool.ts
interface Properties {
  [key: string]: string;
}

interface StaticTraits {
  [key: string]: string;
}

interface ApiCallRc {
  ret_code: number;
  message: string;
  cause: string;
  details: string;
  correction: string;
  error_report_ids: string[];
  obj_refs: {
    [key: string]: string;
  };
}

export enum ProviderKind {
  DISKLESS = 'DISKLESS',
  LVM = 'LVM',
  LVM_THIN = 'LVM_THIN',
  ZFS = 'ZFS',
  ZFS_THIN = 'ZFS_THIN',
  OPENFLEX_TARGET = 'OPENFLEX_TARGET',
  FILE = 'FILE',
  FILE_THIN = 'FILE_THIN',
  SPDK = 'SPDK',
  EBS_TARGET = 'EBS_TARGET',
  EBS_INIT = 'EBS_INIT',
}


export interface StoragePool {
  storage_pool_name: string;
  node_name: string;
  provider_kind: ProviderKind;
  props: Properties;
  static_traits: StaticTraits;
  free_capacity: number;
  total_capacity: number;
  free_space_mgr_name: string;
  uuid: string;
  reports: ApiCallRc[];
  supports_snapshots: boolean;
  shared_space: string | null;
  external_locking: boolean;
}

export default StoragePool;
