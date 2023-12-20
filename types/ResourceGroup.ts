interface Properties {
    [key: string]: string;
}

interface AutoSelectFilter {
    place_count: number;
    additional_place_count: number;
    node_name_list?: string[];
    storage_pool?: string;
    storage_pool_list?: string[] | null;
    storage_pool_diskless_list?: string[] | null;
    not_place_with_rsc?: string[] | null;
    not_place_with_rsc_regex?: string;
    replicas_on_same?: string[] | null;
    replicas_on_different?: string[] | null;
    layer_stack?: string[] | null;
    provider_list?: string[] | null;
    diskless_on_remaining: boolean;
    diskless_type: string;
}

export interface ResourceGroup {
    name: string;
    description: string;
    props: Properties;
    select_filter: AutoSelectFilter;
    uuid: string;
}
