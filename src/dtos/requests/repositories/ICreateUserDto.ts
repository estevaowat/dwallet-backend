export default interface ICreateUserDto {
   name: string;
   email: string;
   passwordHash: string;
   salt: string;
   avatarUrl: string | null;
}
