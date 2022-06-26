import CobrancaPIX from './test/cobranca.pix.spec';
import SeedFirabase from './test/seed.firebase.spec';

//const _seedFirabase = new SeedFirabase();
//_seedFirabase.exec();

const _cobrancaPIXTest = new CobrancaPIX();
_cobrancaPIXTest.exec();

console.log('server is running ...');
