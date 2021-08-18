import IUserFound from '../IUserFound';

interface IUserAuthenticationDto {
   user: IUserFound;
   jwt: string;
}

export default IUserAuthenticationDto;
