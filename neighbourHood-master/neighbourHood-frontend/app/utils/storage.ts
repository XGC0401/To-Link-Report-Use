import {isNull} from "lodash-es"

export const Storage = {
    storage: window.localStorage,

    set(key:string, value: any){
        this.storage.setItem(key,value)
    },

    get(key: string,defaultValue?: any){
        const data = this.storage.getItem(key);
        if(isNull(data)){
            return defaultValue ?? null;
        }
        return data;
    },

    remove(key: string){
        this.storage.removeItem(key);
    }
}