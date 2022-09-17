import LocalSybaseDemoRepository from '../../../src/repository/local.sybase.demo.repository';
import DemoDto from '../../../src/dto/demo.digital.dto';

describe('CRUD DEMO SYBASE', () => {
  const demo = new DemoDto({ id: 1, nome: 'DEMO' });

  it('INSERT', async () => {
    try {
      const repo = new LocalSybaseDemoRepository();
      const entity = await repo.insert(demo);
    } catch (error: any) {
      console.log(error);
    }
  });

  it('SELECT', async () => {
    try {
      const repo = new LocalSybaseDemoRepository();
      const entity = await repo.select();
      expect(entity).toBeDefined();
      expect(entity).toBeInstanceOf(Array);
      expect(entity?.length).toBeGreaterThan(0);
      expect(entity?.length).toBe(1);
    } catch (error: any) {
      console.log(error);
    }
  });
});

export default {};
