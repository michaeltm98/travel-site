export class Place {
    private _name: string;
    private _image: string;
    private _author: string;
    private _placeId: string;
    private _description: string;
    private _rating: number;




    /**
     * Getter rating
     * @return {number}
     */
	public get rating(): number {
		return this._rating;
	}

    /**
     * Setter rating
     * @param {number} value
     */
	public set rating(value: number) {
		this._rating = value;
	}

    /**
     * Getter placeId
     * @return {string}
     */
	public get placeId(): string {
		return this._placeId;
	}

    /**
     * Setter placeId
     * @param {string} value
     */
	public set placeId(value: string) {
		this._placeId = value;
	}


	constructor() {
	}



    /**
     * Getter description
     * @return {string}
     */
	public get description(): string {
		return this._description;
	}

    /**
     * Setter description
     * @param {string} value
     */
	public set description(value: string) {
		this._description = value;
	}

    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter image
     * @return {string}
     */
	public get image(): string {
		return this._image;
	}

    /**
     * Getter author
     * @return {string}
     */
	public get author(): string {
		return this._author;
    }
    
    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    /**
     * Setter image
     * @param {string} value
     */
	public set image(value: string) {
		this._image = value;
	}

    /**
     * Setter author
     * @param {string} value
     */
	public set author(value: string) {
		this._author = value;
	}




    
    
}
