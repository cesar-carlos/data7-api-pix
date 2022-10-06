const create = function (): string {
  return 'xxxxxxxxxxxxx4xxxxyxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const valid = function (txId: string): boolean {
  const regExp = new RegExp('^[a-zA-Z0-9]{26,35}$');
  return regExp.test(txId);
};

export const txid = { create, valid };
