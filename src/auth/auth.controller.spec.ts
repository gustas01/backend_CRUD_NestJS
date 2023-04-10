import { Test, TestingModule } from "@nestjs/testing"
import { AuthGuard } from "../guards/auth/auth.guard"
import { authForgetDTOMock } from "../testing/auth-forget-dto.mock"
import { authLoginDTOMock } from "../testing/auth-login-dto.mock"
import { authRegisterDTOMock } from "../testing/auth-register-dto.mock"
import { authResetDTOMock } from "../testing/auth-reset-dto.mock"
import { authServiceMock } from "../testing/auth-service.mock"
import { fileServiceMock } from "../testing/file-service.mock"
import { getPhoto } from "../testing/get-photo.mock"
import { guardMock } from "../testing/guard.mock"
import { tokenMock } from "../testing/token.mock"
import { userEntityList } from "../testing/user-entity-list.mock"
import { AuthController } from "./auth.controller"

describe('AuthController', () => {
  let authController: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    }).overrideGuard(AuthGuard).useValue(guardMock).compile()
    
    authController = module.get<AuthController>(AuthController)
  });

  it('should be defined', () => {
    expect(authController).toBeDefined()
  });

  describe('Authentication methods', () => {
    it('Login', async () => {
      const result = await authController.login(authLoginDTOMock)
      expect(result).toEqual({ tokenMock })
    });

    it('Register', async () => {
      const result = await authController.register(authRegisterDTOMock)
      expect(result).toEqual({ tokenMock })
    });

    it('Forget', async () => {
      const result = await authController.forget(authForgetDTOMock)
      expect(result).toEqual({success: true})
    });
    
    it('Reset', async () => {
      const result = await authController.reset(authResetDTOMock)
      expect(result).toEqual({ tokenMock })
    });
  });


  describe('User Data (me)', () => {
    it('Method Me', async () => {
      const result = await authController.me(userEntityList[0])
      expect(result).toEqual(userEntityList[0])
    });
  });


  describe('Photo methods', () => {
    it('UploadPhoto', async () => {
      const photo = await getPhoto()
      const result = await authController.uploadPhoto(userEntityList[0], photo[0])
      expect(result).toEqual({success: true})
    });

    it('UploadFiles', async () => {
      const photo = await getPhoto()
      const result = await authController.uploadFiles(userEntityList[0], photo)
      expect(result).toEqual(photo)
    });
    
    it('UploadFilesFields', async () => {
      const photo = await getPhoto();
      const files = {photo: photo[0], documents: photo}
      const result = await authController.uploadFilesFields(userEntityList[0], files)
      expect(result).toEqual({ files })
    });
  });
});