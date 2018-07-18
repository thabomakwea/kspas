export interface UserLogginData {
   data: {
        ID: string,
        user_login: string,
        user_pass: string,
        user_nicename: string,
        user_email: string,
        user_url: string,
        user_registered: string,
        user_activation_key: string,
        user_status: string,
        display_name: string
    };
    ID: number;
    caps: {
        subscriber: boolean
    };
    cap_key: string;
    roles: string[];
    allcaps: {
        read: boolean,
        level_0: boolean,
        subscriber: boolean
    };
    filter: any;
}
