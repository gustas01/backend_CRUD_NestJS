import { Test, TestingModule } from '@nestjs/testing';
import { getPhoto } from '../testing/get-photo.mock';
import { FileService } from './file.service';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(fileService).toBeDefined();
  });


  it('upload method', async () => {
    const photo = await getPhoto()
    fileService.upload(photo[0], 'photo-test.jpg')
  })
});
