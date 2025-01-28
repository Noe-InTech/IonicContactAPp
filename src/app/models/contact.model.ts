export class Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
  
    constructor(
      id: number,
      firstName: string,
      lastName: string,
      email: string,
      phone?: string,
      address?: string
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phone = phone;
      this.address = address;
    }
  }
  