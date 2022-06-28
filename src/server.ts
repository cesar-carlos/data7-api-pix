import WatchPatchTest from './test/watch.spec';
import SeedFirabase from './test/seed.firebase.spec';
import CobrancaPIXTest from './test/cobranca.pix.fb.spec';
import PagamentoPIXTest from './test/pagamento.pix.fb.spec';

//const _seedFirabase = new SeedFirabase();
//_seedFirabase.exec();

// const _cobrancaPIXTest = new CobrancaPIXTest();
// _cobrancaPIXTest.exec();

// const _watchPatchTest = new WatchPatchTest();
// _watchPatchTest.exec();

const _cobrancaPIXTest = new CobrancaPIXTest();
_cobrancaPIXTest.exec();

// const _pagamentoPIXTest = new PagamentoPIXTest();
// _pagamentoPIXTest.exec();

console.log('server is running ...');
