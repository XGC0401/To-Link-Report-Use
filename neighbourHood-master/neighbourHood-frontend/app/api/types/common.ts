export interface loginParams {
    email: string;
    password: string;
}

export interface BasicResponse<T> {
    code: string;
    success: boolean;
    data: T;
    message: string;
}

export interface User {
    uuid: String;
    username: String;
    email: String;
    house: String;
}