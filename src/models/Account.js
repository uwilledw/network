export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.graduated = data.graduated
    this.github = data.github
    this.linkedin = data.linkedin
    this.class = data.class
    this.resume = data.resume
    this.createdAt = new Date(data.createdAt)
  }
}




export class Account extends Profile {
  constructor(data) {
    super(data)
    this.email = data.email
    // TODO add additional properties if needed
  }
}
