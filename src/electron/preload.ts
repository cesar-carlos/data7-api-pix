import { contextBridge, ipcRenderer } from 'electron'
import QRCode from 'qrcode';
contextBridge.exposeInMainWorld('electronAPI', {
  open: (qrcode: string) => ipcRenderer.send('open-qrcode', qrcode),
  close: () => ipcRenderer.send('close-qrcode'),
  GenerateQrCode: (qrcode: string) => QRCode.toDataURL(qrcode)
})



