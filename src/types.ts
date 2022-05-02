// Providers often supply types with their API libraries.
export type AutomoxGroup = {
  id: number;
  organization_id: number;
  name: string;
  parent_server_group_id: number;
};

export type AutomoxUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  orgs: {
    id: number;
    name: string;
    access_key: string;
    trial_end_time: string;
    trial_expired: boolean;
  }[];
};

export type AutomoxDevice = {
  id: number;
  name: string;
  server_group_id: number;
  organization_id: number;
  uuid: string;

  detail: {
    CPU: string;
    DISKS: {
      SIZE: string;
      TYPE: string;
    }[];
    MODEL: string;
    NICS: {
      CONNECTED: string;
      DEVICE: string;
      IP: string[];
      MAC: string;
      TYPE: string;
      VENDOR: string;
    }[];
    RAM: string;
    SERIAL: string;
    SERVICETAG: string;
    VENDOR: string;
    VERSION: string;
  };

  serial_number: string;

  /*
  os_version_id: string;
  instance_id: string;
  refresh_interval: number;
  last_update_time: string;
  last_refresh_time: string;
  uptime: number;
  needs_reboot: boolean;
  timezone: string;
  deleted: boolean;
  create_time: string;
  os_version: string;
  os_name: string;
  os_family: string;
  patches: number;
  cpu: string;
  cpu_size: string;
  cpu_type: string;
  mode: string;
  nics_connected: boolean;
  nics_device: string;
  nics_mac: string;
  nics_type: string;
  nics_vendor: string;
  ram: string;
  serial: string;
  servicetag: string;
  vendor: string;
  version: string;

  pending_patches: string;
  connected: boolean;
  last_process_time: string;
  next_patch_time: string;
  notification_count: number;
  reboot_notification_count: number;
  patch_deferral_count: number;
  is_delayed_by_notification: boolean;
  reboot_is_delayed_by_notification: boolean;
  is_delayed_by_user: boolean;
  reboot_is_delayed_by_user: boolean;
  last_disconnect_time: string;
  needs_attention: boolean;
  serial_number: string;
  device_status: string;
  agent_status: string;
  policy_status: string;


  last_logged_in_user: string;*/
};
