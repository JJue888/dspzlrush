export type PNM = {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    status: 'delta' | 'sigma' | 'phi' | 'no-status';
    image_url: string;
}

export type PNMForm = {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    status: 'delta' | 'sigma' | 'phi' | 'no-status';
}

export type User = {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
}
