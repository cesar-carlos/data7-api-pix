import { exec } from 'child_process';

enum EnumTypeCb {
  error,
  success,
}
enum EnumDevices {
  desktop,
  mobile,
}
interface ICb {
  type: EnumTypeCb;
  message: string;
  error: any;
}
interface IOpenQrCode {
  base64_qrcode: string;
  link_copy_paste: string;
  devices: EnumDevices[];
  cb: (ICb: ICb) => void;
}
interface ICloseQrCode {
  cb: (ICb: ICb) => void;
}
function OpenQrCode({ base64_qrcode, link_copy_paste, devices, cb }: IOpenQrCode) {
  exec(`start electron-fiddle://open?qrcode=` + base64_qrcode, (e, stdout, stderr) => {
    console.log(e);
  });
  return cb({ type: EnumTypeCb.success, message: 'Sucess on open window', error: null });
}
function CloseQrCode({ cb }: ICloseQrCode) {
  exec(`start electron-fiddle://close`, (e, stdout, stderr) => {
    //console.log(e);
  });
  return cb({ type: EnumTypeCb.success, message: 'Sucess on close window', error: null });
}

export { EnumDevices, OpenQrCode, CloseQrCode };
