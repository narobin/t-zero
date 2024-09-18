import {browser} from "$app/environment";

class Cookies {
    private cookies: Record<string, string> = {};

    constructor() {
        this.refresh()
    }

    private refresh() {
        if (!browser)
            return;

        this.cookies = {};

        document.cookie.split(';').forEach(cookie => {
            const [key,value] = cookie.split("=");
            this.cookies[key.trim()] = value.trim();
        });
    }

    get(key: string): string {
        this.refresh()
        return this.cookies[key];
    }

    exists(key: string): boolean {
        this.refresh();
        return !!this.cookies[key];
    }

}

export default new Cookies();
