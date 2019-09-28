export class User {
    private _username: string;
    private _email: string;
    private _password: string;
    private _accessToken: any;



    /**
     * Getter accessToken
     * @return {any}
     */
	public get accessToken(): any {
		return this._accessToken;
	}

    /**
     * Setter accessToken
     * @param {any} value
     */
	public set accessToken(value: any) {
		this._accessToken = value;
	}

    /**
     * Getter username
     * @return {string}
     */
	public get username(): string {
		return this._username;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
	}

    /**
     * Getter password
     * @return {string}
     */
	public get password(): string {
		return this._password;
	}

    /**
     * Setter username
     * @param {string} value
     */
	public set username(value: string) {
		this._username = value;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}

    /**
     * Setter password
     * @param {string} value
     */
	public set password(value: string) {
		this._password = value;
	}


    
}