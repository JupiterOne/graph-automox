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
  saml_enabled: boolean;
  sso_enabled: boolean;
};

export type AutomoxDevice = {
  id: number;
  name: string;
  server_group_id: number;
  organization_id: number;
  uuid: string;
  compliant: boolean;
  connected: boolean;
  deleted: boolean;
  detail: {
    LAST_USER_LOGON: {
      USER: string;
      TIME: string;
      SRC: string;
    };
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
  create_time: string;
};
