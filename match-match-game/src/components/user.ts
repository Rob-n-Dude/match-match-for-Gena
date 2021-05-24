export class User {
  name : string;

  secondName : string;

  email : string;

  imageUrl? : string;

  isUser : boolean;

  constructor(info:string[]) {
    [this.name, this.secondName, this.email] = info;
    this.isUser = true;
  }

  setAvatar(url:string) : void {
    this.imageUrl = url;
  }
}
