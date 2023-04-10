import { join } from "path"
import { getFileToBuffer } from "./get-file-to-buffer"

export const getPhoto = async function(){
  const { buffer, stream} = await getFileToBuffer(join(__dirname, 'photo.jpg'))
  const photo: Express.Multer.File = {
    fieldname: 'file',
    originalname: 'photo.jpg',
    encoding: '7bit',
    mimetype: 'image/jpg',
    size: 1024 * 56,
    stream,
    destination: '',
    filename: 'file-name',
    path: 'file-path',
    buffer,
  }

  return [photo]
}