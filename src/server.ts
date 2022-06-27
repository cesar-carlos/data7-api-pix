import WatchPatchTest from './test/watch.spec';
import CobrancaPIXTest from './test/cobranca.pix.spec';
import SeedFirabase from './test/seed.firebase.spec';

//const _seedFirabase = new SeedFirabase();
//_seedFirabase.exec();

// const _cobrancaPIXTest = new CobrancaPIXTest();
// _cobrancaPIXTest.exec();

const _watchPatchTest = new WatchPatchTest();
_watchPatchTest.exec();

console.log('server is running ...');
