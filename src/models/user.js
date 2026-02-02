export class user{
    constructor(id, name, email, password, role,department = "", phone = ""){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.department = department;
        this.phone = phone;
    }
}