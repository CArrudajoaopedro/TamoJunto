export interface UserProps {
    name: string;
    email: string;
    password?: string; // Opcional ao trafegar dados limpos
}
export class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _password?: string;
    private _createdAt: Date;
constructor(props: UserProps, id?: number, createdAt?: Date) {
    this._id = id ?? 0;
    this._createdAt = createdAt ?? new Date();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
}
public get id(): number { return this._id; }
public get name(): string { return this._name; }
public get email(): string { return this._email; }
public get password(): string | undefined { return this._password; }
public get createdAt(): Date { return this._createdAt; }
}