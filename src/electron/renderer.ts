const setButton: any = document.getElementById('btn');
const titleInput: any = document.getElementById('title');
const imagem: any = document.getElementById('imagemqr');

setButton.addEventListener('click', async () => {
  const title = titleInput.value;
  const win: any = window
  const Qr = await win.electronAPI.GenerateQrCode(title);
  console.log(Qr);
  imagem.src = Qr;
  // window.electronAPI.setTitle(title);
});
