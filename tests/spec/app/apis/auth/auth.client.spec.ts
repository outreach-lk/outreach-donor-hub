/* eslint-disable @typescript-eslint/no-empty-function */
import { authClientFactory } from "../../../../../app/adapters/clients";
import { UserRole } from "../../../../../app/types/dtos/user.dtos";
import { AuthProvider } from "../../../../../app/types/enums/providers";


const client = authClientFactory.getClient(AuthProvider.MOCK);
const moderator =  {
    email: 'mod@outreach.lk',
    password: 'password',
    role: 'moderator',
};

describe('Auth Client Tests', ()=>{
    it('should only instantiate single client instance',()=>{
        const newClient = authClientFactory.getClient(AuthProvider.MOCK);
        expect(newClient===client).toBeTruthy();
    })
    it('should return session when logging in with valid email and password',(done)=>{

        client.signInWithEmail(moderator.email, moderator.password)
        .then(session=>{
            expect(session).toHaveProperty('accessToken');
            expect(session).toHaveProperty('user');
            expect(session.user.email).toEqual(moderator.email);
            done();
        })
        .catch(done);
    })

    it('should return session when logging in with google',(done)=>{expect(true).toBeFalsy();done()});
    it('should return session when logging in with facebook',(done)=>{expect(true).toBeFalsy();done()});

    it('should throw error when logging in with invalid email and password',async ()=>{
        await expect(client.signInWithEmail(moderator.email, moderator.password+'#@$'))
        .rejects
        .toThrow()
    });
    it('should return session when signing-up with valid email and password',(done)=>{
        const EMAIL = 'newuser@moutreach.lk';
        client.signUpWithEmail(EMAIL,'password',UserRole.REGULAR)
        .then((session)=>{
            expect(session).toHaveProperty('accessToken');
            expect(session).toHaveProperty('user');
            expect(session.user.email).toEqual(EMAIL);
            done();
        })
        .catch(done)
    });
    it('should throw sign-up error when a user with given email already exists',async ()=>{
       await expect(client.signUpWithEmail(moderator.email,'password',UserRole.MODERATOR))
       .rejects
       .toThrow()
        
    });
    it('should return new session with user.isEmailVerified set to true when sign-up confirmed',(done)=>{expect(true).toBeFalsy();done()});
    it('should throw sign-up confirm error when invalid code is sent',(done)=>{expect(true).toBeFalsy();done()});
    it('should return success message when password reset request is sent.',(done)=>{expect(true).toBeFalsy();done()});
    it('should return password reset success message when valid password reset code is sent',()=>{});
    it('should throw password reset error, when invalid password reset code is sent',(done)=>{expect(true).toBeFalsy();done()})
    it('should reeturn new session with new accessToken when refresh is called with a valid refresh token',(done)=>{expect(true).toBeFalsy(); done()})
    it('should return new session when change password is requested with valid accesstoken',(done)=>{expect(true).toBeFalsy();done();});
    it('should throw change password error when old password is invalid',done=>{expect(true).toBeFalsy();done()});
    it('should throw change password error when access token is invalid',done=>{expect(true).toBeFalsy();done()});
    it('should revoke local session when logged out.',done=>{expect(true).toBeFalsy();done()});
    it('should revoke local session when account deleted',done=>{expect(true).toBeFalsy();done()});
})